import {defaultFilterForAppointmentEmailVerifiedStaffFixture} from '@libs/common/test/fixtures/default-filter-for-appointment.fixture'
import {DefaultFilterForAppointmentToPatientStatus} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {PatientStatusEnum} from '@libs/services-common/enums'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'

export const defaultFilterForAppointmentToPatientStatusFixture: Partial<DefaultFilterForAppointmentToPatientStatus> =
  {
    id: 1,
    defaultFilterForAppointmentId: defaultFilterForAppointmentEmailVerifiedStaffFixture.id,
    patientPlanStatusId: patientPlanStatusFixture.id,
    patientStatus: PatientStatusEnum.PlanType,
  }
export const defaultFilterForAppointmentToPatientActiveStatusFixture: Partial<DefaultFilterForAppointmentToPatientStatus> =
  {
    id: 2,
    defaultFilterForAppointmentId: defaultFilterForAppointmentEmailVerifiedStaffFixture.id,
    patientStatus: PatientStatusEnum.Active,
  }
