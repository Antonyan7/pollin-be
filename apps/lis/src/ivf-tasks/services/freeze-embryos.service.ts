import {Injectable} from '@nestjs/common'
import {FreezeEmbryoResponse} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskExpandedEmbryo,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  IvfEmbryoGradeRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {
  filterAttachments,
  findGrade,
  findMediaLot,
  getAttachments,
  getBiopsyId,
} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {FreezeEmbryoRequest} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {PatientPlanCohortFrozenEmbryoTransferRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/patient-plan-cohort-frozen-embryo-transfer.repository'
import {In} from 'typeorm'
import {
  DateTimeUtil,
  handleOptionalNumberValues,
  handleOptionalStringValues,
  NestprojectConfigService,
} from '@libs/common'
import {IvfFreezeEmbryoBiopsyStates} from '@libs/services-common/enums'
import {EggStatusLabel} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {CryoSampleContainerRepository} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {CryoInventoryCapacityService} from '@apps/lis/cryo-cards/services/cryo-inventory-capacity.service'
import {MediaLotRepository} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {IVFDispositionReasonRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'

@Injectable()
export class FreezeEmbryosService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly configService: NestprojectConfigService,
    private readonly ivfDispositionReasonRepository: IVFDispositionReasonRepository,
    private readonly cryoInventoryCapacityService: CryoInventoryCapacityService,
    private readonly ivfTaskExpandedEmbryoRepository: PatientPlanCohortIvfTaskExpandedEmbryoRepository,
    private readonly patientPlanCohortFrozenEmbryoTransferRepository: PatientPlanCohortFrozenEmbryoTransferRepository,
    private readonly cryoSampleContainerRepository: CryoSampleContainerRepository,
    private readonly mediaLotRepository: MediaLotRepository,
    private readonly ivfEmbryoGradeRepository: IvfEmbryoGradeRepository,
  ) {}

  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  async saveFrozenEmbryos(
    patientPlanCohortId: number,
    payload: FreezeEmbryoRequest,
    patientId: number,
  ): Promise<void> {
    const [dispositions, selectedEmbryos, mediaLots, grades] = await Promise.all([
      this.ivfDispositionReasonRepository.find({
        where: {uuid: In(payload.selectedEmbryos.map((embryo) => embryo.dispositionId))},
      }),
      this.ivfTaskExpandedEmbryoRepository.find({
        where: {
          uuid: In(payload.selectedEmbryos.map((embryo) => embryo.id)),
        },
        relations: {cryoSampleContainer: {cryoInventoryCard: true}},
      }),
      this.mediaLotRepository.find({
        where: {
          active: true,
          uuid: In(payload.selectedEmbryos.map((embryo) => embryo.mediaLotId)),
        },
      }),
      this.ivfEmbryoGradeRepository.findManyByUUIDs(
        payload.selectedEmbryos.map((embryo) => embryo.regradeId),
      ),
    ])

    const dispositionMap = new Map()
    dispositions.forEach((disposition) => {
      dispositionMap.set(disposition.uuid, disposition)
    })

    if (selectedEmbryos.length) {
      await this.patientPlanCohortFrozenEmbryoTransferRepository.save(
        selectedEmbryos.map((selectedEmbryo) => {
          const matchingRequestEmbryo = payload.selectedEmbryos.find(
            (embryo) => embryo.id === selectedEmbryo.uuid,
          )
          return {
            patientPlanCohortId: patientPlanCohortId,
            expandedEmbryoId: selectedEmbryo.id,
            ivfDispositionReasonId: matchingRequestEmbryo
              ? dispositionMap.get(matchingRequestEmbryo.dispositionId)?.id || null
              : null,
          }
        }),
      )
    }

    const promises = []
    selectedEmbryos.map(async (selectedEmbryo) => {
      const mediaLot = findMediaLot(mediaLots, payload.selectedEmbryos, selectedEmbryo)
      const grade = findGrade(grades, payload.selectedEmbryos, selectedEmbryo)
      promises.push(
        this.cryoSampleContainerRepository.update(
          {
            id: selectedEmbryo.cryoSampleContainerId,
          },
          {
            status: CryoStatus.Transferred,
            freezeMediaLotId: handleOptionalNumberValues(mediaLot?.id),
          },
        ),
      )
      promises.push(
        this.ivfTaskExpandedEmbryoRepository.update(
          {
            id: selectedEmbryo.id,
          },
          {
            reGradeId: handleOptionalNumberValues(grade?.id),
          },
        ),
      )
    })
    await Promise.all(promises)

    await PubSubHelpers.publishPatientSampleUpdated(patientId)

    const allEmbryos =
      await this.ivfTaskExpandedEmbryoRepository.findByPatientIdForFreeze(patientId)
    const tankIds = [
      ...new Set(
        allEmbryos.map((embryo) => embryo.cryoSampleContainer.cryoCane?.cryoCan?.cryoTankId),
      ),
    ]
    await this.cryoInventoryCapacityService.updateCapacity(tankIds)
  }

  async getResponse(
    patientPlan: PatientPlan,
    patientPlanCohortDetails: PatientPlanCohortIvfTaskDetails,
  ): Promise<FreezeEmbryoResponse> {
    const allEmbryos = await this.ivfTaskExpandedEmbryoRepository.findByPatientIdForFreeze(
      patientPlan.patientId,
    )
    const allTransferredEmbryos =
      await this.patientPlanCohortFrozenEmbryoTransferRepository.findAllTransferredEmbryosByPatientId(
        patientPlan.patientId,
      )
    const transferredFromOtherCohort = allTransferredEmbryos.filter(
      (transferredEmbryo) =>
        transferredEmbryo.patientPlanCohortId !== patientPlanCohortDetails.patientPlanCohortId,
    )

    const frozenEmbryoIds = new Set(
      allTransferredEmbryos.map((frozenEmbryo) => frozenEmbryo.expandedEmbryoId),
    )

    const embryoDispositionMap = new Map(
      allTransferredEmbryos.map((frozenEmbryo) => {
        return [frozenEmbryo.expandedEmbryoId, frozenEmbryo.ivfDispositionReason?.uuid || null]
      }),
    )

    const biopsyAttachements = await getAttachments(allEmbryos)
    return {
      uterusContributor: patientPlan.detail.uterusContributor
        ? {
            patientId: patientPlan.detail.uterusContributor.uuid,
            patientName: getFullName(
              patientPlan.detail.uterusContributor.firstName,
              patientPlan.detail.uterusContributor.lastName,
            ),
          }
        : null,
      embryoOptions: allEmbryos
        .filter(
          (embryo) =>
            !transferredFromOtherCohort.find(
              (transferredEmbryo) => transferredEmbryo.expandedEmbryoId === embryo.id,
            ),
        )
        .map((embryo) => {
          const patientPlan = embryo.patientPlanCohort?.patientPlan

          return {
            id: embryo.uuid,
            title: this.getEmbryoFreezeTitle(embryo),
            biopsy: embryo.biopsyRequired
              ? {
                  id: getBiopsyId(embryo?.cryoSampleContainer.identifier),
                  attachments: filterAttachments(biopsyAttachements, embryo),
                }
              : null,
            comments: embryo.cryoSampleContainer.freezeComment,
            patientPlan: patientPlan
              ? {
                  id: patientPlan.uuid,
                  title: patientPlan.planType.title,
                }
              : null,
            cryoCard: !patientPlan
              ? {
                  id: embryo.cryoSampleContainer.cryoInventoryCard?.uuid || null,
                }
              : null,
            isChecked: frozenEmbryoIds.has(embryo.id),
            dispositionId: embryoDispositionMap.get(embryo.id) || null,
            mediaLotId: handleOptionalStringValues(embryo.cryoSampleContainer.freezeMediaLot?.uuid),
            regradeId: handleOptionalStringValues(embryo.ivfEmbryoReGrade?.uuid),
            details: {
              freezeDate: embryo.cryoSampleContainer.freezeDate,
              tankId: handleOptionalStringValues(
                embryo.cryoSampleContainer.cryoCane?.cryoCan?.cryoTank?.uuid,
              ),
              canId: handleOptionalStringValues(embryo.cryoSampleContainer.cryoCane?.cryoCan?.uuid),
              caneId: handleOptionalStringValues(embryo.cryoSampleContainer.cryoCane?.uuid),
              freezeWitness: handleOptionalStringValues(embryo.cryoSampleContainer.freezeWitness),
              comments: handleOptionalStringValues(embryo.cryoSampleContainer.freezeComment),
              status: embryo.cryoSampleContainer.status,
              eggCount: null,
              grade: handleOptionalStringValues(embryo.ivfEmbryoGrade?.uuid),
            },
          }
        }),
      embryosToTransfer: patientPlan.embryoTypeInstructions
        ? patientPlan.embryoTypeInstructions.map((embryoTypeInstructions, index) => ({
            id: index + embryoTypeInstructions.embryoType.uuid, // To Ensure uniqueness it's just for React Indexes
            title: `Embryo ${index + 1}`,
            type: embryoTypeInstructions.embryoType.title,
          }))
        : [],
      physicianId: patientPlanCohortDetails.fetPhysician?.uuid || null,
      thawTechId: patientPlanCohortDetails.fetThawTech?.uuid || null,
      transferTechId: patientPlanCohortDetails.fetTransferTech?.uuid || null,
      numberOfEmbryosThawed: patientPlanCohortDetails.numberOfEmbryosThawed,
      oocyteSource: EggStatusLabel[patientPlan.detail.eggStatus],
      donorId: patientPlan.detail.eggDonorId,
      catheterId: handleOptionalStringValues(patientPlanCohortDetails.fetCatheter?.uuid),
    }
  }
  private getEmbryoFreezeTitle(embryo: PatientPlanCohortIvfTaskExpandedEmbryo): string {
    const freezeDate = this.dateTimeUtil.extractDateTz(
      this.dateTimeUtil.toDate(embryo?.cryoSampleContainer?.freezeDate),
    )
    const biopsyState = embryo.biopsyRequired
      ? IvfFreezeEmbryoBiopsyStates.Tested
      : IvfFreezeEmbryoBiopsyStates.Untested

    const parts = [embryo.cryoSampleContainer.identifier]

    if (embryo?.ivfEmbryoGrade?.title) {
      parts.push(embryo.ivfEmbryoGrade.title)
    }

    if (embryo?.cryoSampleContainer?.freezeDate) {
      parts.push(`FZ: ${freezeDate}`)
    }

    if (embryo.day) {
      parts.push(`${biopsyState}`)
    }

    return parts.join(' • ')
  }
}
