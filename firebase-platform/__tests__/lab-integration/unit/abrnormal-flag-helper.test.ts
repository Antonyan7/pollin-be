import {TestResultMeasurementType} from '@libs/data-layer/apps/clinic-test/enums'
import {HL7AbnormalFlag} from '@libs/common/enums/test-orders-and-results.enum'
import {hl7StatusToNestprojectMeasurementType} from '@libs/common/helpers/lab-integration/abnormal-flag.helper'

describe('Abnormal Flag Helper: hl7StatusToNestprojectMeasurementType', () => {
  it('should return Normal measurement type for N flag', () => {
    expect(hl7StatusToNestprojectMeasurementType(HL7AbnormalFlag.N)).toBe(
      TestResultMeasurementType.Normal,
    )
  })

  it('should return Abnormal measurement type for abnormal flags', () => {
    expect(hl7StatusToNestprojectMeasurementType(HL7AbnormalFlag.A)).toBe(
      TestResultMeasurementType.Abnormal,
    )

    expect(hl7StatusToNestprojectMeasurementType(HL7AbnormalFlag.H)).toBe(
      TestResultMeasurementType.Abnormal,
    )

    expect(hl7StatusToNestprojectMeasurementType(HL7AbnormalFlag.HH)).toBe(
      TestResultMeasurementType.Abnormal,
    )

    expect(hl7StatusToNestprojectMeasurementType(HL7AbnormalFlag.L)).toBe(
      TestResultMeasurementType.Abnormal,
    )

    expect(hl7StatusToNestprojectMeasurementType(HL7AbnormalFlag.LL)).toBe(
      TestResultMeasurementType.Abnormal,
    )
  })

  it('should return Indeterminate measurement type for I flag', () => {
    expect(hl7StatusToNestprojectMeasurementType(HL7AbnormalFlag.I)).toBe(
      TestResultMeasurementType.Indeterminate,
    )
  })
})
