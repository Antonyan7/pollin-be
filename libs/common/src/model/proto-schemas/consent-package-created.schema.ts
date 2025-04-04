import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type ConsentPackageSentPayload = {
  patientConsentPackageId: number
  /** main or one of partners from signature.signingPatient.*/
  signingPatientId: number
} & RequestContextPubSubPayload

export const ConsentPackageSentSchema = createSchema({
  ...RequestContextSchema,
  patientConsentPackageId: {
    type: 'int32',
  },
  signingPatientId: {
    type: 'int32',
  },
})
