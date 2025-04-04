import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {WireTransferPaymentOrderPaidSchema} from '@libs/common/model/proto-schemas/payment-order-paid.schema'
import {PaymentOrderSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {PatientPushNotificationSeed} from '@seeds/typeorm'
import {handlerProcessWireTransferPaid} from '@firebase-platform/functions/push-notification/src/process-wire-transfer-paid/handler'
import {PushNotificationType} from '@libs/common/enums/push-notification.enum'
import {PatientSeed} from '@seeds/typeorm'
import {PushNotificationAdapter} from '@libs/common/adapters'
import {PushNotificationInternalType} from '@libs/services-common/enums'
import {PatientAlertType} from '@libs/services-common/enums'
import {PatientAlertSeed, PatientMilestoneSeed} from '@seeds/typeorm'
import {patientFixtureWireTransfer} from '../fixtures/patient-profile.fixture'
import {paymentOrderWireTransferFixture} from '../fixtures/payment-order.fixture'
import {patientMilestoneFixture} from '../fixtures/patient-milestone-fixture'
import {
  pushNotificationBody,
  pushNotificationTitle,
} from '@libs/common/services/push-notification/notification-data-mapping'

jest.setTimeout(10000)
jest.mock('../../../libs/common/src/adapters/push-notification.adapter.ts')

const id = 7252390

export const patientPushNotificationFixture = {
  id,
  patientId: patientFixtureWireTransfer.id,
  registrationToken: 'PatientPushNotifiationTokenWTTest',
  pushNotificationsEnabled: true,
  type: PushNotificationType.MilestoneAlert,
}

let dataSource: DataSource
let paymentOrderSeed: PaymentOrderSeed
let patientSeed: PatientSeed
let patientMilestoneSeed: PatientMilestoneSeed
let patientPushNotificationSeed: PatientPushNotificationSeed
let patientAlertSeed: PatientAlertSeed

describe('Wire transfer paid process success push notification', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    paymentOrderSeed = new PaymentOrderSeed(dataSource)
    patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)
    patientAlertSeed = new PatientAlertSeed(dataSource)
    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    await patientSeed.create(patientFixtureWireTransfer)
    await paymentOrderSeed.create(paymentOrderWireTransferFixture)
    await patientMilestoneSeed.create(patientMilestoneFixture)
    await patientPushNotificationSeed.create(patientPushNotificationFixture)
  })

  it('should send notification for wire transfer payment success', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')
    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          paymentOrderId: paymentOrderWireTransferFixture.id,
        },
        WireTransferPaymentOrderPaidSchema,
      ),
    )

    await handlerProcessWireTransferPaid(message)

    const patientAlerts = await patientAlertSeed.findByPatientId(patientFixtureWireTransfer.id)
    const patientPlanDetailsAlert = patientAlerts.find(
      (item) => item.type === PatientAlertType.PlanDetails,
    )
    expect(patientPlanDetailsAlert).toBeTruthy()

    expect(spyPushNotificationAdapterSend).toBeCalledWith(
      expect.objectContaining({
        title: pushNotificationTitle.get(PushNotificationInternalType.MilestoneAlert),
        body: pushNotificationBody.get(PushNotificationInternalType.MilestoneAlert),
        type: PushNotificationType.MilestoneAlert,
        registrationToken: patientPushNotificationFixture.registrationToken,
      }),
    )
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientSeed.removeByIds([patientFixtureWireTransfer.id])
    await paymentOrderSeed.removeByIds([paymentOrderWireTransferFixture.id])
    await patientMilestoneSeed.removeByIds([patientMilestoneFixture.id])
    await dataSource.destroy()
  })
})
