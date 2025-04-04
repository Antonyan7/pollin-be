import {
  QuestionIntent,
  QuestionnaireIntent,
  RevisionStatus,
} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {AnswerOptionsDto, answerOptionsDto} from './questionnaire-answer-options.helper'
import {
  Question,
  Questionnaire,
  QuestionnaireToQuestion,
} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {ApplicationCodeEnum} from '@libs/data-layer/apps/questionnaires/enums/application-code'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {
  QuestionnaireJourneyMilestone,
  QuestionTextAction,
} from '@libs/data-layer/apps/questionnaires/enums/questionnaire-enums'
import {
  Patient,
  PatientAlert,
  PatientQuestionnaire,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientAlertRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {PatientAlertType, UserType} from '@libs/services-common/enums'
import {FindOptionsWhere, In} from 'typeorm'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {PatientQuestionnaireIntakeStatus} from '@libs/data-layer/apps/users/enum'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {BadRequest200Exception} from '@libs/services-common/exceptions'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {QuestionsWithSequenceDto} from '@apps/emr/intake-form/dto/intake-form-request.dto'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const checkQuestionInQuestionIntent = (
  question: QuestionIntent,
  questionIdToFind: number,
): boolean =>
  question?.questionId === questionIdToFind ||
  (question?.questions?.length &&
    question.questions.some((question) =>
      checkQuestionInQuestionIntent(question, questionIdToFind),
    ))

export function filterQuestionsWithSequence(
  questionnaireToQuestions: QuestionnaireToQuestion[],
  isFilteredDisplayType = false,
): Question[] {
  const filteredQuestions = questionnaireToQuestions
    .filter((qTq) => qTq.sequence)
    .map((qTq) => qTq.question)

  const result = filteredQuestions.filter(
    (question) => question.type !== QuestionType.Display || !isFilteredDisplayType,
  )

  return result
}

export function buildQuestionsWithSequence(payload: {
  questionnaireToQuestions: QuestionnaireToQuestion[]
  isFilteredDisplayType: boolean
  removedQuestions?: Question[]
  questionIdsWithRevisionStatus: QuestionIntent[]
}): QuestionsWithSequenceDto[] {
  const {
    questionnaireToQuestions,
    isFilteredDisplayType,
    removedQuestions,
    questionIdsWithRevisionStatus,
  } = payload

  const removedQuestionsIntent = questionIdsWithRevisionStatus.filter(
    (item) => item.revisionStatus === RevisionStatus.Removed,
  )

  const result: QuestionsWithSequenceDto[] = []
  questionnaireToQuestions
    .filter((qTq) => qTq.sequence)
    .forEach((qTq) => {
      result.push({
        sequence: qTq.sequencePortal,
        questionnaireToQuestionId: qTq.uuid,
        questionDb: qTq.question,
        intentQuestion: null,
        revisionStatus: null,
      })
    })

  removedQuestionsIntent.forEach((intent) => {
    const questionDbForRemoved = removedQuestions.find(
      (removedQuestion) => removedQuestion.id === intent.questionId,
    )

    if (questionDbForRemoved) {
      result.push({
        questionDb: questionDbForRemoved,
        intentQuestion: intent,
        sequence: intent.sequence,
        questionnaireToQuestionId: intent.questionnaireToQuestionId,
        revisionStatus: RevisionStatus.Removed,
      })
    }
  })

  return result
    .sort((a, b) => a.sequence - b.sequence)
    .filter(
      (question) => question.questionDb.type !== QuestionType.Display || !isFilteredDisplayType,
    )
}

export function nextQuestionDto(data: {
  question: Question
  questionnaireIntent?: QuestionnaireIntent
  questionnaireToQuestionId?: string
  prevPrimaryPatientAnswers?: string[]
  patientQuestionnaire?: PatientQuestionnaire
}): NextQuestionDto {
  const {
    question,
    patientQuestionnaire,
    prevPrimaryPatientAnswers,
    questionnaireIntent,
    questionnaireToQuestionId,
  } = data
  const nextQuestion = new NextQuestionDto()
  nextQuestion.id = question.uuid
  nextQuestion.type = question.type
  //just for Display type replace text with textDescription which have html tags
  nextQuestion.text = getQuestionText(question)
  nextQuestion.subText = question.subText
  nextQuestion.placeholder = question.placeholder
  nextQuestion.imageURL = question.imageURL
  nextQuestion.imageURL = question.imageURL
  nextQuestion.repeat = question.repeat
  nextQuestion.required = question.required
  nextQuestion.questionnaireToQuestionId = questionnaireToQuestionId ?? null
  nextQuestion.validation = questionValidationDto(question)
  nextQuestion.answerOptions = answerOptionsDto(question, prevPrimaryPatientAnswers)
  nextQuestion.textAction = patientQuestionnaire ? QuestionTextAction.ReferToConsent : null

  if (question.subQuestions?.length) {
    nextQuestion.questions = question.subQuestions.map((subQuestion) =>
      nextQuestionDto({
        question: subQuestion,
        questionnaireIntent,
        questionnaireToQuestionId: null,
        prevPrimaryPatientAnswers,
      }),
    )
  }

  return nextQuestion
}

function getQuestionText(question: Question): string {
  if (question.type === QuestionType.Display && question.textHtml) {
    return question.textHtml
  }

  return question.text
}

export const questionValidationDto = (question: Question): QuestionValidationDto | null => {
  const hasNoValidation =
    !question.regexForValidation &&
    !question.errorMessageForValidation &&
    !question.maxLengthValidation &&
    !question.maxCountValidation &&
    question.applicationCode?.code != ApplicationCodeEnum.MaxDateToday &&
    question.applicationCode?.code != ApplicationCodeEnum.MaxDateYesterday

  if (hasNoValidation) {
    return null
  }

  return {
    regex: question.regexForValidation,
    maxLength: question.maxLengthValidation,
    errorMessage: question.errorMessageForValidation,
    maxCount: question.maxCountValidation,
    maxDateTime: questionMaxDateValidation(question),
  }
}

export function questionMaxDateValidation(question: Question): Date {
  if (question.applicationCode?.code === ApplicationCodeEnum.MaxDateToday) {
    return dateTimeUtil.now()
  }

  if (question.applicationCode?.code === ApplicationCodeEnum.MaxDateYesterday) {
    //Yesterday 23:59
    return dateTimeUtil.addMinutes(dateTimeUtil.todayWithZeroTimeTZ(), -1)
  }

  return null
}
export class NextQuestionDto {
  id: string
  type: QuestionType
  text?: string
  subText?: string
  placeholder?: string
  imageURL?: string
  validation?: QuestionValidationDto
  repeat?: boolean
  required?: boolean
  questions?: NextQuestionDto[]
  answerOptions?: AnswerOptionsDto[]
  questionnaireToQuestionId?: string
  textAction?: QuestionTextAction
}

export class QuestionValidationDto {
  maxLength?: number
  maxCount: number
  regex?: string
  errorMessage?: string
  maxDateTime?: Date
  minDateTime?: string
}

export const QuestionnaireJourneyMilestonesForPatientOrPartnerIntake: QuestionnaireJourneyMilestone[] =
  [
    QuestionnaireJourneyMilestone.PatientIntakeMale,
    QuestionnaireJourneyMilestone.PatientIntakeFemale,
  ]

export const isQuestionnairePatientOrPartnerIntakeByJourney = (
  questionnaire: Questionnaire,
): boolean => {
  return QuestionnaireJourneyMilestonesForPatientOrPartnerIntake.includes(
    questionnaire.journeyMilestone,
  )
}

export const validatePatientJourneyForPatientIntake = (
  questionnaire: Questionnaire,
  patient: Patient,
  i18nService: I18nLocalizationService,
): void => {
  const isPatientIntake = isQuestionnairePatientOrPartnerIntakeByJourney(questionnaire)
  const isPatientOnIntakeFlow = ![
    PatientQuestionnaireIntakeStatus.NotStartedByPatient,
    PatientQuestionnaireIntakeStatus.PendingCompletionByPatient,
  ].includes(patient?.patientIntakeStatus)

  if (isPatientIntake && isPatientOnIntakeFlow) {
    throw new BadRequest200Exception(
      i18nService.translate(i18Messages.PATIENT_INTAKE_IS_NO_LONGER_EDITABLE),
      ResponseStatusCodes.TerminateFlow,
    )
  }
}

export const updatePatientAlertsOnQuestionnaireCompletion = async (
  patient: Patient,
  patientAlertRepository: PatientAlertRepository,
  questionnaireWithRelations?: Questionnaire,
): Promise<void> => {
  const where: FindOptionsWhere<PatientAlert> = {
    patientId: patient.id,
    type: PatientAlertType.Questionnaire,
  }
  if (questionnaireWithRelations) {
    where.questionnaireId = questionnaireWithRelations.id
  } else {
    where.questionnaire = {
      journeyMilestone: In(QuestionnaireJourneyMilestonesForPatientOrPartnerIntake),
    }
  }

  StructuredLogger.info(
    activityLogs.QuestionnaireFunctions.SubmitAndGetNextQuestion,
    activityLogs.QuestionnaireActions.UpdatePatientAlertsOnQuestionnaireCompletion,
    {message: JSON.stringify(where)},
  )
  const alerts = await patientAlertRepository.find({where, select: {id: true}})
  if (alerts.length) {
    await patientAlertRepository.delete(alerts.map((a) => a.id))
  }

  if (
    !questionnaireWithRelations ||
    isQuestionnairePatientOrPartnerIntakeByJourney(questionnaireWithRelations)
  ) {
    await updateAlertsOnPatientIntakeCompletion(patient, patientAlertRepository)
  }
}

export const updateAlertsOnPatientIntakeCompletion = async (
  patient: Patient,
  patientAlertRepository: PatientAlertRepository,
): Promise<void> => {
  if (patient.userType !== UserType.Partner) {
    await patientAlertRepository.save({
      patientId: patient.id,
      type: PatientAlertType.InvitePartners,
    })
  }

  await patientAlertRepository.save({
    patientId: patient.id,
    type: PatientAlertType.UploadPhoto,
  })
}
