import {addOrRemoveQuestionHandler} from '@firebase-platform/functions/questionnaire-question/src/handlers/questionnaire-question'
import {testPubSubEvent} from '@functions-types'
import {RevisionStatus} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AddOrRemoveQuestionSchema} from '@libs/common/model/proto-schemas/questionnaire-question.schema'
import {QuestionnaireIntentSeed} from '@seeds/firestore/questionnaire-intent.seed'
import {QuestionnaireIntent} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {AuthUserFixture, serviceCategoryFixture, uuidSuffix} from '@libs/common/test/fixtures'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {QuestionInputSeed} from '@seeds/typeorm'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {PatientInfoMapCode} from '@libs/services-common/enums'
import {QuestionnaireSeed, QuestionnaireToQuestionSeed, QuestionSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {PatientSeed} from '@seeds/typeorm'

jest.setTimeout(15000)
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')
jest.mock('../../../libs/common/src/adapters/push-notification.adapter.ts')

const questionnaireIntentId = 'questionnaire-intent-fixture-CF-test'
const questionnaireUUID = '7944da2f-a100-4406-8d9f-84c9a7a13c1d'
const questionId = 167
const secondQuestionId = 168
const thirdQuestionId = 169

const questionnaireFixture: Partial<Questionnaire> = {
  id: 167,
  uuid: questionnaireUUID,
  title: 'questionnaire-fixture',
}
const questionFixture: QuestionInputSeed = {
  id: questionId,
  uuid: questionId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.CurrentStressLevel,
}

const secondQuestionFixture: QuestionInputSeed = {
  id: secondQuestionId,
  uuid: secondQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SeeCounsellorForStress,
}
const patientData = {
  id: 5557777,
  uuid: 'f086dd0b-5dca-45b9-97f1-8a57d5485755',
  authUserId: 'authUserId',
}
const thirdQuestionFixture: QuestionInputSeed = {
  id: thirdQuestionId,
  uuid: thirdQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SeeCounsellorForStress,
}

const questionnaireIntentFixture: Partial<QuestionnaireIntent> = {
  id: questionnaireIntentId,
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientData.id,
  updatedBy: AuthUserFixture.emailVerified.uid,
  isCompleted: false,
  questions: [
    {
      questionId: secondQuestionId,
      answerType: QuestionType.String,
      answers: ['Yes'],
    },
    {
      questionId: thirdQuestionId,
      answerType: QuestionType.String,
      answers: ['Smth'],
      questionnaireToQuestionId: 'e1adc799-86e9-4dbc-84a8-ca0f17892c50',
    },
  ],
  questionIdsToAsk: [secondQuestionId, thirdQuestionId],
  currentQuestionId: thirdQuestionId,
}

const questionnaireToQuestions: Partial<QuestionnaireToQuestion>[] = [
  {
    questionId: questionId,
    questionnaireId: questionnaireFixture.id,
    sequence: 1,
    sequencePortal: 1,
    uuid: 'a6f4c924-6d3b-429a-a05c-b6f4f8ca32c5',
    id: 1,
  },
  {
    questionId: secondQuestionId,
    questionnaireId: questionnaireFixture.id,
    sequence: 2,
    sequencePortal: 2,
    uuid: 'edeba835-0f46-4cf8-9943-60df052c7839',
    id: 2,
  },
  {
    questionId: thirdQuestionId,
    questionnaireId: questionnaireFixture.id,
    sequence: 3,
    sequencePortal: 3,
    uuid: 'e1adc799-86e9-4dbc-84a8-ca0f17892c50',
    id: 3,
  },
]

let questionnaireIntentSeed: QuestionnaireIntentSeed
let questionnaireSeed: QuestionnaireSeed
let questionnaireToQuestionSeed: QuestionnaireToQuestionSeed
let questionSeed: QuestionSeed
let dataSource: DataSource
let patientSeed: PatientSeed

describe('QuestionnaireIntent', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    questionnaireIntentSeed = new QuestionnaireIntentSeed()
    questionnaireSeed = new QuestionnaireSeed(dataSource)
    questionnaireToQuestionSeed = new QuestionnaireToQuestionSeed(dataSource)
    questionSeed = new QuestionSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)

    await patientSeed.create(patientData)
    await questionnaireSeed.create(questionnaireFixture)
    await questionSeed.createArray([questionFixture, secondQuestionFixture, thirdQuestionFixture])
    await questionnaireToQuestionSeed.createArray(questionnaireToQuestions)
    await questionnaireIntentSeed.create(questionnaireIntentFixture)
  })

  it('should add and remove Question in QuestionnaireIntent', async () => {
    const intentBeforeUpdate = await questionnaireIntentSeed.getById(questionnaireIntentFixture.id)
    expect(intentBeforeUpdate.questionIdsToAsk.length).toEqual(2) // [ 168, 169 ]
    const data = {
      questionnaireID: questionnaireFixture.id,
      questionId: questionId,
      action: RevisionStatus.Added,
      questionnaireToQuestionId: questionnaireToQuestions[0].id,
    }

    const messages = testPubSubEvent(encodePubSubMessage(data, AddOrRemoveQuestionSchema))

    await addOrRemoveQuestionHandler(messages)
    const intent = await questionnaireIntentSeed.getById(questionnaireIntentFixture.id)
    const question = intent.questions.find((item) => item.questionId === questionId)
    expect(intent.questionIdsToAsk[0]).toEqual(questionId) // [ 167, 168, 169 ]
    expect(question).toMatchObject({
      questionId,
      answers: [],
      answerType: questionFixture.type,
      revisionStatus: RevisionStatus.Added,
    })
    const dataRemove = {
      questionnaireID: questionnaireFixture.id,
      questionId: questionId,
      action: RevisionStatus.Removed,
      questionnaireToQuestionId: questionnaireToQuestions[0].id,
    }

    const messageRemove = testPubSubEvent(
      encodePubSubMessage(dataRemove, AddOrRemoveQuestionSchema),
    )
    await questionnaireToQuestionSeed.softDelete(questionId, questionnaireFixture.id)

    await addOrRemoveQuestionHandler(messageRemove)
    const intentAfterRemove = await questionnaireIntentSeed.getById(questionnaireIntentFixture.id)
    expect(intentAfterRemove.questionIdsToAsk.includes(questionId)).toBeFalsy()
  })

  it('should remove Question in QuestionnaireIntent', async () => {
    const data = {
      questionnaireID: questionnaireFixture.id,
      questionId: questionId,
      action: RevisionStatus.Removed,
      questionnaireToQuestionId: questionnaireToQuestions[0].id,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AddOrRemoveQuestionSchema))

    await addOrRemoveQuestionHandler(message)
    const intent = await questionnaireIntentSeed.getById(questionnaireIntentFixture.id)
    const question = intent.questions.find((item) => item.questionId === questionId)
    expect(intent.questionIdsToAsk.includes(questionId)).toBeFalsy()
    expect(question.revisionStatus).toEqual(RevisionStatus.Removed)
    expect(question.sequence).toEqual(questionnaireToQuestions[0].sequence)
  })

  it('should remove CurrentQuestion in QuestionnaireIntent', async () => {
    const data = {
      questionnaireID: questionnaireFixture.id,
      questionId: thirdQuestionId,
      action: RevisionStatus.Removed,
      questionnaireToQuestionId: questionnaireToQuestions[2].id,
    }

    await questionnaireToQuestionSeed.softDelete(thirdQuestionId, questionnaireFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, AddOrRemoveQuestionSchema))

    await addOrRemoveQuestionHandler(message)
    const intent = await questionnaireIntentSeed.getById(questionnaireIntentFixture.id)
    const question = intent.questions.find((item) => item.questionId === thirdQuestionId)
    expect(intent.questionIdsToAsk.includes(thirdQuestionId)).toBeFalsy()
    expect(intent.currentQuestionId).toEqual(secondQuestionId)
    expect(question.revisionStatus).toEqual(RevisionStatus.Removed)
  })

  afterAll(async () => {
    await questionnaireSeed.removeQuestionnaireByUUID(questionnaireUUID)
    await questionSeed.removeByIds([questionFixture.id, secondQuestionId, thirdQuestionId])
    await questionnaireIntentSeed.deleteById(questionnaireIntentFixture.id)
    await questionnaireToQuestionSeed.removeByQuestionnaireId(
      questionnaireIntentFixture.questionnaireId,
    )
    await patientSeed.removeByIds([patientData.id])
    jest.clearAllMocks()
  })
})
