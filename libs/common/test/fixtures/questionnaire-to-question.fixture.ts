/* eslint-disable max-lines */
import {
  textFirstQuestionFixture,
  afterPriorityQuestionDataFixture,
  ageLastQuestionFixture,
  childQuestionOhipNumberFixture,
  childQuestion2Fixture,
  choiceQuestionFixture,
  choiceQuestionValidationFixture,
  decimalQuestionFixture,
  groupQuestion2Fixture,
  integerQuestion2Fixture,
  integerQuestionFixture,
  integerQuestionWithParentFixture,
  multiSelectQuestionFixture,
  ohipGroupQuestionFixture,
  ohipNumberChildQuestionDataFixture,
  ohipQuestion2Fixture,
  ohipVersionChildQuestionFixture,
  question1Fixture,
  question2WithConstraintFixture,
  question3WithConstraintFixture,
  question3WithNotExecutedConstraintDataFixture,
  question4WithExecutedConstraintDataFixture,
  stringMaxLengthQuestionFixture,
  stringQuestion2Fixture,
  stringQuestionFixture,
  textQuestionFixture,
  thirdQuestionFixture,
  secondQuestionFixture,
  ohipGroupQuestion2Fixture,
  firstQuestionFixture,
  fourthQuestionFixture,
  choiceQuestion2Fixture,
  ageLastQuestion2Fixture,
  question_getPrev_group_fixture,
  question_getPrev_groupSecondSimple_fixture,
  question_getPrev_simpleSecond_fixture,
  question_getPrev_simpleThirdExtra_fixture,
  question_getPrev_simpleFirst_fixture,
  question_getPrev_simpleOmitByConstraint_fixture,
  ohipChildGroupQuestionFixture,
  questionBeforeOhipFixture,
  questionStaticSexAtBirthFixture,
  questionStaticGenderFixture,
  questionStaticLatexAllergyFixture,
  questionStaticNumberOfPregnanciesFixture,
  questionStaticPreferredPronounsFixture,
  questionStaticCurrentStressLevelFixture,
  questionStaticMonthsTryingToGetPregnantFixture,
  questionStaticSexualOrientationFixture,
  questionSeeCounsellorForStressFixture,
  questionIrrelevantFixture,
  repeatGroupQuestionFixture,
  questionRepeatOhip1Fixture,
  repeatOhipQuestion2Fixture,
  questionIodineFixture,
  questionStaticRaceFixture,
  questionDisplayFixture,
  questionOhipParentFixture,
  questionIntakeWithRepeat,
  questionWithSoftDeletedOnQuestionnaireToQuestionFixture,
} from '@libs/common/test/fixtures/question.fixture'
import {
  questionnaire2Fixture,
  questionnaireForBookingFlowId,
  questionnaireId3,
  questionnairePrevQuestionFixture,
  questionnaireId_IntentOhip,
  questionnaireId_Ohip,
  questionnaireId_Progress,
  questionnaire_getPrev_group_fixture,
  questionnaire_getPrev_simple_fixture,
  questionnaireForStaticAnswerOptionsFixture,
  questionnaireForGroupQuestionFixture,
  questionnaireForOhipServiceCategoryFixture,
  questionnaireForServiceCategoryTypeFixture,
  questionnaireForTestSequenceFixture,
  questionnaireWithPatientIntakeFemaleCompletedFixture,
  questionnaireFixture,
  questionnaireForCheckRaceFixture,
  questionnaireWithHasOhipCardFixture,
  questionnaireForOHIPFixture,
  questionnaireForOhipValidationFixture,
  questionnaireWithPatientIntakeMaleCompletedFixture,
  questionnaireForRevisionsNotChangedFixture,
  questionnaireSkipQuestionFixture,
  questionnaireForRemovedQuestionByRevisionFixture,
} from '@libs/common/test/fixtures/questionnaire.fixture'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'
import {
  questionEctopicPregnanciesMonthsToConceiveFixture,
  questionEctopicPregnanciesTypeFixture,
  questionEctopicPregnanciesYearFixture,
} from '@libs/common/test/fixtures/patient-data-question.fixture'
import {question_revision_fixture} from './questionnaire/questionnaire-revision.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'

const dateTimeUtility: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const questionnaireToQuestion1Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: stringQuestionFixture.id,
  questionnaireId: questionnaire2Fixture.id,
  sequence: 1,
}

export const questionnaireToQuestion2Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: decimalQuestionFixture.id,
  questionnaireId: questionnaire2Fixture.id,
  sequence: 2,
}

export const questionnairToQuestion3Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: integerQuestionWithParentFixture.id,
  questionnaireId: questionnaire2Fixture.id,
  sequence: 3,
}

export const questionnaireToQuestion4Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: integerQuestionFixture.id,
  questionnaireId: questionnaire2Fixture.id,
  sequence: 4,
}

export const questionnaireToQuestion4WichDoesntHaveAnswerFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: choiceQuestionFixture.id,
    uuid: '513dca73-78dc-400c-8ff3-5632a1415d3b',
    questionnaireId: questionnaire2Fixture.id,
    sequence: 5,
  }

export const questionnaireToQuestion5Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestionFixture.id,
  uuid: '4393a66e-7432-4ea2-bde2-3b9160cb8a38',
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 1,
  sequencePortal: 2,
}

export const questionnaireToQuestionHasOhipCardFixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestionFixture.id,
  questionnaireId: questionnaireWithHasOhipCardFixture.id,
  sequence: 1,
}

export const questionnaireToQuestionHasOhipCard2Fixture: Partial<QuestionnaireToQuestion> = {
  uuid: '31ed3eca-afbb-41c4-861a-1b1ca4742a7a',
  questionId: ohipGroupQuestionFixture.id,
  questionnaireId: questionnaireWithHasOhipCardFixture.id,
  sequence: 2,
}

export const questionnaireToQuestionDisplayFixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionDisplayFixture.id,
  questionnaireId: questionnaireWithHasOhipCardFixture.id,
  sequence: 3,
}

export const questionnaireToQuestion6Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipGroupQuestionFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 2,
  sequencePortal: 3,
}

export const questionnaireTo_childQuestion7Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipNumberChildQuestionDataFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequencePortal: 7,
}

export const questionnaireToQuestion_child8Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipVersionChildQuestionFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequencePortal: 8,
}

export const questionnaireToQuestion9Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question3WithNotExecutedConstraintDataFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 3,
  sequencePortal: 1,
}

export const questionnaireToQuestion10Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question4WithExecutedConstraintDataFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 4,
  sequencePortal: 4,
}

export const questionnaireToQuestion11Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ageLastQuestionFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 5,
  sequencePortal: 5,
}

export const questionnaireToQuestionForSoftDeletedQuestionFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionWithSoftDeletedOnQuestionnaireToQuestionFixture.id,
    questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
    sequence: 6,
    sequencePortal: 6,
    deletedAt: dateTimeUtility.now(),
  }

export const questionnaireToQuestion12Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipGroupQuestionFixture.id,
  questionnaireId: questionnaireForOhipServiceCategoryFixture.id,
  sequence: 1,
}

export const questionnaireToQuestion13Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestionFixture.id,
  questionnaireId: questionnaireForOhipServiceCategoryFixture.id,
  sequence: 2,
}

export const questionnaireToQuestion14Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ageLastQuestionFixture.id,
  questionnaireId: questionnaireForOhipServiceCategoryFixture.id,
  sequence: 3,
}

export const questionnaireToQuestion27Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: textFirstQuestionFixture.id,
  questionnaireId: questionnaireForServiceCategoryTypeFixture.id,
  sequence: 1,
}

export const questionnaireToQuestion28Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: textQuestionFixture.id,
  questionnaireId: questionnaireForServiceCategoryTypeFixture.id,
  sequence: 2,
}

export const questionnaireToQuestionValidation1Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestionValidationFixture.id,
  questionnaireId: questionnaireForBookingFlowId,
  sequence: 1,
}

export const questionnaireToQuestionValidation2Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipQuestion2Fixture.id,
  questionnaireId: questionnaireForBookingFlowId,
  sequence: 2,
}

export const questionnaireToQuestionValidation3Fixture: Partial<QuestionnaireToQuestion> = {
  uuid: 'f95f64b6-2cc3-45c2-b3f3-8f5bc30d1044',
  questionId: stringQuestion2Fixture.id,
  questionnaireId: questionnaireForBookingFlowId,
  sequence: 3,
}

export const questionnaireToQuestionValidation4Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: integerQuestion2Fixture.id,
  questionnaireId: questionnaireForBookingFlowId,
  sequence: 4,
}

export const questionnaireToQuestionValidation5Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: groupQuestion2Fixture.id,
  questionnaireId: questionnaireForBookingFlowId,
  sequence: 5,
}

export const questionnaireToQuestionValidation6Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: stringMaxLengthQuestionFixture.id,
  questionnaireId: questionnaireForBookingFlowId,
  sequence: 6,
}

export const questionnaireToQuestionValidation7Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: childQuestionOhipNumberFixture.id,
  questionnaireId: questionnaireForBookingFlowId,
}

export const questionnaireToQuestionValidation8Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: childQuestion2Fixture.id,
  questionnaireId: questionnaireForBookingFlowId,
}

// multi select
export const questionnaireToQuestionMultiSelectFixture: Partial<QuestionnaireToQuestion> = {
  questionId: multiSelectQuestionFixture.id,
  questionnaireId: questionnaireId3,
  sequence: 1,
}

export const questionnaireToQuestionPrevQuestion1Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question1Fixture.id,
  questionnaireId: questionnairePrevQuestionFixture.id,
  sequence: 1,
}

export const questionnaireToQuestionPrevQuestion2Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question2WithConstraintFixture.id,
  questionnaireId: questionnairePrevQuestionFixture.id,
  sequence: 2,
}

export const questionnaireToQuestionPrevQuestion3Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question3WithConstraintFixture.id,
  questionnaireId: questionnairePrevQuestionFixture.id,
  sequence: 3,
}

export const lastQuestionFixture: Partial<QuestionnaireToQuestion> = {
  questionId: textFirstQuestionFixture.id,
  questionnaireId: questionnaireForTestSequenceFixture.id,
  sequence: 1,
}

export const textQuestionFixtures: Partial<QuestionnaireToQuestion> = {
  questionId: textQuestionFixture.id,
  questionnaireId: questionnaireForTestSequenceFixture.id,
  sequence: 2,
}

export const afterPriorityQuestionData: Partial<QuestionnaireToQuestion> = {
  questionId: afterPriorityQuestionDataFixture.id,
  questionnaireId: questionnaireForTestSequenceFixture.id,
  sequence: 3,
}

export const lastQuestionFixture2: Partial<QuestionnaireToQuestion> = {
  questionId: ageLastQuestionFixture.id,
  questionnaireId: questionnaireForTestSequenceFixture.id,
  sequence: 4,
}

// questionnaireId_Ohip START

export const questionnaireToQuestionBeforeOhip1Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionBeforeOhipFixture.id,
  questionnaireId: questionnaireId_Ohip,
  sequence: 1,
}

export const questionnaireToQuestionOhip1Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipGroupQuestion2Fixture.id,
  questionnaireId: questionnaireId_Ohip,
  sequence: 2,
}

export const questionnaireToQuestionChildOhip2Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipChildGroupQuestionFixture.id,
  questionnaireId: questionnaireId_Ohip,
}

export const questionnaireToQuestionOhip2Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestion2Fixture.id,
  questionnaireId: questionnaireId_Ohip,
  sequence: 3,
}

export const questionnaireToQuestionOhip3Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ageLastQuestion2Fixture.id,
  questionnaireId: questionnaireId_Ohip,
  sequence: 4,
}

// questionnaireId_Ohip END

export const questionnaireToQuestionOhip4Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestion2Fixture.id,
  questionnaireId: questionnaireId_IntentOhip,
  sequence: 1,
}

export const questionnaireToQuestionOhip6Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestion2Fixture.id,
  questionnaireId: questionnaireId_IntentOhip,
  sequence: 3,
}

export const questionnaireToQuestionOhip5Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipGroupQuestion2Fixture.id,
  questionnaireId: questionnaireId_IntentOhip,
  sequence: 2,
}

export const questionnaireToQuestionProgress1Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: firstQuestionFixture.id,
  questionnaireId: questionnaireId_Progress,
  sequence: 1,
}

export const questionnaireToQuestionProgress2Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: secondQuestionFixture.id,
  questionnaireId: questionnaireId_Progress,
  sequence: 2,
}

export const questionnaireToQuestionProgress3Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: thirdQuestionFixture.id,
  questionnaireId: questionnaireId_Progress,
  sequence: 3,
}

export const questionnaireToQuestionProgress4Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: fourthQuestionFixture.id,
  questionnaireId: questionnaireId_Progress,
  sequence: 4,
}

// 1. START get-prev-question-group.test.ts
export const qTq_getPrev_group_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getPrev_group_fixture.id,
  questionnaireId: questionnaire_getPrev_group_fixture.id,
  sequence: 1,
}

export const qTq_getPrev_groupSimple_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getPrev_groupSecondSimple_fixture.id,
  questionnaireId: questionnaire_getPrev_group_fixture.id,
  sequence: 2,
}
// 1.1. END
// 3. START get-prev-question-simple.test.ts
/** We will answer this, and next, and get prev for next. This qustion leave as is */
export const qTq_getPrev_simpleFirst_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getPrev_simpleFirst_fixture.id,
  questionnaireId: questionnaire_getPrev_simple_fixture.id,
  sequence: 1,
}

export const qTq_getPrev_simpleOmitByConstraint_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getPrev_simpleOmitByConstraint_fixture.id,
  questionnaireId: questionnaire_getPrev_simple_fixture.id,
  sequence: 2,
}

/** main for which will call prev question */
export const qTq_getPrev_simple_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getPrev_simpleSecond_fixture.id,
  questionnaireId: questionnaire_getPrev_simple_fixture.id,
  sequence: 3,
}

/** for getPrevQusetion - should omit this one by constraint */

/** will be in questionnaire but we should omit it when do get lateast answered question */
export const qTq_getPrev_simpleSecond_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getPrev_simpleThirdExtra_fixture.id,
  questionnaireId: questionnaire_getPrev_simple_fixture.id,
  sequence: 4,
}
// 3.1. END

export const questionnaireToQuestionStaticAnswer1OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticSexAtBirthFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 1,
  }

export const questionnaireToQuestionStaticAnswer2OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticGenderFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 2,
  }

export const questionnaireToQuestionStaticAnswer3OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticLatexAllergyFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 3,
  }

export const questionnaireToQuestionStaticAnswer4OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticNumberOfPregnanciesFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 4,
  }

export const questionnaireToQuestionStaticAnswer5OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticPreferredPronounsFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 5,
  }

export const questionnaireToQuestionStaticAnswer6OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticSexualOrientationFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 6,
  }

export const questionnaireToQuestionStaticAnswer7OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticCurrentStressLevelFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 7,
  }

export const questionnaireToQuestionStaticAnswer8OptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticMonthsTryingToGetPregnantFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 8,
  }

export const questionnaireToQuestionSeeCounsellorForStressOptionsFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionSeeCounsellorForStressFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 9,
  }

export const questionnaireToQuestionIrrelevantFixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionIrrelevantFixture.id,
  questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
  sequence: 10,
}
export const questionnaireToQuestionRepeatfixture: Partial<QuestionnaireToQuestion> = {
  questionnaireId: questionnaireForGroupQuestionFixture.id,
  questionId: repeatGroupQuestionFixture.id,
  sequence: 1,
}
export const questionnaireToQuestionRepeat1fixture: Partial<QuestionnaireToQuestion> = {
  questionnaireId: questionnaireForGroupQuestionFixture.id,
  questionId: questionRepeatOhip1Fixture.id,
  sequence: 1,
}

export const questionnaireToQuestionRepeat2fixture: Partial<QuestionnaireToQuestion> = {
  questionnaireId: questionnaireForGroupQuestionFixture.id,
  questionId: repeatOhipQuestion2Fixture.id,
  sequence: 2,
}
export const questionnaireToQuestionEctopicPregnancyYearfixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionEctopicPregnanciesYearFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 10,
  }

export const questionnaireToQuestionEctopicPregnancyTypefixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionEctopicPregnanciesTypeFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 11,
  }
export const questionnaireToQuestionEctopicPregnancyToConceivefixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionEctopicPregnanciesMonthsToConceiveFixture.id,
    questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
    sequence: 12,
  }

export const questionnaireToQuestionIodineFixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionIodineFixture.id,
  questionnaireId: questionnaireForStaticAnswerOptionsFixture.id,
  sequence: 13,
}
export const questionnaireToQuestionForMainQuestionnaireFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: decimalQuestionFixture.id,
    questionnaireId: questionnaireFixture.id,
    sequence: 1,
  }
export const questionnaireToQuestionStaticAnswer1ForCheckRaceFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionStaticRaceFixture.id,
    questionnaireId: questionnaireForCheckRaceFixture.id,
    sequence: 1,
  }

export const questionnaireToQuestionOHIPFixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionOhipParentFixture.id,
  questionnaireId: questionnaireForOHIPFixture.id,
  sequence: 1,
}

export const questionnaireToOhipGroupQuestionFixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipGroupQuestionFixture.id,
  questionnaireId: questionnaireForOhipValidationFixture.id,
  sequence: 1,
}

export const questionnaireToChildOhipNumberFixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipNumberChildQuestionDataFixture.id,
  questionnaireId: questionnaireForOhipValidationFixture.id,
}

export const questionnaireToChildOhipVersionCodeFixture: Partial<QuestionnaireToQuestion> = {
  questionId: ohipVersionChildQuestionFixture.id,
  questionnaireId: questionnaireForOhipValidationFixture.id,
}

export const questionnaireToOhipLastQuestionFixture: Partial<QuestionnaireToQuestion> = {
  questionId: ageLastQuestionFixture.id,
  questionnaireId: questionnaireForOhipValidationFixture.id,
  sequence: 2,
}

export const questionnaireToPartnerFixture: Partial<QuestionnaireToQuestion> = {
  uuid: '6688e2f1-5871-4aab-853e-b7a12f2b6afc',
  questionId: choiceQuestionFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 1,
  sequencePortal: 4,
}

export const questionnaireToPartnerRepeatQuestionFixture: Partial<QuestionnaireToQuestion> = {
  uuid: '8d6fcd27-dd4f-406a-80b1-9bb92268a552',
  questionId: questionIntakeWithRepeat.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 2,
}

export const questionnaireToQuestionWithPatientIntakeMaleFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionIntakeWithRepeat.id,
    questionnaireId: questionnaireWithPatientIntakeMaleCompletedFixture.id,
    sequence: 1,
  }

/**
 * QuestionnaireToQuestion
 */
export const questionnaireToQuestionForRevisionNotChangedFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: question_revision_fixture.id,
    questionnaireId: questionnaireForRevisionsNotChangedFixture.id,
    sequence: 1,
  }

export const questionnaireToQuestionSkipQuestionFixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestionFixture.id,
  questionnaireId: questionnaireSkipQuestionFixture.id,
  sequence: 1,
}

export const questionnaireToQuestionSkipQuestion3Fixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionDisplayFixture.id,
  questionnaireId: questionnaireSkipQuestionFixture.id,
  sequence: 3,
}

export const questionnaireToQForRemovedQOneFixture: Partial<QuestionnaireToQuestion> = {
  questionId: choiceQuestionFixture.id,
  questionnaireId: questionnaireForRemovedQuestionByRevisionFixture.id,
  sequence: 1,
}

export const questionnaireToQForRemovedQTwoFixture: Partial<QuestionnaireToQuestion> = {
  questionId: integerQuestionFixture.id,
  questionnaireId: questionnaireForRemovedQuestionByRevisionFixture.id,
  sequence: 2,
}

export const questionnaireToQForRemovedQThreeFixture: Partial<QuestionnaireToQuestion> = {
  questionId: stringQuestionFixture.id,
  questionnaireId: questionnaireForRemovedQuestionByRevisionFixture.id,
  sequence: 3,
}

export const questionToQuestionnaireForMovedQuestionOneFixture: Partial<QuestionnaireToQuestion> = {
  uuid: '8d56cd27-dd4f-406a-80b1-9bb92268a552',
  questionId: choiceQuestionFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 1,
}

export const questionToQuestionnaireForMovedQuestionTwoFixture: Partial<QuestionnaireToQuestion> = {
  uuid: '7856cd27-dd4f-406a-80b1-9bb92268a552',
  questionId: questionIntakeWithRepeat.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 2,
}
export const questionToQuestionnaireForMovedQuestionMovedQuestionFixture: Partial<QuestionnaireToQuestion> =
  {
    uuid: '4456cd27-dd4f-406a-80b1-9bb92268a552',
    questionId: stringMaxLengthQuestionFixture.id,
    questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
    sequence: 3,
  }

export const questionToQuestionnaireRevisionFinalizeCaseFixture: Partial<QuestionnaireToQuestion> =
  {
    id: 973434,
    uuid: '4456cgf7-dd4f-406a-80b1-9bb92268a552',
    questionId: question4WithExecutedConstraintDataFixture.id,
    questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
    sequence: 3,
  }
