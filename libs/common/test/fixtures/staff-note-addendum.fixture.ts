import {encounterFixture} from '@libs/common/test/fixtures/encounter.fixture'
import {PatientStaffNoteAddendum} from '@libs/data-layer/apps/users/entities/typeorm'
import {staffNoteFixture, staffNoteSearchStringSuccessFixture} from './staff-note.fixture'
import {staffUserFixture, staffWithMockedAssignorIdFixture} from './staff.fixture'

export const staffNoteAddendumFixture: Partial<PatientStaffNoteAddendum> = {
  id: 1,
  uuid: 'testAddendumUuid',
  staffNoteId: staffNoteFixture.id,
  note: 'Test content',
  authorId: staffWithMockedAssignorIdFixture.id,
  isEdited: false,
}

export const staffNoteAddendumToUpdateFixture: Partial<PatientStaffNoteAddendum> = {
  id: 2,
  uuid: '49f44598-55d7-11ed-831f-0242ac110002',
  staffNoteId: staffNoteFixture.id,
  note: 'staffNote Addendum to update',
  authorId: staffWithMockedAssignorIdFixture.id,
  isEdited: false,
}

export const staffNoteAddendumWithAnotherAuthorFixture: Partial<PatientStaffNoteAddendum> = {
  id: 3,
  uuid: '88f44498-35d7-11ed-831f-0242ac110002',
  staffNoteId: encounterFixture.id,
  note: 'staffNoteAddendum',
  authorId: staffUserFixture.id,
  isEdited: false,
}

export const staffNoteAddendumForListFixture: Partial<PatientStaffNoteAddendum> = {
  id: 4,
  uuid: '88f44498-35d7-11ed-831f-2343ac220004',
  staffNoteId: staffNoteSearchStringSuccessFixture.id,
  note: 'staffNoteAddendumForListFixture',
  authorId: staffUserFixture.id,
  isEdited: false,
}
