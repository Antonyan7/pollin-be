import {testPubSubEvent} from '@functions-types'
import {handler} from '@firebase-platform/functions/questionnaire-to-profile-info/src/handler'
import {
  PatientDetailSeed,
  PatientSeed,
  QuestionInputSeed,
  QuestionnaireSeed,
  QuestionnaireToQuestionSeed,
  QuestionSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {questionnaireIntentWithoutQuestionnaireFixture} from '@libs/common/test/fixtures/questionnaire-intent.fixture'
import {QuestionnaireIntentSeed} from '@seeds/firestore/questionnaire-intent.seed'
import {PatientProfileSeed} from '@seeds/firestore/patient-profile.seed'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {AuthUserFixture, serviceCategoryFixture, uuidSuffix} from '@libs/common/test/fixtures'
import {
  QuestionnaireIntent,
} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {PatientInfoMapCode} from '@libs/services-common/enums'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  Gender,
  PreferredPronouns,
  SexualOrientation,
} from '@libs/services-common/enums/patient.enum'
import {patientDetailFixture} from '@libs/common/test/fixtures/patient-detail.fixture'
import {patientProfileFixture} from './fixtures/patient-profile.fixture'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  QuestionnaireSubmittedPubSubPayload,
  QuestionnaireSubmittedSchema,
} from '@libs/common/model/proto-schemas/questionnare-submitted.schema'
import {patientDateOfBirth} from './fixtures/questionnaire.fixture'
import {createPatientDetailAndMedicationAuditTrailData} from './fixtures/audit-trail-data.fixture'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'

jest.setTimeout(10000)

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
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

let patientSeed: PatientSeed
let questionnaireSeed: QuestionnaireSeed
let questionnaireToQuestionSeed: QuestionnaireToQuestionSeed
let questionnaireIntentSeed: QuestionnaireIntentSeed
let questionSeed: QuestionSeed
let patientDetailSeed: PatientDetailSeed
let patientProfileSeed: PatientProfileSeed

const questionnaireUUID = '98b83e1d-a71b-4df7-8c9f-219c7404378g'
const authUserId = 'CF_AuthUserId_dob4'
const authUserId2 = 'CF_AuthUserId_dob5'
const detailLatexAllergyQuestionId = 36
const detailCurrentStressLevelId = 37
const detailCurrentOccupationId = 38
const detailDateOfBirthId = 39
const detailDrinkAlcoholId = 40
const detailExerciseRegularlyId = 41
const detailHeightInInchesId = 42
const detailProblemWithAnestheticsId = 43
const detailPreferredPronounsId = 44
const detailGenderId = 45
const detailSexualOrientationId = 46
const detailRecreationalDrugsId = 47
const detailSeeCounsellorForStressId = 48
const detailSmokeCigarettesId = 49
const detailUseMarijuanaId = 50
const detailWeightInLbsId = 51

const patientId = patientDetailFixture.id
const questionnaireIntentId = 'questionnaire-intent-fixture-CF_dob'

const questionnaireFixture: Partial<Questionnaire> = {
  id: 114,
  uuid: questionnaireUUID,
  title: 'questionnaire-fixture',
}
const questionDetailLatexAllergy: QuestionInputSeed = {
  id: detailLatexAllergyQuestionId,
  uuid: detailLatexAllergyQuestionId + uuidSuffix,
  repeat: false,
  type: QuestionType.String,
}

const questionDetailCurrentStressLevel: QuestionInputSeed = {
  id: detailCurrentStressLevelId,
  uuid: detailCurrentStressLevelId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.CurrentStressLevel,
}

const questionDetailCurrentOccupation: QuestionInputSeed = {
  id: detailCurrentOccupationId,
  uuid: detailCurrentOccupationId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.CurrentOccupation,
}

const questionDetailDateOfBirth: QuestionInputSeed = {
  id: detailDateOfBirthId,
  uuid: detailDateOfBirthId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.DateOfBirth,
}

const questionDetailDrinkAlcohol: QuestionInputSeed = {
  id: detailDrinkAlcoholId,
  uuid: detailDrinkAlcoholId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.DrinkAlcohol,
}

const questionDetailExerciseRegularly: QuestionInputSeed = {
  id: detailExerciseRegularlyId,
  uuid: detailExerciseRegularlyId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.ExerciseRegularly,
}

const questionDetailHeightInInches: QuestionInputSeed = {
  id: detailHeightInInchesId,
  uuid: detailHeightInInchesId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.HeightInches,
}

const questionDetailProblemWithAnesthetics: QuestionInputSeed = {
  id: detailProblemWithAnestheticsId,
  uuid: detailProblemWithAnestheticsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.ProblemWithAnesthetics,
}

const questionDetailPreferredPronouns: QuestionInputSeed = {
  id: detailPreferredPronounsId,
  uuid: detailPreferredPronounsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.PreferredPronouns,
}

const questionDetailGender: QuestionInputSeed = {
  id: detailGenderId,
  uuid: detailGenderId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.Gender,
}

const questionDetailSexualOrientation: QuestionInputSeed = {
  id: detailSexualOrientationId,
  uuid: detailSexualOrientationId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SexualOrientation,
}

const questionDetailRecreationalDrugs: QuestionInputSeed = {
  id: detailRecreationalDrugsId,
  uuid: detailRecreationalDrugsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.RecreationalDrugs,
}

const questionDetailSeeCounsellorForStress: QuestionInputSeed = {
  id: detailSeeCounsellorForStressId,
  uuid: detailSeeCounsellorForStressId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SeeCounsellorForStress,
}

const questionDetailSmokeCigarettes: QuestionInputSeed = {
  id: detailSmokeCigarettesId,
  uuid: detailSmokeCigarettesId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SmokeCigarettes,
}

const questionDetailUseMarijuana: QuestionInputSeed = {
  id: detailUseMarijuanaId,
  uuid: detailUseMarijuanaId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.UseMarijuana,
}

const questionDetailWeightInLbs: QuestionInputSeed = {
  id: detailWeightInLbsId,
  uuid: detailWeightInLbsId + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.WeightInLbs,
}

const patientDetailSeedData = {
  id: 333,
}

const patientWithDuplicateNameSeedData = {
  id: 500,
  authUserId: authUserId2,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}

const questionnaireIntentFixture: Partial<QuestionnaireIntent> = {
  id: questionnaireIntentId,
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientWithDuplicateNameSeedData.id,
  updatedBy: AuthUserFixture.emailVerified.uid,
  isCompleted: false,
  questions: [
    {questionId: questionDetailLatexAllergy.id, answerType: QuestionType.String, answers: ['Yes']},
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
      questionId: detailHeightInInchesId,
      answerType: QuestionType.Integer,
      answers: [78],
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
  ],
}

const questionnaireToQuestions = [
  {
    questionId: detailLatexAllergyQuestionId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 1,
  },
  {
    questionId: detailCurrentStressLevelId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 2,
  },
  {
    questionId: detailCurrentOccupationId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 3,
  },
  {
    questionId: detailDateOfBirthId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 4,
  },
  {
    questionId: detailDrinkAlcoholId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 5,
  },
  {
    questionId: detailExerciseRegularlyId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 6,
  },
  {
    questionId: detailHeightInInchesId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 7,
  },
  {
    questionId: detailProblemWithAnestheticsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 8,
  },
  {
    questionId: detailPreferredPronounsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 9,
  },
  {
    questionId: detailGenderId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 10,
  },
  {
    questionId: detailSexualOrientationId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 11,
  },
  {
    questionId: detailRecreationalDrugsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 12,
  },
  {
    questionId: detailSeeCounsellorForStressId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 13,
  },
  {
    questionId: detailSmokeCigarettesId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 14,
  },
  {
    questionId: detailUseMarijuanaId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 15,
  },
  {
    questionId: detailWeightInLbsId,
    questionnaireId: questionnaireIntentFixture.questionnaireId,
    sequence: 16,
  },
]

const questionSeedData: QuestionInputSeed[] = [
  questionDetailLatexAllergy,
  questionDetailCurrentStressLevel,
  questionDetailCurrentOccupation,
  questionDetailDateOfBirth,
  questionDetailDrinkAlcohol,
  questionDetailExerciseRegularly,
  questionDetailHeightInInches,
  questionDetailProblemWithAnesthetics,
  questionDetailPreferredPronouns,
  questionDetailGender,
  questionDetailSexualOrientation,
  questionDetailRecreationalDrugs,
  questionDetailSeeCounsellorForStress,
  questionDetailSmokeCigarettes,
  questionDetailUseMarijuana,
  questionDetailWeightInLbs,
]

const patientSeedData = {
  id: patientId,
  authUserId: authUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}

const questionnaire1 = {
  id: questionnaireIntentFixture.questionnaireId,
  uuid: questionnaireUUID,
  title: 'questionnaire-fixture',
}

const removeQuestionIds = [
  detailLatexAllergyQuestionId,
  detailCurrentStressLevelId,
  detailCurrentOccupationId,
  detailDateOfBirthId,
  detailDrinkAlcoholId,
  detailExerciseRegularlyId,
  detailHeightInInchesId,
  detailProblemWithAnestheticsId,
  detailPreferredPronounsId,
  detailGenderId,
  detailSexualOrientationId,
  detailRecreationalDrugsId,
  detailSeeCounsellorForStressId,
  detailSmokeCigarettesId,
  detailUseMarijuanaId,
  detailWeightInLbsId,
]

describe('Firebase Function: questionnaire-to-profile-dob', () => {
  let dataSource: DataSource
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    questionnaireSeed = new QuestionnaireSeed(dataSource)
    questionnaireToQuestionSeed = new QuestionnaireToQuestionSeed(dataSource)
    questionSeed = new QuestionSeed(dataSource)
    questionnaireIntentSeed = new QuestionnaireIntentSeed()
    patientDetailSeed = new PatientDetailSeed(dataSource)
    patientProfileSeed = new PatientProfileSeed()

    await Promise.all([
      questionnaireIntentSeed.create(questionnaireIntentFixture),
      questionnaireIntentSeed.create(questionnaireIntentWithoutQuestionnaireFixture),
      questionnaireSeed.create(questionnaire1),
      patientDetailSeed.create(patientDetailSeedData),
      patientSeed.create(patientWithDuplicateNameSeedData),
      patientSeed.create(patientSeedData),
      questionSeed.createArray(questionSeedData),
      patientProfileSeed.create(patientProfileFixture),
    ])

    await patientSeed.updatePatient(patientSeedData.id, {
      detailId: patientDetailSeedData.id,
    })

    await Promise.all([questionnaireToQuestionSeed.createArray(questionnaireToQuestions)])
  })

  test(`1. Should create patientDetail successfully
        2. Should not delete questionnaireIntent`, async () => {
    await questionnaireIntentSeed.create(questionnaireIntentFixture)
    const spyPublishEmrDataChanged = jest.spyOn(PubSubHelpers, 'publishEmrDataChanged')
    const data: QuestionnaireSubmittedPubSubPayload = {
      questionnaireIntentId: questionnaireIntentFixture.id,
      ...createPatientDetailAndMedicationAuditTrailData,
      patientIntakeFinishedByPatient: true,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    const result = await handler(message)
    const patient = await patientSeed.findOneWithDetailById(patientSeedData.id)
    const patientWithDuplicateName = await patientSeed.findOneWithDetailById(
      patientWithDuplicateNameSeedData.id,
    )
    expect(patient.hasDuplicateName).toBe(true)
    expect(patientWithDuplicateName.hasDuplicateName).toBe(true)
    const patientProfile = await patientProfileSeed.findOneByPatientId(patientId)
    expect(result).toBeUndefined()
    expect(patientProfile.questionnaires.length).toBe(2)

    const questionnaireIntent = await questionnaireIntentSeed.getById(questionnaireIntentId)
    expect(questionnaireIntent).toBeTruthy() //it should not be deleted by property in event

    expect(spyPublishEmrDataChanged).toBeCalled()
    spyPublishEmrDataChanged.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    const patient = await patientSeed.findOneWithDetailById(patientSeedData.id)
    await patientSeed.removePatientByAuthUserId(authUserId)
    await patientSeed.removePatientByAuthUserId(authUserId2)
    await patientDetailSeed.removePatientDetailByIds([patient.detail.id, patientDetailSeedData.id])
    await questionnaireSeed.removeQuestionnaireByUUID(questionnaireUUID)
    await questionSeed.removeByIds(removeQuestionIds)
    await Promise.all([
      questionnaireIntentSeed.deleteById(questionnaireIntentFixture.id),
      questionnaireIntentSeed.deleteById(questionnaireIntentWithoutQuestionnaireFixture.id),
      questionnaireToQuestionSeed.removeByQuestionnaireId(
        questionnaireIntentFixture.questionnaireId,
      ),
      patientProfileSeed.deleteByPatientId(patientId),
    ])
  })
})
