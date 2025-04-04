/* eslint-disable max-lines */
import {
  ContributionEnum,
  ContributionTitlesMapper,
} from '@libs/services-common/enums/partner-invitation.enum'
import {
  BirthOutcome,
  BirthOutcomeTitles,
  BooleanAnswers,
  BooleanValuesTitles,
  CurrentStressLevel,
  CurrentStressLevelTitles,
  DaysOfBleedingEnum,
  DaysOfBleedingTitle,
  Gender,
  GenderTitles,
  GynaecologicalConditionsEnum,
  GynaecologicalConditionsTitles,
  LocationEctopicPregnancy,
  LocationEctopicPregnancyTitles,
  MenstrualFLowEnum,
  MenstrualFlowTitles,
  MenstrualPainEnum,
  MenstrualPainTitles,
  MonthsTryingToGetPregnant,
  MonthsTryingToGetPregnantTitles,
  NumberOfPregnancies,
  NumberOfPregnanciesTitles,
  PatientAnswers,
  PatientBirthOutcomeAnswersEnum,
  PatientCyclesAnswersEnum,
  PatientCyclesAnswersIds,
  PatientCyclesAnswersTitles,
  PatientDaysOfBleedingAnswersEnum,
  PatientDiagnosedConditionsAnswersEnum,
  PatientFamilyMemberRelatedToProblemAnswersEnum,
  PatientGynaecologicalConditionsAnswersEnum,
  PatientLocationAnswersEnum,
  PatientMenstrualFlowAnswersEnum,
  PatientMenstrualPainAnswersEnum,
  PatientMiscarriageTypeAnswersEnum,
  PatientMonthsToConceiveAnswersEnum,
  PatientPreTermAndFullTermTypeAnswersEnum,
  PatientTreatmentAnswersIds,
  PatientTreatmentAnswersTitles,
  PatientTreatmentTypeAnswersEnum,
  PatientTypeAnswers,
  PreferredPronouns,
  PreferredPronounsTitles,
  Race,
  RaceTitles,
  SexualOrientation,
  SexualOrientationTitles,
  StaticPatientInfoMapCode,
  TypeEctopicPregnancy,
  TypeEctopicPregnancyTitles,
  TypeOfBirthForDeliveryEnum,
  TypeOfBirthForDeliveryTitles,
  TypePatientMiscarriageHistoryPregnancy,
  TypePatientMiscarriageHistoryPregnancyTitles,
  YearDropdownAnswersEnum,
} from '@libs/services-common/enums/patient.enum'
import {
  DiagnosedConditionsMaleEnum,
  DiagnosedConditionsMaleLabel,
  FamilyMemberEnum,
  FamilyMemberTitles,
} from '@libs/services-common/enums/medical-background-dropdown.enum'
import {
  AbnormalPAPProceduresAnswersEnum,
  AbrormalPAPProceduresEnum,
  AbrormalPAPProceduresLabel,
  AnalysisResult,
  AnalysisResultTitles,
  SemenAnalysisAnswers,
} from './test-result.enum'
import {AnswerOptionsDto} from '@libs/common/helpers/questionnaire-answer-options.helper'
import {previous30Years} from '@libs/common/helpers'

export const staticAnswerOptions = {
  [StaticPatientInfoMapCode.ContributionMale]: [
    {
      id: ContributionEnum.Sperm,
      display: ContributionTitlesMapper[ContributionEnum.Sperm],
    },
    {
      id: ContributionEnum.NoBiologicalContribution,
      display: ContributionTitlesMapper[ContributionEnum.NoBiologicalContribution],
    },
  ],
  [StaticPatientInfoMapCode.ContributionFemale]: [
    {
      id: ContributionEnum.Egg,
      display: ContributionTitlesMapper[ContributionEnum.Egg],
    },
    {
      id: ContributionEnum.Uterus,
      display: ContributionTitlesMapper[ContributionEnum.Uterus],
    },
    {
      id: ContributionEnum.EggUterus,
      display: ContributionTitlesMapper[ContributionEnum.EggUterus],
    },
    {
      id: ContributionEnum.NoBiologicalContribution,
      display: ContributionTitlesMapper[ContributionEnum.NoBiologicalContribution],
    },
  ],
  [StaticPatientInfoMapCode.Race]: [
    {
      id: Race.Black,
      display: RaceTitles[Race.Black],
    },
    {
      id: Race.EastAsian,
      display: RaceTitles[Race.EastAsian],
    },
    {
      id: Race.Latino,
      display: RaceTitles[Race.Latino],
    },
    {
      id: Race.MiddleEastern,
      display: RaceTitles[Race.MiddleEastern],
    },
    {
      id: Race.NorthAmericanAboriginal,
      display: RaceTitles[Race.NorthAmericanAboriginal],
    },
    {
      id: Race.NativeHawaiianOrOtherPacificIslander,
      display: RaceTitles[Race.NativeHawaiianOrOtherPacificIslander],
    },
    {
      id: Race.SouthAsian,
      display: RaceTitles[Race.SouthAsian],
    },
    {
      id: Race.SoutheastAsian,
      display: RaceTitles[Race.SoutheastAsian],
    },
    {
      id: Race.WhiteEuropeanDescent,
      display: RaceTitles[Race.WhiteEuropeanDescent],
    },
    {
      id: Race.Other,
      display: RaceTitles[Race.Other],
    },
  ],
  [StaticPatientInfoMapCode.Gender]: [
    {
      id: Gender.Female,
      display: GenderTitles[Gender.Female],
    },
    {
      id: Gender.Male,
      display: GenderTitles[Gender.Male],
    },
    {
      id: Gender.TransgenderFemale,
      display: GenderTitles[Gender.TransgenderFemale],
    },
    {
      id: Gender.TransgenderMale,
      display: GenderTitles[Gender.TransgenderMale],
    },
    {
      id: Gender.Other,
      display: GenderTitles[Gender.Other],
    },
  ],
  [StaticPatientInfoMapCode.PreferredPronouns]: [
    {
      id: PreferredPronouns.SheHer,
      display: PreferredPronounsTitles[PreferredPronouns.SheHer],
    },
    {
      id: PreferredPronouns.HeHim,
      display: PreferredPronounsTitles[PreferredPronouns.HeHim],
    },
    {
      id: PreferredPronouns.TheyTheir,
      display: PreferredPronounsTitles[PreferredPronouns.TheyTheir],
    },
    {
      id: PreferredPronouns.Other,
      display: PreferredPronounsTitles[PreferredPronouns.Other],
    },
  ],
  [StaticPatientInfoMapCode.SexualOrientation]: [
    {
      id: SexualOrientation.Heterosexual,
      display: SexualOrientationTitles[SexualOrientation.Heterosexual],
    },
    {
      id: SexualOrientation.Gay,
      display: SexualOrientationTitles[SexualOrientation.Gay],
    },
    {
      id: SexualOrientation.Lesbian,
      display: SexualOrientationTitles[SexualOrientation.Lesbian],
    },
    {
      id: SexualOrientation.Bisexual,
      display: SexualOrientationTitles[SexualOrientation.Bisexual],
    },
    {
      id: SexualOrientation.Queer,
      display: SexualOrientationTitles[SexualOrientation.Queer],
    },
    {
      id: SexualOrientation.TwoSpirit,
      display: SexualOrientationTitles[SexualOrientation.TwoSpirit],
    },
    {
      id: SexualOrientation.Other,
      display: SexualOrientationTitles[SexualOrientation.Other],
    },
  ],
  [StaticPatientInfoMapCode.CurrentStressLevel]: [
    {
      id: CurrentStressLevel.NotStressedAtAll,
      display: CurrentStressLevelTitles[CurrentStressLevel.NotStressedAtAll],
    },
    {
      id: CurrentStressLevel.MildlyStressed,
      display: CurrentStressLevelTitles[CurrentStressLevel.MildlyStressed],
    },
    {
      id: CurrentStressLevel.ModeratelyStressed,
      display: CurrentStressLevelTitles[CurrentStressLevel.ModeratelyStressed],
    },
    {
      id: CurrentStressLevel.VeryStressed,
      display: CurrentStressLevelTitles[CurrentStressLevel.VeryStressed],
    },
    {
      id: CurrentStressLevel.ExtremelyStressed,
      display: CurrentStressLevelTitles[CurrentStressLevel.ExtremelyStressed],
    },
  ],
  [StaticPatientInfoMapCode.MonthsTryingToGetPregnant]: [
    {
      id: MonthsTryingToGetPregnant.OneToSixMonths,
      display: MonthsTryingToGetPregnantTitles[MonthsTryingToGetPregnant.OneToSixMonths],
    },
    {
      id: MonthsTryingToGetPregnant.SixToTwelveMonths,
      display: MonthsTryingToGetPregnantTitles[MonthsTryingToGetPregnant.SixToTwelveMonths],
    },
    {
      id: MonthsTryingToGetPregnant.OneYearPlus,
      display: MonthsTryingToGetPregnantTitles[MonthsTryingToGetPregnant.OneYearPlus],
    },
  ],
  [StaticPatientInfoMapCode.NumberOfPregnancies]: [
    {
      id: NumberOfPregnancies.One,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.One],
    },
    {
      id: NumberOfPregnancies.Two,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Two],
    },
    {
      id: NumberOfPregnancies.Three,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Three],
    },
    {
      id: NumberOfPregnancies.Four,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Four],
    },
    {
      id: NumberOfPregnancies.Five,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Five],
    },
    {
      id: NumberOfPregnancies.Six,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Six],
    },
    {
      id: NumberOfPregnancies.Seven,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Seven],
    },
    {
      id: NumberOfPregnancies.Eight,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Eight],
    },
    {
      id: NumberOfPregnancies.Nine,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Nine],
    },
    {
      id: NumberOfPregnancies.Plus10,
      display: NumberOfPregnanciesTitles[NumberOfPregnancies.Plus10],
    },
  ],
  [BooleanAnswers.PatientBooleanAnswers]: [
    {
      id: PatientAnswers.Yes,
      display: BooleanValuesTitles[PatientAnswers.Yes],
    },
    {
      id: PatientAnswers.No,
      display: BooleanValuesTitles[PatientAnswers.No],
    },
  ],
  [YearDropdownAnswersEnum.PatientYearDropdownAnswers]: yearDropdownAnswers(),
  [PatientTypeAnswers.PatientTypeAnswers]: [
    {
      id: TypeEctopicPregnancy.Natural,
      display: TypeEctopicPregnancyTitles[TypeEctopicPregnancy.Natural],
    },
    {
      id: TypeEctopicPregnancy.Surgical,
      display: TypeEctopicPregnancyTitles[TypeEctopicPregnancy.Surgical],
    },
    {
      id: TypeEctopicPregnancy.MedicatedMethotrexate,
      display: TypeEctopicPregnancyTitles[TypeEctopicPregnancy.MedicatedMethotrexate],
    },
  ],
  [PatientMonthsToConceiveAnswersEnum.PatientMonthsToConceiveAnswers]: [
    {
      id: MonthsTryingToGetPregnant.OneToSixMonths,
      display: MonthsTryingToGetPregnantTitles[MonthsTryingToGetPregnant.OneToSixMonths],
    },
    {
      id: MonthsTryingToGetPregnant.SixToTwelveMonths,
      display: MonthsTryingToGetPregnantTitles[MonthsTryingToGetPregnant.SixToTwelveMonths],
    },
    {
      id: MonthsTryingToGetPregnant.OneYearPlus,
      display: MonthsTryingToGetPregnantTitles[MonthsTryingToGetPregnant.OneYearPlus],
    },
  ],
  [PatientBirthOutcomeAnswersEnum.PatientBirthOutcomeAnswers]: [
    {
      id: BirthOutcome.LiveBirth,
      display: BirthOutcomeTitles[BirthOutcome.LiveBirth],
    },
    {
      id: BirthOutcome.StillBirth,
      display: BirthOutcomeTitles[BirthOutcome.StillBirth],
    },
  ],
  [PatientLocationAnswersEnum.PatientLocationAnswers]: [
    {
      id: LocationEctopicPregnancy.LeftFallopian,
      display: LocationEctopicPregnancyTitles[LocationEctopicPregnancy.LeftFallopian],
    },
    {
      id: LocationEctopicPregnancy.RightFallopian,
      display: LocationEctopicPregnancyTitles[LocationEctopicPregnancy.RightFallopian],
    },
    {
      id: LocationEctopicPregnancy.Other,
      display: LocationEctopicPregnancyTitles[LocationEctopicPregnancy.Other],
    },
  ],
  [PatientCyclesAnswersEnum.PatientCyclesAnswers]: [
    {
      id: PatientCyclesAnswersIds.Cycle1,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle1],
    },
    {
      id: PatientCyclesAnswersIds.Cycle2,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle2],
    },
    {
      id: PatientCyclesAnswersIds.Cycle3,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle3],
    },
    {
      id: PatientCyclesAnswersIds.Cycle4,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle4],
    },
    {
      id: PatientCyclesAnswersIds.Cycle5,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle5],
    },
    {
      id: PatientCyclesAnswersIds.Cycle6,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle6],
    },
    {
      id: PatientCyclesAnswersIds.Cycle7,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle7],
    },
    {
      id: PatientCyclesAnswersIds.Cycle8,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle8],
    },
    {
      id: PatientCyclesAnswersIds.Cycle9,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle9],
    },
    {
      id: PatientCyclesAnswersIds.Cycle10,
      display: PatientCyclesAnswersTitles[PatientCyclesAnswersIds.Cycle10],
    },
  ],
  [PatientTreatmentTypeAnswersEnum.PatientTreatmentTypeAnswers]: [
    {
      id: PatientTreatmentAnswersIds.OralFertilityMedications,
      display: PatientTreatmentAnswersTitles[PatientTreatmentAnswersIds.OralFertilityMedications],
    },
    {
      id: PatientTreatmentAnswersIds.InjectableFertilityMedications,
      display:
        PatientTreatmentAnswersTitles[PatientTreatmentAnswersIds.InjectableFertilityMedications],
    },
    {
      id: PatientTreatmentAnswersIds.IntrauterineInseminationIUI,
      display:
        PatientTreatmentAnswersTitles[PatientTreatmentAnswersIds.IntrauterineInseminationIUI],
    },
    {
      id: PatientTreatmentAnswersIds.InVitroFertilizationIVF,
      display: PatientTreatmentAnswersTitles[PatientTreatmentAnswersIds.InVitroFertilizationIVF],
    },
  ],
  [PatientPreTermAndFullTermTypeAnswersEnum.PatientPreTermAndFullTermTypeAnswers]: [
    {
      id: TypeOfBirthForDeliveryEnum.Vaginal,
      display: TypeOfBirthForDeliveryTitles[TypeOfBirthForDeliveryEnum.Vaginal],
    },
    {
      id: TypeOfBirthForDeliveryEnum.CesareanSection,
      display: TypeOfBirthForDeliveryTitles[TypeOfBirthForDeliveryEnum.CesareanSection],
    },
  ],
  [PatientMiscarriageTypeAnswersEnum.PatientMiscarriageTypeAnswers]: [
    {
      id: TypePatientMiscarriageHistoryPregnancy.MedicatedMisoprostol,
      display:
        TypePatientMiscarriageHistoryPregnancyTitles[
          TypePatientMiscarriageHistoryPregnancy.MedicatedMisoprostol
        ],
    },
    {
      id: TypePatientMiscarriageHistoryPregnancy.Surgical,
      display:
        TypePatientMiscarriageHistoryPregnancyTitles[
          TypePatientMiscarriageHistoryPregnancy.Surgical
        ],
    },
    {
      id: TypePatientMiscarriageHistoryPregnancy.Natural,
      display:
        TypePatientMiscarriageHistoryPregnancyTitles[
          TypePatientMiscarriageHistoryPregnancy.Natural
        ],
    },
  ],
  [PatientMenstrualFlowAnswersEnum.PatientMenstrualFlowAnswers]: [
    {
      id: MenstrualFLowEnum.Normal,
      display: MenstrualFlowTitles[MenstrualFLowEnum.Normal],
    },
    {
      id: MenstrualFLowEnum.Light,
      display: MenstrualFlowTitles[MenstrualFLowEnum.Light],
    },
    {
      id: MenstrualFLowEnum.Heavy,
      display: MenstrualFlowTitles[MenstrualFLowEnum.Heavy],
    },
  ],
  [PatientDaysOfBleedingAnswersEnum.PatientDaysOfBleedingAnswers]: [
    {
      id: DaysOfBleedingEnum.OneToSeven,
      display: DaysOfBleedingTitle[DaysOfBleedingEnum.OneToSeven],
    },
    {
      id: DaysOfBleedingEnum.EightToTen,
      display: DaysOfBleedingTitle[DaysOfBleedingEnum.EightToTen],
    },
    {
      id: DaysOfBleedingEnum.MoreThanEleven,
      display: DaysOfBleedingTitle[DaysOfBleedingEnum.MoreThanEleven],
    },
  ],
  [PatientMenstrualPainAnswersEnum.PatientMenstrualPainAnswers]: [
    {
      id: MenstrualPainEnum.Mild,
      display: MenstrualPainTitles[MenstrualPainEnum.Mild],
    },
    {
      id: MenstrualPainEnum.Moderate,
      display: MenstrualPainTitles[MenstrualPainEnum.Moderate],
    },
    {
      id: MenstrualPainEnum.Severe,
      display: MenstrualPainTitles[MenstrualPainEnum.Severe],
    },
    {
      id: MenstrualPainEnum.NoPain,
      display: MenstrualPainTitles[MenstrualPainEnum.NoPain],
    },
  ],
  [PatientFamilyMemberRelatedToProblemAnswersEnum.PatientFamilyMemberRelatedToProblemAnswers]: [
    {
      id: FamilyMemberEnum.Mother,
      display: FamilyMemberTitles[FamilyMemberEnum.Mother],
    },
    {
      id: FamilyMemberEnum.Father,
      display: FamilyMemberTitles[FamilyMemberEnum.Father],
    },
    {
      id: FamilyMemberEnum.Sibling,
      display: FamilyMemberTitles[FamilyMemberEnum.Sibling],
    },
    {
      id: FamilyMemberEnum.MaternalGrandparent,
      display: FamilyMemberTitles[FamilyMemberEnum.MaternalGrandparent],
    },
    {
      id: FamilyMemberEnum.PaternalGrandparent,
      display: FamilyMemberTitles[FamilyMemberEnum.PaternalGrandparent],
    },
  ],
  [PatientGynaecologicalConditionsAnswersEnum.PatientGynaecologicalConditionsAnswers]: [
    {
      id: GynaecologicalConditionsEnum.STI,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.STI],
    },
    {
      id: GynaecologicalConditionsEnum.CancerCervical,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.CancerCervical],
    },
    {
      id: GynaecologicalConditionsEnum.ConeBiopsy,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.ConeBiopsy],
    },
    {
      id: GynaecologicalConditionsEnum.CancerOvarian,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.CancerOvarian],
    },
    {
      id: GynaecologicalConditionsEnum.CancerUterine,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.CancerUterine],
    },
    {
      id: GynaecologicalConditionsEnum.Endometriosis,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.Endometriosis],
    },
    {
      id: GynaecologicalConditionsEnum.UterineFibroids,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.UterineFibroids],
    },
    {
      id: GynaecologicalConditionsEnum.PCOS,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.PCOS],
    },
    {
      id: GynaecologicalConditionsEnum.POIOrEarlyMenopause,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.POIOrEarlyMenopause],
    },
    {
      id: GynaecologicalConditionsEnum.Vaginismus,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.Vaginismus],
    },
    {
      id: GynaecologicalConditionsEnum.None,
      display: GynaecologicalConditionsTitles[GynaecologicalConditionsEnum.None],
    },
  ],
  [SemenAnalysisAnswers.SemenAnalysisIsNormal]: [
    {
      id: PatientAnswers.Yes,
      display: AnalysisResultTitles[AnalysisResult.Normal],
    },
    {
      id: PatientAnswers.No,
      display: AnalysisResultTitles[AnalysisResult.Abnormal],
    },
  ],
  [PatientDiagnosedConditionsAnswersEnum.PatientDiagnosedConditionsAnswers]: [
    {
      id: DiagnosedConditionsMaleEnum.STI,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.STI],
    },
    {
      id: DiagnosedConditionsMaleEnum.CancerTesticular,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.CancerTesticular],
    },
    {
      id: DiagnosedConditionsMaleEnum.CancerProstate,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.CancerProstate],
    },
    {
      id: DiagnosedConditionsMaleEnum.UndescendedTesticle,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.UndescendedTesticle],
    },
    {
      id: DiagnosedConditionsMaleEnum.TesticularTorsion,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.TesticularTorsion],
    },
    {
      id: DiagnosedConditionsMaleEnum.Hernia,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.Hernia],
    },
    {
      id: DiagnosedConditionsMaleEnum.Mumps,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.Mumps],
    },
    {
      id: DiagnosedConditionsMaleEnum.None,
      display: DiagnosedConditionsMaleLabel[DiagnosedConditionsMaleEnum.None],
    },
  ],
  [AbnormalPAPProceduresAnswersEnum.AbnormalPAPProceduresAnswers]: [
    {
      id: AbrormalPAPProceduresEnum.Biopsy,
      display: AbrormalPAPProceduresLabel[AbrormalPAPProceduresEnum.Biopsy],
    },
    {
      id: AbrormalPAPProceduresEnum.ConeBiopsy,
      display: AbrormalPAPProceduresLabel[AbrormalPAPProceduresEnum.ConeBiopsy],
    },
    {
      id: AbrormalPAPProceduresEnum.LEEP,
      display: AbrormalPAPProceduresLabel[AbrormalPAPProceduresEnum.LEEP],
    },
  ],
}
function yearDropdownAnswers(): AnswerOptionsDto[] {
  return previous30Years().map((year) => ({
    id: String(year),
    display: String(year),
  }))
}
