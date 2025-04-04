import {ToolTipDto} from '@apps/emr/milestones/dto/get-milestone-alerts.dto'
import {
  MilestoneItemAlertDto,
  MilestoneStatusLabelDto,
} from '@apps/emr/milestones/dto/milestones-list-response.dto'
import {NestprojectConfigService} from '@libs/common'
import {CommonIconFilepath, MilestoneImageFilepath} from '@libs/common/enums'
import {PatientAlertType} from '@libs/services-common/enums/patient.enum'

export enum PatientMilestoneType {
  ServiceType = 'ServiceType',
  ServiceTypeWithTests = 'ServiceTypeWithTests',
  ServiceGroup = 'ServiceGroup',
  ServiceCategory = 'ServiceCategory',
  PlanSelection = 'PlanSelection',
  PlanReportPeriod = 'PlanReportPeriod',
  ConsentPackage = 'ConsentPackage',
}

export enum PatientMilestoneStatus {
  Upcoming = 'Upcoming',
  Past = 'Past',
}

export enum PatientMilestoneWarningLimit {
  Limit = 25,
}

export enum MilestoneActionType {
  ServiceCategoryBooking = 'ServiceCategoryBooking',
  ServiceGroupBooking = 'ServiceGroupBooking',
  ServiceTypeBooking = 'ServiceTypeBooking',
  ServiceTypeWithTests = 'ServiceTypeWithTests',
  Questionnaire = 'Questionnaire',
  CompleteRequiredActions = 'CompleteRequiredActions',
  MilestoneDetails = 'MilestoneDetails',
  AfterVisitSummary = 'AfterVisitSummary',
  TestResults = 'TestResults',
  PlanSelection = 'PlanSelection',
  PlanReportPeriod = 'PlanReportPeriod',
  PlanDetails = 'PlanDetails',
  Update = 'Update',
  CompleteConsent = 'CompleteConsent',
  ViewConsent = 'ViewConsent',
}

export enum MilestoneRequiredActionTitle {
  ConfirmAppointmentTime = 'Confirm appointment time',
  PaymentRequired = 'Payment Required',
}
export enum MilestoneRequiredActionActionLabel {
  ConfirmAppointment = 'Confirm appointment',
  ReviewAndPay = 'Review And Pay',
}
export const PatientMilestoneTypeToActionType = {
  [PatientMilestoneType.ServiceType]: MilestoneActionType.ServiceTypeBooking,
  [PatientMilestoneType.ServiceGroup]: MilestoneActionType.ServiceGroupBooking,
  [PatientMilestoneType.ServiceCategory]: MilestoneActionType.ServiceCategoryBooking,
  [PatientMilestoneType.ServiceTypeWithTests]: MilestoneActionType.ServiceTypeWithTests,
}

/** Mobile response enum */
export enum MilestoneType {
  Prebook = 'Prebook',
  Virtual = 'Virtual',
  InClinic = 'InClinic',
  PhoneCall = 'PhoneCall',
  Plan = 'Plan',
  PendingPayment = 'PendingPayment',
  Consent = 'Consent',
}

export enum MilestoneLabelType {
  CompleteRequiredActions = 'Required actions',
  AfterVisitSummary = 'After visit summary',
  BookNow = 'Book now',
  Results = 'Results',
  ViewPlan = 'View plan',
  ViewPlans = 'View plans',
  ReportPeriod = 'Report period',
  PlanOutline = 'Plan outline',
  Update = 'Update',
  Details = 'Details',
  ChangeDate = 'Change date',
}

export enum MilestoneTitle {
  SelectPlan = 'Select a plan',
  PlanChosen = 'Plan Chosen',
  DayOneReported = 'Day 1 Reported',
  FirstDayOfPeriod = '1st Day of Period',
  CompleteConsent = 'Complete consent',
  Consent = 'Consent',
  ViewConsent = 'View consent',
}

export enum MilestoneHeading {
  ConsentPackage = 'CONSENT PACKAGE',
}

export enum MilestonePlanHeading {
  BeginYourPlan = 'BEGIN YOUR PLAN',
}

export enum MilestoneStatusLabel {
  Completed = 'Completed',
  ResultsPending = 'ResultsPending',
  ConsentPendingCompletionByPartner = 'ConsentPendingCompletionByPartner',
}

export const MilestoneAlertDescription = new Map<
  PatientAlertType,
  (parameter?: string, countRequiredAction?: number) => string
>([
  [
    PatientAlertType.InvitePartners,
    (): string => 'Invite your partner(s) to sign up and join you on your fertility journey.',
  ],
  [
    PatientAlertType.FertilityIQ,
    (): string => 'Your Fertility IQ results are ready and can be found in the Results tab!',
  ],
  [
    PatientAlertType.EggFreezingReportReleased,
    (): string => 'Your Egg Freezing Report is ready and can be found in the Results tab!',
  ],
  [
    PatientAlertType.EggFreezingReportUpdated,
    (): string => 'Your Egg Freezing Report has been updated  and can be found in the Results tab!',
  ],
  [
    PatientAlertType.CompleteRequiredActions,
    (appointmentName, countRequiredAction = 1): string =>
      `In order to attend your ${appointmentName} appointment, you need to complete ${countRequiredAction} required action.`,
  ],
  [
    PatientAlertType.UploadPhoto,
    (): string => 'Please ensure that you add a profile photo and update your account information.',
  ],
  [
    PatientAlertType.MedicationsCheckout,
    (): string => 'Pay for the medications your doctor prescribed so you can continue your plan.',
  ],
  [
    PatientAlertType.AppointmentCheckout,
    (appointmentName): string =>
      `You must pay for your ${appointmentName} before your appointment time in order to attend. Otherwise, it will be cancelled.`,
  ],
  [
    PatientAlertType.AdhocCheckout,
    (): string =>
      `There’s is a balanced owed on your account. Please review and pay the balance to avoid any potential delays in your fertility journey.`,
  ],
  [
    PatientAlertType.PlanDetails,
    (planTypeName): string =>
      `Your payment has been received and selection of ${planTypeName} plan has been completed`,
  ],
])

export const MilestoneAlertTitle = new Map<PatientAlertType, string>([
  [PatientAlertType.InvitePartners, 'Invite your partner'],
  [PatientAlertType.CompleteRequiredActions, 'Complete required actions'],
  [PatientAlertType.Questionnaire, 'Complete Patient Intake'],
  [PatientAlertType.UploadPhoto, 'Complete your profile details'],
  [PatientAlertType.MedicationsCheckout, 'Please pay for medications'],
  [PatientAlertType.AppointmentCheckout, 'Please pay for your appointment'],
  [PatientAlertType.AdhocCheckout, 'Payment is needed'],
  [PatientAlertType.FertilityIQ, 'Check Out Your Fertility IQ'],
  [PatientAlertType.EggFreezingReportReleased, 'Check Out Your Egg Freezing Report'],
  [PatientAlertType.EggFreezingReportUpdated, 'Check Out Your Updated Egg Freezing Report'],
  [PatientAlertType.PlanDetails, 'Plan Selection Successful'],
])

export const MilestoneAlertCanDismiss = new Map<PatientAlertType, boolean>([
  [PatientAlertType.InvitePartners, true],
  [PatientAlertType.FertilityIQ, true],
  [PatientAlertType.EggFreezingReportReleased, true],
  [PatientAlertType.EggFreezingReportUpdated, true],
  [PatientAlertType.PlanDetails, true],
  [PatientAlertType.CompleteRequiredActions, false],
  [PatientAlertType.Questionnaire, false],
  [PatientAlertType.UploadPhoto, false],
  [PatientAlertType.MedicationsCheckout, false],
  [PatientAlertType.AppointmentCheckout, false],
  [PatientAlertType.AdhocCheckout, false],
])

export const MilestoneAlertActionLabel = new Map<PatientAlertType, string>([
  [PatientAlertType.InvitePartners, 'Send invitations'],
  [PatientAlertType.CompleteRequiredActions, 'View details'],
  [PatientAlertType.UploadPhoto, 'Complete profile'],
  [PatientAlertType.MedicationsCheckout, 'Pay for medications'],
  [PatientAlertType.AppointmentCheckout, 'Pay for your appointment'],
  [PatientAlertType.AdhocCheckout, 'Review & pay'],
  [PatientAlertType.FertilityIQ, 'View Fertility IQ'],
  [PatientAlertType.EggFreezingReportReleased, 'View Egg Freezing Report'],
  [PatientAlertType.EggFreezingReportUpdated, 'View Egg Freezing Report'],
  [PatientAlertType.PlanDetails, 'View Plan Details'],
])

export enum MilestoneAlertActionLabelQuestionnaire {
  Continue = 'Continue Intake',
  Complete = 'Complete Intake',
}

export enum MilestoneAlertDescriptionQuestionnaire {
  Complete = 'Please complete your patient intake form in order to get a personlized treatment plan.',
}

export enum MilestoneDetailsLabel {
  Details = 'Details',
  LearnMore = 'Learn More',
}

export const MilestoneAlertToolTip = new Map<PatientAlertType, ToolTipDto>([
  [
    PatientAlertType.InvitePartners,
    {
      title: 'Invite from the Account Tab',
      description:
        'If you change your mind, you can invite people to be your partner at any time from your account.',
    },
  ],
])
export enum DefaultMilestoneUserType {
  User = 'User',
  Partner = 'Partner',
}

export enum MilestoneDescriptionIconType {
  Location = 'Location',
  Info = 'Info',
  Phone = 'Phone',
}

export enum MilestoneActionIconType {
  Arrow = 'Arrow',
}

const configService = NestprojectConfigService.getInstance()

const assetsURL = configService.get<string>('STATIC_ASSETS_BUCKET_URL')

export const MilestoneDescriptionIconURL = new Map<MilestoneDescriptionIconType, string>([
  [MilestoneDescriptionIconType.Info, assetsURL + CommonIconFilepath.Info],
])

export const MilestoneActionIconURL = new Map<MilestoneActionIconType, string>([
  [MilestoneActionIconType.Arrow, assetsURL + CommonIconFilepath.Arrow],
])

export enum MilestoneDescription {
  SelectPlanSingle = 'Based on what you discussed with your doctor, they put together a plan for you to follow.',
  SelectPlanMultiple = 'Based on what you discussed with your doctor, they put together some plans to choose from.',
  Report1stDayOfPeriod = 'As soon as your next period starts, report it here. Keep in mind that spotting does not count as your day 1. Once reported, within 24-48 hours, you will be booked in for your baseline testing appointment.',
  WireTransfer = 'Your plan is pending payment via Wire Transfer. You can make changes if needed.',
  ConsentPackage = `Please review this consent, answer any included questions and provide a signature.`,
}

export enum MilestoneDescriptionType {
  SelectPlanCountdown = 'SelectPlanCountdown',
}

const hoursCountDown = configService.get<number>('PLAN_SELECTION_TIME')

export const countDownHoursPlanSelectLabel = `Select within <strong>${hoursCountDown} hrs</strong> to secure a plan`

export const MilestoneDescriptionAlertMap = new Map<
  MilestoneDescriptionType,
  MilestoneItemAlertDto
>([
  [
    MilestoneDescriptionType.SelectPlanCountdown,
    {
      title: 'What is the countdown for?',
      description:
        `The plans created for you have been reserved in our clinic calendars in order to best support you and your journey. Please recommend to choose a plan within the next 48 hours so we can begin your treatment care without delay.\n ` +
        `If you feel you are not ready to begin your journey — that’s ok too!  These plans will still be here when you are ready to proceed.\n ` +
        `If you have any additional questions, please contact your Care Team and they will facilitate any next steps that are required.`,
      iconURL: MilestoneDescriptionIconURL.get(MilestoneDescriptionIconType.Info),
    },
  ],
])

export const PastPlanMilestoneTitle = new Map<PatientMilestoneType, string>([
  [PatientMilestoneType.PlanSelection, MilestoneTitle.PlanChosen],
  [PatientMilestoneType.PlanReportPeriod, MilestoneTitle.DayOneReported],
])

export const PlanMilestoneHeading = new Map<PatientMilestoneType, (attr?: string) => string>([
  [PatientMilestoneType.PlanSelection, (): string => MilestonePlanHeading.BeginYourPlan],
  [PatientMilestoneType.PlanReportPeriod, (attr: string): string => attr?.toUpperCase() ?? ''],
])

export const statusLabelForMilestoneMap = new Map<MilestoneStatusLabel, MilestoneStatusLabelDto>([
  [
    MilestoneStatusLabel.Completed,
    {title: 'Completed', textColor: '#FFFFFF', backgroundColor: '#447A79'},
  ],
  [
    MilestoneStatusLabel.ResultsPending,
    {title: 'Results Pending', textColor: '#FFFFFF', backgroundColor: '#D69532'},
  ],
  [
    MilestoneStatusLabel.ConsentPendingCompletionByPartner,
    {title: 'Pending completion by partner', textColor: '#FFFFFF', backgroundColor: '#D69532'},
  ],
])

export const MilestoneImageURLMap = new Map<PatientMilestoneType, string>([
  [PatientMilestoneType.PlanReportPeriod, assetsURL + MilestoneImageFilepath.PlanReportPeriod],
  [PatientMilestoneType.PlanSelection, assetsURL + MilestoneImageFilepath.PlanSelection],
])
