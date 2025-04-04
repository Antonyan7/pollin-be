import {TestResultOHSSOvaryMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {OvaryLocation} from '@libs/data-layer/apps/clinic-test/enums'
import {testResultForGetOHSSUltrasoundDetailsFixture} from './test-result.fixture'

export const testResultOHSSOvaryMeasurementLeftFixture: Partial<TestResultOHSSOvaryMeasurement> = {
  id: 1,
  uuid: 'affdc11c-24e8-4f58-91ba-042afec2f4f2',
  testResultId: testResultForGetOHSSUltrasoundDetailsFixture.id,
  location: OvaryLocation.LeftOvary,
  length: 3.2,
  width: 4.1,
  height: 0.4,
  volume: 15.0,
  approxNumberOfCysts: 1,
  threeLargestAvgInSize: ['3', '1.2', '2.2'],
}

export const testResultOHSSOvaryMeasurementRightFixture: Partial<TestResultOHSSOvaryMeasurement> = {
  id: 2,
  uuid: 'hhfdc11c-34e8-7958-91ba-042afec444f2',
  testResultId: testResultForGetOHSSUltrasoundDetailsFixture.id,
  location: OvaryLocation.RightOvary,
  length: 2.2,
  width: 2.1,
  height: 0.7,
  volume: 14.5,
  approxNumberOfCysts: 2,
  threeLargestAvgInSize: ['null', 'null', 'null'],
}
