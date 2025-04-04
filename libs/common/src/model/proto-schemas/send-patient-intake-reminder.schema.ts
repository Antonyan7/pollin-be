import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type SendPatientIntakeReminderPayload = {
  patientId: number
  appointmentId: number

  //Patient intake questionnaire uuid
  questionnaireUUID?: string
}

export const SendPatientIntakeReminderSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  appointmentId: {
    type: 'int32',
  },
  questionnaireUUID: {
    type: 'string',
  },
})
