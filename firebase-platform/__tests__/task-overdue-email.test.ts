import {DateTimeUtil} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {PatientSeed, StaffSeed, TaskSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {TaskPriority, TaskStatus} from '@libs/data-layer/apps/clinic-tasks/enums/task.enum'
import {
  TasksOverdueEmailService,
  handlerTasksOverdueEmail,
} from '../functions/email-notification/src/tasks-overdue/handler'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {taskOverdueTemplateFixture} from './fixtures/email-template.fixture'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

jest.setTimeout(15000)
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
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

const dateTimeUtil = new DateTimeUtil()

const id = 6122023

const patientFixture = {
  id,
  uuid: '5804d7ae-2c83-423b-ad1d-365534876bda',
  authUserId: 'task-automation-critical-user',
  firstName: 'First',
  lastName: 'Name',
}

const assignorFixture = {
  id,
  email: 'automation-assignor-email',
  firstName: 'Jane',
}
const assigneeFixture = {
  id: id + 1,
  email: 'automation-assignee-email',
  firstName: 'Joe',
}
const assigneeWithOneTaskFixture = {
  id: id + 2,
  email: 'automation-assignee-2-email',
  firstName: 'Joe',
}

const assigneeWithoutTasksFixture = {
  id: id + 3,
  email: 'assignee-without-tasks-email',
  firstName: 'John',
}

const taskCriticalFixture = {
  id,
  uuid: '5804d7ae-2c83-223b-ad1d-365534876bda',
  title: 'title1',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  creatorId: assignorFixture.id,
  assigneeId: assigneeFixture.id,
  patientId: patientFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.InProgress,
  isRead: true,
}

const taskHighWithoutPatientFixture = {
  id: id + 1,
  uuid: '5804d7ae-2c83-223b-ad1d-365534876bdb',
  title: 'title2',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  creatorId: assignorFixture.id,
  assigneeId: assigneeFixture.id,
  priority: TaskPriority.High,
  status: TaskStatus.InProgress,
  isRead: true,
}

const taskMediumFixture = {
  id: id + 2,
  uuid: '5804d7ae-2c83-223b-ad1d-365534876bdc',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  creatorId: assignorFixture.id,
  assigneeId: assigneeFixture.id,
  patientId: patientFixture.id,
  priority: TaskPriority.Medium,
  status: TaskStatus.InProgress,
  isRead: true,
}

const taskInFutureFixture = {
  id: id + 3,
  uuid: '5804d7ae-2c83-223b-ad1d-365534876bdd',
  dueDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  creatorId: assignorFixture.id,
  assigneeId: assigneeFixture.id,
  patientId: patientFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.InProgress,
  isRead: true,
}

const taskCompletedFixture = {
  id: id + 4,
  uuid: '5804d7ae-2c83-223b-ad1d-365534876bdf',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  creatorId: assignorFixture.id,
  assigneeId: assigneeFixture.id,
  patientId: patientFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.Completed,
  isRead: true,
}

const taskForSecondAssigneeFixture = {
  id: id + 5,
  title: 'taskForSecondAssignee',
  uuid: '5804d8ae-2c83-223b-ad1d-365534876bdf',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  creatorId: assignorFixture.id,
  assigneeId: assigneeWithOneTaskFixture.id,
  patientId: patientFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.InProgress,
  isRead: true,
}

let dataSource: DataSource

let patientSeed: PatientSeed
let staffSeed: StaffSeed
let taskSeed: TaskSeed
let emailTemplateSeed: EmailTemplateSeed

describe('Task overdue email', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    taskSeed = new TaskSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    await Promise.all([
      patientSeed.create(patientFixture),
      staffSeed.createArray([
        assignorFixture,
        assigneeFixture,
        assigneeWithOneTaskFixture,
        assigneeWithoutTasksFixture,
      ]),
      await emailTemplateSeed.createArray([taskOverdueTemplateFixture]),
    ])
    await taskSeed.createArray([
      taskCriticalFixture,
      taskHighWithoutPatientFixture,
      taskMediumFixture,
      taskInFutureFixture,
      taskCompletedFixture,
      taskForSecondAssigneeFixture,
    ])
  })

  it('should send email to assignee with task overdue informatiom', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyOnGetTaskEmailData = jest.spyOn(TasksOverdueEmailService.prototype, 'getTaskEmailData')

    await handlerTasksOverdueEmail()

    //Only patient with tasks should receive email
    expect(spyOnEmailSending).toHaveBeenCalledTimes(2)

    //Only 2 tasks will be sent by criteria
    expect(spyOnGetTaskEmailData).toHaveBeenCalledTimes(2)
    expect(spyOnGetTaskEmailData).toHaveReturnedWith([
      {
        title: taskCriticalFixture.title,
        patientFullname: `${patientFixture.firstName} ${patientFixture.lastName}`,
      },
      {
        title: taskHighWithoutPatientFixture.title,
        patientFullname: null,
      },
    ])
    expect(spyOnGetTaskEmailData).toHaveReturnedWith([
      {
        title: taskForSecondAssigneeFixture.title,
        patientFullname: `${patientFixture.firstName} ${patientFixture.lastName}`,
      },
    ])
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await taskSeed.removeByIds([
      taskCriticalFixture.id,
      taskHighWithoutPatientFixture.id,
      taskMediumFixture.id,
      taskInFutureFixture.id,
      taskCompletedFixture.id,
      taskForSecondAssigneeFixture.id,
    ])
    await Promise.all([
      patientSeed.removeByIds([patientFixture.id]),
      staffSeed.removeByIds([
        assigneeFixture.id,
        assignorFixture.id,
        assigneeWithOneTaskFixture.id,
        assigneeWithoutTasksFixture.id,
      ]),
      emailTemplateSeed.deleteByIds([taskOverdueTemplateFixture.id]),
    ])
    await dataSource.destroy()
  })
})
