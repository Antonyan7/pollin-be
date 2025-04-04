import {TestResultObservation} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testObservationTypeStringFixture,
  testObservationTypeStringOptionalFixture,
} from './test-observation-type.fixture'
import {
  testResultForGeneticTestsObservationsFixture,
  testResultForPGTAFixture,
  testResultForPGTMFixture,
} from './test-result.fixture'
import {
  specimenForBiopsyInTransitFixture,
  specimenForGeneticTestsResultFixture,
} from './specimen.fixture'

export const testResultObservationStringFixture: Partial<TestResultObservation> = {
  id: 1,
  uuid: 'cd22356f-d369-4bb2-a063-e485fbd1cb93',
  valueString: null,
  observationTypeId: testObservationTypeStringFixture.id,
  testResultId: testResultForGeneticTestsObservationsFixture.id,
  specimenId: specimenForGeneticTestsResultFixture.id,
}

export const testResultObservationStringOptionalFixture: Partial<TestResultObservation> = {
  id: 2,
  uuid: 'cd22356f-d369-4bb2-a063-e485fbd1cb94',
  valueString: null,
  observationTypeId: testObservationTypeStringOptionalFixture.id,
  testResultId: testResultForGeneticTestsObservationsFixture.id,
  specimenId: specimenForGeneticTestsResultFixture.id,
}

export const testResultObservationForListPGTAFixture: Partial<TestResultObservation> = {
  id: 3,
  uuid: 'cd22356f-b369-2bb2-a063-e485fbd1cb94',
  valueString: null,
  observationTypeId: testObservationTypeStringOptionalFixture.id,
  testResultId: testResultForPGTAFixture.id,
  specimenId: specimenForBiopsyInTransitFixture.id,
}

export const testResultObservationForListPGTMFixture: Partial<TestResultObservation> = {
  id: 4,
  uuid: 'cd22356f-a369-3bb2-a063-e485fbd1cb94',
  valueString: null,
  observationTypeId: testObservationTypeStringOptionalFixture.id,
  testResultId: testResultForPGTMFixture.id,
  specimenId: specimenForBiopsyInTransitFixture.id,
}
