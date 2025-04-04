import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {Type} from 'protobufjs'
import {CloudTasksClient, protos} from '@google-cloud/tasks'
import {NestprojectConfigService} from '../services'
import {DateTimeUtil, isE2eTestingBuild, Timestamp} from '../utils'
import {envOrConfigProjectId} from '@config/index'
import {CloudTaskExecutionType} from '../helpers/background-api-path.helper'

export class CloudTaskAdapter {
  private cloudTaskClient = new CloudTasksClient()

  private configService = NestprojectConfigService.getInstance()
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))
  private region = this.configService.get<string>('DEFAULT_GCP_REGION')

  private serviceAccountEmail: string
  private queuePath: string

  constructor(
    private queueName: string,
    executionType = CloudTaskExecutionType.CloudFunction,
  ) {
    this.queuePath = this.cloudTaskClient.queuePath(envOrConfigProjectId(), this.region, queueName)

    this.serviceAccountEmail =
      executionType === CloudTaskExecutionType.CloudFunction
        ? this.configService.get<string>('CF_INVOKER')
        : this.configService.get<string>('BACKGROUND_CLOUD_RUN_INVOKER')
  }

  async createTask<T>(payload: {
    data: T
    schemaType: Type
    targetURL: string
    targetDate?: Date
    allowImmediateExecution?: boolean
  }): Promise<string> {
    try {
      if (isE2eTestingBuild()) {
        StructuredLogger.warn(
          activityLogs.CloudTaskFunctions.CreateTask,
          'skippedIsE2eTestingBuild',
          {},
        )
        return 'cloudTaskCreateTaskE2eResponse'
      }

      const {data, schemaType, targetURL, targetDate = null} = payload

      StructuredLogger.info(
        activityLogs.CloudTaskFunctions.CreateTask,
        activityLogs.CloudTaskAction.CreateCloudTask,
        {
          queueName: this.queuePath,
        },
      )

      const bodyData = encodePubSubMessage<T>(data, schemaType)

      const task: protos.google.cloud.tasks.v2.ITask = {
        httpRequest: {
          httpMethod: 'POST',
          url: targetURL,
          oidcToken: {
            serviceAccountEmail: this.serviceAccountEmail,
            audience: targetURL,
          },
          headers: {
            'Content-Type': 'text/plain',
          },
          body: Buffer.from(bodyData).toString('base64'),
        },
      }

      if (targetDate) {
        task.scheduleTime = this.getScheduleTimestamp(targetDate, payload.allowImmediateExecution)
      }

      const [response] = await this.cloudTaskClient.createTask({parent: this.queuePath, task})

      StructuredLogger.info(
        activityLogs.CloudTaskFunctions.CreateTask,
        activityLogs.CloudTaskAction.CreateCloudTask,
        {
          taskName: response.name,
        },
      )

      const taskId = response.name.split('/').pop()

      return taskId
    } catch (error) {
      StructuredLogger.error(
        activityLogs.CloudTaskAdapterFunctions.CreateTask,
        activityLogs.CloudTaskAdapterActions.FailCreateCloudTaskInAdapter,
        error,
      )
      throw new Error(error)
    }
  }

  async deleteTask(taskName: string): Promise<void> {
    try {
      if (isE2eTestingBuild()) {
        StructuredLogger.warn(
          activityLogs.CloudTaskFunctions.DeleteTask,
          'skippedIsE2eTestingBuild',
          {},
        )
        return
      }

      const taskPath = this.cloudTaskClient.taskPath(
        envOrConfigProjectId(),
        this.region,
        this.queueName,
        taskName,
      )

      StructuredLogger.info(
        activityLogs.CloudTaskFunctions.DeleteTask,
        activityLogs.CloudTaskAction.DeleteCloudTask,
        {
          taskPath,
        },
      )

      await this.cloudTaskClient
        .deleteTask({
          name: taskPath,
        })
        .catch((error) =>
          StructuredLogger.info(
            activityLogs.CloudTaskFunctions.DeleteTask,
            activityLogs.CloudTaskAction.DeleteCloudTaskNotFound,
            error,
          ),
        )
    } catch (error) {
      StructuredLogger.error(
        activityLogs.CloudTaskAdapterFunctions.DeleteTask,
        activityLogs.CloudTaskAdapterActions.FailDeleteCloudTaskInAdapter,
        error,
      )
      throw new Error(error)
    }
  }

  private getScheduleTimestamp(scheduleDateUTC: Date, allowImmediateExecution: boolean): Timestamp {
    const dateNow = this.dateTimeUtil.now()

    if (dateNow > scheduleDateUTC) {
      if (allowImmediateExecution) {
        return this.dateTimeUtil.getFirestoreTimeStampFromDate(
          this.dateTimeUtil.addSeconds(dateNow, 10),
        )
      }

      StructuredLogger.error(
        activityLogs.CloudTaskFunctions.GetScheduleTimestamp,
        activityLogs.CloudTaskAction.ScheduleTimeInThePast,
        {
          date: scheduleDateUTC,
        },
      )
      throw new Error('Schedule time in the past')
    }

    const maxScheduleLimitDays = this.configService.get<number>(
      'MAX_CLOUD_TASK_SCHEDULE_LIMIT_DAYS',
    )
    if (this.dateTimeUtil.differenceInDays(scheduleDateUTC, dateNow) > maxScheduleLimitDays) {
      StructuredLogger.warn(
        activityLogs.CloudTaskFunctions.GetScheduleTimestamp,
        activityLogs.CloudTaskAction.ScheduleTimeIsAfterLimit,
        {
          date: scheduleDateUTC,
          maxScheduleLimitDays,
        },
      )
      return this.dateTimeUtil.getFirestoreTimeStampFromDate(
        this.dateTimeUtil.addDays(dateNow, maxScheduleLimitDays),
      )
    }

    return this.dateTimeUtil.getFirestoreTimeStampFromDate(scheduleDateUTC)
  }
}
