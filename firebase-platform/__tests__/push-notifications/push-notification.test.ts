import {testPubSubEvent} from '@functions-types'
import {FirebaseAdminProvider, initFireORM} from '@libs/common'
import {PushNotificationAdapter} from '@libs/common/adapters'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {handlerPaymentAlertCreated} from '@firebase-platform/functions/push-notification/src/payment-alert-created/handler'
import {
  PaymentAlertCreatedPubSubPayload,
  PaymentAlertCreatedSchema,
} from '@libs/common/model/proto-schemas/payment-alert-created.schema'
import {DataSource} from 'typeorm'
import {AppointmentSeed, PatientPushNotificationSeed, PatientPartnerSeed} from '@seeds/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {PushNotificationType} from '@libs/common/enums/push-notification.enum'
import {
  PushedPlansToPatientPubSubPayload,
  PushedPlansToPatientSchema,
} from '@libs/common/model/proto-schemas/pushed-plans-to-patient.schema'
import {
  handlerPushedPlansToPatient,
  handlerReportPeriodMilestonePushed,
} from '@firebase-platform/functions/push-notification/src/patient-milestones/handler'
import {PushNotificationInternalType} from '@libs/services-common/enums'
import {SendPatientIntakeReminderSchema} from '@libs/common/model/proto-schemas/send-patient-intake-reminder.schema'
import {handlerPatientIntakeReminder} from '@firebase-platform/functions/push-notification/src/patient-intake-reminder/handler'
import {CloudTaskSeed} from '@seeds/firestore/cloud-task.seed'
import {CloudTaskType} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {
  SendReminderToInvitePartnerPayload,
  SendReminderToInvitePartnerSchema,
} from '@libs/common/model/proto-schemas/send-reminder-to-invite-partner.schema'
import {handlerReminderToInvitePartner} from '@firebase-platform/functions/push-notification/src/partner-reminder/handler'
import {
  ContributionEnum,
  RelationshipEnum,
} from '@libs/services-common/enums/partner-invitation.enum'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  SendPartnerIntakeReminderPayload,
  SendPartnerIntakeReminderSchema,
} from '@libs/common/model/proto-schemas/send-partner-intake-reminder.schema'
import {handlerPartnerIntakeReminder} from '@firebase-platform/functions/push-notification/src/partner-intake-reminder/handler'
import {
  TestOrderMilestonesCreatedPubSubPayload,
  TestOrderMilestonesCreatedSchema,
} from '@libs/common/model/proto-schemas/test-order-milestones-created.schema'
import {handlerTestOrderMilestonesAdded} from '@firebase-platform/functions/push-notification/src/tests/handler'
import {PatientMilestoneIdSchema} from '@libs/common/model/proto-schemas/patient-milestone-id.schema'
import * as seeds from './push-notification.seed'
import {patientPushNotificationData, patientReport} from './push-notification.seed'
import {TestResultUpdatedSchema} from '@libs/common/model/proto-schemas/test-result-updated.schema'
import {handlerTestResultUpdated} from '@firebase-platform/functions/push-notification/src/test-results-updated/handler'
import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {FertilityIQReleasedSchema} from '@libs/common/model/proto-schemas/fertility-iq-released.schema'
import {handlerFertilityIQReleased} from '@firebase-platform/functions/push-notification/src/fertility-iq/handler'
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

let dataSource: DataSource
let appointmentSeed: AppointmentSeed
let patientPushNotificationSeed: PatientPushNotificationSeed
let cloudTaskSeed: CloudTaskSeed
let patientPartnerSeed: PatientPartnerSeed

describe('Push notification:', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    appointmentSeed = new AppointmentSeed(dataSource)
    patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)
    cloudTaskSeed = new CloudTaskSeed()
    patientPartnerSeed = new PatientPartnerSeed(dataSource)

    await seeds.createPushNotificationSeeds()
  })

  test('should send push notification for: appointment payment alert', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: PaymentAlertCreatedPubSubPayload = {
      patientAlertId: seeds.patientAlertId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PaymentAlertCreatedSchema))

    await handlerPaymentAlertCreated(message)

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.AppointmentPaymentAlert),
      body: pushNotificationBody.get(PushNotificationInternalType.AppointmentPaymentAlert),
      registrationToken: patientPushNotificationData.registrationToken,

      type: PushNotificationType.MilestoneAlert,
      id: seeds.patientAlertUUID,
    }

    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should send push notification for: Pushed plans to the patient', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: PushedPlansToPatientPubSubPayload = {
      patientId: seeds.patientId,
      patientPlanIds: [1, 2], // dummy
    }
    const message = testPubSubEvent(encodePubSubMessage(data, PushedPlansToPatientSchema))

    await handlerPushedPlansToPatient(message)

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.PatientPlansPushed),
      body: pushNotificationBody
        .get(PushNotificationInternalType.PatientPlansPushed)
        .replaceAll('{{plansCount}}', '2'),
      registrationToken: patientPushNotificationData.registrationToken,
      id: null,
      type: PushNotificationType.PlansSelection,
    }
    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should send push notification for Reporting period milestone', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientMilestoneId: seeds.patientMilestonePlanData.id,
        },
        PatientMilestoneIdSchema,
      ),
    )

    await handlerReportPeriodMilestonePushed(message)

    const calledWithParam = {
      title: pushNotificationTitle.get(
        PushNotificationInternalType.ReportPeriodPlanMilestonePushed,
      ),
      body: pushNotificationBody
        .get(PushNotificationInternalType.ReportPeriodPlanMilestonePushed)
        .replace('{{planName}}', seeds.planTypeData.title),
      registrationToken: patientPushNotificationData.registrationToken,
      id: seeds.patientMilestonePlanData.uuid,
      type: PushNotificationType.Milestone,
    }
    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('Should not send push notification for fertilityIQ: FAIL', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientUUID: 'NOT_FOUND',
          patientReportUUID: 'NOT_FOUND',
        },
        FertilityIQReleasedSchema,
      ),
    )

    await handlerFertilityIQReleased(message)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })
  test('Should send push notification for fertilityIQ: SUCCESS', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientUUID: seeds.patientData.uuid,
          patientReportUUID: patientReport.uuid,
        },
        FertilityIQReleasedSchema,
      ),
    )

    await handlerFertilityIQReleased(message)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should not send push notification for Reporting period milestone - milestone doesnt have plan', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientMilestoneId: seeds.patientMilestoneData.id,
        },
        PatientMilestoneIdSchema,
      ),
    )

    await handlerReportPeriodMilestonePushed(message)

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should send push notification for test ordered type', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: TestOrderMilestonesCreatedPubSubPayload = {
      patientMilestonesIds: [seeds.patientMilestoneData.id, seeds.patientMilestoneLatestData.id],
    }

    const message = testPubSubEvent(encodePubSubMessage(data, TestOrderMilestonesCreatedSchema))

    await handlerTestOrderMilestonesAdded(message)

    const paramsToCall = {
      title: pushNotificationTitle.get(PushNotificationInternalType.TestsOrdered),
      body: pushNotificationBody.get(PushNotificationInternalType.TestsOrdered),
      registrationToken: patientPushNotificationData.registrationToken,
      type: PushNotificationType.Milestone,
      id: seeds.patientMilestoneLatestData.uuid,
    }

    expect(spyPushNotificationAdapterSend).toBeCalledWith(paramsToCall)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)

    spyPushNotificationAdapterSend.mockClear()
  })

  test('should send push notification for Released Test Results', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          testResultId: seeds.testResultReleasedData.id,
          testResultPrevStatus: TestResultStatus.Reviewed,
          testResultNewStatus: TestResultStatus.Released,
        },
        TestResultUpdatedSchema,
      ),
    )

    await handlerTestResultUpdated(message)

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.TestResultsReleased),
      body: pushNotificationBody.get(PushNotificationInternalType.TestResultsReleased),
      registrationToken: patientPushNotificationData.registrationToken,
      id: null,
      type: PushNotificationType.TestResults,
    }
    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should not send push notification for Released results - test result not found', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          testResultId: 4040404,
          testResultPrevStatus: TestResultStatus.Reviewed,
          testResultNewStatus: TestResultStatus.Released,
        },
        TestResultUpdatedSchema,
      ),
    )

    await handlerTestResultUpdated(message)

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should send push notification for: Patient Intake Reminder', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const questionnaireUUID = 'anyQuestionnaireUUidForCFTest'
    // for cloudTask - we using data as string, not as CloudEvent<PubSubEvent> type
    await handlerPatientIntakeReminder(
      encodePubSubMessage(
        {patientId: seeds.patientId, questionnaireUUID},
        SendPatientIntakeReminderSchema,
      ),
    )

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.PatientIntake),
      body: pushNotificationBody.get(PushNotificationInternalType.PatientIntake),
      registrationToken: patientPushNotificationData.registrationToken,

      type: PushNotificationType.Questionnaire,
      id: questionnaireUUID,
    }

    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)

    spyPushNotificationAdapterSend.mockClear()
  })

  test('should send push notification to remind to invite partner', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: SendReminderToInvitePartnerPayload = {
      patientId: seeds.patientId,
    }

    await handlerReminderToInvitePartner(
      encodePubSubMessage(data, SendReminderToInvitePartnerSchema),
    )

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.PartnerReminder),
      body: pushNotificationBody.get(PushNotificationInternalType.PartnerReminder),
      registrationToken: patientPushNotificationData.registrationToken,
      type: PushNotificationType.PartnerInvitation,
    }

    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)

    spyPushNotificationAdapterSend.mockClear()
  })

  test(`should NOT send push notification for: Patient Intake Reminder - appointment is canceled
        2. Delete cloudTaskId from reminders`, async () => {
    //restore already deleted cloudtaskId
    await cloudTaskSeed.create(seeds.cloudTaskReminderPatientIntake)

    await appointmentSeed.updateStatusById(seeds.appointmentId, AppointmentStatus.Cancelled)

    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const questionnaireUUID = 'anyQuestionnaireUUidForCFTest'
    // for cloudTask - we using data as string, not as CloudEvent<PubSubEvent> type
    await handlerPatientIntakeReminder(
      encodePubSubMessage(
        {patientId: seeds.patientId, questionnaireUUID},
        SendPatientIntakeReminderSchema,
      ),
    )

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()

    //should delete cloudTaskReminder
    const cloudTaskRemindeForPatientAfterCall = await cloudTaskSeed.findOneByTypeAndPatientId(
      CloudTaskType.PatientIntakeNotificationReminder,
      seeds.patientId,
    )
    expect(cloudTaskRemindeForPatientAfterCall).toBeNull()
  })

  test(`should NOT send push notification for: Patient Intake Reminder - Patient Intake is Completed`, async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const questionnaireUUID = 'anyQuestionnaireUUidForCFTest'
    // for cloudTask - we using data as string, not as CloudEvent<PubSubEvent> type
    await handlerPatientIntakeReminder(
      encodePubSubMessage(
        {
          patientId: seeds.patientIntakeCompletedId,
          questionnaireUUID,
          appointmentId: seeds.patientIntakeCompletedAppointmentId,
        },
        SendPatientIntakeReminderSchema,
      ),
    )

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()

    //should delete cloudTaskReminder
    const cloudTaskRemindeForPatientAfterCall = await cloudTaskSeed.findOneByTypeAndPatientId(
      CloudTaskType.PatientIntakeNotificationReminder,
      seeds.patientIntakeCompletedId,
    )
    expect(cloudTaskRemindeForPatientAfterCall).toBeNull()
  })

  test(`should NOT send push notification for to remind to invite partner - appointment is canceled`, async () => {
    await cloudTaskSeed.create(seeds.cloudTaskReminderToInvitePartner)

    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: SendReminderToInvitePartnerPayload = {
      patientId: seeds.patientId,
    }

    await handlerReminderToInvitePartner(encodePubSubMessage(data, SendPatientIntakeReminderSchema))

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()

    const cloudTaskRemindeForPatientAfterCall = await cloudTaskSeed.findOneByTypeAndPatientId(
      CloudTaskType.PartnerInvitationNotificationReminder,
      seeds.patientId,
    )
    expect(cloudTaskRemindeForPatientAfterCall).toBe(null)
  })

  test(`should NOT send push notification for to remind to invite partner - patient already has a partner`, async () => {
    await Promise.all([
      cloudTaskSeed.create(seeds.cloudTaskReminderToInvitePartner),
      appointmentSeed.updateStatusById(seeds.appointmentId, AppointmentStatus.Booked),
      patientPartnerSeed.create({
        patientId: seeds.patientId,
        partnerId: seeds.partnerData.id,
        contribution: ContributionEnum.Egg,
        relationship: RelationshipEnum.Committed,
      }),
    ])

    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: SendReminderToInvitePartnerPayload = {
      patientId: seeds.patientId,
    }

    await handlerReminderToInvitePartner(encodePubSubMessage(data, SendPatientIntakeReminderSchema))

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()

    const cloudTaskRemindeForPatientAfterCall = await cloudTaskSeed.findOneByTypeAndPatientId(
      CloudTaskType.PartnerInvitationNotificationReminder,
      seeds.patientId,
    )
    expect(cloudTaskRemindeForPatientAfterCall).toBeNull()
  })

  test('should send push notification for Partner intake reminder', async () => {
    // this test should be run with all prev test - we adding partner in above test
    await cloudTaskSeed.create(seeds.cloudTaskReminderPartnerIntake)

    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: SendPartnerIntakeReminderPayload = {
      patientId: seeds.patientId,
      appointmentId: seeds.initialConsAppointmentData.id,
    }

    await handlerPartnerIntakeReminder(encodePubSubMessage(data, SendPartnerIntakeReminderSchema))

    const calledWithParam = {
      title: pushNotificationTitle.get(PushNotificationInternalType.PartnerIntake),
      body: pushNotificationBody.get(PushNotificationInternalType.PartnerIntake),
      registrationToken: seeds.patientPushNotificationForPartnerData.registrationToken,
      type: PushNotificationType.Questionnaire,
      id: seeds.questionnaireData.uuid,
    }

    expect(spyPushNotificationAdapterSend).toBeCalledWith(calledWithParam)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()

    const cloudTaskRemindeForPatientAfterCall = await cloudTaskSeed.findOneByTypeAndPatientId(
      CloudTaskType.PartnerIntakeNotificationReminder,
      seeds.patientId,
    )
    expect(cloudTaskRemindeForPatientAfterCall).toBe(null)
  })

  test('should not send push notification for Partner intake reminder', async () => {
    await cloudTaskSeed.create(seeds.cloudTaskReminderPartnerIntake)
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: SendPartnerIntakeReminderPayload = {
      patientId: seeds.patientId,
      appointmentId: seeds.initialConsAppointmentCancelledData.id,
    }
    await handlerPartnerIntakeReminder(encodePubSubMessage(data, SendPartnerIntakeReminderSchema))

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()

    const cloudTaskRemindeForPatientAfterCall = await cloudTaskSeed.findOneByTypeAndPatientId(
      CloudTaskType.PartnerIntakeNotificationReminder,
      seeds.patientId,
    )
    expect(cloudTaskRemindeForPatientAfterCall).toBe(null)
  })

  test('should NOT send push notification if user disabled them', async () => {
    await patientPushNotificationSeed.setPushNotificationEnabled(seeds.patientId, false)

    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: PaymentAlertCreatedPubSubPayload = {
      patientAlertId: seeds.patientAlertId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PaymentAlertCreatedSchema))
    await handlerPaymentAlertCreated(message)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should not send push notification with common handler - patient has notifications turned off', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: TestOrderMilestonesCreatedPubSubPayload = {
      patientMilestonesIds: [seeds.patientMilestoneData.id, seeds.patientMilestoneLatestData.id],
    }
    const message = testPubSubEvent(encodePubSubMessage(data, TestOrderMilestonesCreatedSchema))
    await handlerTestOrderMilestonesAdded(message)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should NOT send push notification if payment alert doesnt exist ', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const data: PaymentAlertCreatedPubSubPayload = {
      patientAlertId: 4040404,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, PaymentAlertCreatedSchema))
    await handlerPaymentAlertCreated(message)
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })
  // add test above - as here we have disabled push notification for test (in last test above)

  afterAll(async () => {
    await seeds.destroyPushNotificationSeeds()
    jest.clearAllMocks()
  })
})
