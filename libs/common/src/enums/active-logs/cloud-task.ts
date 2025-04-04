export enum CloudTaskFunctions {
  CreateTask = 'CreateTask',
  DeleteTask = 'DeleteTask',
  GetScheduleTimestamp = 'GetScheduleTimestamp',
}

export enum CloudTaskAction {
  CreateCloudTask = 'CreateCloudTask',
  DeleteCloudTask = 'DeleteCloudTask',
  DeleteCloudTaskNotFound = 'DeleteCloudTaskNotFound',
  ScheduleTimeInThePast = 'ScheduleTimeInThePast',
  ScheduleTimeIsAfterLimit = 'ScheduleTimeIsAfterLimit',
}
