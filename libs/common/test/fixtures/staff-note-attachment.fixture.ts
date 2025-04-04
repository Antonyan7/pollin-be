import {PatientStaffNoteAttachment} from '@libs/data-layer/apps/users/entities/typeorm'
import {staffNoteFixture} from './staff-note.fixture'

export const staffNoteAttachmentFixture: Partial<PatientStaffNoteAttachment> = {
  id: 123,
  uuid: 'd6cd48f5-132d-11ed-814e-0242ac110008',
  staffNoteId: staffNoteFixture.id,
  title: 'staffNoteAttachmentFixture title',
  url: 'staffNote_attachment_fixture_url',
}
