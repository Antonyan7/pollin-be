import {
  encounterFixture,
  encounterShortSearchStringSuccessFixture,
} from '@libs/common/test/fixtures/encounter.fixture'
import {PatientEncounterAddendum} from '@libs/data-layer/apps/users/entities/typeorm'
import {staffUserFixture, staffWithMockedAssignorIdFixture} from './staff.fixture'

export const addendumFixture: Partial<PatientEncounterAddendum> = {
  id: 1,
  uuid: 'testAddendumUuid',
  encounterId: encounterFixture.id,
  note: 'Test content',
  authorId: staffWithMockedAssignorIdFixture.id,
  isEdited: false,
}

export const addendumToUpdateFixture: Partial<PatientEncounterAddendum> = {
  id: 2,
  uuid: '49f44098-35d7-11ed-831f-0242ac110002',
  encounterId: encounterFixture.id,
  note: 'Addendum to update',
  authorId: staffWithMockedAssignorIdFixture.id,
  isEdited: false,
}

export const addendumWithAnotherAuthorFixture: Partial<PatientEncounterAddendum> = {
  id: 3,
  uuid: '88f44098-35d7-11ed-831f-0242ac110002',
  encounterId: encounterFixture.id,
  note: 'Addendum',
  authorId: staffUserFixture.id,
  isEdited: false,
}

export const addendumToShowOnEncounterListFixture: Partial<PatientEncounterAddendum> = {
  id: 4,
  uuid: '88f42091-25d8-11ed-831f-0242ac110002',
  encounterId: encounterShortSearchStringSuccessFixture.id,
  note: 'Addendum',
  authorId: staffUserFixture.id,
  isEdited: false,
}
