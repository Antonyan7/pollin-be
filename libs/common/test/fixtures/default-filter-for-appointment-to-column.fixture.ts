import {DefaultFilterForAppointmentToColumn} from '@libs/data-layer/apps/scheduling/entities/typeorm/default-filter-for-appointment-to-column.entity'
import {
  defaultFilterForAppointmentEmailVerifiedStaffFixture,
  defaultFilterForAppointmentTwoFixture,
} from './default-filter-for-appointment.fixture'
import {AppointmentFilterColumnEnum} from '@libs/common/enums'

export const defaultFilterForAppointmentToColumnFixture: Partial<DefaultFilterForAppointmentToColumn> =
  {
    id: 1,
    defaultFilterForAppointmentId: defaultFilterForAppointmentEmailVerifiedStaffFixture.id,
    column: AppointmentFilterColumnEnum.Patient,
  }

export const defaultFilterForAppointmentToColumnTwoForPatientFixture: Partial<DefaultFilterForAppointmentToColumn> =
  {
    id: 2,
    defaultFilterForAppointmentId: defaultFilterForAppointmentTwoFixture.id,
    column: AppointmentFilterColumnEnum.Patient,
  }

export const defaultFilterForAppointmentToColumnTwoForDoctorFixture: Partial<DefaultFilterForAppointmentToColumn> =
  {
    id: 3,
    defaultFilterForAppointmentId: defaultFilterForAppointmentTwoFixture.id,
    column: AppointmentFilterColumnEnum.Doctor,
  }
