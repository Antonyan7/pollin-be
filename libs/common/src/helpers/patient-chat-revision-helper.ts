import {firestore} from 'firebase-admin'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import CollectionReference = firestore.CollectionReference

export const updatePatientChatRevision = async (
  authUserId: string,
  newChatRevisionId: string,
  patientChatRevisionCollection: CollectionReference,
): Promise<void> => {
  try {
    const patientChatRevisionDocRef = patientChatRevisionCollection.doc(authUserId)
    const docSnapshot = await patientChatRevisionDocRef.get()

    if (docSnapshot.exists) {
      await patientChatRevisionDocRef.update({
        chatRevisionId: newChatRevisionId,
      })
      StructuredLogger.info(
        activityLogs.PushNotificationFunctions.SendNotificationOnChatMessage,
        activityLogs.PushNotificationActions.SendNotificationOnChatMessage,
        {
          message: `Successfully updated chatRevisionId for user ${authUserId}`,
          authUserId,
          newChatRevisionId,
        },
      )
    } else {
      await patientChatRevisionDocRef.set({
        chatRevisionId: newChatRevisionId,
      })
      StructuredLogger.info(
        activityLogs.PushNotificationFunctions.SendNotificationOnChatMessage,
        activityLogs.PushNotificationActions.SendNotificationOnChatMessage,
        {
          message: `No document found for user ${authUserId}, created a new document.`,
          authUserId,
          newChatRevisionId,
        },
      )
    }
  } catch (error) {
    StructuredLogger.info(
      activityLogs.PushNotificationFunctions.SendNotificationOnChatMessage,
      activityLogs.PushNotificationActions.SendNotificationOnChatMessage,
      {
        message: 'Error updating or creating document',
        authUserId,
        newChatRevisionId,
        errorInfo: error,
      },
    )
  }
}
