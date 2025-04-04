import {
  formatTestsWithMissingLabs,
  missingLabsOnSpecimenTests,
} from '@firebase-platform/functions/test-orders-and-results/src/common/helpers/lab-validation.helper'
import {SpecimenTest} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

describe('Lab Validation Helper', () => {
  test('should return test types & panels that are missing Lab', () => {
    const mockSpecimenTest = [
      {
        testType: {
          uuid: '1',
          title: 'AMH',
        },
      },
      {
        testPanel: {
          uuid: '2',
          title: 'TSH',
        },
      },
      {
        testPanel: {
          uuid: '3',
          title: 'Semen Analysis',
          labId: 1,
        },
      },
    ] as SpecimenTest[]

    const result = missingLabsOnSpecimenTests(mockSpecimenTest)

    expect(result.length).toBe(2)

    const message = formatTestsWithMissingLabs(result)

    expect(message).toBe('Title: AMH, ID: 1, Title: TSH, ID: 2')
  })
})
