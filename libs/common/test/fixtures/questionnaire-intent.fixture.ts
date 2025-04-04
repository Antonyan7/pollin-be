import {questionWithHasPeriodFixture} from '@libs/common/test/fixtures/questionnaire/questionnaire-irregular-period'
/* eslint-disable max-lines */
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {
  QuestionIntent,
  QuestionnaireIntent,
  RevisionStatus,
} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {
  ServiceCategory_irregularPeriodsAllowed_fixture,
  ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture,
  serviceCategoryFixture,
  serviceCategoryForIrregularPeriodFixture,
  serviceCategoryForSexAtBirthFixture,
  serviceCategoryGenderFixture,
  serviceCategoryPatientDontHaveSexAtBirthFixture,
  serviceFemaleSexAtBirthUpdatePatientFixture,
  serviceMaleSexAtBirthUpdatePatientFixture,
} from '@libs/common/test/fixtures/service-category.fixture'
import {AuthUserFixture} from '@libs/common/test/fixtures/auth.fixture'
import {
  emptyQuestionnaireFixture,
  questionnaire2Fixture,
  questionnaire_irregularPeriodsAllowed,
  questionnaire_irregularPeriodsAllowedInServiceType,
  questionnaireFemaleSexAtBirthUpdatePatientFixture,
  questionnaireFixture,
  questionnaireForGroupQuestionFixture,
  questionnaireForPeriodAnswerDeletedFixture,
  questionnaireForServiceGroupFixture,
  questionnaireForSexAtBirthMaleFixture,
  questionnaireGenderFixture,
  questionnaireMaleSexAtBirthUpdatePatientFixture,
  questionnaireWithAnswersFixture,
  questionnaireWithHasMenstrualPeriodFixture,
  questionnaireWithoutAnswersFixture,
  questionnaireWithPatientIntakeFemaleCompletedFixture,
  questionnaireWithPatientIntakeMaleCompletedFixture,
} from '@libs/common/test/fixtures/questionnaire.fixture'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {
  choiceQuestionFixture,
  decimalQuestionFixture,
  genderAtBirthQuestionFixture,
  groupQuestionFixture,
  integerQuestionFixture,
  integerQuestionWithParentFixture,
  ohipGroupQuestionFixture,
  ohipQuestion2Fixture,
  question1Fixture,
  question4WithExecutedConstraintDataFixture,
  questionCartSexAtBirhChildFixture,
  questionCartSexAtBirthGroupFixture,
  questionDateOfBirthFixture,
  questionFemaleSexAtBirthFixture,
  questionForMultiSelectFixture,
  questionIntakeWithRepeat,
  questionMaleSexAtBirthFixture,
  questionStaticSexAtBirthFixture,
  stringMaxLengthQuestionFixture,
  stringQuestionFixture,
} from '@libs/common/test/fixtures/question.fixture'
import {
  question_irregularPeriodsAllowed_daysBetweenPeriods_fixture,
  question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture,
  questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture,
  questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture,
} from '@libs/common/test/fixtures/question-irregular-period.fixture'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {
  cartPatientUpdateFemaleSexAtBirthFixture,
  cartPatientUpdateFemaleSexAtBirthV2Fixture,
  cartPatientUpdateMaleSexAtBirthFixture,
  cartPatientUpdateMaleSexAtBirthV2Fixture,
  patientCartConfirmRevisionsFixture,
  patientEmailVerifiedFixture,
  patientFemaleFixture,
  patientForCheckedInPatientIntakeFixture,
  patientForCompletedPatientIntakeFixture,
  patientForCreateBookingIntentFixture,
  patientForFinalizingInProgressInPatientIntakeFixture,
  patientForMaleIcFormFixture,
  patientForPartnerUserTypeFixture,
  patientIntakeFixture,
  patientIntakeRevisionChangesForMovedQuestionFixture,
  patientIntakeRevisionStatusFixture,
  patientMenstrualContraintFixture,
  patientForQuestionnaireFixture,
  patientServiceTypeSecondExtraFixture,
  patientWithQuestionnaireIntentAnswersFixture,
  patientWithSinglePlanFixture,
  patientForConsentMobileFixture,
  patientForConsentSignMobileFixture,
  patientForConsentSignPartnerMobileFixture,
} from './patient.fixture'
import {staffUserFixture} from './staff.fixture'
import {
  answerOptionForOneMultiSelectQuestionFixture,
  answerOptionForTwoMultiSelectQuestionFixture,
} from './answer-option.fixture'
import {
  patientQuestionnaireForGetAnswersSeparatedApiFixture,
  patientQuestionnaireForSignMobileFixture,
  patientQuestionnaireForSignPartnerMobileFixture,
} from './patient-questionnaire.fixture'

const dateTimeUtility: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))
export const authUserId2: string = 'getPrevQuestion_Token1'

export const questionnaireIntentFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-fixture',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  updatedBy: AuthUserFixture.emailVerified.uid,
  isCompleted: false,
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  questions: [{questionId: stringQuestionFixture.id, answerType: QuestionType.String, answers: []}],
}

export const savedDateOfBirthForQuestionNearOhip: string = '2000-03-25'

export const questionnaireIntentWithoutServiceCategoryFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-without-service-category',
  questionnaireId: questionnaire2Fixture.id,
  serviceCategoryId: 999, // not Found ServiceCategoryId
  patientId: patientForQuestionnaireFixture.id,
  updatedBy: authUserId2.toString(),
  questions: [
    {
      questionId: stringQuestionFixture.id,
      answers: ['answer 11', 'answer 12'],
      answerType: QuestionType.Choice,
    },
    {
      questionId: decimalQuestionFixture.id,
      answers: ['answer 21', 'answer 22'],
      answerType: QuestionType.String,
    },
    {
      questionId: integerQuestionWithParentFixture.id,
      parentQuestionId: decimalQuestionFixture.id,
      answers: ['sub Answer 31', 'sub answer 32'],
      answerType: QuestionType.String,
    },
    {
      questionId: integerQuestionFixture.id,
      answers: ['answer 41', 'answer 42'],
      answerType: QuestionType.String,
    },
  ],
}

export const questionnaireIntentWithoutQuestionnaireFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-without-valid-questionnaire',
  questionnaireId: 454545454545,
  serviceCategoryId: 0,
  patientId: patientForQuestionnaireFixture.id,
  updatedBy: authUserId2.toString(),
}

export const questionnaireIntentGenderAtBirthFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-gender-at-birth-fixture',
  questionnaireId: questionnaireGenderFixture.id,
  serviceCategoryId: serviceCategoryGenderFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  updatedBy: authUserId2.toString(),
  questions: [
    {
      questionId: genderAtBirthQuestionFixture.id,
      answers: ['IrregularPeriodYesUUID', 'IrregularPeriodNoUUID'],
      answerType: QuestionType.String,
    },
  ],
}

export const questionnaireIntentMaleSexAtBirthFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-male-sex-at-birth-fixture',
  questionnaireId: questionnaireMaleSexAtBirthUpdatePatientFixture.id,
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
  patientId: cartPatientUpdateMaleSexAtBirthFixture.id,
  updatedBy: AuthUserFixture.cartUpdatePatientMaleSexAtBirth.uid,
  isCompleted: false,
  questions: [
    {
      questionId: questionMaleSexAtBirthFixture.id,
      answers: [SexAtBirth.Male],
      answerType: questionMaleSexAtBirthFixture.type,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentMaleSexAtBirthV2Fixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-male-sex-at-birth-fixtureV2',
  questionnaireId: questionnaireMaleSexAtBirthUpdatePatientFixture.id,
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
  patientId: cartPatientUpdateMaleSexAtBirthV2Fixture.id,
  updatedBy: AuthUserFixture.cartUpdatePatientMaleSexAtBirthV2.uid,
  isCompleted: false,
  questions: [
    {
      questionId: questionMaleSexAtBirthFixture.id,
      answers: [SexAtBirth.Male],
      answerType: questionMaleSexAtBirthFixture.type,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentFemaleSexAtBirthFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-female-sex-at-birth-fixture',
  questionnaireId: questionnaireFemaleSexAtBirthUpdatePatientFixture.id,
  serviceCategoryId: serviceFemaleSexAtBirthUpdatePatientFixture.id,
  patientId: cartPatientUpdateFemaleSexAtBirthFixture.id,
  updatedBy: AuthUserFixture.cartUpdatePatientFemaleSexAtBirth.uid,
  isCompleted: false,
  questions: [
    {
      questionId: questionCartSexAtBirthGroupFixture.id,
      questions: [
        {
          questionId: questionCartSexAtBirhChildFixture.id,
          answers: [SexAtBirth.Female],
          answerType: questionFemaleSexAtBirthFixture.type,
        },
      ],
      answerType: QuestionType.Group,
      answers: [],
    },
    {
      //Ohip card number question
      questionId: decimalQuestionFixture.id,
      answerType: QuestionType.String,
      answers: ['ohip number'],
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentFemaleSexAtBirthV2Fixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-female-sex-at-birth-fixtureV2',
  questionnaireId: questionnaireFemaleSexAtBirthUpdatePatientFixture.id,
  serviceCategoryId: serviceFemaleSexAtBirthUpdatePatientFixture.id,
  patientId: cartPatientUpdateFemaleSexAtBirthV2Fixture.id,
  updatedBy: AuthUserFixture.cartUpdatePatientFemaleSexAtBirthV2.uid,
  isCompleted: false,
  questions: [
    {
      questionId: questionFemaleSexAtBirthFixture.id,
      answers: [SexAtBirth.Female],
      answerType: questionFemaleSexAtBirthFixture.type,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

const dateTimeUtil: DateTimeUtil = new DateTimeUtil('')

export const QuestionnaireIntent_irregularPeriodsAllowed_fixture: {
  questionOlderThanNDays: Partial<QuestionnaireIntent>
  questionLessThanNDays: Partial<QuestionnaireIntent>
  questionLessThanNDaysMoreThenMDays: Partial<QuestionnaireIntent>
  questionNotLessThanNDaysMoreThenMDays: Partial<QuestionnaireIntent>
} = {
  questionOlderThanNDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowed1_fixture',
    questionnaireId: questionnaire_irregularPeriodsAllowed.olderThanNDays.id,
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionOlderThanNDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -40).toISOString()],
        answerType: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.type,
      },
    ],
  },
  questionLessThanNDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowed2_fixture',
    questionnaireId: questionnaire_irregularPeriodsAllowed.lessThanNDays.id,
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -20).toISOString()],
        answerType: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.type,
      },
    ],
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowed3_fixture',
    questionnaireId: questionnaire_irregularPeriodsAllowed.lessThanNDaysMoreThenMDays.id,
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDaysMoreThenMDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -15).toISOString()],
        answerType: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.type,
      },
    ],
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowed4_fixture',
    questionnaireId: questionnaire_irregularPeriodsAllowed.notLessThanNDaysMoreThenMDays.id,
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionNotLessThanNDaysMoreThenMDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -15).toISOString()],
        answerType: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.type,
      },
    ],
  },
}
export const QuestionnaireIntent_irregularPeriodsAllowed_in_serviceType_fixture: {
  questionOlderThanNDays: Partial<QuestionnaireIntent>
  questionLessThanNDays: Partial<QuestionnaireIntent>
  questionLessThanNDaysMoreThenMDays: Partial<QuestionnaireIntent>
  questionNotLessThanNDaysMoreThenMDays: Partial<QuestionnaireIntent>
} = {
  questionOlderThanNDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowedServiceType1_fixture',
    questionnaireId: questionnaire_irregularPeriodsAllowedInServiceType.olderThanNDays.id,
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionOlderThanNDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -40).toISOString()],
        answerType: questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture.type,
      },
    ],
  },
  questionLessThanNDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowedServiceType2_fixture',
    questionnaireId: questionnaire_irregularPeriodsAllowedInServiceType.lessThanNDays.id,
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionLessThanNDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -20).toISOString()],
        answerType: questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture.type,
      },
    ],
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowedServiceType3_fixture',
    questionnaireId:
      questionnaire_irregularPeriodsAllowedInServiceType.lessThanNDaysMoreThenMDays.id,
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionLessThanNDaysMoreThenMDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -15).toISOString()],
        answerType: questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture.type,
      },
    ],
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 'questionnaireIntent_irregularPeriodsAllowedServiceType4_fixture',
    questionnaireId:
      questionnaire_irregularPeriodsAllowedInServiceType.notLessThanNDaysMoreThenMDays.id,
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionNotLessThanNDaysMoreThenMDays.id,
    patientId: patientEmailVerifiedFixture.id,
    questions: [
      {
        questionId: questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture.id,
        answers: [dateTimeUtil.addDays(dateTimeUtil.now(), -15).toISOString()],
        answerType: questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture.type,
      },
    ],
  },
}

export const questionnaireIntentWithoutAnswersFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-without-answers-fixture',
  questionnaireId: questionnaireWithoutAnswersFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientForQuestionnaireFixture.id,
  updatedBy: AuthUserFixture.questionnaire.uid,
  isCompleted: false,
  questions: [
    {
      questionId: groupQuestionFixture.id,
      answers: [],
      answerType: QuestionType.Group,
      applicationCode: null,
    },
    {
      questionId: ohipQuestion2Fixture.id,
      answers: [],
      answerType: QuestionType.Ohip,
      applicationCode: null,
      parentQuestionId: groupQuestionFixture.id,
    },
    {
      questionId: questionDateOfBirthFixture.id,
      answers: [],
      answerType: QuestionType.Date,
      applicationCode: null,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentWithAnswersFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-with-answers-fixture',
  questionnaireId: questionnaireWithAnswersFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientWithQuestionnaireIntentAnswersFixture.id,
  updatedBy: AuthUserFixture.questionnaireWithAnswers.uid,
  isCompleted: false,
  questionnaireRevision: 1,
  questionIdsToAsk: [
    groupQuestionFixture.id,
    ohipQuestion2Fixture.id,
    questionDateOfBirthFixture.id,
    questionFemaleSexAtBirthFixture.id,
  ],
  currentQuestionId: questionFemaleSexAtBirthFixture.id,
  questions: [
    {
      questionId: groupQuestionFixture.id,
      answers: ['answer1', 'answer2'],
      answerType: QuestionType.Group,
      applicationCode: null,
    },
    {
      questionId: ohipQuestion2Fixture.id,
      answers: ['yes'],
      answerType: QuestionType.Ohip,
      applicationCode: null,
      parentQuestionId: groupQuestionFixture.id,
    },
    {
      questionId: questionDateOfBirthFixture.id,
      answers: ['no'],
      answerType: QuestionType.Date,
      applicationCode: null,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentForMenstrualPeriodConstraintFixture: Partial<QuestionnaireIntent> =
  {
    id: 'questionnaire-intent-for-menstrual-period-constraint-fixture',
    questionnaireId: questionnaireForGroupQuestionFixture.id,
    serviceCategoryId: serviceCategoryFixture.id,
    patientId: patientMenstrualContraintFixture.id,
    updatedBy: AuthUserFixture.emailVerified.uid,
    isCompleted: false,
    updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
    createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
    questions: [
      {
        questionId: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.id,
        answers: ['2030-09-02'],
        answerType: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.type,
      },
      {
        questionId: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.id,
        answers: [30],
        answerType: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.type,
      },
      {
        questionId: questionStaticSexAtBirthFixture.id,
        answers: [SexAtBirth.Female],
        answerType: questionStaticSexAtBirthFixture.type,
      },
    ],
  }

export const questionnaireIntentForPeriodDeletedAnswerFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-for-period-answe-deleted',
  questionnaireId: questionnaireForPeriodAnswerDeletedFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientForCreateBookingIntentFixture.id,
  updatedBy: AuthUserFixture.emailVerified.uid,
  isCompleted: false,
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  questions: [
    {
      questionId: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.id,
      answers: [''],
      answerType: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.type,
    },
    {
      questionId: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.id,
      answers: [''],
      answerType: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.type,
    },
    {
      questionId: questionStaticSexAtBirthFixture.id,
      answers: [SexAtBirth.Female],
      answerType: questionStaticSexAtBirthFixture.type,
    },
  ],
}

export const questionnaireIntent_deleteAllPrevIntents_withServCat_fixture: Partial<QuestionnaireIntent> =
  {
    id: 'firstQuestionnaireIntentIdForCheckLatest',
    patientId: 123123,
    questionnaireId: 998785,
    serviceCategoryId: 94545,
  }

export const questionnaireIntent_deleteAllPrevIntents_withoutServCat_fixture: Partial<QuestionnaireIntent> =
  {
    // data may not exist at all
    id: 'firstQuestionnaireIntentIdForCheckLatestWihtoutServCat',
    patientId: 123123444,
    questionnaireId: 99878544,
    serviceCategoryId: null,
  }

export const questionnaireIntentMaleSexAtBirthServiceItemsFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-male-sex-at-birth-service-items-fixture',
  questionnaireId: questionnaireMaleSexAtBirthUpdatePatientFixture.id,
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  updatedBy: AuthUserFixture.cartUpdatePatientMaleSexAtBirth.uid,
  isCompleted: false,
  questions: [
    {
      questionId: questionMaleSexAtBirthFixture.id,
      answers: [SexAtBirth.Male],
      answerType: questionMaleSexAtBirthFixture.type,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentFemaleSexAtBirthServiceItemsFixture: Partial<QuestionnaireIntent> =
  {
    id: 'questionnaire-intent-female-sex-at-birth-service-items-fixture',
    questionnaireId: questionnaireFemaleSexAtBirthUpdatePatientFixture.id,
    serviceCategoryId: serviceFemaleSexAtBirthUpdatePatientFixture.id,
    patientId: patientEmailVerifiedFixture.id,
    updatedBy: AuthUserFixture.cartUpdatePatientMaleSexAtBirth.uid,
    isCompleted: false,
    questions: [
      {
        questionId: questionMaleSexAtBirthFixture.id,
        answers: [SexAtBirth.Female],
        answerType: questionMaleSexAtBirthFixture.type,
      },
    ],
    updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
    createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  }

export const questionnaireIntentPatientDontHaveSexAtBirthFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaireIntentPatientDontHaveSexAtBirthFixture',
  questionnaireId: questionnaireFemaleSexAtBirthUpdatePatientFixture.id,
  serviceCategoryId: serviceCategoryPatientDontHaveSexAtBirthFixture.id,
  patientId: cartPatientUpdateFemaleSexAtBirthFixture.id,
  updatedBy: AuthUserFixture.cartUpdatePatientFemaleSexAtBirth.uid,
  isCompleted: false,
  questions: [
    {
      questionId: questionFemaleSexAtBirthFixture.id,
      answers: [null], //without any answer to sexAtBirth
      answerType: questionFemaleSexAtBirthFixture.type,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentForMenstrualPeriodConstraintWithSkipDaysFixture: Partial<QuestionnaireIntent> =
  {
    id: 'questionnaire-intent-for-menstrual-period-constraint-with-skip-days-fixture',
    questionnaireId: questionnaireForServiceGroupFixture.id,
    serviceCategoryId: serviceCategoryFixture.id,
    patientId: patientForCreateBookingIntentFixture.id,
    updatedBy: AuthUserFixture.emailVerified.uid,
    isCompleted: false,
    updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
    createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
    questions: [
      {
        questionId: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.id,
        answers: ['2030-09-08'],
        answerType: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.type,
      },
      {
        questionId: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.id,
        answers: [30],
        answerType: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.type,
      },
      {
        questionId: questionStaticSexAtBirthFixture.id,
        answers: [SexAtBirth.Female],
        answerType: questionStaticSexAtBirthFixture.type,
      },
    ],
  }

export const secondIntentId: string = 'secondQuestionnaireIntentIdForCheckLatest'
export const nextSecondIntentId: string = 'secondQuestionnaireIntentIdForCheckLatestWihtoutServCat'

export const questionnaireIntentWithoutQuestionsFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-without-questions-fixture',
  questionnaireId: emptyQuestionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientForQuestionnaireFixture.id,
  questions: [],
}

export const questionnaireIntentForCheckoutConfirmRevisionFixture: Partial<QuestionnaireIntent> = {
  id: 'questIntent-confirmCheckoutRevision',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientCartConfirmRevisionsFixture.id,
  updatedBy: AuthUserFixture.cartConfirmRevisions.uid,
  isCompleted: false,
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  questions: [{questionId: stringQuestionFixture.id, answerType: QuestionType.String, answers: []}],
}

export const questionnaireIntentWithSexAtBirthMaleFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-with-sex-male',
  questionnaireId: questionnaireForSexAtBirthMaleFixture.id,
  serviceCategoryId: serviceCategoryForSexAtBirthFixture.id,
  patientId: patientFemaleFixture.id,
  questions: [],
}

export const questionnaireIntentWithHasPeriodYesFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-has-period-yes',
  questionnaireId: questionnaireWithHasMenstrualPeriodFixture.id,
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  patientId: patientFemaleFixture.id,
  questions: [
    {
      questionId: questionWithHasPeriodFixture.id,
      answers: ['Yes'],
      answerType: QuestionType.Choice,
    },
  ],
}

export const questionnaireIntentSecondExtraFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-service-type-second-extra-id',
  questionnaireId: questionnaireMaleSexAtBirthUpdatePatientFixture.id,
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
  patientId: patientServiceTypeSecondExtraFixture.id,
  updatedBy: AuthUserFixture.serviceTypeSecondExtra.uid,
  isCompleted: false,
  questions: [
    {
      questionId: questionMaleSexAtBirthFixture.id,
      answers: [SexAtBirth.Male],
      answerType: questionMaleSexAtBirthFixture.type,
    },
  ],
  updatedAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtility.getFirestoreTimeStampNowDate(),
}

export const questionnaireIntentWithHasPeriodNoFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-has-period-no',
  questionnaireId: questionnaireWithHasMenstrualPeriodFixture.id,
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  patientId: patientFemaleFixture.id,
  questions: [
    {
      questionId: questionWithHasPeriodFixture.id,
      answers: ['No'],
      answerType: QuestionType.Choice,
    },
  ],
}
export const questionnaireIntentSinglePlanFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-single-plan',
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  patientId: patientWithSinglePlanFixture.id,
  questions: [
    {
      questionId: choiceQuestionFixture.id,
      answers: ['No'],
      answerType: QuestionType.Choice,
      note: 'Note',
    },
  ],
  updatedByPatientId: patientWithSinglePlanFixture.id,
  questionIdsToAsk: [choiceQuestionFixture.id],
  currentQuestionId: choiceQuestionFixture.id,
}

export const questionnaireIntentPatientIntakeFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-patient-intake',
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  patientId: patientIntakeFixture.id,
  questions: [
    {
      questionId: choiceQuestionFixture.id,
      answers: ['No'],
      answerType: QuestionType.Choice,
      note: 'Note',
    },
  ],
  updatedByPatientId: patientIntakeFixture.id,
  questionIdsToAsk: [choiceQuestionFixture.id],
  currentQuestionId: choiceQuestionFixture.id,
}

export const questionnaireIntentPartnerIntakeFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-partner-intake',
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  patientId: patientForPartnerUserTypeFixture.id,
  questions: [
    {
      questionId: choiceQuestionFixture.id,
      answers: ['Yes'],
      answerType: QuestionType.Choice,
      revisionStatus: RevisionStatus.Added,
    },
  ],
}

const commonDataForQuestionnaireIntentForPatientIntakeProgress: Partial<QuestionnaireIntent> = {
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  questions: [
    {
      questionId: choiceQuestionFixture.id,
      answers: ['Yes'],
      answerType: QuestionType.Choice,
    },
  ],
}

export const questionnaireForCompletedPatientIntakeFixture: Partial<QuestionnaireIntent> = {
  ...commonDataForQuestionnaireIntentForPatientIntakeProgress,

  id: 'questionnaire-intent-completedPI-intake',
  patientId: patientForCompletedPatientIntakeFixture.id,
  updatedByPatientId: patientForCompletedPatientIntakeFixture.id,
}

export const questionnaireForCheckedInPatientIntakeFixture: Partial<QuestionnaireIntent> = {
  ...commonDataForQuestionnaireIntentForPatientIntakeProgress,

  id: 'questionnaire-intent-checkedIn-intake',
  patientId: patientForCheckedInPatientIntakeFixture.id,
  updatedByStaffId: staffUserFixture.id,
}

export const questionnaireForFinalizingInProgressInPatientIntakeFixture: Partial<QuestionnaireIntent> =
  {
    ...commonDataForQuestionnaireIntentForPatientIntakeProgress,

    id: 'questionnaire-intent-finilazeInProgres-intake',
    patientId: patientForFinalizingInProgressInPatientIntakeFixture.id,
    updatedByStaffId: staffUserFixture.id,
  }

/** QI which should be delete on IC-form when IC-form will be finished  */
export const questionnaireIntentForPatientMaleIntakeCompletedFixture: Partial<QuestionnaireIntent> =
  {
    id: 'questionnaire-intent-IntakeCompletedFixture',
    questionnaireId: questionnaireWithPatientIntakeMaleCompletedFixture.id, //set which has journeyMilestone
    serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
    patientId: patientForMaleIcFormFixture.id,
  }

export const questionnaireIntentRevisionFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-revision',
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  patientId: patientIntakeRevisionStatusFixture.id,
  questions: [
    {
      questionId: choiceQuestionFixture.id,
      answers: ['Yes'],
      answerType: QuestionType.Choice,
      revisionStatus: RevisionStatus.Added,
      sequence: 1,
    },
    {
      questionId: question4WithExecutedConstraintDataFixture.id,
      answers: ['Test'],
      answerType: QuestionType.String,
      revisionStatus: RevisionStatus.Removed,
      sequence: 2,
    },
    {
      questionId: questionIntakeWithRepeat.id,
      answers: ['Yes'],
      answerType: QuestionType.MultipleChoice,
      revisionStatus: RevisionStatus.Added,
      sequence: 3,
    },
    {
      questionId: question4WithExecutedConstraintDataFixture.id,
      answers: ['ppppppppp'],
      answerType: QuestionType.String,
      revisionStatus: RevisionStatus.Removed,
      sequence: 4,
    },
  ],
}

// Don't save in seed
export const skipQuestionIntentFixture: QuestionIntent = {
  note: null,
  sequence: null,
  questionId: ohipGroupQuestionFixture.id,
  questionnaireToQuestionId: 'f80e3125-022c-4038-a3df-596c434592fd',
  answerType: ohipGroupQuestionFixture.type,
  answers: [],
  revisionStatus: RevisionStatus.Removed,
  applicationCode: null,
}

export const RemovedQuestionAnswerFixture: string = 'Aa'
export const QuestionAnswerWhichRemovedBeforeFixture: string = 'Bb'
export const questionnaireIntentForRevisionChangesForMovedQuestionFixture: Partial<QuestionnaireIntent> =
  {
    id: 'questionnaire-intent-revision-changes-for-moved-question',
    questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
    serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
    patientId: patientIntakeRevisionChangesForMovedQuestionFixture.id,
    questions: [
      {
        questionId: choiceQuestionFixture.id,
        answers: ['Yes'],
        answerType: QuestionType.Choice,
        revisionStatus: RevisionStatus.Added,
        sequence: 1,
      },
      {
        questionId: stringMaxLengthQuestionFixture.id,
        answers: [RemovedQuestionAnswerFixture],
        answerType: QuestionType.String,
        revisionStatus: RevisionStatus.Removed,
        sequence: 2,
      },
      {
        questionId: questionIntakeWithRepeat.id,
        answers: ['Yes'],
        answerType: QuestionType.MultipleChoice,
        revisionStatus: RevisionStatus.Added,
        sequence: 3,
      },
      {
        questionId: stringMaxLengthQuestionFixture.id,
        answers: [QuestionAnswerWhichRemovedBeforeFixture],
        answerType: QuestionType.String,
        sequence: 4,
      },
    ],
  }

export const questionnaireIntentForGetAnswersSeparatedApiFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-consent-SepApi',
  patientQuestionnaireId: patientQuestionnaireForGetAnswersSeparatedApiFixture.id,
  patientId: patientForConsentMobileFixture.id,
  questions: [
    {
      questionId: question1Fixture.id,
      answers: ['Yes'],
      answerType: QuestionType.String,
      sequence: 1,
    },
    {
      questionId: questionForMultiSelectFixture.id,
      answers: [answerOptionForOneMultiSelectQuestionFixture.uuid],
      answerType: QuestionType.MultipleChoice,
      sequence: 2,
    },
    {
      questionId: questionDateOfBirthFixture.id,
      answers: ['1990-01-01'],
      answerType: QuestionType.Date,
      sequence: 3,
    },
  ],
}

export const questionnaireIntentForConsentSignMobileFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-consent-sign-mobile',
  patientQuestionnaireId: patientQuestionnaireForSignMobileFixture.id,
  patientId: patientForConsentSignMobileFixture.id,
  questions: [
    {
      questionId: question1Fixture.id,
      answers: ['Yesfdddd'],
      answerType: QuestionType.String,
      sequence: 1,
    },
    {
      questionId: questionForMultiSelectFixture.id,
      answers: [
        answerOptionForOneMultiSelectQuestionFixture.uuid,
        answerOptionForTwoMultiSelectQuestionFixture.uuid,
      ],
      answerType: QuestionType.MultipleChoice,
      sequence: 2,
    },
  ],
}

export const questionnaireIntentForConsentSignPartnerMobileFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-consent-sign-Partner',
  patientQuestionnaireId: patientQuestionnaireForSignPartnerMobileFixture.id,
  patientId: patientForConsentSignPartnerMobileFixture.id,
  questions: [
    {
      questionId: question1Fixture.id,
      answers: ['Yesfdddd'],
      answerType: QuestionType.String,
      sequence: 1,
    },
    {
      questionId: questionForMultiSelectFixture.id,
      answers: [
        answerOptionForOneMultiSelectQuestionFixture.uuid,
        answerOptionForTwoMultiSelectQuestionFixture.uuid,
      ],
      answerType: QuestionType.MultipleChoice,
      sequence: 2,
    },
  ],
}
