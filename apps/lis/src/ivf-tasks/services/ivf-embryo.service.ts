import {Injectable} from '@nestjs/common'
import {CryoCardsStrawService} from '@apps/lis/cryo-cards/services/cryo-cards-straw.service'
import {CryoCardsService} from '@apps/lis/cryo-cards/services/cryo-cards.service'
import {
  CryoInventoryCardRepository,
  CryoSampleContainerRepository,
  CryoTankV2Repository,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {
  BiopsyAttachments,
  ExpandedEmbryo,
  ExpandedEmbryoDetailsFreeze,
  ExpandedEmbryoDetailsFreshET,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {
  IvfEmbryoGrade,
  PatientPlanCohort,
  PatientPlanCohortIvfTaskExpandedEmbryo,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  embryoActionToState,
  IvfEmbryoActions,
  IVFTaskEntityTitle,
} from '@libs/services-common/enums'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {
  IvfEmbryoGradeRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoBiopsyAttachmentRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {
  CryoCaneV2,
  CryoInventoryCard,
  CryoSampleContainer,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {isNull, StructuredLogger} from '@libs/common'
import {EmbryoState} from '@libs/data-layer/apps/clinic-ivf/enums'
import {getBiopsyId} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {DocumentCategoryPurpose} from '@libs/services-common/enums/document-category-types.enum'
import {DocumentCategoryRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {Equal, In} from 'typeorm'
import {CryoSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {PatientDocumentType} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {IvfIVFLabStatusService} from '@apps/lis/ivf-patients/services/ivf-cohort-status.service'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PatientDocumentService} from '@libs/services-common/services/patient-document.service'

import {UpdateEmbryo} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request-v2.dto'
import {CryoInventoryCapacityService} from '@apps/lis/cryo-cards/services/cryo-inventory-capacity.service'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {IvfTaskHistoryRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/fireorm'
import {DefaultValue} from '@libs/common/enums'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {BadRequestException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {IvfTasksV2Service} from '@apps/lis/ivf-tasks/services/ivf-tasks-v2.service'

type EmbryoInfo = {
  embryo: PatientPlanCohortIvfTaskExpandedEmbryo
  cryoCane?: CryoCaneV2
  cryoSampleContainer?: CryoSampleContainer
  photoNames?: string[]
  grade: string
}

export type ProcessedEmbryo = {from: EmbryoInfo; to: EmbryoInfo}

@Injectable()
export class IvfEmbryoService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly i18nLocalizationService: I18nLocalizationService,
    private readonly cryoCardsStrawService: CryoCardsStrawService,
    private readonly cryoCardsService: CryoCardsService,
    private readonly cryoInventoryCardRepository: CryoInventoryCardRepository,
    private readonly ivfEmbryoGradeRepository: IvfEmbryoGradeRepository,
    private readonly ivfTaskExpandedEmbryoRepository: PatientPlanCohortIvfTaskExpandedEmbryoRepository,
    private readonly expandedEmbryoBiopsyAttachmentRepository: PatientPlanCohortIvfTaskExpandedEmbryoBiopsyAttachmentRepository,
    private readonly documentCategoryRepository: DocumentCategoryRepository,
    private readonly patientDocumentService: PatientDocumentService,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly ivfIVFLabStatusService: IvfIVFLabStatusService,
    private readonly cryoSampleContainerRepository: CryoSampleContainerRepository,
    private readonly cryoInventoryCapacityService: CryoInventoryCapacityService,
    private readonly cryoTankV2Repository: CryoTankV2Repository,
    private readonly ivfTaskHistoryRepository: IvfTaskHistoryRepository,
    private readonly staffRepository: StaffRepository,
    private readonly ivfTasksV2Service: IvfTasksV2Service,
  ) {}

  async processEmbryoAndAttachments(
    embryosExpanded: ExpandedEmbryo[],
    summary: PatientPlanCohortIvfTaskSummary,
    staff: Staff,
  ): Promise<Promise<ProcessedEmbryo[]>> {
    try {
      let inventoryCard
      const straws = {count: 0}
      const createdEmbryos = {
        count: await this.ivfTaskExpandedEmbryoRepository.maximum('embryoNumber', {
          patientPlanCohortId: summary.patientPlanCohortId,
        }),
      }

      const [grades, embryos] = await Promise.all([
        this.ivfEmbryoGradeRepository.find(),
        this.ivfTaskExpandedEmbryoRepository.findByCohortIdAndDay(
          summary.patientPlanCohortId,
          summary.patientPlanCohortIvfTaskGroup.day,
        ),
      ])

      const processedEmbryos = await this.removeEmbryos({
        embryos,
        embryosExpanded,
        staff,
        sourceTaskSummaryId: summary.id,
      })

      if (
        embryosExpanded.find(
          (embryoExpanded) => embryoExpanded.actionType === IvfEmbryoActions.Freeze,
        )
      ) {
        inventoryCard = await this.getOrCreateInventoryCardForCohort(
          summary.patientPlanCohort,
          staff.authUserId,
        )
        straws.count = await this.cryoSampleContainerRepository.maximum('strawNumber', {
          cryoInventoryCard: {patientPlan: {id: Equal(inventoryCard?.patientPlan?.id)}},
        })
      }

      const embryoUUIDToEmbryo = new Map(embryos.map((embryo) => [embryo.uuid, embryo]))

      for await (const embryo of embryosExpanded) {
        const grade = grades?.find((i) => i.uuid === embryo.gradeId)
        const embryologistId = await this.findEmbryologist(embryo.embryologistId)
        if (embryo.id) {
          const embryoInfo = await this.updateEmbryo({
            embryo,
            straws,
            grade,
            day: summary.patientPlanCohortIvfTaskGroup.day,
            inventoryCard,
            staff,
            summary,
            embryologistId,
          })

          const embryoFromDb = embryoUUIDToEmbryo.get(embryo.id)

          processedEmbryos.push({
            from: {
              embryo: embryoFromDb,
              cryoCane: embryoFromDb.cryoSampleContainer?.cryoCane,
              cryoSampleContainer: embryoFromDb.cryoSampleContainer,
              photoNames: embryoFromDb.biopsyAttachments.map(({title}) => title),
              grade: grade?.title,
            },
            to: embryoInfo,
          })
        } else {
          const embryoInfo = await this.createEmbryo({
            embryo,
            grade,
            straws,
            embryos: createdEmbryos,
            summary,
            day: summary.patientPlanCohortIvfTaskGroup.day,
            inventoryCard,
            staff,
            embryologistId,
          })

          processedEmbryos.push({
            from: null,
            to: embryoInfo,
          })
        }
      }

      await this.ivfIVFLabStatusService.checkBiopsyState(
        summary.patientPlanCohort.patientPlanId,
        staff.authUserId,
      )

      return processedEmbryos
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.ProcessEmbryoAndAttachments,
        eventName: activityLogs.IvfTasksActions.ProcessEmbryoAndAttachmentsFailed,
      })
    }
  }

  async findEmbryologist(embryologistUUID: string | null): Promise<number | null> {
    if (!embryologistUUID) {
      return null
    }

    const embryologist = await this.staffRepository.findOneByUUID(embryologistUUID)
    if (!embryologist) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.EMBRYOLOGIST_STAFF_USER_NOT_FOUND),
      )
    }
    return embryologist.id
  }

  private async removeEmbryos({
    embryos,
    embryosExpanded,
    staff,
    sourceTaskSummaryId,
  }: {
    embryos: PatientPlanCohortIvfTaskExpandedEmbryo[]
    embryosExpanded: ExpandedEmbryo[]
    staff: Staff
    sourceTaskSummaryId: number
  }): Promise<ProcessedEmbryo[]> {
    const {processedEmbryos, removedEmbryosIds} = embryos.reduce(
      (data, embryo) => {
        if (!embryosExpanded.find((expandedEmbryo) => embryo.uuid == expandedEmbryo.id)) {
          data.processedEmbryos.push({
            from: {
              embryo,
              cryoCane: embryo.cryoSampleContainer?.cryoCane,
              cryoSampleContainer: embryo.cryoSampleContainer,
              photoNames: embryo.biopsyAttachments.map(({title}) => title),
              grade: embryo?.ivfEmbryoGrade?.title,
            },
            to: null,
          })
          data.removedEmbryosIds.push(embryo.id)
        }

        return data
      },
      {processedEmbryos: [], removedEmbryosIds: []},
    )

    const embryosToRemove = await this.ivfTaskExpandedEmbryoRepository.find({
      where: {id: In(removedEmbryosIds)},
      relations: ['cryoSampleContainer'],
    })

    if (embryosToRemove?.length) {
      const strawsToRemove = embryosToRemove
        .filter((embryo) => embryo.cryoSampleContainer)
        .map((embryo) => embryo.cryoSampleContainer)

      if (strawsToRemove.length) {
        const affectedTanks = await this.cryoTankV2Repository.findWithRelationsByStrawUUIDs(
          strawsToRemove.map((straw) => straw.uuid),
        )
        const affectedTankIds = affectedTanks.map(({id}) => id)
        await this.cryoSampleContainerRepository.softRemove(strawsToRemove)

        if (affectedTankIds.length) {
          await this.cryoInventoryCapacityService.updateCapacity(affectedTankIds)
        }
      }

      await this.ivfTaskExpandedEmbryoRepository.softRemove(embryosToRemove)

      const histories = embryosToRemove.map((embryo) => {
        return {
          authUserFullName: getFullName(staff.firstName, staff.lastName),
          authUserId: staff.authUserId,
          entityTitle: null,
          changes: [
            {
              from: embryo?.cryoSampleContainer?.identifier,
              to: DefaultValue.Dash,
              propertyName: IVFTaskEntityTitle.Embryo,
            },
          ],
          sourceTaskSummaryId: sourceTaskSummaryId,
          sourceTaskEmbryoId: embryo.id,
          updatedBy: staff.authUserId,
        }
      })
      await this.ivfTaskHistoryRepository.saveMultiple(histories)
    }

    return processedEmbryos
  }

  private async updateEmbryo({
    embryo,
    straws,
    grade,
    day,
    inventoryCard,
    staff,
    summary,
    embryologistId,
  }: UpdateEmbryo): Promise<EmbryoInfo> {
    const embryoFromDb = await this.ivfTaskExpandedEmbryoRepository.findEmbryoByIdWithEmbryologist(
      embryo.id,
    )

    const embryoState = embryoActionToState[embryo.actionType]
    const embryoWithUpdates: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> = {
      gradeId: grade?.id,
      day,
      state: embryoState,
      embryologistId,
    }

    if (embryoState === EmbryoState.FreshET) {
      if (embryoFromDb.state === EmbryoState.Frozen) {
        await this.cryoCardsStrawService.removeContainers(
          embryoFromDb.cryoSampleContainerId,
          staff.authUserId,
        )
        embryoWithUpdates.cryoSampleContainerId = null
      }
      const embryoDetails = embryo.details as ExpandedEmbryoDetailsFreshET
      const physician = await this.staffRepository.findOneByUUID(embryoDetails.physicianId)

      const savedEmbryo = await this.ivfTaskExpandedEmbryoRepository.save({
        id: embryoFromDb.id,
        ...embryoWithUpdates,
        assistedHatching: embryoDetails.assistedHatching,
        physicianId: physician.id,
        biopsyRequired: null,
      })

      return {embryo: savedEmbryo, grade: grade?.title}
    } else {
      const embryoDetails = embryo.details as ExpandedEmbryoDetailsFreeze

      const {cryoSampleContainer, cane} =
        embryoFromDb.state === EmbryoState.Frozen
          ? await this.cryoCardsStrawService.updateStrawsFreezeDetails(
              {
                id: embryoFromDb.cryoSampleContainerId,
                caneId: embryoDetails.caneId,
                canId: embryoDetails.canId,
                date: embryoDetails.freezeDate,
                witness: embryoDetails.freezeWitness,
                comments: embryoDetails.comments,
                gradeId: grade?.id,
              },
              staff.authUserId,
            )
          : await this.cryoCardsStrawService.createStraw(
              {
                inventoryCard,
                strawNumber: ++straws.count,
                caneId: embryoDetails.caneId,
                canId: embryoDetails.canId,
                freezeDate: embryoDetails.freezeDate,
                freezeWitness: embryoDetails.freezeWitness,
                freezeComment: embryoDetails.comments,
              },
              staff.authUserId,
            )

      // biopsy attachments
      await this.createAttachments({
        embryo,
        summary,
        staff,
        cryoCardStrawIdentifier: cryoSampleContainer.identifier,
      })

      const savedEmbryo = await this.ivfTaskExpandedEmbryoRepository.save({
        id: embryoFromDb.id,
        ...embryoWithUpdates,
        assistedHatching: null,
        biopsyRequired: !isNull(embryo.biopsy),
        embryologistId,
        cryoSampleContainerId:
          embryoFromDb.state === EmbryoState.Frozen
            ? embryoFromDb.cryoSampleContainerId
            : cryoSampleContainer.id,
      })
      return {
        embryo: savedEmbryo,
        cryoSampleContainer,
        cryoCane: cane,
        photoNames: embryo.biopsy?.attachments?.map(({title}) => title),
        grade: grade?.title,
      }
    }
  }

  private async createEmbryo(data: {
    embryo: ExpandedEmbryo
    grade: IvfEmbryoGrade
    summary: PatientPlanCohortIvfTaskSummary
    day: number
    inventoryCard: CryoInventoryCard
    staff: Staff
    straws: {count: number}
    embryos: {count: number}
    embryologistId: number | null
  }): Promise<EmbryoInfo> {
    const {grade, summary, inventoryCard, staff, day, embryo, straws, embryos, embryologistId} =
      data

    const embryoState = embryoActionToState[embryo.actionType]

    const newEmbryo: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> = {
      gradeId: grade?.id,
      day,
      state: embryoState,
      patientPlanCohortId: summary.patientPlanCohortId,
    }

    if (embryoState === EmbryoState.FreshET) {
      const embryoDetails = embryo.details as ExpandedEmbryoDetailsFreshET
      const physician = await this.staffRepository.findOneByUUID(embryoDetails.physicianId)

      return {
        embryo: await this.ivfTaskExpandedEmbryoRepository.save({
          ...newEmbryo,
          assistedHatching: embryoDetails.assistedHatching,
          physicianId: physician.id,
          embryoNumber: ++embryos.count,
          embryologistId,
        }),
        grade: grade?.title,
      }
    } else {
      const embryoDetails = embryo.details as ExpandedEmbryoDetailsFreeze
      const {cryoSampleContainer: cryoCardStraw, cane} =
        await this.cryoCardsStrawService.createStraw(
          {
            inventoryCard,
            strawNumber: ++straws.count,
            caneId: embryoDetails.caneId,
            canId: embryoDetails.canId,
            freezeDate: embryoDetails.freezeDate,
            freezeWitness: embryoDetails.freezeWitness,
            freezeComment: embryoDetails.comments,
          },
          staff.authUserId,
        )

      const createdEmbryo = await this.ivfTaskExpandedEmbryoRepository.save({
        ...newEmbryo,
        embryoNumber: ++embryos.count,
        embryologistId,
        biopsyRequired: !isNull(embryo.biopsy),
        cryoSampleContainerId: cryoCardStraw.id,
      })

      if (embryo.biopsy?.attachments) {
        await Promise.all(
          embryo.biopsy?.attachments?.map((attachment) => {
            return this.createAttachment({
              biopsyId: getBiopsyId(cryoCardStraw.identifier),
              embryoId: createdEmbryo.id,
              patientId: summary.patientPlanCohort.patientPlan.patientId,
              patientPlanId: summary.patientPlanCohort.patientPlan.id,
              staff,
              attachment,
            })
          }),
        )
      }
      return {
        embryo: createdEmbryo,
        cryoSampleContainer: cryoCardStraw,
        cryoCane: cane,
        photoNames: embryo.biopsy?.attachments.map((attachment) => attachment.title),
        grade: grade?.title,
      }
    }
  }

  private async createAttachments({
    embryo,
    summary,
    staff,
    cryoCardStrawIdentifier,
  }: {
    embryo: ExpandedEmbryo
    summary: PatientPlanCohortIvfTaskSummary
    staff: Staff
    cryoCardStrawIdentifier: string
  }): Promise<void> {
    if (!embryo.biopsy?.attachments?.length) {
      return
    }
    await Promise.all(
      embryo.biopsy.attachments.map(async (attachment) => {
        const embryoId = await this.ivfTasksV2Service.getEmbryoIdByUUID(embryo.id)
        await this.createAttachment({
          attachment: attachment,
          biopsyId: getBiopsyId(cryoCardStrawIdentifier),
          embryoId,
          patientId: summary.patientPlanCohort.patientPlan.patientId,
          patientPlanId: summary.patientPlanCohort.patientPlan.id,
          staff,
        })
      }),
    )
  }

  private async createAttachment({
    embryoId,
    biopsyId,
    patientId,
    patientPlanId,
    staff,
    attachment,
  }: {
    embryoId: number
    biopsyId: string
    patientId: number
    patientPlanId: number
    staff: Staff
    attachment: BiopsyAttachments
  }): Promise<void> {
    if (!attachment.id) {
      const documentCategory = await this.documentCategoryRepository.findOneBy({
        purpose: DocumentCategoryPurpose.Biopsy,
        type: PatientDocumentType.PatientPlan,
      })

      if (documentCategory) {
        await this.patientDocumentService.createPatientDocument(
          {
            categoryId: documentCategory.id,
            name: biopsyId,
            url: attachment.url,
            patientId,
            patientPlanId,
            type: PatientDocumentType.PatientPlan,
            categoryType: documentCategory.type,
            originalFileName: attachment.originalFileName,
          },
          staff,
        )
      } else {
        StructuredLogger.warn(
          activityLogs.IvfPatientsHelperFunctions.SaveOocytesGroupPhotos,
          activityLogs.IvfPatientsHelperActions.NoDocumentCategory,
          {message: `You don't have active category for Biopsy photos`},
        )
      }

      await this.expandedEmbryoBiopsyAttachmentRepository.save({
        embryoId,
        photoPath: attachment.url,
        title: attachment.title,
      })
    }
    return
  }
  private async getOrCreateInventoryCardForCohort(
    patientPlanCohort: PatientPlanCohort,
    authUserId,
  ): Promise<CryoInventoryCard> {
    const cryoInventoryCardId = patientPlanCohort.patientPlan.embryoCryoInventoryCardId
    if (cryoInventoryCardId) {
      return this.cryoInventoryCardRepository.findOne({
        where: {id: Equal(cryoInventoryCardId)},
        relations: {patient: true, patientPlan: true},
      })
    }
    const createdCryoCard = await this.cryoCardsService.createInventoryCard(
      {
        patientId: patientPlanCohort.patientPlan.patientId,
        date: patientPlanCohort.cohortDate,
        cryoType: CryoSampleType.Embryo,
      },
      authUserId,
    )
    await this.patientPlanRepository.update(
      {id: patientPlanCohort.patientPlan.id},
      {embryoCryoInventoryCardId: createdCryoCard.id},
    )

    return this.cryoInventoryCardRepository.findOne({
      where: {id: Equal(createdCryoCard.id)},
      relations: {patient: true, patientPlan: true},
    })
  }
}
