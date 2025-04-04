import {PatientPlanSheetAction} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-sheet-action.entity'
import {
  patientPlanSheetForAppointmentByDatePrimingFixture,
  patientPlanSheetForAppointmentByDateStimulationFixture,
  patientPlanSheetForHCGWorksheetFixture,
  patientPlanSheetForOBWorksheetFixture,
  patientPlanSheetWithSelectedDateFixture,
} from './patient-plan-sheet.fixture'
import {
  planSheetActionFixture,
  planSheetActionSoftDeletedFixture,
  planSheetActionToCheckSequenceFixture,
  planSheetActionToUpdateListFixture,
  planSheetActionWithoutLinkToListFixture,
} from './plan-sheet-action.fixture'
import {nextYear} from './appointment.fixture'
import {DateTimeUtil} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientPlanSheetActionToUpdateFixture: Partial<PatientPlanSheetAction> = {
  id: 1,
  patientPlanSheetId: patientPlanSheetForHCGWorksheetFixture.id,
  planSheetActionId: planSheetActionFixture.id,
  date: patientPlanSheetForHCGWorksheetFixture.actionsDate,
  sequence: 2,
  customValue: 1 + 'customValue',
}

export const patientPlanSheetActionForListFixture: Partial<PatientPlanSheetAction> = {
  id: 2,
  patientPlanSheetId: patientPlanSheetWithSelectedDateFixture.id,
  planSheetActionId: planSheetActionFixture.id,
  date: null,
  sequence: 2,
  customValue: 2 + 'customValue',
}

export const patientPlanSheetActionForListSoftDeletedFixture: Partial<PatientPlanSheetAction> = {
  id: 3,
  patientPlanSheetId: patientPlanSheetWithSelectedDateFixture.id,
  planSheetActionId: planSheetActionSoftDeletedFixture.id,
  date: patientPlanSheetWithSelectedDateFixture.actionsDate,
  sequence: 1,
}

export const patientPlanSheetActionToRemoveFixture: Partial<PatientPlanSheetAction> = {
  id: 4,
  patientPlanSheetId: patientPlanSheetForHCGWorksheetFixture.id,
  planSheetActionId: planSheetActionToCheckSequenceFixture.id,
  date: null,
  sequence: 1,
}

export const patientPlanSheetActionInPastFixture: Partial<PatientPlanSheetAction> = {
  id: 5,
  patientPlanSheetId: patientPlanSheetForOBWorksheetFixture.id,
  planSheetActionId: planSheetActionFixture.id,
  date: patientPlanSheetForOBWorksheetFixture.actionsDate,
  sequence: 1,
  customValue: 5 + 'customValue',
}

export const patientPlanSheetActionToIgnoreFixture: Partial<PatientPlanSheetAction> = {
  id: 6,
  patientPlanSheetId: patientPlanSheetForHCGWorksheetFixture.id,
  planSheetActionId: planSheetActionWithoutLinkToListFixture.id,
  date: '2022-02-03',
  sequence: 10,
}

export const patientPlanSheetActionForAppByDatePrimingFixture: Partial<PatientPlanSheetAction> = {
  id: 7,
  patientPlanSheetId: patientPlanSheetForAppointmentByDatePrimingFixture.id,
  planSheetActionId: planSheetActionFixture.id,
  date: `${nextYear}-06-17`,
  sequence: 1,
  customValue: 7 + 'customValue',
}

export const patientPlanSheetActionForAppByDateStimFixture: Partial<PatientPlanSheetAction> = {
  id: 8,
  patientPlanSheetId: patientPlanSheetForAppointmentByDateStimulationFixture.id,
  planSheetActionId: planSheetActionToUpdateListFixture.id,
  date: `${nextYear}-06-17`,
  sequence: 2,
}

export const patientPlanSheetActionForAppByDateStimDelFixture: Partial<PatientPlanSheetAction> = {
  id: 9,
  patientPlanSheetId: patientPlanSheetForAppointmentByDateStimulationFixture.id,
  planSheetActionId: planSheetActionSoftDeletedFixture.id,
  date: `${nextYear}-06-17`,
  sequence: 1,
  deletedAt: dateTimeUtil.now(),
}

export const patientPlanSheetActionForAppByDateStimSeqFixture: Partial<PatientPlanSheetAction> = {
  id: 10,
  patientPlanSheetId: patientPlanSheetForAppointmentByDateStimulationFixture.id,
  planSheetActionId: planSheetActionToCheckSequenceFixture.id,
  date: `${nextYear}-06-17`,
  sequence: 1,
}

export const patientPlanSheetActionForAppByDateStimWrongDayFixture: Partial<PatientPlanSheetAction> =
  {
    id: 11,
    patientPlanSheetId: patientPlanSheetForAppointmentByDateStimulationFixture.id,
    planSheetActionId: planSheetActionToCheckSequenceFixture.id,
    date: `${nextYear}-06-12`,
    sequence: 1,
  }

export const patientPlanSheetActionCustomFixture: Partial<PatientPlanSheetAction> = {
  id: 12,
  patientPlanSheetId: patientPlanSheetForAppointmentByDateStimulationFixture.id,
  planSheetActionId: planSheetActionFixture.id,
  date: `${nextYear}-06-17`,
  sequence: 1,
  customValue: 'patientPlanSheetActionCustomValue',
}
