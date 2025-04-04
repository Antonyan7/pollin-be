import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {
  patientPlanForDiseaseScreenFixture,
  patientPlanForEPLWorksheetFixture,
  patientPlanForAppointmentByDateV2Fixture,
  patientPlanForHCGWorksheetFixture,
  patientPlanForHighlightsFixture,
  patientPlanForOBWorksheetFixture,
  patientPlanForPrimingWorkSheetChecklistFixture,
  patientPlanForPrimingWorkSheetFixture,
  patientPlanForReadyToOrderFixture,
  patientPlanForStimSheetActionsFixture,
  patientPlanForStimSheetFixture,
  patientPlanForStimSheetUltrasoundSighOfFixture,
  patientPlanLinkableWithDay1OfCycleFixture,
  patientPlanV2ForCycleDetailsFixture,
  patientPlanV3CancelledFixture,
  patientPlanV3CompletedFixture,
  patientPlanV3ReadyToOrderFixture,
  patientPlanWithSelectedDateFixture,
  patientPlanForWorksheetListFixture,
  patientPlanToGenerateDocumentFixture,
} from './patient-plan.fixture'
import {
  PatientPlanSheet,
  PatientPlanSheetAdditionalDay,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {DateTimeUtil} from '@libs/common'
import {staffUserFixture} from './staff.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientPlanSheetWithSelectedDateFixture: Partial<PatientPlanSheet> = {
  id: 1,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanWithSelectedDateFixture.id,
  dayOne: '2018-02-02',
  actionsDate: '2222-02-02',
}

export const patientPlanSheetLinkableWithDay1OfCycleFixture: Partial<PatientPlanSheet> = {
  id: 2,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanLinkableWithDay1OfCycleFixture.id,
  dayOne: '2023-02-02',
}

export const patientPlanSheetForStimSheetFixture: Partial<PatientPlanSheet> = {
  id: 3,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForStimSheetFixture.id,
  dayOne: null,
  additionalDays: [
    {date: '2020-01-15'},
    {date: '2020-03-05'},
    {date: '2020-02-01'},
    {date: '2020-02-02'},
    {date: '2022-02-02'},
    {date: '2020-03-15'},
  ] as PatientPlanSheetAdditionalDay[],
}

export const patientPlanSheetForStimSheetActionsFixture: Partial<PatientPlanSheet> = {
  id: 4,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForStimSheetActionsFixture.id,
  dayOne: null,
}

export const patientPlanSheetForDiseaseScreenFixture: Partial<PatientPlanSheet> = {
  id: 5,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForDiseaseScreenFixture.id,
  dayOne: null,
}

export const patientPlanSheetForReadyToOrderFixture: Partial<PatientPlanSheet> = {
  id: 6,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForReadyToOrderFixture.id,
  dayOne: '2018-02-02',
}

export const patientPlanSheetForStimSheetUltrasoundSighOfFixture: Partial<PatientPlanSheet> = {
  id: 7,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForStimSheetUltrasoundSighOfFixture.id,
  dayOne: null,
}

export const patientPlanSheetLinkableOBFixture: Partial<PatientPlanSheet> = {
  id: 8,
  type: PlanSheetType.OB,
  patientPlanId: patientPlanLinkableWithDay1OfCycleFixture.id,
  dayOne: '2007-02-02',
  dayOneLastUpdated: dateTimeUtil.now(),
  dayOneUpdatedBy: staffUserFixture.id,
}

export const patientPlanSheetForHighlightsFixture: Partial<PatientPlanSheet> = {
  id: 9,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForHighlightsFixture.id,
  dayOne: '2018-02-02',
}

export const patientPlanPrimingWorksheetFixture: Partial<PatientPlanSheet> = {
  id: 10,
  type: PlanSheetType.Priming,
  patientPlanId: patientPlanForPrimingWorkSheetFixture.id,
  dayOne: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  additionalDays: [
    {date: '2020-03-05'},
    {date: '2020-02-01'},
    {date: '2020-02-02'},
    {date: '2022-02-02'},
  ] as PatientPlanSheetAdditionalDay[],
}

export const patientPlanSheetPrimingWorksheetFixture: Partial<PatientPlanSheet> = {
  id: 11,
  type: PlanSheetType.Priming,
  patientPlanId: patientPlanWithSelectedDateFixture.id,
  dayOne: null,
}

export const patientPlanSheetForCycleDetailsFixture: Partial<PatientPlanSheet> = {
  id: 12,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanV2ForCycleDetailsFixture.id,
  dayOne: null,
}

export const patientPlanSheetForPrimingWorkSheetChecklistFixture: Partial<PatientPlanSheet> = {
  id: 13,
  type: PlanSheetType.Priming,
  patientPlanId: patientPlanForPrimingWorkSheetChecklistFixture.id,
  endDate: '2022-02-02',
}

export const patientPlanSheetForHistoryFixture: Partial<PatientPlanSheet> = {
  id: 14,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanV3CancelledFixture.id,
}

export const patientPlanSheetForHCGWorksheetFixture: Partial<PatientPlanSheet> = {
  id: 15,
  type: PlanSheetType.HCG,
  patientPlanId: patientPlanForHCGWorksheetFixture.id,
}

export const patientPlanSheetForOBWorksheetFixture: Partial<PatientPlanSheet> = {
  id: 16,
  type: PlanSheetType.OB,
  patientPlanId: patientPlanForOBWorksheetFixture.id,
  actionsDate: '2024-09-26',
}

export const patientPlanSheetV3CompletedFixture: Partial<PatientPlanSheet> = {
  id: 17,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanV3CompletedFixture.id,
}

export const patientPlanSheetV3ReadyToOrderFixture: Partial<PatientPlanSheet> = {
  id: 18,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanV3ReadyToOrderFixture.id,
}

export const patientPlanSheetV3ReadyToOrderPrimingFixture: Partial<PatientPlanSheet> = {
  id: 19,
  type: PlanSheetType.Priming,
  patientPlanId: patientPlanV3ReadyToOrderFixture.id,
}

export const patientPlanSheetForEPLWorksheetFixture: Partial<PatientPlanSheet> = {
  id: 20,
  type: PlanSheetType.EPL,
  patientPlanId: patientPlanForEPLWorksheetFixture.id,
}

export const patientPlanSheetForAppointmentByDatePrimingFixture: Partial<PatientPlanSheet> = {
  id: 21,
  type: PlanSheetType.Priming,
  patientPlanId: patientPlanForAppointmentByDateV2Fixture.id,
}

export const patientPlanSheetForAppointmentByDateStimulationFixture: Partial<PatientPlanSheet> = {
  id: 22,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForAppointmentByDateV2Fixture.id,
  dayOne: '2023-02-02',
}

export const patientPlanSheetForWorksheetListStimulationFixture: Partial<PatientPlanSheet> = {
  id: 23,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249b',
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanForWorksheetListFixture.id,
  dayOne: '2023-02-02',
  createdAt: dateTimeUtil.toDate('2022-02-02'),
}
export const patientPlanSheetForWorksheetListHCGFixture: Partial<PatientPlanSheet> = {
  id: 24,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249a',
  type: PlanSheetType.HCG,
  patientPlanId: patientPlanForWorksheetListFixture.id,
  dayOne: '2023-02-02',
  createdAt: dateTimeUtil.toDate('2023-02-02'),
}
export const patientPlanSheetForWorksheetListWithoutDay1Fixture: Partial<PatientPlanSheet> = {
  id: 25,
  type: PlanSheetType.EPL,
  patientPlanId: patientPlanForWorksheetListFixture.id,
}

export const patientPlanSheetToGenerateDocumentFixture: Partial<PatientPlanSheet> = {
  id: 26,
  uuid: '5c5044e7-08f6-4308-b34a-47373828249a',
  type: PlanSheetType.EPL,
  dayOne: '2023-02-02',
  patientPlanId: patientPlanToGenerateDocumentFixture.id,
}

export const patientPlanSheetToNotGenerateDocumentFixture: Partial<PatientPlanSheet> = {
  id: 27,
  uuid: '5c5044e7-08f6-4308-b34a-47373828249b',
  type: PlanSheetType.HCG,
  patientPlanId: patientPlanToGenerateDocumentFixture.id,
}
