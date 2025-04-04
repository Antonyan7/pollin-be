import {PatientDetail} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  CurrentStressLevel,
  Gender,
  PreferredPronouns,
  SexualOrientation,
} from '@libs/services-common/enums/patient.enum'
import {
  cartConfirmBookAppointmentPaymentDetailIdFixtureId,
  cartConfirmFailsPaymentDetailIdFixtureId,
  cartConfirmPaymentDetailIdFixture,
  cartConfirmPaymentDetailV2IdFixture,
  cartConfirmSuccessPaymentDetailIdFixtureId,
  cartConfirmThreeCasesDetailIdFixtureId,
  cartPatientDetailDoesntHaveSexAtBirth,
  cartPatientDetailIdFixture,
  cartPatientUpdateFemaleSexAtBirthDetailIdFixture,
  cartPatientUpdateFemaleSexAtBirthDetailIdV2Fixture,
  cartPatientUpdateMaleSexAtBirthDetailIdFixture,
  cartPatientUpdateMaleSexAtBirthDetailIdV2Fixture,
  detailForPatientOverviewFemaleDetailIdFixture,
  detailForPatientOverviewMaleDetailIdFixture,
  detailForPatientOverviewTransgenderMaleDetailIdFixture,
  detailIdForQuestionnaireRevisionNotChangedFixture,
  partnerDetailForHighlightId,
  partnerIntakeJourneyTypeDetailIdFixture,
  partnerPatientForProfileTestResultsDetailIdFixture,
  patientAppointmentDetailIdFixture,
  patientClinicSchedulingDetailIdFixture,
  patientDetailForGetContactInfoIdFixture,
  patientDetailIdCartConfirmRevisionsFixture,
  patientDetailIdInitialConsultationConstraintFixture,
  patientEmailNotVerifiedDetailIdFixture,
  patientEmailVerifiedDetailIdFixture,
  patientEmailVerifiedOtherDetailIdFixture,
  patientForBackgroundInformationDetailIdFixture,
  patientForFemaleIcFormDetailIdFixture,
  patientForGeneralHealthDetailIdFixture,
  patientForMaleIcFormDetailIdFixture,
  patientForPrescriptionFileCreationDetailIdFixture,
  patientForProfileHighlightDetailIdFixture,
  patientForProfileTestResultsDetailIdFixture,
  patientForTestResultAuthDetailIdFixture,
  patientJourneyBlockedDetailIdFixture,
  patientJourneyDetailIdFixture,
  patientPartnerForProfileWithInvalidHighlightDetailIdFixture,
  patientQuestionnaireControllerDetailIdFixture,
  patientQuestionnaireDeletePrevIntentDetailIdFixture,
  patientQuestionnaireDetailIdFixture,
  patientQuestionnaireInvalidOhipIdFixture,
  patientQuestionnaireJustControllerDetailIdFixture,
  patientQuestionnaireOhipValidationIdFixture,
  patientServiceTypeDetailsFixtureId,
  patientServiceTypeSecondExtraDetailsFixtureId,
  patientSortByAlertAndDateOfBirthDetailIdFixture,
  patientWithoutPregnancyHistoryFixtureId,
  showAppointmentsJourneyTypeDetailIdFixture,
} from '@libs/common/test/fixtures/patient-to-patient-detail-variables.fixture'
import {
  ContributionEnum,
  RelationshipEnum,
} from '@libs/services-common/enums/partner-invitation.enum'

export const detailForEmailVerifiedFixture: Partial<PatientDetail> = {
  id: patientEmailVerifiedOtherDetailIdFixture,
  latexAllergy: true,
}

export const detailForEmailVerifiedOtherFixture: Partial<PatientDetail> = {
  id: patientEmailVerifiedDetailIdFixture,
  latexAllergy: true,
}

export const detailForBackgroundInformationFixture: Partial<PatientDetail> = {
  id: patientForBackgroundInformationDetailIdFixture,
  latexAllergy: true,
}

export const detailForGeneralHealthFixture: Partial<PatientDetail> = {
  id: patientForGeneralHealthDetailIdFixture,
  latexAllergy: true,
  medicalProblems: `["MedicalProblems"]`,
  heightInInches: 80,
  diet: 'Rice',
  noteFromPatient: 'detail patient note',
}

export const detailForPatientSortedFixture: Partial<PatientDetail> = {
  id: patientSortByAlertAndDateOfBirthDetailIdFixture,
}

export const detailForQuestionnairePatientFixture: Partial<PatientDetail> = {
  id: patientQuestionnaireDetailIdFixture,
}

export const detailForQuestionnaireRevisionNotChangedFixture: Partial<PatientDetail> = {
  id: detailIdForQuestionnaireRevisionNotChangedFixture,
}

export const detailForQuestionnaireControllerFixture: Partial<PatientDetail> = {
  id: patientQuestionnaireControllerDetailIdFixture,
}
export const detailForQuestionnaireOhipValidationFixture: Partial<PatientDetail> = {
  id: patientQuestionnaireOhipValidationIdFixture,
}

export const detailForQuestionnaireInvalidOhipFixture: Partial<PatientDetail> = {
  id: patientQuestionnaireInvalidOhipIdFixture,
}

export const detailForQuestionnaireJustControllerFixture: Partial<PatientDetail> = {
  id: patientQuestionnaireJustControllerDetailIdFixture,
}

export const detailForEmailNotVerifiedFixture: Partial<PatientDetail> = {
  id: patientEmailNotVerifiedDetailIdFixture,
}

export const detailForJourneyBlockedFixture: Partial<PatientDetail> = {
  id: patientJourneyBlockedDetailIdFixture,
}

export const detailCartPatientFixture: Partial<PatientDetail> = {
  id: cartPatientDetailIdFixture,
}

export const detailAppointmentPatientFixture: Partial<PatientDetail> = {
  id: patientAppointmentDetailIdFixture,
  contribution: ContributionEnum.Egg,
}

export const detailClinicSchedulingFixture: Partial<PatientDetail> = {
  id: patientClinicSchedulingDetailIdFixture,
}

export const detailForPatientOverviewMaleFixture: Partial<PatientDetail> = {
  id: detailForPatientOverviewMaleDetailIdFixture,
}

export const detailForPatientOverviewFemaleFixture: Partial<PatientDetail> = {
  id: detailForPatientOverviewFemaleDetailIdFixture,
  gender: Gender.Female,
}

export const detailPartnerIntakeJourneyTypeFixture: Partial<PatientDetail> = {
  id: partnerIntakeJourneyTypeDetailIdFixture,
  contribution: ContributionEnum.Sperm,
}

export const detailCartPatientUpdateMaleSexAtBirthFixture: Partial<PatientDetail> = {
  id: cartPatientUpdateMaleSexAtBirthDetailIdFixture,
}

export const detailCartPatientUpdateFemaleSexAtBirthFixture: Partial<PatientDetail> = {
  id: cartPatientUpdateFemaleSexAtBirthDetailIdFixture,
}

export const detailCartPatientUpdateMaleSexAtBirthV2Fixture: Partial<PatientDetail> = {
  id: cartPatientUpdateMaleSexAtBirthDetailIdV2Fixture,
}

export const detailCartPatientUpdateFemaleSexAtBirthV2Fixture: Partial<PatientDetail> = {
  id: cartPatientUpdateFemaleSexAtBirthDetailIdV2Fixture,
}

export const detailPatientlDoesntHaveSexAtBirth: Partial<PatientDetail> = {
  id: cartPatientDetailDoesntHaveSexAtBirth,
  iodineAllergy: true,
}

export const detailCartConfirmPaymentFixture: Partial<PatientDetail> = {
  id: cartConfirmPaymentDetailIdFixture,
}

export const detailCartConfirmV2PaymentFixture: Partial<PatientDetail> = {
  id: cartConfirmPaymentDetailV2IdFixture,
}

export const detailPatientCartConfirmRevisionsFixture: Partial<PatientDetail> = {
  id: patientDetailIdCartConfirmRevisionsFixture,
}

export const detailShowAppointmentsJourneyTypeFixture: Partial<PatientDetail> = {
  id: showAppointmentsJourneyTypeDetailIdFixture,
}

export const detailPatientJourneyFixture: Partial<PatientDetail> = {
  id: patientJourneyDetailIdFixture,
}

export const detailPatientDeletePrevIntentsFixture: Partial<PatientDetail> = {
  id: patientQuestionnaireDeletePrevIntentDetailIdFixture,
}

export const detailPatientForTestResultsFixture: Partial<PatientDetail> = {
  id: patientForProfileTestResultsDetailIdFixture,
  contribution: ContributionEnum.Sperm,
}

export const detailPatientPartnerForTestResultsFixture: Partial<PatientDetail> = {
  id: partnerPatientForProfileTestResultsDetailIdFixture,
  preferredPronouns: PreferredPronouns.TheyTheir,
}

export const detailPatientForTestResultFixture: Partial<PatientDetail> = {
  id: patientForTestResultAuthDetailIdFixture,
}

export const detailPatientForGetContactInformation: Partial<PatientDetail> = {
  id: patientDetailForGetContactInfoIdFixture,
  preferredName: null,
  contribution: ContributionEnum.Sperm,
}
export const patientDetailDrugAllergies: string = `["Penicilin", "Aspirin"]`
export const patientDetailFixture: Partial<PatientDetail> = {
  id: patientForProfileHighlightDetailIdFixture,
  currentStressLevel: CurrentStressLevel.NotStressedAtAll,
  drugAllergies: patientDetailDrugAllergies,
  foodAllergies: `["Peanuts", "Shellfish", "Shrims"]`,
  heightInInches: 70,
  weightInLbs: 177,
  latexAllergy: true,
  gender: Gender.Male,
  sexualOrientation: SexualOrientation.Heterosexual,
  recreationalDrugs: false,
  preferredPronouns: PreferredPronouns.TheyTheir,
  contribution: ContributionEnum.Sperm,
}

export const foodAllergyResponseFixture: string = 'Peanuts'

export const partnerPatientDetailFixture: Partial<PatientDetail> = {
  id: 2,
  currentStressLevel: CurrentStressLevel.NotStressedAtAll,
  drugAllergies: `["Penicilin", "Aspirin"]`,
  foodAllergies: null,
  heightInInches: 70,
  weightInLbs: 177,
  latexAllergy: false,
  gender: Gender.Female,
  sexualOrientation: SexualOrientation.Heterosexual,
  recreationalDrugs: false,
  preferredPronouns: PreferredPronouns.Other,
  otherPreferredPronouns: '',
}

export const partnerWithInvalidDrugAllergiesDetailFixture: Partial<PatientDetail> = {
  ...partnerPatientDetailFixture,
  id: patientPartnerForProfileWithInvalidHighlightDetailIdFixture,
  drugAllergies: `["Penicilin"]`,
}

export const patientDetailInitialConsultationConstraintFixture: Partial<PatientDetail> = {
  id: patientDetailIdInitialConsultationConstraintFixture,
}
export const patientDetailWithoutPregnancyFixture: Partial<PatientDetail> = {
  id: patientWithoutPregnancyHistoryFixtureId,
}

export const detailForPatientForPrescriptionFileCreationFixture: Partial<PatientDetail> = {
  id: patientForPrescriptionFileCreationDetailIdFixture,
}

export const detailForMaleIcFormFixture: Partial<PatientDetail> = {
  id: patientForMaleIcFormDetailIdFixture,
  latexAllergy: true,
  medicalProblems: `["MedicalProblems"]`,
  heightInInches: 80,
  diet: 'Rice',
  relationshipStatus: RelationshipEnum.Committed,
  noteFromPatient: 'detail patient note',
}

export const detailForFemaleIcFormFixture: Partial<PatientDetail> = {
  id: patientForFemaleIcFormDetailIdFixture,
  latexAllergy: true,
  medicalProblems: `["MedicalProblems"]`,
  heightInInches: 80,
  relationshipStatus: RelationshipEnum.Committed,
  diet: 'Rice',
  noteFromPatient: 'detail patient note',
}

export const partnerDetailForHighlightFixture: Partial<PatientDetail> = {
  id: partnerDetailForHighlightId,
  latexAllergy: true,
  medicalProblems: `["MedicalProblems"]`,
  heightInInches: 80,
  relationshipStatus: RelationshipEnum.Committed,
  diet: 'Rice',
  noteFromPatient: 'detail patient note',
  contribution: ContributionEnum.Sperm,
}

export const detailForProfileDoctorsFixture: Partial<PatientDetail> = {
  id: 114,
}

export const detailForGetProfileDoctorsFixture: Partial<PatientDetail> = {
  id: 115,
}

export const detailForPlanCreationFixture: Partial<PatientDetail> = {
  id: 116,
  contribution: ContributionEnum.EggUterus,
}

export const detailCartConfirmSuccessPaymentFixture: Partial<PatientDetail> = {
  id: cartConfirmSuccessPaymentDetailIdFixtureId,
}

export const detailCartConfirmFailsPaymentFixture: Partial<PatientDetail> = {
  id: cartConfirmFailsPaymentDetailIdFixtureId,
}

export const detailBookAppointmentPaymentFixture: Partial<PatientDetail> = {
  id: cartConfirmBookAppointmentPaymentDetailIdFixtureId,
}

export const patientServiceTypeSecondExtraDetailFixture: Partial<PatientDetail> = {
  id: patientServiceTypeSecondExtraDetailsFixtureId,
}

export const patientServiceTypeDetailsFixture: Partial<PatientDetail> = {
  id: patientServiceTypeDetailsFixtureId,
}

export const cartConfirmThreeCasesFixture: Partial<PatientDetail> = {
  id: cartConfirmThreeCasesDetailIdFixtureId,
}

export const patientForTestResultHistoryDetail: Partial<PatientDetail> = {
  id: 123,
}

export const patientDetailForPlansV2Fixture: Partial<PatientDetail> = {
  weightInLbs: 200,
  heightInInches: 70,
  id: 124,
}

export const patientDetailForIVFFixture: Partial<PatientDetail> = {
  id: 125,
  contribution: ContributionEnum.EggUterus,
}
export const patientDetailForScanBarcodeFixture: Partial<PatientDetail> = {
  id: 150,
  contribution: ContributionEnum.EggUterus,
}

export const detailForPatientOverviewTransgenderMaleFixture: Partial<PatientDetail> = {
  id: detailForPatientOverviewTransgenderMaleDetailIdFixture,
  gender: Gender.TransgenderMale,
}

export const patientDetailForPlansV3Fixture: Partial<PatientDetail> = {
  id: 126,
  weightInLbs: 200,
  heightInInches: 70,
}

export const patientDetailForUpdateOhipAvailabilityFixture: Partial<PatientDetail> = {
  id: 141,
}

export const patientDetailForIvfPatientForCompletionFixtureFixture: Partial<PatientDetail> = {
  id: 142,
}
export const patientDetailForIvfPatientForCompletionEggFreezingFixture: Partial<PatientDetail> = {
  id: 144,
}

export const patientDetailForEPLPlansFixture: Partial<PatientDetail> = {
  id: 143,
}

export const patientDetailForIVFFStrawNumberixture: Partial<PatientDetail> = {
  id: 145,
  contribution: ContributionEnum.EggUterus,
}
