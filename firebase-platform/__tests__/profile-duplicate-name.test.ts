import {testPubSubEvent} from '@functions-types'
import {handler} from '@firebase-platform/functions/questionnaire-to-profile-info/src/handler'
import {
  PatientDetailSeed,
  PatientSeed,
  QuestionnaireSeed,
  QuestionnaireToQuestionSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {questionnaireIntentWithoutQuestionnaireFixture} from '@libs/common/test/fixtures/questionnaire-intent.fixture'
import {QuestionnaireIntentSeed} from '@seeds/firestore/questionnaire-intent.seed'
import {AuthUserFixture, serviceCategoryFixture} from '@libs/common/test/fixtures'
import {
  QuestionnaireIntent,
} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {QuestionnaireSubmittedSchema} from '@libs/common/model/proto-schemas/questionnare-submitted.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {patientDateOfBirth} from './fixtures/questionnaire.fixture'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {updatePatientDetailAndMedicationAuditTrailData} from './fixtures/audit-trail-data.fixture'

jest.setTimeout(10000)
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

let patientSeed: PatientSeed
let questionnaireSeed: QuestionnaireSeed
let questionnaireToQuestionSeed: QuestionnaireToQuestionSeed
let questionnaireIntentSeed: QuestionnaireIntentSeed
let patientDetailSeed: PatientDetailSeed

const questionnaireUUID = '98b83e1d-a71b-4df7-8c9f-219c740437gg'
const authUserId = 'CF_AuthUserId_dob1'
const authUserId2 = 'CF_AuthUserId_dob2'
const authUserId3 = 'CF_AuthUserId_dob3'

const patientId = 11
const patientId2 = 12
const patientId3 = 13
const questionnaireIntentId = 'questionnaire-intent-fixture-CF_dob2'

const questionnaireFixture: Partial<Questionnaire> = {
  id: 10,
  uuid: questionnaireUUID,
  title: 'questionnaire-fixture',
}

const patientWithDuplicateNameSeedDetailId = 335
const patientWithDuplicateNameSeedData = {
  id: patientId2,
  authUserId: authUserId2,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}

const patientDetailWithDuplicateNameSeedData = {
  id: patientWithDuplicateNameSeedDetailId,
}

const questionnaireIntentFixture: Partial<QuestionnaireIntent> = {
  id: questionnaireIntentId,
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientWithDuplicateNameSeedData.id,
  updatedBy: AuthUserFixture.emailVerified.uid,
  isCompleted: false,
  questions: [],
}

const questionnaireToQuestions = []

const patientSeedDataDetailId = 334
const patientSeedData = {
  id: patientId,
  authUserId: authUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}

const patientDetailSeedData = {
  id: patientSeedDataDetailId,
}

const patientDiffersOnlyDoBSeedDetailId = 336
const patientDiffersOnlyDoBSeedData = {
  id: patientId3,
  authUserId: authUserId3,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
}

const patientDetailDiffersOnlyDoBSeedData = {
  id: patientDiffersOnlyDoBSeedDetailId,
  dateOfBirth: dateTimeUtil.toDate('1970-01-02'),
}

const questionnaire1 = {
  id: questionnaireIntentFixture.questionnaireId,
  uuid: questionnaireUUID,
  title: 'questionnaire-fixture',
}

describe('Firebase Function: patient detail and dob', () => {
  let dataSource: DataSource
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    questionnaireSeed = new QuestionnaireSeed(dataSource)
    questionnaireToQuestionSeed = new QuestionnaireToQuestionSeed(dataSource)
    questionnaireIntentSeed = new QuestionnaireIntentSeed()
    patientDetailSeed = new PatientDetailSeed(dataSource)

    await Promise.all([
      patientSeed.create(patientWithDuplicateNameSeedData),
      patientSeed.create(patientDiffersOnlyDoBSeedData),
      patientSeed.create(patientSeedData),
    ])
    await Promise.all([
      questionnaireIntentSeed.create(questionnaireIntentFixture),
      questionnaireIntentSeed.create(questionnaireIntentWithoutQuestionnaireFixture),
      questionnaireSeed.create(questionnaire1),
      patientDetailSeed.create(patientDetailSeedData),
      patientDetailSeed.create(patientDetailWithDuplicateNameSeedData),
      patientDetailSeed.create(patientDetailDiffersOnlyDoBSeedData),
    ])

    await Promise.all([
      patientSeed.updatePatient(patientWithDuplicateNameSeedData.id, {
        detailId: patientWithDuplicateNameSeedDetailId,
      }),
      patientSeed.updatePatient(patientDiffersOnlyDoBSeedData.id, {
        detailId: patientDiffersOnlyDoBSeedDetailId,
      }),
      patientSeed.updatePatient(patientSeedData.id, {
        detailId: patientSeedDataDetailId,
      }),
    ])

    await Promise.all([questionnaireToQuestionSeed.createArray(questionnaireToQuestions)])
  })

  test('Should check hasDuplicateName field', async () => {
    await questionnaireIntentSeed.create(questionnaireIntentFixture)
    const spyPublishEmrDataChanged = jest.spyOn(PubSubHelpers, 'publishEmrDataChanged')
    const data = {
      questionnaireIntentId: questionnaireIntentFixture.id,
      ...updatePatientDetailAndMedicationAuditTrailData,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    const result = await handler(message)

    const patient = await patientSeed.findOneWithDetailById(patientSeedData.id)
    const patientWithDuplicateName = await patientSeed.findOneWithDetailById(
      patientWithDuplicateNameSeedData.id,
    )
    const patientDiffersOnlyDoB = await patientSeed.findOneWithDetailById(
      patientDiffersOnlyDoBSeedData.id,
    )

    expect(patient.hasDuplicateName).toBe(true)

    expect(patientWithDuplicateName.hasDuplicateName).toBe(true)
    expect(patientDiffersOnlyDoB.hasDuplicateName).toBe(false)
    expect(result).toBeUndefined()
    expect(spyPublishEmrDataChanged).toBeCalled()
    spyPublishEmrDataChanged.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientSeed.removePatientByAuthUserId(authUserId)
    await patientSeed.removePatientByAuthUserId(authUserId2)
    await patientSeed.removePatientByAuthUserId(authUserId3)
    await Promise.all([
      patientDetailSeed.removePatientDetailByIds([
        patientSeedDataDetailId,
        patientWithDuplicateNameSeedDetailId,
        patientDiffersOnlyDoBSeedDetailId,
      ]),
    ])
    await questionnaireSeed.removeQuestionnaireByUUID(questionnaireUUID)
    await Promise.all([
      questionnaireIntentSeed.deleteById(questionnaireIntentFixture.id),
      questionnaireIntentSeed.deleteById(questionnaireIntentWithoutQuestionnaireFixture.id),
      questionnaireToQuestionSeed.removeByQuestionnaireId(
        questionnaireIntentFixture.questionnaireId,
      ),
    ])
  })
})
