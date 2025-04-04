import {PhoneNumberMFASecondForUserMock} from '@libs/common/adapters/firebase/__mocks__/firebase-auth.adapter'
import {
  PatientSeed,
  ServiceProviderSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  ServiceCategoryInputSeed,
  QuestionnaireSeed,
  PatientAlertSeed,
  PatientMilestoneSeed,
  PatientDefaultMilestoneSeed,
  PriorityStatusSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {DateTimeUtil, NestprojectConfigService, EmailProvider} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Appointment, ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {AcuityAction, AcuityWebhookData} from '@libs/common/model/acuity.model'
import * as functions from 'firebase-functions/v2'
import {acuityToClinicPortalSyncHandler} from '@firebase-platform/functions/webhooks/src/handlers/acuity-to-clinic-portal-sync.handler'
import {
  MockAcuityAdapterValidSignature,
  MockAcuityPatientAlreadyExistNoIC,
  MockAcuityPatientLastNameForAlreadyExistPatient,
  MockAppointmentAcuityResponse,
  MockAcuityPatientFirstNameForAlreadyExistPatient,
  MockAcuityPatientAlreadyExistWithIC,
  MockAcuityPatientFirstNameForAlreadyExistPatientWithIC,
  MockAcuityPatientLastNameForAlreadyExistPatientWithIC,
} from '@libs/common/adapters/__mocks__/acuity.adapter'
import {Patient, PatientDefaultMilestone} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  JourneyType,
  MilestoneStep,
  PatientMilestoneStatus,
  PatientMilestoneType,
  UserType,
} from '@libs/services-common/enums'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {QuestionnaireJourneyMilestone} from '@libs/data-layer/apps/questionnaires/enums/questionnaire-enums'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {AppointmentStatus} from '@libs/common/enums'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientAlertType, PatientStatusEnum} from '@libs/services-common/enums/patient.enum'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {
  patientNamesMatchingByAcuityTemplateFixture,
  timeOverlapsForSyncByAcuityTemplateFixture,
  acuitySyncRandomFailTemplateFixture,
  sendEmailDoesNotHaveScheduleForSlotFixture,
} from '../fixtures/email-template.fixture'
import {getAcuityAppointmentDateOfBirth} from '@libs/common/helpers/date.helper'
import {AcuityWebhookService} from '@firebase-platform/functions/webhooks/src/services/acuity-webhook.service'
import {PriorityStatus} from '@libs/data-layer/apps/users/entities/typeorm'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {AcuityAdapter} from '@libs/common/adapters'
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
jest.setTimeout(10000)

const serviceProviderId = 548800105
const serviceCategoryId = 548800109
const serviceTypeId = 548800110
const patientIdForForCaseNoIC = 548800115
const patientIdForForCaseWithIC = 548800118
const appointmentIdForPatientWithIC = 548800120
const priorityStatusId = 345459799

const priorityStatusData: Partial<PriorityStatus> = {
  id: priorityStatusId,
  name: 'priorityStatusData',
  abbreviation: 'abbreviation',
  textColor: 'textColor',
  borderColor: 'borderColor',
  isSelectable: true,
  isPrimaryDefault: true,
  isPartnerDefault: false,
  sequence: 1,
}

const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  externalProviderIDForAcuity: MockAppointmentAcuityResponse.calendarID,
}

const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId,
  externalServiceTypeIDForAcuity: MockAppointmentAcuityResponse.appointmentTypeID,
  durationInMinutes: 30,
}

//needed in main case - when we creating IC app where need to get journeyMilestone
const questionnaireWithPatientIntakeFemaleCompletedData: Partial<Questionnaire> = {
  id: 538850144,
  uuid: '3cea44fa-9048-11ee-b9d1-0242ac120002',
  journeyMilestone: QuestionnaireJourneyMilestone.PatientIntakeFemale,
}

const patientDataForCaseNoIC: Partial<Patient> = {
  id: patientIdForForCaseNoIC,
  authUserId: AuthUserFixture.acuityWebhookPatientExistNoIC.uid,
  patientIdentifier: 'PID123177',
  firstName: MockAcuityPatientFirstNameForAlreadyExistPatient,
  lastName: MockAcuityPatientLastNameForAlreadyExistPatient,
  dateOfBirth: getAcuityAppointmentDateOfBirth(MockAppointmentAcuityResponse),
  sexAtBirth: SexAtBirth.Female,
  email: AuthUserFixture.acuityWebhookPatientExistNoIC.email,
}

const patientDataForCaseWithIC: Partial<Patient> = {
  id: patientIdForForCaseWithIC,
  authUserId: AuthUserFixture.acuityWebhookPatientExistWithIC.uid,
  patientIdentifier: 'PID123178',
  firstName: MockAcuityPatientFirstNameForAlreadyExistPatientWithIC,
  lastName: MockAcuityPatientLastNameForAlreadyExistPatientWithIC,
  dateOfBirth: getAcuityAppointmentDateOfBirth(MockAppointmentAcuityResponse),
}

const appointmentForPatientWithIC: Partial<Appointment> = {
  id: appointmentIdForPatientWithIC,
  status: AppointmentStatus.Booked,
  patientId: patientIdForForCaseWithIC,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  identifier: 'A123123155',
  milestoneStep: MilestoneStep.InitialConsultation,
}

const patientDefaultMilestoneData: Partial<PatientDefaultMilestone> = {
  id: 548850109,
  serviceCategoryId: serviceCategoryId,
  type: PatientMilestoneType.ServiceCategory,
  isDisabled: false,
}

//needed to test does it removed default milestone in test
const patientDefaultMilestoneForExistPatNoICData: Partial<PatientMilestone> = {
  id: 548860109,
  uuid: 'AcuityMilestoneWithDef',
  patientId: patientIdForForCaseNoIC,
  serviceCategoryId: serviceCategoryId,
  type: PatientMilestoneType.ServiceCategory,
  status: PatientMilestoneStatus.Upcoming,
  defaultMilestoneId: patientDefaultMilestoneData.id,
}

let createdPatientId: number
let createdAppointmentId: number
const reqPayload: Partial<functions.https.Request> = {
  body: {
    action: AcuityAction.Changed,
    id: 438800222,
    appointmentTypeID: 438800223,
    calendarID: 438800224,
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
  let priorityStatusSeed: PriorityStatusSeed
  let patientAlertSeed: PatientAlertSeed
  let patientMilestoneSeed: PatientMilestoneSeed
  let patientDefaultMilestoneSeed: PatientDefaultMilestoneSeed
  let serviceProviderSeed: ServiceProviderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let questionnaireSeed: QuestionnaireSeed
  let emailTemplateSeed: EmailTemplateSeed

  let spyEmailAdapterProvider: jest.SpyInstance<Promise<EmailProvider[]>, []>

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    patientAlertSeed = new PatientAlertSeed(dataSource)
    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
    patientDefaultMilestoneSeed = new PatientDefaultMilestoneSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    questionnaireSeed = new QuestionnaireSeed(dataSource)
    priorityStatusSeed = new PriorityStatusSeed(dataSource)

    await Promise.all([serviceCategorySeed.create(serviceCategoryData)])

    await superTypeSeed.create(superTypeOtherFixture)
    await Promise.all([
      serviceTypeSeed.create(serviceTypeData),
      serviceProviderSeed.create(serviceProviderData),
      patientSeed.createArray([patientDataForCaseNoIC, patientDataForCaseWithIC]),
      questionnaireSeed.create(questionnaireWithPatientIntakeFemaleCompletedData),
      patientDefaultMilestoneSeed.createArray([patientDefaultMilestoneData]),
      emailTemplateSeed.createArray([
        patientNamesMatchingByAcuityTemplateFixture,
        timeOverlapsForSyncByAcuityTemplateFixture,
        acuitySyncRandomFailTemplateFixture,
        sendEmailDoesNotHaveScheduleForSlotFixture,
      ]),
      priorityStatusSeed.create(priorityStatusData),
    ])

    await patientMilestoneSeed.createArray([patientDefaultMilestoneForExistPatNoICData])
    await appointmentSeed.createArray([appointmentForPatientWithIC])

    spyEmailAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyEmailAdapterProvider.mockResolvedValue([
      {id: 'sendinblue', name: 'sendinblue', active: true, disabled: false, ...auditable},
    ])
  })

  it(`should throw an error because patient is soft deleted`, async () => {
    await patientSeed.updatePatient(patientDataForCaseNoIC.id, {deletedAt: dateTimeUtil.now()})

    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyPublishCreatePatientAndAppointment = jest.spyOn(
      PubSubHelpers,
      'publishCreatePatientAndAppointment',
    )

    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityPatientAlreadyExistNoIC,
      } as AcuityWebhookData,
    }
    await acuityToClinicPortalSyncHandler(reqPayloadWithoutId as functions.https.Request)

    await patientSeed.updatePatient(patientDataForCaseNoIC.id, {deletedAt: null})

    const createdAppointments = await appointmentSeed.findByPatientId(patientDataForCaseNoIC.id)
    expect(createdAppointments.length).toBe(0)
    expect(spyOnEmailSending).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: acuitySyncRandomFailTemplateFixture.subject,
      }),
    )
    expect(spyPublishCreatePatientAndAppointment).toBeCalledTimes(0)

    spyOnEmailSending.mockClear()
    spyPublishCreatePatientAndAppointment.mockClear()
  })

  it(`1. Patient already exist and without IC - should create just new appointment
      2. Should update patient data, creating patientIntake alert, remove default milestone 
      3. Should send Email When Slot Has More Than One Booking`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyPublishCreatePatientAndAppointment = jest.spyOn(
      PubSubHelpers,
      'publishCreatePatientAndAppointment',
    )

    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityPatientAlreadyExistNoIC,
      } as AcuityWebhookData,
    }
    await acuityToClinicPortalSyncHandler(reqPayloadWithoutId as functions.https.Request)

    const createdAppointments = await appointmentSeed.findByPatientId(patientDataForCaseNoIC.id)
    expect(createdAppointments.length).toBe(1)
    createdAppointmentId = createdAppointments[0].id

    const existPatient = await patientSeed.findOneById(patientDataForCaseNoIC.id)

    expect(existPatient).toMatchObject({
      userType: UserType.Patient,
      status: PatientStatusEnum.Active,
      currentJourneyType: JourneyType.PatientIntakeFemale,
      priorityStatusId,
      phoneNumber: PhoneNumberMFASecondForUserMock,
    } as Patient)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyPublishCreatePatientAndAppointment).toBeCalledTimes(0) //should not send email if patient already exist

    // should exist patientAlert for patientIntake
    const patientAlert = await patientAlertSeed.findOneByPatientIdAndType(
      existPatient.id,
      PatientAlertType.Questionnaire,
    )
    expect(patientAlert.questionnaireId).toBe(questionnaireWithPatientIntakeFemaleCompletedData.id)

    const defaultMilestones = await patientMilestoneSeed.findDefaultMilestonesByPatientId(
      existPatient.id,
    )
    expect(defaultMilestones.length).toBe(0)

    spyOnEmailSending.mockRestore()
    spyPublishCreatePatientAndAppointment.mockRestore()
  })

  it(`Patient and past appointment already exist - should not sent an email for sync failure`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyOnAcuityAdapter = jest.spyOn(
      AcuityAdapter.prototype,
      'getAppointmentByIdFromAcuityService',
    )
    spyOnAcuityAdapter.mockResolvedValueOnce({
      ...MockAppointmentAcuityResponse,
      firstName: MockAcuityPatientFirstNameForAlreadyExistPatient,
      lastName: MockAcuityPatientLastNameForAlreadyExistPatient,
      datetime: `2010-11-30T09:00:00-0500`,
    })

    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityPatientAlreadyExistNoIC,
      } as AcuityWebhookData,
    }
    await acuityToClinicPortalSyncHandler(reqPayloadWithoutId as functions.https.Request)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it(`Patient already exist and with IC - should created 2th app but without updating patient alerts etc`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyPublishCreatePatientAndAppointment = jest.spyOn(
      PubSubHelpers,
      'publishCreatePatientAndAppointment',
    )

    const spyUpdatePatientDataWithAlertsAndMilestones = jest.spyOn(
      AcuityWebhookService.prototype,
      'updatePatientDataWithAlertsAndMilestones',
    )

    const reqPayloadWithoutId = {
      ...reqPayload,
      body: {
        ...reqPayload.body,
        id: MockAcuityPatientAlreadyExistWithIC,
      } as AcuityWebhookData,
    }
    await acuityToClinicPortalSyncHandler(reqPayloadWithoutId as functions.https.Request)

    const createdAppointments = await appointmentSeed.findByPatientId(patientDataForCaseWithIC.id)
    expect(createdAppointments.length).toBe(2) //app with IC was created by seed

    expect(spyOnEmailSending).toBeCalledTimes(2)
    expect(spyPublishCreatePatientAndAppointment).toBeCalledTimes(0) //should not send email if patient already exist
    expect(spyUpdatePatientDataWithAlertsAndMilestones).toBeCalledTimes(0)

    spyOnEmailSending.mockRestore()
    spyPublishCreatePatientAndAppointment.mockRestore()
    spyUpdatePatientDataWithAlertsAndMilestones.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    // time to time there is issue with deadlock  -so deleting 1 by 1 to avoid deadlock

    await appointmentSeed.removeByIds([createdAppointmentId])

    await serviceTypeSeed.removeById(serviceTypeId)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceProviderSeed.removeById(serviceProviderId)
    await questionnaireSeed.removeQuestionnaireById(
      questionnaireWithPatientIntakeFemaleCompletedData.id,
    )
    await serviceCategorySeed.removeById(serviceCategoryId)
    await patientSeed.removeByIds([createdPatientId, patientIdForForCaseNoIC])
    await emailTemplateSeed.deleteByIds([
      patientNamesMatchingByAcuityTemplateFixture.id,
      timeOverlapsForSyncByAcuityTemplateFixture.id,
      acuitySyncRandomFailTemplateFixture.id,
      sendEmailDoesNotHaveScheduleForSlotFixture.id,
    ])
    await priorityStatusSeed.removeByIds([priorityStatusId])
    await dataSource.destroy()
  })
})
