/* eslint-disable max-lines */
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {applicationCodeExistsTypeFixture} from '@libs/common/test/fixtures/application-code.fixture'
import {QuestionInputSeed} from '@seeds/typeorm'
import {v4} from 'uuid'
import {PatientInfoMapCode} from '@libs/services-common/enums'
export const uuidSuffix: string = '_00000-0000-0000-0000_Question'
const questionOhipUUID: string = v4()
const questionChoiceUUID: string = v4()

export const groupQuestionFixture: QuestionInputSeed = {
  id: 1,
  uuid: 'GroupQuestionForIntentUUID',
  type: QuestionType.Group,
  text: 'Do you have an OHIP card?',
  applicationCodeId: applicationCodeExistsTypeFixture.id,
}
export const ohipQuestionFixture: QuestionInputSeed = {
  id: 2,
  uuid: 'OhipQuestionForIntentUUID',
  type: QuestionType.Ohip,
  placeholder: 'OHIP Number',
  parentQuestionId: groupQuestionFixture.id,
}
export const decimalQuestionFixture: QuestionInputSeed = {
  id: 3,
  uuid: 3 + '_000000-0000-0000-0000-000_Question',
  repeat: false,
  type: QuestionType.Decimal,
  patientInfoMapCode: PatientInfoMapCode.OhipCardNumber,
}
export const integerQuestionWithParentFixture: QuestionInputSeed = {
  id: 4,
  uuid: 4 + '_000000-0000-0000-0000-000_Question',
  repeat: false,
  type: QuestionType.Integer,
  parentQuestionId: decimalQuestionFixture.id,
}

/** Last Answered question in questionnaireIntentSuccessId (but no last by sequence/constraint)  */
export const integerQuestionFixture: QuestionInputSeed = {
  id: 5,
  uuid: 5 + '_000000-0000-0000-0000-000_Question',
  repeat: false,
  type: QuestionType.Integer,
}

export const questionOhipFixture: QuestionInputSeed = {
  id: 6,
  uuid: questionOhipUUID,
  type: QuestionType.Ohip,
  text: 'questionText',
  applicationCodeId: applicationCodeExistsTypeFixture.id,
  repeat: false,
}
export const questionChoiceFixture: QuestionInputSeed = {
  id: 7,
  uuid: questionChoiceUUID,
  type: QuestionType.Text,
  text: 'questionText',
  repeat: false,
}

export const choiceQuestionFixture: QuestionInputSeed = {
  id: 8,
  uuid: 'ohipChoiceQuestionUUID',
  type: QuestionType.Choice,
  text: 'Do you have an OHIP card?',
  patientInfoMapCode: PatientInfoMapCode.HasOhipCard,
  placeholder: 'example',
  subText: 'sub-text',
  required: true,
}

export const ohipGroupQuestionFixture: QuestionInputSeed = {
  id: 9,
  uuid: 'ohipDetailsGroupQuestionParentUUID',
  type: QuestionType.String,
  repeat: true,
  maxCountValidation: 2,
  errorMessageForValidation: 'QUESTION_MAXIMUM_COUNT_ERROR',
}

export const textFirstQuestionFixture: QuestionInputSeed = {
  id: 10,
  uuid: 'textFirstQuestionUUID',
  type: QuestionType.Text,
  subText: 'textFirstQuestionSubText',
  buttonLabel: 'textFirstQuestionButtonLabel',
}

export const textQuestionFixture: QuestionInputSeed = {
  id: 11,
  uuid: 'textQuestionUUID',
  type: QuestionType.Text,
  subText: 'textQuestionSubText',
  buttonLabel: 'textQuestionButtonLabel',
}

export const ohipVersionChildQuestionFixture: QuestionInputSeed = {
  id: 12,
  uuid: 'ohipVersionChildQuestionUUID',
  type: QuestionType.String,
  parentQuestionId: ohipGroupQuestionFixture.id,
  patientInfoMapCode: PatientInfoMapCode.OhipCardVersionCode,
}

export const ageLastQuestionFixture: QuestionInputSeed = {
  id: 13,
  uuid: 'ageQuestionUUID',
  type: QuestionType.Integer,
  applicationCodeId: null,
}

export const afterPriorityQuestionDataFixture: QuestionInputSeed = {
  id: 14,
  uuid: 'afterPriorityQuestionUUID',
  type: QuestionType.Ohip,
  applicationCodeId: null,
  text: 'Do you have an OHIP card?',
}

export const question3WithNotExecutedConstraintDataFixture: QuestionInputSeed = {
  id: 16,
  uuid: 'questionWithNotExecutedConstraints',
  type: QuestionType.String,
}

export const question4WithExecutedConstraintDataFixture: QuestionInputSeed = {
  id: 17,
  uuid: 'question4WithExecutedConstraint',
  type: QuestionType.String,
  required: true,
}

export const ohipNumberChildQuestionDataFixture: QuestionInputSeed = {
  id: 18,
  uuid: 'ohipNumberChildQuestionUUID',
  type: QuestionType.String,
  parentQuestionId: ohipGroupQuestionFixture.id,
  patientInfoMapCode: PatientInfoMapCode.OhipCardNumber,
}

export const choiceQuestionValidationFixture: QuestionInputSeed = {
  id: 20,
  uuid: 'choiceQuestionValidationFixture',
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.LatexAllergy,
}

export const stringQuestion2Fixture: QuestionInputSeed = {
  id: 22,
  uuid: 'stringValidationQuestionUUID',
  type: QuestionType.String,
  regexForValidation: '^[A-Z]{3}$',
  errorMessageForValidation: 'Your string is invalid',
}

export const stringMaxLengthQuestionFixture: QuestionInputSeed = {
  id: 23,
  uuid: 'lengthValidationQuestionUUID',
  type: QuestionType.String,
  maxLengthValidation: 3,
  errorMessageForValidation: 'Your string is too long (more that 3)',
}

export const integerQuestion2Fixture: QuestionInputSeed = {
  id: 24,
  uuid: 'integerValidationQuestionUUID',
  type: QuestionType.Integer,
  regexForValidation: '^[0-9]{3}$',
  errorMessageForValidation: 'Your Integer is invalid',
}

export const groupQuestion2Fixture: QuestionInputSeed = {
  id: 25,
  uuid: 'groupValidationQuestionUUID',
  type: QuestionType.Group,
}

export const childQuestionOhipNumberFixture: QuestionInputSeed = {
  id: 26,
  uuid: 'ohipCardValidationQuestionUUID',
  type: QuestionType.Ohip,
  regexForValidation: '^[0-9]{3}$',
  errorMessageForValidation: 'Your Ohip is invalid',
  parentQuestionId: groupQuestion2Fixture.id,
}

export const childQuestion2Fixture: QuestionInputSeed = {
  id: 27,
  uuid: 'childIntegerValidationQuestionUUID',
  type: QuestionType.Integer,
  regexForValidation: '^[A-Z]{2}$',
  errorMessageForValidation: 'Your Integer is invalid',
  parentQuestionId: 25,
}

export const multiSelectQuestionFixture: QuestionInputSeed = {
  id: 28,
  uuid: 'multiSelectQuestion',
  type: QuestionType.MultipleChoice,
  patientInfoMapCode: PatientInfoMapCode.LatexAllergy,
}

export const question1Fixture: QuestionInputSeed = {
  id: 29,
  uuid: 'basicQ1',
  text: 'question1Fixture',
}

export const question2WithConstraintFixture: QuestionInputSeed = {
  id: 30,
  uuid: 'Q2ShowByConstraint',
}

export const question3WithConstraintFixture: QuestionInputSeed = {
  id: 31,
  uuid: 'Q3ShowByConstraint',
}

export const stringQuestionFixture: QuestionInputSeed = {
  id: 32,
  uuid: 32 + '_00000-0000-0000-0000-000_Question',
  repeat: false,
  type: QuestionType.String,
}

export const choiceQuestion2Fixture: QuestionInputSeed = {
  id: 33,
  uuid: 'ohipChoiceQuestionUUID44',
  type: QuestionType.Choice,
  text: 'Do you have an OHIP card?',
}

export const questionBeforeOhipFixture: QuestionInputSeed = {
  id: 34,
  uuid: 34 + 'questionBeforeOhipFixture',
  type: QuestionType.String,
}

export const ohipGroupQuestion2Fixture: QuestionInputSeed = {
  id: 35,
  uuid: 35 + 'ohipGroupQuestion2Fixture',
  type: QuestionType.Group,
}
export const ohipChildGroupQuestionFixture: QuestionInputSeed = {
  id: 36,
  uuid: 36 + 'ohipChildQuestion',
  type: QuestionType.String,
  parentQuestionId: ohipGroupQuestion2Fixture.id,
}

export const ohipNumberChildQuestionData2Fixture: QuestionInputSeed = {
  id: 37,
  uuid: 37 + 'ohipNumberChildQuestion',
  type: QuestionType.String,
  parentQuestionId: ohipGroupQuestion2Fixture.id,
}

export const ohipVersionChildQuestion2Fixture: QuestionInputSeed = {
  id: 38,
  uuid: 38 + 'ohipVersionChildQuestionUUID44',
  type: QuestionType.String,
  parentQuestionId: ohipGroupQuestion2Fixture.id,
}

export const ageLastQuestion2Fixture: QuestionInputSeed = {
  id: 39,
  uuid: 39 + 'ageQuestionUUID44',
  type: QuestionType.Integer,
  applicationCodeId: null,
}

export const firstQuestionFixture: QuestionInputSeed = {
  id: 52,
  uuid: 'textQuestionUUID3',
  type: QuestionType.Text,
}
export const secondQuestionFixture: QuestionInputSeed = {
  id: 53,
  uuid: 'textQuestionUUID2',
  type: QuestionType.Text,
}

export const thirdQuestionFixture: QuestionInputSeed = {
  id: 54,
  uuid: 'afterPriorityQuestionUUID2',
  type: QuestionType.Ohip,
}
export const fourthQuestionFixture: QuestionInputSeed = {
  id: 55,
  uuid: 'ageQuestionUUID2',
  type: QuestionType.Integer,
}

export const ohipQuestion2Fixture: QuestionInputSeed = {
  id: 56,
  uuid: 'ohipValidationQuestionUUID',
  type: QuestionType.Ohip,
  regexForValidation: '^[A-Z]{3}$',
  errorMessageForValidation: 'Your OHIP is invalid',
}
export const genderAtBirthQuestionFixture: QuestionInputSeed = {
  id: 57,
  uuid: 'genderAtBirthQuestionUUID',
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.SexAtBirth,
}

// 1. START get-prev-question-group.test.ts
/** including 1 child question */
export const question_getPrev_group_fixture: QuestionInputSeed = {
  id: 59,
  uuid: 59 + uuidSuffix,
  repeat: true,
  type: QuestionType.Group,
}

/** Question created after secondChild. But should show correctly based on childQuestionSequence */
export const question_getPrev_groupChild_fixture: QuestionInputSeed = {
  id: 70,
  uuid: 70 + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  parentQuestionId: question_getPrev_group_fixture.id,
  childQuestionSequence: 1,
}

/** Question created before FirstChild. But should show correctly based on childQuestionSequence */
export const question_getPrev_groupChildTwo_fixture: QuestionInputSeed = {
  id: 60,
  uuid: 60 + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
  parentQuestionId: question_getPrev_group_fixture.id,
  childQuestionSequence: 2,
}

/** just for questinnaire - not using in logic */
export const question_getPrev_groupSecondSimple_fixture: QuestionInputSeed = {
  id: 71,
  uuid: 71 + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
}
// 1.1 END

// 2.0. START questionnaire-date-of-birth.test.ts
export const questionDateOfBirthFixture: QuestionInputSeed = {
  id: 72,
  uuid: 72 + 'questionDateOfBirthFixture',
  type: QuestionType.Date,
  patientInfoMapCode: PatientInfoMapCode.DateOfBirth,
}
// 2.1. END

// // 3. START get-prev-question-simple.test.ts
/** including 1 child question */

export const question_getPrev_simpleFirst_fixture: QuestionInputSeed = {
  id: 73,
  uuid: 73 + '_Question',
  type: QuestionType.String,
  required: true,
}

export const question_getPrev_simpleSecond_fixture: QuestionInputSeed = {
  id: 74,
  uuid: 74 + '_Question',
  repeat: true,
  type: QuestionType.MultipleChoice,
  maxCountValidation: 2,
}

/** should omit by constraint
 *  for test we just didn't answered that question
 */
export const question_getPrev_simpleOmitByConstraint_fixture: QuestionInputSeed = {
  id: 75,
  uuid: 75 + '_QuestionWithConstraintShouldOmit',
  type: QuestionType.String,
}

export const question_getPrev_simpleThirdExtra_fixture: QuestionInputSeed = {
  id: 76,
  uuid: 76 + '_Question',
  repeat: true,
  type: QuestionType.MultipleChoice,
}
// 3.1 END
export const questionFemaleSexAtBirthFixture: QuestionInputSeed = {
  id: 77,
  uuid: 77 + uuidSuffix,
  type: QuestionType.Choice,
}
export const questionMaleSexAtBirthFixture: QuestionInputSeed = {
  id: 78,
  uuid: 78 + '000000-0000-0000-0000-000_Question',
  type: QuestionType.Choice,
}

export const questionStaticSexAtBirthFixture: QuestionInputSeed = {
  id: 79,
  uuid: 79 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SexAtBirth,
}

export const questionStaticGenderFixture: QuestionInputSeed = {
  id: 80,
  uuid: 80 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.Gender,
}

export const questionStaticLatexAllergyFixture: QuestionInputSeed = {
  id: 81,
  uuid: 81 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.LatexAllergy,
}

export const questionStaticNumberOfPregnanciesFixture: QuestionInputSeed = {
  id: 82,
  uuid: 82 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.NumberOfPregnancies,
}

export const questionStaticPreferredPronounsFixture: QuestionInputSeed = {
  id: 83,
  uuid: 83 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.PreferredPronouns,
}

export const questionStaticSexualOrientationFixture: QuestionInputSeed = {
  id: 84,
  uuid: 84 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SexualOrientation,
}

export const questionStaticCurrentStressLevelFixture: QuestionInputSeed = {
  id: 85,
  uuid: 85 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.CurrentStressLevel,
}

export const questionStaticMonthsTryingToGetPregnantFixture: QuestionInputSeed = {
  id: 86,
  uuid: 86 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.MonthsTryingToGetPregnant,
}

export const questionSeeCounsellorForStressFixture: QuestionInputSeed = {
  id: 87,
  uuid: 87 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SeeCounsellorForStress,
}
export const questionIrrelevantFixture: QuestionInputSeed = {
  id: 88,
  uuid: 88 + uuidSuffix,
  type: QuestionType.Text,
  patientInfoMapCode: PatientInfoMapCode.SeeCounsellorForStress,
}
export const questionIodineFixture: QuestionInputSeed = {
  id: 89,
  uuid: 89 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.IodineAllergy,
}
// Ids 90-100 reserved for questionnaire-revision.fixture.ts
// Ids 110-120 reserved for get-next-question-without-answer.fixture.ts
// Ids 170-180 reserved for question-validation-count.fixture.ts
export const repeatGroupQuestionFixture: QuestionInputSeed = {
  id: 183,
  uuid: 'RepeatGroupQuestionForIntentUUID',
  type: QuestionType.Group,
  repeat: true,
}
export const questionRepeatOhip1Fixture: QuestionInputSeed = {
  id: 184,
  uuid: 'repeatOhipQuestionForIntentUUID1',
  type: QuestionType.String,
  placeholder: 'Group question',
  parentQuestionId: repeatGroupQuestionFixture.id,
}
export const repeatOhipQuestion2Fixture: QuestionInputSeed = {
  id: 185,
  uuid: 'repeatOhipQuestionForIntentUUID2',
  type: QuestionType.String,
  placeholder: 'Group question',
  parentQuestionId: repeatGroupQuestionFixture.id,
}
export const questionMiscarriageYearfixture: QuestionInputSeed = {
  id: 186,
  uuid: '186_question',
  type: QuestionType.Date,
  patientInfoMapCode: PatientInfoMapCode.MiscarriageYear,
}
export const questionYearDropdownGroupQuestionFixture: QuestionInputSeed = {
  id: 187,
  uuid: '187_question',
  type: QuestionType.Group,
}
export const questionYearDropdownChildQuestionFixture: QuestionInputSeed = {
  id: 188,
  uuid: '188_question',
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.MiscarriageYear,
  parentQuestionId: questionYearDropdownGroupQuestionFixture.id,
}
export const questionYearDropdownWithPreTermDeliveryYearChildQuestionFixture: QuestionInputSeed = {
  id: 189,
  uuid: '189_question',
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.PreTermDeliveryYear,
  parentQuestionId: questionYearDropdownGroupQuestionFixture.id,
}
// Ids 190-200 reserved for questionnaire-submitted.fixture.ts
// Ids 202-210 reserved for get-next-contraint-question-by-static-answer.fixture.ts
// Ids 120-125 reserved for completed-for-display-type.ts
export const questionCartSexAtBirthGroupFixture: QuestionInputSeed = {
  id: 230,
  uuid: '230_question',
  type: QuestionType.Group,
}
export const questionCartSexAtBirhChildFixture: QuestionInputSeed = {
  id: 231,
  uuid: '231_question',
  type: QuestionType.Choice,
  parentQuestionId: questionCartSexAtBirthGroupFixture.id,
}
export const questionStaticRaceFixture: QuestionInputSeed = {
  id: 232,
  uuid: 232 + uuidSuffix,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.Race,
}

export const questionDisplayFixture: QuestionInputSeed = {
  id: 239,
  uuid: 239 + uuidSuffix,
  type: QuestionType.Display,
}

export const questionStaticNoFixture: QuestionInputSeed = {
  id: 234,
  uuid: 234 + uuidSuffix,
  type: QuestionType.Choice,
}

export const questionStaticNo2Fixture: QuestionInputSeed = {
  id: 236,
  uuid: 236 + uuidSuffix,
  type: QuestionType.Choice,
}

export const questionStaticNo3Fixture: QuestionInputSeed = {
  id: 237,
  uuid: 237 + uuidSuffix,
  type: QuestionType.Choice,
}

export const questionOhipParentFixture: QuestionInputSeed = {
  id: 112236,
  uuid: '112236_question',
  type: QuestionType.Group,
}

export const questionChildWithOhipNumberFixture: QuestionInputSeed = {
  id: 112237,
  uuid: '112237_question',
  type: QuestionType.Ohip,
  patientInfoMapCode: PatientInfoMapCode.OhipCardNumber,
  parentQuestionId: questionOhipParentFixture.id,
  childQuestionSequence: 1,
}

export const questionChildWithOhipVersionFixture: QuestionInputSeed = {
  id: 112238,
  uuid: '112238_question',
  type: QuestionType.String,
  patientInfoMapCode: PatientInfoMapCode.OhipCardVersionCode,
  parentQuestionId: questionOhipParentFixture.id,
  childQuestionSequence: 2,
}

export const questionIntakeWithRepeat: QuestionInputSeed = {
  id: 112239,
  uuid: 112239 + '_Question',
  repeat: true,
  type: QuestionType.MultipleChoice,
  maxCountValidation: 2,
  required: true,
}

export const questionShowOnlyPortalFixture: QuestionInputSeed = {
  id: 217,
  uuid: 217 + '_question',
  type: QuestionType.Text,
  maxCountValidation: 2,
}

export const questionWithSoftDeletedOnQuestionnaireToQuestionFixture: QuestionInputSeed = {
  id: 225,
  uuid: 'SoftDeletedOnQTQ',
  type: QuestionType.Integer,
  applicationCodeId: null,
}

export const questionForMultiSelectFixture: QuestionInputSeed = {
  id: 250,
  uuid: 'questionForMultiSelectFixture',
  type: QuestionType.MultipleChoice,
  text: 'questionForMultiSelectFixture',
}
