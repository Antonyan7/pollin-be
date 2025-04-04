import {TestResultMeasurement, TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {DefaultValue} from '../enums'

export function getTestTypeUnit(testType: TestType): string {
  return testType?.unit ?? DefaultValue.Empty
}

export const getTestResultValue = (
  testResultMeasurement: TestResultMeasurement,
  testTypeForUnit?: TestType,
): string => {
  const testType = testTypeForUnit ?? testResultMeasurement.testType

  return testType?.unit
    ? `${testResultMeasurement.result} ${testType.unit}`
    : testResultMeasurement.result
}

export const getResultUnitTitle = (result: string, unit: string): string => {
  if (!unit) {
    return result
  }

  return `${result} ${unit}`
}
