import * as functions from 'firebase-functions/v2'
import * as express from 'express'
import {handlerStripeWebhookEvent} from '@firebase-platform/functions/checkout/src/http/cryo-subscription-stripe-webhook/handler'
import {PatientSeed} from '@seeds/typeorm/patient.seed'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {CryoSubscriptionEventActionType} from '@libs/common/enums/cryo-subscriptions.enum'
import {patientSubscriptionFixture} from '../fixtures/checkout/patient'
import {cryoSubscriptionBasic} from '../fixtures/checkout/cryo-subscription'
import {PatientCryoSubscriptionSeed} from '@seeds/typeorm/cryo-subscription.seed'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'

jest.setTimeout(10000)
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
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

const forgeRequest = (event: string): {req: functions.https.Request; res: express.Response} => {
  const req = {
    headers: {
      'stripe-signature': event,
    },
  } as unknown as functions.https.Request
  const res = {
    send: jest.fn(),
  } as unknown as express.Response

  return {req, res}
}

describe('Stripe webhook should publish actions based on Stripe events', () => {
  let dataSource = null

  let patientSeed: PatientSeed
  let cryoSubSeed: PatientCryoSubscriptionSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    cryoSubSeed = new PatientCryoSubscriptionSeed(dataSource)

    await patientSeed.create(patientSubscriptionFixture)
    await cryoSubSeed.create(cryoSubscriptionBasic)
  })

  it('should publish SendRenewalReminder for upcoming invoice', async () => {
    const spyPubSub = jest.spyOn(PubSubHelpers, 'publishCryoSubscriptionEventProcessed')

    const {req, res} = forgeRequest('upcoming-basic')

    await handlerStripeWebhookEvent(req, res)

    expect(spyPubSub).toBeCalledTimes(1)
  })

  it('should publish SendPaymentFailAlert action type if payment failed for first attempt', async () => {
    const spyPubSub = jest.spyOn(PubSubHelpers, 'publishCryoSubscriptionEventProcessed')

    const {req, res} = forgeRequest('failed-first-attempt-basic')

    await handlerStripeWebhookEvent(req, res)

    expect(spyPubSub).toBeCalledWith({
      cryoSubscriptionId: cryoSubscriptionBasic.id,
      actionType: CryoSubscriptionEventActionType.SendPaymentFailAlert,
    })
    spyPubSub.mockClear()
  })

  it('should publish SendRenewalArrears action type if payment remains unpaid on day 28', async () => {
    const spyPubSub = jest.spyOn(PubSubHelpers, 'publishCryoSubscriptionEventProcessed')

    const {req, res} = forgeRequest('invoice-uncollectible-basic')

    await handlerStripeWebhookEvent(req, res)

    expect(spyPubSub).toBeCalledWith({
      cryoSubscriptionId: cryoSubscriptionBasic.id,
      actionType: CryoSubscriptionEventActionType.SendRenewalArrears,
      paymentOrderId: null,
    })
    spyPubSub.mockClear()
  })

  it('should update invoice/subscription settigs of the customer', async () => {
    const {req, res} = forgeRequest('payment_method.attached')

    const response = await handlerStripeWebhookEvent(req, res)
    expect(response !== null).toBeTruthy
  })

  afterAll(async () => {
    await cryoSubSeed.removeByIds([cryoSubscriptionBasic.id])
    await patientSeed.removeByIds([patientSubscriptionFixture.id])
  })
})
