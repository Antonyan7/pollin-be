import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'

export const isFollMonType = (ultrasoundTestResult: TestResult): boolean => {
  return ultrasoundTestResult.testType.processType == ProcessType.UltrasoundFolliclesMonitoring
}

export const isDay3Type = (ultrasoundTestResult: TestResult): boolean => {
  return ultrasoundTestResult.testType.processType == ProcessType.UltrasoundDay3
}

export const isSonohysterogramType = (ultrasoundTestResult: TestResult): boolean => {
  return ultrasoundTestResult.testType.processType == ProcessType.UltrasoundSonohysterogram
}

export const isFollMonOrDay3Types = (ultrasoundTestResult: TestResult): boolean => {
  return isFollMonType(ultrasoundTestResult) || isDay3Type(ultrasoundTestResult)
}

export const convertNumberToStringArray = (sizes: number[]): string[] => {
  if (!sizes || !sizes?.length) {
    return []
  }

  return sizes.map(String)
}

export const convertStringToNumberArray = (sizes: string[]): number[] => {
  if (!sizes) {
    return []
  }

  return sizes.map(Number)
}
