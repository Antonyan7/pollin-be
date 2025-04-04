import {TestResultMeasurementType} from '@libs/data-layer/apps/clinic-test/enums/test-result.enum'
import {HL7AbnormalFlag} from '@libs/common/enums/test-orders-and-results.enum'

const Hl7ToNestprojectMeasurementMap: Record<HL7AbnormalFlag, TestResultMeasurementType> = {
  [HL7AbnormalFlag.N]: TestResultMeasurementType.Normal,
  [HL7AbnormalFlag.A]: TestResultMeasurementType.Abnormal,
  [HL7AbnormalFlag.L]: TestResultMeasurementType.Abnormal,
  [HL7AbnormalFlag.H]: TestResultMeasurementType.Abnormal,
  [HL7AbnormalFlag.LL]: TestResultMeasurementType.Abnormal,
  [HL7AbnormalFlag.HH]: TestResultMeasurementType.Abnormal,
  [HL7AbnormalFlag.I]: TestResultMeasurementType.Indeterminate,
}

/**
 * Convert observation status from 3rd party Lab to Nestproject measurement type
 * @param hl7flag Abnormal Flag from HL7 parsed file
 */
export const hl7StatusToNestprojectMeasurementType = (
  hl7flag: HL7AbnormalFlag | string,
): TestResultMeasurementType | null => {
  if (!hl7flag) {
    return null
  }

  return Hl7ToNestprojectMeasurementMap[hl7flag] ?? null
}
