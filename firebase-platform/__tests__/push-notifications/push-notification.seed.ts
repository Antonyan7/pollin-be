import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AppointmentStatus} from '@libs/common/enums'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {LabInfo, TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {SexAtBirth, TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientPlan, PlanCategory, PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {QuestionnaireJourneyMilestone} from '@libs/data-layer/apps/questionnaires/enums/questionnaire-enums'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  CloudTask,
  CloudTaskType,
} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {
  Patient,
  PatientAlert,
  PatientPushNotification,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {MilestoneStep, PatientAlertType} from '@libs/services-common/enums'
import {CloudTaskSeed} from '@seeds/firestore/cloud-task.seed'
import {
  AppointmentSeed,
  LabInfoSeed,
  PatientAlertSeed,
  PatientMilestoneSeed,
  PatientPlanSeed,
  PatientPushNotificationSeed,
  PatientSeed,
  PlanCategorySeed,
  PlanTypeSeed,
  QuestionnaireSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  TestResultSeed,
  PatientReportSeed,
  ReportTypeSeed,
  PatientPlanStatusSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {v4} from 'uuid'
import {JourneyType} from '@libs/services-common/enums'
import {PatientReport, ReportType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ReportTypeCategory} from '@libs/data-layer/apps/clinic-test/enums'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const patientId = 999900909
export const patientIntakeCompletedId = 999900911
export const patientMilestoneId = 99990088
export const serviceProviderId = 999900909
export const appointmentId = 999900909
export const patientIntakeCompletedAppointmentId = 999900911
export const serviceTypeId = 999900909
export const patientAlertId = 999900909
export const patientPushNotificationId = 999900909
export const patientIntakeCompletedPushNotificationId = 999900911
export const patientPushNotificationIdFOrPartner = 999900908
export const feedbackPatientId = 999900912
export const feedbackAppointmentId = 999900922
export const patientAlertUUID = v4()

export const patientData: Partial<Patient> = {
  id: patientId,
  uuid: 'd07dfb65-d420-440f-9727-8431114a00ce',
  authUserId: 'CF_TEST_AUTH_ID_PUSH_NOTIF',
  firstName: 'CF_TEST_NAME_PUSH_NOTIF',
  lastName: 'CF_TEST_LAST_NAME_PUSH_NOTIF',
  middleName: 'CF_TEST_MIDDLE_NAME_PUSH_NOTIF',
}

export const patientFeedbackData: Partial<Patient> = {
  id: feedbackPatientId,
  uuid: '371104a6-53ba-4c4a-9fca-e5ff2e5c95a6',
  authUserId: 'CF_TEST_AUTH_ID_PUSH_NOTIF_FEEDBACK',
  firstName: 'CF_TEST_NAME_PUSH_NOTIF_FEEDBACK',
  lastName: 'CF_TEST_LAST_NAME_PUSH_NOTIF_FEEDBACK',
  middleName: 'CF_TEST_MIDDLE_NAME_PUSH_NOTIF_FEEDBACK',
}

export const oldPatientFeedbackData: Partial<Patient> = {
  id: feedbackPatientId + 1,
  uuid: '11876a55-7f4d-4bac-9d53-41aac8baf05d',
  authUserId: 'CF_TEST_AUTH_ID_PUSH_NOTIF_FEEDBACK',
  firstName: 'CF_TEST_NAME_PUSH_NOTIF_FEEDBACK',
  lastName: 'CF_TEST_LAST_NAME_PUSH_NOTIF_FEEDBACK',
  middleName: 'CF_TEST_MIDDLE_NAME_PUSH_NOTIF_FEEDBACK',
}

export const patientDataIntakeIsCompleted: Partial<Patient> = {
  id: patientIntakeCompletedId,
  authUserId: 'CF_TEST_AUTH_ID_PUSH_NOTIF_COMPLETED',
  firstName: 'CF_TEST_NAME_PUSH_NOTIF_COMPLETED',
  lastName: 'CF_TEST_LAST_NAME_PUSH_NOTIF_COMPLETED',
  middleName: 'CF_TEST_MIDDLE_NAME_PUSH_NOTIF_COMPLETED',
  currentJourneyType: JourneyType.ShowAppointments,
}

export const partnerData: Partial<Patient> = {
  id: 999900910,
  authUserId: 'partner_push_notification',
  sexAtBirth: SexAtBirth.Male,
}

export const questionnaireData: Partial<Questionnaire> = {
  id: 999900910,
  journeyMilestone: QuestionnaireJourneyMilestone.PatientIntakeMale,
  uuid: 'questionnaire-uuid',
}

export const planCategoryData: Partial<PlanCategory> = {
  id: 999900910,
}

export const planTypeData: Partial<PlanType> = {
  id: 999900910,
  title: 'IVF',
  planCategoryId: planCategoryData.id,
  patientPlanStatusId: patientPlanStatusFixture.id,
}

export const patientPlanData: Partial<PatientPlan> = {
  id: 999900910,
  planTypeId: planTypeData.id,
  patientId: patientData.id,
}

export const initialConsAppointmentData: Partial<Appointment> = {
  id: appointmentId,
  uuid: v4(),
  status: AppointmentStatus.Booked,
  patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  milestoneStep: MilestoneStep.InitialConsultation, //indicates Initial consultation
}

export const initialConsAppointmentForFeedbackData: Partial<Appointment> = {
  id: feedbackAppointmentId,
  uuid: v4(),
  status: AppointmentStatus.Booked,
  patientId: feedbackPatientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  milestoneStep: MilestoneStep.InitialConsultation, //indicates Initial consultation
}

export const initialConsAppointmentIntakePatientData: Partial<Appointment> = {
  id: patientIntakeCompletedAppointmentId,
  uuid: v4(),
  status: AppointmentStatus.Booked,
  patientId: patientIntakeCompletedId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  milestoneStep: MilestoneStep.InitialConsultation, //indicates Initial consultation
}
export const initialConsAppointmentCancelledData: Partial<Appointment> = {
  id: appointmentId + 1,
  uuid: v4(),
  status: AppointmentStatus.Cancelled,
  patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 2),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 1),
  milestoneStep: MilestoneStep.InitialConsultation, //indicates Initial consultation
}

export const patientPushNotificationData: Partial<PatientPushNotification> = {
  id: patientPushNotificationId,
  patientId: patientId,
  registrationToken: 'PatientPushNotifiationTokenCfTest',
  pushNotificationsEnabled: true,
}

export const patientIntakeCompletedPushNotificationData: Partial<PatientPushNotification> = {
  id: patientIntakeCompletedPushNotificationId,
  patientId: patientIntakeCompletedId,
  registrationToken: 'PatientIntakeCompletedPushNotifiationTokenCfTest',
  pushNotificationsEnabled: true,
}

export const patientPushNotificationForPartnerData: Partial<PatientPushNotification> = {
  id: patientPushNotificationIdFOrPartner,
  patientId: partnerData.id,
  registrationToken: 'PatientPushNotifiationTokenCfTestForPartner',
  pushNotificationsEnabled: true,
}
export const patientPushNotificationForFeedbackData: Partial<PatientPushNotification> = {
  id: 92099199,
  patientId: feedbackPatientId,
  registrationToken: 'PatientFeedbackCF',
  pushNotificationsEnabled: true,
}

export const patientAlertData: Partial<PatientAlert> = {
  id: patientAlertId,
  uuid: patientAlertUUID,
  appointmentId,
  patientId,
  type: PatientAlertType.AppointmentCheckout,
}

const serviceTypeData = {
  id: serviceTypeId,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  minimumHoursRequired: 1,
  price: 100,
}

export const patientMilestoneData = {
  id: patientMilestoneId,
  patientId: patientData.id,
  uuid: 'patient-milestone',
}
export const patientReportType: Partial<ReportType> = {
  id: 1,
  uuid: 'dcadd05c-97a8-4721-9a6d-5fd9cdf60348',
  category: ReportTypeCategory.FertilityIQ,
  heading: 'heading',
  title: 'title',
  intoTitle: 'intoTitle',
  introDescription: 'introDescription',
  iconURL: 'iconURL',
  backgroundImageURL: 'backgroundImageURL',
}
export const patientReport: Partial<PatientReport> = {
  id: 1,
  uuid: '68a7a9f6-b8aa-4723-9e08-f6162dc82cdc',
  reportTypeId: patientReportType.id,
  patientId: patientData.id,
}
export const patientMilestoneLatestData = {
  id: patientMilestoneId + 1,
  patientId: patientData.id,
  uuid: 'patient-milestone-latest',
}
export const patientMilestonePlanData = {
  id: patientMilestoneId + 2,
  patientId: patientData.id,
  uuid: 'patient-milestone-plan',
  patientPlanId: patientPlanData.id,
}

export const cloudTaskReminderPatientIntake: Partial<CloudTask> = {
  id: 'cloudTaskReminderPatientIntake',
  patientId,
  cloudTaskId: 'cloudTaskReminderPatientIntake',
  type: CloudTaskType.PatientIntakeNotificationReminder,
}
export const cloudTaskReminderPartnerIntake: Partial<CloudTask> = {
  id: 'cloudTaskReminderPartnerIntake',
  patientId,
  cloudTaskId: 'cloudTaskReminderPartnerIntake',
  type: CloudTaskType.PartnerIntakeNotificationReminder,
}

export const cloudTaskReminderToInvitePartner: Partial<CloudTask> = {
  id: 'cloudTaskReminderToInvitePartner',
  patientId,
  cloudTaskId: 'cloudTaskReminderToInvitePartner',
  type: CloudTaskType.PartnerInvitationNotificationReminder,
}

export const labInfoData: Partial<LabInfo> = {
  id: 1,
  uuid: '44f27fe8-e880-4a70-b771-6ca5c4bcaab4',
  name: 'Lab',
  location: 'Location',
  phone: 'phone',
}

export const testResultReleasedData: Partial<TestResult> = {
  id: 777,
  uuid: '77727fe8-e880-4a70-b771-6ca5c4bcaabe',
  patientId: patientData.id,
  status: TestResultStatus.Released,
  labId: labInfoData.id,
  releasedOn: dateTimeUtil.now(),
  orderingPhysicianId: serviceProviderId,
}

export const testResultNotReleasedData: Partial<TestResult> = {
  id: 778,
  uuid: '77827fe8-e880-4a70-b771-6ca5c4bcaabe',
  patientId: patientData.id,
  status: TestResultStatus.Reviewed,
  labId: labInfoData.id,
  reviewedOn: dateTimeUtil.now(),
  orderingPhysicianId: serviceProviderId,
}

export const createPushNotificationSeeds = async (): Promise<void> => {
  const dataSource = await getCreateDatabaseConnection()
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)
  const patientAlertSeed = new PatientAlertSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
  const questionnaireSeed = new QuestionnaireSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const labSeed = new LabInfoSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const patientReportSeed = new PatientReportSeed(dataSource)
  const reportTypeSeed = new ReportTypeSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)

  await patientPlanStatusSeed.create(patientPlanStatusFixture)

  await planCategorySeed.create(planCategoryData)
  await Promise.all([
    patientSeed.createArray([
      patientData,
      partnerData,
      patientDataIntakeIsCompleted,
      patientFeedbackData,
    ]),
    planTypeSeed.create(planTypeData),
    questionnaireSeed.create(questionnaireData),
  ])
  await serviceProviderSeed.createArray([
    {
      id: serviceProviderId,
    },
  ])
  await superTypeSeed.create(superTypeOtherFixture)
  await serviceTypeSeed.create(serviceTypeData)

  await Promise.all([
    appointmentSeed.createArray([
      initialConsAppointmentData,
      initialConsAppointmentCancelledData,
      initialConsAppointmentIntakePatientData,
      initialConsAppointmentForFeedbackData,
    ]),
    patientPlanSeed.create(patientPlanData),
  ])
  await patientPushNotificationSeed.createArray([
    patientPushNotificationData,
    patientPushNotificationForPartnerData,
    patientIntakeCompletedPushNotificationData,
    patientPushNotificationForFeedbackData,
  ])
  await Promise.all([
    patientAlertSeed.create(patientAlertData),
    patientMilestoneSeed.createArray([
      patientMilestoneData,
      patientMilestoneLatestData,
      patientMilestonePlanData,
    ]),
    reportTypeSeed.create(patientReportType),
  ])

  await patientReportSeed.create(patientReport)
  await labSeed.create(labInfoData)
  await testResultSeed.create(testResultReleasedData)
  await testResultSeed.create(testResultNotReleasedData)
}

export const destroyPushNotificationSeeds = async (): Promise<void> => {
  const dataSource = await getCreateDatabaseConnection()
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)
  const patientAlertSeed = new PatientAlertSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
  const questionnaireSeed = new QuestionnaireSeed(dataSource)
  const cloudTaskSeed = new CloudTaskSeed()
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const labSeed = new LabInfoSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)

  await Promise.all([
    cloudTaskSeed.deleteByPatientId(patientData.id),
    cloudTaskSeed.deleteByPatientId(partnerData.id),
    questionnaireSeed.removeQuestionnaireById(questionnaireData.id),
    patientAlertSeed.removeByIds([patientAlertId]),
    patientPushNotificationSeed.removeByIds([
      patientPushNotificationId,
      patientIntakeCompletedPushNotificationId,
    ]),
    patientMilestoneSeed.removeByPatientIds([patientData.id]),
  ])
  await Promise.all([
    appointmentSeed.removeByIds([
      appointmentId,
      initialConsAppointmentCancelledData.id,
      patientIntakeCompletedAppointmentId,
    ]),
    patientPlanSeed.removeByIds([patientPlanData.id]),
  ])
  await Promise.all([
    patientSeed.removeByIds([
      patientId,
      partnerData.id,
      patientIntakeCompletedId,
      feedbackPatientId,
    ]),
    planTypeSeed.removeById(planTypeData.id),
  ])

  await planCategorySeed.removeById(planCategoryData.id)
  await testResultSeed.removeByIds([testResultReleasedData.id, testResultNotReleasedData.id])
  await labSeed.removeByIds([labInfoData.id])
  await superTypeSeed.removeByIds([superTypeOtherFixture.id])

  await patientPlanStatusSeed.removeById(patientPlanStatusFixture.id)
}
