import {
  PatientSeed,
  ServiceProviderSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  QuestionnaireSeed,
  GoogleAdConversionSeed,
  AppointmentMetadataSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {DateTimeUtil, NestprojectConfigService, EmailProvider} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Appointment, AppointmentMetadata} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AcuityAction, AcuityWebhookData} from '@libs/common/model/acuity.model'
import * as functions from 'firebase-functions/v2'
import {acuityToClinicPortalSyncHandler} from '@firebase-platform/functions/webhooks/src/handlers/acuity-to-clinic-portal-sync.handler'
import {
  MockAcuityAdapterValidSignature,
  MockPatAndAcuityAppointmentAlreadyExist,
  MockAcuityAppointmentAppTypeIdNotExistInOurDb,
  MockAcuityAppointmentCalendarIdNotExistInOurDb,
  MockAcuityAppointmentIdToReturnBadDate,
  MockAcuityAppointmentSexAtBirthIsEmpty,
  MockAcuityAppointmentSexAtBirthIsWrongValue,
  MockAcuityAppointmentSexAtBirthMaleAndStartTimeInPast,
  MockAcuityPatientAlreadyExistButWithDiffPatientData,
  MockAppointmentAcuityResponse,
} from '@libs/common/adapters/__mocks__/acuity.adapter'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {JourneyType, MilestoneStep, UserType} from '@libs/services-common/enums'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientCreatedFrom} from '@libs/data-layer/apps/users/enum/user'
import {
  AppointmentCreatedFrom,
  AppointmentPaymentStatus,
  SystemAuthUserId,
} from '@libs/common/enums'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {
  timeOverlapsForSyncByAcuityTemplateFixture,
  acuitySyncRandomFailTemplateFixture,
  sendEmailDoesNotHaveScheduleForSlotFixture,
  emailTimeOverlapsBlockForSyncByAcuityFixture,
} from '../fixtures/email-template.fixture'
import {IdentifierGenerator} from '@libs/common'
import {getAcuityAppointmentDateOfBirth} from '@libs/common/helpers/date.helper'
import {PriorityStatusSeed, SchedulingSlotSeed} from '@seeds/typeorm'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {HistoryUserType} from '@libs/common/enums'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {SchedulingTimeOffBlockSeed} from '@seeds/typeorm'
import {SchedulingTimeOffBlockPeriodSeed} from '@seeds/typeorm'
import {
  acuityId,
  appEnd,
  appointmentDataForAlreadyExistAcuityApp,
  appointmentIdForAlreadyExistAcuityApp,
  appStart,
  googleAdConversionData,
  patientDataForAlreadyExistApp,
  patientDataNotMatchName,
  patientIdForAlreadyExistApp,
  patientIdNotMatchName,
  priorityStatusData,
  priorityStatusId,
  questionnaireWithPatientIntakeFemaleCompletedData,
  schedulingSlotData,
  schedulingTimeOffBlockData,
  schedulingTimeOffBlockId,
  schedulingTimeOffBlockPeriodData,
  schedulingTimeOffBlockPeriodId,
  serviceCategoryData,
  serviceCategoryId,
  serviceProviderData,
  serviceProviderId,
  serviceTypeData,
  serviceTypeId,
} from '../fixtures/acuity-appointment-created.fixture'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

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

let createdPatientId: number
let createdAppointmentId: number
const reqPayload: Partial<functions.https.Request> = {
  body: {
    action: AcuityAction.Changed,
    id: acuityId,
    appointmentTypeID: 438800223,
    calendarID: 438800224,
  } as AcuityWebhookData,
  headers: {'x-acuity-signature': MockAcuityAdapterValidSignature},
}

const reqPayloadExistSlot: Partial<functions.https.Request> = {
  body: {
    action: AcuityAction.Changed,
    id: acuityId,
    appointmentTypeID: 438800224,
    calendarID: 438800225,
  } as AcuityWebhookData,
  headers: {'x-acuity-signature': MockAcuityAdapterValidSignature},
}

const auditable = {
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: 'TEST',
}

describe('Firebase Function: create-results-for-specimen', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let serviceProviderSeed: ServiceProviderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let questionnaireSeed: QuestionnaireSeed
  let emailTemplateSeed: EmailTemplateSeed
  let identifierGenerator: IdentifierGenerator
  let googleAdConversionSeed: GoogleAdConversionSeed
  let appointmentMetadataSeed: AppointmentMetadataSeed
  let priorityStatusSeed: PriorityStatusSeed
  let schedulingTimeOffBlockSeed: SchedulingTimeOffBlockSeed
  let schedulingTimeOffBlockPeriodSeed: SchedulingTimeOffBlockPeriodSeed
  let schedulingSlotSeed: SchedulingSlotSeed

  let spyEmailAdapterProvider: jest.SpyInstance<Promise<EmailProvider[]>, []>

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    questionnaireSeed = new QuestionnaireSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)
    identifierGenerator = new IdentifierGenerator()
    googleAdConversionSeed = new GoogleAdConversionSeed(dataSource)
    appointmentMetadataSeed = new AppointmentMetadataSeed(dataSource)
    priorityStatusSeed = new PriorityStatusSeed(dataSource)
    schedulingTimeOffBlockSeed = new SchedulingTimeOffBlockSeed(dataSource)
    schedulingTimeOffBlockPeriodSeed = new SchedulingTimeOffBlockPeriodSeed(dataSource)
    schedulingSlotSeed = new SchedulingSlotSeed(dataSource)

    await Promise.all([serviceCategorySeed.create(serviceCategoryData)])

    await superTypeSeed.create(superTypeOtherFixture)

    await Promise.all([
      serviceTypeSeed.create(serviceTypeData),
      serviceProviderSeed.create(serviceProviderData),
      patientSeed.createArray([patientDataForAlreadyExistApp, patientDataNotMatchName]),
      questionnaireSeed.create(questionnaireWithPatientIntakeFemaleCompletedData),
      emailTemplateSeed.createArray([
        timeOverlapsForSyncByAcuityTemplateFixture,
        acuitySyncRandomFailTemplateFixture,
        sendEmailDoesNotHaveScheduleForSlotFixture,
        emailTimeOverlapsBlockForSyncByAcuityFixture,
      ]),
    ])
    await googleAdConversionSeed.create(googleAdConversionData)

    await appointmentSeed.create(appointmentDataForAlreadyExistAcuityApp)
    await priorityStatusSeed.create(priorityStatusData)
    await schedulingTimeOffBlockPeriodSeed.create(schedulingTimeOffBlockPeriodData)
    await schedulingTimeOffBlockSeed.create(schedulingTimeOffBlockData)

    spyEmailAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyEmailAdapterProvider.mockResolvedValue([
      {id: 'sendinblue', name: 'sendinblue', active: true, disabled: false, ...auditable},
    ])
  })

  it(`CF should fail - payload doesn't have id`, async () => {
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {...reqPayload.body, id: null} as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
  })

  it(`CF should fail - payload doesn't have signature in header`, async () => {
    const reqPayloadWihthoutSignatureHeader: Partial<functions.https.Request> = {
      ...reqPayload,
      headers: {'x-acuity-signature': 'notValid'},
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWihthoutSignatureHeader, patientSeed)
  })

  it(`CF should fail - AcuityAppointmentDetail has empty sexAtBirth`, async () => {
    const spyOnEmailSendingRandomSyncFail = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {...reqPayload.body, id: MockAcuityAppointmentSexAtBirthIsEmpty} as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
    expect(spyOnEmailSendingRandomSyncFail).toBeCalledTimes(1)
    spyOnEmailSendingRandomSyncFail.mockRestore()
  })

  it(`CF should fail - AcuityAppointmentDetail has wrong sexAtBirth`, async () => {
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityAppointmentSexAtBirthIsWrongValue,
      } as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
  })

  it(`CF should fail - Male and startTime in past`, async () => {
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityAppointmentSexAtBirthMaleAndStartTimeInPast,
      } as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
  })

  it(`CF should fail - acuity app detail - has invalid datetime`, async () => {
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {...reqPayload.body, id: MockAcuityAppointmentIdToReturnBadDate} as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
  })

  it(`CF should fail - acuity app detail - calendar id not exist in our db`, async () => {
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityAppointmentCalendarIdNotExistInOurDb,
      } as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
  })

  it(`CF should fail - acuity app detail - appointmentTypeId no exist on our end`, async () => {
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityAppointmentAppTypeIdNotExistInOurDb,
      } as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
  })

  it(`CF should fail - patient and appointment with acuityId already exist on our end`, async () => {
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockPatAndAcuityAppointmentAlreadyExist,
      } as AcuityWebhookData,
    }
    await callHandlerAndCreatedPatientShouldBeNull(reqPayloadWithoutId, patientSeed)
  })

  it(`CF should skip appointment - patient with the same email exist - but diff last Name`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityPatientAlreadyExistButWithDiffPatientData,
      } as AcuityWebhookData,
    }
    await acuityToClinicPortalSyncHandler(reqPayloadWithoutId as functions.https.Request)

    const createdAppointments = await appointmentSeed.findByPatientId(
      patientDataForAlreadyExistApp.id,
    )
    expect(createdAppointments.length).toBe(1) //it was created by seed
    expect(spyOnEmailSending).toBeCalledTimes(1)
    spyOnEmailSending.mockRestore()
  })

  it(`1. Should emulate webhook from acuity
      2. Should create patient and appointment on our side 
      3. Should Send Email
      4. Should Update Google Ad Conversions
      5. Should save extra question answers into AppointmentAcuity
      6. Should Send Email TimeOffBlock Overlap`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyAppointmentCreated = jest.spyOn(PubSubHelpers, 'publishAppointmentsCreated')

    await acuityToClinicPortalSyncHandler(reqPayload as functions.https.Request)

    const createdPatient = await patientSeed.findOneByName(
      MockAppointmentAcuityResponse.firstName,
      MockAppointmentAcuityResponse.lastName,
    )
    const createdAppointments = await appointmentSeed.findByPatientId(createdPatient.id)
    const createdApp = createdAppointments[0]

    createdPatientId = createdPatient.id
    createdAppointmentId = createdApp.id
    expect(createdPatient).toMatchObject({
      patientIdentifier: expect.any(String),
      authUserId: expect.any(String),
      firstName: MockAppointmentAcuityResponse.firstName,
      lastName: MockAppointmentAcuityResponse.lastName,
      currentJourneyType: JourneyType.PatientIntakeFemale,
      userType: UserType.Patient,
      sexAtBirth: SexAtBirth.Female,
      createdFrom: PatientCreatedFrom.AcuitySync,
      revisionId: expect.any(String),
      priorityStatusId,
    } as Patient)

    expect(createdPatient.dateOfBirth).toStrictEqual(
      dateTimeUtil.formatDateYMD(getAcuityAppointmentDateOfBirth(MockAppointmentAcuityResponse)),
    )

    expect(createdApp).toMatchObject({
      patientId: createdPatient.id,
      lockedPrice: '33.00',
      paymentStatus: AppointmentPaymentStatus.PendingPayment,
      serviceProviderId: serviceProviderId,
      serviceTypeId: serviceTypeId,
      start: appStart,
      end: appEnd,
      milestoneStep: MilestoneStep.InitialConsultation,
      revisionId: expect.any(String),
      externalAppointmentIDForAcuity: MockAppointmentAcuityResponse.id,
      identifier: identifierGenerator.generateAppointmentIdentifier(createdApp.id),
      createdFrom: AppointmentCreatedFrom.Acuity,
    } as Appointment)
    expect(spyOnEmailSending).toBeCalledTimes(2)
    expect(spyOnEmailSending).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: expect.any(String)}],
        subject: sendEmailDoesNotHaveScheduleForSlotFixture.subject,
        html: sendEmailDoesNotHaveScheduleForSlotFixture.body,
      }),
    )
    expect(spyOnEmailSending).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: expect.any(String)}],
        subject: emailTimeOverlapsBlockForSyncByAcuityFixture.subject,
        html: emailTimeOverlapsBlockForSyncByAcuityFixture.body,
      }),
    )

    // Checking AppointmentAcuity
    const appointmentMetadata =
      await appointmentMetadataSeed.findOneByAppointmentId(createdAppointmentId)
    expect(appointmentMetadata).toMatchObject({
      primaryReason: MockAppointmentAcuityResponse.primaryReason,
      addedToReadyWaitList: MockAppointmentAcuityResponse.addedToReadyWaitList,
      patientAgeGroup: MockAppointmentAcuityResponse.ageGroup,
      haveReferral: MockAppointmentAcuityResponse.haveReferral,
      interestedService: MockAppointmentAcuityResponse.interestedService,
      interestedServiceOther: MockAppointmentAcuityResponse.interestedServiceOther,
      agreeTermsAndConditions: MockAppointmentAcuityResponse.agreeTermsAndConditions,
      agreeReceivingCommunications: MockAppointmentAcuityResponse.agreeReceivingCommunications,
    } as AppointmentMetadata)

    expect(spyAppointmentCreated).toBeCalledWith({
      appointmentIds: [createdAppointmentId],
      authUserId: SystemAuthUserId.AcuitySyncAppointmentCreated,
      authUserType: HistoryUserType.Patient,
      authUserFullName: getFullName(createdPatient.firstName, createdPatient.lastName),
    })
    spyAppointmentCreated.mockRestore()
    spyOnEmailSending.mockRestore()
    await patientSeed.removeByIds([createdPatientId])
    await appointmentSeed.removeByIds([createdAppointmentId])
  })

  it(`Should Send Email with exist slot`, async () => {
    await schedulingSlotSeed.create(schedulingSlotData)

    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyAppointmentCreated = jest.spyOn(PubSubHelpers, 'publishAppointmentsCreated')

    await acuityToClinicPortalSyncHandler(reqPayloadExistSlot as functions.https.Request)

    const createdPatient = await patientSeed.findOneByName(
      MockAppointmentAcuityResponse.firstName,
      MockAppointmentAcuityResponse.lastName,
    )
    const createdAppointments = await appointmentSeed.findByPatientId(createdPatient.id)
    const createdApp = createdAppointments[0]

    createdPatientId = createdPatient.id
    createdAppointmentId = createdApp.id
    expect(spyOnEmailSending).toBeCalledTimes(2)
    expect(spyOnEmailSending).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: expect.any(String)}],
        subject: timeOverlapsForSyncByAcuityTemplateFixture.subject,
        html: timeOverlapsForSyncByAcuityTemplateFixture.body,
      }),
    )
    expect(spyOnEmailSending).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: expect.any(String)}],
        subject: emailTimeOverlapsBlockForSyncByAcuityFixture.subject,
        html: emailTimeOverlapsBlockForSyncByAcuityFixture.body,
      }),
    )

    // Checking AppointmentAcuity
    const appointmentMetadata =
      await appointmentMetadataSeed.findOneByAppointmentId(createdAppointmentId)
    expect(appointmentMetadata).toMatchObject({
      primaryReason: MockAppointmentAcuityResponse.primaryReason,
      addedToReadyWaitList: MockAppointmentAcuityResponse.addedToReadyWaitList,
      patientAgeGroup: MockAppointmentAcuityResponse.ageGroup,
      haveReferral: MockAppointmentAcuityResponse.haveReferral,
      interestedService: MockAppointmentAcuityResponse.interestedService,
      interestedServiceOther: MockAppointmentAcuityResponse.interestedServiceOther,
      agreeTermsAndConditions: MockAppointmentAcuityResponse.agreeTermsAndConditions,
      agreeReceivingCommunications: MockAppointmentAcuityResponse.agreeReceivingCommunications,
    } as AppointmentMetadata)

    expect(spyAppointmentCreated).toBeCalledWith({
      appointmentIds: [createdAppointmentId],
      authUserId: SystemAuthUserId.AcuitySyncAppointmentCreated,
      authUserType: HistoryUserType.Patient,
      authUserFullName: getFullName(createdPatient.firstName, createdPatient.lastName),
    })
    spyAppointmentCreated.mockRestore()
  })
  afterAll(async () => {
    jest.clearAllMocks()
    await googleAdConversionSeed.deleteByIds([googleAdConversionData.id])

    await schedulingSlotSeed.removeByServiceProviderId(serviceProviderId)

    // time to time there is issue with deadlock  -so deleting 1 by 1 to avoid deadlock
    await schedulingTimeOffBlockSeed.removeById(schedulingTimeOffBlockId)
    await schedulingTimeOffBlockPeriodSeed.removeById(schedulingTimeOffBlockPeriodId)

    await appointmentSeed.removeByIds([createdAppointmentId, appointmentIdForAlreadyExistAcuityApp])

    await serviceTypeSeed.removeById(serviceTypeId)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceProviderSeed.removeById(serviceProviderId)
    await questionnaireSeed.removeQuestionnaireById(
      questionnaireWithPatientIntakeFemaleCompletedData.id,
    )

    await serviceCategorySeed.removeById(serviceCategoryId)
    await patientSeed.removeByIds([
      createdPatientId,
      patientIdForAlreadyExistApp,
      patientIdNotMatchName,
    ])
    await emailTemplateSeed.deleteByIds([
      timeOverlapsForSyncByAcuityTemplateFixture.id,
      acuitySyncRandomFailTemplateFixture.id,
      sendEmailDoesNotHaveScheduleForSlotFixture.id,
      emailTimeOverlapsBlockForSyncByAcuityFixture.id,
    ])

    await priorityStatusSeed.removeByIds([priorityStatusId])
    await dataSource.destroy()
  })
})

async function callHandlerAndCreatedPatientShouldBeNull(
  req: Partial<functions.https.Request>,
  patientSeed: PatientSeed,
): Promise<void> {
  await acuityToClinicPortalSyncHandler(req as functions.https.Request)
  const createdPatient = await patientSeed.findOneByName(
    MockAppointmentAcuityResponse.firstName,
    MockAppointmentAcuityResponse.lastName,
  )
  expect(createdPatient).toBeFalsy()
}
