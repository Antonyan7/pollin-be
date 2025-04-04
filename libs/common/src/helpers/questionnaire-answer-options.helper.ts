import {IsString} from 'class-validator'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {Question} from '@libs/data-layer/apps/questionnaires/entities/typeorm/question.entity'
import {
  BooleanAnswers,
  PatientBirthOutcomeAnswersEnum,
  PatientCyclesAnswersEnum,
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
  PatientTreatmentTypeAnswersEnum,
  PatientTypeAnswers,
  StaticPatientInfoMapCode,
  YearDropdownAnswersEnum,
} from '@libs/services-common/enums/patient.enum'
import {staticAnswerOptions} from '@libs/services-common/enums/static-answer-options.enum'
import {
  AbnormalPAPProceduresAnswersEnum,
  SemenAnalysisAnswers,
} from '@libs/services-common/enums/test-result.enum'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {PatientInfoMapCode} from '@libs/services-common/enums'
import {
  Questionnaire,
  QuestionnaireToQuestion,
} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {
  QuestionIntent,
  QuestionnaireIntent,
  RevisionStatus,
} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {
  AnswerDto,
  AnswerRequestDtoItem,
} from '@apps/emr/questionnaire/dto/next-question-request.dto'
import {AddedProfileData} from '@apps/emr/questionnaire/helpers/get-prev-question.helper'
import {
  validateAnswer,
  validateGroupHasAnyAnsweredChildQuestion,
} from './questionnaire-answer-validation.helper'
import {BadRequestException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {StructuredLogger} from '@libs/common'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {QuestionAnswerRequestDto} from '@apps/emr/intake-form/dto/intake-form-request.dto'
import {PatientQuestionnaireToQuestion} from '@libs/data-layer/apps/users/entities/typeorm'

export class AnswerOptionsDto {
  /**
   * @example 1114b067-a8ff-4edd-a5s2-9fffbdd2test
   */
  @IsString()
  id: string

  /**
   * @example Yes
   */
  @IsString()
  display: string

  label?: string
}

export const answerOptionsDto = (
  question: Question,
  prevPrimaryPatientAnswers?: string[],
): AnswerOptionsDto[] => {
  const isRelevantType = [
    QuestionType.Choice,
    QuestionType.MultipleChoice,
    QuestionType.Dropdown,
  ].includes(question.type)

  if (isRelevantType) {
    const answerOptionsResult = answerOptions(question)

    return answerOptionsResult.map((item) => ({
      ...item,
      label: getLabelIfPrimarySelectedThisOptionBefore(item.id, prevPrimaryPatientAnswers),
    }))
  }

  return null
}
// eslint-disable-next-line max-lines-per-function
function answerOptions(question: Question): AnswerOptionsDto[] {
  switch (question.patientInfoMapCode) {
    case PatientInfoMapCode.Race:
      return staticAnswerOptions[StaticPatientInfoMapCode.Race]

    case PatientInfoMapCode.ContributionFemale:
      return staticAnswerOptions[StaticPatientInfoMapCode.ContributionFemale]

    case PatientInfoMapCode.ContributionMale:
      return staticAnswerOptions[StaticPatientInfoMapCode.ContributionMale]

    case PatientInfoMapCode.Gender:
      return staticAnswerOptions[StaticPatientInfoMapCode.Gender]

    case PatientInfoMapCode.PreferredPronouns:
      return staticAnswerOptions[StaticPatientInfoMapCode.PreferredPronouns]

    case PatientInfoMapCode.SexualOrientation:
      return staticAnswerOptions[StaticPatientInfoMapCode.SexualOrientation]

    case PatientInfoMapCode.CurrentStressLevel:
      return staticAnswerOptions[StaticPatientInfoMapCode.CurrentStressLevel]

    case PatientInfoMapCode.MonthsTryingToGetPregnant:
      return staticAnswerOptions[StaticPatientInfoMapCode.MonthsTryingToGetPregnant]

    case PatientInfoMapCode.NumberOfPregnancies:
      return staticAnswerOptions[StaticPatientInfoMapCode.NumberOfPregnancies]

    case PatientInfoMapCode.LatexAllergy:
    case PatientInfoMapCode.IodineAllergy:
    case PatientInfoMapCode.ProblemWithAnesthetics:
    case PatientInfoMapCode.SmokeCigarettes:
    case PatientInfoMapCode.UseMarijuana:
    case PatientInfoMapCode.DrinkAlcohol:
    case PatientInfoMapCode.RecreationalDrugs:
    case PatientInfoMapCode.ExerciseRegularly:
    case PatientInfoMapCode.UsingAppToTrackOvulation:
    case PatientInfoMapCode.UsingOvulationKits:
    case PatientInfoMapCode.UsingLubricants:
    case PatientInfoMapCode.SeenFertilitySpecialist:
    case PatientInfoMapCode.HaveBeenReferredByPhysician:
    case PatientInfoMapCode.PrescriptionMedication:
    case PatientInfoMapCode.DrugAllergiesChoice:
    case PatientInfoMapCode.FoodAllergiesChoice:
    case PatientInfoMapCode.FamilyMemberWithHealthProblem:
    case PatientInfoMapCode.SeeCounsellorForStress:
    case PatientInfoMapCode.HasPeriod:
    case PatientInfoMapCode.TryingForPregnancy:
    case PatientInfoMapCode.PreviousPapTest:
    case PatientInfoMapCode.AbnormalPap:
    case PatientInfoMapCode.HaveBiologicalChildren:
    case PatientInfoMapCode.HaveBiologicalChildrenWithCurrentPartner:
    case PatientInfoMapCode.HadSemenAnalysis:
    case PatientInfoMapCode.Vasectomy:
    case PatientInfoMapCode.VasectomyReversal:
    case PatientInfoMapCode.ErectionDifficulties:
    case PatientInfoMapCode.HasProceduresDueAbnormalPAP:
    case PatientInfoMapCode.HasOhipCard:
      return staticAnswerOptions[BooleanAnswers.PatientBooleanAnswers]

    case PatientInfoMapCode.EctopicPregnanciesYear:
    case PatientInfoMapCode.FullTimeDeliveryYear:
    case PatientInfoMapCode.PreTermDeliveryYear:
    case PatientInfoMapCode.MiscarriageYear:
    case PatientInfoMapCode.AbortionYear:
      return staticAnswerOptions[YearDropdownAnswersEnum.PatientYearDropdownAnswers]

    case PatientInfoMapCode.EctopicPregnanciesType:
      return staticAnswerOptions[PatientTypeAnswers.PatientTypeAnswers]

    case PatientInfoMapCode.FullTimeDeliveryTypeOfBirth:
    case PatientInfoMapCode.PreTermDeliveryTypeOfBirth:
      return staticAnswerOptions[
        PatientPreTermAndFullTermTypeAnswersEnum.PatientPreTermAndFullTermTypeAnswers
      ]

    case PatientInfoMapCode.MiscarriageType:
      return staticAnswerOptions[PatientMiscarriageTypeAnswersEnum.PatientMiscarriageTypeAnswers]

    case PatientInfoMapCode.EctopicPregnanciesMonthsToConceive:
    case PatientInfoMapCode.FullTimeDeliveryMonthsToConceive:
    case PatientInfoMapCode.PreTermDeliveryMonthsToConceive:
    case PatientInfoMapCode.MiscarriageMonthsToConceive:
      return staticAnswerOptions[PatientMonthsToConceiveAnswersEnum.PatientMonthsToConceiveAnswers]

    case PatientInfoMapCode.EctopicPregnanciesLocation:
      return staticAnswerOptions[PatientLocationAnswersEnum.PatientLocationAnswers]

    case PatientInfoMapCode.FullTimeDeliveryBirthOutcome:
    case PatientInfoMapCode.PreTermDeliveryBirthOutcome:
      return staticAnswerOptions[PatientBirthOutcomeAnswersEnum.PatientBirthOutcomeAnswers]
    case PatientInfoMapCode.TreatmentCycles:
      return staticAnswerOptions[PatientCyclesAnswersEnum.PatientCyclesAnswers]
    case PatientInfoMapCode.TreatmentType:
      return staticAnswerOptions[PatientTreatmentTypeAnswersEnum.PatientTreatmentTypeAnswers]
    case PatientInfoMapCode.MenstrualFlow:
      return staticAnswerOptions[PatientMenstrualFlowAnswersEnum.PatientMenstrualFlowAnswers]
    case PatientInfoMapCode.DaysOfBleeding:
      return staticAnswerOptions[PatientDaysOfBleedingAnswersEnum.PatientDaysOfBleedingAnswers]
    case PatientInfoMapCode.MenstrualPain:
      return staticAnswerOptions[PatientMenstrualPainAnswersEnum.PatientMenstrualPainAnswers]
    case PatientInfoMapCode.FamilyMemberRelatedToProblem:
      return staticAnswerOptions[
        PatientFamilyMemberRelatedToProblemAnswersEnum.PatientFamilyMemberRelatedToProblemAnswers
      ]
    case PatientInfoMapCode.GynaecologicalConditions:
      return staticAnswerOptions[
        PatientGynaecologicalConditionsAnswersEnum.PatientGynaecologicalConditionsAnswers
      ]
    case PatientInfoMapCode.SemenAnalysisIsNormal:
      return staticAnswerOptions[SemenAnalysisAnswers.SemenAnalysisIsNormal]
    case PatientInfoMapCode.DiagnosedConditions:
      return staticAnswerOptions[
        PatientDiagnosedConditionsAnswersEnum.PatientDiagnosedConditionsAnswers
      ]
    case PatientInfoMapCode.AbnormalPapProcedures:
      return staticAnswerOptions[AbnormalPAPProceduresAnswersEnum.AbnormalPAPProceduresAnswers]

    default:
      let answerOptions = question.answerOptions

      if (question.answerOptions.some((answerOption) => answerOption.sequence)) {
        answerOptions = answerOptions.sort(
          (a, b) => (a.sequence ?? answerOptions.length) - (b.sequence ?? answerOptions.length),
        )
      }

      return answerOptions.map((option) => ({
        id: option.uuid,
        display: option.display,
      }))
  }
}

export function getAnsweredQuestionAndValidate({
  questionnaireWithRelations,
  questionAnswer,
  finalize,
  payload,
  i18nService,
  questionsWithRemovedRevisionStatus,
}: {
  questionnaireWithRelations: Questionnaire
  questionAnswer: QuestionAnswerRequestDto
  finalize: boolean
  payload: AnswerRequestDtoItem[]
  i18nService: I18nLocalizationService
  questionsWithRemovedRevisionStatus: Question[]
}): Question {
  const questionnaireWithAnsweredQuestion =
    questionnaireWithRelations.questionnaireToQuestions.find(
      (questionForIntent) => questionForIntent.question.uuid === questionAnswer.questionId,
    )
  const answeredQuestion = questionnaireWithAnsweredQuestion?.question
  const removedQuestion = questionsWithRemovedRevisionStatus.find(
    (item) => item.uuid === questionAnswer.questionId,
  )
  if (!answeredQuestion && !removedQuestion) {
    StructuredLogger.error(
      activityLogs.QuestionnaireFunctions.GetAnsweredQuestionAndValidate,
      activityLogs.QuestionnaireActions.QuestionForAnswerNotFound,
      {
        questionsUUIDs: payload?.map(({questionId}) => questionId),
        errMsg: `questionAnswer.questionId: ${questionAnswer?.questionId}}`,
      },
    )
    throw new BadRequestException(i18nService.translate(i18Messages.QUESTION_NOT_FOUND))
  }
  if (finalize) {
    validateAnswer(payload, questionnaireWithRelations.questionnaireToQuestions, finalize)
  }

  return answeredQuestion || removedQuestion
}
/** Calculate answers with push them into QuestionnaireIntent */
export function saveIntentAnswers(data: {
  questionnaireToQuestions: (QuestionnaireToQuestion | PatientQuestionnaireToQuestion)[]
  answeredQuestion: Question
  questionnaireIntent: QuestionnaireIntent
  payload?: QuestionAnswerRequestDto[]
  finalize?: boolean
  questionIdsWithRevisionStatus?: QuestionIntent[]
}): {intent: QuestionIntent[]; addedProfileData: AddedProfileData} {
  const {
    questionnaireToQuestions,
    answeredQuestion,
    questionnaireIntent,
    payload,
    finalize,
    questionIdsWithRevisionStatus,
  } = data
  const addedProfileData: AddedProfileData = {}

  if (!payload?.length) {
    return {intent: [], addedProfileData}
  }

  const questionIntents: QuestionIntent[] = []

  const isQuestionGroup = answeredQuestion.type === QuestionType.Group
  if (isQuestionGroup && finalize) {
    validateGroupHasAnyAnsweredChildQuestion(payload)
  }

  payload.forEach((answerItem) => {
    const questionnaireToQuestion = questionnaireToQuestions.find(
      (item) => item.question.uuid === answerItem.questionId,
    )

    const sequence =
      questionnaireToQuestion instanceof QuestionnaireToQuestion
        ? questionnaireToQuestion?.sequencePortal
        : questionnaireToQuestion?.sequence

    // Handle scenario when answers are for group
    if (answerItem.revisionStatus === RevisionStatus.Removed) {
      handleAnswerGroup(questionIntents, answeredQuestion, questionIdsWithRevisionStatus)
    } else if (answerItem?.questions?.length) {
      const answersForGroup = answerItem.questions.map(({questionId, answers, note}) => {
        const currentQuestion = getAnsweredCurrentQuestion(questionnaireToQuestions, questionId)

        processPatientInfoMapCode(addedProfileData, currentQuestion, answers)
        if (!answers && currentQuestion.required === false) {
          return {
            parentQuestionId: answeredQuestion.id,
            questionId: currentQuestion.id,
            answerType: currentQuestion.type,
            answers: [],
            applicationCode: currentQuestion?.applicationCode?.code ?? null,
            note: note ?? null,
            questionnaireToQuestionId: answerItem.questionnaireToQuestionId ?? null,
          }
        }
        return {
          parentQuestionId: answeredQuestion.id,
          questionId: currentQuestion.id,
          answerType: currentQuestion.type,
          answers: answers.map((answer) => answer.value),
          applicationCode: currentQuestion?.applicationCode?.code ?? null,
          note: note ?? null,
          questionnaireToQuestionId: answerItem.questionnaireToQuestionId ?? null,
        }
      })

      questionIntents.push({
        questionId: answeredQuestion.id,
        answerType: answeredQuestion.type,
        applicationCode: answeredQuestion?.applicationCode?.code ?? null,
        answers: [],
        questions: answersForGroup,
        note: answerItem.note ?? null,
        revisionStatus: answerItem.revisionStatus ?? null,
        sequence,
        questionnaireToQuestionId: answerItem.questionnaireToQuestionId ?? null,
      })
    } else if (!answerItem.answers && answeredQuestion.required === false) {
      questionIntents.push({
        questionId: answeredQuestion.id,
        answerType: answeredQuestion.type,
        answers: [],
        applicationCode: answeredQuestion?.applicationCode?.code ?? null,
        note: answerItem.note ?? null,
        revisionStatus: answerItem.revisionStatus ?? null,
        sequence,
        questionnaireToQuestionId: answerItem.questionnaireToQuestionId ?? null,
      })
    } else {
      questionIntents.push({
        questionId: answeredQuestion.id,
        answerType: answeredQuestion.type,
        answers: answerItem.answers.map((answer) => answer.value),
        applicationCode: answeredQuestion?.applicationCode?.code ?? null,
        note: answerItem.note ?? null,
        revisionStatus: answerItem.revisionStatus ?? null,
        sequence,
        questionnaireToQuestionId: answerItem.questionnaireToQuestionId ?? null,
      })
    }
  })
  questionnaireIntent.questions.push(...questionIntents)
  return {intent: questionIntents, addedProfileData}
}

/** get currentQuestion: it could be simple, or parentOfGroup or child */
export function getAnsweredCurrentQuestion(
  questionnaireToQuestions: (QuestionnaireToQuestion | PatientQuestionnaireToQuestion)[],
  questionId: string,
): Question {
  let question: Question
  questionnaireToQuestions.forEach((questionToQuestionnaireParentOrChild) => {
    if (questionToQuestionnaireParentOrChild.question.uuid === questionId) {
      question = questionToQuestionnaireParentOrChild.question
      return
    }

    questionToQuestionnaireParentOrChild.question.subQuestions.forEach(
      (questionToQuestionnaire_childQ) => {
        if (questionToQuestionnaire_childQ.uuid === questionId) {
          question = questionToQuestionnaire_childQ
          return
        }
      },
    )
  })
  return question
}

export function processPatientInfoMapCode(
  profileData: AddedProfileData,
  question: Question,
  answers: AnswerDto[],
): AddedProfileData {
  switch (question?.patientInfoMapCode) {
    case PatientInfoMapCode.OhipCardNumber:
      const answerValue = answers?.[0]?.value
      profileData.ohip = {
        ...profileData?.ohip,
        number: answerValue ? String(answerValue) : null,
      }
      return profileData

    case PatientInfoMapCode.OhipCardVersionCode:
      profileData.ohip = {
        ...profileData?.ohip,
        versionCode: answers?.length && answers[0]?.value ? String(answers[0].value) : '',
      }
      return profileData

    default:
      return profileData
  }
}

export function handleAnswerGroup(
  questionIntents: QuestionIntent[],
  answeredQuestion: Question,
  questionIdsWithRevisionStatus?: QuestionIntent[],
): void {
  if (questionIdsWithRevisionStatus?.length) {
    const questionRevisionStatus = questionIdsWithRevisionStatus.find(
      (item) => item.questionId === answeredQuestion.id,
    )
    questionIntents.push(questionRevisionStatus)
    // Find the index of the found item
    const indexToDelete = questionIdsWithRevisionStatus.findIndex(
      (item) => item.questionId === answeredQuestion.id,
    )

    if (indexToDelete !== -1) {
      // Delete the item from the array
      questionIdsWithRevisionStatus.splice(indexToDelete, 1)
    }
  }
}

function getLabelIfPrimarySelectedThisOptionBefore(
  answerOptionItemId: string,
  prevPrimaryPatientAnswers: string[],
): string | null {
  if (!prevPrimaryPatientAnswers?.length) {
    return null
  }

  const primarySelectedThisOption = prevPrimaryPatientAnswers.find(
    (answer) => answer === answerOptionItemId,
  )
  if (primarySelectedThisOption) {
    return `Your partner's answer`
  }

  return null
}
