/**
 * Stripe webhook will decide which action should be invoked
 */
export enum CryoSubscriptionEventActionType {
  /** Reminder 7d before renewal */
  SendRenewalReminder = 'SendRenewalReminder',

  /** Succesfull charge */
  SendPaymentReceipt = 'SendPaymentReceipt',

  /** First attempt failed */
  SendPaymentFailAlert = 'SendPaymentFailAlert',

  /** A day before second attempt */
  SendSecondAttemptReminder = 'SendSecondAttemptReminder',

  /** Second attempt failed */
  SendFinalFailedPayment = 'SendFinalFailedPayment',

  /** Invoice remains unpaid on day 35 from renewal */
  SendRenewalArrears = 'SendRenewalArrears',
}
