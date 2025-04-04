import {AutomatedTaskSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {
  autoTaskReferralRequired,
  autoTaskReleaseOfInformationRequired,
  autoTaskUploadReferral,
  createTaskAutomationFixtures,
  destroyTaskAutomationFixtures,
  patientForReferralTaskAutomationFixture,
} from './seed'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  handlerReferralRequiredTask,
  handlerReleaseOfInformationRequired,
  handlerUploadReferralTask,
} from '@firebase-platform/functions/tasks/src/handlers'
import {TaskSeed} from '@seeds/typeorm/task.seed'
import {Task} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  AutomatedTaskDescription,
  AutomatedTaskTitle,
  AutomatedTaskType,
  TaskStatus,
} from '@libs/data-layer/apps/clinic-tasks/enums/task.enum'
import {TaskAutomationErrorCodes} from '@libs/common/errors'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {QuestionAnswerSubmittedSchema} from '@libs/common/model/proto-schemas/question-answer-submitted.schema.'
import {PatientAnswers} from '@libs/services-common/enums'
import {testPubSubEvent} from '@functions-types'

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
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.setTimeout(10000)

describe('Firebase Function: task automation - Questionnaire Answers', () => {
  let dataSource: DataSource

  let taskSeed: TaskSeed
  let automatedTaskSeed: AutomatedTaskSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createTaskAutomationFixtures(dataSource)

    taskSeed = new TaskSeed(dataSource)
    automatedTaskSeed = new AutomatedTaskSeed(dataSource)
  })

  test('should not create referral required task - answer is wrong', async () => {
    const data = {
      answers: [PatientAnswers.Yes],
      patientId: patientForReferralTaskAutomationFixture.id,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    await handlerReferralRequiredTask(message)

    const tasks = await taskSeed.findByPatientId(patientForReferralTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)
  })

  test('should not create referral required task - patient was not found', async () => {
    const data = {
      answers: [PatientAnswers.No],
      patientId: 1337228322,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    const result = await handlerReferralRequiredTask(message)
    expect(result).toBe(TaskAutomationErrorCodes.PatientNotFound)

    const tasks = await taskSeed.findByPatientId(patientForReferralTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)
  })

  test('should not create "Upload Referral" task - patient was not found', async () => {
    const data = {
      answers: [PatientAnswers.No],
      patientId: 1337228322,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    const result = await handlerReferralRequiredTask(message)
    expect(result).toBe(TaskAutomationErrorCodes.PatientNotFound)
  })

  test('should not create "Release of information" task - patient was not found', async () => {
    const data = {
      answers: [PatientAnswers.Yes],
      patientId: 1337228322,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    const result = await handlerReleaseOfInformationRequired(message)
    expect(result).toBe(TaskAutomationErrorCodes.PatientNotFound)
  })

  test('should not create "Release of information" task - answer if wrong', async () => {
    const data = {
      answers: [PatientAnswers.No],
      patientId: patientForReferralTaskAutomationFixture.id,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    await handlerReleaseOfInformationRequired(message)

    const tasks = await taskSeed.findByPatientId(patientForReferralTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)
  })

  test('should create referral required task - success', async () => {
    const data = {
      answers: [PatientAnswers.No],
      patientId: patientForReferralTaskAutomationFixture.id,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    await handlerReferralRequiredTask(message)

    const tasks = await taskSeed.findByPatientId(patientForReferralTaskAutomationFixture.id)
    expect(tasks.length).toBe(1)

    expect(tasks[0]).toMatchObject<Partial<Task>>({
      assigneeId: autoTaskReferralRequired.assigneeId,
      creatorId: autoTaskReferralRequired.assignorId,
      priority: autoTaskReferralRequired.priority,
      status: TaskStatus.Pending,
      title: AutomatedTaskTitle.get(AutomatedTaskType.ReferralRequired),
      description: AutomatedTaskDescription.get(AutomatedTaskType.ReferralRequired),
      patientId: patientForReferralTaskAutomationFixture.id,
      automatedTaskType: AutomatedTaskType.ReferralRequired,
    })
    await taskSeed.removeByPatientId(patientForReferralTaskAutomationFixture.id)
  })

  test('should create "Upload referral" task - success', async () => {
    const data = {
      answers: ['Doctor Name'],
      patientId: patientForReferralTaskAutomationFixture.id,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    await handlerUploadReferralTask(message)

    const tasks = await taskSeed.findByPatientId(patientForReferralTaskAutomationFixture.id)
    expect(tasks.length).toBe(1)

    expect(tasks[0]).toMatchObject<Partial<Task>>({
      assigneeId: autoTaskUploadReferral.assigneeId,
      creatorId: autoTaskUploadReferral.assignorId,
      priority: autoTaskUploadReferral.priority,
      status: TaskStatus.Pending,
      title: AutomatedTaskTitle.get(AutomatedTaskType.UploadReferral),
      description: AutomatedTaskDescription.get(AutomatedTaskType.UploadReferral).replace(
        '{{doctor}}',
        data.answers[0],
      ),
      patientId: patientForReferralTaskAutomationFixture.id,
      automatedTaskType: AutomatedTaskType.UploadReferral,
    })
    await taskSeed.removeByPatientId(patientForReferralTaskAutomationFixture.id)
  })

  test('should create "Release of information" task - success', async () => {
    const data = {
      answers: [PatientAnswers.Yes],
      patientId: patientForReferralTaskAutomationFixture.id,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))

    await handlerReleaseOfInformationRequired(message)

    const tasks = await taskSeed.findByPatientId(patientForReferralTaskAutomationFixture.id)
    expect(tasks.length).toBe(1)

    expect(tasks[0]).toMatchObject<Partial<Task>>({
      assigneeId: autoTaskReleaseOfInformationRequired.assigneeId,
      creatorId: autoTaskReleaseOfInformationRequired.assignorId,
      priority: autoTaskReleaseOfInformationRequired.priority,
      status: TaskStatus.Pending,
      title: AutomatedTaskTitle.get(AutomatedTaskType.ReleaseOfInformationRequired),
      description: AutomatedTaskDescription.get(AutomatedTaskType.ReleaseOfInformationRequired),
      patientId: patientForReferralTaskAutomationFixture.id,
      automatedTaskType: AutomatedTaskType.ReleaseOfInformationRequired,
    })
    await taskSeed.removeByPatientId(patientForReferralTaskAutomationFixture.id)
  })

  test(`should not create a task - automated task data doesn't exist`, async () => {
    const data = {
      answers: [PatientAnswers.No],
      patientId: patientForReferralTaskAutomationFixture.id,
    }
    await automatedTaskSeed.removeByIds([autoTaskReferralRequired.id])

    const message = testPubSubEvent(encodePubSubMessage(data, QuestionAnswerSubmittedSchema))
    await handlerReferralRequiredTask(message)

    const tasks = await taskSeed.findByPatientId(patientForReferralTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await destroyTaskAutomationFixtures(dataSource)
  })
})
