import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {PatientPlanCohortIvfTaskDetails} from '@libs/data-layer/apps/clinic-ivf/entities'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

export const DaysProps = [IVFTaskType.Day5Check, IVFTaskType.Day6Check, IVFTaskType.Day7Check]

export const dayMapper = new Map<IVFTaskType, number>([
  [IVFTaskType.Day5Check, 5],
  [IVFTaskType.Day6Check, 6],
  [IVFTaskType.Day7Check, 7],
])

export const DetailProps = [
  IVFTaskType.InjectionAssessment,
  IVFTaskType.InseminationIVF,
  IVFTaskType.IcsiInjection,
  IVFTaskType.MiiDay1Cryo,
  IVFTaskType.Day3Check,
  IVFTaskType.OocyteCollection,
  IVFTaskType.PostStripping,
  IVFTaskType.SpermWash,
  IVFTaskType.Day5Check,
  IVFTaskType.Day6Check,
  IVFTaskType.Day7Check,
  IVFTaskType.PICSI,
]

export const signOffDetailValidationOptions = {
  [IVFTaskType.InjectionAssessment]: [],
  [IVFTaskType.InseminationIVF]: ['oocytesInseminated'],
  [IVFTaskType.IcsiInjection]: ['icsiMatureOocytesInjected'],
  [IVFTaskType.MiiDay1Cryo]: ['matureOocytesToCry', 'oocytesDiscarded'],
  [IVFTaskType.Day3Check]: [
    'day3EmbryosMoreThan6Cells',
    'day3EmbryosLessThan6Cells',
    'day3EmbryosArrested',
    'day3EmbryosAverageFrag',
  ],
  [IVFTaskType.OocyteCollection]: ['oocytesCollected'],
  [IVFTaskType.PostStripping]: [
    'matureOocytes',
    'immatureOocytes',
    'degenOocytes',
    'abnormalOocytes',
  ],
  [IVFTaskType.SpermWash]: [
    'spermWashInitialConcentration',
    'spermWashInitialConcentrationUnitId',
    'spermWashInitialMotility',
    'spermWashFinalConcentration',
    'spermWashFinalConcentrationUnitId',
    'spermWashFinalMotility',
  ],
  [IVFTaskType.Day5Check]: ['day5Arrested'],
  [IVFTaskType.Day6Check]: ['day6Arrested'],
  [IVFTaskType.Day7Check]: ['day7Discarded'],
  [IVFTaskType.PICSI]: ['picsiMatureOocytesInjected', 'picsiImmatureOocytes'],
}

export const validateDetailProps = (
  task: IVFTaskType,
  detail: PatientPlanCohortIvfTaskDetails,
): boolean => {
  return signOffDetailValidationOptions[task].every((field: string) => {
    if (typeof detail[field] === 'number') {
      return true
    }
    if (typeof detail[field] === 'boolean') {
      return true
    }
    StructuredLogger.info(
      activityLogs.IvfTasksFunctions.ValidateRequiredFieldsForSignOffDay,
      activityLogs.IvfTasksActions.ValidateDetailsPropsFailed,
      {
        message: `Detail props validation failed for task: ${task}, field: ${field}, value: ${detail[field]}`,
      },
    )
    return !!detail[field]
  })
}

export const validateDaysProps = (
  task: IVFTaskType,
  detail: PatientPlanCohortIvfTaskDetails,
): boolean => {
  const detailProps = validateDetailProps(task, detail)
  const embryos = detail.patientPlanCohort?.PatientPlanCohortIvfTaskExpandedEmbryos?.filter(
    (embryo) => {
      return embryo.day === dayMapper.get(task)
    },
  )

  if (!embryos?.length) {
    return !!detailProps
  }

  const allEmbryosChecked = embryos.every((embryo) => embryo.gradeId)
  StructuredLogger.info(
    activityLogs.IvfTasksFunctions.ValidateRequiredFieldsForSignOffDay,
    activityLogs.IvfTasksActions.ValidateDayPropsFailed,
    {
      message: `All embryos checked state: ${allEmbryosChecked}`,
    },
  )

  return detailProps && allEmbryosChecked
}
