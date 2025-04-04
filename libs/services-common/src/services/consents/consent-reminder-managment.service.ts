import {Injectable} from '@nestjs/common'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {CloudTaskRepository} from '@libs/data-layer/apps/users/repositories/fireorm/cloud-task.repository'
import {CloudTaskAdapter} from '@libs/common/adapters'
import {ConsentActions, ConsentFunctions} from '@libs/common/enums/active-logs/consent'
import {
  SendConsentReminderPayload,
  SendConsentReminderSchema,
} from '@libs/common/model/proto-schemas/send-reminder-consent-package.schema'
import {
  CloudTask,
  CloudTaskType,
} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {
  BackgroundServiceAPI,
  CloudTaskExecutionType,
  getTargetURL,
} from '@libs/common/helpers/background-api-path.helper'

@Injectable()
export class ConsentsReminderManagmentService {
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )
  private readonly cloudTaskAdapter = new CloudTaskAdapter(
    this.configService.get<string>('QUEUE_NAME_SEND_PATIENT_CONSENT_PACKAGE_REMINDER'),
    CloudTaskExecutionType.BackgroundAPI,
  )

  constructor(
    private readonly configService: NestprojectConfigService,
    private readonly cloudTaskRepository: CloudTaskRepository,
  ) {}

  async createConsentPackageReminder(
    patientId: number, // main or one of partners
    patientConsentPackageId: number,
    oldCloudTask?: CloudTask,
  ): Promise<void> {
    const cloudTaskRecreatedTimes = oldCloudTask?.recreatedTimes ?? 0
    if (cloudTaskRecreatedTimes >= 2) {
      StructuredLogger.info(
        ConsentFunctions.CreateConsentPackageReminder,
        ConsentActions.NoReminderRequired,
        {patientId, patientConsentPackageId, message: 'Reminder was sent twice, aborting'},
      )
      return
    }

    const daysToAdd = cloudTaskRecreatedTimes === 0 ? 3 : 7
    const targetDate = this.dateTimeUtil.addDays(this.dateTimeUtil.now(), daysToAdd)

    const cloudTaskId = await this.cloudTaskAdapter.createTask<SendConsentReminderPayload>({
      data: {
        patientConsentPackageId,
        patientId,
        isScheduledExecution: true,
      },
      schemaType: SendConsentReminderSchema,
      targetURL: getTargetURL(BackgroundServiceAPI.SendConsentReminder),
      targetDate,
    })

    if (!cloudTaskId) {
      StructuredLogger.info(
        ConsentFunctions.CreateConsentPackageReminder,
        ConsentActions.CloudTaskCreationFailed,
        {patientId, patientConsentPackageId},
      )
      throw new Error('Couldnt create cloud task')
    }

    await this.cloudTaskRepository.saveCloudTask({
      type: CloudTaskType.ConsentPackageReminder,
      cloudTaskId,
      patientId,
      patientConsentPackageId,
      recreatedTimes: cloudTaskRecreatedTimes + 1,
    })
  }

  async deleteTasksAndReturnLatest(
    patientId: number,
    patientConsentPackageId: number,
  ): Promise<CloudTask> {
    const cloudTasks = await this.cloudTaskRepository.findForConsentPackageReminder(
      patientId,
      patientConsentPackageId,
    )

    await Promise.all(
      cloudTasks.map((cloudTask) =>
        Promise.all([
          this.cloudTaskRepository.delete(cloudTask.id),
          this.cloudTaskAdapter.deleteTask(cloudTask.cloudTaskId),
        ]),
      ),
    )

    return cloudTasks[0] ?? null
  }
}
