import {handleMedicationNameValue} from '@libs/common/helpers/medications.helper'
import {PatientMedication} from '@libs/data-layer/apps/users/entities/typeorm'

describe('handleMedicationNameValue test function', () => {
  it('should return empty string', () => {
    const patientMedication: Partial<PatientMedication> = {}
    expect(handleMedicationNameValue(patientMedication as PatientMedication)).toBe('')
  })
})
