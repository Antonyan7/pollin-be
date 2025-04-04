import {handlerCreatePatientAndAppointment} from '@firebase-platform/functions/email-notification/src/create-patient-and-appointment/handler'
import {PatientSeed, ServiceProviderSeed, SuperTypeSeed} from '@seeds/typeorm'
import {testPubSubEvent} from '@functions-types'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {CreatePatientAndAppointmentSchema} from '@libs/common/model/proto-schemas/create-patient-and-appointment.schema'
import {DateTimeUtil, EmailProvider} from '@libs/common'
import {Config} from '@config'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {createPatientFromPortalTemplateFixture} from './fixtures/email-template.fixture'
import {AppointmentStatus} from '@libs/common/enums'
import {Appointment, ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentSeed, ServiceTypeSeed} from '@seeds/typeorm'
import {AppointmentHistorySeed} from '@seeds/firestore/appointment-history.seed'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {AppointmentEmailService} from '@firebase-platform/functions/email-notification/src/common/appointment-email.service'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

jest.setTimeout(10000)

jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
const userEmail = 'fhealthdev+Nestproject+TEST@gmail.com'
const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const serviceProviderFixture = {
  id: 6363,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110003',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  description: 'Provider Description Fixture',
  designation: 'MD',
}

const patientFixture = {
  id: 9876,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110009',
  authUserId: 'authUserId',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
}

export const serviceTypeFixture: Partial<ServiceType> = {
  id: 9876,
}
export const appointmentFixture: Partial<Appointment> = {
  id: 9876,
  status: AppointmentStatus.Done,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
}

jest.mock('@google-cloud/logging-bunyan')

const successData = {
  patientUUID: patientFixture.uuid,
  serviceProviderUUID: serviceProviderFixture.uuid,
  date: dateTimeUtil.formatUTCDateInRFC3339Tz(
    dateTimeUtil.addDays(dateTimeUtil.setDate(dateTimeUtil.todayWithZeroTimeTZ(), 17), 4),
  ),
}

const failedData = {
  patientUUID: 'INVALID_UUID',
}

const failedDataServiceProvider = {
  serviceProviderUUID: 'INVALID_UUID',
  patientUUID: patientFixture.uuid,
}

const auditable = {
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: 'TEST',
}

let patientSeed: PatientSeed
let serviceProviderSeed: ServiceProviderSeed

jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')

describe('Firebase Function: send email create Appointment And Patient', () => {
  let dataSource: DataSource
  let spyGetUserById: jest.SpyInstance
  let spyOnEmailSending: jest.SpyInstance
  let spyOnsendEmailCreatePatientAndAppointment: jest.SpyInstance
  let emailTemplateSeed: EmailTemplateSeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let appointmentHistorySeed: AppointmentHistorySeed

  let spyEmailAdapterProvider: jest.SpyInstance<Promise<EmailProvider[]>, []>

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    appointmentHistorySeed = new AppointmentHistorySeed()

    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeFixture)
    await patientSeed.create(patientFixture)
    await serviceProviderSeed.create(serviceProviderFixture)
    await appointmentSeed.create(appointmentFixture)
    emailTemplateSeed.createArray([createPatientFromPortalTemplateFixture])
    spyGetUserById = jest.spyOn(FirebaseAuthAdapter.prototype, 'getAuthUserById')
    spyEmailAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyEmailAdapterProvider.mockResolvedValue([
      {id: 'sendinblue', name: 'sendinblue', active: true, disabled: false, ...auditable},
    ])
  })
  test('send email Create Appointment And Patient (Success)', async () => {
    spyGetUserById.mockResolvedValue({
      email: userEmail,
    })
    spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    spyOnsendEmailCreatePatientAndAppointment = jest.spyOn(
      AppointmentEmailService.prototype,
      'sendPatientEmail',
    )

    const message = testPubSubEvent(
      encodePubSubMessage(successData, CreatePatientAndAppointmentSchema),
    )

    await handlerCreatePatientAndAppointment(message)
    expect(spyOnEmailSending).toHaveBeenCalledTimes(1)
    expect(spyOnsendEmailCreatePatientAndAppointment).toHaveBeenCalledTimes(1)
    spyOnEmailSending.mockRestore()
    spyOnsendEmailCreatePatientAndAppointment.mockRestore()
  })

  test('send email Create Appointment And Patient patient not found(Failed)', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(failedData, CreatePatientAndAppointmentSchema),
    )

    await handlerCreatePatientAndAppointment(message)
    expect(spyOnEmailSending).toHaveBeenCalledTimes(0)
    expect(spyOnsendEmailCreatePatientAndAppointment).toHaveBeenCalledTimes(0)
  })

  test('send email Create Appointment And Patient serviceProvider  not found(Failed)', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(failedDataServiceProvider, CreatePatientAndAppointmentSchema),
    )

    await handlerCreatePatientAndAppointment(message)

    expect(spyOnEmailSending).toHaveBeenCalledTimes(0)
    expect(spyOnsendEmailCreatePatientAndAppointment).toHaveBeenCalledTimes(0)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await appointmentSeed.removeById(appointmentFixture.id)
    await patientSeed.removePatientByAuthUserId(patientFixture.authUserId)
    await serviceProviderSeed.removeById(serviceProviderFixture.id)
    await emailTemplateSeed.deleteByIds([createPatientFromPortalTemplateFixture.id])
    await serviceTypeSeed.removeById(serviceTypeFixture.id)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await appointmentHistorySeed.deleteByAuthUserId(patientFixture.authUserId)
  })
})
