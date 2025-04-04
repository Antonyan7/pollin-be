import {PushNotificationType} from '@libs/common/enums/push-notification.enum'
import {REGISTRATION_TOKEN_NOT_REGISTERED} from '@libs/common/errors/push-notification.errors'

function InvalidTokenError(): void {
  this.errorInfo = {code: REGISTRATION_TOKEN_NOT_REGISTERED}
}
InvalidTokenError.prototype = Error.prototype
export const invalidTokenMedication = 'invalid-token-medication'
export const invalidTokenPartnerIntakeReminder = 'invalid-token-partner-intake-reminder'
export const invalidTokenInvitePartnerReminder = 'invalid-token-invite-partner-reminder'
export const invalidTokenPatientIntakeReminder = 'invalid-token-patient-intake-reminder'
export const invalidTokenAlertReminder = 'invalid-token-patient-alert-reminder'
export const invalidTokenPatientPlanReminder = 'invalid-token-patient-plan-reminder'

export class PushNotificationAdapter {
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
    if (
      [
        invalidTokenMedication,
        invalidTokenPartnerIntakeReminder,
        invalidTokenInvitePartnerReminder,
        invalidTokenPatientIntakeReminder,
        invalidTokenAlertReminder,
        invalidTokenPatientPlanReminder,
      ].includes(registrationToken)
    ) {
      throw new InvalidTokenError()
    }
    return `pushNotificationResponseMessageIdFromMock ${title}, ${body}, ${registrationToken}, ${type}, ${id} `
  }
}
