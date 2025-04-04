/* eslint-disable max-lines */

import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {QuestionInputSeed} from '@seeds/typeorm'
import {uuidSuffix} from '@libs/common/test/fixtures'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {PatientInfoMapCode} from '@libs/services-common/enums'

export const latexAlergyQuestionId = 1
export const sexAtBirthQuestionId = 2
export const foodAllergiesQuestionId = 3
export const dosageQuestionId = 4
export const ohipQuestionId = 5
export const ohipVersionCodeQuestionId = 6
export const ohipCardQuestionId = 7
export const prescriptionMedicationListQuestionId = 8
export const prescriptionMedicationNoAnswerQuestionId = 9
export const repeatGroupParentId = 10
export const usingAppToTrackOvulationId = 11
export const ectopicPregnanciesLocationId = 12
export const ectopicPregnanciesYearId = 13
export const ectopicPregnanciesTypeId = 14
export const ectopicPregnanciesMonthstoConceiveId = 15
export const preTermDeliveryYearId = 17
export const preTermDeliveryTypeId = 18
export const preTermDeliveryMonthsToConceiveId = 19
export const preTermDeliveryBirthOutcomeId = 39
export const fullTermDeliveryMonthsToConceiveId = 20
export const fullTermDeliveryBirthOutcomeId = 40
export const detailCurrentStressLevelId = 21
export const detailCurrentOccupationId = 22
export const detailDateOfBirthId = 23
export const detailDrinkAlcoholId = 24
export const detailExerciseRegularlyId = 25
export const detailHeightInInchesId = 26
export const detailProblemWithAnestheticsId = 27
export const detailPreferredPronounsId = 28
export const detailGenderId = 29
export const detailSexualOrientationId = 30
export const detailRecreationalDrugsId = 31
export const detailSeeCounsellorForStressId = 32
export const detailSmokeCigarettesId = 33
export const detailUseMarijuanaId = 34
export const detailWeightInLbsId = 35
export const detailFamilyDoctorId = 36
export const detailReferringDoctorId = 37
export const iodineAllergyQuestionId = 38
export const numberOfLiveBirthQuestionId = 41
export const isOvulatingQuestionId = 42
export const hasPeriodQuestionId = 43
export const menstrualFlowQuestionId = 44
export const menstrualDaysOfBleedingId = 45
export const menstrualPainId = 46
export const previousPapTestId = 47
export const papTestLastDateId = 48
export const patientPreviousFertilityTreatmentTypeId = 49
export const patientPreviousFertilityTreatmentCycled = 50
export const questionHaveBiologicalChildrenId = 51
export const questionHaveBiologicalChildrenWithCurrentPartnerId = 52
export const questionHadSemenAnalysisId = 53
export const questionSemenAnalysisIsNormalId = 54
export const questionDiagnosedConditionsId = 55
export const questionVasectomyId = 56
export const questionVasectomyReversalId = 57
export const questionErectionDifficultiesId = 58
export const questionPatientPastSurgeryTypeId = 59
export const questionPatientPastSurgeryDateId = 60
export const questionPatientFamilyHealthProblemProblemId = 61
export const questionPatientFamilyHealthProblemFamilyNameId = 62
export const fullTermDeliveryHistoryYearId = 63
export const fullTermDeliveryHistoryTypeId = 64
export const abortionYearId = 16
export const secondAbortionYearId = 65
export const miscarriageYearId = 66
export const miscarriageTypeId = 67
export const miscarriageMountsToConceiveId = 68
export const questionPatientDetailFemaleUsingOvulationKitsId = 69
export const questionPatientDetailFemaleUsingAppToTrackOvulationId = 70
export const questionPatientDetailFemaleUsingLubricantsId = 71
export const questionPatientDetailFemaleSeenFertilitySpecialistId = 72
export const questionDaysBetweenPeriodsId = 73
export const questionFirstDayOfLastPeriodId = 74
export const questionGynaecologicalConditionsId = 75
export const detailHeightInFeetId = 76
export const questionPatientDetailFemaleHasProceduresDueAbnormalPAPId = 77
export const questionPatientDetailMaleAbnormalPapProceduresId = 78
export const frequencyQuestionId = 79
export const questionHaveBeenReferredByPhysicianId = 80
export const questionSecondPatientPastSurgeryTypeId = 81
export const questionSecondPatientPastSurgeryDateId = 82
export const questionSecondPatientPastSurgeryId = 83
export const familyDoctorId = 84
export const familyDoctorDuplicateId = 85
export const referringDoctorDuplicateInDbId = 86

export const questionnaireFixture: Partial<Questionnaire> = {
  id: 1,
  uuid: '98b83e1d-a71b-4df7-8c9f-219c7404378f',
  title: 'questionnaire-fixture',
}
export const questionLatexAllergy: QuestionInputSeed = {
  id: latexAlergyQuestionId,
  uuid: latexAlergyQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
}

export const questionSexAtBirth: QuestionInputSeed = {
  id: sexAtBirthQuestionId,
  uuid: sexAtBirthQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SexAtBirth,
}

export const questionFoodAllergies: QuestionInputSeed = {
  id: foodAllergiesQuestionId,
  uuid: foodAllergiesQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.FoodAllergies,
}

export const questionPrescriptionMedicationListNullAnswer: QuestionInputSeed = {
  id: prescriptionMedicationNoAnswerQuestionId,
  uuid: prescriptionMedicationNoAnswerQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.Group,
  patientInfoMapCode: PatientInfoMapCode.MedicationName,
}

// Group questions
export const ohipGroupQuestion: QuestionInputSeed = {
  id: ohipQuestionId,
  uuid: ohipQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.Group,
}

export const ohipVersionQuestion: QuestionInputSeed = {
  id: ohipVersionCodeQuestionId,
  uuid: ohipVersionCodeQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.OhipCardVersionCode,
}

export const ohipCartQuestion: QuestionInputSeed = {
  id: ohipCardQuestionId,
  uuid: ohipCardQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.OhipCardNumber,
}

// Repeat group questions
export const repeatGroupParentQuestionQuestion: QuestionInputSeed = {
  id: repeatGroupParentId,
  uuid: repeatGroupParentId + uuidSuffix,
  repeat: true,
  type: QuestionType.Group,
}

export const questionDosage: QuestionInputSeed = {
  id: dosageQuestionId,
  uuid: dosageQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MedicationDosage,
}

export const questionFrequency: QuestionInputSeed = {
  id: frequencyQuestionId,
  uuid: frequencyQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MedicationFrequency,
}

export const questionPrescriptionMedicationList: QuestionInputSeed = {
  id: prescriptionMedicationListQuestionId,
  uuid: prescriptionMedicationListQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MedicationName,
}

export const questionUsingAppToTrackOvulation: QuestionInputSeed = {
  id: usingAppToTrackOvulationId,
  uuid: usingAppToTrackOvulationId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.UsingAppToTrackOvulation,
}

export const questionNumberOfLiveBirth: QuestionInputSeed = {
  id: numberOfLiveBirthQuestionId,
  uuid: numberOfLiveBirthQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.NumberOfLiveBirth,
}

export const questionIsOvulating: QuestionInputSeed = {
  id: isOvulatingQuestionId,
  uuid: isOvulatingQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.IsOvulating,
}

export const questionHasPeriod: QuestionInputSeed = {
  id: hasPeriodQuestionId,
  uuid: hasPeriodQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.HasPeriod,
}

export const questionMenstrualFlow: QuestionInputSeed = {
  id: menstrualFlowQuestionId,
  uuid: menstrualFlowQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MenstrualFlow,
}

export const questionDaysOfBleeding: QuestionInputSeed = {
  id: menstrualDaysOfBleedingId,
  uuid: menstrualDaysOfBleedingId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.DaysOfBleeding,
}

export const questionDaysBetweenPeriods: QuestionInputSeed = {
  id: questionDaysBetweenPeriodsId,
  uuid: questionDaysBetweenPeriodsId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.DaysBetweenPeriods,
}

export const questionFirstDayOfLastPeriod: QuestionInputSeed = {
  id: questionFirstDayOfLastPeriodId,
  uuid: questionFirstDayOfLastPeriodId + uuidSuffix,
  repeat: false,
  type: QuestionType.Date,
  patientInfoMapCode: PatientInfoMapCode.FirstDayOfLastPeriod,
}

export const questionMenstrualPain: QuestionInputSeed = {
  id: menstrualPainId,
  uuid: menstrualPainId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MenstrualPain,
}

export const questionPreviousPapTest: QuestionInputSeed = {
  id: previousPapTestId,
  uuid: previousPapTestId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.PreviousPapTest,
}

export const questionPapTestLastDate: QuestionInputSeed = {
  id: papTestLastDateId,
  uuid: papTestLastDateId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.PapTestLastDate,
}

export const questionAbortionYear: QuestionInputSeed = {
  id: abortionYearId,
  uuid: abortionYearId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.AbortionYear,
}

export const questionSecondAbortionYear: QuestionInputSeed = {
  id: secondAbortionYearId,
  uuid: secondAbortionYearId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.AbortionYear,
}

export const questionMiscarriageYear: QuestionInputSeed = {
  id: miscarriageYearId,
  uuid: miscarriageYearId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MiscarriageYear,
}

export const questionMiscarriageType: QuestionInputSeed = {
  id: miscarriageTypeId,
  uuid: miscarriageTypeId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MiscarriageType,
}

export const questionMiscarriageMountsToConceive: QuestionInputSeed = {
  id: miscarriageMountsToConceiveId,
  uuid: miscarriageMountsToConceiveId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MiscarriageMonthsToConceive,
}

export const questionEctopicPregnanciesLocation: QuestionInputSeed = {
  id: ectopicPregnanciesLocationId,
  uuid: ectopicPregnanciesLocationId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.EctopicPregnanciesLocation,
}

export const questionEctopicPregnanciesYear: QuestionInputSeed = {
  id: ectopicPregnanciesYearId,
  uuid: ectopicPregnanciesYearId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.EctopicPregnanciesYear,
}

export const questionEctopicPregnanciesType: QuestionInputSeed = {
  id: ectopicPregnanciesTypeId,
  uuid: ectopicPregnanciesTypeId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.EctopicPregnanciesType,
}

export const questionEctopicPregnanciesMonthsToConceive: QuestionInputSeed = {
  id: ectopicPregnanciesMonthstoConceiveId,
  uuid: ectopicPregnanciesMonthstoConceiveId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.EctopicPregnanciesMonthsToConceive,
}

export const questionPreTermDeliveryYear: QuestionInputSeed = {
  id: preTermDeliveryYearId,
  uuid: preTermDeliveryYearId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.PreTermDeliveryYear,
}

export const questionPreTermDeliveryBirthOutcome: QuestionInputSeed = {
  id: preTermDeliveryBirthOutcomeId,
  uuid: preTermDeliveryBirthOutcomeId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.PreTermDeliveryBirthOutcome,
}

export const questionPreTermDeliveryType: QuestionInputSeed = {
  id: preTermDeliveryTypeId,
  uuid: preTermDeliveryTypeId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.PreTermDeliveryTypeOfBirth,
}

export const questionPreTermDeliveryMonthsToConceive: QuestionInputSeed = {
  id: preTermDeliveryMonthsToConceiveId,
  uuid: preTermDeliveryMonthsToConceiveId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.PreTermDeliveryMonthsToConceive,
}

export const questionFullTermDeliveryMonthsToConceive: QuestionInputSeed = {
  id: fullTermDeliveryMonthsToConceiveId,
  uuid: fullTermDeliveryMonthsToConceiveId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.FullTimeDeliveryMonthsToConceive,
}

export const questionFullTermDeliveryBirthOutcome: QuestionInputSeed = {
  id: fullTermDeliveryBirthOutcomeId,
  uuid: fullTermDeliveryBirthOutcomeId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.FullTimeDeliveryBirthOutcome,
}

export const questionFullTermDeliveryYear: QuestionInputSeed = {
  id: fullTermDeliveryHistoryYearId,
  uuid: fullTermDeliveryHistoryYearId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.FullTimeDeliveryYear,
}

export const questionFullTermDeliveryType: QuestionInputSeed = {
  id: fullTermDeliveryHistoryTypeId,
  uuid: fullTermDeliveryHistoryTypeId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.FullTimeDeliveryTypeOfBirth,
}

export const questionDetailCurrentStressLevel: QuestionInputSeed = {
  id: detailCurrentStressLevelId,
  uuid: detailCurrentStressLevelId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.CurrentStressLevel,
}

export const questionDetailCurrentOccupation: QuestionInputSeed = {
  id: detailCurrentOccupationId,
  uuid: detailCurrentOccupationId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.CurrentOccupation,
}

export const questionDetailDateOfBirth: QuestionInputSeed = {
  id: detailDateOfBirthId,
  uuid: detailDateOfBirthId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.DateOfBirth,
}

export const questionDetailDrinkAlcohol: QuestionInputSeed = {
  id: detailDrinkAlcoholId,
  uuid: detailDrinkAlcoholId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.DrinkAlcohol,
}

export const questionDetailExerciseRegularly: QuestionInputSeed = {
  id: detailExerciseRegularlyId,
  uuid: detailExerciseRegularlyId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.ExerciseRegularly,
}

export const questionDetailHeightInInches: QuestionInputSeed = {
  id: detailHeightInInchesId,
  uuid: detailHeightInInchesId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.HeightInches,
}
export const questionDetailHeightInFeet: QuestionInputSeed = {
  id: detailHeightInFeetId,
  uuid: detailHeightInFeetId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.HeightFeet,
}

export const questionDetailProblemWithAnesthetics: QuestionInputSeed = {
  id: detailProblemWithAnestheticsId,
  uuid: detailProblemWithAnestheticsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.ProblemWithAnesthetics,
}

export const questionDetailPreferredPronouns: QuestionInputSeed = {
  id: detailPreferredPronounsId,
  uuid: detailPreferredPronounsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.PreferredPronouns,
}

export const questionDetailGender: QuestionInputSeed = {
  id: detailGenderId,
  uuid: detailGenderId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.Gender,
}

export const questionDetailSexualOrientation: QuestionInputSeed = {
  id: detailSexualOrientationId,
  uuid: detailSexualOrientationId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SexualOrientation,
}

export const questionDetailRecreationalDrugs: QuestionInputSeed = {
  id: detailRecreationalDrugsId,
  uuid: detailRecreationalDrugsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.RecreationalDrugs,
}

export const questionDetailSeeCounsellorForStress: QuestionInputSeed = {
  id: detailSeeCounsellorForStressId,
  uuid: detailSeeCounsellorForStressId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SeeCounsellorForStress,
}

export const questionDetailSmokeCigarettes: QuestionInputSeed = {
  id: detailSmokeCigarettesId,
  uuid: detailSmokeCigarettesId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SmokeCigarettes,
}

export const questionDetailUseMarijuana: QuestionInputSeed = {
  id: detailUseMarijuanaId,
  uuid: detailUseMarijuanaId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.UseMarijuana,
}

export const questionDetailWeightInLbs: QuestionInputSeed = {
  id: detailWeightInLbsId,
  uuid: detailWeightInLbsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.WeightInLbs,
}

export const questionDetailFamilyDoctor: QuestionInputSeed = {
  id: detailFamilyDoctorId,
  uuid: detailFamilyDoctorId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.FamilyDoctor,
}

export const questionDetailReferringDoctor: QuestionInputSeed = {
  id: detailReferringDoctorId,
  uuid: detailReferringDoctorId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.ReferringDoctor,
}

export const questionIodineAllergy: QuestionInputSeed = {
  id: iodineAllergyQuestionId,
  uuid: iodineAllergyQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.IodineAllergy,
}

export const questionPatientPreviousFertilityTreatmentType: QuestionInputSeed = {
  id: patientPreviousFertilityTreatmentTypeId,
  uuid: patientPreviousFertilityTreatmentTypeId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.TreatmentType,
}

export const questionPatientPreviousFertilityTreatmentCycle: QuestionInputSeed = {
  id: patientPreviousFertilityTreatmentCycled,
  uuid: patientPreviousFertilityTreatmentCycled + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.TreatmentCycles,
}

export const questionHaveBiologicalChildren: QuestionInputSeed = {
  id: questionHaveBiologicalChildrenId,
  uuid: questionHaveBiologicalChildrenId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.HaveBiologicalChildren,
}

export const questionHaveBiologicalChildrenWithCurrentPartner: QuestionInputSeed = {
  id: questionHaveBiologicalChildrenWithCurrentPartnerId,
  uuid: questionHaveBiologicalChildrenWithCurrentPartnerId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.HaveBiologicalChildrenWithCurrentPartner,
}

export const questionHadSemenAnalysis: QuestionInputSeed = {
  id: questionHadSemenAnalysisId,
  uuid: questionHadSemenAnalysisId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.HadSemenAnalysis,
}

export const questionSemenAnalysisIsNormal: QuestionInputSeed = {
  id: questionSemenAnalysisIsNormalId,
  uuid: questionSemenAnalysisIsNormalId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SemenAnalysisIsNormal,
}

export const questionDiagnosedConditions: QuestionInputSeed = {
  id: questionDiagnosedConditionsId,
  uuid: questionDiagnosedConditionsId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.DiagnosedConditions,
}

export const questionVasectomy: QuestionInputSeed = {
  id: questionVasectomyId,
  uuid: questionVasectomyId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.Vasectomy,
}

export const questionVasectomyReversal: QuestionInputSeed = {
  id: questionVasectomyReversalId,
  uuid: questionVasectomyReversalId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.VasectomyReversal,
}

export const questionErectionDifficulties: QuestionInputSeed = {
  id: questionErectionDifficultiesId,
  uuid: questionErectionDifficultiesId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.ErectionDifficulties,
}

export const questionPatientPastSurgeryType: QuestionInputSeed = {
  id: questionPatientPastSurgeryTypeId,
  uuid: questionPatientPastSurgeryTypeId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SurgeryType,
}

export const questionPatientPastSurgeryDate: QuestionInputSeed = {
  id: questionPatientPastSurgeryDateId,
  uuid: questionPatientPastSurgeryDateId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SurgeryDate,
}

//Group Surgery
export const questionPatientPastSurgery: QuestionInputSeed = {
  id: questionSecondPatientPastSurgeryId,
  uuid: questionSecondPatientPastSurgeryId + uuidSuffix,
  repeat: false,
  type: QuestionType.Group,
}

export const questionPatientSecondPastSurgeryType: QuestionInputSeed = {
  id: questionSecondPatientPastSurgeryTypeId,
  uuid: questionSecondPatientPastSurgeryTypeId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SurgeryType,
  parentQuestionId: questionSecondPatientPastSurgeryId,
}

export const questionPatientSecondPastSurgeryDate: QuestionInputSeed = {
  id: questionSecondPatientPastSurgeryDateId,
  uuid: questionSecondPatientPastSurgeryDateId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SurgeryDate,
  parentQuestionId: questionSecondPatientPastSurgeryId,
}

export const questionPatientFamilyHealthProblemProblem: QuestionInputSeed = {
  id: questionPatientFamilyHealthProblemProblemId,
  uuid: questionPatientFamilyHealthProblemProblemId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.FamilyHealthProblemName,
}

export const questionPatientFamilyHealthProblemFamilyName: QuestionInputSeed = {
  id: questionPatientFamilyHealthProblemFamilyNameId,
  uuid: questionPatientFamilyHealthProblemFamilyNameId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.FamilyMemberRelatedToProblem,
}

export const questionPatientDetailFemaleUsingOvulationKits: QuestionInputSeed = {
  id: questionPatientDetailFemaleUsingOvulationKitsId,
  uuid: questionPatientDetailFemaleUsingOvulationKitsId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.UsingOvulationKits,
}

export const questionPatientDetailFemaleUsingAppToTrackOvulation: QuestionInputSeed = {
  id: questionPatientDetailFemaleUsingAppToTrackOvulationId,
  uuid: questionPatientDetailFemaleUsingAppToTrackOvulationId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.UsingAppToTrackOvulation,
}

export const questionPatientDetailFemaleUsingLubricants: QuestionInputSeed = {
  id: questionPatientDetailFemaleUsingLubricantsId,
  uuid: questionPatientDetailFemaleUsingLubricantsId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.UsingLubricants,
}

export const questionPatientDetailFemaleSeenFertilitySpecialist: QuestionInputSeed = {
  id: questionPatientDetailFemaleSeenFertilitySpecialistId,
  uuid: questionPatientDetailFemaleSeenFertilitySpecialistId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SeenFertilitySpecialist,
}

export const questionGynaecologicalConditions: QuestionInputSeed = {
  id: questionGynaecologicalConditionsId,
  uuid: questionGynaecologicalConditionsId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.GynaecologicalConditions,
}

export const questionPatientDetailFemaleHasProceduresDueAbnormalPAP: QuestionInputSeed = {
  id: questionPatientDetailFemaleHasProceduresDueAbnormalPAPId,
  uuid: questionPatientDetailFemaleHasProceduresDueAbnormalPAPId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.HasProceduresDueAbnormalPAP,
}

export const questionPatientDetailMaleAbnormalPapProcedures: QuestionInputSeed = {
  id: questionPatientDetailMaleAbnormalPapProceduresId,
  uuid: questionPatientDetailMaleAbnormalPapProceduresId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.AbnormalPapProcedures,
}

export const questionHaveBeenReferredByPhysician: QuestionInputSeed = {
  id: questionHaveBeenReferredByPhysicianId,
  uuid: questionHaveBeenReferredByPhysicianId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.HaveBeenReferredByPhysician,
}

export const questionFamilyDoctor: QuestionInputSeed = {
  id: familyDoctorId,
  uuid: familyDoctorId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.FamilyDoctor,
}

export const questionFamilyDoctorDuplicate: QuestionInputSeed = {
  id: familyDoctorDuplicateId,
  uuid: familyDoctorDuplicateId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.FamilyDoctor,
}

export const questionReferringDoctor: QuestionInputSeed = {
  id: referringDoctorDuplicateInDbId,
  uuid: referringDoctorDuplicateInDbId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.ReferringDoctor,
}
