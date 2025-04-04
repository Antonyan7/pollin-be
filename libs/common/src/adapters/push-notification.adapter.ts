import {PushNotificationType} from '@libs/common/enums/push-notification.enum'
import {getMessaging, Message} from 'firebase-admin/messaging'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {StructuredLogger} from '@libs/common'
import {isUnregisteredToken} from '@libs/common/utils/push-notification'

export class PushNotificationAdapter {
  /**
   * 1. RegistrationToken is token from mobile for pushNotification
   * 2. Id using for Questionnaire, MedicationDetails, MilestoneAlert types
   *
   * 3. call "FirebaseAdminProvider.init()" before using this
   */
  public async send({
    title,
    body,
    registrationToken,
    type,
    id,
  }: {
    title: string
    body: string
    registrationToken: string
    type: PushNotificationType
    id?: string
  }): Promise<string> {
    try {
      StructuredLogger.info(
        activityLogs.PushNotificationAdapterFunctions.PushNotificationAdapterFunctionsSend,
        activityLogs.PushNotificationAdapterActions.Send,
        {
          message: `PushNotificationAdapter.send starts, type: ${type}, id: ${id}`,
        },
      )

      const message: Message = {
        notification: {title, body},
        data: {type, id: id ?? ''},
        token: registrationToken,
      }

      const responseMessageId = await getMessaging().send(message)
      return responseMessageId
    } catch (error) {
      StructuredLogger.error(
        activityLogs.PushNotificationFunctions.PushNotificationAdapterSend,
        activityLogs.PushNotificationActions.SendError,
        error,
      )
      // Throw original error in case of messaging error
      // to handle properly in upper try-catch
      if (isUnregisteredToken(error?.errorInfo?.code)) {
        throw error
      }
      throw new Error(error)
    }
  }
}
