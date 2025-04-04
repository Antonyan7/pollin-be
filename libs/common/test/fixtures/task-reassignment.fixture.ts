import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {TaskReassignment} from '@libs/data-layer/apps/clinic-tasks/entities'
import {staffWithMockedAssignorIdFixture} from './staff.fixture'
import {taskLowFixture} from './task.fixture'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const taskReassignmentFixture: Partial<TaskReassignment> = {
  id: 1,
  uuid: '0802715b-0da0-466a-8149-86a266e24b0e',
  note: 'Reassignment reason',
  reassignDate: dateTimeUtil.now(),
  assignorId: staffWithMockedAssignorIdFixture.id,
  taskId: taskLowFixture.id,
}

export const taskReassignmentWithNotExistedNoteFixture: Partial<TaskReassignment> = {
  id: 2,
  uuid: '3333715b-0da0-466a-8149-86a266e24b0e',
  reassignDate: dateTimeUtil.now(),
  assignorId: staffWithMockedAssignorIdFixture.id,
  taskId: taskLowFixture.id,
}
