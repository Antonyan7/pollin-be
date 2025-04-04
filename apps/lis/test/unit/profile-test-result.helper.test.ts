import {profileTestsWithoutResult} from '@apps/lis/fertility-iq/helpers/profile-test-result.helper'
import {ProfileTestResult, TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

const DFIMock = {
  id: 91,
  uuid: '2088930d-3278-46fd-9cc7-f548ac4652ec',
  title: 'DNA Fragmentation Index',
  abbreviation: 'DFI',
}

const SemenAnalysisMock = {
  id: 3,
  uuid: 'b786720b-5335-465e-a961-4f74579e7e69',
  title: 'Semen Analysis',
  abbreviation: 'Semen Analysis',
}

const fertilityIQGrouping: ProfileTestResult[] = [
  {
    id: 65,
    uuid: 'kl4606c9-50b6-11ef-81be-42010aa20022',
    sexAtBirth: 'Male',
    oldestOrRecent: 'Recent',
    type: 'FertilityIQ',
    testPanelId: null,
    testTypeId: 91,
    isRequiredForFertilityIQ: false,
    testType: DFIMock,
    testPanel: null,
  } as unknown as ProfileTestResult,
  {
    id: 64,
    uuid: 'k1a606c9-50b6-11ef-81be-42010aa20022',
    sexAtBirth: 'Male',
    oldestOrRecent: 'Recent',
    type: 'FertilityIQ',
    testPanelId: 3,
    testTypeId: null,
    isRequiredForFertilityIQ: true,
    testType: null,
    testPanel: SemenAnalysisMock,
  } as unknown as ProfileTestResult,
]

const patientResultWithSemenAnalysis = [
  {
    id: 10016,
    uuid: 'uudi1',
    patientId: 132,
    labId: 1,
    testPanelId: SemenAnalysisMock.id,
    testPanel: SemenAnalysisMock,
    testType: null,
  } as unknown as TestResult,
]

const patientResultWithDFI = [
  {
    id: 10017,
    uuid: 'uuid2',
    patientId: 132,
    labId: 1,
    testPanel: null,
    testType: DFIMock,
    testTypeId: DFIMock.id,
  } as unknown as TestResult,
]

describe('Fertility IQ group have DFI & Semen Analysis, Male patient has only Semen Analysis result', () => {
  it('should return DFI since patient does not have result for given Fertility IQ group item: Semen Analysis', () => {
    const result = profileTestsWithoutResult(fertilityIQGrouping, patientResultWithSemenAnalysis)
    expect(result.length).toBe(1)
    expect(result[0].testKind.id).toBe(DFIMock.id)
  })
})

describe('Patient has both DFI and Semen analysis result', () => {
  it('should return emtpy array since patient has all results for Fertility IQ group', () => {
    const result = profileTestsWithoutResult(fertilityIQGrouping, [
      ...patientResultWithSemenAnalysis,
      ...patientResultWithDFI,
    ])
    expect(result.length).toBe(0)
  })
})

describe('Patient does not have any result yet', () => {
  it('should return all Fertilit IQ group items since patient has no result', () => {
    const result = profileTestsWithoutResult(fertilityIQGrouping, [])
    expect(result.length).toBe(2)
  })
})
