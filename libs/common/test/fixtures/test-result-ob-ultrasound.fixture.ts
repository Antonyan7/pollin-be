import {TestResultObUltrasound} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testResultCompletedForEditObUltrasoundFixture,
  testResultForObUltrasoundFixture,
  testResultForUltrasoundFolliclesFixture,
  testResultOBWorkSheetFixture,
} from './test-result.fixture'
import {testTypeForUltrasoundFolliclesFixture} from '@libs/common/test/fixtures/test-type.fixture'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {GestationalAgeEnum} from '@libs/data-layer/apps/clinic-test/enums'

const uuidSuffix: string = '-test-result-ob-ultrasound-uuid'

export const testResultObUltrasoundFixture: Partial<TestResultObUltrasound> = {
  id: 1,
  uuid: `${1}${uuidSuffix}`,
  testResultId: testResultForUltrasoundFolliclesFixture.id,
  processType: testTypeForUltrasoundFolliclesFixture.processType,
  freeFluidNote: 'FFNote1',
  adnexaNote: 'ANote1',
}

export const testResultObWorksheetFixture: Partial<TestResultObUltrasound> = {
  id: 2,
  uuid: `${2}${uuidSuffix}`,
  crownRumpLengthLength: '3 cm',
  crownRumpLengthWeeks: 0,
  crownRumpLengthDays: 1,
  gestationalAgeWeeks: 13,
  gestationalAgeDays: 4,
  yolkSec: 'yolk',
  fetalHearthMotion: '140 bpm',
  testResultId: testResultOBWorkSheetFixture.id,
  processType: ProcessType.UltrasoundObstetric,
}

export const testResultObUltrasoundForEditFixture: Partial<TestResultObUltrasound> = {
  id: 3,
  uuid: `${3}${uuidSuffix}`,
  testResultId: testResultCompletedForEditObUltrasoundFixture.id,
  processType: testTypeForUltrasoundFolliclesFixture.processType,
  freeFluidNote: 'Free Fluid Note',
}

export const testResultObUltrasoundForGetDetailOnMobileFixture: Partial<TestResultObUltrasound> = {
  id: 5,
  uuid: `${5}${uuidSuffix}`,
  testResultId: testResultForObUltrasoundFixture.id,
  processType: testTypeForUltrasoundFolliclesFixture.processType,
  gestationalAgeDlmpOrEdd: GestationalAgeEnum.DLMP,
  gestationalAgeDays: 0,
  gestationalAgeWeeks: 0,
  crownRumpLengthLength: '0',
  numberOfGestationalSacs: 0,
  followUpRecommendation:
    'followUpRecommendation testResultObUltrasoundForGetDetailOnMobileFixture',
  singleLiveGestationOfDays: 0,
  singleLiveGestationOfWeeks: 0,
}
