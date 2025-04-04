import {AfterVisitSummary} from '@libs/data-layer/apps/scheduling/entities/typeorm/after-visit-summary.entity'
const uuidSuffix: string = '_AfterVisitSummaryUUID'

export const afterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 1,
  uuid: 1 + uuidSuffix,
}

export const pastAppointmentAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 2,
  uuid: 2 + uuidSuffix,
}

export const appointmentForSlotAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 3,
  uuid: 3 + uuidSuffix,
  description: 'description',
}

export const appointmentCancelledStatusAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 4,
  uuid: 4 + uuidSuffix,
  description: 'description',
}

export const appointmentInProgressStatusAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 5,
  uuid: 5 + uuidSuffix,
}

export const appointmentBookedStatusAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 6,
  uuid: 6 + uuidSuffix,
}

export const appointmentMaxTimeUnitAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 7,
  uuid: 7 + uuidSuffix,
}

export const emailVerifiedCompletedAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 8,
  uuid: 8 + uuidSuffix,
}

export const patientCartCompletedAfterVisitSummaryFixture: Partial<AfterVisitSummary> = {
  id: 9,
  uuid: 9 + uuidSuffix,
}

export const afterVisitSummaryCreateAppointmentFixture: Partial<AfterVisitSummary> = {
  id: 10,
  uuid: 10 + uuidSuffix,
}

export const afterVisitSummaryCreateAppointmentCheckHoursFixture: Partial<AfterVisitSummary> = {
  id: 11,
  uuid: 11 + uuidSuffix,
}

export const afterVisitSummaryForPatientMilestoneAppointmentFixture: Partial<AfterVisitSummary> = {
  id: 12,
  uuid: 12 + uuidSuffix,
  description: 'milestone after summary',
}
