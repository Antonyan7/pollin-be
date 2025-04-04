import {PatientMedication} from '@libs/data-layer/apps/users/entities/typeorm'

export const handleMedicationNameValue = (patientMedication: PatientMedication): string => {
  return (
    patientMedication?.medication?.title ||
    patientMedication?.name ||
    patientMedication?.nameFromIntake ||
    ''
  )
}

export const handleMedicationNameWithDosage = (patientMedication: PatientMedication): string => {
  return `${handleMedicationNameValue(patientMedication)} - ${patientMedication.dosage}`
}
