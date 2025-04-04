import {PatientPlanStatus} from '@libs/data-layer/apps/plan/entities/typeorm'

export const patientPlanStatusFixture: Partial<PatientPlanStatus> = {
  id: 1,
  uuid: 'patient_plan_0000_0000',
  patientStatusAbbreviation: 'patientStatusAbbreviation',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 1,
}

export const patientPlanSecondOrderStatusFixture: Partial<PatientPlanStatus> = {
  id: 2,
  patientStatusAbbreviation: 'patientPlanSecondOrderStatus',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 2,
}

export const patientPlanStatusV2Fixture: Partial<PatientPlanStatus> = {
  id: 3,
  uuid: '2f50fb0d-fa7e-4e61-8f04-86fb0193eb3f',
  patientStatusAbbreviation: 'patientPlanStatusV2not ac',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 3,
}

export const patientPlanStatusDischargableFixture: Partial<PatientPlanStatus> = {
  id: 4,
  uuid: '2f50fb0d-aa7e-4e61-8f04-86fb0193eb3f',
  patientStatusAbbreviation: 'patientPlanStatusDischargable',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 4,
  dischargeable: true,
}

export const patientPlanStatusForAppointmentsByDateFixture: Partial<PatientPlanStatus> = {
  id: 5,
  uuid: '2f60fb0d-fa7e-4e61-8f04-86fb0193eb3f',
  patientStatusAbbreviation: 'patientPlanStatusForAppointmentsByDateFixture',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 10,
}
