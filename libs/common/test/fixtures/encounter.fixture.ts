import {encounterTypeFixture} from '@libs/common/test/fixtures/encounter-type.fixture'
import {PatientEncounter} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientEmailVerifiedFixture,
  patientForDocumentGenerationFixture,
  patientForPlanTypesFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {appointmentFixture, pastAppointmentLinkedToEncounterFixture} from './appointment.fixture'
import {
  staffAuthorOfEncounterAndAddendumFixture,
  staffWithMockedAssignorIdFixture,
} from './staff.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))

export const encounterFindSearchString: string = 'Like'

export const encounterFixture: Partial<PatientEncounter> = {
  id: 120,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110008',
  patientId: patientEmailVerifiedFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  appointmentId: appointmentFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'Test content',
  createdAt: dateTimeUtil.subHours(dateTimeUtil.now(), 30),
}

export const encounterSearchStringSuccessFixture: Partial<PatientEncounter> = {
  id: 121,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110009',
  patientId: patientEmailVerifiedFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: `Search by searchString, testing ${encounterFindSearchString} operator`,
}

export const encounterShortSearchStringSuccessFixture: Partial<PatientEncounter> = {
  id: 122,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110010',
  patientId: patientEmailVerifiedFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: '<p>this is note</p>',
}

export const encounterToUpdateFixture: Partial<PatientEncounter> = {
  id: 123,
  uuid: '569808f5-132d-11ed-814e-0242ac110010',
  patientId: patientEmailVerifiedFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffAuthorOfEncounterAndAddendumFixture.id,
  note: 'note',
}

export const encounterWithLinkedAppointmentFixture: Partial<PatientEncounter> = {
  id: 124,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110999',
  patientId: patientEmailVerifiedFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  appointmentId: pastAppointmentLinkedToEncounterFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note:
    `<h3><bold> Encounter Template </bold> </h3>` +
    `<p> Template variant 1 </p> \r\n` +
    `<strong> text </strong>`,
}

export const encounterWithExpiredEditState: Partial<PatientEncounter> = {
  id: 125,
  uuid: '4fd942c0-8af5-43f9-9a88-000000000000',
  patientId: patientEmailVerifiedFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'Expired Edit',
  createdAt: dateTimeUtil.subHours(dateTimeUtil.now(), 25),
}

export const encounterToGenerateDocumentFixture: Partial<PatientEncounter> = {
  id: 126,
  uuid: 'd6c908f5-132d-11ed-214a-3241ac110999',
  patientId: patientForDocumentGenerationFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'encounterToGenerateDocumentFixture',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  isInternal: false,
}

export const encounterToUpdateCallbackFixture: Partial<PatientEncounter> = {
  id: 127,
  uuid: 'a6c908f5-132d-11ed-314a-3241ac110999',
  patientId: patientForPlanTypesFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'encounterToUpdateCallbackFixture',
}

export const encounterToUpdateCallbackWithoutDueDateChangeFixture: Partial<PatientEncounter> = {
  id: 128,
  uuid: 'b6c908f5-132d-11ed-314a-3241ac110999',
  patientId: patientForPlanTypesFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'To Generate Doc',
}

export const encounterToGenerateDocumentWithAddendumsFixture: Partial<PatientEncounter> = {
  id: 129,
  uuid: 'd6c908f2-231d-55ed-214a-3241ac110999',
  patientId: patientForDocumentGenerationFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'encounterToGenerateDocumentWithAddendumsFixture',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}

export const encounterInInternalFixture: Partial<PatientEncounter> = {
  id: 130,
  uuid: '29991f47-20e1-443e-aaf5-7fd73052aba4',
  patientId: patientForDocumentGenerationFixture.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'encounterInInternalFixture',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  isInternal: true,
}
