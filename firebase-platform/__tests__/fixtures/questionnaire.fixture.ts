/* eslint-disable max-lines */
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {
  abortionYearId,
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
  ectopicPregnanciesLocationId,
  ectopicPregnanciesMonthstoConceiveId,
  ectopicPregnanciesTypeId,
  ectopicPregnanciesYearId,
  fullTermDeliveryMonthsToConceiveId,
  hasPeriodQuestionId,
  isOvulatingQuestionId,
  menstrualDaysOfBleedingId,
  menstrualPainId,
  numberOfLiveBirthQuestionId,
  ohipCartQuestion,
  ohipGroupQuestion,
  ohipVersionQuestion,
  papTestLastDateId,
  preTermDeliveryBirthOutcomeId,
  preTermDeliveryMonthsToConceiveId,
  preTermDeliveryTypeId,
  preTermDeliveryYearId,
  previousPapTestId,
  questionDosage,
  questionFoodAllergies,
  questionIodineAllergy,
  questionLatexAllergy,
  questionnaireFixture,
  questionPrescriptionMedicationList,
  questionPrescriptionMedicationListNullAnswer,
  questionSexAtBirth,
  repeatGroupParentId,
  usingAppToTrackOvulationId,
  questionPatientPreviousFertilityTreatmentType,
  questionPatientPreviousFertilityTreatmentCycle,
  questionSemenAnalysisIsNormalId,
  questionHaveBiologicalChildren,
  questionHaveBiologicalChildrenWithCurrentPartner,
  questionHadSemenAnalysis,
  questionErectionDifficulties,
  questionVasectomy,
  questionVasectomyReversal,
  questionPatientPastSurgeryType,
  questionPatientPastSurgeryDate,
  questionPatientFamilyHealthProblemProblem,
  questionPatientFamilyHealthProblemFamilyName,
  fullTermDeliveryBirthOutcomeId,
  fullTermDeliveryHistoryYearId,
  fullTermDeliveryHistoryTypeId,
  secondAbortionYearId,
  miscarriageYearId,
  miscarriageTypeId,
  miscarriageMountsToConceiveId,
  questionPatientDetailFemaleUsingOvulationKitsId,
  questionPatientDetailFemaleUsingAppToTrackOvulationId,
  questionPatientDetailFemaleUsingLubricantsId,
  questionPatientDetailFemaleSeenFertilitySpecialistId,
  menstrualFlowQuestionId,
  questionDaysBetweenPeriodsId,
  questionFirstDayOfLastPeriodId,
  questionGynaecologicalConditionsId,
  detailHeightInFeetId,
  questionPatientDetailFemaleHasProceduresDueAbnormalPAPId,
  questionDiagnosedConditionsId,
  questionPatientDetailMaleAbnormalPapProceduresId,
  questionFrequency,
  questionHaveBeenReferredByPhysicianId,
  questionPatientSecondPastSurgeryType,
  questionPatientSecondPastSurgeryDate,
  questionSecondPatientPastSurgeryId,
  familyDoctorId,
  familyDoctorDuplicateId,
  referringDoctorDuplicateInDbId,
} from './question.fixture'
import {
  DaysOfBleedingEnum,
  MenstrualPainEnum,
  PatientAnswers,
} from '@libs/services-common/enums/patient.enum'
import {
  Gender,
  PreferredPronouns,
  SexualOrientation,
} from '@libs/services-common/enums/patient.enum'
import {QuestionnaireIntent} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {serviceCategoryFixture} from '@libs/common/test/fixtures'
import {FamilyMemberEnum} from '@libs/services-common/enums/medical-background-dropdown.enum'
import {PatientTreatmentAnswersIds} from '@libs/services-common/enums'
import {TypeOfBirthForDeliveryEnum} from '@libs/services-common/enums'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {patientDetailFixture} from '@libs/common/test/fixtures/patient-detail.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const ohipCardNumber = '8755-432-989'
export const ohipCardVersionCode = 'ohipCardVersionCode'

export const medicationName = 'Aspirin'
export const medicationDosage = '100ML'
export const medicationFrequency = '2 times per day'
export const firstTreatmentType = PatientTreatmentAnswersIds.InVitroFertilizationIVF
export const firstTreatmentCycle = '1'
export const secondTreatmentType = PatientTreatmentAnswersIds.InjectableFertilityMedications
export const secondTreatmentCycle = '2'
export const thirdTreatmentType = PatientTreatmentAnswersIds.OralFertilityMedications
export const thirdTreatmentCycle = '3'
export const diagnosedConditionsValue = ['Sexually Transmitted Infection (STI), Testicular Torsion']
export const patientPastSurgeryType = 'patientPastSurgeryType'
export const patientPastSecondSurgeryType = 'patientPastSecondSurgeryType'
export const patientPastSurgeryDate = dateTimeUtil.formatIsoDate()
export const patientPastSecondSurgeryDate = dateTimeUtil.formatIsoDate()
export const patientDateOfBirth = '2001-10-11'
const questionnaireIntentId = 'questionnaire-intent-fixture-CF'
const questionnaireWithoudDoctorIntentId = 'questionnaire-without-doctor-intent-fixture-CF'
export const patientDetailMaleAbnormalPapProceduresAnswer = ['Biopsy', 'LEEP', 'Cone biopsy']

export const patientReferringDoctorAuthUserId = 'CF_authUserId_ref_doc'
export const patientFamilyDoctorAuthUserId = 'CF_authUserId_fam_doc'

export const questionnaireIntentFixture: Partial<QuestionnaireIntent> = {
  id: questionnaireIntentId,
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientDetailFixture.id,
  updatedBy: 'id-email-verified-auth-fixture',
  isCompleted: false,
  questions: [
    {questionId: questionLatexAllergy.id, answerType: QuestionType.String, answers: ['Yes']},
    {questionId: questionIodineAllergy.id, answerType: QuestionType.String, answers: ['Yes']},
    {
      questionId: questionHaveBiologicalChildren.id,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionHaveBiologicalChildrenWithCurrentPartner.id,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {questionId: questionHadSemenAnalysis.id, answerType: QuestionType.String, answers: ['Yes']},
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem1'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.Father],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem2'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.Mother],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem3'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.Sibling],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem4'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.MaternalGrandparent],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem5'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.PaternalGrandparent],
    },
    {
      questionId: questionPatientPastSurgeryType.id,
      answerType: QuestionType.String,
      answers: [patientPastSurgeryType],
    },
    {
      questionId: questionPatientPastSurgeryDate.id,
      answerType: QuestionType.String,
      answers: [patientPastSurgeryDate],
    },
    {
      questionId: questionSecondPatientPastSurgeryId,
      answerType: QuestionType.Group,
      answers: [],
      questions: [
        {
          questionId: questionPatientSecondPastSurgeryType.id,
          answerType: QuestionType.String,
          answers: [patientPastSecondSurgeryType],
        },
        {
          questionId: questionPatientSecondPastSurgeryDate.id,
          answerType: QuestionType.String,
          answers: [patientPastSecondSurgeryDate],
        },
      ],
    },

    {
      questionId: questionSemenAnalysisIsNormalId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {questionId: questionVasectomy.id, answerType: QuestionType.String, answers: ['Yes']},
    {questionId: questionVasectomyReversal.id, answerType: QuestionType.String, answers: ['Yes']},
    {
      questionId: questionErectionDifficulties.id,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionDiagnosedConditionsId,
      answerType: QuestionType.String,
      answers: diagnosedConditionsValue,
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentType.id,
      answerType: QuestionType.String,
      answers: [firstTreatmentType],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentCycle.id,
      answerType: QuestionType.String,
      answers: [firstTreatmentCycle],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentType.id,
      answerType: QuestionType.String,
      answers: [secondTreatmentType],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentCycle.id,
      answerType: QuestionType.String,
      answers: [secondTreatmentCycle],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentType.id,
      answerType: QuestionType.String,
      answers: [thirdTreatmentType],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentCycle.id,
      answerType: QuestionType.String,
      answers: [thirdTreatmentCycle],
    },
    {
      questionId: questionSexAtBirth.id,
      answerType: QuestionType.String,
      answers: [SexAtBirth.Male],
    },
    {
      questionId: questionFoodAllergies.id,
      answerType: QuestionType.String,
      answers: ['tomatoes'],
    },
    {
      questionId: questionFoodAllergies.id,
      answerType: QuestionType.String,
      answers: ['potato'],
    },
    {
      questionId: questionPrescriptionMedicationListNullAnswer.id,
      answerType: QuestionType.String,
      answers: [null],
    },
    //Group question Done
    {
      questionId: ohipGroupQuestion.id,
      answerType: QuestionType.Group,
      answers: [],
      questions: [
        {
          answerType: QuestionType.Ohip,
          answers: [ohipCardVersionCode],
          parentQuestionId: ohipGroupQuestion.id,
          questionId: ohipVersionQuestion.id,
        },
        {
          answerType: QuestionType.String,
          answers: [ohipCardNumber],
          parentQuestionId: ohipGroupQuestion.id,
          questionId: ohipCartQuestion.id,
        },
      ],
    },
    //repeat group
    {
      questionId: repeatGroupParentId,
      answerType: QuestionType.Group,
      answers: [],
      questions: [
        {
          answerType: QuestionType.String,
          answers: [medicationName],
          parentQuestionId: repeatGroupParentId,
          questionId: questionPrescriptionMedicationList.id,
        },
        {
          answerType: QuestionType.String,
          answers: [medicationDosage],
          parentQuestionId: repeatGroupParentId,
          questionId: questionDosage.id,
        },
        {
          answerType: QuestionType.String,
          answers: [medicationFrequency],
          parentQuestionId: repeatGroupParentId,
          questionId: questionFrequency.id,
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: repeatGroupParentId,
      questions: [
        {
          answerType: QuestionType.String,
          answers: ['Ibuprofen'],
          parentQuestionId: repeatGroupParentId,
          questionId: questionPrescriptionMedicationList.id,
        },
        {
          answerType: QuestionType.String,
          answers: ['200ML'],
          parentQuestionId: repeatGroupParentId,
          questionId: questionDosage.id,
        },
        {
          answerType: QuestionType.String,
          answers: ['1 time per day'],
          parentQuestionId: repeatGroupParentId,
          questionId: questionFrequency.id,
        },
      ],
    },
    {
      questionId: usingAppToTrackOvulationId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: ectopicPregnanciesLocationId,
          answerType: QuestionType.String,
          answers: ['Right Fallopian'],
        },
        {questionId: ectopicPregnanciesYearId, answerType: QuestionType.Integer, answers: [2005]},
        {
          questionId: ectopicPregnanciesTypeId,
          answerType: QuestionType.String,
          answers: ['Surgical'],
        },
        {
          questionId: ectopicPregnanciesMonthstoConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: ectopicPregnanciesLocationId,
          answerType: QuestionType.String,
          answers: ['Left Fallopian'],
        },
        {questionId: ectopicPregnanciesYearId, answerType: QuestionType.Integer, answers: [2015]},
        {
          questionId: ectopicPregnanciesTypeId,
          answerType: QuestionType.String,
          answers: ['Surgical'],
        },
        {
          questionId: ectopicPregnanciesMonthstoConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {questionId: preTermDeliveryYearId, answerType: QuestionType.Integer, answers: [2011]},
        {
          questionId: preTermDeliveryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.Vaginal],
        },
        {
          questionId: preTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1YearPlus'],
        },
        {
          questionId: preTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['StillBirth'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {questionId: preTermDeliveryYearId, answerType: QuestionType.Integer, answers: [2012]},
        {
          questionId: preTermDeliveryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.CesareanSection],
        },
        {
          questionId: preTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
        {
          questionId: preTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['Live'],
        },
      ],
    },
    {questionId: abortionYearId, answerType: QuestionType.Integer, answers: [2010]},
    {questionId: secondAbortionYearId, answerType: QuestionType.Integer, answers: [2017]},
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: fullTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1YearPlus'],
        },
        {
          questionId: fullTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['StillBirth'],
        },
        {
          questionId: fullTermDeliveryHistoryYearId,
          answerType: QuestionType.String,
          answers: [2017],
        },
        {
          questionId: fullTermDeliveryHistoryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.Vaginal],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: miscarriageYearId,
          answerType: QuestionType.String,
          answers: [1990],
        },
        {
          questionId: miscarriageTypeId,
          answerType: QuestionType.String,
          answers: ['MedicatedMisoprostol'],
        },
        {
          questionId: miscarriageMountsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: miscarriageYearId,
          answerType: QuestionType.String,
          answers: [1992],
        },
        {
          questionId: miscarriageTypeId,
          answerType: QuestionType.String,
          answers: ['Natural'],
        },
        {
          questionId: miscarriageMountsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: fullTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
        {
          questionId: fullTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['Live'],
        },
        {
          questionId: fullTermDeliveryHistoryYearId,
          answerType: QuestionType.String,
          answers: [2018],
        },
        {
          questionId: fullTermDeliveryHistoryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.CesareanSection],
        },
      ],
    },
    //detail
    {
      questionId: detailCurrentStressLevelId,
      answerType: QuestionType.String,
      answers: ['NotStressedAtAll'],
    },
    {
      questionId: detailCurrentOccupationId,
      answerType: QuestionType.String,
      answers: ['Smth'],
    },
    {
      questionId: detailDateOfBirthId,
      answerType: QuestionType.String,
      answers: [patientDateOfBirth],
    },
    {
      questionId: detailDrinkAlcoholId,
      answerType: QuestionType.Choice,
      answers: ['Yes'],
    },
    {
      questionId: detailExerciseRegularlyId,
      answerType: QuestionType.Choice,
      answers: ['No'],
    },
    {
      questionId: detailProblemWithAnestheticsId,
      answerType: QuestionType.Choice,
      answers: ['Yes'],
    },
    {
      questionId: detailPreferredPronounsId,
      answerType: QuestionType.Choice,
      answers: [PreferredPronouns.Other],
    },
    {
      questionId: detailGenderId,
      answerType: QuestionType.Choice,
      answers: [Gender.Other],
    },
    {
      questionId: detailSexualOrientationId,
      answerType: QuestionType.Choice,
      answers: [SexualOrientation.Other],
    },
    {
      questionId: detailRecreationalDrugsId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: detailSeeCounsellorForStressId,
      answerType: QuestionType.Choice,
      answers: ['No'],
    },
    {
      questionId: detailSmokeCigarettesId,
      answerType: QuestionType.Choice,
      answers: ['Yes'],
    },
    {
      questionId: detailUseMarijuanaId,
      answerType: QuestionType.String,
      answers: ['No'],
    },
    {
      questionId: detailWeightInLbsId,
      answerType: QuestionType.Integer,
      answers: [133],
    },
    {
      questionId: detailFamilyDoctorId,
      answerType: QuestionType.String,
      answers: ['Paul Walker'],
    },
    {
      questionId: detailReferringDoctorId,
      answerType: QuestionType.String,
      answers: ['Vin Diesel'],
    },
    {
      questionId: numberOfLiveBirthQuestionId,
      answerType: QuestionType.String,
      answers: ['3'],
    },
    {
      questionId: isOvulatingQuestionId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: hasPeriodQuestionId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: menstrualDaysOfBleedingId,
      answerType: QuestionType.String,
      answers: [DaysOfBleedingEnum.MoreThanEleven],
    },
    {
      questionId: menstrualPainId,
      answerType: QuestionType.String,
      answers: [MenstrualPainEnum.Mild],
    },
    {
      questionId: previousPapTestId,
      answerType: QuestionType.String,
      answers: ['No'],
    },
    {
      questionId: papTestLastDateId,
      answerType: QuestionType.String,
      answers: [dateTimeUtil.formatIsoDate()],
    },
    {
      questionId: questionPatientDetailFemaleUsingOvulationKitsId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailFemaleHasProceduresDueAbnormalPAPId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailMaleAbnormalPapProceduresId,
      answerType: QuestionType.String,
      answers: patientDetailMaleAbnormalPapProceduresAnswer,
    },
    {
      questionId: questionPatientDetailFemaleUsingAppToTrackOvulationId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailFemaleUsingLubricantsId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailFemaleSeenFertilitySpecialistId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: menstrualFlowQuestionId,
      answerType: QuestionType.String,
      answers: ['Normal'],
      note: 'menstrualFlowNote',
    },
    {
      questionId: questionDaysBetweenPeriodsId,
      answerType: QuestionType.String,
      answers: [25],
    },
    {
      questionId: questionFirstDayOfLastPeriodId,
      answerType: QuestionType.String,
      answers: ['2023-04-05'],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: detailHeightInFeetId,
          answerType: QuestionType.String,
          answers: [5],
        },
        {
          questionId: detailHeightInInchesId,
          answerType: QuestionType.Integer,
          answers: [8],
        },
      ],
    },
    {
      questionId: questionGynaecologicalConditionsId,
      answerType: QuestionType.String,
      answers: [
        'STI',
        'CancerCervical',
        'ConeBiopsy',
        'CancerOvarian',
        'CancerUterine',
        'Endometriosis',
        'UterineFibroids',
        'PCOS',
        'POIOrEarlyMenopause',
        'Vaginismus',
      ],
    },
    {
      questionId: questionHaveBeenReferredByPhysicianId,
      answerType: QuestionType.String,
      answers: [PatientAnswers.Yes],
    },
  ],
}

export const questionnaireWithoutDoctorIntentFixture: Partial<QuestionnaireIntent> = {
  id: questionnaireWithoudDoctorIntentId,
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientDetailFixture.id,
  updatedBy: 'id-email-verified-auth-fixture',
  isCompleted: false,
  questions: [
    {questionId: questionLatexAllergy.id, answerType: QuestionType.String, answers: ['Yes']},
    {questionId: questionIodineAllergy.id, answerType: QuestionType.String, answers: ['Yes']},
    {
      questionId: questionHaveBiologicalChildren.id,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionHaveBiologicalChildrenWithCurrentPartner.id,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {questionId: questionHadSemenAnalysis.id, answerType: QuestionType.String, answers: ['Yes']},
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem1'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.Father],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem2'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.Mother],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem3'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.Sibling],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem4'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.MaternalGrandparent],
    },
    {
      questionId: questionPatientFamilyHealthProblemProblem.id,
      answerType: QuestionType.String,
      answers: ['Problem5'],
    },
    {
      questionId: questionPatientFamilyHealthProblemFamilyName.id,
      answerType: QuestionType.String,
      answers: [FamilyMemberEnum.PaternalGrandparent],
    },
    {
      questionId: questionPatientPastSurgeryType.id,
      answerType: QuestionType.String,
      answers: [patientPastSurgeryType],
    },
    {
      questionId: questionPatientPastSurgeryDate.id,
      answerType: QuestionType.String,
      answers: [patientPastSurgeryDate],
    },
    {
      questionId: questionSemenAnalysisIsNormalId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {questionId: questionVasectomy.id, answerType: QuestionType.String, answers: ['Yes']},
    {questionId: questionVasectomyReversal.id, answerType: QuestionType.String, answers: ['Yes']},
    {
      questionId: questionErectionDifficulties.id,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionDiagnosedConditionsId,
      answerType: QuestionType.String,
      answers: diagnosedConditionsValue,
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentType.id,
      answerType: QuestionType.String,
      answers: [firstTreatmentType],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentCycle.id,
      answerType: QuestionType.String,
      answers: [firstTreatmentCycle],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentType.id,
      answerType: QuestionType.String,
      answers: [secondTreatmentType],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentCycle.id,
      answerType: QuestionType.String,
      answers: [secondTreatmentCycle],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentType.id,
      answerType: QuestionType.String,
      answers: [thirdTreatmentType],
    },
    {
      questionId: questionPatientPreviousFertilityTreatmentCycle.id,
      answerType: QuestionType.String,
      answers: [thirdTreatmentCycle],
    },
    {
      questionId: questionSexAtBirth.id,
      answerType: QuestionType.String,
      answers: [SexAtBirth.Male],
    },
    {
      questionId: questionFoodAllergies.id,
      answerType: QuestionType.String,
      answers: ['tomatoes'],
    },
    {
      questionId: questionFoodAllergies.id,
      answerType: QuestionType.String,
      answers: ['potato'],
    },
    {
      questionId: questionPrescriptionMedicationListNullAnswer.id,
      answerType: QuestionType.String,
      answers: [null],
    },
    //Group question Done
    {
      questionId: ohipGroupQuestion.id,
      answerType: QuestionType.Group,
      answers: [],
      questions: [
        {
          answerType: QuestionType.Ohip,
          answers: [ohipCardVersionCode],
          parentQuestionId: ohipGroupQuestion.id,
          questionId: ohipVersionQuestion.id,
        },
        {
          answerType: QuestionType.String,
          answers: [ohipCardNumber],
          parentQuestionId: ohipGroupQuestion.id,
          questionId: ohipCartQuestion.id,
        },
      ],
    },
    //repeat group
    {
      questionId: repeatGroupParentId,
      answerType: QuestionType.Group,
      answers: [],
      questions: [
        {
          answerType: QuestionType.String,
          answers: [medicationName],
          parentQuestionId: repeatGroupParentId,
          questionId: questionPrescriptionMedicationList.id,
        },
        {
          answerType: QuestionType.String,
          answers: [medicationDosage],
          parentQuestionId: repeatGroupParentId,
          questionId: questionDosage.id,
        },
        {
          answerType: QuestionType.String,
          answers: [medicationFrequency],
          parentQuestionId: repeatGroupParentId,
          questionId: questionFrequency.id,
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: repeatGroupParentId,
      questions: [
        {
          answerType: QuestionType.String,
          answers: ['Ibuprofen'],
          parentQuestionId: repeatGroupParentId,
          questionId: questionPrescriptionMedicationList.id,
        },
        {
          answerType: QuestionType.String,
          answers: ['200ML'],
          parentQuestionId: repeatGroupParentId,
          questionId: questionDosage.id,
        },
        {
          answerType: QuestionType.String,
          answers: ['1 time per day'],
          parentQuestionId: repeatGroupParentId,
          questionId: questionFrequency.id,
        },
      ],
    },
    {
      questionId: usingAppToTrackOvulationId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: ectopicPregnanciesLocationId,
          answerType: QuestionType.String,
          answers: ['Right Fallopian'],
        },
        {questionId: ectopicPregnanciesYearId, answerType: QuestionType.Integer, answers: [2005]},
        {
          questionId: ectopicPregnanciesTypeId,
          answerType: QuestionType.String,
          answers: ['Surgical'],
        },
        {
          questionId: ectopicPregnanciesMonthstoConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: ectopicPregnanciesLocationId,
          answerType: QuestionType.String,
          answers: ['Left Fallopian'],
        },
        {questionId: ectopicPregnanciesYearId, answerType: QuestionType.Integer, answers: [2015]},
        {
          questionId: ectopicPregnanciesTypeId,
          answerType: QuestionType.String,
          answers: ['Surgical'],
        },
        {
          questionId: ectopicPregnanciesMonthstoConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {questionId: preTermDeliveryYearId, answerType: QuestionType.Integer, answers: [2011]},
        {
          questionId: preTermDeliveryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.Vaginal],
        },
        {
          questionId: preTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1YearPlus'],
        },
        {
          questionId: preTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['StillBirth'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {questionId: preTermDeliveryYearId, answerType: QuestionType.Integer, answers: [2012]},
        {
          questionId: preTermDeliveryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.CesareanSection],
        },
        {
          questionId: preTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
        {
          questionId: preTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['Live'],
        },
      ],
    },
    {questionId: abortionYearId, answerType: QuestionType.Integer, answers: [2010]},
    {questionId: secondAbortionYearId, answerType: QuestionType.Integer, answers: [2017]},
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: fullTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1YearPlus'],
        },
        {
          questionId: fullTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['StillBirth'],
        },
        {
          questionId: fullTermDeliveryHistoryYearId,
          answerType: QuestionType.String,
          answers: [2017],
        },
        {
          questionId: fullTermDeliveryHistoryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.Vaginal],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: miscarriageYearId,
          answerType: QuestionType.String,
          answers: [1990],
        },
        {
          questionId: miscarriageTypeId,
          answerType: QuestionType.String,
          answers: ['MedicatedMisoprostol'],
        },
        {
          questionId: miscarriageMountsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: miscarriageYearId,
          answerType: QuestionType.String,
          answers: [1992],
        },
        {
          questionId: miscarriageTypeId,
          answerType: QuestionType.String,
          answers: ['Natural'],
        },
        {
          questionId: miscarriageMountsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
      ],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: fullTermDeliveryMonthsToConceiveId,
          answerType: QuestionType.String,
          answers: ['1To6Months'],
        },
        {
          questionId: fullTermDeliveryBirthOutcomeId,
          answerType: QuestionType.String,
          answers: ['Live'],
        },
        {
          questionId: fullTermDeliveryHistoryYearId,
          answerType: QuestionType.String,
          answers: [2018],
        },
        {
          questionId: fullTermDeliveryHistoryTypeId,
          answerType: QuestionType.String,
          answers: [TypeOfBirthForDeliveryEnum.CesareanSection],
        },
      ],
    },
    //detail
    {
      questionId: detailCurrentStressLevelId,
      answerType: QuestionType.String,
      answers: ['NotStressedAtAll'],
    },

    {
      questionId: detailCurrentOccupationId,
      answerType: QuestionType.String,
      answers: ['Smth'],
    },
    {
      questionId: detailDateOfBirthId,
      answerType: QuestionType.String,
      answers: [patientDateOfBirth],
    },
    {
      questionId: detailDrinkAlcoholId,
      answerType: QuestionType.Choice,
      answers: ['Yes'],
    },
    {
      questionId: detailExerciseRegularlyId,
      answerType: QuestionType.Choice,
      answers: ['No'],
    },
    {
      questionId: detailProblemWithAnestheticsId,
      answerType: QuestionType.Choice,
      answers: ['Yes'],
    },
    {
      questionId: detailPreferredPronounsId,
      answerType: QuestionType.Choice,
      answers: [PreferredPronouns.Other],
    },
    {
      questionId: detailGenderId,
      answerType: QuestionType.Choice,
      answers: [Gender.Other],
    },
    {
      questionId: detailSexualOrientationId,
      answerType: QuestionType.Choice,
      answers: [SexualOrientation.Other],
    },
    {
      questionId: detailRecreationalDrugsId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: detailSeeCounsellorForStressId,
      answerType: QuestionType.Choice,
      answers: ['No'],
    },
    {
      questionId: detailSmokeCigarettesId,
      answerType: QuestionType.Choice,
      answers: ['Yes'],
    },
    {
      questionId: detailUseMarijuanaId,
      answerType: QuestionType.String,
      answers: ['No'],
    },
    {
      questionId: detailWeightInLbsId,
      answerType: QuestionType.Integer,
      answers: [133],
    },
    {
      questionId: numberOfLiveBirthQuestionId,
      answerType: QuestionType.String,
      answers: ['3'],
    },
    {
      questionId: isOvulatingQuestionId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: hasPeriodQuestionId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: menstrualDaysOfBleedingId,
      answerType: QuestionType.String,
      answers: [DaysOfBleedingEnum.MoreThanEleven],
    },
    {
      questionId: menstrualPainId,
      answerType: QuestionType.String,
      answers: [MenstrualPainEnum.Mild],
    },
    {
      questionId: previousPapTestId,
      answerType: QuestionType.String,
      answers: ['No'],
    },
    {
      questionId: papTestLastDateId,
      answerType: QuestionType.String,
      answers: [dateTimeUtil.formatIsoDate()],
    },
    {
      questionId: questionPatientDetailFemaleUsingOvulationKitsId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailFemaleHasProceduresDueAbnormalPAPId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailMaleAbnormalPapProceduresId,
      answerType: QuestionType.String,
      answers: patientDetailMaleAbnormalPapProceduresAnswer,
    },
    {
      questionId: questionPatientDetailFemaleUsingAppToTrackOvulationId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailFemaleUsingLubricantsId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: questionPatientDetailFemaleSeenFertilitySpecialistId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: menstrualFlowQuestionId,
      answerType: QuestionType.String,
      answers: ['Normal'],
    },
    {
      questionId: questionDaysBetweenPeriodsId,
      answerType: QuestionType.String,
      answers: [25],
    },
    {
      questionId: questionFirstDayOfLastPeriodId,
      answerType: QuestionType.String,
      answers: ['2023-04-05'],
    },
    {
      answerType: QuestionType.Group,
      answers: [],
      questionId: 1,
      questions: [
        {
          questionId: detailHeightInFeetId,
          answerType: QuestionType.String,
          answers: [5],
        },
        {
          questionId: detailHeightInInchesId,
          answerType: QuestionType.Integer,
          answers: [8],
        },
      ],
    },
    {
      questionId: questionGynaecologicalConditionsId,
      answerType: QuestionType.String,
      answers: [
        'STI',
        'CancerCervical',
        'ConeBiopsy',
        'CancerOvarian',
        'CancerUterine',
        'Endometriosis',
        'UterineFibroids',
        'PCOS',
        'POIOrEarlyMenopause',
        'Vaginismus',
      ],
    },
    {
      questionId: questionHaveBeenReferredByPhysicianId,
      answerType: QuestionType.String,
      answers: [PatientAnswers.Yes],
    },
  ],
}

export const questionnaireIntentWithDoctorFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-fixture-CF-2',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: 294,
  updatedBy: 'id-email-verified-auth-fixture',
  isCompleted: false,
  questions: [
    {
      questionId: familyDoctorId,
      answerType: QuestionType.String,
      answers: ['Shaun Murphy'],
    },
    {
      questionId: familyDoctorDuplicateId,
      answerType: QuestionType.String,
      answers: ['Neil Robertson'],
    },
  ],
}

export const questionnaireIntentWithReferringDoctorFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-fixture-CF-3',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: 147,
  updatedBy: 'id-email-verified-auth-fixture',
  isCompleted: false,
  questions: [
    {
      questionId: referringDoctorDuplicateInDbId,
      answerType: QuestionType.String,
      answers: ['Judd Trump'],
    },
  ],
}
