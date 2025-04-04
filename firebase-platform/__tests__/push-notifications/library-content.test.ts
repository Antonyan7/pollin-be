import {testPubSubEvent} from '@functions-types'
import {FirebaseAdminProvider, initFireORM} from '@libs/common'
import {PushNotificationAdapter} from '@libs/common/adapters'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {PushNotificationType} from '@libs/common/enums/push-notification.enum'
import {PushNotificationInternalType} from '@libs/services-common/enums'
import {handlerPushLibraryContent} from '@firebase-platform/functions/push-notification/src/test-order-created/push-library-content-handler'
import {OrderUUIDSchema} from '@libs/common/model/proto-schemas/order-uuid.schema'
import {TestOrder, TestOrderItem} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient, PatientPushNotification} from '@libs/data-layer/apps/users/entities/typeorm'
import {OrderGroupItemEnum, TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {DataSource} from 'typeorm'
import {
  PatientPushNotificationSeed,
  PatientSeed,
  TestOrderItemSeed,
  TestOrderSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  pushNotificationBody,
  pushNotificationTitle,
} from '@libs/common/services/push-notification/notification-data-mapping'

FirebaseAdminProvider.init()
initFireORM()
jest.mock('../../../libs/common/src/adapters/push-notification.adapter')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')
jest.setTimeout(10000)

export const patientData: Partial<Patient> = {
  id: 995500912,
  uuid: 95500912 + '-d420-440f-9727-8431114a00ce',
  authUserId: 'CF_AUTH_LIBR_CONT',
  firstName: 'FIRST_CF_AUTH_LIBR_CONT',
  lastName: 'LAST_CF_AUTH_LIBR_CONT',
}

export const patientPushNotificationData: Partial<PatientPushNotification> = {
  id: 998800909,
  patientId: patientData.id,
  registrationToken: 'PatientPushNotifiationTokenCfTestLibrCont',
  pushNotificationsEnabled: true,
}

export const testOrderForLibraryContentCFFixture: Partial<TestOrder> = {
  id: 780,
  uuid: 780 + 'aaa2e-a047-5902-bc11-8af3f058f888',
  patientId: patientData.id,
  status: TestOrderStatusEnum.Completed,
}

export const testOrderItemForLibraryContentCFFixture: Partial<TestOrderItem> = {
  id: 781,
  type: OrderGroupItemEnum.LibraryContent,
  testOrderId: testOrderForLibraryContentCFFixture.id,
}

export const testOrderNotCompletedFixture: Partial<TestOrder> = {
  id: 783,
  uuid: 783 + 'aaa2e-a047-5902-bc11-8af3f058f888',
  patientId: patientData.id,
  status: TestOrderStatusEnum.Booked,
}
export const testOrderItemForNotCompletedLibraryContentCFFixture: Partial<TestOrderItem> = {
  id: 784,
  type: OrderGroupItemEnum.LibraryContent,
  testOrderId: testOrderNotCompletedFixture.id,
}

export const testOrderCompletedButWIthoutLibraryContentItemsFixture: Partial<TestOrder> = {
  id: 790,
  uuid: 790 + 'aaa2e-a047-5902-bc11-8af3f058f888',
  patientId: patientData.id,
  status: TestOrderStatusEnum.Completed,
}

export const testOrderItemWihtoutLibraryContentFixture: Partial<TestOrderItem> = {
  id: 791,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderCompletedButWIthoutLibraryContentItemsFixture.id,
}
let dataSource: DataSource
let testOrderSeed: TestOrderSeed
let patientSeed: PatientSeed
let patientPushNotificationSeed: PatientPushNotificationSeed
let testOrderItemSeed: TestOrderItemSeed

describe('Push notification: send push notification on testOrderCreated if it contains libraryContent reference ', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    testOrderItemSeed = new TestOrderItemSeed(dataSource)

    await patientSeed.create(patientData)
    await patientPushNotificationSeed.create(patientPushNotificationData)

    await testOrderSeed.createArray([
      testOrderForLibraryContentCFFixture,
      testOrderNotCompletedFixture,
      testOrderCompletedButWIthoutLibraryContentItemsFixture,
    ])
    await testOrderItemSeed.createArray([
      testOrderItemForLibraryContentCFFixture,
      testOrderItemWihtoutLibraryContentFixture,
      testOrderItemForNotCompletedLibraryContentCFFixture,
    ])
  })

  test('Should send push notification for Library content on testOrderCreated', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data = {
      orderUUID: testOrderForLibraryContentCFFixture.uuid,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, OrderUUIDSchema))

    const result = await handlerPushLibraryContent(message)
    expect(result).toBeTruthy()

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.LibraryContent),
      body: pushNotificationBody.get(PushNotificationInternalType.LibraryContent),
      registrationToken: patientPushNotificationData.registrationToken,
      id: null,
      type: PushNotificationType.Library,
    }
    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('Should send push notification for Library content if testOrder not completed, when ordered libraryCOnent and something else', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data = {
      orderUUID: testOrderNotCompletedFixture.uuid,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, OrderUUIDSchema))

    const result = await handlerPushLibraryContent(message)
    expect(result).toBeTruthy()

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.LibraryContent),
      body: pushNotificationBody.get(PushNotificationInternalType.LibraryContent),
      registrationToken: patientPushNotificationData.registrationToken,
      id: null,
      type: PushNotificationType.Library,
    }
    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('Should NOT send push notification for Library content  - testOrderItem without any libraryContent', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data = {
      orderUUID: testOrderCompletedButWIthoutLibraryContentItemsFixture.uuid,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, OrderUUIDSchema))

    const result = await handlerPushLibraryContent(message)
    expect(result).toBeFalsy()

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  afterAll(async () => {
    await patientSeed.removeByIds([patientData.id])
    await patientPushNotificationSeed.removeByIds([patientPushNotificationData.id])

    await testOrderSeed.removeByIds([
      testOrderForLibraryContentCFFixture.id,
      testOrderNotCompletedFixture.id,
      testOrderCompletedButWIthoutLibraryContentItemsFixture.id,
    ])
    await testOrderItemSeed.removeByIds([
      testOrderItemForLibraryContentCFFixture.id,
      testOrderItemWihtoutLibraryContentFixture.id,
    ])

    jest.clearAllMocks()
  })
})
