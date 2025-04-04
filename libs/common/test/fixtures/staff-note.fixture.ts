import {PatientStaffNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientEmailVerifiedFixture,
  patientForDocumentGenerationFixture,
  patientForPlanTypesFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {appointmentFixture, pastAppointmentLinkedToStaffNoteFixture} from './appointment.fixture'
import {
  staffAuthorOfStaffNoteAndAddendumFixture,
  staffWithMockedAssignorIdFixture,
} from './staff.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {staffNoteTypeFixture} from './staff-note-type.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))
export const staffNoteFindSearchString: string = 'Like'

export const staffNoteFixture: Partial<PatientStaffNote> = {
  id: 120,
  uuid: 'd6c948f5-132d-11ed-814e-02424c110008',
  patientId: patientEmailVerifiedFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  appointmentId: appointmentFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'Test content',
  createdAt: dateTimeUtil.subHours(dateTimeUtil.now(), 30),
}

export const staffNoteSearchStringSuccessFixture: Partial<PatientStaffNote> = {
  id: 121,
  uuid: 'd6c908f5-132d-11ed-814e-02424c110009',
  patientId: patientEmailVerifiedFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: `Search by searchString, testing ${staffNoteFindSearchString} operator`,
}

export const staffNoteShortSearchStringSuccessFixture: Partial<PatientStaffNote> = {
  id: 122,
  uuid: 'd6c908f5-132d-11ed-814e-02424c110010',
  patientId: patientEmailVerifiedFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: '<p>this is note</p>',
}

export const staffNoteToUpdateFixture: Partial<PatientStaffNote> = {
  id: 123,
  uuid: '569808f5-132d-11ed-814e-0244ac110010',
  patientId: patientEmailVerifiedFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffAuthorOfStaffNoteAndAddendumFixture.id,
  note: 'note',
}

export const staffNoteWithLinkedAppointmentFixture: Partial<PatientStaffNote> = {
  id: 124,
  uuid: 'd6c908f5-132d-11ed-814e-0244ac110999',
  patientId: patientEmailVerifiedFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  appointmentId: pastAppointmentLinkedToStaffNoteFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note:
    `<h3><bold> StaffNote Template </bold> </h3>` +
    `<p> Template variant 1 </p> \r\n` +
    `<strong> text </strong>`,
}

export const staffNoteWithExpiredEditState: Partial<PatientStaffNote> = {
  id: 125,
  uuid: '4fd942c0-8af5-43f9-9a88-040000000000',
  patientId: patientEmailVerifiedFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'Expired Edit',
  createdAt: dateTimeUtil.subHours(dateTimeUtil.now(), 25),
}

export const staffNoteToGenerateDocumentFixture: Partial<PatientStaffNote> = {
  id: 126,
  uuid: 'd6c908f5-132d-11ed-214a-3241ac110999',
  patientId: patientForDocumentGenerationFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'staffNoteToGenerateDocumentFixture',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
}

export const staffNoteToGenerateDocumentWithAddendumsFixture: Partial<PatientStaffNote> = {
  id: 127,
  uuid: 'd6c908f2-231d-55ed-214a-3241ac110999',
  patientId: patientForDocumentGenerationFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'staffNoteToGenerateDocumentWithAddendumsFixture',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}

export const staffNoteToUpdateCallbackFixture: Partial<PatientStaffNote> = {
  id: 128,
  uuid: 'a6c908f5-133d-13ed-114a-3241ac110999',
  patientId: patientForPlanTypesFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'staffNoteToUpdateCallbackFixture',
}

export const staffNoteToGenerateDocumentIsInternalFixture: Partial<PatientStaffNote> = {
  id: 129,
  uuid: '40be5fb9-e85b-4690-a76c-9d4f817e8f8e',
  patientId: patientForDocumentGenerationFixture.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffWithMockedAssignorIdFixture.id,
  note: 'staffNoteToGenerateDocumentFixture',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  isInternal: true,
}
