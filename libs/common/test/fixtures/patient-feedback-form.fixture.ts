import {PatientFeedbackForm} from '@libs/data-layer/apps/users/entities/typeorm'
import {appointmentForPatientFeedbackFormFixture} from '@libs/common/test/fixtures/appointment.fixture'
import {PatientFeedbackFormSatisfactionLevelEnum} from '@libs/services-common/enums/patient-feedback-form-satisfaction-level.enum'

export const PatientFeedbackFormFixture: Partial<PatientFeedbackForm> = {
  id: 1,
  uuid: '0cc472ef-f169-4850-b37b-42e1ee67d695',
  appointmentId: appointmentForPatientFeedbackFormFixture.id,
  feedback: 'testing feedback form fixture',
  satisfactionLevel: PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel1,
}
