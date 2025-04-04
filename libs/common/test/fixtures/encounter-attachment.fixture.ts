import {PatientEncounterAttachment} from '@libs/data-layer/apps/users/entities/typeorm'
import {encounterFixture} from './encounter.fixture'

export const encounterAttachmentFixture: Partial<PatientEncounterAttachment> = {
  id: 120,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac150008',
  encounterId: encounterFixture.id,
  title: 'encounterAttachmentFixture title',
  url: 'encounter_attachment_fixture_url',
}
