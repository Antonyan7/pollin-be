import {
  testResultFixture,
  testResultForUltrasoundFolliclesTwoFixture,
  testResultForUltrasoundFolliclesFixture,
  testResultFromMachineForDetailsFixture,
  testResultUltrasoundFixture,
} from './test-result.fixture'
import {
  testResultStimSheetUterusFixture,
  testResultStimSheetUterusLatestFixture,
} from './test-result-details.fixture'
import {TrilaminarEndometriumOptions} from '@libs/services-common/enums/ultrasound.enum'
import {TestResultUterusMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

const uuidSuffix: string = '-test-result-uterus-uuid'

export const testResultUterusFixture: Partial<TestResultUterusMeasurement> = {
  id: 1,
  uuid: 1 + uuidSuffix,
  testResultId: testResultFixture.id,
}

export const testResultUterusStimSheetEndometriumFixture: Partial<TestResultUterusMeasurement> = {
  id: 2,
  uuid: 2 + uuidSuffix,
  testResultId: testResultStimSheetUterusFixture.id,
  endometriumThickness: 3,
  freeFluid: false,
  trilaminarEndometrium: TrilaminarEndometriumOptions.NA,
}

export const testResultUterusStimSheetFreeFluidLatestFixture: Partial<TestResultUterusMeasurement> =
  {
    id: 5,
    uuid: 5 + uuidSuffix,
    testResultId: testResultStimSheetUterusLatestFixture.id,
    endometriumThickness: 3,
    freeFluid: true,
    trilaminarEndometrium: TrilaminarEndometriumOptions.NA,
  }

export const testResultUterusPrefilledFixture: Partial<TestResultUterusMeasurement> = {
  id: 8,
  uuid: 8 + uuidSuffix,
  testResultId: testResultFromMachineForDetailsFixture.id,
  endometriumThickness: 2.3,
}

//used in old deprecated PI
export const testResultUterusPrefilledToUpdateOldFixture: Partial<TestResultUterusMeasurement> = {
  id: 9,
  uuid: 9 + uuidSuffix,
  testResultId: testResultForUltrasoundFolliclesFixture.id,
  endometriumThickness: 2.3,
}

export const testResultUterusPrefilledToUpdateFixture: Partial<TestResultUterusMeasurement> = {
  id: 10,
  uuid: 10 + uuidSuffix,
  testResultId: testResultForUltrasoundFolliclesTwoFixture.id,
  endometriumThickness: 5.6,
  utTrace: 1.3,
}

export const ultrasoundTestResultUterusFixture: Partial<TestResultUterusMeasurement> = {
  id: 11,
  uuid: 'af9ba230-42a2-48e1-8078-ed88f7c1c246',
  testResultId: testResultUltrasoundFixture.id,
  utTrace: 0,
  width: 0,
  height: 4.3,
  volume: 1.4,
  endometriumThickness: 1.6,
  trilaminarEndometrium: 'ADS 1',
  freeFluid: true,
}
