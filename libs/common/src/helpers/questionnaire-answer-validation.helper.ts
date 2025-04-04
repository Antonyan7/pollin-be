import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {Question} from '@libs/data-layer/apps/questionnaires/entities/typeorm/question.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {BadRequestException, BadRequestValidationException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {
  AnswerDto,
  AnswerRequestDtoItem,
} from '@apps/emr/questionnaire/dto/next-question-request.dto'
import {questionMaxDateValidation} from '@libs/common/helpers/questionnaire.helper'
import {getYear} from 'date-fns'
import {getAnsweredCurrentQuestion} from './questionnaire-answer-options.helper'
import {StaticPatientInfoMapCodeYearDropdown} from '@libs/services-common/enums'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {RevisionStatus} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {QuestionAnswerRequestDto} from '@apps/emr/intake-form/dto/intake-form-request.dto'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {PatientQuestionnaireToQuestion} from '@libs/data-layer/apps/users/entities/typeorm'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export function validateAnswer(
  payload: QuestionAnswerRequestDto[],
  questionnaireToQuestions: (QuestionnaireToQuestion | PatientQuestionnaireToQuestion)[],
  isFromPortal = false,
): void {
  const questionAnswerArr = getQuestionsWithAnswerToValidate(payload, questionnaireToQuestions)

  const errors = questionAnswerArr
    .map(({question, answers}) => {
      const errorMessage = validationQuestion(question, answers, isFromPortal)
      if (errorMessage) {
        return errorMessage
      }
    })
    .filter((errorMessage) => !!errorMessage)

  validateRepeatedGroupMaxCount(questionAnswerArr, errors)

  if (errors.length) {
    throw new BadRequestException(errors.join('\n'))
  }
}

/** Validate and push into errors if fail */
export function validateRepeatedGroupMaxCount(
  questionAnswerArr: {question: Question; answers: AnswerDto[]}[],
  errors: string[],
): void {
  // maxCount Group
  if (questionAnswerArr[0].question.type != QuestionType.Group) {
    return
  }

  const groupQuestion = questionAnswerArr[0].question
  if (!groupQuestion.maxCountValidation) {
    return
  }

  const repeatedGroups = questionAnswerArr.filter(
    (questionWithAnswer) => questionWithAnswer.question.type == QuestionType.Group,
  )
  if (repeatedGroups.length > groupQuestion.maxCountValidation) {
    checkExistingOfErrorMessage(groupQuestion)
    errors.push(groupQuestion.errorMessageForValidation)
  }
}

type QuestionAnswersToValidate = {question: Question; answers: AnswerDto[]}

function addQuestion(
  questionnaireToQuestions: (QuestionnaireToQuestion | PatientQuestionnaireToQuestion)[],
  questionAnswerRequestDto: QuestionAnswerRequestDto,
  questionAnswersToValidate: QuestionAnswersToValidate[],
): void {
  const question = getAnsweredCurrentQuestion(
    questionnaireToQuestions,
    questionAnswerRequestDto.questionId,
  )
  if (question) {
    questionAnswersToValidate.push({question, answers: questionAnswerRequestDto.answers})
  } else {
    StructuredLogger.warn(
      activityLogs.QuestionnaireFunctions.GetQuestionsWithAsnwerToValidate,
      activityLogs.QuestionnaireActions.QuestionNotFound,
      {
        questionsUUIDs: [questionAnswerRequestDto.questionId],
      },
    )
  }
}

/** get parent and child questions */
function getQuestionsWithAnswerToValidate(
  payload: QuestionAnswerRequestDto[],
  questionnaireToQuestions: (QuestionnaireToQuestion | PatientQuestionnaireToQuestion)[],
): QuestionAnswersToValidate[] {
  // it could be repeated group of questions
  return payload.reduce(
    (questionsWithAnswerToValidate: QuestionAnswersToValidate[], onePayload) => {
      if (onePayload.revisionStatus !== RevisionStatus.Removed) {
        // Single or Parent
        addQuestion(questionnaireToQuestions, onePayload, questionsWithAnswerToValidate)
        // children
        onePayload.questions?.forEach((childQuestion) =>
          addQuestion(questionnaireToQuestions, childQuestion, questionsWithAnswerToValidate),
        )
      }
      return questionsWithAnswerToValidate
    },
    [],
  )
}

const typesToBeValidated = [
  QuestionType.Decimal,
  QuestionType.Integer,
  QuestionType.String,
  QuestionType.Ohip,
  QuestionType.Text,
  QuestionType.Date,

  //for count validation
  QuestionType.MultipleChoice,
  QuestionType.Group,
]

const DefaultErrorMessage = 'No error message. But has validation errror'
export const MaxAnswerLengthMessage = 'Some answers exceed the maximum allowed length'

function validationQuestion(
  question: Question,
  answers: AnswerDto[],
  isFromPortal = false,
): string {
  if (!answers && !question.required) {
    return
  }

  const choiceType = isFromPortal ? QuestionType.Choice : ''

  if (![...typesToBeValidated, choiceType].includes(question.type)) {
    return
  }
  const errorMsg = question.errorMessageForValidation
    ? question.errorMessageForValidation + '.'
    : DefaultErrorMessage + `- ${question.uuid} \n `

  // requiredQuestions
  if (question.required && !answers?.length && question.type !== QuestionType.Group) {
    checkExistingOfErrorMessage(question)
    return errorMsg
  }

  // Max allowed length
  if (answers?.some((answer) => `${answer?.value}`.length > 512)) {
    return MaxAnswerLengthMessage
  }

  // Regex
  if (question.regexForValidation) {
    if (!RegExp(question.regexForValidation).test(String(answers[0].value))) {
      checkExistingOfErrorMessage(question)
      return errorMsg
    }
  }

  // maxLength
  if (
    question.maxLengthValidation &&
    answers?.some((answer) => `${answer.value}`.length > question?.maxLengthValidation)
  ) {
    checkExistingOfErrorMessage(question)
    return errorMsg
  }

  // maxCount MultipleChoice
  if (
    question.maxCountValidation &&
    question.type == QuestionType.MultipleChoice &&
    answers?.length > question.maxCountValidation
  ) {
    checkExistingOfErrorMessage(question)
    return errorMsg
  }

  // maxDate
  const {dateBiggerThanMaxDate, invalidFormat} = validateMaxDate(question, answers)
  if (dateBiggerThanMaxDate || invalidFormat) {
    checkExistingOfErrorMessage(question)
    writeErrorIfInvalidFormat(question, answers[0].value, invalidFormat)
    return errorMsg
  }

  return undefined //no errors
}

function writeErrorIfInvalidFormat(
  question: Question,
  answer: string | number | boolean,
  invalidFormat: boolean,
): void {
  if (invalidFormat) {
    StructuredLogger.error('validationQuestion', '', {
      message: `Question with maxDateValidation has bad format in date, answer=${answer}, questionId=${question.id}`,
    })
  }
}

function validateMaxDate(
  question: Question,
  answers: AnswerDto[],
): {
  dateBiggerThanMaxDate: boolean
  invalidFormat: boolean
} {
  const noErrors = {dateBiggerThanMaxDate: false, invalidFormat: false}
  const invalidFormat = {dateBiggerThanMaxDate: false, invalidFormat: true}

  if (!answers || !answers[0]?.value) {
    return noErrors
  }

  const answerStr = answers[0].value

  // it could be now or yesterday 23:59
  const maxDateValidation = questionMaxDateValidation(question)
  if (!maxDateValidation) {
    return noErrors
  }

  if (typeof answerStr !== 'string') {
    return invalidFormat
  }

  const answerDate = dateTimeUtil.toDate(answerStr)
  if (!dateTimeUtil.isValidDate(answerDate)) {
    return invalidFormat
  }

  if (dateTimeUtil.isAfter(answerDate, maxDateValidation)) {
    return {dateBiggerThanMaxDate: true, invalidFormat: false}
  }

  return noErrors
}

function checkExistingOfErrorMessage(question: Question): void {
  if (!question.errorMessageForValidation) {
    StructuredLogger.error('submitAndGetNextQuestion', 'validationQuestion', {
      message: `Question has validation but doesn't have an error for it. 
      The Administrator should add an error message for the question if the question has any validation logic. QuestionId= ${question.id}`,
    })
  }
}

export function validateGroupHasAnyAnsweredChildQuestion(payload: AnswerRequestDtoItem[]): void {
  if (!payload[0].questions?.length) {
    StructuredLogger.error('SubmitAndGetNextQuestion', 'saveIntentAnswers', {
      message: 'Error in data. Group of question should have at least 1 answered child question',
    })
  }
}

export function validateYearDropdownAnswers(data: {
  questions: Question[]
  i18nService: I18nLocalizationService
  payload?: QuestionAnswerRequestDto[]
}): Promise<void> {
  const {questions, i18nService, payload} = data
  if (!payload) {
    StructuredLogger.info(
      activityLogs.QuestionnaireFunctions.ValidateYearDropdownAnswers,
      activityLogs.QuestionnaireActions.SkipValidateYearDropdown,
      {},
    )
    return
  }

  for (const answerRequest of payload) {
    if (answerRequest.revisionStatus === RevisionStatus.Removed) {
      continue
    }
    const question = questions?.find((q) => q.uuid === answerRequest.questionId)

    const data = isInvalidYearDropdownAnswer(answerRequest, question)
    if (data) {
      throwErrorYearDropdownOutOfRange(i18nService)
    }
  }
}

export function isInvalidYearDropdownAnswer(
  answerRequest: AnswerRequestDtoItem,
  question: Question,
): boolean {
  if (question?.type === QuestionType.Group) {
    for (const childQuestionAnswer of answerRequest.questions) {
      const childQuestion = question?.subQuestions?.find(
        (sQ) => sQ.uuid === childQuestionAnswer.questionId,
      )
      return isInvalidYearDropdownAnswer(childQuestionAnswer, childQuestion)
    }
  }

  return (
    question?.patientInfoMapCode in StaticPatientInfoMapCodeYearDropdown &&
    answerRequest?.answers?.some((answer) => !previous30Years().includes(Number(answer.value)))
  )
}

export function addQuestionnaireToQuestionIdInPayload(
  payload: AnswerRequestDtoItem[],
  questionnaireToQuestions: QuestionnaireToQuestion[],
): AnswerRequestDtoItem[] {
  if (payload) {
    payload = payload.map((item) => {
      const questionnaireToQuestion = questionnaireToQuestions.find(
        (qtq) => qtq.question.uuid === item.questionId,
      )
      return {
        ...item,
        questionnaireToQuestionId: questionnaireToQuestion?.uuid,
      }
    })
  }

  return payload
}

export function previous30Years(): number[] {
  const years = [getYear(dateTimeUtil.now())]
  while (years.length < 30) {
    years.push(years[years.length - 1] - 1)
  }
  return years
}

export function throwErrorYearDropdownOutOfRange(i18nService: I18nLocalizationService): void {
  StructuredLogger.warn(
    activityLogs.QuestionnaireFunctions.ThrowErrorYearDropdownOutOfRange,
    activityLogs.QuestionnaireActions.YearDropdownOutOfRange,
    {},
  )
  throw new BadRequestValidationException(
    i18nService.translate(
      i18Messages.QUESTIONNAIRE_SUBMIT_AND_GET_NEXT_QUESTION_YEAR_DROPDOWN_DATE_IS_OUT_OF_RANGE,
    ),
  )
}

export function validateQuestionMaximumCount(
  question: Question,
  payloadLength: number,
  i18nService: I18nLocalizationService,
): void {
  if (
    question.repeat &&
    question.maxCountValidation &&
    payloadLength > question.maxCountValidation
  ) {
    throw new BadRequestException(i18nService.translate(i18Messages.QUESTION_MAXIMUM_COUNT_ERROR))
  }
}
