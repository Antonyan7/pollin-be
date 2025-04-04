export enum StripeFunctions {
  CreateUser = 'CreateUser',
  CustomerEphemeralKeys = 'CustomerEphemeralKeys',
  SetupIntentCreate = 'SetupIntentCreate',
  InitializeCustomer = 'InitializeCustomer',
  SetupIntentRetrieve = 'SetupIntentRetrieve',
  PaymentIntentRetrieve = 'PaymentIntentRetrieve',
  PaymentMethodRetrieve = 'PaymentMethodRetrieve',
  CreatePaymentIntent = 'CreatePaymentIntent',
  CancelPaymentIntent = 'CancelPaymentIntent',
  CapturePaymentIntent = 'CapturePaymentIntent',
}

export enum StripeEvent {
  Failure = 'Failure',
  Info = 'Info',
}
