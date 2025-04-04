import {FirebaseAdminProvider, initFireORM} from '@libs/common'
import {PushNotificationAdapter} from '@libs/common/adapters'
import {DataSource} from 'typeorm'
import {
  AppointmentSeed,
  PatientPushNotificationSeed,
  SuperTypeSeed,
  ServiceProviderSeed,
  ServiceCategorySeed,
  PatientSeed,
  ServiceTypeSeed,
  ServiceCategoryInputSeed,
} from '@seeds/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {PushNotificationType} from '@libs/common/enums/push-notification.enum'
import {PushNotificationInternalType} from '@libs/services-common/enums'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {handlerRequestPatientFeedback} from '@firebase-platform/functions/push-notification/src/request-patient-feedback/handler'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {SuperType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Patient, PatientPushNotification} from '@libs/data-layer/apps/users/entities/typeorm'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {v4} from 'uuid'
import {
  pushNotificationBody,
  pushNotificationTitle,
} from '@libs/common/services/push-notification/notification-data-mapping'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

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

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: 56510001,
}

export const superTypeFixture: Partial<SuperType> = {
  id: 33553,
  uuid: 33553 + '2ef-f169-4850-b37b-42e1ee67d695',
  name: 'superTypeFixture',
  groupOrderActionsByWorkflow: true,
}

export const serviceTypeData: Partial<ServiceType> = {
  id: 55560002,
  serviceCategoryId: serviceCategoryData.id,
  superTypeId: superTypeFixture.id,
  isTentative: false,
}

export const serviceTypeTentativeData: Partial<ServiceType> = {
  id: 55560003,
  serviceCategoryId: serviceCategoryData.id,
  superTypeId: superTypeFixture.id,
  isTentative: true,
}

const serviceProviderData: Partial<ServiceProvider> = {
  id: 55610003,
  uuid: v4(),
  title: 'title',
  imageURL: 'IMG',
  description: 'description',
  designation: 'designation',
}

const patientData: Partial<Patient> = {
  id: 111336232,
  authUserId: AuthUserFixture.emailVerifiedWithoutMFA.uid,
  firstName: 'Firstnamedfdrt',
  lastName: 'Firstnamedfddr3',
  patientIdentifier: 'PID12312312sd34',
  serviceProviderId: serviceProviderData.id,
}

const patientToNotSendTentativePushData: Partial<Patient> = {
  id: 111336233,
  authUserId: 'patientToNotSendTentativeNotificationData',
  firstName: 'Patient',
  lastName: 'Tentative',
  patientIdentifier: 'PID111336233',
  serviceProviderId: serviceProviderData.id,
}

export const patientPushNotificationData: Partial<PatientPushNotification> = {
  id: 998860909,
  patientId: patientData.id,
  registrationToken: 'patientPushNotificationDataToken',
  pushNotificationsEnabled: true,
}

const patientToNotSendTentativeNotificationData: Partial<PatientPushNotification> = {
  id: 998860910,
  patientId: patientToNotSendTentativePushData.id,
  registrationToken: 'patientToNotSendTentativePushData',
  pushNotificationsEnabled: true,
}

export const appointmentData: Partial<Appointment> = {
  id: 33654,
  uuid: 33654 + '2ef-f169-4850-b37b-42e1ee67d695',
  status: AppointmentStatus.Done,
  patientId: patientData.id,
  serviceProviderId: serviceProviderData.id,
  serviceTypeId: serviceTypeData.id,
  start: dateTimeUtil.subtractMinutes(dateTimeUtil.now(), 60),
  end: dateTimeUtil.subtractMinutes(dateTimeUtil.now(), 40),
}

// will be created during test case (not in the beginning)
export const appointmentInFutureTodayData: Partial<Appointment> = {
  ...appointmentData,

  id: 33656,
  uuid: 33656 + '2ef-f169-4850-b37b-42e1ee67d695',

  start: dateTimeUtil.addMinutes(dateTimeUtil.now(), 30),
  end: dateTimeUtil.addMinutes(dateTimeUtil.now(), 40),
}

export const appointmentInFutureWIthBOokedStatusData: Partial<Appointment> = {
  ...appointmentData,

  id: 33657,
  uuid: 33657 + '2ef-f169-4850-b37b-42e1ee67d695',
  status: AppointmentStatus.Booked,

  start: dateTimeUtil.addMinutes(dateTimeUtil.now(), 30),
  end: dateTimeUtil.addMinutes(dateTimeUtil.now(), 40),
}

// should send push even if in the future there is canceled app
export const appointmentInFutureCanceledData: Partial<Appointment> = {
  ...appointmentData,

  id: 33659,
  uuid: 33659 + '2ef-f169-4850-b37b-42e1ee67d695',

  start: dateTimeUtil.addMinutes(dateTimeUtil.now(), 30),
  end: dateTimeUtil.addMinutes(dateTimeUtil.now(), 40),
  status: AppointmentStatus.Cancelled,
}

const appointmentTentativeData: Partial<Appointment> = {
  id: 33666,
  uuid: 33666 + '2ef-f169-4850-b37b-42e1ee67d695',
  status: AppointmentStatus.Done,
  patientId: patientToNotSendTentativePushData.id,
  serviceProviderId: serviceProviderData.id,
  serviceTypeId: serviceTypeTentativeData.id,
  start: dateTimeUtil.subtractMinutes(dateTimeUtil.now(), 60),
  end: dateTimeUtil.subtractMinutes(dateTimeUtil.now(), 40),
}

describe('Patient feedback push notification:', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let patientPushNotificationSeed: PatientPushNotificationSeed
  let serviceCategorySeed: ServiceCategorySeed
  let serviceTypeSeed: ServiceTypeSeed
  let serviceProviderSeed: ServiceProviderSeed
  let appointmentSeed: AppointmentSeed
  let superTypeSeed: SuperTypeSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    appointmentSeed = new AppointmentSeed(dataSource)
    patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)

    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.createArray([patientData, patientToNotSendTentativePushData])
    await patientPushNotificationSeed.createArray([
      patientPushNotificationData,
      patientToNotSendTentativeNotificationData,
    ])

    await superTypeSeed.create(superTypeFixture)
    await serviceCategorySeed.create(serviceCategoryData)
    await serviceTypeSeed.createArray([serviceTypeData, serviceTypeTentativeData])
    await appointmentSeed.createArray([appointmentData, appointmentInFutureCanceledData])
  })

  test(`1. Should send push notifications to request patient feedback
        2. Should send push even if there is future canceled app `, async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    await handlerRequestPatientFeedback()

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.PatientFeedback),
      body: pushNotificationBody.get(PushNotificationInternalType.PatientFeedback),
      registrationToken: patientPushNotificationData.registrationToken,
      type: PushNotificationType.SubmitPatientFeedback,
      id: appointmentData.uuid,
    }
    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()

    const patient = await patientSeed.findOneById(patientData.id)
    expect(dateTimeUtil.isToday(patient.latestSentFeedbackPushDate)).toBeTruthy()
  })

  test('Should Not send  push notifications  - there is booked future app', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    await appointmentSeed.create(appointmentInFutureWIthBOokedStatusData) //added future app - should not send push now

    await handlerRequestPatientFeedback()

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()

    await appointmentSeed.removeById(appointmentInFutureWIthBOokedStatusData.id)
  })

  test('Should Not send  push notifications to request patient feedback - already send today before', async () => {
    // Ran with test above
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    await handlerRequestPatientFeedback()

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('Should NOT send push notifications to request patient feedback - app not last in a day', async () => {
    // Ran with test above

    //updating prev fixture - to match the case
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const patient = await patientSeed.findOneById(patientData.id)
    patient.latestSentFeedbackPushDate = null
    await patientSeed.saveFixture(patient)

    await appointmentSeed.create(appointmentInFutureTodayData) //added future app - should not send push now

    await handlerRequestPatientFeedback()

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('Should NOT send push notifications to request patient feedback - app is tentative', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    await appointmentSeed.create(appointmentTentativeData)

    await handlerRequestPatientFeedback()

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()

    await serviceTypeSeed.updateIsTentative(serviceTypeTentativeData.id, false)

    await handlerRequestPatientFeedback()

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  afterAll(async () => {
    await appointmentSeed.removeByIds([
      appointmentData.id,
      appointmentInFutureTodayData.id,
      appointmentTentativeData.id,
    ])
    await serviceTypeSeed.removeByIds([serviceTypeData.id, serviceTypeTentativeData.id])
    await serviceCategorySeed.removeByIds([serviceCategoryData.id])
    await superTypeSeed.removeByIds([superTypeFixture.id])
    await patientPushNotificationSeed.removeByIds([
      patientPushNotificationData.id,
      patientToNotSendTentativeNotificationData.id,
    ])
    await patientSeed.removeByIds([patientData.id, patientToNotSendTentativePushData.id])
    await serviceProviderSeed.removeByIds([serviceProviderData.id])

    await dataSource.destroy()

    jest.clearAllMocks()
  })
})
