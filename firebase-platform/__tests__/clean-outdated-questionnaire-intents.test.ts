import {cleanOutdatedQuestionnaireIntentsHandler} from '@codebase/cache/handlers'
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {QuestionnaireIntentSeed} from '@seeds/firestore/questionnaire-intent.seed'
import {QuestionnaireIntent} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {patientDateOfBirth} from './fixtures/questionnaire.fixture'
import {PatientSeed, QuestionnaireSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientQuestionnaireIntakeStatus} from '@libs/data-layer/apps/users/enum'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {QuestionnaireJourneyMilestone} from '@libs/data-layer/apps/questionnaires/enums/questionnaire-enums'
import {JourneyType} from '@libs/services-common/enums'

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

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const questionnaireIntentOutdatedId = 'outdatedQuestionnaireIntentId'
const questionnaireIntentNoOldId = 'newQuestionnaireIntentId'

const authUserId = 'autUserIdForQuInteInFirestoreTest'

const questionnaireForIntakeData: Partial<Questionnaire> = {
  id: 35345346,
  journeyMilestone: QuestionnaireJourneyMilestone.PatientIntakeFemale,
  uuid: 'questionnaire-uuid2',
}

const questionnaireForOutdatedIntentDate: Partial<Questionnaire> = {
  id: 3434,
  uuid: 'questionnaire-uuid22323',
}
const questionnaireForIntentNoOldData: Partial<Questionnaire> = {
  id: 343445,
  uuid: 'questionnaire-uuid23434',
}

const patientData: Partial<Patient> = {
  id: 45335,
  authUserId: authUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.PendingCompletionByPatient,
}

const questionnaireIntentToDeleteCommonData: Partial<QuestionnaireIntent> = {
  createdAt: dateTimeUtil.getFirestoreTimeStampFromDate(
    dateTimeUtil.addDays(dateTimeUtil.now(), -40),
  ),
  updatedAt: dateTimeUtil.getFirestoreTimeStampFromDate(
    dateTimeUtil.addDays(dateTimeUtil.now(), -40),
  ),
}

const outdatedQuestionnaireIntent: Partial<QuestionnaireIntent> = {
  ...questionnaireIntentToDeleteCommonData,
  id: questionnaireIntentOutdatedId,
  questionnaireId: questionnaireForOutdatedIntentDate.id,
  patientId: patientData.id,
}

const questionnaireIntentNoOldData: Partial<QuestionnaireIntent> = {
  id: questionnaireIntentNoOldId,
  questionnaireId: questionnaireForIntentNoOldData.id,
  patientId: patientData.id,
}

/** for patient status = Show Appointments  */
const patientShowAppDoNotDeleteData: Partial<Patient> = {
  id: 45336,
  authUserId: 'authUserPatientShowAppDoNotDeleteData',
  firstName: 'firstName45',
  lastName: 'lastName45',
  middleName: 'middleName45',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.PendingCompletionByPatient,
  currentJourneyType: JourneyType.ShowAppointments,
}

const questionnaireIntentForPatShowAppDoNotDeleteData: Partial<QuestionnaireIntent> = {
  ...questionnaireIntentToDeleteCommonData,
  id: 'questionnaireIntentForPatShowAppDoNotDeleteId',
  questionnaireId: questionnaireForIntakeData.id,
  patientId: patientShowAppDoNotDeleteData.id,
}

/** for patientIntakeStatus = CompletedByPatient  */
const patientCompletedPIData: Partial<Patient> = {
  id: 45337,
  authUserId: 'authUserPatientCompletedPIData',
  firstName: 'firstNamed',
  lastName: 'lastNamed',
  middleName: 'middleNamed',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CompletedByPatient,
}

const questionnaireIntentForCompletedPIData: Partial<QuestionnaireIntent> = {
  ...questionnaireIntentToDeleteCommonData,
  id: 'questionnaireIntentForCompletedPIDataId',
  questionnaireId: questionnaireForIntakeData.id,
  patientId: patientCompletedPIData.id,
}

let patientSeed: PatientSeed
let questionnaireSeed: QuestionnaireSeed
let questionnaireIntentSeed: QuestionnaireIntentSeed
let dataSource: DataSource

describe('Firebase Function: clean-outdated-questionnare-intents', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    questionnaireIntentSeed = new QuestionnaireIntentSeed()
    patientSeed = new PatientSeed(dataSource)
    questionnaireSeed = new QuestionnaireSeed(dataSource)

    await Promise.all([
      questionnaireSeed.createArray([
        questionnaireForIntakeData,
        questionnaireForOutdatedIntentDate,
        questionnaireForIntentNoOldData,
      ]),
      patientSeed.createArray([patientData, patientShowAppDoNotDeleteData, patientCompletedPIData]),
    ])

    await questionnaireIntentSeed.createArray([
      outdatedQuestionnaireIntent,
      questionnaireIntentNoOldData,
      questionnaireIntentForPatShowAppDoNotDeleteData,
      questionnaireIntentForCompletedPIData,
    ])
  })

  test(`Should clean outdated questionnaire intents
        1. Should delete old QI 
        2. Should not delete old QI for patient which already finished PI or did check in etc`, async () => {
    await cleanOutdatedQuestionnaireIntentsHandler()

    const patient = await patientSeed.findOneByAuthUserId(patientData.authUserId)
    expect(patient.patientIntakeStatus).toBe(patientData.patientIntakeStatus)

    //outdated - should be deleted
    const outDatedQuestionnaireIntent = await questionnaireIntentSeed.getById(
      questionnaireIntentOutdatedId,
    )
    expect(outDatedQuestionnaireIntent).toBeFalsy()

    //not old - should not be deleted
    const newQuestionnaireIntent = await questionnaireIntentSeed.getById(questionnaireIntentNoOldId)
    expect(newQuestionnaireIntent.id).toBe(questionnaireIntentNoOldId)

    // should not delete
    const questionnaireIntentForPatShowAppDoNotDelete = await questionnaireIntentSeed.getById(
      questionnaireIntentForPatShowAppDoNotDeleteData.id,
    )
    expect(questionnaireIntentForPatShowAppDoNotDelete.id).toBeTruthy()

    // should not delete
    const questionnaireIntentForCompletedPI = await questionnaireIntentSeed.getById(
      questionnaireIntentForCompletedPIData.id,
    )
    expect(questionnaireIntentForCompletedPI.id).toBeTruthy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await Promise.all(
      [
        questionnaireIntentNoOldId,
        questionnaireIntentOutdatedId,
        questionnaireIntentForCompletedPIData.id,
        questionnaireIntentForPatShowAppDoNotDeleteData.id,
      ].map((id) => questionnaireIntentSeed.deleteById(id)),
    )

    await Promise.all([
      questionnaireSeed.removeQuestionnaireByIds([
        questionnaireForIntakeData.id,
        questionnaireForOutdatedIntentDate.id,
        questionnaireForIntentNoOldData.id,
      ]),

      patientSeed.removePatientByAuthUserIds([
        patientData.authUserId,
        patientShowAppDoNotDeleteData.authUserId,
        patientCompletedPIData.authUserId,
      ]),
    ])
  })
})
