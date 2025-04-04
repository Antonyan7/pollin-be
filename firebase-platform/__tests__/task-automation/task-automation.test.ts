import {AutomatedTaskSeed, PatientPlanSeed} from '@seeds/typeorm'
import {testPubSubEvent} from '@functions-types'
import {DataSource} from 'typeorm'
import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {
  assigneeForPayloadFixture,
  assigneeForTaskAutomationFixture,
  assignorForTaskAutomationFixture,
  autoTaskAbnormalResultFixture,
  autoTaskPeriodReportedFixture,
  autoTaskPlanPaidFixture,
  autoTaskTestsAddedFixture,
  createTaskAutomationFixtures,
  destroyTaskAutomationFixtures,
  patientForTaskAutomationFixture,
  patientForTaskAutomationPlanV2Fixture,
  patientPlanFixture,
  patientPlanV2Fixture,
  patientPlanV2WithoutAutomatedTasksFixture,
  paymentOrderGoogleAd,
  planTypeFixture,
  testResultAbnormalFixture,
  nurseStaffFixture,
} from './seed'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {TaskSeed} from '@seeds/typeorm/task.seed'
import {Task} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  AutomatedTaskDescription,
  AutomatedTaskTitle,
  AutomatedTaskType,
  TaskStatus,
} from '@libs/data-layer/apps/clinic-tasks/enums/task.enum'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  handlerTestResultsSubmitted,
  handlerPlanPaid,
  handlerPlanPeriodReportedAutomatedTask,
  handlerHighPriorityResultReview,
} from '@firebase-platform/functions/tasks/src/handlers'
import {TestResultsSumbittedSchema} from '@libs/common/model/proto-schemas/plan-results-submitted.schema'
import {PlanPaidSchema} from '@libs/common/model/proto-schemas/plan-paid.schema'
import {PlanPeriodReportedSchema} from '@libs/common/model/proto-schemas/plan-period-reported.schema'
import {TestResultUpdatedSchema} from '@libs/common/model/proto-schemas/test-result-updated.schema'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const payloadPlanPaid = {
  paymentOrderId: paymentOrderGoogleAd.id,
  paymentAmount: paymentOrderGoogleAd.total,
  patientId: 555111,
  dateTime: dateTimeUtil.formatIsoDate(dateTimeUtil.now()),
}
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

describe('Firebase Function Service: Task Automation', () => {
  let dataSource: DataSource

  let taskSeed: TaskSeed
  let patientPlanSeed: PatientPlanSeed
  let automatedTaskSeed: AutomatedTaskSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    await createTaskAutomationFixtures(dataSource)

    taskSeed = new TaskSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)
    automatedTaskSeed = new AutomatedTaskSeed(dataSource)
  })

  test(`should create a task for 1st day of period reported - plan v2 - success`, async () => {
    const data = {
      patientId: patientForTaskAutomationPlanV2Fixture.id,
      patientPlanId: patientPlanV2Fixture.id,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPeriodReportedSchema))
    await handlerPlanPeriodReportedAutomatedTask(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationPlanV2Fixture.id)
    expect(tasks).toMatchObject([
      {
        assigneeId: assigneeForTaskAutomationFixture.id,
        creatorId: assignorForTaskAutomationFixture.id,
        priority: autoTaskPeriodReportedFixture.priority,
        status: TaskStatus.Pending,
        title: AutomatedTaskTitle.get(AutomatedTaskType.PeriodReported1stDay),
        description: AutomatedTaskDescription.get(AutomatedTaskType.PeriodReported1stDay),
        patientId: patientForTaskAutomationPlanV2Fixture.id,
        automatedTaskType: AutomatedTaskType.PeriodReported1stDay,
      },
    ])
  })

  test(`should not create a task for 1st day of period reported - plan v2 doesn't have automated task linked`, async () => {
    const data = {
      patientId: patientForTaskAutomationPlanV2Fixture.id,
      patientPlanId: patientPlanV2WithoutAutomatedTasksFixture.id,
    }
    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPeriodReportedSchema))

    await handlerPlanPeriodReportedAutomatedTask(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationPlanV2Fixture.id)
    expect(tasks.length).toBe(0)
  })

  test(`should create a task for 1st day of period reported - success`, async () => {
    const data = {
      patientId: patientForTaskAutomationFixture.id,
      patientPlanId: patientPlanFixture.id,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPeriodReportedSchema))
    await handlerPlanPeriodReportedAutomatedTask(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks).toMatchObject([
      {
        assigneeId: assigneeForTaskAutomationFixture.id,
        creatorId: assignorForTaskAutomationFixture.id,
        priority: autoTaskPeriodReportedFixture.priority,
        status: TaskStatus.Pending,
        title: AutomatedTaskTitle.get(AutomatedTaskType.PeriodReported1stDay),
        description: AutomatedTaskDescription.get(AutomatedTaskType.PeriodReported1stDay),
        patientId: patientForTaskAutomationFixture.id,
        automatedTaskType: AutomatedTaskType.PeriodReported1stDay,
      },
    ])
  })

  test(`should not create a task - task data not found`, async () => {
    await automatedTaskSeed.removeByIds([autoTaskPeriodReportedFixture.id])

    const data = {
      patientId: patientForTaskAutomationFixture.id,
      patientPlanId: patientPlanFixture.id,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPeriodReportedSchema))
    await handlerPlanPeriodReportedAutomatedTask(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)
  })

  test(`should not create automated task - assignee and assignor weren't provided`, async () => {
    await automatedTaskSeed.removeByIds([autoTaskPeriodReportedFixture.id])
    await automatedTaskSeed.create({
      ...autoTaskPeriodReportedFixture,
      assigneeId: null,
      assignorId: null,
    })

    const data = {
      patientId: patientForTaskAutomationFixture.id,
      patientPlanId: patientPlanFixture.id,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPeriodReportedSchema))
    await handlerPlanPeriodReportedAutomatedTask(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)

    await automatedTaskSeed.removeByIds([autoTaskPeriodReportedFixture.id])
  })

  test(`should not create automated task - hoursOffset is NULL`, async () => {
    await automatedTaskSeed.removeByIds([autoTaskPeriodReportedFixture.id])
    await automatedTaskSeed.create({
      ...autoTaskPeriodReportedFixture,
      hoursOffset: null,
    })

    const data = {
      patientId: patientForTaskAutomationFixture.id,
      patientPlanId: patientPlanFixture.id,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPeriodReportedSchema))
    await handlerPlanPeriodReportedAutomatedTask(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)

    await automatedTaskSeed.removeByIds([autoTaskPeriodReportedFixture.id])
  })

  test(`should create Plan Paid automated task - plans v2 - success`, async () => {
    const data = {
      ...payloadPlanPaid,
      patientPlanId: patientPlanV2Fixture.id,
    }
    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPaidSchema))
    await handlerPlanPaid(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationPlanV2Fixture.id)
    expect(tasks.length).toBe(1)

    const [task] = tasks
    expect(task).toMatchObject<Partial<Task>>({
      assigneeId: assigneeForTaskAutomationFixture.id,
      creatorId: assignorForTaskAutomationFixture.id,
      priority: autoTaskPlanPaidFixture.priority,
      status: TaskStatus.Pending,
      title: AutomatedTaskTitle.get(AutomatedTaskType.PlanPaid).replace(
        '{{planTitle}}',
        planTypeFixture.title,
      ),
      description: AutomatedTaskDescription.get(AutomatedTaskType.PlanPaid),
      patientId: patientForTaskAutomationPlanV2Fixture.id,
      automatedTaskType: AutomatedTaskType.PlanPaid,
      patientPlanId: patientPlanV2Fixture.id,
    })

    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)
  })

  test(`should not create Plan Paid automated task - plans v2 - plan type doesnt have automated task`, async () => {
    const data = {
      ...payloadPlanPaid,
      patientPlanId: patientPlanV2WithoutAutomatedTasksFixture.id,
    }
    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPaidSchema))

    await handlerPlanPaid(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationPlanV2Fixture.id)
    expect(tasks.length).toBe(0)
  })

  test(`should not create IVF Plan paid automated task - plan was not found`, async () => {
    const data = {
      ...payloadPlanPaid,
      patientPlanId: 404,
    }
    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, PlanPaidSchema))

    await handlerPlanPaid(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)
  })

  test(`should create plan test results automated task - success`, async () => {
    const data = {
      patientId: patientForTaskAutomationFixture.id,
      testOrderCreatorId: assigneeForTaskAutomationFixture.id,
    }
    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultsSumbittedSchema))
    await handlerTestResultsSubmitted(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks.length).toBe(1)

    const [task] = tasks
    expect(task).toMatchObject<Partial<Task>>({
      assigneeId: assigneeForPayloadFixture.id,
      creatorId: assigneeForTaskAutomationFixture.id,
      priority: autoTaskTestsAddedFixture.priority,
      status: TaskStatus.Pending,
      title: AutomatedTaskTitle.get(AutomatedTaskType.PlanTestResultsAdded),
      description: AutomatedTaskDescription.get(AutomatedTaskType.PlanTestResultsAdded),
      patientId: patientForTaskAutomationFixture.id,
      automatedTaskType: AutomatedTaskType.PlanTestResultsAdded,
    })

    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)
  })

  test(`should create plan test results automated task for plan v2 - success`, async () => {
    const data = {
      patientId: patientForTaskAutomationPlanV2Fixture.id,
      testOrderCreatorId: assigneeForTaskAutomationFixture.id,
    }
    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultsSumbittedSchema))

    await handlerTestResultsSubmitted(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationPlanV2Fixture.id)
    expect(tasks.length).toBe(1)

    const [task] = tasks
    expect(task).toMatchObject<Partial<Task>>({
      assigneeId: assigneeForPayloadFixture.id,
      creatorId: assigneeForTaskAutomationFixture.id,
      priority: autoTaskTestsAddedFixture.priority,
      status: TaskStatus.Pending,
      title: AutomatedTaskTitle.get(AutomatedTaskType.PlanTestResultsAdded),
      description: AutomatedTaskDescription.get(AutomatedTaskType.PlanTestResultsAdded),
      patientId: patientForTaskAutomationPlanV2Fixture.id,
      automatedTaskType: AutomatedTaskType.PlanTestResultsAdded,
    })

    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)
  })

  test(`should not create plan test results automated task for plan v2 - plan type has no link to automated task`, async () => {
    await Promise.all([
      patientPlanSeed.updateStatus(
        patientPlanV2WithoutAutomatedTasksFixture.id,
        PlanStatusEnum.Active,
      ),
      patientPlanSeed.updateStatus(patientPlanV2Fixture.id, PlanStatusEnum.ReadyForActivation),
    ])
    const data = {
      patientId: patientForTaskAutomationPlanV2Fixture.id,
      testOrderCreatorId: assigneeForTaskAutomationFixture.id,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationPlanV2Fixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultsSumbittedSchema))
    await handlerTestResultsSubmitted(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationPlanV2Fixture.id)
    expect(tasks.length).toBe(0)
  })

  test(`should not create plan test results submitted task - plan task assignee was not found`, async () => {
    const data = {
      patientId: patientForTaskAutomationFixture.id,
      testOrderCreatorId: assigneeForTaskAutomationFixture.id,
    }

    await Promise.all([
      taskSeed.removeByPatientId(assigneeForTaskAutomationFixture.id),
      patientPlanSeed.updateTaskAssignee(patientPlanFixture.id, null),
    ])

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultsSumbittedSchema))
    await handlerTestResultsSubmitted(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks.length).toBe(0)
  })

  test(`should create a task for abnormal test results - success`, async () => {
    const data = {
      testResultId: testResultAbnormalFixture.id,
      testResultNewStatus: TestResultStatus.Completed,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultUpdatedSchema))
    await handlerHighPriorityResultReview(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks).toMatchObject([
      {
        assigneeId: nurseStaffFixture.id,
        creatorId: assignorForTaskAutomationFixture.id,
        priority: autoTaskAbnormalResultFixture.priority,
        status: TaskStatus.Pending,
        title: AutomatedTaskTitle.get(AutomatedTaskType.HighPriorityResultReview),
        description: `Please review abnormal DefaultTestPanelTitleSeed results`,
        patientId: patientForTaskAutomationFixture.id,
        automatedTaskType: AutomatedTaskType.HighPriorityResultReview,
        testResultId: testResultAbnormalFixture.id,
      },
    ])
  })

  test(`should fail to create a task for abnormal test results - already have task`, async () => {
    const data = {
      testResultId: testResultAbnormalFixture.id,
      testResultNewStatus: TestResultStatus.Completed,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultUpdatedSchema))
    await handlerHighPriorityResultReview(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks).toMatchObject([
      {
        assigneeId: nurseStaffFixture.id,
        creatorId: assignorForTaskAutomationFixture.id,
        priority: autoTaskAbnormalResultFixture.priority,
        status: TaskStatus.Pending,
        title: AutomatedTaskTitle.get(AutomatedTaskType.HighPriorityResultReview),
        description: `Please review abnormal DefaultTestPanelTitleSeed results`,
        patientId: patientForTaskAutomationFixture.id,
        automatedTaskType: AutomatedTaskType.HighPriorityResultReview,
        testResultId: testResultAbnormalFixture.id,
      },
    ])
  })

  test(`should create a task for abnormal test results with normal measurement - success`, async () => {
    const data = {
      testResultId: testResultAbnormalFixture.id,
      testResultNewStatus: TestResultStatus.Completed,
    }

    await taskSeed.removeByPatientId(patientForTaskAutomationFixture.id)

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultUpdatedSchema))
    await handlerHighPriorityResultReview(message)

    const tasks = await taskSeed.findByPatientId(patientForTaskAutomationFixture.id)
    expect(tasks).toMatchObject([
      {
        assigneeId: nurseStaffFixture.id,
        creatorId: assignorForTaskAutomationFixture.id,
        priority: autoTaskAbnormalResultFixture.priority,
        status: TaskStatus.Pending,
        title: AutomatedTaskTitle.get(AutomatedTaskType.HighPriorityResultReview),
        description: `Please review abnormal DefaultTestPanelTitleSeed results`,
        patientId: patientForTaskAutomationFixture.id,
        automatedTaskType: AutomatedTaskType.HighPriorityResultReview,
        testResultId: testResultAbnormalFixture.id,
      },
    ])
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await destroyTaskAutomationFixtures(dataSource)
  })
})
