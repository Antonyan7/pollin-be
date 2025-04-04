import {
  abortionYearId,
  secondAbortionYearId,
  miscarriageYearId,
  miscarriageTypeId,
  miscarriageMountsToConceiveId,
  detailCurrentOccupationId,
  detailCurrentStressLevelId,
  detailDateOfBirthId,
  detailDrinkAlcoholId,
  detailExerciseRegularlyId,
  detailFamilyDoctorId,
  detailGenderId,
  detailHeightInInchesId,
  detailPreferredPronounsId,
  detailProblemWithAnestheticsId,
  detailRecreationalDrugsId,
  detailReferringDoctorId,
  detailSeeCounsellorForStressId,
  detailSexualOrientationId,
  detailSmokeCigarettesId,
  detailUseMarijuanaId,
  detailWeightInLbsId,
  dosageQuestionId,
  ectopicPregnanciesLocationId,
  ectopicPregnanciesMonthstoConceiveId,
  ectopicPregnanciesTypeId,
  ectopicPregnanciesYearId,
  foodAllergiesQuestionId,
  fullTermDeliveryBirthOutcomeId,
  fullTermDeliveryMonthsToConceiveId,
  fullTermDeliveryHistoryYearId,
  hasPeriodQuestionId,
  iodineAllergyQuestionId,
  isOvulatingQuestionId,
  latexAlergyQuestionId,
  menstrualDaysOfBleedingId,
  menstrualFlowQuestionId,
  menstrualPainId,
  numberOfLiveBirthQuestionId,
  ohipCartQuestion,
  ohipGroupQuestion,
  ohipVersionQuestion,
  papTestLastDateId,
  patientPreviousFertilityTreatmentCycled,
  patientPreviousFertilityTreatmentTypeId,
  prescriptionMedicationListQuestionId,
  preTermDeliveryBirthOutcomeId,
  preTermDeliveryMonthsToConceiveId,
  preTermDeliveryTypeId,
  preTermDeliveryYearId,
  previousPapTestId,
  questionDiagnosedConditionsId,
  questionErectionDifficultiesId,
  questionHadSemenAnalysisId,
  questionHaveBiologicalChildrenId,
  questionHaveBiologicalChildrenWithCurrentPartnerId,
  questionPatientPastSurgeryDateId,
  questionPatientFamilyHealthProblemProblemId,
  questionPatientFamilyHealthProblemFamilyNameId,
  questionPatientPastSurgeryTypeId,
  questionPrescriptionMedicationListNullAnswer,
  questionSemenAnalysisIsNormalId,
  questionVasectomyId,
  questionVasectomyReversalId,
  repeatGroupParentId,
  sexAtBirthQuestionId,
  usingAppToTrackOvulationId,
  fullTermDeliveryHistoryTypeId,
  questionPatientDetailFemaleUsingOvulationKitsId,
  questionPatientDetailFemaleUsingAppToTrackOvulationId,
  questionPatientDetailFemaleUsingLubricantsId,
  questionPatientDetailFemaleSeenFertilitySpecialistId,
  questionDaysBetweenPeriodsId,
  questionFirstDayOfLastPeriodId,
  questionGynaecologicalConditionsId,
  detailHeightInFeetId,
  questionPatientDetailFemaleHasProceduresDueAbnormalPAPId,
  questionPatientDetailMaleAbnormalPapProceduresId,
  frequencyQuestionId,
  questionHaveBeenReferredByPhysicianId,
  questionSecondPatientPastSurgeryDateId,
  questionSecondPatientPastSurgeryTypeId,
  questionSecondPatientPastSurgeryId,
} from './question.fixture'
import {questionnaireIntentFixture} from './questionnaire.fixture'

export const questionnaireToQuestions = [
  {
    questionId: latexAlergyQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 2,
  },

  {
    questionId: sexAtBirthQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 3,
  },
  {
    questionId: foodAllergiesQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 4,
  },
  //repeat group
  {
    questionId: dosageQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 5,
  },
  {
    questionId: frequencyQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 6,
  },
  {
    questionId: prescriptionMedicationListQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 7,
  },
  {
    questionId: repeatGroupParentId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 8,
  },
  //group
  {
    questionId: ohipGroupQuestion.id,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 9,
  },
  {
    questionId: ohipCartQuestion.id,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 10,
  },
  {
    questionId: ohipVersionQuestion.id,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 11,
  },
  {
    questionId: questionPrescriptionMedicationListNullAnswer.id,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 12,
  },
  {
    questionId: usingAppToTrackOvulationId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 13,
  },
  {
    questionId: abortionYearId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 14,
  },
  {
    questionId: ectopicPregnanciesLocationId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 15,
  },
  {
    questionId: ectopicPregnanciesYearId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 16,
  },
  {
    questionId: ectopicPregnanciesTypeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 17,
  },
  {
    questionId: ectopicPregnanciesMonthstoConceiveId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 18,
  },
  {
    questionId: preTermDeliveryYearId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 19,
  },
  {
    questionId: preTermDeliveryTypeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 20,
  },
  {
    questionId: preTermDeliveryMonthsToConceiveId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 21,
  },
  {
    questionId: preTermDeliveryBirthOutcomeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 22,
  },
  {
    questionId: fullTermDeliveryMonthsToConceiveId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 23,
  },
  {
    questionId: fullTermDeliveryBirthOutcomeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 24,
  },
  //detail
  {
    questionId: detailCurrentStressLevelId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 25,
  },
  {
    questionId: detailCurrentOccupationId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 26,
  },
  {
    questionId: detailDateOfBirthId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 27,
  },
  {
    questionId: detailDrinkAlcoholId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 28,
  },
  {
    questionId: detailExerciseRegularlyId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 29,
  },
  {
    questionId: detailHeightInInchesId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 30,
  },
  {
    questionId: detailProblemWithAnestheticsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 31,
  },
  {
    questionId: detailPreferredPronounsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 32,
  },
  {
    questionId: detailGenderId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 33,
  },
  {
    questionId: detailSexualOrientationId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 34,
  },
  {
    questionId: detailRecreationalDrugsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 35,
  },
  {
    questionId: detailSeeCounsellorForStressId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 36,
  },
  {
    questionId: detailSmokeCigarettesId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 37,
  },
  {
    questionId: detailUseMarijuanaId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 38,
  },
  {
    questionId: detailWeightInLbsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 39,
  },
  {
    questionId: detailFamilyDoctorId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 40,
  },
  {
    questionId: detailReferringDoctorId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 41,
  },
  {
    questionId: iodineAllergyQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 40,
  },
  {
    questionId: numberOfLiveBirthQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 42,
  },
  {
    questionId: isOvulatingQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 43,
  },
  {
    questionId: hasPeriodQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 44,
  },
  {
    questionId: menstrualFlowQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 45,
  },
  {
    questionId: menstrualFlowQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 46,
  },
  {
    questionId: menstrualDaysOfBleedingId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 47,
  },
  {
    questionId: menstrualPainId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 48,
  },
  {
    questionId: papTestLastDateId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 49,
  },
  {
    questionId: previousPapTestId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 50,
  },
  {
    questionId: patientPreviousFertilityTreatmentTypeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 51,
  },
  {
    questionId: patientPreviousFertilityTreatmentCycled,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 52,
  },
  {
    questionId: questionHaveBiologicalChildrenId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 53,
  },
  {
    questionId: questionHaveBiologicalChildrenWithCurrentPartnerId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 54,
  },
  {
    questionId: questionHadSemenAnalysisId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 55,
  },
  {
    questionId: questionSemenAnalysisIsNormalId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 56,
  },
  {
    questionId: questionDiagnosedConditionsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 57,
  },
  {
    questionId: questionVasectomyId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 58,
  },
  {
    questionId: questionVasectomyReversalId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 59,
  },
  {
    questionId: questionErectionDifficultiesId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 60,
  },
  {
    questionId: questionPatientPastSurgeryTypeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 61,
  },
  {
    questionId: questionPatientPastSurgeryDateId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 62,
  },
  {
    questionId: questionPatientFamilyHealthProblemProblemId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 63,
  },
  {
    questionId: questionPatientFamilyHealthProblemFamilyNameId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 64,
  },
  {
    questionId: fullTermDeliveryHistoryYearId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 65,
  },
  {
    questionId: fullTermDeliveryHistoryTypeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 66,
  },
  {
    questionId: secondAbortionYearId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 67,
  },
  {
    questionId: miscarriageYearId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 68,
  },
  {
    questionId: miscarriageTypeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 69,
  },
  {
    questionId: miscarriageMountsToConceiveId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 70,
  },
  {
    questionId: questionPatientDetailFemaleUsingOvulationKitsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 71,
  },
  {
    questionId: questionPatientDetailFemaleUsingAppToTrackOvulationId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 72,
  },
  {
    questionId: questionPatientDetailFemaleUsingLubricantsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 73,
  },
  {
    questionId: questionPatientDetailFemaleSeenFertilitySpecialistId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 74,
  },
  {
    questionId: questionDaysBetweenPeriodsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 75,
  },
  {
    questionId: questionFirstDayOfLastPeriodId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 76,
  },
  {
    questionId: questionGynaecologicalConditionsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 77,
  },
  {
    questionId: detailHeightInFeetId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 78,
  },
  {
    questionId: questionPatientDetailFemaleHasProceduresDueAbnormalPAPId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 79,
  },
  {
    questionId: questionPatientDetailMaleAbnormalPapProceduresId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 80,
  },
  {
    questionId: questionHaveBeenReferredByPhysicianId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 81,
  },
  {
    questionId: questionSecondPatientPastSurgeryId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 82,
  },
  {
    questionId: questionSecondPatientPastSurgeryTypeId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 83,
  },
  {
    questionId: questionSecondPatientPastSurgeryDateId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 84,
  },
]
