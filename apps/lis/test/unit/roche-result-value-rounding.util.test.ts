import {getMeasurementResult} from '@apps/lis/test-result/helper/order-test-result.helper'
import {DefaultValue} from '@libs/common/enums'
import {machineResultValueRound} from '@libs/common/utils/round.util'
import {TestResultMeasurement, TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'

describe('Result value rounding => cal', () => {
  it('Should call machineResultValueRound util function for string small decimals', () => {
    expect(machineResultValueRound(null)).toBe(null)

    expect(machineResultValueRound('1.1')).toBe('1')

    expect(machineResultValueRound('1.8')).toBe('2')

    expect(machineResultValueRound('1.45')).toBe('1')

    expect(machineResultValueRound('1.52')).toBe('2')
  })

  it('Should call machineResultValueRound util function for string long decimals', () => {
    expect(machineResultValueRound('0.65')).toBe('0.7')

    expect(machineResultValueRound('0.036')).toBe('0.04')

    expect(machineResultValueRound('0.001')).toBe('0.001')

    expect(machineResultValueRound('0.0032')).toBe('0.003')

    expect(machineResultValueRound('0.00000000000071')).toBe('0.0000000000007')
  })

  it('Should call machineResultValueRound util function => non number value return immediately', () => {
    expect(machineResultValueRound('77.77ABC')).toBe('77.77ABC')
    expect(machineResultValueRound('77.77 ABC')).toBe('77.77 ABC')
  })

  it('Should call getMeasurementResult util function used in order test result list API and return result value', () => {
    const testResultMeasurement: Partial<TestResultMeasurement> = {
      id: 1,
      result: '0.036',
      testType: {id: 1, roundingForDecimalResultEnabled: true} as TestType,
    }
    expect(
      getMeasurementResult(
        testResultMeasurement as TestResultMeasurement,
        TestResultStatus.Completed,
      ),
    ).toBe('0.04')
  })

  it('Should call getMeasurementResult util function used in order test result list API and return Dash', () => {
    const testResultMeasurement: Partial<TestResultMeasurement> = {
      id: 1,
      result: '0.036',
      testType: {id: 1, roundingForDecimalResultEnabled: true} as TestType,
    }
    expect(
      getMeasurementResult(
        testResultMeasurement as TestResultMeasurement,
        TestResultStatus.Rejected,
      ),
    ).toBe(DefaultValue.Dash)
  })
})
