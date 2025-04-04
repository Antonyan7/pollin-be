import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  partnerIntakeJourneyTypeFixture,
  partnerPatientForProfileTestResultsFixture,
  patientClinicEmrListKimLeeFixture,
  patientClinicSchedulingFixture,
  patientEmailVerifiedFixture,
  patientForProfileTestResultsFixture,
  patientForReassignTaskFixture,
  patientWithoutDoctorSoftDeletedFixture,
} from './patient.fixture'
import {Task} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  AutomatedTaskType,
  TaskPriority,
  TaskStatus,
} from '@libs/data-layer/apps/clinic-tasks/enums/task.enum'
import {
  stafForUnreadTasksBadgeFixture,
  staffClinicManagerFixture,
  staffManagerRoleFixture,
  staffWithMockedAssignorIdFixture,
} from './staff.fixture'
import {patientPlanFixture, patientPlanForPatientStatusFixture} from './patient-plan.fixture'
import {
  testResultFixture,
  testResultForTestPanelSemenAnalysisRecentFixture,
  testResultPanelFixture,
  testResultPlanGroupTypeFixture,
} from './test-result.fixture'
import {testOrderFixture} from '@libs/common/test/fixtures/test-order.fixture'
import {finalReportCompletedFixture, finalReportFixture} from './test-result-final-report.fixture'
import {
  encounterShortSearchStringSuccessFixture,
  encounterToUpdateCallbackFixture,
  encounterToUpdateCallbackWithoutDueDateChangeFixture,
} from './encounter.fixture'
import {
  staffNoteShortSearchStringSuccessFixture,
  staffNoteToUpdateCallbackFixture,
} from './staff-note.fixture'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const taskMediumFixture: Partial<Task> = {
  id: 1,
  uuid: '0802715b-0da0-466a-8149-86a266e24b0e',
  title: 'Review result',
  description: 'misc',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  priority: TaskPriority.Medium,
  status: TaskStatus.InProgress,
  testResultId: testResultFixture.id,
  patientId: patientForProfileTestResultsFixture.id,
  creatorId: staffClinicManagerFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  finalReportId: finalReportFixture.id,
  automatedTaskType: AutomatedTaskType.ReferralRequired,
  isRead: true,
}

export const taskCriticalFixture: Partial<Task> = {
  id: 2,
  uuid: '16d0f2f9-7c72-4d1b-bbed-cead9d9f53d3',
  title: 'Priority Consult Request',
  description: 'Description',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 0),
  priority: TaskPriority.Critical,
  status: TaskStatus.Completed,
  patientId: null,
  testResultId: testResultPanelFixture.id,
  creatorId: staffClinicManagerFixture.id,
  finalReportId: finalReportCompletedFixture.id,
  assigneeId: staffClinicManagerFixture.id,
  automatedTaskType: AutomatedTaskType.PeriodReported1stDay,
}

export const taskLowFixture: Partial<Task> = {
  id: 3,
  uuid: '38f5ac84-1740-4f2c-9421-400284135a0b',
  title: 'Medical Release',
  description: 'Desc low',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  priority: TaskPriority.Low,
  status: TaskStatus.Cancelled,
  patientId: patientClinicEmrListKimLeeFixture.id,
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  automatedTaskType: AutomatedTaskType.DeletedTaskWithOrderAction,
  testOrderId: testOrderFixture.id,
}

export const taskSendResultsOnHoldFixture: Partial<Task> = {
  id: 4,
  uuid: '66a74345-a187-4011-a730-550d49172996',
  title: 'Patient Photo Verification',
  description: 'About photo',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 7),
  priority: TaskPriority.High,
  status: TaskStatus.OnHold,
  patientId: partnerPatientForProfileTestResultsFixture.id,
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffManagerRoleFixture.id,
  isRead: true,
}

export const taskToEditFixture: Partial<Task> = {
  id: 5,
  uuid: '66a74345-a187-4011-a730-550d49172997',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 7),
  creatorId: staffClinicManagerFixture.id,
  assigneeId: staffClinicManagerFixture.id,
}

export const taskForStatusFilterFixture: Partial<Task> = {
  id: 6,
  uuid: '66a74345-a187-4011-a730-550d49172966',
  dueDate: dateTimeUtil.addDays(dateTimeUtil.now(), 5),
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Low,
  patientId: patientClinicSchedulingFixture.id,
  status: TaskStatus.InProgress,
}

export const taskForPatientNameSortingFixture: Partial<Task> = {
  id: 7,
  uuid: '66a74345-a187-4011-a730-550d49172977',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Low,
  patientId: partnerIntakeJourneyTypeFixture.id,
  status: TaskStatus.InProgress,
}

export const taskForPatientNameSortingWithoutPatientFixture: Partial<Task> = {
  id: 8,
  uuid: '66a74345-a187-4011-a730-550d49172988',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Low,
  status: TaskStatus.InProgress,
}

export const taskForAssigneeFilterFixture: Partial<Task> = {
  id: 9,
  uuid: '66a74345-a187-4011-a730-550d49172999',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffManagerRoleFixture.id,
  priority: TaskPriority.Low,
  status: TaskStatus.InProgress,
}

export const taskForCreatorFilterFixture: Partial<Task> = {
  id: 10,
  uuid: '66a74345-a187-4011-a730-550d49172910',
  dueDate: dateTimeUtil.subHours(dateTimeUtil.now(), 3),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Low,
  status: TaskStatus.InProgress,
}

export const taskForCreateAppointmentWithTestOrderFixture: Partial<Task> = {
  id: 11,
  uuid: '969676da-21be-4a9d-850c-38bcf79d5223',
  dueDate: dateTimeUtil.subHours(dateTimeUtil.now(), 3),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.InProgress,
}

export const taskForCreateAppointmentWithDifferentTestTypeFixture: Partial<Task> = {
  id: 12,
  uuid: 'd816fa97-fa01-446e-829e-e3461da4fc14',
  dueDate: dateTimeUtil.subHours(dateTimeUtil.now(), 3),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.InProgress,
}

export const taskForCreateAppointmentWithDifferentTestPanelFixture: Partial<Task> = {
  id: 13,
  uuid: 'e78632bd-68f0-4cb5-ba41-103af24fe45d',
  dueDate: dateTimeUtil.subHours(dateTimeUtil.now(), 3),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.InProgress,
}

export const taskForIVFPlanFixture: Partial<Task> = {
  id: 14,
  uuid: 'e79622bd-68f0-4cb5-ba41-103af24fe45d',
  dueDate: dateTimeUtil.subHours(dateTimeUtil.now(), 3),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  priority: TaskPriority.Critical,
  status: TaskStatus.InProgress,
  patientPlanId: patientPlanFixture.id,
}

export const taskReadFixture: Partial<Task> = {
  id: 15,
  uuid: 'e79622bd-18f0-4cb5-ba41-103af24fe45d',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  creatorId: stafForUnreadTasksBadgeFixture.id,
  assigneeId: stafForUnreadTasksBadgeFixture.id,
  isRead: true,
}

export const taskUnreadFixture: Partial<Task> = {
  id: 16,
  uuid: 'e79622bd-28f0-4cb5-ba41-103af24fe45d',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  creatorId: stafForUnreadTasksBadgeFixture.id,
  assigneeId: stafForUnreadTasksBadgeFixture.id,
  isRead: false,
}

export const taskUnreadForTaskListFixture: Partial<Task> = {
  id: 17,
  uuid: 'e79422bd-28f0-4cb5-ba41-103af24fe45d',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  creatorId: stafForUnreadTasksBadgeFixture.id,
  assigneeId: stafForUnreadTasksBadgeFixture.id,
  isRead: false,
}

export const taskUnreadReferralRequiredFixture: Partial<Task> = {
  id: 18,
  uuid: '0803714b-0da0-466a-8149-86a266e24b0e',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  creatorId: staffClinicManagerFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  automatedTaskType: AutomatedTaskType.ReferralRequired,
  isRead: false,
}

export const taskReassignFixture: Partial<Task> = {
  id: 19,
  uuid: 'c25ebae6-a20e-4115-8765-afbc082a7631',
  title: 'Patient taskReassign',
  description: 'About photo',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 7),
  priority: TaskPriority.High,
  status: TaskStatus.Pending,
  patientId: patientForReassignTaskFixture.id,
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffManagerRoleFixture.id,
  isRead: true,
}

export const taskPlansV2Fixture: Partial<Task> = {
  id: 20,
  uuid: 'a29422bd-28f0-4cb5-ba41-103af24fe45d',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  isRead: false,
  patientPlanId: patientPlanForPatientStatusFixture.id,
}

export const taskForExternalResultFixture: Partial<Task> = {
  id: 21,
  uuid: 'f5043a11-5a54-492a-9250-b0a5ebf64da4',
  dueDate: dateTimeUtil.addDays(dateTimeUtil.now(), 5),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  isRead: false,
  testResultId: testResultForTestPanelSemenAnalysisRecentFixture.id,
}

export const taskPatientCallbackFixture: Partial<Task> = {
  id: 22,
  uuid: 'a5033a11-2a54-492a-9250-b0a5ebf64da4',
  dueDate: dateTimeUtil.toDate('2022-02-02T13:00:00Z'),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  isRead: false,
  patientEncounterId: encounterShortSearchStringSuccessFixture.id,
  description: 'taskPatientCallbackFixture',
}

export const taskPatientCallbackToUpdateFixture: Partial<Task> = {
  id: 23,
  uuid: 'a5033a11-2a54-492a-9250-a0a3ebf64da4',
  dueDate: dateTimeUtil.toDate('2022-02-02T13:00:00Z'),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  isRead: false,
  patientEncounterId: encounterToUpdateCallbackFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  description: 'taskPatientCallbackToUpdateFixture',
}

export const taskPatientCallbackToUpdateWithoutDateChangeFixture: Partial<Task> = {
  id: 24,
  uuid: 'a5033a11-2a54-492a-9250-1aa3ebf64da4',
  dueDate: dateTimeUtil.toDate('2022-02-05T13:00:00Z'),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  isRead: false,
  patientEncounterId: encounterToUpdateCallbackWithoutDueDateChangeFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  description: 'taskPatientCallbackToUpdateWithoutDateChangeFixture',
}

export const taskPatientCallbackStaffNoteFixture: Partial<Task> = {
  id: 25,
  uuid: 'a1023a33-2a54-492a-92c2-b3a3eaf64da4',
  dueDate: dateTimeUtil.toDate('2022-02-02T13:00:00Z'),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  isRead: false,
  patientStaffNoteId: staffNoteShortSearchStringSuccessFixture.id,
  description: 'taskPatientCallbackStaffNoteFixture',
}

export const taskPatientCallbackStaffNoteToUpdateFixture: Partial<Task> = {
  id: 26,
  uuid: 'a1033a13-2a54-492a-92c2-b3a3ebf64da4',
  dueDate: dateTimeUtil.toDate('2022-02-02T13:00:00Z'),
  creatorId: staffManagerRoleFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  isRead: false,
  patientStaffNoteId: staffNoteToUpdateCallbackFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  description: 'taskPatientCallbackStaffNoteToUpdateFixture',
}
export const taskForAbnormalResultFixture: Partial<Task> = {
  id: 27,
  uuid: '1115ea72-df1c-41e5-b2b0-c41b65e977ee',
  title: 'Medical Release',
  description: 'Abnormal Results',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  priority: TaskPriority.High,
  status: TaskStatus.Pending,
  patientId: patientClinicEmrListKimLeeFixture.id,
  creatorId: staffWithMockedAssignorIdFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  automatedTaskType: AutomatedTaskType.HighPriorityResultReview,
  testOrderId: testOrderFixture.id,
  testResultId: testResultPlanGroupTypeFixture.id,
}

export const taskForSoftDeletedPatientFixture: Partial<Task> = {
  id: 28,
  uuid: '0802715b-2da1-365a-8249-16a266e24b0e',
  title: 'Soft deleted patient',
  description: 'misc',
  dueDate: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  priority: TaskPriority.Medium,
  status: TaskStatus.InProgress,
  testResultId: testResultFixture.id,
  patientId: patientWithoutDoctorSoftDeletedFixture.id,
  creatorId: staffClinicManagerFixture.id,
  assigneeId: staffWithMockedAssignorIdFixture.id,
  finalReportId: finalReportFixture.id,
  automatedTaskType: AutomatedTaskType.PatientCallback,
  isRead: true,
}
