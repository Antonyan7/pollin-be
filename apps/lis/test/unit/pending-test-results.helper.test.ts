import {findResultByUniversalCode} from '@apps/lis/test-result/helper/pending-test-results.helper'
import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

describe('Patients Pending test results helper', () => {
  it('should find preselected unlinked result if user has same test result as pending', () => {
    const matchedID = 'be8baab9-fac7-4142-9f05-09c0c50d58a9'
    const mockedTestResults = [
      {
        uuid: '2daadb9b-4b61-4446-bd54-f985dc639360',
        patient: {uuid: '7d87facf-83ce-48cb-be95-5cffdfa0f549'},
        specimen: {collectedOn: `2023-12-15T14:19:28.000Z`},
        testType: {
          title: 'Anti Mullerian Hormone',
          lifeLabsCode: 'UNI1',
          dynacareCode: null,
        },
        testPanel: null,
      },
      {
        uuid: matchedID,
        patient: {uuid: '7d87facf-83ce-48cb-be95-5cffdfa0f549'},
        specimen: {collectedOn: `2023-12-15T14:19:28.000Z`},
        testPanel: {
          title: 'Estradiol',
          lifeLabsCode: 'UNI2',
          dynacareCode: null,
        },
        testType: null,
      },
    ] as unknown as TestResult[]

    const result = findResultByUniversalCode(mockedTestResults, 'UNI2')
    expect(result.uuid).toBe(matchedID)
  })
})
