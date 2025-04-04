import {testPubSubEvent} from '@functions-types'
import {handlerReminderToInvitePartner} from '../functions/push-notification/src/partner-reminder/handler'
import {
  SendReminderToInvitePartnerPayload,
  SendReminderToInvitePartnerSchema,
} from '@libs/common/model/proto-schemas/send-reminder-to-invite-partner.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {DataSource} from 'typeorm'
import {PatientSeed, SuperTypeSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {PatientPushNotification} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPushNotificationSeed} from '@seeds/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {dateTimeUtil} from '@libs/common/test/fixtures/patient-partner.fixture'
import {AppointmentStatus} from '@libs/common/enums'
import {ContributionEnum, MilestoneStep, RelationshipEnum} from '@libs/services-common/enums'
import {
  AppointmentSeed,
  PatientPartnerSeed,
  QuestionnaireSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
} from '@seeds/typeorm'
import {StructuredLogger} from '@libs/common'
import {handlerPatientIntakeReminder} from '../functions/push-notification/src/patient-intake-reminder/handler'
import {SendPatientIntakeReminderSchema} from '@libs/common/model/proto-schemas/send-patient-intake-reminder.schema'
import {handlerPartnerIntakeReminder} from '../functions/push-notification/src/partner-intake-reminder/handler'
import {
  SendPartnerIntakeReminderPayload,
  SendPartnerIntakeReminderSchema,
} from '@libs/common/model/proto-schemas/send-partner-intake-reminder.schema'
import {
  CloudTask,
  CloudTaskType,
} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {CloudTaskSeed} from '@seeds/firestore/cloud-task.seed'
import {QuestionnaireJourneyMilestone} from '@libs/data-layer/apps/questionnaires/enums/questionnaire-enums'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {
  invalidTokenPartnerIntakeReminder,
  invalidTokenInvitePartnerReminder,
  invalidTokenPatientIntakeReminder,
  invalidTokenAlertReminder,
  invalidTokenPatientPlanReminder,
} from '@libs/common/adapters/__mocks__/push-notification.adapter'
import {handlerPushedPlansToPatient} from '../functions/push-notification/src/patient-milestones/handler'
import {
  PushedPlansToPatientPubSubPayload,
  PushedPlansToPatientSchema,
} from '@libs/common/model/proto-schemas/pushed-plans-to-patient.schema'
import {handlerPaymentAlertCreated} from '../functions/push-notification/src/payment-alert-created/handler'
import {
  PaymentAlertCreatedPubSubPayload,
  PaymentAlertCreatedSchema,
} from '@libs/common/model/proto-schemas/payment-alert-created.schema'
import {PatientAlertType} from '@libs/services-common/enums'
import {PatientAlert} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientAlertSeed} from '@seeds/typeorm'
import {
  REGISTRATION_TOKEN_NOT_REGISTERED,
  UNREGISTERED_TOKEN,
} from '@libs/common/errors/push-notification.errors'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

jest.mock('../../libs/common/src/adapters/push-notification.adapter')
jest.mock('../../libs/common/src/adapters/pubsub.adapter')
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('bunyan', () => ({
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
}))
jest.mock('@google-cloud/logging-bunyan')
jest.setTimeout(10000)

const id = 4594032
const reminderId = 4694032

const patientData: Partial<Patient> = {
  id,
  authUserId: 'push_notification_invalid_token',
  firstName: 'pnitFN',
  lastName: 'pnitLN',
  middleName: 'pnitMN',
  sexAtBirth: SexAtBirth.Female,
}

const patientPushNotificationPartnerIntakeReminderData: Partial<PatientPushNotification> = {
  id: id + 1,
  patientId: id,
  registrationToken: invalidTokenPartnerIntakeReminder,
  pushNotificationsEnabled: true,
}

const patientPushNotificationInvitePartnerReminderData: Partial<PatientPushNotification> = {
  id: id + 2,
  patientId: reminderId,
  registrationToken: invalidTokenInvitePartnerReminder,
  pushNotificationsEnabled: true,
}

const patientPushNotificationPatientIntakeReminderData: Partial<PatientPushNotification> = {
  id: id + 3,
  patientId: id,
  registrationToken: invalidTokenPatientIntakeReminder,
  pushNotificationsEnabled: true,
}

const patientPushNotificationAlertReminderData: Partial<PatientPushNotification> = {
  id: id + 4,
  patientId: reminderId,
  registrationToken: invalidTokenAlertReminder,
  pushNotificationsEnabled: true,
}

const patientPushNotificationPatientPlanReminderData: Partial<PatientPushNotification> = {
  id: id + 5,
  patientId: id,
  registrationToken: invalidTokenPatientPlanReminder,
  pushNotificationsEnabled: true,
}

const patientWithoutPartnerData: Partial<Patient> = {
  id: reminderId,
  authUserId: 'push_notification_invalid_token_2',
  firstName: 'pnitFN',
  lastName: 'pnitLN',
  middleName: 'pnitMN',
  sexAtBirth: SexAtBirth.Female,
}

const initialConsAppointmentData: Partial<Appointment> = {
  id,
  status: AppointmentStatus.Booked,
  patientId: id,
  serviceProviderId: id,
  serviceTypeId: id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  milestoneStep: MilestoneStep.InitialConsultation,
}

const initialConsAppointmentForReminderData: Partial<Appointment> = {
  id: reminderId,
  status: AppointmentStatus.Booked,
  patientId: reminderId,
  serviceProviderId: id,
  serviceTypeId: id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  milestoneStep: MilestoneStep.InitialConsultation,
}

const serviceType = {
  id,
  name: 'TEST_NAME',
  durationInMinutes: 30,
  minimumHoursRequired: 2,
  price: 80,
}

const cloudTaskReminderPartnerIntake: Partial<CloudTask> = {
  id: 'cloudTaskReminderPartnerIntake2',
  patientId: id,
  cloudTaskId: 'cloudTaskReminderPartnerIntake2',
  type: CloudTaskType.PartnerIntakeNotificationReminder,
}

const questionnaireData: Partial<Questionnaire> = {
  id,
  journeyMilestone: QuestionnaireJourneyMilestone.PatientIntakeFemale,
  uuid: 'questionnaire-uuid2',
}

const patientAlertData: Partial<PatientAlert> = {
  id: reminderId,
  uuid: 'patientAlert-uuid147',
  appointmentId: reminderId,
  patientId: reminderId,
  type: PatientAlertType.AppointmentCheckout,
}

let dataSource: DataSource

let patientSeed: PatientSeed
let patientPushNotificationSeed: PatientPushNotificationSeed
let serviceProviderSeed: ServiceProviderSeed
let appointmentSeed: AppointmentSeed
let superTypeSeed: SuperTypeSeed
let serviceTypeSeed: ServiceTypeSeed
let cloudTaskSeed: CloudTaskSeed
let patientPartnerSeed: PatientPartnerSeed
let questionnaireSeed: QuestionnaireSeed
let patientAlertSeed: PatientAlertSeed

describe('Push notification: Invalid token', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    cloudTaskSeed = new CloudTaskSeed()
    patientPartnerSeed = new PatientPartnerSeed(dataSource)
    questionnaireSeed = new QuestionnaireSeed(dataSource)
    patientAlertSeed = new PatientAlertSeed(dataSource)

    await Promise.all([
      patientSeed.createArray([patientData, patientWithoutPartnerData]),
      questionnaireSeed.create(questionnaireData),
    ])
    await patientPushNotificationSeed.createArray([
      patientPushNotificationPartnerIntakeReminderData,
      patientPushNotificationInvitePartnerReminderData,
      patientPushNotificationPatientIntakeReminderData,
      patientPushNotificationAlertReminderData,
      patientPushNotificationPatientPlanReminderData,
    ])
    await serviceProviderSeed.createArray([{id: id}])
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.createArray([serviceType])
    await appointmentSeed.createArray([
      initialConsAppointmentData,
      initialConsAppointmentForReminderData,
    ])
    await patientAlertSeed.createArray([patientAlertData])
    await patientPartnerSeed.create({
      patientId: id,
      partnerId: id,
      contribution: ContributionEnum.Egg,
      relationship: RelationshipEnum.Committed,
    })
  })

  test('should fail to send push notification for Partner intake reminder - unregistered token', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    await cloudTaskSeed.create(cloudTaskReminderPartnerIntake)

    const data: SendPartnerIntakeReminderPayload = {
      patientId: id,
      appointmentId: initialConsAppointmentData.id,
    }

    await handlerPartnerIntakeReminder(encodePubSubMessage(data, SendPartnerIntakeReminderSchema))

    expect(spyOnLogger).toBeCalledWith(
      activityLogs.PushNotificationFunctions.HandleSendNotificationError,
      activityLogs.PushNotificationActions.UnregisteredToken,
      {
        errorInfo: {message: REGISTRATION_TOKEN_NOT_REGISTERED},
        message: UNREGISTERED_TOKEN,
      },
    )
    spyOnLogger.mockRestore()
  })

  test('should fail to send push notification to remind to invite partner - unregistered token', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    const data: SendReminderToInvitePartnerPayload = {
      patientId: reminderId,
    }

    await handlerReminderToInvitePartner(
      encodePubSubMessage(data, SendReminderToInvitePartnerSchema),
    )
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.PushNotificationFunctions.HandleSendNotificationError,
      activityLogs.PushNotificationActions.UnregisteredToken,
      {
        errorInfo: {message: REGISTRATION_TOKEN_NOT_REGISTERED},
        message: UNREGISTERED_TOKEN,
      },
    )
    spyOnLogger.mockRestore()
  })

  test('should fail to send push notification for: Patient Intake Reminder - unregistered token', async () => {
    const questionnaireUUID = 'anyQuestionnaireUUidForCFTest'
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    await handlerPatientIntakeReminder(
      encodePubSubMessage({patientId: id, questionnaireUUID}, SendPatientIntakeReminderSchema),
    )
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.PushNotificationFunctions.HandleSendNotificationError,
      activityLogs.PushNotificationActions.UnregisteredToken,
      {
        errorInfo: {message: REGISTRATION_TOKEN_NOT_REGISTERED},
        message: UNREGISTERED_TOKEN,
      },
    )
    spyOnLogger.mockRestore()
  })

  test('should fail to send push notification for: Pushed plans to the patient - unregistered token', async () => {
    const data: PushedPlansToPatientPubSubPayload = {
      patientId: id,
      patientPlanIds: [1, 2],
    }
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    const message = testPubSubEvent(encodePubSubMessage(data, PushedPlansToPatientSchema))

    await handlerPushedPlansToPatient(message)
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.PushNotificationFunctions.HandleSendNotificationError,
      activityLogs.PushNotificationActions.UnregisteredToken,
      {
        errorInfo: {message: REGISTRATION_TOKEN_NOT_REGISTERED},
        message: UNREGISTERED_TOKEN,
      },
    )
    spyOnLogger.mockRestore()
  })

  test('should fail to send push notification for: appointment payment alert - unregistered token', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')
    const data: PaymentAlertCreatedPubSubPayload = {
      patientAlertId: reminderId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PaymentAlertCreatedSchema))

    await handlerPaymentAlertCreated(message)
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.PushNotificationFunctions.HandleSendNotificationError,
      activityLogs.PushNotificationActions.UnregisteredToken,
      {
        errorInfo: {message: REGISTRATION_TOKEN_NOT_REGISTERED},
        message: UNREGISTERED_TOKEN,
      },
    )
    spyOnLogger.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientSeed.removeByIds([id, reminderId])
    await appointmentSeed.removeByIds([id, reminderId])
    await questionnaireSeed.removeQuestionnaireById(questionnaireData.id)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
  })
})
