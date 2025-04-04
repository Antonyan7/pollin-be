import {TestResultOvaryMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testResultAFCTypeForFertilityIQFemaleReleasedFixture,
  testResultAFCTypeForFertilityIQFixture,
  testResultFixture,
  testResultForEncounterOlderAFCFixture,
  testResultForUltrasoundFolliclesFixture,
  testResultFromMachineForDetailsFixture,
  testResultUltrasoundFixture,
} from './test-result.fixture'
import {testResultStimSheetUterusLatestFixture} from './test-result-details.fixture'

import {OvaryLocation} from '@libs/data-layer/apps/clinic-test/enums/stim-sheet.enum'

const uuidSuffix: string = '-test-result-ovary-meas-uuid'

export const testResultOvaryMeasurementFixture: Partial<TestResultOvaryMeasurement> = {
  id: 1,
  uuid: 1 + uuidSuffix,
  testResultId: testResultFixture.id,
}

export const testResultOvaryMeasurementStimRightFixture: Partial<TestResultOvaryMeasurement> = {
  id: 2,
  uuid: 2 + uuidSuffix,
  testResultId: testResultStimSheetUterusLatestFixture.id,
  location: OvaryLocation.RightOvary,
  totalFollicles: 4,
  follMoreThanOneCm: 2,
  follMoreThanOneCmSizes: ['1.2', '1.3', '1.4'],
}

export const testResultOvaryMeasurementStimLeftFixture: Partial<TestResultOvaryMeasurement> = {
  id: 3,
  uuid: 3 + uuidSuffix,
  testResultId: testResultStimSheetUterusLatestFixture.id,
  location: OvaryLocation.LeftOvary,
  totalFollicles: 5,
  follMoreThanOneCm: 3,
  follMoreThanOneCmSizes: ['2.21', '2', '2.45'],
}

export const testResultOvaryPrefilledFixture: Partial<TestResultOvaryMeasurement> = {
  id: 4,
  uuid: 4 + uuidSuffix,
  testResultId: testResultFromMachineForDetailsFixture.id,
  location: OvaryLocation.LeftOvary,
  follMoreThanOneCm: 2,
  follMoreThanOneCmSizes: ['2.2', '2.3'],
}

export const testResultOvaryPrefilledToUpdateFixture: Partial<TestResultOvaryMeasurement> = {
  id: 5,
  uuid: 5 + uuidSuffix,
  testResultId: testResultForUltrasoundFolliclesFixture.id,
  location: OvaryLocation.LeftOvary,
  totalFollicles: 4,
  follMoreThanOneCm: 2,
  follMoreThanOneCmSizes: ['2.2', '2.3'],
}

export const testResultOvaryForFertilityIQFixture: Partial<TestResultOvaryMeasurement> = {
  id: 6,
  uuid: 6 + uuidSuffix,
  testResultId: testResultAFCTypeForFertilityIQFixture.id,
  location: OvaryLocation.LeftOvary,
  totalFollicles: 0,
  follMoreThanOneCm: 2,
  follMoreThanOneCmSizes: ['2.2', '2.3'],
}

export const testResultOvaryRightForFertilityIQFixture: Partial<TestResultOvaryMeasurement> = {
  id: 9,
  uuid: 9 + uuidSuffix,
  testResultId: testResultAFCTypeForFertilityIQFixture.id,
  location: OvaryLocation.RightOvary,
  totalFollicles: 10,
  follMoreThanOneCm: 2,
  follMoreThanOneCmSizes: ['2.1', '1,1'],
}

export const testResultOvaryMeasurementRightForAFCForFertilityIQReleasedFixture: Partial<TestResultOvaryMeasurement> =
  {
    id: 7,
    uuid: 7 + uuidSuffix,
    testResultId: testResultAFCTypeForFertilityIQFemaleReleasedFixture.id,
    location: OvaryLocation.RightOvary,
    totalFollicles: 30,
    follMoreThanOneCm: 2,
    follMoreThanOneCmSizes: ['2.2', '2.3'],
  }

export const testResultOvaryMeasurementLeftForAFCForFertilityIQReleasedFixture: Partial<TestResultOvaryMeasurement> =
  {
    id: 8,
    uuid: 8 + uuidSuffix,
    testResultId: testResultAFCTypeForFertilityIQFemaleReleasedFixture.id,
    location: OvaryLocation.LeftOvary,
    totalFollicles: 40,
    follMoreThanOneCm: 2,
    follMoreThanOneCmSizes: ['2.2', '2.3'],
  }

export const UltrasoundTestResultRightOvaryMeasFixture: Partial<TestResultOvaryMeasurement> = {
  id: 11,
  uuid: 'a961bc9f-ee1e-479c-9b99-49c3acc83ed3',
  testResultId: testResultUltrasoundFixture.id,
  location: OvaryLocation.RightOvary,
  totalFollicles: 2,
  follMoreThanOneCm: 2,
  follMoreThanOneCmSizes: ['2.2', '2.3'],
}

export const UltrasoundTestResultLeftOvaryMeasFixture: Partial<TestResultOvaryMeasurement> = {
  id: 12,
  uuid: 'd69bbc3c-9c44-40ca-856c-68c8f322e061',
  testResultId: testResultUltrasoundFixture.id,
  location: OvaryLocation.LeftOvary,
  totalFollicles: 3,
  follMoreThanOneCm: 0,
  follMoreThanOneCmSizes: null,
}

export const testResultOvaryMeasurementForEncounterRightFixture: Partial<TestResultOvaryMeasurement> =
  {
    id: 13,
    uuid: 13 + uuidSuffix,
    testResultId: testResultForEncounterOlderAFCFixture.id,
    location: OvaryLocation.RightOvary,
    totalFollicles: 10,
    follMoreThanOneCm: 2,
    follMoreThanOneCmSizes: ['2.1', '1,1'],
  }

export const testResultOvaryMeasurementForEncounterLeftFixture: Partial<TestResultOvaryMeasurement> =
  {
    id: 14,
    uuid: 14 + uuidSuffix,
    testResultId: testResultForEncounterOlderAFCFixture.id,
    location: OvaryLocation.LeftOvary,
    totalFollicles: 11,
    follMoreThanOneCm: 2,
    follMoreThanOneCmSizes: ['2.1', '1,1'],
  }
