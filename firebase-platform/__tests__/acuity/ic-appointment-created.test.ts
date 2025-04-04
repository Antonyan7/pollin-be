import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {iCAppointmentCreatedHandler} from '@firebase-platform/functions/appointments/src/handlers/ic-appointment-created/ic-appointment-created'
import {AcuityAdapter} from '@libs/common/adapters'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {
  AcuityAdapter as MockedAcuityAdapter,
  MockAppointmentUUIDForCreateAcuityAppointmentRetry,
} from '@libs/common/adapters/__mocks__/acuity.adapter'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientAgeGroup, PatientAgeGroupLabel} from '@libs/common/enums'
import {testPubSubEvent} from '@functions-types'
import {
  PatientSeed,
  ServiceProviderSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  ServiceCategoryInputSeed,
  AppointmentMetadataSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {handlerCreateAppointmentServiceTypeNotFoundInAcuity} from '@firebase-platform/functions/email-notification/src/appointment-created-service-type-not-found-in-acuity/handler'
import {sendEmailWhenServiceTypeNotFoundInAcuityFixture} from '../fixtures/email-template.fixture'
import {Appointment, ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AppointmentStatus} from '@libs/common/enums'
import {MilestoneStep} from '@libs/services-common/enums'
import {AuthUserFixture, userEmailVerifiedRecordFixture} from '@libs/common/test/fixtures'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {UserRecord} from 'firebase-admin/lib/auth'
import {AppointmentMetadata} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {HistoryUserType} from '@libs/common/enums'
import axios, {AxiosError} from 'axios'
import {StructuredLogger, LogType} from '@libs/common'
import {handlerCreateAppointmentServiceProviderNotFoundInAcuity} from '@firebase-platform/functions/email-notification/src/appointment-created-service-provider-not-found-in-acuity/handler'
import {sendEmailWhenExternalIdNotFoundInAcuityOnCreatingFixture} from '../fixtures/email-template.fixture'
const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
import * as activityLogs from '@libs/common/enums/activity-logs'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

jest.setTimeout(15000)
jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.mock('../../../libs/common/src/adapters/acuity.adapter')
jest.mock('../../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const serviceTypeId = 13425
const newServiceTypeId = 19867
const serviceCategoryId = 15346
const serviceProviderId = 14356
const additionalServiceProviderId = 12643
const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  externalProviderIDForAcuity: 10270338,
  title: 'ServiceProviderTestTitle',
}

const serviceProviderDataWithoutExternalId: Partial<ServiceProvider> = {
  id: additionalServiceProviderId,
  externalProviderIDForAcuity: null,
}

const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
  milestoneStep: MilestoneStep.InitialConsultation,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId,
  externalServiceTypeIDForAcuity: 64098178,
  durationInMinutes: 30,
  abbreviation: 'abb',
}
const serviceTypeDataWithoutExternalId: Partial<ServiceType> = {
  id: newServiceTypeId,
  serviceCategoryId,
  externalServiceTypeIDForAcuity: null,
  durationInMinutes: 30,
  abbreviation: 'abbreviation',
}

const patientId = 12345
const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: AuthUserFixture.contactInformationAuthUserId.uid,
  patientIdentifier: 'PID127748',
  firstName: 'Hunn',
  lastName: 'Dunn',
  dateOfBirth: dateTimeUtil.toDate('2001-10-11'),
  sexAtBirth: SexAtBirth.Male,
}

const appointmentId = 123455
const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565695',
  revisionId: '371f9b18-23d1-44b2-b5e6-42dd29565696',
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.toDate(`2024-09-01T13:00:00Z`),
  end: dateTimeUtil.toDate(`2024-09-01T14:00:00Z`),
  identifier: 'A176653161',
}
const appointmentForServiceTypeId = 178453
const appointmentDataForServiceType: Partial<Appointment> = {
  id: appointmentForServiceTypeId,
  uuid: 'af50014d-8441-4969-be88-52bf50fbb860',
  revisionId: 'bc4b3733-a12b-4921-8f2e-9c7e7276148d',
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: newServiceTypeId,
  start: dateTimeUtil.toDate(`2024-09-01T13:00:00Z`),
  end: dateTimeUtil.toDate(`2024-09-01T14:00:00Z`),
  identifier: 'A136603162',
}

const additionalAppointmentId = 123457
const additionalAppointmentData: Partial<Appointment> = {
  id: additionalAppointmentId,
  uuid: '92b8f7b9-7326-4b6d-aef2-c13b0becd82e',
  revisionId: 'dc44b91b-6028-431d-84ff-e0f6952a5500',
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: additionalServiceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.toDate('2024-09-02T16:00:00Z'),
  end: dateTimeUtil.toDate('2024-09-02T17:00:00Z'),
  identifier: 'A176653159',
}

const appointmentMetadata: Partial<AppointmentMetadata> = {
  id: 1234123,
  appointmentId: appointmentId,
  primaryReason: 'reason1',
  addedToReadyWaitList: true,
  patientAgeGroup: PatientAgeGroupLabel.get(PatientAgeGroup.FortyThreePlus),
  haveReferral: false,
  interestedService: 'no',
  agreeTermsAndConditions: true,
  interestedServiceOther: 'GT',
}
const appointmentMetadataForServiceType: Partial<AppointmentMetadata> = {
  id: 5673452,
  appointmentId: appointmentForServiceTypeId,
  primaryReason: 'reason1',
  addedToReadyWaitList: true,
  patientAgeGroup: PatientAgeGroupLabel.get(PatientAgeGroup.FortyThreePlus),
  haveReferral: false,
  interestedService: 'no',
  agreeTermsAndConditions: true,
}

const additionalAppointmentMetadata: Partial<AppointmentMetadata> = {
  id: 4234829,
  appointmentId: additionalAppointmentId,
  primaryReason: 'reason2',
  addedToReadyWaitList: true,
  patientAgeGroup: PatientAgeGroupLabel.get(PatientAgeGroup.FortyThreePlus),
  haveReferral: false,
  interestedService: 'no',
  agreeTermsAndConditions: true,
}

const retryAppointmentId = 123456
const retryAppointmentData: Partial<Appointment> = {
  id: retryAppointmentId,
  uuid: MockAppointmentUUIDForCreateAcuityAppointmentRetry,
  revisionId: '371f9b18-23d1-44b2-b5e6-42dd77777778',
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.toDate(`2024-09-01T13:00:00Z`),
  end: dateTimeUtil.toDate(`2024-09-01T14:00:00Z`),
  identifier: 'A176653164',
}

const retryAppointmentMetadata: Partial<AppointmentMetadata> = {
  id: 1234124,
  appointmentId: retryAppointmentId,
  primaryReason: 'reason1',
  addedToReadyWaitList: true,
  patientAgeGroup: PatientAgeGroupLabel.get(PatientAgeGroup.FortyThreePlus),
  haveReferral: false,
  interestedService: 'no',
  agreeTermsAndConditions: true,
}

const mainData = {
  externalProviderIDForAcuity: serviceProviderData.externalProviderIDForAcuity,
  externalServiceTypeIDForAcuity: serviceTypeData.externalServiceTypeIDForAcuity,
  datetime: appointmentData.start,
  email: userEmailVerifiedRecordFixture.email,
  firstName: patientData.firstName,
  lastName: patientData.lastName,
  phone: userEmailVerifiedRecordFixture?.multiFactor?.enrolledFactors.find(
    (factor) => factor.factorId === 'phone',
  )?.['phoneNumber'],
}

const fields = {
  appointmentUUID: appointmentData.uuid,
  appointmentRevisionId: appointmentData.revisionId,
  dateOfBirthYear: dateTimeUtil.getYear(dateTimeUtil.toDate(patientData.dateOfBirth)).toString(),
  dateOfBirthMonth: dateTimeUtil.formatFullMonth(dateTimeUtil.toDate(patientData.dateOfBirth)),
  dateOfBirthDay: dateTimeUtil.formatDayNumberWithZero(
    dateTimeUtil.toDate(patientData.dateOfBirth),
  ),
  sexAtBirth: patientData.sexAtBirth,
  primaryReason: appointmentMetadata.primaryReason,
  ageGroup: appointmentMetadata.patientAgeGroup,
  haveReferral: appointmentMetadata.haveReferral,
  addedToReadyWaitList: appointmentMetadata.addedToReadyWaitList,
  interestedService: appointmentMetadata.interestedService,
  interestedServiceOther: appointmentMetadata.interestedServiceOther,
  agreeTermsAndConditions: appointmentMetadata.agreeTermsAndConditions,
}

describe('Firebase Function: create-results-for-specimen', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let serviceProviderSeed: ServiceProviderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let appointmentMetadataSeed: AppointmentMetadataSeed
  let emailTemplateSeed: EmailTemplateSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentMetadataSeed = new AppointmentMetadataSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    await Promise.all([serviceCategorySeed.create(serviceCategoryData)])
    await emailTemplateSeed.createArray([sendEmailWhenExternalIdNotFoundInAcuityOnCreatingFixture])

    await superTypeSeed.create(superTypeOtherFixture)
    await Promise.all([
      serviceTypeSeed.createArray([serviceTypeData, serviceTypeDataWithoutExternalId]),
      serviceProviderSeed.create(serviceProviderData),
      serviceProviderSeed.create(serviceProviderDataWithoutExternalId),
      patientSeed.createArray([patientData]),
    ])
    await emailTemplateSeed.createArray([sendEmailWhenServiceTypeNotFoundInAcuityFixture])

    await appointmentSeed.createArray([
      appointmentData,
      retryAppointmentData,
      additionalAppointmentData,
      appointmentDataForServiceType,
    ])
    await appointmentMetadataSeed.createArray([
      appointmentMetadata,
      retryAppointmentMetadata,
      additionalAppointmentMetadata,
      appointmentMetadataForServiceType,
    ])
  })

  it(`CF should create IC appointment`, async () => {
    const spyGetAuthUser = jest.spyOn(FirebaseAuthAdapter.prototype, 'getAuthUserById')
    spyGetAuthUser.mockResolvedValue(userEmailVerifiedRecordFixture as unknown as UserRecord)
    const spyCreateAppointmentOnAcuityService = jest.spyOn(
      AcuityAdapter.prototype,
      'createAppointmentOnAcuityService',
    )
    await iCAppointmentCreatedHandler(
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
    expect(spyCreateAppointmentOnAcuityService).toBeCalledWith(fields, {
      datetime: dateTimeUtil.toISOString(mainData.datetime),
      email: mainData.email,
      firstName: mainData.firstName,
      lastName: mainData.lastName,
      phone: mainData.phone,
      appointmentTypeID: mainData.externalServiceTypeIDForAcuity,
      calendarID: mainData.externalProviderIDForAcuity,
    })
    expect(spyCreateAppointmentOnAcuityService).toHaveBeenCalledTimes(1)
    spyCreateAppointmentOnAcuityService.mockRestore()
    spyGetAuthUser.mockRestore()
  })

  it('should handle missing externalProviderIDForAcuity', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    await handlerCreateAppointmentServiceProviderNotFoundInAcuity(
      testPubSubEvent(
        encodePubSubMessage(
          {
            appointmentIds: [additionalAppointmentData.id],
            authUserId: patientData.authUserId,
            authUserFullName: getFullName(patientData.firstName, patientData.lastName),
            authUserType: HistoryUserType.Patient,
          },
          AppointmentsCreatedSchema,
        ),
      ),
    )
    expect(spyOnEmailSending).toHaveBeenCalled()
    expect(spyOnEmailSending).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining('Resource not found in acuity -'),
      }),
    )
    spyOnEmailSending.mockRestore()
  })

  it(`should fail sync IC appointment retry count exceeded`, async () => {
    const spyGetAuthUser = jest.spyOn(FirebaseAuthAdapter.prototype, 'getAuthUserById')
    spyGetAuthUser.mockResolvedValue(userEmailVerifiedRecordFixture as unknown as UserRecord)
    const spyAxiosPost = jest.spyOn(axios, 'post')
    spyAxiosPost.mockImplementation(() => {
      throw new AxiosError('testing retry')
    })
    const spyCreateAppointmentOnAcuityService = jest.spyOn(
      AcuityAdapter.prototype,
      'createAppointmentOnAcuityService',
    )
    const spyOnLogger = jest.spyOn(StructuredLogger, 'error')

    await iCAppointmentCreatedHandler(
      testPubSubEvent(
        encodePubSubMessage(
          {
            appointmentIds: [retryAppointmentData.id],
            authUserId: patientData.authUserId,
            authUserFullName: getFullName(patientData.firstName, patientData.lastName),
            authUserType: HistoryUserType.Patient,
          },
          AppointmentsCreatedSchema,
        ),
      ),
    )
    const mockedAcuityAdapter = new MockedAcuityAdapter()
    expect(spyCreateAppointmentOnAcuityService).toBeCalledTimes(
      mockedAcuityAdapter.retryCountToDelaysMs.size + 1,
    )
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.AcuityAdapterFunctions.CreateAppointmentOnAcuityService,
      activityLogs.AcuityAdapterActions.InternalError,
      {errorInfo: expect.anything(), message: expect.any(String)},
      LogType.AcuityAppointmentSyncFailed,
    )
    expect(spyOnLogger).toBeCalledTimes(4)
    spyOnLogger.mockRestore()
    spyAxiosPost.mockRestore()
    spyGetAuthUser.mockRestore()
    spyCreateAppointmentOnAcuityService.mockRestore()
  })
  it(`Should send email when Service Type from the new appointment doesn't have externalServiceTypeIDForAcuity`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    await handlerCreateAppointmentServiceTypeNotFoundInAcuity(
      testPubSubEvent(
        encodePubSubMessage(
          {
            appointmentIds: [appointmentDataForServiceType.id],
            authUserId: patientData.authUserId,
            authUserFullName: getFullName(patientData.firstName, patientData.lastName),
            authUserType: HistoryUserType.Patient,
          },
          AppointmentsCreatedSchema,
        ),
      ),
    )
    expect(spyOnEmailSending).toHaveBeenCalled()
    expect(spyOnEmailSending).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining(
          'Appointment Type - abbreviation not found in acuity for Sep 01, 2024 - 09:00 AM appointment with ServiceProviderTestTitle',
        ),
      }),
    )
    spyOnEmailSending.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await appointmentMetadataSeed.removeByIds([
      appointmentMetadata.id,
      retryAppointmentMetadata.id,
      additionalAppointmentMetadata.id,
    ])
    await appointmentSeed.removeByIds([
      appointmentId,
      retryAppointmentData.id,
      appointmentDataForServiceType.id,
      additionalAppointmentId,
    ])
    await Promise.all([
      serviceTypeSeed.removeByIds([serviceTypeId, newServiceTypeId]),
      serviceProviderSeed.removeByIds([serviceProviderId, additionalServiceProviderId]),
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])

    await Promise.all([
      serviceCategorySeed.removeById(serviceCategoryId),
      patientSeed.removeByIds([patientId]),
    ])
    await emailTemplateSeed.deleteByIds([
      sendEmailWhenServiceTypeNotFoundInAcuityFixture.id,
      sendEmailWhenExternalIdNotFoundInAcuityOnCreatingFixture.id,
    ])

    await dataSource.destroy()
  })
})
