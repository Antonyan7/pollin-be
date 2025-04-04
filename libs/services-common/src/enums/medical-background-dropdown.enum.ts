import {
  ContributionEnum,
  ContributionTitlesMapper,
  RelationshipEnum,
  RelationshipLabel,
} from '@libs/services-common/enums/partner-invitation.enum'
import {
  BirthOutcome,
  BirthOutcomeTitles,
  CurrentStressLevel,
  CurrentStressLevelTitles,
  DaysOfBleedingEnum,
  DaysOfBleedingLabel,
  Gender,
  GenderTitles,
  GynaecologicalConditionsEnum,
  GynaecologicalConditionsLabel,
  LocationEctopicPregnancy,
  LocationEctopicPregnancyTitles,
  MenstrualFLowEnum,
  MenstrualFLowLabel,
  MenstrualPainEnum,
  MenstrualPainLabel,
  MonthsTryingToGetPregnant,
  MonthsTryingToGetPregnantTitles,
  PreferredPronouns,
  PreferredPronounsTitles,
  SexualOrientation,
  SexualOrientationTitles,
  TypeEctopicPregnancy,
  TypeEctopicPregnancyTitles,
  TypeOfBirthForDeliveryEnum,
  TypeOfBirthForDeliveryLabel,
  TypePatientMiscarriageHistoryPregnancy,
  TypePatientMiscarriageHistoryPregnancyTitles,
} from '@libs/services-common/enums/patient.enum'
import {
  AbrormalPAPProceduresEnum,
  AbrormalPAPProceduresLabel,
} from '@libs/services-common/enums/test-result.enum'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export enum MedicalbackgroundDropdownsEnum {
  MonthsConceiving = 'MonthsConceiving',
  FertilityTreatmentCycles = 'FertilityTreatmentCycles',
  TypeOfPregnancy = 'TypeOfPregnancy',
  YearOfBirth = 'YearOfBirth',
  VOrCs = 'VOrCs',
  BirthOutcome = 'BirthOutcome',
  MonthsToConceive = 'MonthsToConceive',
  YearOfEctopic = 'YearOfEctopic',
  PregnancySide = 'PregnancySide',
  EctopicPregnancyTreatment = 'EctopicPregnancyTreatment',
  MissCarriagePregnancyTreatment = 'MissCarriagePregnancyTreatment',
  YearOfMiscarriage = 'YearOfMiscarriage',
  MenstrualFlow = 'MenstrualFlow',
  DaysOfBleeding = 'DaysOfBleeding',
  MenstrualPain = 'MenstrualPain',
  ProceduresDueToAbnormalPap = 'ProceduresDueToAbnormalPap',
  GynaecologicalConditions = 'GynaecologicalConditions',
  Hyperprolactinemia = 'Hyperprolactinemia',
  SignsOfPOI = 'SignsOfPOI',
  SignsOfPCOS = 'SignsOfPCOS',
  PrimaryPatientContribution = 'PrimaryPatientContribution',
  Province = 'Province',
  RelationshipStatus = 'RelationshipStatus',
  Gender = 'Gender',
  Pronouns = 'Pronouns',
  SexualOrientation = 'SexualOrientation',
  StressLevel = 'StressLevel',
  FamilyMember = 'FamilyMember',
  DiagnosedConditions = 'DiagnosedConditions',
}

export enum MedicalbackgroundDropdownsLabel {
  MonthsConceiving = 'Months Conceiving',
  FertilityTreatmentCycles = 'Fertility Treatment Cycles',
  TypeOfPregnancy = 'Type of Pregnancy',
  YearOfBirth = 'Year of Birth',
  VOrCs = 'V/CS',
  BirthOutcome = 'Birth Outcome',
  MonthsToConceive = 'Months To Conceive',
  YearOfEctopic = 'Year of Ectopic/Tubal',
  PregnancySide = 'R/L Side',
  EctopicPregnancyTreatment = 'Ectopic Pregnancy Treatment',
  MissCarriagePregnancyTreatment = 'Miscarriage Pregnancy Treatment',
  YearOfMiscarriage = 'Year of Miscarriage',
  MenstrualFlow = 'Menstrual Flow',
  DaysOfBleeding = 'Days of Bleeding',
  MenstrualPain = 'Menstrual Pain',
  ProceduresDueToAbnormalPap = 'Procedures Due to Abnormal PAP',
  GynaecologicalConditions = 'Gynaecological Conditions',
  Hyperprolactinemia = 'Hypo/hyperprolactinemia',
  SignsOfPOI = 'Signs of POI',
  SignsOfPCOS = 'Signs of PCOS',
  PrimaryPatientContribution = 'Primary Patient Contribution',
  Province = 'Province',
  PartnerContribution = 'Partner Contribution',
  Gender = 'Gender',
  Pronouns = 'Pronouns',
  SexualOrientation = 'Sexual Orientation',
  RelationshipStatus = 'Relationship Status',
  StressLevel = 'Stress Level',
  FamilyMember = 'Family Member',
  DiagnosedConditions = 'Diagnosed Conditions,',
}

export enum SignsOfPCOSEnum {
  Acne = 'Acne',
  ExcessHairGrowth = 'ExcessHairGrowth',
  None = 'None',
}

export enum SignsOfPCOSLabel {
  Acne = 'Acne',
  ExcessHairGrowth = 'Excess hair growth',
  None = 'None',
}

export enum HyperprolactinemiaEnum {
  Headaches = 'Headaches',
  ExcessHairGrowth = 'ExcessHairGrowth',
  BreastDischarge = 'BreastDischarge',
  None = 'None',
}

export enum HyperprolactinemiaLabel {
  Headaches = 'Headaches',
  ExcessHairGrowth = 'Excess hair growth',
  BreastDischarge = 'Breast discharge',
  None = 'None',
}

export enum SignsOfPOIEnum {
  HotFlashes = 'HotFlashes',
  VaginalDryness = 'VaginalDryness',
  None = 'None',
}

export enum SignsOfPOILabel {
  HotFlashes = 'Hot flashes',
  VaginalDryness = 'Vaginal dryness',
  None = 'None',
}

export enum DiagnosedConditionsMaleEnum {
  STI = 'STI',
  CancerTesticular = 'CancerTesticular',
  CancerProstate = 'CancerProstate',
  UndescendedTesticle = 'UndescendedTesticle',
  TesticularTorsion = 'TesticularTorsion',
  Hernia = 'Hernia',
  Mumps = 'Mumps',
  None = 'None',
}

export enum DiagnosedConditionsMaleLabel {
  STI = 'Sexually Transmitted Infection (STI)',
  CancerTesticular = 'Cancer: Testicular',
  CancerProstate = 'Cancer: Prostate',
  UndescendedTesticle = 'Undescended testicle(s)',
  TesticularTorsion = 'Testicular Torsion',
  Hernia = 'Hernia',
  Mumps = 'Mumps',
  None = 'None',
}
export enum ProvinceEnum {
  NL = 'NL',
  PE = 'PE',
  NS = 'NS',
  NB = 'NB',
  QC = 'QC',
  ON = 'ON',
  MB = 'MB',
  SK = 'SK',
  AB = 'AB',
  BC = 'BC',
  YT = 'YT',
  NT = 'NT',
  NU = 'NU',
}

export const cyclesOptionsLabel = (): Record<string, string> => {
  const result: Record<string, string> = {}
  result['1'] = '1 cycle'
  for (let i = 2; i <= 10; i++) {
    result[i.toString()] = `${i} cycles`
  }
  return result
}
const CyclesLabels = cyclesOptionsLabel()
// creating Record with key as year and value as same year ===> {"2023":"2023"}
export const previous30YearsOptions = (): Record<string, string> => {
  const result: Record<string, string> = {}
  for (let i = 0; i <= 30; i++) {
    const year = dateTimeUtil.getYear(dateTimeUtil.now()) - i
    result[year.toString()] = year.toString()
  }
  return result
}
const Previous30Years = previous30YearsOptions()

export const cyclesOptionsIds = (): Record<string, string> => {
  const result: Record<string, string> = {}
  for (let i = 1; i <= 10; i++) {
    result[i.toString()] = `${i}`
  }
  return result
}
const CyclesIds = cyclesOptionsIds()

export enum TypeOfMiscarriageEnum {
  Natural = 'Natural',
  Medicated = 'Medicated',
  Surgical = 'Surgical',
}

export enum TypeOfPregnancyEnum {
  FullTerm = 'FullTerm',
  Preterm = 'Preterm',
  EctopicTubal = 'EctopicTubal',
  Miscarriage = 'Miscarriage',
  ElectiveTermination = 'ElectiveTermination',
}

export enum TypeOfPregnancyLabel {
  FullTerm = 'Full Term (T)',
  Preterm = 'Preterm (P)',
  EctopicTubal = 'Ectopic/Tubal (E)',
  Miscarriage = 'Miscarriage (A)',
  ElectiveTermination = 'Elective Termination (TA)',
}

export enum FamilyMemberEnum {
  Mother = 'Mother',
  Father = 'Father',
  Sibling = 'Sibling',
  MaternalGrandparent = 'MaternalGrandparent',
  PaternalGrandparent = 'PaternalGrandparent',
}

export enum FamilyMemberLabel {
  Mother = 'Mother',
  Father = 'Father',
  Sibling = 'Sibling',
  MaternalGrandparent = 'Maternal Grandparent',
  PaternalGrandparent = 'Paternal Grandparent',
}

export const FamilyMemberTitles = {
  [FamilyMemberEnum.Mother]: FamilyMemberLabel.Mother,
  [FamilyMemberEnum.Father]: FamilyMemberLabel.Father,
  [FamilyMemberEnum.Sibling]: FamilyMemberLabel.Sibling,
  [FamilyMemberEnum.MaternalGrandparent]: FamilyMemberLabel.MaternalGrandparent,
  [FamilyMemberEnum.PaternalGrandparent]: FamilyMemberLabel.PaternalGrandparent,
}

// Mapping DropDownType with option ids
// It is used to get option Ids for each dropdown type
export const getMedicalbackgroundDropdownOptionsEnumList = new Map<
  MedicalbackgroundDropdownsEnum,
  Record<string, string>
>([
  [MedicalbackgroundDropdownsEnum.FertilityTreatmentCycles, CyclesIds],
  [MedicalbackgroundDropdownsEnum.MonthsConceiving, MonthsTryingToGetPregnant],
  [MedicalbackgroundDropdownsEnum.MonthsToConceive, MonthsTryingToGetPregnant],
  [MedicalbackgroundDropdownsEnum.MenstrualFlow, MenstrualFLowEnum],
  [MedicalbackgroundDropdownsEnum.DaysOfBleeding, DaysOfBleedingEnum],
  [MedicalbackgroundDropdownsEnum.MenstrualPain, MenstrualPainEnum],
  [MedicalbackgroundDropdownsEnum.ProceduresDueToAbnormalPap, AbrormalPAPProceduresEnum],
  [MedicalbackgroundDropdownsEnum.GynaecologicalConditions, GynaecologicalConditionsEnum],
  [MedicalbackgroundDropdownsEnum.SignsOfPCOS, SignsOfPCOSEnum],
  [MedicalbackgroundDropdownsEnum.SignsOfPOI, SignsOfPOIEnum],
  [MedicalbackgroundDropdownsEnum.Hyperprolactinemia, HyperprolactinemiaEnum],
  [MedicalbackgroundDropdownsEnum.DiagnosedConditions, DiagnosedConditionsMaleEnum],
  [MedicalbackgroundDropdownsEnum.PrimaryPatientContribution, ContributionEnum], //discuss sex based dropwon
  [MedicalbackgroundDropdownsEnum.Gender, Gender],
  [MedicalbackgroundDropdownsEnum.SexualOrientation, SexualOrientation],
  [MedicalbackgroundDropdownsEnum.Pronouns, PreferredPronouns],
  [MedicalbackgroundDropdownsEnum.RelationshipStatus, RelationshipEnum],
  [MedicalbackgroundDropdownsEnum.StressLevel, CurrentStressLevel],
  [MedicalbackgroundDropdownsEnum.Province, ProvinceEnum],
  [MedicalbackgroundDropdownsEnum.YearOfBirth, Previous30Years],
  [MedicalbackgroundDropdownsEnum.VOrCs, TypeOfBirthForDeliveryEnum],
  [MedicalbackgroundDropdownsEnum.BirthOutcome, BirthOutcome],
  [MedicalbackgroundDropdownsEnum.YearOfEctopic, Previous30Years],
  [MedicalbackgroundDropdownsEnum.EctopicPregnancyTreatment, TypeEctopicPregnancy],
  [
    MedicalbackgroundDropdownsEnum.MissCarriagePregnancyTreatment,
    TypePatientMiscarriageHistoryPregnancy,
  ],
  [MedicalbackgroundDropdownsEnum.YearOfMiscarriage, Previous30Years],
  [MedicalbackgroundDropdownsEnum.PregnancySide, LocationEctopicPregnancy],
  [MedicalbackgroundDropdownsEnum.TypeOfPregnancy, TypeOfPregnancyEnum],
  [MedicalbackgroundDropdownsEnum.FamilyMember, FamilyMemberEnum],
])

// Mapping DropDownType with option labels
// It is used to get option titles for each dropdown type
export const getMedicalbackgroundDropdownOptionsEnumListLabels = new Map<
  MedicalbackgroundDropdownsEnum,
  Record<string, string>
>([
  [MedicalbackgroundDropdownsEnum.FertilityTreatmentCycles, CyclesLabels],
  [MedicalbackgroundDropdownsEnum.MonthsConceiving, MonthsTryingToGetPregnantTitles],
  [MedicalbackgroundDropdownsEnum.MonthsToConceive, MonthsTryingToGetPregnantTitles],
  [MedicalbackgroundDropdownsEnum.MenstrualFlow, MenstrualFLowLabel],
  [MedicalbackgroundDropdownsEnum.DaysOfBleeding, DaysOfBleedingLabel],
  [MedicalbackgroundDropdownsEnum.MenstrualPain, MenstrualPainLabel],
  [MedicalbackgroundDropdownsEnum.ProceduresDueToAbnormalPap, AbrormalPAPProceduresLabel],
  [MedicalbackgroundDropdownsEnum.GynaecologicalConditions, GynaecologicalConditionsLabel],
  [MedicalbackgroundDropdownsEnum.SignsOfPCOS, SignsOfPCOSLabel],
  [MedicalbackgroundDropdownsEnum.SignsOfPOI, SignsOfPOILabel],
  [MedicalbackgroundDropdownsEnum.Hyperprolactinemia, HyperprolactinemiaLabel],
  [MedicalbackgroundDropdownsEnum.DiagnosedConditions, DiagnosedConditionsMaleLabel],
  [MedicalbackgroundDropdownsEnum.PrimaryPatientContribution, ContributionTitlesMapper],
  [MedicalbackgroundDropdownsEnum.Gender, GenderTitles],
  [MedicalbackgroundDropdownsEnum.SexualOrientation, SexualOrientationTitles],
  [MedicalbackgroundDropdownsEnum.Pronouns, PreferredPronounsTitles],
  [MedicalbackgroundDropdownsEnum.RelationshipStatus, RelationshipLabel],
  [MedicalbackgroundDropdownsEnum.StressLevel, CurrentStressLevelTitles],
  [MedicalbackgroundDropdownsEnum.Province, ProvinceEnum],
  [MedicalbackgroundDropdownsEnum.YearOfBirth, Previous30Years],
  [MedicalbackgroundDropdownsEnum.VOrCs, TypeOfBirthForDeliveryLabel],
  [MedicalbackgroundDropdownsEnum.BirthOutcome, BirthOutcomeTitles],
  [MedicalbackgroundDropdownsEnum.YearOfEctopic, Previous30Years],
  [MedicalbackgroundDropdownsEnum.EctopicPregnancyTreatment, TypeEctopicPregnancyTitles],
  [
    MedicalbackgroundDropdownsEnum.MissCarriagePregnancyTreatment,
    TypePatientMiscarriageHistoryPregnancyTitles,
  ],
  [MedicalbackgroundDropdownsEnum.YearOfMiscarriage, Previous30Years],
  [MedicalbackgroundDropdownsEnum.PregnancySide, LocationEctopicPregnancyTitles],
  [MedicalbackgroundDropdownsEnum.TypeOfPregnancy, TypeOfPregnancyLabel],
  [MedicalbackgroundDropdownsEnum.FamilyMember, FamilyMemberLabel],
])
