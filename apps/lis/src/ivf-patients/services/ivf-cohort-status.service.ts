import {Equal} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {
  CancelPlanRequestDTO,
  CompletePlanRequestDTO,
  CompletionMetaDataErrorMessages,
  CompletionMetaDataErrorTitles,
  EmbryoFreezingMetaDataResponseDto,
  CompletionMetaDataTypes,
  EggFreezeMetaDataPayload,
  EggFreezeMetaDataResponseDto,
  FreezeMetaDataPayload,
} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import {IvfDaysDTO} from '@apps/lis/daily-view/dto/daily-view.dto'
import {
  IVFLabStatus,
  EmbryoState,
  nonCancellableStatuses,
  nonCompletableStatuses,
} from '@libs/data-layer/apps/clinic-ivf/enums'
import {BadRequestException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {
  handleNullableNumberValues,
  isNull,
  NestprojectConfigService,
  StructuredLogger,
} from '@libs/common'
import {
  PatientPlanCohort,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskExpandedEmbryo,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {getPatientsByDayDTO} from '@apps/lis/spawn-cohort/dto/spawn-cohort.dto'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {patientIdentifier} from '@apps/lis/test-result/helper/test-result.helper'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {
  IVFCancellationReasonRepository,
  PatientPlanCohortIvfTaskDetailsRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
  PatientPlanCohortRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {DailyViewService} from '@apps/lis/daily-view/services/daily-view.service'
import {
  PatientPlanAddonRepository,
  PatientPlanRepository,
} from '@libs/data-layer/apps/plan/repositories'
import {AuditUserAction} from '@libs/services-common/enums'
import {PatientPlanAuditTrailService} from '@libs/audit-trail/services/patient-plan-audit-trail.service'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'

import {IvfCompletionDetailsType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientPlanCohortCryoSampleContainers} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-cryo-sample-containers.entity'
import {getAuditTrailRequestMetadata} from '@libs/services-common/helpers/async-hook'
import {PubSubAdapter} from '@libs/common/adapters'
import {
  IVFLabPlanUpdatedPubSubPayload,
  IVFLabPlanUpdatedSchema,
} from '@libs/common/model/proto-schemas/ivf-lab-plan-updated.schema'
import {TransportFolderRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'

@Injectable()
export class IvfIVFLabStatusService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly cancellationReasonRepository: IVFCancellationReasonRepository,
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
    private readonly dailyViewService: DailyViewService,
    private readonly patientPlanCohortIvfTaskExpandedEmbryoRepository: PatientPlanCohortIvfTaskExpandedEmbryoRepository,
    private readonly patientPlanCohortIvfTaskDetailsRepository: PatientPlanCohortIvfTaskDetailsRepository,
    private readonly patientPlanAddonRepository: PatientPlanAddonRepository,
    private readonly patientPlanAuditTrailService: PatientPlanAuditTrailService,
    private readonly staffRepository: StaffRepository,
    private readonly configService: NestprojectConfigService,
    private readonly transportFolderRepository: TransportFolderRepository,
  ) {}

  async getCompletionMetadata(
    patientPlanUuid: string,
  ): Promise<EmbryoFreezingMetaDataResponseDto | EggFreezeMetaDataResponseDto> {
    try {
      const patientPlanCohorts =
        await this.patientPlanCohortRepository.findCohortWithsPatientPlanIdAndTask(patientPlanUuid)
      const patientPlanCohort = patientPlanCohorts[0]
      const ivfCompletionDetailsType =
        patientPlanCohort.patientPlan.planType?.ivfCompletionDetailsType ||
        IvfCompletionDetailsType.EmbryoFreezing

      if (!patientPlanCohorts) {
        return {
          type: null,
          details: null,
          error: null,
        }
      }
      const patientPlanTaskDetails =
        await this.patientPlanCohortIvfTaskDetailsRepository.getByPatientPlanId(patientPlanUuid)
      if (ivfCompletionDetailsType === IvfCompletionDetailsType.EggFreezing) {
        return this.getEggFreezeMetadata(patientPlanUuid, patientPlanTaskDetails)
      } else {
        const expandedEmbryos =
          await this.patientPlanCohortIvfTaskExpandedEmbryoRepository.getEmbryosByPatientPlanUUID(
            patientPlanUuid,
          )
        const metadata: FreezeMetaDataPayload = {
          numberOfEmbryosFreezedAndBiopsy: 0,
          numberOfEmbryosFreezed: 0,
          numberOfEmbryosFreezedArrested: 0,
          numberOfEmbryosFreezedDiscarded: 0,
        }
        let expectedEmbryoCount = 0

        patientPlanTaskDetails.forEach((patientPlanTaskDetail) => {
          expectedEmbryoCount =
            expectedEmbryoCount +
            patientPlanTaskDetail.day3EmbryosLessThan6Cells +
            patientPlanTaskDetail.day3EmbryosMoreThan6Cells

          metadata.numberOfEmbryosFreezedArrested =
            metadata.numberOfEmbryosFreezedArrested +
            patientPlanTaskDetail.day5Arrested +
            patientPlanTaskDetail.day6Arrested
          metadata.numberOfEmbryosFreezedDiscarded =
            metadata.numberOfEmbryosFreezedDiscarded + patientPlanTaskDetail.day7Discarded
        })

        const checkResult = await this.checkEmbryoIssues({
          patientPlanUuid,
          expectedEmbryoCount,
          expandedEmbryos,
          metadata,
        })

        if (checkResult) {
          return checkResult
        }

        expandedEmbryos.forEach((expandedEmbryo) => {
          if (expandedEmbryo.biopsyRequired) {
            metadata.numberOfEmbryosFreezedAndBiopsy++
          } else if (expandedEmbryo.state === EmbryoState.Frozen) {
            metadata.numberOfEmbryosFreezed++
          }
        })
        return {
          type: CompletionMetaDataTypes.EmbryoFreezing,
          details: metadata,
          error: null,
        }
      }
    } catch (e) {
      StructuredLogger.error(
        activityLogs.IvfPatientsFunctions.GetPlanFilters,
        activityLogs.IvfPatientsActions.GetCompletionMetadataFailed,
        parseError(e),
      )
      throw e
    }
  }
  private async getEggFreezeMetadata(
    patientPlanUuid: string,
    patientPlanTaskDetails: PatientPlanCohortIvfTaskDetails[],
  ): Promise<EggFreezeMetaDataResponseDto> {
    const cohorts =
      await this.patientPlanCohortRepository.findCohortsByPatientPlanUuid(patientPlanUuid)
    const embryos = cohorts.flatMap((cohort) => cohort.patientPlanCohortCryoSampleContainers)

    const metadata: EggFreezeMetaDataPayload = {
      numberOfOocytesFreezedOnDay0: this.calculateTotalEggCount(embryos),
      numberOfOocytesFreezedOnMiiDay1: 0,
      numberOfMatureOocytes: 0,
      numberOfImmatureOocytes: 0,
      numberOfOtherOocytes: 0,
    }
    patientPlanTaskDetails.forEach((patientPlanTaskDetail) => {
      metadata.numberOfOocytesFreezedOnMiiDay1 += patientPlanTaskDetail.matureOocytesToCry ?? 0
      metadata.numberOfMatureOocytes += patientPlanTaskDetail.matureOocytes ?? 0
      metadata.numberOfImmatureOocytes += patientPlanTaskDetail.immatureOocytes ?? 0
      metadata.numberOfOtherOocytes += patientPlanTaskDetail.degenOocytes ?? 0
      metadata.numberOfOtherOocytes += patientPlanTaskDetail.abnormalOocytes ?? 0
    })

    return {
      type: CompletionMetaDataTypes.EggFreezing,
      details: metadata,
      error: null,
    }
  }

  async cancelIvfCohort(payload: CancelPlanRequestDTO, staffUUID: string): Promise<IvfDaysDTO[]> {
    const staffUser = await this.staffRepository.findOneByUUID(staffUUID)

    const dashboardDayUpdates = []
    const {originalCohort, spawnedCohort} = await this.getCancellableCohorts(payload.patientPlanId)

    const patientPlan = originalCohort?.patientPlan ?? spawnedCohort?.patientPlan

    if (originalCohort) {
      if (nonCancellableStatuses.includes(originalCohort.patientPlan.ivfLabStatus)) {
        throw new BadRequestException(this.i18nService.translate(i18Messages.CANNOT_CANCEL_COHORT))
      }
      dashboardDayUpdates.push(
        this.getCancelableCohortDto(
          originalCohort,
          payload.dashboardFilterDate,
          IVFLabStatus.Cancelled,
        ),
      )
    } else {
      throw new BadRequestException(this.i18nService.translate(i18Messages.COHORT_NOT_FOUND))
    }

    if (spawnedCohort) {
      dashboardDayUpdates.push(
        this.getCancelableCohortDto(
          spawnedCohort,
          payload.dashboardFilterDate,
          IVFLabStatus.Cancelled,
        ),
      )
    }

    await this.changeIvfIVFLabStatusToCancel({
      patientPlan,
      reasonId: payload.reason,
      comments: payload.comments,
    })

    await this.publishIVFPlanUpdated(
      {
        patientPlanId: originalCohort.patientPlanId,
        oldStatus: patientPlan.ivfLabStatus,
        newStatus: IVFLabStatus.Cancelled,
        transportFolderId: null,
      },
      staffUser.authUserId,
    )

    if (originalCohort) {
      await this.patientPlanAuditTrailService.addPatientPlanCohortAudit(
        originalCohort,
        AuditUserAction.Update,
        staffUser,
      )
    }
    if (spawnedCohort) {
      await this.patientPlanAuditTrailService.addPatientPlanCohortAudit(
        spawnedCohort,
        AuditUserAction.Update,
        staffUser,
      )
    }

    await this.patientPlanAuditTrailService.addPatientPlanAuditById(
      patientPlan.id,
      AuditUserAction.Update,
      staffUser,
    )

    return dashboardDayUpdates
  }

  async completeIvfCohort(
    payload: CompletePlanRequestDTO,
    staffUUID: string,
  ): Promise<IvfDaysDTO[]> {
    const staffUser = await this.staffRepository.findOneByUUID(staffUUID)

    const dashboardDayUpdates = []
    const {originalCohort, spawnedCohort} = await this.getCancellableCohorts(payload.patientPlanId)

    const patientPlan = originalCohort?.patientPlan ?? spawnedCohort?.patientPlan

    const checkResult = await this.getCompletionMetadata(payload.patientPlanId)

    if (checkResult.error) {
      // Just in a case somebody passed FE's modal and called this endpoint manually
      throw new BadRequestException(this.i18nService.translate(i18Messages.CANNOT_COMPLETE_COHORT))
    }

    const transportFolderUUID = payload.metadata?.transportFolderId
    const transportFolder = transportFolderUUID
      ? await this.transportFolderRepository.findByUUID(transportFolderUUID)
      : null
    if (transportFolderUUID && !transportFolder) {
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.TRANSPORT_FOLDER_NOT_FOUND),
      )
    }

    if (originalCohort) {
      if (nonCompletableStatuses.includes(patientPlan.ivfLabStatus)) {
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.CANNOT_COMPLETE_COHORT),
        )
      }
      dashboardDayUpdates.push(
        this.getCancelableCohortDto(
          originalCohort,
          payload.dashboardFilterDate,
          IVFLabStatus.Completed,
        ),
      )
    } else {
      throw new BadRequestException(this.i18nService.translate(i18Messages.COHORT_NOT_FOUND))
    }

    if (spawnedCohort) {
      dashboardDayUpdates.push(
        this.getCancelableCohortDto(
          spawnedCohort,
          payload.dashboardFilterDate,
          IVFLabStatus.Completed,
        ),
      )
    }

    await this.changeIvfIVFLabStatusToCompleted({
      patientPlan,
      newStatus: IVFLabStatus.Completed,
      completionComment: payload.comments,
    })

    await this.publishIVFPlanUpdated(
      {
        patientPlanId: originalCohort.patientPlanId,
        transportFolderId: handleNullableNumberValues(transportFolder?.id),
        oldStatus: patientPlan.ivfLabStatus,
        newStatus: IVFLabStatus.Completed,
      },
      staffUser.authUserId,
    )

    if (originalCohort) {
      await this.patientPlanAuditTrailService.addPatientPlanCohortAudit(
        originalCohort,
        AuditUserAction.Update,
        staffUser,
      )
    }
    if (spawnedCohort) {
      await this.patientPlanAuditTrailService.addPatientPlanCohortAudit(
        spawnedCohort,
        AuditUserAction.Update,
        staffUser,
      )
    }

    await this.patientPlanAuditTrailService.addPatientPlanAuditById(
      patientPlan.id,
      AuditUserAction.Update,
      staffUser,
    )

    return dashboardDayUpdates
  }

  async checkBiopsyState(patientPlanId: number, staffAuthUserId: string): Promise<void> {
    const patientPlanCohort =
      await this.patientPlanCohortRepository.findOneByPatientPlanId(patientPlanId)
    if (!patientPlanCohort) {
      return
    }
    const [geneticTestings, expandedEmbryos, staffUser] = await Promise.all([
      this.patientPlanAddonRepository.findGeneticTestingsByPatientPlanId(patientPlanId),
      this.patientPlanCohortIvfTaskExpandedEmbryoRepository.getEmbryosWithBiopsyByPatientPlanId(
        patientPlanId,
      ),
      await this.staffRepository.findOneByAuthUserId(staffAuthUserId),
    ])

    if (expandedEmbryos.length && geneticTestings.length) {
      if (patientPlanCohort.patientPlan.ivfLabStatus === IVFLabStatus.Active) {
        await this.patientPlanRepository.update(patientPlanId, {
          ivfLabStatus: IVFLabStatus.AwaitingBiopsyResults,
        })
        await this.patientPlanAuditTrailService.addPatientPlanAuditById(
          patientPlanId,
          AuditUserAction.Update,
          staffUser,
        )
      }
    } else {
      if (patientPlanCohort.patientPlan.ivfLabStatus === IVFLabStatus.AwaitingBiopsyResults) {
        await this.patientPlanRepository.update(patientPlanId, {
          ivfLabStatus: IVFLabStatus.Active,
        })
        await this.patientPlanAuditTrailService.addPatientPlanAuditById(
          patientPlanId,
          AuditUserAction.Update,
          staffUser,
        )
      }
    }
  }

  getCohortsByPatientPlanUuid(patientPlanId: string): Promise<PatientPlanCohort[]> {
    return this.patientPlanCohortRepository.findCohortDailyViewByPatientPlanId(patientPlanId)
  }

  async getCancellableCohorts(patientPlanId: string): Promise<{
    originalCohort?: PatientPlanCohort
    spawnedCohort?: PatientPlanCohort
  }> {
    const cancellableCohorts = await this.getCohortsByPatientPlanUuid(patientPlanId)

    const groupedValues: {originalCohort?: PatientPlanCohort; spawnedCohort?: PatientPlanCohort} =
      {}

    return cancellableCohorts.reduce((cohorts, currentCohort) => {
      if (currentCohort.spawnedFromPatientPlanCohortId) {
        return {
          ...cohorts,
          spawnedCohort: currentCohort,
        }
      } else {
        return {
          ...cohorts,
          originalCohort: currentCohort,
        }
      }
    }, groupedValues)
  }

  getCancelableCohortDto(
    cohort: PatientPlanCohort,
    dashboardFilterDate: string,
    overwriteStatus?: IVFLabStatus,
  ): IvfDaysDTO {
    const {ivfTaskGroups, currentDayActive} = this.dailyViewService.getTaskGroupsWithType(
      cohort,
      dashboardFilterDate,
    )

    return getPatientsByDayDTO({
      patientPlanCohort: cohort,
      ivfTaskGroups,
      currentDayActive,
      overwriteStatus,
    })
  }

  private async checkEmbryoIssues({
    patientPlanUuid,
    expectedEmbryoCount,
    expandedEmbryos,
    metadata,
  }: {
    patientPlanUuid: string
    expectedEmbryoCount: number
    expandedEmbryos: PatientPlanCohortIvfTaskExpandedEmbryo[]
    metadata: FreezeMetaDataPayload
  }): Promise<EmbryoFreezingMetaDataResponseDto> {
    const patient = await this.patientRepository.findOneWithPatientPlanUuid(patientPlanUuid)

    if (
      expectedEmbryoCount !==
      expandedEmbryos.length +
        metadata.numberOfEmbryosFreezedArrested +
        metadata.numberOfEmbryosFreezedDiscarded
    ) {
      return {
        type: CompletionMetaDataTypes.EmbryoFreezing,
        details: null,
        error: {
          widgetTitle: CompletionMetaDataErrorTitles.ExpandedEmbryosRemaining,
          messages: [
            `<b>${getFullName(patient.firstName, patient.lastName)} (MRN: ${patientIdentifier(patient)})</b> ${CompletionMetaDataErrorMessages.UnassignedRemainingEmbryos}`,
            CompletionMetaDataErrorMessages.YouMustAssignAllBeforeCompletion,
          ],
        },
      }
    }
  }

  async changeIvfIVFLabStatusToCancel({
    patientPlan,
    reasonId,
    comments,
  }: {
    patientPlan: PatientPlan
    reasonId: string
    comments: string
  }): Promise<void> {
    let cancellationReasonId: number
    if (!isNull(reasonId)) {
      const cancellationReason = await this.cancellationReasonRepository.findOne({
        where: {
          uuid: reasonId,
        },
      })

      if (!cancellationReason) {
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.CANCELLATION_REASON_WAS_NOT_FOUND),
        )
      }

      cancellationReasonId = cancellationReason.id
    }

    await Promise.all([
      this.patientPlanCohortRepository.update(
        {
          patientPlanId: Equal(patientPlan.id),
        },
        {
          cancellationReasonId,
          cancellationComment: comments,
        },
      ),
      this.patientPlanRepository.update(patientPlan.id, {ivfLabStatus: IVFLabStatus.Cancelled}),
    ])
  }
  private calculateTotalEggCount(embryos: PatientPlanCohortCryoSampleContainers[]): number {
    return embryos.reduce((total, embryo) => {
      if (embryo?.cryoSampleContainer?.eggCount != null) {
        return total + embryo.cryoSampleContainer.eggCount
      }
      return total
    }, 0)
  }
  private async changeIvfIVFLabStatusToCompleted({
    patientPlan,
    completionComment,
    newStatus,
  }: {
    patientPlan: PatientPlan
    completionComment: string
    newStatus: IVFLabStatus
  }): Promise<void> {
    await Promise.all([
      this.patientPlanCohortRepository.update(
        {
          patientPlanId: patientPlan.id,
        },
        {
          completionComment: completionComment ?? null,
        },
      ),
      this.patientPlanRepository.update(patientPlan.id, {
        ivfLabStatus: newStatus,
      }),
    ])
  }
  private async publishIVFPlanUpdated(
    payload: {
      patientPlanId: number
      transportFolderId: number
      oldStatus: IVFLabStatus
      newStatus: IVFLabStatus
    },
    authUserId: string,
  ): Promise<void> {
    const topic = this.configService.get<string>('TOPIC_IVF_LAB_PLAN_UPDATED')
    const pubSubAdapter = new PubSubAdapter(topic)
    const reqMetadata = getAuditTrailRequestMetadata()
    await pubSubAdapter.publishWithSchema<IVFLabPlanUpdatedPubSubPayload>(
      {
        ...payload,
        authUserId,
        ...reqMetadata,
      },
      IVFLabPlanUpdatedSchema,
    )
  }
}
