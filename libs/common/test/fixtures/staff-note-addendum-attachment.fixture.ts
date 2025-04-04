import {PatientStaffNoteAddendumAttachment} from '@libs/data-layer/apps/users/entities/typeorm'
import {staffNoteAddendumFixture} from './staff-note-addendum.fixture'

export const staffNoteAddendumAttachmentFixture: Partial<PatientStaffNoteAddendumAttachment> = {
  id: 1,
  uuid: 'testStaffNoteAddendumUuid',
  addendumId: staffNoteAddendumFixture.id,
  title: 'staffNoteaddendumAttachmentFixture title',
  url: 'staffNoteaddendum_attachment_fixture_url',
}
