import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {Equal, FindOptionsWhere, Not} from 'typeorm'
import {PatientPrescriptionStatus} from '../enums'

export const getPatientPrescriptionsWhere = (
  patientId: number,
): FindOptionsWhere<PatientPrescription> => ({
  status: Not(PatientPrescriptionStatus.Archived),
  patientId: Equal(patientId),
})
