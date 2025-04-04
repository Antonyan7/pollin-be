/* eslint-disable max-lines */

import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {IsEnum, IsString} from 'class-validator'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'

export enum Race {
  Black = 'Black',
  EastAsian = 'EastAsian',
  Latino = 'Latino',
  MiddleEastern = 'MiddleEastern',
  NorthAmericanAboriginal = 'NorthAmericanAboriginal',
  NativeHawaiianOrOtherPacificIslander = 'NativeHawaiianOrOtherPacificIslander',
  SouthAsian = 'SouthAsian',
  SoutheastAsian = 'SoutheastAsian',
  WhiteEuropeanDescent = 'WhiteEuropeanDescent',
  Other = 'Other',
}

export const RaceTitles = {
  [Race.Black]: 'Black',
  [Race.EastAsian]: 'East Asian',
  [Race.Latino]: 'Latino',
  [Race.MiddleEastern]: 'Middle Eastern',
  [Race.NorthAmericanAboriginal]: 'North American Aboriginal',
  [Race.NativeHawaiianOrOtherPacificIslander]: 'Native Hawaiian or Other Pacific Islander',
  [Race.SouthAsian]: 'South Asian',
  [Race.SoutheastAsian]: 'Southeast Asian',
  [Race.WhiteEuropeanDescent]: 'White European descent',
  [Race.Other]: 'Other',
}

export enum PatientAddressType {
  Primary = 'Primary',
  Mailing = 'Mailing',
}

export enum PatientAnswers {
  Yes = 'Yes',
  No = 'No',
}

export const BooleanValuesTitles = {
  [PatientAnswers.Yes]: 'Yes',
  [PatientAnswers.No]: 'No',
}

export enum SexAtBirthAbbreviation {
  MAB = 'MAB',
  FAB = 'FAB',
}

export enum BooleanAnswers {
  PatientBooleanAnswers = 'BooleanAnswers',
}

export enum PatientValidationResponses {
  ValidationSuccessResponsesDescription = 'will return {"message": null, code: "succeed"} with 200 success code',
  ValidationFailResponsesDescription = 'will return {"message": null, code: "not_found"} with 200 success code',
}

export const getSexAtBirthAbbreviation = new Map<SexAtBirth, SexAtBirthAbbreviation>([
  [SexAtBirth.Male, SexAtBirthAbbreviation.MAB],
  [SexAtBirth.Female, SexAtBirthAbbreviation.FAB],
])

export enum UserType {
  User = 'User',
  Patient = 'Patient',
  Partner = 'Partner',
}

export enum NotificationState {
  InvitePartners = 'InvitePartners',
  ManagePartners = 'ManagePartners',
}

export const getNotificationTitleByState = new Map<NotificationState, string>([
  [NotificationState.InvitePartners, 'Invite Your Partners'],
  [NotificationState.ManagePartners, 'Partner invitation are pending.'],
])

export const getNotificationDescriptionByState = new Map<NotificationState, string>([
  [
    NotificationState.InvitePartners,
    'Invite your partner(s) to sign up on the Dandelion app to join you this fertility journey',
  ],
  [NotificationState.ManagePartners, 'Invites have not yet responded to your partner invitations'],
])

export const getNotificationButtonLabelByState = new Map<NotificationState, string>([
  [NotificationState.InvitePartners, 'Send invitation'],
  [NotificationState.ManagePartners, 'Manage Partners'],
])

export enum CurrentStressLevel {
  NotStressedAtAll = 'NotStressedAtAll',
  MildlyStressed = 'MildlyStressed',
  ModeratelyStressed = 'ModeratelyStressed',
  VeryStressed = 'VeryStressed',
  ExtremelyStressed = 'ExtremelyStressed',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  TransgenderMale = 'TransgenderMale',
  TransgenderFemale = 'TransgenderFemale',
  Other = 'Other',
}

export enum SexualOrientation {
  Heterosexual = 'Heterosexual',
  Gay = 'Gay',
  Lesbian = 'Lesbian',
  Bisexual = 'Bisexual',
  Queer = 'Queer',
  TwoSpirit = 'TwoSpirit',
  Other = 'Other',
}

export enum MonthsTryingToGetPregnant {
  OneToSixMonths = '1To6Months',
  SixToTwelveMonths = '6To12Months',
  OneYearPlus = '1YearPlus',
}

export enum BirthOutcome {
  LiveBirth = 'Live',
  StillBirth = 'StillBirth',
}

export enum NumberOfPregnancies {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Plus10 = '10+',
}

export enum StaticPatientInfoMapCodeYearDropdown {
  EctopicPregnanciesYear = 'EctopicPregnanciesYear',
  FullTimeDeliveryYear = 'FullTimeDeliveryYear',
  PreTermDeliveryYear = 'PreTermDeliveryYear',
  MiscarriageYear = 'MiscarriageYear',
  AbortionYear = 'AbortionYear',
}

export const enum PatientTypeAnswers {
  PatientTypeAnswers = 'PatientTypeAnswers',
}

export enum PatientPreTermAndFullTermTypeAnswersEnum {
  PatientPreTermAndFullTermTypeAnswers = 'PatientPreTermAndFullTermTypeAnswers',
}

export enum PatientMiscarriageTypeAnswersEnum {
  PatientMiscarriageTypeAnswers = 'PatientMiscarriageTypeAnswers',
}

export enum PatientMonthsToConceiveAnswersEnum {
  PatientMonthsToConceiveAnswers = 'PatientMonthsToConceiveAnswers',
}

export enum PatientBirthOutcomeAnswersEnum {
  PatientBirthOutcomeAnswers = 'PatientBirthOutcomeAnswers',
}

export enum PatientLocationAnswersEnum {
  PatientLocationAnswers = 'PatientLocationAnswers',
}

export enum PatientCyclesAnswersEnum {
  PatientCyclesAnswers = 'PatientCyclesAnswers',
}

export enum PatientTreatmentTypeAnswersEnum {
  PatientTreatmentTypeAnswers = 'PatientTreatmentTypeAnswers',
}

export enum PatientMenstrualFlowAnswersEnum {
  PatientMenstrualFlowAnswers = 'PatientMenstrualFlowAnswers',
}

export enum PatientDaysOfBleedingAnswersEnum {
  PatientDaysOfBleedingAnswers = 'PatientDaysOfBleedingAnswers',
}

export enum PatientMenstrualPainAnswersEnum {
  PatientMenstrualPainAnswers = 'PatientMenstrualPainAnswers',
}

export const enum PatientFamilyMemberRelatedToProblemAnswersEnum {
  PatientFamilyMemberRelatedToProblemAnswers = 'PatientFamilyMemberRelatedToProblemAnswers',
}

export const enum PatientDiagnosedConditionsAnswersEnum {
  PatientDiagnosedConditionsAnswers = 'PatientDiagnosedConditionsAnswers',
}

export enum PatientGynaecologicalConditionsAnswersEnum {
  PatientGynaecologicalConditionsAnswers = 'PatientGynaecologicalConditionsAnswers',
}

export enum YearDropdownAnswersEnum {
  PatientYearDropdownAnswers = 'YearDropdownAnswers',
}

export const enum StaticPatientInfoMapCode {
  SexAtBirth = 'SexAtBirth',
  Gender = 'Gender',
  PreferredPronouns = 'PreferredPronouns',
  SexualOrientation = 'SexualOrientation',
  CurrentStressLevel = 'CurrentStressLevel',
  MonthsTryingToGetPregnant = 'MonthsTryingToGetPregnant',
  NumberOfPregnancies = 'NumberOfPregnancies',
  ContributionFemale = 'ContributionFemale',
  ContributionMale = 'ContributionMale',
  Race = 'Race',
}

export const GenderTitles = {
  [Gender.Male]: 'Male',
  [Gender.Female]: 'Female',
  [Gender.TransgenderMale]: 'Transgender Male',
  [Gender.TransgenderFemale]: 'Transgender Female',
  [Gender.Other]: 'Other',
}

export enum PreferredPronouns {
  SheHer = 'She/Her',
  HeHim = 'He/Him',
  TheyTheir = 'They/Their',
  Other = 'Other',
}

export const PreferredPronounsTitles = {
  [PreferredPronouns.SheHer]: 'She/Her',
  [PreferredPronouns.HeHim]: 'He/Him',
  [PreferredPronouns.TheyTheir]: 'They/Their',
  [PreferredPronouns.Other]: 'Other',
}

export const SexualOrientationTitles = {
  [SexualOrientation.Heterosexual]: 'Heterosexual',
  [SexualOrientation.Gay]: 'Gay',
  [SexualOrientation.Lesbian]: 'Lesbian',
  [SexualOrientation.Bisexual]: 'Bisexual',
  [SexualOrientation.Queer]: 'Queer',
  [SexualOrientation.TwoSpirit]: 'Two-Spirit',
  [SexualOrientation.Other]: 'Other',
}
export const CurrentStressLevelTitles = {
  [CurrentStressLevel.NotStressedAtAll]: 'Not stressed at all',
  [CurrentStressLevel.MildlyStressed]: 'Mildly stressed',
  [CurrentStressLevel.ModeratelyStressed]: 'Moderately stressed',
  [CurrentStressLevel.VeryStressed]: 'Very stressed',
  [CurrentStressLevel.ExtremelyStressed]: 'Extremely stressed',
}
export const MonthsTryingToGetPregnantTitles = {
  [MonthsTryingToGetPregnant.OneToSixMonths]: '1-6 months',
  [MonthsTryingToGetPregnant.SixToTwelveMonths]: '7-12 months',
  [MonthsTryingToGetPregnant.OneYearPlus]: '13+ months',
}
export const BirthOutcomeTitles = {
  [BirthOutcome.LiveBirth]: 'Live',
  [BirthOutcome.StillBirth]: 'Still Birth',
}

export enum TypeEctopicPregnancy {
  Natural = 'Natural',
  MedicatedMethotrexate = 'MedicatedMethotrexate',
  Surgical = 'Surgical',
}

export const TypeEctopicPregnancyTitles = {
  [TypeEctopicPregnancy.Natural]: 'Natural',
  [TypeEctopicPregnancy.MedicatedMethotrexate]: 'Medicated (Methotrexate)',
  [TypeEctopicPregnancy.Surgical]: 'Surgical',
}

export enum TypePatientMiscarriageHistoryPregnancy {
  Natural = 'Natural',
  MedicatedMisoprostol = 'MedicatedMisoprostol',
  Surgical = 'Surgical',
}

export const TypePatientMiscarriageHistoryPregnancyTitles = {
  [TypePatientMiscarriageHistoryPregnancy.Natural]: 'Natural',
  [TypePatientMiscarriageHistoryPregnancy.MedicatedMisoprostol]: 'Medicated (Misoprostol)',
  [TypePatientMiscarriageHistoryPregnancy.Surgical]: 'Surgical',
}

export enum LocationEctopicPregnancy {
  LeftFallopian = 'Left Fallopian',
  RightFallopian = 'Right Fallopian',
  Other = 'Other',
}

export const LocationEctopicPregnancyTitles = {
  [LocationEctopicPregnancy.LeftFallopian]: 'Left Fallopian',
  [LocationEctopicPregnancy.RightFallopian]: 'Right Fallopian',
  [LocationEctopicPregnancy.Other]: 'Other',
}
export const NumberOfPregnanciesTitles = {
  [NumberOfPregnancies.One]: '1',
  [NumberOfPregnancies.Two]: '2',
  [NumberOfPregnancies.Three]: '3',
  [NumberOfPregnancies.Four]: '4',
  [NumberOfPregnancies.Five]: '5',
  [NumberOfPregnancies.Six]: '6',
  [NumberOfPregnancies.Seven]: '7',
  [NumberOfPregnancies.Eight]: '8',
  [NumberOfPregnancies.Nine]: '9',
  [NumberOfPregnancies.Plus10]: '10+',
}

/**Order is important */
export enum PatientAlertType {
  AdhocCheckout = 'AdhocCheckout',
  Error = 'Error',
  MedicationsCheckout = 'MedicationsCheckout',
  AppointmentCheckout = 'AppointmentCheckout',
  CompleteRequiredActions = 'CompleteRequiredActions',
  InvitePartners = 'InvitePartners',
  Questionnaire = 'Questionnaire',
  Info = 'Info',
  UploadPhoto = 'UploadPhoto',

  FertilityIQ = 'FertilityIQ',
  EggFreezingReportReleased = 'EggFreezingReportReleased',
  EggFreezingReportUpdated = 'EggFreezingReportUpdated',

  PlanDetails = 'PlanDetails',
}

export enum PatientAlertTypeMobileResponse {
  AdhocCheckout = 'AdhocCheckout',
  Error = 'Error',
  MedicationsCheckout = 'MedicationsCheckout',
  AppointmentCheckout = 'AppointmentCheckout',
  CompleteRequiredActions = 'CompleteRequiredActions',
  InvitePartners = 'InvitePartners',
  Questionnaire = 'Questionnaire',
  Info = 'Info',
  UploadPhoto = 'UploadPhoto',

  ReportDetails = 'ReportDetails',

  PlanDetails = 'PlanDetails',
}

export enum StaticConstraintAnswerOption {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  Yes = 'Yes',
  No = 'No',
}

export enum MenstrualFLowEnum {
  Normal = 'Normal',
  Light = 'Light',
  Heavy = 'Heavy',
  NotApplicable = 'NotApplicable',
}

export const MenstrualFlowTitles = {
  [MenstrualFLowEnum.Normal]: 'Normal',
  [MenstrualFLowEnum.Light]: 'Light',
  [MenstrualFLowEnum.Heavy]: 'Heavy',
  [MenstrualFLowEnum.NotApplicable]: `Not applicable (I don't have periods)`,
}

export enum MenstrualFLowLabel {
  Normal = 'Normal',
  Light = 'Light',
  Heavy = 'Heavy',
  NotApplicable = `Not applicable (I don't have periods)`,
}

export enum DaysOfBleedingEnum {
  OneToSeven = 'OneToSeven',
  EightToTen = 'EightToTen',
  MoreThanEleven = 'MoreThanEleven',
  NotApplicable = 'NotApplicable',
}

export enum DaysOfBleedingLabel {
  OneToSeven = '1 - 7',
  EightToTen = '8 - 10',
  MoreThanEleven = '11+',
  NotApplicable = `Not applicable (I don't have periods)`,
}

export const DaysOfBleedingTitle = {
  [DaysOfBleedingEnum.OneToSeven]: DaysOfBleedingLabel.OneToSeven,
  [DaysOfBleedingEnum.EightToTen]: DaysOfBleedingLabel.EightToTen,
  [DaysOfBleedingEnum.MoreThanEleven]: DaysOfBleedingLabel.MoreThanEleven,
  [DaysOfBleedingEnum.NotApplicable]: DaysOfBleedingLabel.NotApplicable,
}

export enum MenstrualPainEnum {
  NoPain = 'NoPain',
  Mild = 'Mild',
  Moderate = 'Moderate',
  Severe = 'Severe',
  NotApplicable = 'NotApplicable',
}

export enum MenstrualPainLabel {
  NoPain = 'No Pain',
  Mild = 'Mild',
  Moderate = 'Moderate',
  Severe = 'Severe',
  NotApplicable = `Not applicable (I don't have periods)`,
}

export const MenstrualPainTitles = {
  [MenstrualPainEnum.NoPain]: MenstrualPainLabel.NoPain,
  [MenstrualPainEnum.Mild]: MenstrualPainLabel.Mild,
  [MenstrualPainEnum.Moderate]: MenstrualPainLabel.Moderate,
  [MenstrualPainEnum.Severe]: MenstrualPainLabel.Severe,
  [MenstrualPainEnum.NotApplicable]: MenstrualPainLabel.NotApplicable,
}

export enum PatientCyclesAnswersIds {
  Cycle1 = '1',
  Cycle2 = '2',
  Cycle3 = '3',
  Cycle4 = '4',
  Cycle5 = '5',
  Cycle6 = '6',
  Cycle7 = '7',
  Cycle8 = '8',
  Cycle9 = '9',
  Cycle10 = '10',
}

export const PatientCyclesAnswersTitles = {
  [PatientCyclesAnswersIds.Cycle1]: '1 cycle',
  [PatientCyclesAnswersIds.Cycle2]: '2 cycle',
  [PatientCyclesAnswersIds.Cycle3]: '3 cycle',
  [PatientCyclesAnswersIds.Cycle4]: '4 cycle',
  [PatientCyclesAnswersIds.Cycle5]: '5 cycle',
  [PatientCyclesAnswersIds.Cycle6]: '6 cycle',
  [PatientCyclesAnswersIds.Cycle7]: '7 cycle',
  [PatientCyclesAnswersIds.Cycle8]: '8 cycle',
  [PatientCyclesAnswersIds.Cycle9]: '9 cycle',
  [PatientCyclesAnswersIds.Cycle10]: '10 cycle',
}

export enum PatientStatusEnum {
  PlanType = 'PlanType', //status get in planType patientStatusAbbreviation
  Active = 'Active',
  Discharged = 'Discharged',
  NotActive = 'NotActive',
  Deactivated = 'Deactivated',
}

export enum PatientStatusEnumTitle {
  PlanType = 'Plan Type',
  Active = 'Active',
  Discharged = 'Discharged',
  NotActive = 'Not Active',
  Deactivated = 'Deactivated',
}

export const PatientStatusToTitle = {
  [PatientStatusEnum.PlanType]: PatientStatusEnumTitle.PlanType,
  [PatientStatusEnum.Active]: PatientStatusEnumTitle.Active,
  [PatientStatusEnum.Discharged]: PatientStatusEnumTitle.Discharged,
  [PatientStatusEnum.NotActive]: PatientStatusEnumTitle.NotActive,
  [PatientStatusEnum.Deactivated]: PatientStatusEnumTitle.Deactivated,
}

export enum PatientOhipAvailability {
  Unknown = 'Unknown',
  Yes = 'Yes',
  No = 'No',
}

export const getPatientOhipAvailabilityByBoolean = new Map<boolean, PatientOhipAvailability>([
  [true, PatientOhipAvailability.Yes],
  [false, PatientOhipAvailability.No],
])

export const getBooleanByPatientOhipAvailability = new Map<PatientOhipAvailability, boolean>([
  [PatientOhipAvailability.Yes, true],
  [PatientOhipAvailability.No, false],
  [PatientOhipAvailability.Unknown, null],
])

export const PatientStatusTextColor = '#202E27'

export const getPatientStatusBackgroundColor = new Map<PatientStatusEnum, string>([
  [PatientStatusEnum.Active, '#A9EBB0'],
  [PatientStatusEnum.NotActive, '#EEEEEE'],
  [PatientStatusEnum.Discharged, '#F8B5D1'],
  [PatientStatusEnum.Deactivated, '#EEEEEE'],
])

export const patientAlertTypeToMobileResponse = new Map<
  PatientAlertType,
  PatientAlertTypeMobileResponse
>([
  [PatientAlertType.AdhocCheckout, PatientAlertTypeMobileResponse.AdhocCheckout],
  [PatientAlertType.Error, PatientAlertTypeMobileResponse.Error],
  [PatientAlertType.MedicationsCheckout, PatientAlertTypeMobileResponse.MedicationsCheckout],
  [PatientAlertType.AppointmentCheckout, PatientAlertTypeMobileResponse.AppointmentCheckout],
  [
    PatientAlertType.CompleteRequiredActions,
    PatientAlertTypeMobileResponse.CompleteRequiredActions,
  ],
  [PatientAlertType.InvitePartners, PatientAlertTypeMobileResponse.InvitePartners],
  [PatientAlertType.Questionnaire, PatientAlertTypeMobileResponse.Questionnaire],
  [PatientAlertType.Info, PatientAlertTypeMobileResponse.Info],
  [PatientAlertType.UploadPhoto, PatientAlertTypeMobileResponse.UploadPhoto],
  [PatientAlertType.FertilityIQ, PatientAlertTypeMobileResponse.ReportDetails],
  [PatientAlertType.EggFreezingReportReleased, PatientAlertTypeMobileResponse.ReportDetails],
  [PatientAlertType.EggFreezingReportUpdated, PatientAlertTypeMobileResponse.ReportDetails],
  [PatientAlertType.PlanDetails, PatientAlertTypeMobileResponse.PlanDetails],
])

export enum PatientTreatmentAnswersIds {
  OralFertilityMedications = 'OralFertilityMedications',
  InjectableFertilityMedications = 'InjectableFertilityMedications',
  IntrauterineInseminationIUI = 'IntrauterineInseminationIUI',
  InVitroFertilizationIVF = 'InVitroFertilizationIVF',
}

export const PatientTreatmentAnswersTitles = {
  [PatientTreatmentAnswersIds.OralFertilityMedications]: 'Oral fertility medications',
  [PatientTreatmentAnswersIds.InjectableFertilityMedications]: 'Injectable fertility medications',
  [PatientTreatmentAnswersIds.IntrauterineInseminationIUI]: 'Intrauterine insemination (IUI)',
  [PatientTreatmentAnswersIds.InVitroFertilizationIVF]: 'In Vitro Fertilization (IVF)',
}

export enum TypeOfBirthForDeliveryEnum {
  Vaginal = 'Vaginal',
  CesareanSection = 'CesareanSection',
}

export enum TypeOfBirthForDeliveryLabel {
  Vaginal = 'Vaginal',
  CesareanSection = 'Cesarean Section',
}

export const TypeOfBirthForDeliveryTitles = {
  [TypeOfBirthForDeliveryEnum.Vaginal]: TypeOfBirthForDeliveryLabel.Vaginal,
  [TypeOfBirthForDeliveryEnum.CesareanSection]: TypeOfBirthForDeliveryLabel.CesareanSection,
}

export enum PatientInfoMapCode {
  OhipCardNumber = 'OhipCardNumber',
  OhipCardVersionCode = 'OhipCardVersionCode',
  SexAtBirth = 'SexAtBirth',
  DaysBetweenPeriods = 'DaysBetweenPeriods',
  FirstDayOfLastPeriod = 'FirstDayOfLastPeriod',
  DateOfBirth = 'DateOfBirth',
  PreferredName = 'PreferredName',
  Gender = 'Gender',
  OtherGender = 'OtherGender',
  PreferredPronouns = 'PreferredPronouns',
  OtherPreferredPronouns = 'OtherPreferredPronouns',
  SexualOrientation = 'SexualOrientation',
  OtherSexualOrientation = 'OtherSexualOrientation',
  WeightInLbs = 'WeightInLbs',
  HeightFeet = 'HeightFeet',
  HeightInches = 'HeightInches',
  MedicalProblems = 'MedicalProblems',
  ProblemWithAnesthetics = 'ProblemWithAnesthetics',
  PrescriptionMedicationList = 'PrescriptionMedicationList',
  MedicationName = 'MedicationName',
  MedicationDosage = 'MedicationDosage',
  MedicationFrequency = 'MedicationFrequency',
  DrugAllergies = 'DrugAllergies',
  FoodAllergies = 'FoodAllergies',
  LatexAllergy = 'LatexAllergy',
  SmokeCigarettes = 'SmokeCigarettes',
  DrinkAlcohol = 'DrinkAlcohol',
  UseMarijuana = 'UseMarijuana',
  RecreationalDrugs = 'RecreationalDrugs',
  ExerciseRegularly = 'ExerciseRegularly',
  CurrentStressLevel = 'CurrentStressLevel',
  SeeCounsellorForStress = 'SeeCounsellorForStress',
  CurrentOccupation = 'CurrentOccupation',
  NoteFromPatient = 'NoteFromPatient',
  MonthsTryingToGetPregnant = 'MonthsTryingToGetPregnant',
  NumberOfPregnancies = 'NumberOfPregnancies',
  UsingAppToTrackOvulation = 'UsingAppToTrackOvulation',
  UsingOvulationKits = 'UsingOvulationKits',
  UsingLubricants = 'UsingLubricants',
  SeenFertilitySpecialist = 'SeenFertilitySpecialist',
  EctopicPregnanciesHistory = 'EctopicPregnanciesHistory',
  EctopicPregnanciesYear = 'EctopicPregnanciesYear',
  EctopicPregnanciesType = 'EctopicPregnanciesType',
  EctopicPregnanciesLocation = 'EctopicPregnanciesLocation',
  EctopicPregnanciesMonthsToConceive = 'EctopicPregnanciesMonthsToConceive',
  FullTimeDeliveryHistory = 'FullTimeDeliveryHistory',
  FullTimeDeliveryYear = 'FullTimeDeliveryYear',
  FullTimeDeliveryTypeOfBirth = 'FullTimeDeliveryTypeOfBirth',
  FullTimeDeliveryMonthsToConceive = 'FullTimeDeliveryMonthsToConceive',
  FullTimeDeliveryBirthOutcome = 'FullTimeDeliveryBirthOutcome',
  PreTermDeliveryHistory = 'PreTermDeliveryHistory',
  PreTermDeliveryYear = 'PreTermDeliveryYear',
  PreTermDeliveryTypeOfBirth = 'PreTermDeliveryTypeOfBirth',
  PreTermDeliveryMonthsToConceive = 'PreTermDeliveryMonthsToConceive',
  PreTermDeliveryBirthOutcome = 'PreTermDeliveryBirthOutcome',
  MiscarriageHistory = 'MiscarriageHistory',
  MiscarriageYear = 'MiscarriageYear',
  MiscarriageType = 'MiscarriageType',
  MiscarriageMonthsToConceive = 'MiscarriageMonthsToConceive',
  AbortionHistory = 'AbortionHistory',
  AbortionYear = 'AbortionYear',
  IsOvulating = 'IsOvulating',
  NumberOfLiveBirth = 'NumberOfLiveBirth',
  HasDuplicateName = 'HasDuplicateName',
  FamilyDoctor = 'FamilyDoctor',
  ReferringDoctor = 'ReferringDoctor',
  IodineAllergy = 'IodineAllergy',
  ContributionMale = 'ContributionMale',
  ContributionFemale = 'ContributionFemale',
  Race = 'Race',
  PrescriptionMedication = 'PrescriptionMedication',
  DrugAllergiesChoice = 'DrugAllergiesChoice',
  FoodAllergiesChoice = 'FoodAllergiesChoice',
  FamilyMemberWithHealthProblem = 'FamilyMemberWithHealthProblem',
  TryingForPregnancy = 'TryingForPregnancy',
  PreviousFertilityTreatment = 'PreviousFertilityTreatment',
  HasPeriod = 'HasPeriod',
  MenstrualFlow = 'MenstrualFlow',
  DaysOfBleeding = 'DaysOfBleeding',
  MenstrualPain = 'MenstrualPain',
  PreviousPapTest = 'PreviousPapTest',
  PapTestLastDate = 'PapTestLastDate',
  AbnormalPap = 'AbnormalPap',
  AbnormalPapProcedures = 'AbnormalPapProcedures',
  GynaecologicalConditions = 'GynaecologicalConditions',
  HaveBiologicalChildren = 'HaveBiologicalChildren',
  HaveBiologicalChildrenWithCurrentPartner = 'HaveBiologicalChildrenWithCurrentPartner',
  HadSemenAnalysis = 'HadSemenAnalysis',
  SemenAnalysisIsNormal = 'SemenAnalysisIsNormal',
  DiagnosedConditions = 'DiagnosedConditions',
  Vasectomy = 'Vasectomy',
  VasectomyReversal = 'VasectomyReversal',
  ErectionDifficulties = 'ErectionDifficulties',
  SurgeryType = 'SurgeryType',
  SurgeryDate = 'SurgeryDate',
  FamilyHealthProblemName = 'FamilyHealthProblemName',
  FamilyMemberRelatedToProblem = 'FamilyMemberRelatedToProblem',
  TreatmentType = 'TreatmentType',
  TreatmentCycles = 'TreatmentCycles',
  PastSurgery = 'PastSurgery',
  FamilyHealthProblem = 'FamilyHealthProblem',
  HasProceduresDueAbnormalPAP = 'HasProceduresDueAbnormalPAP',
  HasOhipCard = 'HasOhipCard',
  HaveBeenReferredByPhysician = 'HaveBeenReferredByPhysician',
}

export const PatientInfoMapper = new Map<PatientInfoMapCode, string>([
  [PatientInfoMapCode.OhipCardNumber, 'ohipCardNumber'],
  [PatientInfoMapCode.OhipCardVersionCode, 'ohipCardVersionCode'],
  [PatientInfoMapCode.DaysBetweenPeriods, 'daysBetweenPeriods'],
  [PatientInfoMapCode.FirstDayOfLastPeriod, 'firstDayOfLastPeriod'],
  [PatientInfoMapCode.PreferredPronouns, 'preferredPronouns'],
  [PatientInfoMapCode.OtherPreferredPronouns, 'otherPreferredPronouns'],
  [PatientInfoMapCode.HeightFeet, 'heightInInches'],
  [PatientInfoMapCode.HeightInches, 'heightInInches'],
  [PatientInfoMapCode.WeightInLbs, 'weightInLbs'],
  [PatientInfoMapCode.LatexAllergy, 'latexAllergy'],
  [PatientInfoMapCode.IodineAllergy, 'iodineAllergy'],
  [PatientInfoMapCode.HasDuplicateName, 'hasDuplicateName'],
  [PatientInfoMapCode.SeeCounsellorForStress, 'seeCounsellorForStress'],
  [PatientInfoMapCode.FoodAllergies, 'foodAllergies'],
  [PatientInfoMapCode.DrugAllergies, 'drugAllergies'],
  [PatientInfoMapCode.PreferredName, 'preferredName'],
  [PatientInfoMapCode.Gender, 'gender'],
  [PatientInfoMapCode.OtherGender, 'otherGender'],
  [PatientInfoMapCode.SexualOrientation, 'sexualOrientation'],
  [PatientInfoMapCode.OtherSexualOrientation, 'otherSexualOrientation'],
  [PatientInfoMapCode.MedicalProblems, 'medicalProblems'],
  [PatientInfoMapCode.ProblemWithAnesthetics, 'problemWithAnesthetics'],
  [PatientInfoMapCode.SmokeCigarettes, 'smokeCigarettes'],
  [PatientInfoMapCode.UseMarijuana, 'useMarijuana'],
  [PatientInfoMapCode.DrinkAlcohol, 'drinkAlcohol'],
  [PatientInfoMapCode.RecreationalDrugs, 'recreationalDrugs'],
  [PatientInfoMapCode.ExerciseRegularly, 'exerciseRegularly'],
  [PatientInfoMapCode.CurrentStressLevel, 'currentStressLevel'],
  [PatientInfoMapCode.CurrentOccupation, 'currentOccupation'],
  [PatientInfoMapCode.NoteFromPatient, 'noteFromPatient'],
  [PatientInfoMapCode.MedicationName, 'nameFromIntake'],
  [PatientInfoMapCode.MedicationDosage, 'dosage'],
  [PatientInfoMapCode.MedicationFrequency, 'frequency'],
  [PatientInfoMapCode.MonthsTryingToGetPregnant, 'monthsTryingToGetPregnant'],
  [PatientInfoMapCode.NumberOfPregnancies, 'numberOfPregnancies'],
  [PatientInfoMapCode.UsingAppToTrackOvulation, 'usingAppToTrackOvulation'],
  [PatientInfoMapCode.UsingOvulationKits, 'usingOvulationKits'],
  [PatientInfoMapCode.UsingLubricants, 'usingLubricants'],
  [PatientInfoMapCode.SeenFertilitySpecialist, 'seenFertilitySpecialist'],
  [PatientInfoMapCode.IsOvulating, 'isOvulating'],
  [PatientInfoMapCode.NumberOfLiveBirth, 'numberOfLiveBirth'],
  [PatientInfoMapCode.EctopicPregnanciesYear, 'EctopicPregnanciesYear'],
  [PatientInfoMapCode.EctopicPregnanciesType, 'EctopicPregnanciesType'],
  [PatientInfoMapCode.EctopicPregnanciesLocation, 'EctopicPregnanciesLocation'],
  [PatientInfoMapCode.EctopicPregnanciesMonthsToConceive, 'EctopicPregnanciesMonthsToConceive'],
  [PatientInfoMapCode.FullTimeDeliveryYear, 'FullTimeDeliveryYear'],
  [PatientInfoMapCode.FullTimeDeliveryTypeOfBirth, 'FullTimeDeliveryTypeOfBirth'],
  [PatientInfoMapCode.FullTimeDeliveryMonthsToConceive, 'FullTimeDeliveryMonthsToConceive'],
  [PatientInfoMapCode.FullTimeDeliveryBirthOutcome, 'FullTimeDeliveryBirthOutcome'],
  [PatientInfoMapCode.PreTermDeliveryYear, 'PreTermDeliveryYear'],
  [PatientInfoMapCode.PreTermDeliveryTypeOfBirth, 'PreTermDeliveryTypeOfBirth'],
  [PatientInfoMapCode.PreTermDeliveryMonthsToConceive, 'PreTermDeliveryMonthsToConceive'],
  [PatientInfoMapCode.PreTermDeliveryBirthOutcome, 'PreTermDeliveryBirthOutcome'],
  [PatientInfoMapCode.MiscarriageYear, 'MiscarriageYear'],
  [PatientInfoMapCode.MiscarriageType, 'MiscarriageType'],
  [PatientInfoMapCode.MiscarriageMonthsToConceive, 'MiscarriageMonthsToConceive'],
  [PatientInfoMapCode.AbortionYear, 'AbortionYear'],
  [PatientInfoMapCode.FamilyDoctor, 'FamilyDoctor'],
  [PatientInfoMapCode.ReferringDoctor, 'ReferringDoctor'],
  [PatientInfoMapCode.ContributionMale, 'contribution'],
  [PatientInfoMapCode.ContributionFemale, 'contribution'],
  [PatientInfoMapCode.Race, 'Race'],
  [PatientInfoMapCode.PrescriptionMedication, 'PrescriptionMedication'],
  [PatientInfoMapCode.DrugAllergiesChoice, 'DrugAllergiesChoice'],
  [PatientInfoMapCode.FoodAllergiesChoice, 'FoodAllergiesChoice'],
  [PatientInfoMapCode.FamilyMemberWithHealthProblem, 'FamilyMemberWithHealthProblem'],
  [PatientInfoMapCode.ContributionFemale, 'contribution'],
  [PatientInfoMapCode.TryingForPregnancy, 'isTryingForPregnancy'],
  [PatientInfoMapCode.HasPeriod, 'hasPeriod'],
  [PatientInfoMapCode.MenstrualFlow, 'menstrualFlow'],
  [PatientInfoMapCode.DaysOfBleeding, 'daysOfBleeding'],
  [PatientInfoMapCode.MenstrualPain, 'menstrualPain'],
  [PatientInfoMapCode.PreviousPapTest, 'previousPapTest'],
  [PatientInfoMapCode.PapTestLastDate, 'papTestLastDate'],
  [PatientInfoMapCode.AbnormalPap, 'abnormalPap'],
  [PatientInfoMapCode.AbnormalPapProcedures, 'abnormalPapProcedures'],
  [PatientInfoMapCode.GynaecologicalConditions, 'gynaecologicalConditions'],
  [PatientInfoMapCode.HaveBiologicalChildren, 'haveBiologicalChildren'],
  [
    PatientInfoMapCode.HaveBiologicalChildrenWithCurrentPartner,
    'haveBiologicalChildrenWithCurrentPartner',
  ],
  [PatientInfoMapCode.HadSemenAnalysis, 'hadSemenAnalysis'],
  [PatientInfoMapCode.SemenAnalysisIsNormal, 'semenAnalysisIsNormal'],
  [PatientInfoMapCode.DiagnosedConditions, 'diagnosedConditions'],
  [PatientInfoMapCode.Vasectomy, 'vasectomy'],
  [PatientInfoMapCode.VasectomyReversal, 'vasectomyReversal'],
  [PatientInfoMapCode.ErectionDifficulties, 'erectionDifficulties'],
  [PatientInfoMapCode.SurgeryType, 'SurgeryType'],
  [PatientInfoMapCode.SurgeryDate, 'SurgeryDate'],
  [PatientInfoMapCode.FamilyHealthProblemName, 'problemOrDisease'],
  [PatientInfoMapCode.FamilyMemberRelatedToProblem, 'familyMemberName'],
  [PatientInfoMapCode.TreatmentType, 'TreatmentType'],
  [PatientInfoMapCode.TreatmentCycles, 'TreatmentCycles'],
  [PatientInfoMapCode.HasProceduresDueAbnormalPAP, 'hasProceduresDueAbnormalPAP'],
])

export const patientInfoMapCodesForMobileProfile = [
  PatientInfoMapCode.OhipCardNumber,
  PatientInfoMapCode.OhipCardVersionCode,
  PatientInfoMapCode.DateOfBirth,
]

export const patientInfoMapCodeAnswerToTopic = new Map<
  PatientInfoMapCode,
  {topicName: string; answer?: string}
>([
  [
    PatientInfoMapCode.SeenFertilitySpecialist,
    {topicName: 'TOPIC_ROI_QUESTION_ANSWER_SUBMITTED', answer: PatientAnswers.Yes},
  ],
  [
    PatientInfoMapCode.HaveBeenReferredByPhysician,
    {topicName: 'TOPIC_REFERRAL_QUESTION_ANSWER_SUBMITTED', answer: PatientAnswers.No},
  ],
  [
    PatientInfoMapCode.ReferringDoctor,
    {topicName: 'TOPIC_REFERRING_DOCTOR_QUESTION_ANSWER_SUBMITTED'},
  ],
])

export enum StaticPatientInfoMapCodeBoolean {
  SeeCounsellorForStress = 'Yes/No',
  IodineAllergy = 'Yes/No',
  LatexAllergy = 'Yes/No',
  ProblemWithAnesthetics = 'Yes/No',
  SmokeCigarettes = 'Yes/No',
  UseMarijuana = 'Yes/No',
  DrinkAlcohol = 'Yes/No',
  RecreationalDrugs = 'Yes/No',
  ExerciseRegularly = 'Yes/No',
  UsingAppToTrackOvulation = 'Yes/No',
  UsingOvulationKits = 'Yes/No',
  UsingLubricants = 'Yes/No',
  SeenFertilitySpecialist = 'Yes/No',
  IsOvulating = 'Yes/No',
  HasPeriod = 'Yes/No',
  TryingForPregnancy = 'Yes/No',
  PreviousPapTest = 'Yes/No',
  AbnormalPap = 'Yes/No',
  HaveBilogicalChildren = 'Yes/No',
  HaveBilogicalChildrenWithCurrentPartner = 'Yes/No',
  HadSemenAnalyisis = 'Yes/No',
  SemenAnalyisisIsNormal = 'Yes/No',
  Vasectomy = 'Yes/No',
  VasectomyReversal = 'Yes/No',
  ErectionDifficulties = 'Yes/No',
  HaveBiologicalChildren = 'Yes/No',
  HaveBiologicalChildrenWithCurrentPartner = 'Yes/No',
  HadSemenAnalysis = 'Yes/No',
  SemenAnalysisIsNormal = 'Yes/No',
  HasProceduresDueAbnormalPAP = 'Yes/No',
}

export enum PatientPhotoVerificationStatus {
  Missing = 'Missing',
  Pending = 'Pending',
  Verified = 'Verified',
  Rejected = 'Rejected',
}

export enum PatientDoctorType {
  Family = 'Family',
  Referring = 'Referring',
}

export enum GynaecologicalConditionsEnum {
  STI = 'STI',
  CancerCervical = 'CancerCervical',
  ConeBiopsy = 'ConeBiopsy',
  CancerOvarian = 'CancerOvarian',
  CancerUterine = 'CancerUterine',
  Endometriosis = 'Endometriosis',
  UterineFibroids = 'UterineFibroids',
  PCOS = 'PCOS',
  POIOrEarlyMenopause = 'POIOrEarlyMenopause',
  Vaginismus = 'Vaginismus',
  None = 'None',
}

export enum GynaecologicalConditionsLabel {
  STI = 'Sexually Transmitted Infection (STI)',
  CancerCervical = 'Cancer: Cervical',
  ConeBiopsy = 'Cancer: Breast',
  CancerOvarian = 'Cancer: Ovarian',
  CancerUterine = 'Cancer: Uterine',
  Endometriosis = ' Endometriosis',
  UterineFibroids = 'Fibroids (Uterine)',
  PCOS = 'Polycystic Ovary Syndrome (PCOS)',
  POIOrEarlyMenopause = 'Prematyre Ovarian Insufficiency (POI) or Early Menopause',
  Vaginismus = 'Vaginismus',
  None = 'None',
}

export const GynaecologicalConditionsTitles = {
  [GynaecologicalConditionsEnum.STI]: GynaecologicalConditionsLabel.STI,
  [GynaecologicalConditionsEnum.CancerCervical]: GynaecologicalConditionsLabel.CancerCervical,
  [GynaecologicalConditionsEnum.ConeBiopsy]: GynaecologicalConditionsLabel.ConeBiopsy,
  [GynaecologicalConditionsEnum.CancerOvarian]: GynaecologicalConditionsLabel.CancerOvarian,
  [GynaecologicalConditionsEnum.CancerUterine]: GynaecologicalConditionsLabel.CancerUterine,
  [GynaecologicalConditionsEnum.Endometriosis]: GynaecologicalConditionsLabel.Endometriosis,
  [GynaecologicalConditionsEnum.UterineFibroids]: GynaecologicalConditionsLabel.UterineFibroids,
  [GynaecologicalConditionsEnum.PCOS]: GynaecologicalConditionsLabel.PCOS,
  [GynaecologicalConditionsEnum.POIOrEarlyMenopause]:
    GynaecologicalConditionsLabel.POIOrEarlyMenopause,
  [GynaecologicalConditionsEnum.Vaginismus]: GynaecologicalConditionsLabel.Vaginismus,
  [GynaecologicalConditionsEnum.None]: GynaecologicalConditionsLabel.None,
}

export enum SortByFields {
  Name = 'Name',
  Doctor = 'Doctor',
  Alert = 'Alert',
  DateOfBirth = 'DateOfBirth',
  Status = 'Status',
}

export enum SortByFieldsPatientByAppointmentDateRequest {
  Name = 'Name',
  Doctor = 'Doctor',
  Appointment = 'Appointment',
  Status = 'Status',
}

export enum FiltersType {
  Doctor = 'Doctor',
  AlertStatus = 'AlertStatus',
  PatientStatus = 'PatientStatus',
  PatientPriority = 'PatientPriority',
}

export enum FiltersTypePatientByAppointmentDateRequest {
  Doctor = 'Doctor',
  Status = 'Status',
  ServiceType = 'ServiceType',
}

export enum SexAtBirthTitle {
  Male = 'M',
  Female = 'F',
}

export enum IVFLabPatientsSortFieldV2 {
  PatientName = 'PatientName',
  CohortStartDate = 'CohortStartDate',
  Procedure = 'Procedure',
  PlanType = 'PlanType',
  Status = 'Status',
}

export enum IvfPatientFilterType {
  PlanType = 'PlanType',
  Status = 'Status',
}

export enum IvfPatientFilterTitle {
  PlanType = 'Plan Type',
  Status = 'Status',
}

export class IvfPatientFilters {
  @IsString()
  id: IVFLabStatus | string

  @IsEnum(IvfPatientFilterType)
  type: IvfPatientFilterType
}

export class IvfCohortFilters {
  @IsString()
  id: string

  @IsEnum(IvfPatientFilterType)
  type: IvfPatientFilterType
}
