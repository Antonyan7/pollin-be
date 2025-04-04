import {Injectable} from '@nestjs/common'
import {handleError, parseError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {StructuredLogger} from '@libs/common'
import {
  IVFPlanActionDTO,
  IVFPlanStatusDTO,
  IVFPlanStatusLabelDTO,
  PlanCancellationReasonDto,
  PlanDispositionReasonDto,
  PlanFiltersDto,
} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {IVFLabStatus, IVFLabStatusTitle} from '@libs/data-layer/apps/clinic-ivf/enums'
import {IvfLabCohortDateService} from '@libs/common/services/ivf-lab/ivf-lab-cohort-date.service'
import {PatientPlanRepository, PlanTypeRepository} from '@libs/data-layer/apps/plan/repositories'
import {BadRequestException} from '@libs/services-common/exceptions'
import {PatientPlanAuditTrailService} from '@libs/audit-trail/services/patient-plan-audit-trail.service'
import {
  AuditUserAction,
  IvfPatientFilterTitle,
  IvfPatientFilterType,
  IVFPlanAction,
  IVFPlanStatus,
  IVFPlanStatusBackgroundColorMap,
  IVFPlanStatusLabel,
  IVFPlanStatusTextColorMap,
} from '@libs/services-common/enums'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  IVFCancellationReasonRepository,
  IVFDispositionReasonRepository,
  PatientPlanCohortRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {dateTimeUtil} from '@libs/common/test/fixtures/patient-partner.fixture'

import {PatientPlanCohort} from '@libs/data-layer/apps/clinic-ivf/entities'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

@Injectable()
export class IvfPatientsService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly ivfLabCohortDateService: IvfLabCohortDateService,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
    private readonly staffRepository: StaffRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly patientPlanAuditTrailService: PatientPlanAuditTrailService,
    private readonly cancellationReasonRepository: IVFCancellationReasonRepository,
    private readonly planTypeRepository: PlanTypeRepository,
    private readonly ivfDispositionReasonRepository: IVFDispositionReasonRepository,
  ) {}

  async setCohortDate(
    patientPlanUUID: string,
    cohortDate: string,
    staffUUID: string,
  ): Promise<void> {
    try {
      const [activePatientPlan, staff] = await Promise.all([
        this.patientPlanRepository.findToSetCohortDateByUUID(patientPlanUUID),
        this.staffRepository.findOneByUUID(staffUUID),
      ])

      this.validateCohortDateUpdate(activePatientPlan, staff)

      const {patientPlanCohort, createdTaskGroups} =
        await this.ivfLabCohortDateService.setCohortStartDate({
          activePatientPlan,
          cohortDate,
        })
      await Promise.all([
        this.patientPlanAuditTrailService.addPatientPlanCohortAudit(
          patientPlanCohort,
          activePatientPlan.cohorts.length ? AuditUserAction.Update : AuditUserAction.Create,
          staff,
        ),
        this.patientPlanAuditTrailService.addPatientPlanCohortIvfTaskGroupsAudit(
          createdTaskGroups,
          AuditUserAction.Create,
          staff,
        ),
      ])
      await this.updatePatientPlanCohortWithStaff(patientPlanCohort, staff)
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfPatientsFunctions.SetCohortDate,
        eventName: activityLogs.IvfPatientsActions.SetCohortDateFailed,
      })
    }
  }
  async updatePatientPlanCohortWithStaff(
    patientPlanCohort: PatientPlanCohort,
    staff: Staff,
  ): Promise<void> {
    try {
      if (staff) {
        await this.patientPlanCohortRepository.save({
          ...patientPlanCohort,
          updatedByStaffId: staff.id,
          updatedByStaffAt: dateTimeUtil.now(),
        })
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfPatientsFunctions.UpdatePatientPlanCohortWithStaff,
        eventName: activityLogs.IvfPatientsActions.UpdatePatientPlanCohortWithStaffFailed,
      })
    }
  }

  private validateCohortDateUpdate(activePatientPlan: PatientPlan, staff): void {
    if (!staff) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.STAFF_USER_NOT_FOUND))
    }
    if (!activePatientPlan) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.PATIENT_PLAN_NOT_FOUND))
    }
    if (activePatientPlan.planType.serviceTypeIdToSetCohortStartDate) {
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.COHORT_DATE_CANT_BE_SELECTED_MANUALLY),
      )
    }
    if (!activePatientPlan.planType.ivfTaskToDayToPlanType.length) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.PLAN_IS_NOT_IVF))
    }
  }
  async getPlanCancellationReasons(): Promise<PlanCancellationReasonDto[]> {
    try {
      const reasons = await this.cancellationReasonRepository.find()
      return reasons.map((reason) => ({id: reason.uuid, title: reason.reason}))
    } catch (error) {
      StructuredLogger.error(
        activityLogs.IvfPatientsFunctions.GetPlanCancellationReasons,
        activityLogs.IvfPatientsActions.RetrievingCancellationReasonsFailed,
        parseError(error),
      )
      throw error
    }
  }

  async getPlanFilters(): Promise<PlanFiltersDto[]> {
    try {
      const planTypes = await this.planTypeRepository.findPlanTypesRelatedToIVF()
      return [
        {
          title: IvfPatientFilterTitle[IvfPatientFilterType.Status],
          options: [
            {
              id: IVFLabStatus.Active,
              title: IVFLabStatusTitle.Active,
              type: IvfPatientFilterType.Status,
            },
            {
              id: IVFLabStatus.Cancelled,
              title: IVFLabStatusTitle.Cancelled,
              type: IvfPatientFilterType.Status,
            },
            {
              id: IVFLabStatus.Completed,
              title: IVFLabStatusTitle.Completed,
              type: IvfPatientFilterType.Status,
            },
            {
              id: IVFLabStatus.Upcoming,
              title: IVFLabStatusTitle.Upcoming,
              type: IvfPatientFilterType.Status,
            },
            {
              id: IVFLabStatus.AwaitingBiopsyResults,
              title: IVFLabStatusTitle.AwaitingBiopsyResults,
              type: IvfPatientFilterType.Status,
            },
          ],
        },
        {
          title: IvfPatientFilterTitle[IvfPatientFilterType.PlanType],
          options: planTypes.map((planType) => ({
            id: planType.uuid,
            title: planType.title,
            type: IvfPatientFilterType.PlanType,
          })),
        },
      ]
    } catch (error) {
      StructuredLogger.error(
        activityLogs.IvfPatientsFunctions.GetPlanFilters,
        activityLogs.IvfPatientsActions.GetPlanFiltersFailed,
        parseError(error),
      )
      throw error
    }
  }

  getStatuses(): IVFPlanStatusDTO[] {
    return Object.values(IVFPlanStatus).map((status) => {
      const actions = this.getActionsForStatus(status)
      const label = this.getLabelForStatus(status)

      return {
        status: status,
        title: IVFPlanStatusLabel[status],
        actions: actions,
        label: label,
      }
    })
  }

  private getActionsForStatus(status: IVFPlanStatus): IVFPlanActionDTO[] {
    let actions: IVFPlanActionDTO[] = []
    if (status === IVFPlanStatus.Active || status === IVFPlanStatus.AwaitingBiopsyResults) {
      actions = [
        {id: IVFPlanAction.MarkAsCompleted, title: 'Mark as Completed'},
        {id: IVFPlanAction.MarkAsCancelled, title: 'Mark as Cancelled'},
      ]
    } else if (status === IVFPlanStatus.Upcoming) {
      actions = [{id: IVFPlanAction.MarkAsCancelled, title: 'Mark as Cancelled'}]
    }
    return actions
  }

  private getLabelForStatus(status: IVFPlanStatus): IVFPlanStatusLabelDTO {
    return {
      textColor: IVFPlanStatusTextColorMap.get(status),
      backgroundColor: IVFPlanStatusBackgroundColorMap.get(status),
    }
  }
  async getPlanDispositionReasons(): Promise<PlanDispositionReasonDto[]> {
    try {
      const reasons = await this.ivfDispositionReasonRepository.find()
      return reasons.map((reason) => ({id: reason.uuid, title: reason.reason}))
    } catch (error) {
      StructuredLogger.error(
        activityLogs.IvfPatientsFunctions.GetPlanDispositionReasons,
        activityLogs.IvfPatientsActions.RetrievingPlanDispositionReasonsFailed,
        parseError(error),
      )
      throw error
    }
  }
}
