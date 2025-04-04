import {TestResultOvaryCystMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testResultOvaryMeasurementFixture,
  testResultOvaryMeasurementStimLeftFixture,
  testResultOvaryMeasurementStimRightFixture,
  UltrasoundTestResultLeftOvaryMeasFixture,
  UltrasoundTestResultRightOvaryMeasFixture,
} from './test-result-ovary-measurement.fixture'

import {CystType} from '@libs/data-layer/apps/clinic-test/enums'

const uuidSuffix: string = '-test-result-ovary-cyst-uuid'

export const testResultOvaryCystMeasurementFixture: Partial<TestResultOvaryCystMeasurement> = {
  id: 1,
  uuid: 1 + uuidSuffix,
  ovaryMeasurementId: testResultOvaryMeasurementFixture.id,
}

export const testResultOvaryCystStimRightDermoidFixture: Partial<TestResultOvaryCystMeasurement> = {
  id: 2,
  uuid: 2 + uuidSuffix,
  ovaryMeasurementId: testResultOvaryMeasurementStimRightFixture.id,
  type: CystType.Dermoid,
  sizes: ['0.6', '0.7'],
}

export const testResultOvaryCystStimRightEndFixture: Partial<TestResultOvaryCystMeasurement> = {
  id: 3,
  uuid: 3 + uuidSuffix,
  ovaryMeasurementId: testResultOvaryMeasurementStimRightFixture.id,
  type: CystType.Endometrioma,
  sizes: ['1.6', '1.7'],
}

export const testResultOvaryCystStimLeftFixture: Partial<TestResultOvaryCystMeasurement> = {
  id: 5,
  uuid: 5 + uuidSuffix,
  ovaryMeasurementId: testResultOvaryMeasurementStimLeftFixture.id,
  type: CystType.Hydrosalpinx,
  sizes: ['1.54', '1.55', '1.58'],
}

export const testResultOvaryCystUltrasoundRightFixture: Partial<TestResultOvaryCystMeasurement> = {
  id: 6,
  uuid: 'ce4acc85-e927-439d-81ba-55617de8ffad',
  ovaryMeasurementId: UltrasoundTestResultRightOvaryMeasFixture.id,
  type: CystType.Hydrosalpinx,
  sizes: ['1.54', '1.55', '1.58'],
}

export const testResultOvaryCystUltrasoundLeftFixture: Partial<TestResultOvaryCystMeasurement> = {
  id: 7,
  uuid: '64f927ed-f2e9-45a3-ac9f-757ac099b520',
  ovaryMeasurementId: UltrasoundTestResultLeftOvaryMeasFixture.id,
  type: CystType.Hydrosalpinx,
  sizes: ['1.54', '1.55', '1.58'],
}
