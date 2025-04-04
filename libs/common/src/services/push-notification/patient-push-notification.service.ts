import {PatientPushNotification} from '@libs/data-layer/apps/users/entities/typeorm'
import {StructuredLogger} from '@libs/common'
import {FirebaseAdminProvider, initFireORM} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {PushNotificationInternalType} from '@libs/services-common/enums'
import {Injectable} from '@nestjs/common'
import {PushNotificationAdapter} from '@libs/common/adapters/'
import {processTemplateString} from './helpers'
import {
  internalNotificationTypeToDestinationType,
  pushNotificationBody,
  pushNotificationTitle,
} from './notification-data-mapping'
import {isUnregisteredToken} from '@libs/common/utils/push-notification'
import {UNREGISTERED_TOKEN} from '@libs/common/errors/push-notification.errors'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {PatientPushNotificationRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {PushNotificationTemplateRepository} from '@libs/data-layer/apps/notification'

// declared to have shorted Logging in service
const logFunc = activityLogs.PushNotificationFunctions
const logAct = activityLogs.PushNotificationActions

FirebaseAdminProvider.init()
initFireORM()

@Injectable()
export class PatientPushNotificationService {
  constructor(
    private readonly patientPushNotificationRepository: PatientPushNotificationRepository,
    private readonly pushNotificationTemplateRepository: PushNotificationTemplateRepository,
  ) {}

  /** Send push notification using django template */
  async sendPushNotificationByTemplate(data: {
    patientId: number
    type: PushNotificationInternalType
    uuid: string
  }): Promise<void | string> {
    const {patientId, type, uuid} = data

    try {
      this.logInfo(
        `sendPushNotificationByTemplate Starts patientId: ${patientId}, type: ${type}, uuid: ${uuid}`,
      )

      const pushNotificationTemplate =
        await this.pushNotificationTemplateRepository.findOneByType(type)

      if (!pushNotificationTemplate) {
        this.logInfo(`sendPushNotificationByTemplate skip, pushNotificationTemplate not found`)
        return 'pushNotificationTemplate not found'
      }

      if (pushNotificationTemplate.disabled) {
        this.logInfo(`sendPushNotificationByTemplate skip, pushNotificationTemplate is disabled`)
        return 'pushNotificationTemplate is disabled'
      }

      await this.sendPushNotificationWithTitleAndBody({
        patientId,
        type,
        uuid,
        title: pushNotificationTemplate.title,
        body: pushNotificationTemplate.body,
      })
      this.logInfo(`sendPushNotificationByTemplate succeed`)
    } catch (_error) {
      this.logInfo(
        `sendPushNotificationByTemplate failed, patientId: ${patientId}, type: ${type}, uuid: ${uuid}`,
      )
    }
  }

  /** Send without template, with static title and body
   * @deprecated  use sendPushNotificationByTemplate instead for new push notifications
   */
  async sendPushNotification(data: {
    patientId: number
    type: PushNotificationInternalType
    uuid: string
    templateParams?: Record<string, string>
  }): Promise<void> {
    const {patientId, type, uuid, templateParams} = data
    await this.sendPushNotificationWithTitleAndBody({
      patientId,
      type,
      uuid,
      title: processTemplateString(pushNotificationTitle.get(type), templateParams),
      body: processTemplateString(pushNotificationBody.get(type), templateParams),
    })
  }

  /**
   * Trying to send PushNotification if patient has enabled it
   * Even with internal error - NOT throwing exception
   * If token is expired - removing it from db without throwing exception too
   */
  private async sendPushNotificationWithTitleAndBody(data: {
    patientId: number
    type: PushNotificationInternalType
    title: string
    body: string
    uuid: string
    templateParams?: Record<string, string>
  }): Promise<void> {
    const {patientId, type, uuid, title, body} = data
    let patientPushNotification: PatientPushNotification //to use in catch

    try {
      this.logInfo(
        `sendPushNotification Starts patientId: ${patientId}, type: ${type}, uuid: ${uuid}`,
      )

      const pushNotificationAdapter = new PushNotificationAdapter()

      patientPushNotification = await this.getPatientPushNotification(patientId)

      if (!this.isPushNotificationsEnabled(patientPushNotification)) {
        this.logInfo(`Skip sendPushNotification, patient has disabled pushNotification`)
        return
      }

      if (!patientPushNotification?.registrationToken) {
        StructuredLogger.error(
          logFunc.SendPushNotificationCommon,
          logAct.PatientDoesntHaveRegistrationToken,
          {
            message: `sendPushNotification: patient has patientPushNotification, and pushes is enabled, but registrationToken is missing`,
          },
        )
      }

      this.logInfo(
        `Sending push notification, patientId: ${patientId}, patientPushNotificationId: ${patientPushNotification.id}`,
      )

      const responseMessageId = await pushNotificationAdapter.send({
        title,
        body,
        registrationToken: patientPushNotification.registrationToken,
        type: internalNotificationTypeToDestinationType.get(type),
        id: uuid,
      })

      this.logInfo(
        `sendPushNotificationCommon succeed, patientId: ${patientId}, responseMessageId: ${responseMessageId}`,
      )
    } catch (error) {
      await this.deleteExpiredTokenWithoutException({
        error,
        patientPushNotification,
        patientId,
        type,
        uuid,
      })
    }
  }

  private async deleteExpiredTokenWithoutException(data: {
    error: Error & {errorInfo?: {code: string}}
    patientPushNotification: PatientPushNotification | null
    patientId: number
    type: PushNotificationInternalType
    uuid: string
  }): Promise<void> {
    const {error, patientPushNotification, patientId, type, uuid} = data

    this.logInfo(
      `sendPushNotificationCommon failed, patientId: ${patientId}, type: ${type}, uuid: ${uuid}`,
    )

    // if it old or softDeleted patient with expired registrationToken - delete that token , and do not throw exception
    if (isUnregisteredToken(error?.errorInfo?.code)) {
      StructuredLogger.warn(
        activityLogs.PushNotificationFunctions.HandleSendNotificationError,
        activityLogs.PushNotificationActions.UnregisteredToken,
        {
          message: UNREGISTERED_TOKEN,
          errorInfo: {message: error.errorInfo.code},
        },
      )
      if (patientPushNotification?.registrationToken) {
        await this.patientPushNotificationRepository.delete({
          patientId,
          registrationToken: patientPushNotification.registrationToken,
        })
      }
    } else {
      StructuredLogger.warn(
        activityLogs.PushNotificationFunctions.HandleSendNotificationError,
        activityLogs.PushNotificationActions.HandleSendNotificationErrorFailed,
        {
          ...parseError(error),
          message: `Send push notification failed. type: ${type}`,
        },
      )
    }
  }

  private async getPatientPushNotification(patientId: number): Promise<PatientPushNotification> {
    const patientPushNotification = await this.patientPushNotificationRepository.findOneBy({
      patientId,
    })

    if (!patientPushNotification) {
      StructuredLogger.info(
        logFunc.GetPatientPushNotificationForInit,
        logAct.PatientDoesntHavePatientPushNotificationData,
        {
          message: `Patient doesnt have PatientPushNotification data. PatientId= ${patientId}`,
        },
      )
      return null
    }

    return patientPushNotification
  }

  isPushNotificationsEnabled(patientPushNotification: PatientPushNotification): boolean {
    return patientPushNotification?.pushNotificationsEnabled
  }

  logInfo(message: string): void {
    StructuredLogger.info(logFunc.SendPushNotificationCommon, activityLogs.CommonAction.Info, {
      message,
    })
  }
}
