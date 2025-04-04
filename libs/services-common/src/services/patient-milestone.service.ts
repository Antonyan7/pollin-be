import {Injectable} from '@nestjs/common'
import {
  PatientMilestoneStatus,
  PatientMilestoneType,
} from '@libs/services-common/enums/milestone.enum'
import {PatientMilestoneRepository} from '@libs/data-layer/apps/users/repositories/typeorm'

import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {PatientAuditTrailService} from '@libs/audit-trail'
import {AuditUserAction} from '@libs/services-common/enums'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {needsReportPeriodMilestoneCreation} from '@apps/core/cart/helper/cart-payment.helper'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'

const logFun = activityLogs.PatientMilestoneServiceCommonFunctions

@Injectable()
export class PatientMilestoneServiceCommon {
  constructor(
    private readonly patientMilestoneRepository: PatientMilestoneRepository,
    private readonly configService: NestprojectConfigService,
    private readonly patientAuditTrailService: PatientAuditTrailService,
  ) {}

  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  async movePlanSelectionMilestonesToPast(
    patient: Patient,
    patientPlan: PatientPlan,
  ): Promise<void> {
    this.logInfo(logFun.MovePlanMilestonesToPast, 'Method started')

    const upcomingPlanSelectionMilestones = await this.getUpcomingPlanSelectionMilestones(patient)

    this.logInfo(
      logFun.MovePlanMilestonesToPast,
      `Moving milestones to past: ${upcomingPlanSelectionMilestones.map((m) => m.id).join(', ')}`,
    )

    const updatedMilestones = await this.patientMilestoneRepository.save(
      upcomingPlanSelectionMilestones.map((milestone) => ({
        ...milestone,
        status: PatientMilestoneStatus.Past,
        patientPlanId: patientPlan.id,
        dateMovedToPast: this.dateTimeUtil.now(),
        updatedBy: patient.authUserId,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
      })),
    )

    await this.patientAuditTrailService.addPatientMilestonesAuditForPatient(
      updatedMilestones,
      AuditUserAction.Update,
      patient,
    )
  }

  async getUpcomingPlanSelectionMilestones(patient: Patient): Promise<PatientMilestone[]> {
    return await this.patientMilestoneRepository.findByPatientIdAndStatusType(
      patient.id,
      PatientMilestoneStatus.Upcoming,
      PatientMilestoneType.PlanSelection,
    )
  }

  async createReportPeriodMilestone(patientPlan: PatientPlan, patient: Patient): Promise<void> {
    this.logInfo(logFun.CreateReportPeriodMilestone, 'Method started')

    if (!needsReportPeriodMilestoneCreation(patientPlan)) {
      return
    }

    const newPatientMilestone = await this.patientMilestoneRepository.save({
      patientId: patient.id,
      patientPlanId: patientPlan.id,
      status: PatientMilestoneStatus.Upcoming,
      type: PatientMilestoneType.PlanReportPeriod,
      isDisabled: false,

      updatedBy: patient.authUserId,
      revisionId: generateRevisionId(this.dateTimeUtil.now()),
    })

    this.logInfo(
      logFun.CreateReportPeriodMilestone,
      `Created report period milestoneId : ${newPatientMilestone.id}`,
    )

    await this.patientAuditTrailService.addPatientMilestoneAuditForPatient(
      newPatientMilestone,
      AuditUserAction.Create,
      patient,
    )
  }

  logInfo(logFunction: string, message: string): void {
    StructuredLogger.info(logFunction, `${logFunction}. ${message}`, {
      message,
    })
  }
}
