import {PatientPlanCohortIvfTaskDetails} from '@libs/data-layer/apps/clinic-ivf/entities'
import {IvfTaskHistoryPayload} from '../services/ivf-tasks-history.service'
import {DefaultValue} from '@libs/common/enums'
import {
  injectionAssessmentIsEnabledFieldToPropertyName,
  injectionAssessmentFieldToPropertyName,
  injectionAssessmentBooleanFieldToPropertyName,
  IVFTaskEntityTitle,
} from '@libs/services-common/enums'
import {IvfTaskHistoryChange} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {
  compareAndReturnHistoryChange,
  toBooleanHistoryValue,
  toHistoryValue,
} from '@libs/common/helpers'
import {fertilizationCheckResponse} from './ivf-task.helper'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {SourceGroupTypeEnum} from '../dto/ivf-tasks-request.dto'
import {DateTimeUtil} from '@libs/common'
import {strawsHistoryChange} from './ivf-tasks-day-567-history.helper'
import {getFullName} from '@libs/common/helpers/patient.helper'

export class IvfTashHistoryUpdate {
  entityTitle?: string
  changes: IvfTaskHistoryChange[]
  embryoId?: number
}

type HistoryItemOptions = {
  propertyName: string
  unit?: string
  valueBuilder?: (value: HistoryValueType) => string
}

type HistoryValueType = PatientPlanCohortIvfTaskDetails[keyof PatientPlanCohortIvfTaskDetails]

export const generateSingleHistoryItemUpdate = (
  oldValue: string | number | boolean,
  newValue: string | number | boolean,
  options: HistoryItemOptions,
): IvfTashHistoryUpdate => ({
  changes: [compareAndReturnHistoryChange(oldValue, newValue, options)],
})

export const filterEmptyHistoryUpdates = (
  historyUpdates: IvfTashHistoryUpdate[],
): IvfTashHistoryUpdate[] => {
  if (!historyUpdates?.length) {
    return []
  }

  return historyUpdates
    .map((historyChange) => {
      historyChange.changes = historyChange.changes?.filter((item) => item)
      return historyChange
    })
    .filter((historyChange) => historyChange.changes?.length)
}

export const oocytesCollectionoHistoryChanges = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  const oldEmbryologist = detail.oocyteCollectionEmbryologist
  const oldEmbryologistName = oldEmbryologist
    ? getFullName(oldEmbryologist.firstName, oldEmbryologist.lastName)
    : null

  return [
    generateSingleHistoryItemUpdate(detail.oocytesCollected, newDetails.oocytesCollected, {
      propertyName: IVFTaskEntityTitle.OocytesCollected,
    }),
    generateSingleHistoryItemUpdate(detail.oocytesWarmed, newDetails.oocytesWarmed, {
      propertyName: IVFTaskEntityTitle.OocytesWarmed,
    }),
    generateSingleHistoryItemUpdate(detail.oocytesSurvived, newDetails.oocytesSurvived, {
      propertyName: IVFTaskEntityTitle.OocytesSurvived,
    }),
    generateSingleHistoryItemUpdate(oldEmbryologistName, savePayload.embryologistName, {
      propertyName: IVFTaskEntityTitle.Embryologist,
    }),
  ]
}

export const spermWashHistoryChanges = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  return [
    generateSingleHistoryItemUpdate(
      toHistoryValue(
        detail.spermWashInitialConcentration,
        detail.spermWashInitialConcentrationUnit?.title,
      ),
      toHistoryValue(
        newDetails.spermWashInitialConcentration,
        savePayload.propertyToUnit?.get('spermWashInitialConcentrationUnit'),
      ),
      {
        propertyName: IVFTaskEntityTitle.InitialConcentration,
      },
    ),
    generateSingleHistoryItemUpdate(
      toHistoryValue(
        detail.spermWashFinalConcentration,
        detail.spermWashFinalConcentrationUnit?.title,
      ),
      toHistoryValue(
        newDetails.spermWashFinalConcentration,
        savePayload.propertyToUnit?.get('spermWashFinalConcentrationUnit'),
      ),
      {
        propertyName: IVFTaskEntityTitle.FinalConcentration,
      },
    ),
    generateSingleHistoryItemUpdate(
      detail.spermWashInitialMotility,
      newDetails.spermWashInitialMotility,
      {
        propertyName: IVFTaskEntityTitle.InitialMotility,
      },
    ),
    generateSingleHistoryItemUpdate(
      detail.spermWashFinalMotility,
      newDetails.spermWashFinalMotility,
      {
        propertyName: IVFTaskEntityTitle.FinalMotility,
      },
    ),
  ]
}

export const postStrippingHistoryChanges = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  const updates = [
    generateSingleHistoryItemUpdate(detail.matureOocytes, newDetails.matureOocytes, {
      propertyName: IVFTaskEntityTitle.MatureOocytes,
    }),
    generateSingleHistoryItemUpdate(detail.immatureOocytes, newDetails.immatureOocytes, {
      propertyName: IVFTaskEntityTitle.ImmatureOocytes,
    }),
    generateSingleHistoryItemUpdate(detail.degenOocytes, newDetails.degenOocytes, {
      propertyName: IVFTaskEntityTitle.DegenOocytes,
    }),
    generateSingleHistoryItemUpdate(detail.abnormalOocytes, newDetails.abnormalOocytes, {
      propertyName: IVFTaskEntityTitle.AbnormalOocytes,
    }),
  ]

  if (savePayload.cohortSpawned) {
    updates.push(
      generateSingleHistoryItemUpdate(DefaultValue.Dash, 'spawned', {
        propertyName: IVFTaskEntityTitle.NewCohort,
      }),
    )
  }

  return updates
}

export const matureOocyteGroupPhotoHistoryChanges = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newPhotos = savePayload.groupPhotos
  if (!newPhotos?.length) {
    return
  }

  const oldPhotos = detail.matureOocyteGroups
    .filter(({day}) => day === savePayload.day)
    .map((photo) => photo.title)
  const oldPhotosString = oldPhotos.join('\n')
  const newPhotosString = newPhotos.map(({title}) => title).join('\n')

  return [
    {
      changes: [
        {
          from: oldPhotos.length ? oldPhotosString : DefaultValue.Dash,
          to: oldPhotos.length ? oldPhotosString + '\n' + newPhotosString : newPhotosString,
          propertyName: IVFTaskEntityTitle.Attachments,
        },
      ],
    },
  ]
}

export const icsiInjectionhistoryChanges = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  return [
    generateSingleHistoryItemUpdate(detail.icsiSplit, newDetails.icsiSplit, {
      propertyName: IVFTaskEntityTitle.Split,
    }),
    generateSingleHistoryItemUpdate(
      detail.icsiMatureOocytesInjected,
      newDetails.icsiMatureOocytesInjected,
      {
        propertyName: IVFTaskEntityTitle.MatureOocytesInjected,
      },
    ),
  ]
}

export const oocytesInseminationHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  return [
    generateSingleHistoryItemUpdate(detail.oocytesInseminated, newDetails.oocytesInseminated, {
      propertyName: IVFTaskEntityTitle.OocytesInseminated,
    }),
  ]
}

export const picsiHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  return [
    generateSingleHistoryItemUpdate(
      detail.picsiMatureOocytesInjected,
      newDetails.picsiMatureOocytesInjected,
      {
        propertyName: IVFTaskEntityTitle.MatureOocytesInjected,
      },
    ),
    generateSingleHistoryItemUpdate(detail.picsiImmatureOocytes, newDetails.picsiImmatureOocytes, {
      propertyName: IVFTaskEntityTitle.ImmatureOocytes,
    }),
  ]
}

export const miiDay1HistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
  dateTimeUtil: DateTimeUtil,
): IvfTashHistoryUpdate[] => {
  const {taskDetails, processedStraws} = savePayload

  return [
    generateSingleHistoryItemUpdate(detail.matureOocytesToCry, taskDetails.matureOocytesToCry, {
      propertyName: IVFTaskEntityTitle.MatureOocytesToCryo,
    }),
    generateSingleHistoryItemUpdate(detail.oocytesDiscarded, taskDetails.oocytesDiscarded, {
      propertyName: IVFTaskEntityTitle.OocytesDiscarded,
    }),
    ...strawsHistoryChange(processedStraws, dateTimeUtil),
  ]
}

export const embryoGroupPhotoHistoryChanges = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newPhotos = savePayload.groupPhotos
  if (!newPhotos?.length) {
    return
  }

  const oldPhotos = detail.embryoGroupPhotos
    .filter(({day}) => day === savePayload.day)
    .map((photo) => photo.title)

  const oldPhotosString = oldPhotos.join('\n')
  const newPhotosString = newPhotos.map(({title}) => title).join('\n')

  return [
    {
      changes: [
        {
          from: oldPhotos.length ? oldPhotosString : DefaultValue.Dash,
          to: oldPhotos.length ? oldPhotosString + '\n' + newPhotosString : newPhotosString,
          propertyName: IVFTaskEntityTitle.Attachments,
        },
      ],
    },
  ]
}

export const callPatientHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  return [
    generateSingleHistoryItemUpdate(detail.callDate, newDetails.callDate, {
      propertyName: IVFTaskEntityTitle.CallThePatient,
    }),
  ]
}

const getQualityRating = (value: HistoryValueType): string => {
  const number = parseInt(String(value))

  if (isNaN(number)) {
    return DefaultValue.Dash
  }

  return '+'.repeat(number)
}
export const injectionAssessmentHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  const changes = Object.keys(newDetails).reduce(
    (changes, key: keyof PatientPlanCohortIvfTaskDetails) => {
      if (injectionAssessmentIsEnabledFieldToPropertyName.has(key)) {
        const value = injectionAssessmentIsEnabledFieldToPropertyName.get(key)
        if (value) {
          const enableStateValue = injectionAssessmentBooleanFieldToPropertyName.get(key)
          const oldValue = detail[key] ? enableStateValue : DefaultValue.Dash
          const newValue = newDetails[key] ? enableStateValue : DefaultValue.Dash

          const change = compareAndReturnHistoryChange(oldValue, newValue, {
            propertyName: `${value}`,
          })
          if (change) {
            changes.push(change)
          }
        }
      } else if (injectionAssessmentFieldToPropertyName.has(key)) {
        const propertyName = injectionAssessmentFieldToPropertyName.get(key)
        if (propertyName) {
          const change = compareAndReturnHistoryChange(
            getQualityRating(detail[key]),
            getQualityRating(newDetails[key]),
            {
              propertyName,
            },
          )
          if (change) {
            changes.push(change)
          }
        }
      }

      return changes
    },
    [],
  )
  return [
    generateSingleHistoryItemUpdate(detail.oocyteAnomaly, newDetails.oocyteAnomaly, {
      propertyName: IVFTaskEntityTitle.Anomaly,
      valueBuilder: toBooleanHistoryValue,
    }),
    generateSingleHistoryItemUpdate(detail.oocyteQuality, newDetails.oocyteQuality, {
      propertyName: IVFTaskEntityTitle.OocyteQuality,
    }),
    {
      entityTitle: IVFTaskEntityTitle.OocytesAssessment,
      changes,
    },
    generateSingleHistoryItemUpdate(
      detail.oocyteAssessmentsComment,
      newDetails.oocyteAssessmentsComment,
      {
        propertyName: IVFTaskEntityTitle.OocyteComments,
      },
    ),
  ]
}

export const day3CheckHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  return [
    generateSingleHistoryItemUpdate(
      detail.day3EmbryosMoreThan6Cells,
      newDetails.day3EmbryosMoreThan6Cells,
      {
        propertyName: IVFTaskEntityTitle.EmbryosMoreThan6Cells,
      },
    ),
    generateSingleHistoryItemUpdate(
      detail.day3EmbryosLessThan6Cells,
      newDetails.day3EmbryosLessThan6Cells,
      {
        propertyName: IVFTaskEntityTitle.EmbryosLessThan6Cells,
      },
    ),
    generateSingleHistoryItemUpdate(detail.day3EmbryosArrested, newDetails.day3EmbryosArrested, {
      propertyName: IVFTaskEntityTitle.EmbryosArrested,
    }),
    generateSingleHistoryItemUpdate(
      detail.day3EmbryosAverageFrag,
      newDetails.day3EmbryosAverageFrag,
      {
        propertyName: IVFTaskEntityTitle.AvgFragOfEmbryos,
      },
    ),
    generateSingleHistoryItemUpdate(detail.day3FreshTransfer, newDetails.day3FreshTransfer, {
      propertyName: IVFTaskEntityTitle.FreshTransfer,
      valueBuilder: toBooleanHistoryValue,
    }),
    generateSingleHistoryItemUpdate(
      detail.day3EmbryosToTransfer,
      newDetails.day3EmbryosToTransfer,
      {
        propertyName: IVFTaskEntityTitle.EmbryosToTransfer,
      },
    ),
    {
      changes: [
        compareAndReturnHistoryChange(
          detail.day3AssistedHatching,
          newDetails.day3AssistedHatching,
          {
            propertyName: IVFTaskEntityTitle.AssistedHatching,
            valueBuilder: toBooleanHistoryValue,
          },
        ),
      ],
    },
  ]
}

const toFertilizationCheckValue = (
  array: HistoryValueType[],
  types: SourceGroupTypeEnum[],
): string => {
  const result = array.reduce(
    (acc, item, index) => {
      if (item) {
        acc.hasValues = true
      }

      acc.values.push(`${toHistoryValue(item)} ${types[index]}`)

      return acc
    },
    {hasValues: false, values: []},
  )

  return result.hasValues ? result.values.join(' | ') : null
}

export const fertilizationCheckHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
  patientPlan: PatientPlan,
): IvfTashHistoryUpdate[] => {
  const oldData = fertilizationCheckResponse(detail, patientPlan)
  const newData = fertilizationCheckResponse(savePayload.taskDetails, patientPlan)

  const oldSourceTypes = oldData.map(({typeId}) => typeId)
  const newSourceTypes = newData.map(({typeId}) => typeId)

  const getHistoryItem = (
    oldValues: HistoryValueType[],
    newValues: HistoryValueType[],
    propertyName: IVFTaskEntityTitle,
  ): IvfTashHistoryUpdate =>
    generateSingleHistoryItemUpdate(
      toFertilizationCheckValue(oldValues, oldSourceTypes),
      toFertilizationCheckValue(newValues, newSourceTypes),
      {propertyName},
    )

  return [
    getHistoryItem(
      oldData.map(({degenOrArrested}) => degenOrArrested),
      newData.map(({degenOrArrested}) => degenOrArrested),
      IVFTaskEntityTitle.DegenArrested,
    ),
    getHistoryItem(
      oldData.map((data) => data['0pn']),
      newData.map((data) => data['0pn']),
      IVFTaskEntityTitle.ZeroPN,
    ),
    getHistoryItem(
      oldData.map((data) => data['1pn']),
      newData.map((data) => data['1pn']),
      IVFTaskEntityTitle.OnePN,
    ),
    getHistoryItem(
      oldData.map((data) => data['2pn']),
      newData.map((data) => data['2pn']),
      IVFTaskEntityTitle.TwoPN,
    ),
    getHistoryItem(
      oldData.map((data) => data['3pn']),
      newData.map((data) => data['3pn']),
      IVFTaskEntityTitle.ThreePN,
    ),
  ]
}

export const journeyWitnessHistoryChange = (
  detail: PatientPlanCohortIvfTaskDetails,
  savePayload: IvfTaskHistoryPayload,
): IvfTashHistoryUpdate[] => {
  const newDetails = savePayload.taskDetails

  return [
    generateSingleHistoryItemUpdate(detail.journeyWitness, newDetails.journeyWitness, {
      propertyName: IVFTaskEntityTitle.Witness,
    }),
  ]
}
