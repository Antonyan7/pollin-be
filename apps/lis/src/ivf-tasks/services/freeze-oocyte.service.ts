import {Injectable} from '@nestjs/common'
import {CryoCardsStrawService} from '@apps/lis/cryo-cards/services/cryo-cards-straw.service'
import {CryoCardsService} from '@apps/lis/cryo-cards/services/cryo-cards.service'
import {
  CryoInventoryCardRepository,
  CryoSampleContainerRepository,
  CryoTankV2Repository,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {
  PatientPlanCohort,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  CryoInventoryCard,
  CryoSampleContainer,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {Equal} from 'typeorm'
import {CryoSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {
  OocyteFreezing,
  OocyteStraw,
  ProcessOocytesDTO,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {PatientPlanCohortCryoSampleContainersRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/patient-plan-cohort-cryo-sample-containers.repository'
import {BadRequestException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {getStrawName} from '../helper/generate-update-detail-payload.helper'
import {handleOptionalStringValues} from '@libs/common'
import {CryoType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {PatientPlanCohortCryoSampleContainers} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-cryo-sample-containers.entity'
import {CryoInventoryCapacityService} from '@apps/lis/cryo-cards/services/cryo-inventory-capacity.service'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {IVFTaskEntityTitle} from '@libs/services-common/enums'
import {IvfTaskHistoryRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/fireorm'
import {DefaultValue} from '@libs/common/enums'

type StrawInfo = {
  cryoSampleContainer: CryoSampleContainer
  name: string
}

export type ProcessedStraw = {from: StrawInfo; to: StrawInfo}
export type ProcessedStraws = ProcessedStraw[]

@Injectable()
export class FreezeOocyteService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly cryoCardsStrawService: CryoCardsStrawService,
    private readonly cryoCardsService: CryoCardsService,
    private readonly cryoInventoryCardRepository: CryoInventoryCardRepository,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly patientPlanCohortCryoSampleContainersRepository: PatientPlanCohortCryoSampleContainersRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly cryoSampleContainerRepository: CryoSampleContainerRepository,
    private readonly cryoTankV2Repository: CryoTankV2Repository,
    private readonly cryoInventoryCapacityService: CryoInventoryCapacityService,
    private readonly ivfTaskHistoryRepository: IvfTaskHistoryRepository,
  ) {}

  async validateStrawNumber(oocyteStraws: OocyteStraw[], patientPlanId: number): Promise<void> {
    const lastStrawNumber = await this.cryoSampleContainerRepository.maximum('strawNumber', {
      cryoInventoryCard: {eggPatientPlan: {id: Equal(patientPlanId)}},
    })
    const payloadStrawNumbers = oocyteStraws
      .filter((straw) => !straw.id)
      .map(({strawNumber}) => strawNumber)

    if (!payloadStrawNumbers.length) {
      return
    }
    const orderedStrawNumbers = new Set(payloadStrawNumbers.map((a, i) => a - i))

    if (
      orderedStrawNumbers.size > 1 ||
      orderedStrawNumbers.values().next().value !== lastStrawNumber + 1
    ) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.WRONG_STRAW_NUMBERING))
    }
  }

  async processOocytes(data: ProcessOocytesDTO): Promise<ProcessedStraws> {
    const {patientPlanCohort, oocyteStraws, authUserId, cryoType, summary, staff} = data
    await this.validateStrawNumber(oocyteStraws, patientPlanCohort.patientPlanId)
    let inventoryCard
    const straws = {count: 0}
    const eggs = {count: 0}

    const existingOocytes =
      await this.patientPlanCohortCryoSampleContainersRepository.getByPatientPlanCohortId(
        patientPlanCohort.id,
        cryoType,
      )

    await this.softDeleteOocytes({existingOocytes, oocyteStraws, summary, staff})
    const processedStraws: ProcessedStraws = []

    if (oocyteStraws.length > 0) {
      await Promise.all(
        existingOocytes.map(async (existingOocyte, index) => {
          const matchedOocyteStraw = oocyteStraws.find((oocyteStraw) => {
            return oocyteStraw.id === existingOocyte.cryoSampleContainer.uuid
          })

          const strawNumber = index + 1
          if (matchedOocyteStraw) {
            const {cryoSampleContainer, cane} =
              await this.cryoCardsStrawService.updateStrawsFreezeDetails(
                {
                  id: existingOocyte.cryoSampleContainer.id,
                  caneId: matchedOocyteStraw.details.caneId,
                  canId: matchedOocyteStraw.details.canId,
                  date: matchedOocyteStraw.details.freezeDate,
                  witness: matchedOocyteStraw.details.freezeWitness,
                  comments: matchedOocyteStraw.details.comments,
                  eggCount: matchedOocyteStraw.numberOfEggs,
                },
                authUserId,
              )

            processedStraws.push({
              from: {
                cryoSampleContainer: {
                  ...existingOocyte.cryoSampleContainer,
                  cryoCane: {
                    ...existingOocyte.cryoSampleContainer?.cryoCane,
                    cryoCan: existingOocyte.cryoSampleContainer?.cryoCan,
                  },
                },
                name: getStrawName(strawNumber),
              },
              to: {
                cryoSampleContainer: {...cryoSampleContainer, cryoCane: {...cane}},
                name: getStrawName(strawNumber),
              },
            })

            return
          }
        }),
      )

      let createdStrawNumber = existingOocytes.length + 1

      if (oocyteStraws.find((straw) => !straw.id)) {
        inventoryCard = await this.getOrCreateInventoryCardForCohort(patientPlanCohort, authUserId)
        straws.count = await this.cryoSampleContainerRepository.maximum('strawNumber', {
          cryoInventoryCard: {eggPatientPlan: {id: Equal(patientPlanCohort.patientPlanId)}},
        })
        eggs.count = await this.getLastEggNumber(patientPlanCohort.id, cryoType)
      }
      for await (const oocyteStraw of oocyteStraws) {
        if (!oocyteStraw.id) {
          const {cryoSampleContainer, cane} = await this.cryoCardsStrawService.createStraw(
            {
              inventoryCard,
              strawNumber: ++straws.count,
              caneId: oocyteStraw.details.caneId,
              canId: oocyteStraw.details.canId,
              freezeDate: oocyteStraw.details.freezeDate,
              freezeWitness: oocyteStraw.details.freezeWitness,
              freezeComment: oocyteStraw.details.comments,
              eggCount: oocyteStraw.numberOfEggs,
            },
            authUserId,
          )
          await this.patientPlanCohortCryoSampleContainersRepository.save({
            eggNumber: ++eggs.count,
            patientPlanCohortId: patientPlanCohort.id,
            cryoSampleContainerId: cryoSampleContainer.id,
            type: cryoType,
          })

          processedStraws.push({
            from: null,
            to: {
              cryoSampleContainer: {...cryoSampleContainer, cryoCane: {...cane}},
              name: getStrawName(createdStrawNumber),
            },
          })

          createdStrawNumber++
        }
      }
      return processedStraws
    }
  }

  async getLastEggNumber(patientPlanCohortId: number, cryoType: CryoType): Promise<number> {
    return this.patientPlanCohortCryoSampleContainersRepository.maximum('eggNumber', {
      patientPlanCohortId,
      type: cryoType,
    })
  }
  async softDeleteOocytes({
    existingOocytes,
    oocyteStraws,
    summary,
    staff,
  }: {
    existingOocytes: PatientPlanCohortCryoSampleContainers[]
    oocyteStraws: OocyteStraw[]
    staff: Staff
    summary: PatientPlanCohortIvfTaskSummary
  }): Promise<void> {
    const deletedOocytes = existingOocytes.filter(
      (existingOocyte) =>
        !oocyteStraws.some((straw) => straw.id === existingOocyte.cryoSampleContainer.uuid),
    )
    const oocyteStrawsToDeleteUUIDs = deletedOocytes.map(
      (oocyte) => oocyte.cryoSampleContainer.uuid,
    )

    const affectedTanks =
      await this.cryoTankV2Repository.findWithRelationsByStrawUUIDs(oocyteStrawsToDeleteUUIDs)

    const affectedTankIds = affectedTanks.map(({id}) => id)

    const histories = deletedOocytes.map((oocyte) => {
      return {
        authUserFullName: getFullName(staff.firstName, staff.lastName),
        authUserId: staff.authUserId,
        entityTitle: null,
        changes: [
          {
            from: oocyte.cryoSampleContainer.identifier,
            to: DefaultValue.Dash,
            propertyName: IVFTaskEntityTitle.Straw,
          },
        ],
        sourceTaskSummaryId: summary.id,
        sourceTaskEmbryoId: null,
        updatedBy: staff.authUserId,
      }
    })

    await this.ivfTaskHistoryRepository.saveMultiple(histories)

    await this.cryoSampleContainerRepository.softRemove(
      deletedOocytes.map((oocyte) => oocyte.cryoSampleContainer),
    )
    if (affectedTankIds.length > 0) {
      await this.cryoInventoryCapacityService.updateCapacity(affectedTankIds)
    }

    await this.patientPlanCohortCryoSampleContainersRepository.softRemove(deletedOocytes)
  }

  async getResponse(
    detail: PatientPlanCohortIvfTaskDetails,
    patientPlanCohort: PatientPlanCohort,
  ): Promise<OocyteFreezing> {
    const [existingOocytes, lastStrawNumber] = await Promise.all([
      this.patientPlanCohortCryoSampleContainersRepository.getByPatientPlanCohortIdWithCryoSamleContainer(
        patientPlanCohort.id,
        CryoType.OocyteFreezing,
      ),
      this.cryoSampleContainerRepository.maximum('strawNumber', {
        cryoInventoryCard: {eggPatientPlan: {id: Equal(patientPlanCohort.patientPlan.id)}},
      }),
    ])

    return {
      totalOocyteCollected: detail.oocytesCollected,
      matureOocytes: detail.matureOocytes,
      immatureOocytes: detail.immatureOocytes,
      degenOocytes: detail.degenOocytes,
      abnormalOocytes: detail.abnormalOocytes,
      lastStrawNumber,
      straws: existingOocytes.map((oocyte) => ({
        id: oocyte.cryoSampleContainer.uuid,
        title: `Straw ${oocyte.cryoSampleContainer.strawNumber}`,
        numberOfEggs: oocyte.cryoSampleContainer.eggCount,
        identifier: oocyte.cryoSampleContainer.identifier,
        details: {
          freezeDate: oocyte.cryoSampleContainer.freezeDate,
          tankId: handleOptionalStringValues(oocyte.cryoSampleContainer.cryoCan?.cryoTank?.uuid),
          canId: handleOptionalStringValues(oocyte.cryoSampleContainer.cryoCan?.uuid),
          caneId: handleOptionalStringValues(oocyte.cryoSampleContainer.cryoCane?.uuid),
          freezeWitness: oocyte.cryoSampleContainer.freezeWitness,
          comments: oocyte.cryoSampleContainer.freezeComment,
          status: oocyte.cryoSampleContainer.status,
        },
      })),
    }
  }

  private async getOrCreateInventoryCardForCohort(
    patientPlanCohort: PatientPlanCohort,
    authUserId,
  ): Promise<CryoInventoryCard> {
    const cryoInventoryCardId = patientPlanCohort.patientPlan.eggCryoInventoryCardId
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
        cryoType: CryoSampleType.Egg,
      },
      authUserId,
    )
    await this.patientPlanRepository.update(
      {id: patientPlanCohort.patientPlan.id},
      {eggCryoInventoryCardId: createdCryoCard.id},
    )

    return this.cryoInventoryCardRepository.findOne({
      where: {id: Equal(createdCryoCard.id)},
      relations: {patient: true},
    })
  }

  validatePayload(
    changedDetails: OocyteFreezing,
    currentDetails: PatientPlanCohortIvfTaskDetails,
  ): void {
    if (
      changedDetails.immatureOocytes +
        changedDetails.matureOocytes +
        changedDetails.degenOocytes +
        changedDetails.abnormalOocytes >
      currentDetails.oocytesCollected
    ) {
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.OOCYTE_ARE_MORE_THAN_TOTAL),
      )
    }

    const totalEggsCount = changedDetails.straws.reduce((acc, straw) => {
      return acc + straw.numberOfEggs
    }, 0)

    if (totalEggsCount > changedDetails.matureOocytes) {
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.TOTAL_EGG_COUNT_EXCEEDED),
      )
    }
  }

  async checkSignOffEligibility(
    detail: PatientPlanCohortIvfTaskDetails,
    patientPlanCohortId: number,
  ): Promise<void> {
    const existingOocytesCount =
      await this.patientPlanCohortCryoSampleContainersRepository.countEggsPatientPlanCohortIdWithCryoSamleContainer(
        patientPlanCohortId,
        CryoType.OocyteFreezing,
      )

    if (existingOocytesCount < detail.matureOocytes) {
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.LOW_FROZEN_EGG_COUNT, {count: detail.matureOocytes}),
      )
    }
  }
}
