import {compareAndReturnHistoryChange, toBooleanHistoryValue} from '@libs/common/helpers'
import {CryoCaneV2} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {IvfTaskHistoryPayload} from '../services/ivf-tasks-history.service'
import {PatientPlanCohortIvfTaskDetails} from '@libs/data-layer/apps/clinic-ivf/entities'
import {EmbryoState, IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  generateSingleHistoryItemUpdate,
  IvfTashHistoryUpdate,
  postStrippingHistoryChanges,
} from './ivf-tasks-history.helper'
import {EmbryoStateToLabel, IVFTaskEntityTitle} from '@libs/services-common/enums'
import {DefaultValue} from '@libs/common/enums'
import {DateTimeUtil} from '@libs/common'
import {ProcessedStraw, ProcessedStraws} from '../services/freeze-oocyte.service'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

const getHistoryLocation = (cryoCane: CryoCaneV2): string => {
  if (!cryoCane?.cryoCan?.cryoTank?.name) {
    return null
  }

  const can = cryoCane.cryoCan
  const tank = can.cryoTank

  return `${tank.name} / ${can.name} / ${cryoCane.name}`
}

const day567DetailsChanges = (taskData: {
  details: PatientPlanCohortIvfTaskDetails
  savePayload: IvfTaskHistoryPayload
  taskType: IVFTaskType
}): IvfTashHistoryUpdate[] => {
  const {details, taskType, savePayload} = taskData

  const newDetails = savePayload.taskDetails

  switch (taskType) {
    case IVFTaskType.Day5Check:
      return [
        generateSingleHistoryItemUpdate(details?.day5Arrested, newDetails?.day5Arrested, {
          propertyName: IVFTaskEntityTitle.EmbryosArrested,
        }),
      ]
    case IVFTaskType.Day6Check:
      return [
        generateSingleHistoryItemUpdate(details?.day6Arrested, newDetails?.day6Arrested, {
          propertyName: IVFTaskEntityTitle.EmbryosArrested,
        }),
      ]
    case IVFTaskType.Day7Check:
      return [
        generateSingleHistoryItemUpdate(details?.day7Discarded, newDetails?.day7Discarded, {
          propertyName: IVFTaskEntityTitle.EmbryosDiscarded,
        }),
      ]

    default:
      return []
  }
}

export const day567HistoryChange = (
  taskData: {
    details: PatientPlanCohortIvfTaskDetails
    savePayload: IvfTaskHistoryPayload
    taskType: IVFTaskType
    embryologists: Staff[]
  },
  dateTimeUtil: DateTimeUtil,
): IvfTashHistoryUpdate[] => {
  const {savePayload, embryologists} = taskData

  const {processedEmbryos} = savePayload

  return [
    ...day567DetailsChanges(taskData),
    ...processedEmbryos.map(({from, to}) => {
      const oldStraw = from?.cryoSampleContainer
      const newStraw = to?.cryoSampleContainer

      const oldEmbryo = from?.embryo
      const newEmbryo = to?.embryo
      const oldPhotoNames = oldEmbryo?.state === EmbryoState.Frozen ? from?.photoNames : []
      const oldEmbryologist = embryologists.find(
        (embryologist) => embryologist?.id === oldEmbryo?.embryologistId,
      )
      const newEmbryologist = embryologists.find(
        (embryologist) => embryologist?.id === newEmbryo?.embryologistId,
      )
      return {
        entityTitle: oldStraw?.identifier ?? newStraw?.identifier ?? IVFTaskEntityTitle.FreshET,
        embryoId: oldEmbryo?.id ?? newEmbryo?.id,
        changes: [
          compareAndReturnHistoryChange(
            EmbryoStateToLabel[from?.embryo?.state],
            EmbryoStateToLabel[to?.embryo?.state],
            {
              propertyName: IVFTaskEntityTitle.FreshFreeze,
            },
          ),
          compareAndReturnHistoryChange(oldEmbryo?.assistedHatching, newEmbryo?.assistedHatching, {
            propertyName: IVFTaskEntityTitle.AssistedHatching,
            valueBuilder: toBooleanHistoryValue,
          }),
          compareAndReturnHistoryChange(from?.grade, to?.grade, {
            propertyName: IVFTaskEntityTitle.Grade,
          }),
          compareAndReturnHistoryChange(
            dateTimeUtil.formatBirthDate(oldStraw?.freezeDate),
            dateTimeUtil.formatBirthDate(newStraw?.freezeDate),
            {
              propertyName: IVFTaskEntityTitle.FreezeDate,
            },
          ),
          compareAndReturnHistoryChange(
            getHistoryLocation(from?.cryoCane),
            getHistoryLocation(to?.cryoCane),
            {
              propertyName: IVFTaskEntityTitle.Location,
            },
          ),
          compareAndReturnHistoryChange(oldStraw?.freezeWitness, newStraw?.freezeWitness, {
            propertyName: IVFTaskEntityTitle.FreezeWitness,
          }),
          compareAndReturnHistoryChange(oldStraw?.freezeComment, newStraw?.freezeComment, {
            propertyName: IVFTaskEntityTitle.Comments,
          }),
          compareAndReturnHistoryChange(
            oldEmbryologist
              ? getFullName(oldEmbryologist.firstName, oldEmbryologist.lastName)
              : null,
            newEmbryologist
              ? getFullName(newEmbryologist.firstName, newEmbryologist.lastName)
              : null,
            {
              propertyName: IVFTaskEntityTitle.Embryologist,
            },
          ),
          compareAndReturnHistoryChange(oldEmbryo?.biopsyRequired, newEmbryo?.biopsyRequired, {
            propertyName: IVFTaskEntityTitle.Biopsy,
            valueBuilder: toBooleanHistoryValue,
          }),
          compareAndReturnHistoryChange(
            oldPhotoNames?.join('\n') || DefaultValue.Dash,
            to?.photoNames?.join('\n') || DefaultValue.Dash,
            {
              propertyName: IVFTaskEntityTitle.Photo,
            },
          ),
        ],
      }
    }),
  ]
}

export const strawsHistoryChange = (
  processedStraws: ProcessedStraws,
  dateTimeUtil: DateTimeUtil,
): IvfTashHistoryUpdate[] => {
  if (!processedStraws) {
    return []
  }
  return processedStraws.map((straw: ProcessedStraw) => {
    const filledStraw = straw.from ?? straw.to

    const oldStraw = straw?.from?.cryoSampleContainer
    const newStraw = straw?.to?.cryoSampleContainer

    return {
      entityTitle: `${filledStraw?.name} ${DefaultValue.LongDash} ${filledStraw?.cryoSampleContainer?.identifier}`,
      changes: [
        compareAndReturnHistoryChange(oldStraw?.eggCount, newStraw?.eggCount, {
          propertyName: IVFTaskEntityTitle.Eggs,
        }),
        compareAndReturnHistoryChange(
          dateTimeUtil.formatBirthDate(oldStraw?.freezeDate),
          dateTimeUtil.formatBirthDate(newStraw?.freezeDate),
          {
            propertyName: IVFTaskEntityTitle.FreezeDate,
          },
        ),
        compareAndReturnHistoryChange(
          getHistoryLocation(oldStraw?.cryoCane),
          getHistoryLocation(newStraw?.cryoCane),
          {
            propertyName: IVFTaskEntityTitle.Location,
          },
        ),
        compareAndReturnHistoryChange(oldStraw?.freezeWitness, newStraw?.freezeWitness, {
          propertyName: IVFTaskEntityTitle.FreezeWitness,
        }),
        compareAndReturnHistoryChange(oldStraw?.freezeComment, newStraw?.freezeComment, {
          propertyName: IVFTaskEntityTitle.Comments,
        }),
      ],
    }
  })
}

export const freezingOocytesHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
  dateTimeUtil: DateTimeUtil,
): IvfTashHistoryUpdate[] => {
  const {processedStraws} = savePayload

  return [
    ...postStrippingHistoryChanges(detail, savePayload),
    ...strawsHistoryChange(processedStraws, dateTimeUtil),
  ]
}

export const getEmbryologistIds = (savePayload: IvfTaskHistoryPayload): number[] => {
  const processedEmbryos = savePayload.processedEmbryos
  return [
    ...processedEmbryos.map((item) => item?.from?.embryo?.embryologistId),
    ...processedEmbryos.map((item) => item?.to?.embryo?.embryologistId),
  ].filter((embryologistId) => !!embryologistId)
}
