import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {CloudTaskAdapter} from '@libs/common/adapters'
import {AppointmentStatus, CloudFunctionName} from '@libs/common/enums'
import {AppointmentUpdatedPubSubPayload} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {
  SendAppointmentReminderPubSubPayload,
  SendAppointmentReminderSchema,
} from '@libs/common/model/proto-schemas/send-virtual-appointment-reminder.schema'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  CloudTask,
  CloudTaskType,
} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {CloudTaskRepository} from '@libs/data-layer/apps/users/repositories/fireorm/cloud-task.repository'
import {ValidConfig} from '@config/valid-config.util'

const saveCloudTaskToFirestore = async (
  type: CloudTaskType,
  cloudTaskId: string,
  payload: {patientId: number; appointmentId?: number},
): Promise<CloudTask> => {
  const cloudTaskRepository = new CloudTaskRepository()

  return cloudTaskRepository.saveCloudTask({type, cloudTaskId, ...payload})
}

const requiresReminderChange = ({
  oldAppointment,
  newAppointment,
}: AppointmentUpdatedPubSubPayload): boolean => {
  return (
    /**date changed */
    ((oldAppointment.date || newAppointment.date) && oldAppointment.date !== newAppointment.date) ||
    /**service provider changed */
    ((oldAppointment.serviceProviderId || newAppointment.serviceProviderId) &&
      oldAppointment.serviceProviderId !== newAppointment.serviceProviderId) ||
    /**service type changed */
    ((oldAppointment.serviceTypeId || newAppointment.serviceTypeId) &&
      oldAppointment.serviceTypeId !== newAppointment.serviceTypeId) ||
    /**appointment cancelled */
    [AppointmentStatus.Cancelled, AppointmentStatus.NoShow].includes(newAppointment.status)
  )
}

const requiresReminderEmail = (appointment: Appointment, cloudTasksIds?: string[]): boolean =>
  (!cloudTasksIds || cloudTasksIds.length) &&
  ![AppointmentStatus.Cancelled, AppointmentStatus.NoShow].includes(appointment.status) &&
  !appointment.serviceType.isTentative

const removeAppointmentReminder = async (
  appointment: Appointment,
  cloudTaskAdapter: CloudTaskAdapter,
): Promise<string[]> => {
  const functionName = 'RemoveAppointmentReminder'

  const cloudTaskRepository = new CloudTaskRepository()
  const cloudTasks = await cloudTaskRepository.findByAppointmentIdAndType(
    appointment.id,
    CloudTaskType.AppointmentReminder,
  )

  StructuredLogger.info(functionName, 'CloudTasksToRemoveFound', {
    message: `Cloud task ids to remove: ${cloudTasks.map(({cloudTaskId}) => cloudTaskId)}`,
    appointmentId: appointment.id,
  })

  if (cloudTasks.length) {
    await Promise.all(
      cloudTasks.map(async (cloudTask) => {
        try {
          await cloudTaskRepository.delete(cloudTask.id)
          return cloudTaskAdapter.deleteTask(cloudTask.cloudTaskId)
        } catch (error) {
          StructuredLogger.error(functionName, 'FailedToDeleteTask', {
            message: `Failed to delete cloud task with id ${cloudTask.cloudTaskId}`,
            appointmentId: appointment.id,
            errMsg: error?.message,
          })
        }
      }),
    )

    return cloudTasks.map((cloudTask) => cloudTask.cloudTaskId)
  }

  return []
}

const createAppointmentReminder = async (
  appointment: Appointment,
  cloudTaskAdapter: CloudTaskAdapter,
  configService: NestprojectConfigService | ValidConfig,
): Promise<void> => {
  const functionName = `CreateAppointmentReminder`

  if (!requiresReminderEmail(appointment)) {
    StructuredLogger.info(functionName, 'CloudTaskCreationIsNotRequired', {
      message: `Appointment is ${appointment.status}`,
      appointmentId: appointment.id,
      isTentative: appointment.serviceType.isTentative,
      serviceTypeId: appointment.serviceType.id,
    })

    return
  }

  const dateTimeUtil = new DateTimeUtil()
  const cloudTaskId = await cloudTaskAdapter.createTask<SendAppointmentReminderPubSubPayload>({
    data: {
      patientId: appointment.patientId,
      appointmentId: appointment.id,
    },
    schemaType: SendAppointmentReminderSchema,
    targetURL:
      configService.get<string>('CF_GENERAL_PATH') + CloudFunctionName.SendAppointmentReminder,
    targetDate: dateTimeUtil.subHours(appointment.start, 24),
    allowImmediateExecution: true,
  })

  const firestoreCloudTask = await saveCloudTaskToFirestore(
    CloudTaskType.AppointmentReminder,
    cloudTaskId,
    {
      patientId: appointment.patientId,
      appointmentId: appointment.id,
    },
  )
  StructuredLogger.info(functionName, 'CloudTaskWasCreated', {
    message: `Cloud task name: ${firestoreCloudTask.cloudTaskId}. Firestore record: ${firestoreCloudTask.id}`,
    appointmentId: appointment.id,
  })
}

export const AppointmentReminderHelpers = {
  requiresReminderChange,
  createAppointmentReminder,
  requiresReminderEmail,
  removeAppointmentReminder,
}
