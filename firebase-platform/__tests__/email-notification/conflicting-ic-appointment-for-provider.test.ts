import {NestprojectConfigService} from '@libs/common'
import {handlerConflictingICAppointmentCreatedEmail} from '@firebase-platform/functions/email-notification/src/created-conflicting-ic-appointment-for-provider/handler'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {DateTimeUtil} from '@libs/common'
import {
  PatientSeed,
  AppointmentSeed,
  ServiceCategoryInputSeed,
  ServiceCategorySeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {conflictingAppointmentCreatedTemplateFixture} from '../fixtures/email-template.fixture'
import {testPubSubEvent} from '@functions-types'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {MilestoneStep} from '@libs/services-common/enums'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {HistoryUserType} from '@libs/common/enums'
import {AcuityAdapter} from '@libs/common/adapters'
import {AppointmentAcuityResponse} from '@libs/common/model/acuity.model'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

jest.setTimeout(20000)
jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../../libs/common/src/adapters/sendinblue.adapter.ts')
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

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

let dataSource: DataSource

const patientId = 235235
const appointmentId = 2352523
const serviceTypeId = 13425
const serviceCategoryId = 15346
const serviceProviderId = 14356

const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  externalProviderIDForAcuity: 9195096,
}

const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
  milestoneStep: MilestoneStep.InitialConsultation,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  name: 'Initial Consultation Z',
  serviceCategoryId,
  externalServiceTypeIDForAcuity: 64098178,
  durationInMinutes: 30,
}

const patientData = {
  id: patientId,
  authUserId: AuthUserFixture.contactInformationAuthUserId.uid,
  firstName: 'CF_TEST_FIRST_NAME',
  lastName: 'CF_TEST_FIRST_NAME',
}

const appointmentData = {
  id: appointmentId,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.toDate(`2024-09-02T17:00:00Z`),
}

const mockedAcuityAppointments = [
  {
    id: 111122223333,
    firstName: 'Tsovak100',
    lastName: 'Harutyunyan100',
    date: 'September 2, 2024',
    time: '1:00pm',
    datetime: '2024-09-02T13:00:00-0400',
    duration: '30',
    appointmentTypeID: 64098041,
    calendar: 'Dev: Dr. Kim Garbedian',
    calendarID: 9195096,
  },
]

describe('Firebase Function: conflicting-ic-appointment', () => {
  let patientSeed: PatientSeed
  let appointmentSeed: AppointmentSeed
  let emailTemplateSeed: EmailTemplateSeed
  let serviceProviderSeed: ServiceProviderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let spyOnGetAcuityAppointments: jest.SpyInstance<Promise<AppointmentAcuityResponse[]>>

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)

    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    await patientSeed.create(patientData)
    await emailTemplateSeed.create(conflictingAppointmentCreatedTemplateFixture)
    await serviceCategorySeed.create(serviceCategoryData)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeData)
    await serviceProviderSeed.create(serviceProviderData)
    await appointmentSeed.createArray([appointmentData])

    spyOnGetAcuityAppointments = jest
      .spyOn(AcuityAdapter.prototype, 'getAppointmentsFromAcuityService')
      .mockImplementation((queryParams) => {
        if (queryParams.calendarID === serviceProviderData.externalProviderIDForAcuity) {
          return Promise.resolve(mockedAcuityAppointments as AppointmentAcuityResponse[])
        }
      })
  })

  it('should send email for creating conflicting appointment', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const result = handlerConflictingICAppointmentCreatedEmail(
      testPubSubEvent(
        encodePubSubMessage(
          {
            appointmentIds: [appointmentData.id],
            authUserId: patientData.authUserId,
            authUserFullName: getFullName(patientData.firstName, patientData.lastName),
            authUserType: HistoryUserType.Patient,
          },
          AppointmentsCreatedSchema,
        ),
      ),
    )
    await expect(result).resolves.not.toThrow()
    const date = dateTimeUtil.extractDateTz(appointmentData.start)
    const startTime = dateTimeUtil.formatTimePMWithSpace(appointmentData.start)
    const endTime = dateTimeUtil.formatTimePMWithSpace(
      dateTimeUtil.addMinutes(appointmentData.start, serviceTypeData.durationInMinutes),
    )
    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        subject: `Multiple Bookings for Acuity Slot - ${date}, ${startTime}-${endTime}`,
      }),
    )
    spyOnEmailSending.mockRestore()
  })

  afterAll(async () => {
    spyOnGetAcuityAppointments.mockRestore()
    jest.clearAllMocks()
    await Promise.all([
      patientSeed.removeByIds([patientId]),
      emailTemplateSeed.removeById(conflictingAppointmentCreatedTemplateFixture.id),
      appointmentSeed.removeByIds([appointmentId]),
    ])
    await Promise.all([
      serviceTypeSeed.removeById(serviceTypeId),
      serviceProviderSeed.removeById(serviceProviderId),
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await Promise.all([serviceCategorySeed.removeById(serviceCategoryId)])
  })
})
