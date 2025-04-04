/**
 * Generic response status
 */
export class ResponseStatus {
  code: ResponseStatusCodes | string

  message: string
}

/**
 * Default status codes
 */
export enum ResponseStatusCodes {
  Succeed = 'succeed',
  Failed = 'failed',
  Invalid = 'invalid',
  BadRequest = 'bad_request',
  InternalServerError = 'internal_server_error',
  PaymentIntentFailed = 'payment_intent_create_failed',
  SetupIntentFailed = 'setup_intent_usage_failed',
  PriceUpdated = 'price_updated',
  OrderUpdated = 'order_updated',
  InvalidCart = 'invalid_cart',
  EmptyCart = 'empty_cart',
  Unauthorized = 'unauthorized',
  NotFound = 'not_found',
  UnknownError = 'unknown_error',
  UnprocessableEntity = 'unprocessable_entity',
  MfaRequired = 'mfa_required',
  TimeslotNotAvailable = 'timeslot_not_available',
  PaymentInfoNotAvailable = 'payment_info_not_available',
  RevisionChanged = 'revision_changed',
  TerminateFlow = 'terminate_flow',
  CrossRegistration = 'cross_registration',
  Conflict = 'conflict',
  PendingConsent = 'pending_consent',
  Deleted = 'deleted',
}
