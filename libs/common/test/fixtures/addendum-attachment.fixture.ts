import {PatientEncounterAddendumAttachment} from '@libs/data-layer/apps/users/entities/typeorm'
import {addendumFixture} from './addendum.fixture'

export const addendumAttachmentFixture: Partial<PatientEncounterAddendumAttachment> = {
  id: 1,
  uuid: 'testAddendumUuid',
  addendumId: addendumFixture.id,
  title: 'addendumAttachmentFixture title',
  url: 'addendum_attachment_fixture_url',
}
