import {StripeCryoSubscriptionEventProcessedSchema} from '@libs/common/model/proto-schemas/stripe-cryo-subscription-event-processed.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {testPubSubEvent} from '@functions-types'
import {handlerStripeEventProcessedSendEmail} from '@firebase-platform/functions/email-notification/src/stripe-cryo-subscription-event-processed/handler'
import {
  CryoSubscriptionStatus,
  Patient,
  PatientCryoSubscription,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {DateTimeUtil} from '@libs/common'
import {UserType} from '@libs/services-common/enums/patient.enum'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums/patient.enum'
import {handlerSendCryoSubscriptionSecondAttemptReminder} from '@firebase-platform/functions/email-notification/src/send-cryo-subscription-reminder/handler'
import {SendCryoSubscriptionSecondAttemptReminderSchema} from '@libs/common/model/proto-schemas/send-cryo-subscription-second-attempt-reminder.schema'
import {PatientCryoSubscriptionSeed, PatientSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  CloudTask,
  CloudTaskType,
} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {CloudTaskRepository} from '@libs/data-layer/apps/users/repositories/fireorm/cloud-task.repository'

jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('../../../libs/common//src/adapters/cloud-task.adapter.ts')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const dateUtil = new DateTimeUtil()

const patient: Partial<Patient> = {
  id: 601012,
  uuid: '7ea0ed7d-82b5-11ed-b47d-45010aa4411b',
  authUserId: 'patientWithSubscription',
  patientIdentifier: 'PID601012',
  firstName: 'Cryo',
  lastName: 'SubBasic',
  email: 'fhealthdev+test@gmail.com',
  stripeCustomerId: 'cryo_sub_patient',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
}

const cryoSubscription: Partial<PatientCryoSubscription> = {
  id: 100001,
  patientId: patient.id,
  stripeSubscriptionId: 'stripe_subscription_for_email',
  startDate: dateUtil.toDate('2024-01-01'),
  billingCycleStartDate: dateUtil.toDate('2024-01-01'),
  renewalDate: dateUtil.toDate('2024-01-10'),
  status: CryoSubscriptionStatus.Active,
}

describe('Cryo subscription email handlers', () => {
  let dataSource = null

  let patientSeed: PatientSeed
  let cryoSubscriptionSeed: PatientCryoSubscriptionSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    cryoSubscriptionSeed = new PatientCryoSubscriptionSeed(dataSource)

    await patientSeed.createArray([patient])
    await cryoSubscriptionSeed.create(cryoSubscription)
  })

  it('should send email for renewal reminder', async () => {
    const result = await handlerStripeEventProcessedSendEmail(
      testPubSubEvent(
        encodePubSubMessage(
          {
            cryoSubscriptionId: cryoSubscription.id,
            actionType: 'SendRenewalReminder',
          },
          StripeCryoSubscriptionEventProcessedSchema,
        ),
      ),
    )

    expect(result).toBeTruthy()
  })

  it('should send email for second attempt reminder', async () => {
    const spyCloudTask = jest.spyOn(CloudTaskRepository.prototype, 'findCryoSubReminder')
    spyCloudTask.mockResolvedValue({
      id: 'sdnfhe3',
      cloudTaskId: 'cloud-task-cryo',
      patientId: patient.id,
      cryoSubscriptionId: cryoSubscription.id,
      type: CloudTaskType.CryoSubscriptionSecondAttemptReminder,
    } as CloudTask)

    const result = await handlerSendCryoSubscriptionSecondAttemptReminder(
      encodePubSubMessage(
        {cryoSubscriptionId: cryoSubscription.id},
        SendCryoSubscriptionSecondAttemptReminderSchema,
      ),
    )

    expect(result).toBeTruthy()
  })

  it('should send email renewal fees are in arrears', async () => {
    const result = await handlerStripeEventProcessedSendEmail(
      testPubSubEvent(
        encodePubSubMessage(
          {
            cryoSubscriptionId: cryoSubscription.id,
            actionType: 'SendRenewalArrears',
          },
          StripeCryoSubscriptionEventProcessedSchema,
        ),
      ),
    )

    expect(result).toBeTruthy()
  })

  afterAll(async () => {
    await cryoSubscriptionSeed.removeByPatientId(cryoSubscription.id)
    await patientSeed.removeByIds([patient.id])
  })
})
