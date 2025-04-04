export const authEmailNotBelongsToUserFixture: string = 'fhealthdev+NestprojectTestDifferent@gmail.com'
/** all variables need to add into firebase-auth.adapter.ts (a few times) */

class PhoneMultiFactorInfo {
  uid?: string
  factorId?: string
  displayName?: string
  enrollmentTime?: string
  phoneNumber?: string
}

class MultiFactor {
  enrolledFactors: PhoneMultiFactorInfo[]
}

export class AuthUser {
  uid: string
  email: string
  sessionCookie: string
  idToken: string
  multiFactor?: MultiFactor
  email_verified?: boolean
  name?: string
  staffId?: number
  staffUUID?: string
}

// need to set null for each to use getOwnPropertyNames below
// NOT null - for specific cases , which not have data or declared in setAuthUserFixtureFoSpecificCases
class AuthUserData {
  basic: AuthUser = null
  emailVerified: AuthUser = null
  emailVerifiedOther: AuthUser = null
  emailNotVerified: AuthUser = null
  verifyOtpEmailNotVerified: AuthUser = null
  notFoundAuth: Partial<AuthUser> // NOT null -specific cases
  notFoundInDB: AuthUser = null
  questionnaireController: AuthUser = null
  questionnaireJustController: AuthUser = null
  questionnaireOhipValidation: AuthUser = null
  questionnaireInvalidOhip: AuthUser = null
  questionnaire: AuthUser = null
  questionnaireDeletePrevIntents: AuthUser = null
  cart: AuthUser = null
  initialConsultationConstraint: AuthUser = null
  cartConfirm: AuthUser = null
  cartConfirmV2: AuthUser = null
  cartConfirmRevisions: AuthUser = null
  cartUpdatePatientMaleSexAtBirth: AuthUser = null
  cartUpdatePatientFemaleSexAtBirth: AuthUser = null
  cartUpdatePatientMaleSexAtBirthV2: AuthUser = null
  cartUpdatePatientFemaleSexAtBirthV2: AuthUser = null
  cartPatientDoesntHaveSexAtBirth: AuthUser = null
  journeyBlocked: AuthUser = null
  clinicScheduling: AuthUser = null
  serviceCategory: AuthUser = null
  serviceCategoryBookingIntentNotFound: AuthUser = null
  serviceProvider: AuthUser = null
  bookingIntent: AuthUser = null
  bookingFlowWithServiceType: AuthUser = null
  bookingFlowWithServiceGroup: AuthUser = null
  bookingFlowWithoutCategoryItem: AuthUser = null
  appointment: AuthUser = null
  availability: AuthUser = null
  availabilityNextDayUtc: AuthUser = null
  partnerIntakeJourneyType: AuthUser = null
  showAppointmentsJourneyType: AuthUser = null
  questionnaireWithAnswers: AuthUser = null
  journey: AuthUser = null
  clean: AuthUser = null
  testResult: AuthUser = null
  careProviders: AuthUser = null
  bookingFlow: AuthUser = null
  patientDefaultMilestone: AuthUser = null
  userType: AuthUser = null
  milestoneDetails: AuthUser = null
  milestoneRequiredActionProlonged: AuthUser = null
  milestone: AuthUser = null
  questionnaireFlowDetails: AuthUser = null
  twoPartnerInvintations: AuthUser = null
  constraintServiceTypes: AuthUser = null
  emailVerifiedWithoutMFA: AuthUser = null
  sendIntakeReminder: AuthUser = null
  partnerInvitationAccept: AuthUser = null
  partnersCount: AuthUser = null
  prescriptions: AuthUser = null
  cartWithExistingMilestone: AuthUser = null
  updateEmail: AuthUser = null
  contactInformationAuthUserId: AuthUser // NOT null - specific cases
  female: AuthUser = null
  contactUs: AuthUser = null
  partner: AuthUser = null
  plans: AuthUser = null
  createPlans: AuthUser = null
  pushPlanMilestone: AuthUser = null
  pushAppointmentMilestone: AuthUser = null
  partnerIcForm: AuthUser = null
  pushPaymentAlert: AuthUser = null
  bookedAppointmentCart: AuthUser = null
  profileDoctors: AuthUser = null
  profileTestResultHistory: AuthUser = null
  pushNotification: AuthUser = null
  profileServiceTypeWithTests: AuthUser = null
  profileForBookingTestsTypes: AuthUser = null
  paymentFailTest: AuthUser = null
  multipleCartItemsPaymentTest: AuthUser = null
  partnerForPlan: AuthUser = null
  ohipCoveredAppoinitments: AuthUser = null
  notOhipCoveredAppoinitments: AuthUser = null
  planSelectionDetails: AuthUser = null
  acknowledgedMedications: AuthUser = null
  createDrugBank: AuthUser = null
  appointmentWithTestOrder: AuthUser = null
  ultrasound: AuthUser = null //has stuff permission
  ultrasoundDay3: AuthUser = null //has stuff permission
  ultrasoundWithNotActivePlan: AuthUser = null //has stuff permission
  unreadTasksCount: AuthUser = null
  ultrasoundInlatestTestResult: AuthUser = null //has stuff permission
  ultrasoundSignOffInStimSHeet: AuthUser = null //has stuff permission
  confirmFail: AuthUser = null
  mensturalConstraint: AuthUser = null
  bookingFlowDetails: AuthUser = null
  cartConfirmSuccess: AuthUser = null
  cartConfirmFails: AuthUser = null
  bookAppointment: AuthUser = null
  cartConfirmThreeCases: AuthUser = null
  partnerInvitationValidation: AuthUser = null
  serviceTypeSecondExtra: AuthUser = null
  cartNotFound: AuthUser = null
  cartConfirmServiceType: AuthUser = null
  bookingForSpecificDates: AuthUser = null
  specimenDetails: AuthUser = null
  partnerSpecimenDetails: AuthUser = null
  spermCryoList: AuthUser = null
  spermCryoMainPatient: AuthUser = null
  spermCryoPartner: AuthUser = null
  taskReassign: AuthUser = null
  patientPendingInvitation: AuthUser = null
  planCart: AuthUser = null
  profileAppointment: AuthUser = null
  patientForFreeServices: AuthUser = null
  patientForNotTaxableServices: AuthUser = null
  patientForBookingTests: AuthUser = null
  eppPlan: AuthUser = null
  patientForCheckServiceImageUrlServices: AuthUser = null
  createPatientAndAppointmentWeb: AuthUser = null //has stuff permission
  billingSubmission: AuthUser = null
  milestoneRequiredAction: AuthUser = null
  getSpecimenList: AuthUser = null
  withoutDetail: AuthUser = null
  updatePlans: AuthUser = null
  planTypes: AuthUser = null
  patientForAdhocPayment: AuthUser = null
  plansV2: AuthUser = null
  plansV3: AuthUser = null
  acuityWebhookCfToCreateAppOnOurEnd: AuthUser = null
  rescheduleAcuityAppointment: AuthUser = null
  cancelAcuityAppointment: AuthUser = null
  patientWithoutAcuityAppointments: AuthUser = null
  updatedPatientContactInformationForAcuity: AuthUser = null
  plansV2Partner: AuthUser = null
  pushPlanMilestoneV2: AuthUser = null
  cartPlansV2: AuthUser = null
  planMilestones: AuthUser = null
  acuityWebhookPatientExistNoIC: AuthUser = null
  acuityWebhookPatientExistWithIC: AuthUser = null
  acuityPatientAlreadyExist: AuthUser = null
  acuityWebhookPatientExistDiffName: AuthUser = null
  patientIntake: AuthUser = null
  patientForIVFTasks2: AuthUser = null
  patientWithSinglePlan: AuthUser = null
  ivfPatientFemale: AuthUser = null
  ivfPatientMale: AuthUser = null
  ivfPatientForCompletionMale: AuthUser = null
  ivfPatientForCompletionEggFreezingMale: AuthUser = null
  mobileIvfPatient: AuthUser = null
  nonIvfPatient: AuthUser = null

  authForCompletedPatientIntake: AuthUser = null
  authForCheckedInPatientIntake: AuthUser = null
  authForFinalizingInProgressInPatientIntake: AuthUser = null
  authForFinalizedPatientIntake: AuthUser = null
  authForV1FinalizedPatientIntake: AuthUser = null
  authUserPatientIntakeQuestionnaire: AuthUser = null
  authForCheckedInWithoutQuestionnaireIntentPatientIntake: AuthUser = null

  plansV2cartWithAddons: AuthUser = null
  authForAvoidDuplicatedPayment: AuthUser = null
  plansV2cartWithTestTypes: AuthUser = null
  authForQuestionnaireNotChangedRevision: AuthUser = null
  authForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture: AuthUser = null
  authForPatientWithNotStartedPatientIntakeFixture: AuthUser = null
  authPatientIntakeRevisionStatusFixture: AuthUser = null
  authPatientWithNotCompletedPatientIntakeV1: AuthUser = null
  authPatientForSkipUpdatingPatientIntakeStatusForV1WhenUpdatedAppStatusFixture: AuthUser = null
  authPatientForPartnerAcceptedForPartnerIntakeUpdateFixture: AuthUser = null
  authPatientForPartnerDeclinedForPartnerIntakeUpdateFixture: AuthUser = null
  primingWorksheet: AuthUser = null
  authForPatientAppointmentTestResults: AuthUser = null
  initializeCustomer: AuthUser = null
  cartConfirmSplitPaymentV2: AuthUser = null
  cartConfirmSplitPaymentV2Success: AuthUser = null
  cartConfirmSplitPaymentFailedV2: AuthUser = null
  cartConfirmWireTransferV2: AuthUser = null
  splitPaymentHistoryV2: AuthUser = null
  authContactInformation: AuthUser = null
  authPatientUpdate: AuthUser = null
  authUpdateOhipAvailability: AuthUser = null
  authChatToken: AuthUser = null
  ohipCoveredCartConfirmSplitPaymentV2: AuthUser = null
  authPatientWithOhipAvailUnknown: AuthUser = null
  authPendingPaymentListForOhipYes: AuthUser = null
  authPendingPaymentListForOhipNo: AuthUser = null
  cartConfirmWithUpdatedPricesNoOhip: AuthUser = null
  cartConfirmUpdatedOrders: AuthUser = null
  thyroidProtocolWorksheet: AuthUser = null
  planWireTransfer: AuthUser = null
  patientReports: AuthUser = null
  femalePatientReports: AuthUser = null
  authPatientIntakeRevisionChangesForMovedQuestion: AuthUser = null
  authKeepSlotBusy: AuthUser = null
  patientForRevisions: AuthUser = null
  authForCHeckInAppMetadataUpdatedFIxture: AuthUser = null
  authEmailNotVerifiedAcuityCrossRegistration: AuthUser = null
  ultrasoundDetail: AuthUser = null
  authUserForCheckIn: AuthUser = null
  inProgressAppointmentUser: AuthUser = null
  authUserForLibraryContent: AuthUser = null
  authUserForLibraryContentWithTestOrder: AuthUser = null
  authUserForFeedback: AuthUser = null
  authUserForPartnerManage: AuthUser = null
  authUserForPatientPartnerInvitation: AuthUser = null
  authUserForPatientPartnerInvitationValidate: AuthUser = null
  authUserToUpdateEmailOnCF: AuthUser = null
  authUserForNotExistPatient: AuthUser = null
  patientForArchivedAdhocPayment: AuthUser = null
  patientSoftDeleted: AuthUser = null
  authForConsentMobile: AuthUser = null
  authForConsentPartnerMobile: AuthUser = null
  authUserForDiscardDish: AuthUser = null
  authForConsentQuestionnaire: AuthUser = null
  authForConsentQuestionnairePartner: AuthUser = null
  authForConsentSignMobile: AuthUser = null
  authForConsentSignPartnerMobile: AuthUser = null
  patientForLinkedItemAdhocCheckout: AuthUser = null
  ivfPatientStrawNumberFemale: AuthUser = null
  authUserForPaymentMethods: AuthUser = null
}

function setAuthUserFixtureFoSpecificCases(): void {
  AuthUserFixture.notFoundAuth = {
    email: 'fhealthdev+authNotFound@gmail.com',
    sessionCookie: 'auth-not-found',
    idToken: 'auth-not-found',
  }

  AuthUserFixture.contactInformationAuthUserId = {
    uid: 'id-contact-information',
    email: 'fhealthdev+contactInfoEmail@gmail.com',
    sessionCookie: 'update-email-session',
    idToken: 'update-email-id-token',
    multiFactor: {
      enrolledFactors: [
        {
          factorId: 'phone',
          phoneNumber: '+14092841029',
        },
      ],
    },
  }

  AuthUserFixture.cartConfirmThreeCases = {
    uid: 'id-cart-confirm-3-cases',
    email: 'fhealthdev+cartConfirm3Cases@gmail.com',
    sessionCookie: 'cart-confirm-3-cases-session',
    idToken: 'cart-confirm-3-cases-id-token',
    multiFactor: {
      enrolledFactors: [
        {
          factorId: 'phone',
          phoneNumber: '+1(409) 284-1029',
        },
      ],
    },
  }

  AuthUserFixture.partnerInvitationAccept = {
    uid: 'id-partner-invitation-accept',
    email: 'fhealthdev+partnerInvitationAccept@gmail.com',
    sessionCookie: 'partner-invitation-accept-session',
    idToken: 'partner-invitation-accept-id-token',
    multiFactor: {
      enrolledFactors: [
        {
          factorId: 'phone',
          phoneNumber: '+1(409) 384-2029',
        },
      ],
    },
  }
}

export const AuthUserFixture: Partial<AuthUserData> = {}

export const allAuthUserFixtures: AuthUser[] = []
function createAndFillAuthUserFixture(): void {
  // 1. Set values into AuthUserFixture first
  const instanceOfClass: AuthUserData = new AuthUserData()
  const authUserDataProperties: string[] = Object.getOwnPropertyNames(instanceOfClass)

  // eslint-disable-next-line @typescript-eslint/typedef
  for (let index = 0; index < authUserDataProperties.length; index++) {
    const authUserDataProperty: string = authUserDataProperties[index]

    AuthUserFixture[authUserDataProperty] = {
      uid: `id-${authUserDataProperty}-fixture`,
      email: `fhealthdev+${authUserDataProperty}@gmail.com`,
      sessionCookie: `${authUserDataProperty}-session`,
      idToken: `${authUserDataProperty}-token`,
    } as AuthUser
  }

  setAuthUserFixtureFoSpecificCases()

  // 2. Move AuthUserFixture into allAuthUserFixtures to use in firebaseAuthAdapter later
  for (const i in AuthUserFixture) {
    const authUser: AuthUser = AuthUserFixture[i] as AuthUser
    allAuthUserFixtures.push(authUser)
  }
}

createAndFillAuthUserFixture()

class JWT {
  valid?: string
  userNotFound?: string
}

class JWTData {
  passwordReset: JWT
  passwordResetMultiUseToken: JWT
  invalid: string
}

export const JWTFixture: JWTData = {
  passwordReset: {
    valid: 'jwt-token-for-password-reset',
    userNotFound: 'jwt-auth-user-not-found-password-reset',
  },
  passwordResetMultiUseToken: {
    valid: 'jwt-invalid-token-multi-use-token',
  },
  invalid: 'jwt-invalid-token',
}
