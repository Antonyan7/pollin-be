export enum PaymentOrdersFunction {
  GeneratePaymentReceiptPDF = 'GeneratePaymentReceiptPDF',
  HandlerWireTransferPayment = 'HandlerWireTransferPayment',
  UploadPaymentReceiptPDF = 'UploadPaymentReceiptPDF',
  HandlerProcessPaymentOrderForWireTransfer = 'HandlerProcessPaymentOrderForWireTransfer',
}

export enum PaymentOrdersAction {
  SkipWireTransferPaymentEmailSending = 'SkipWireTransferPaymentEmailSending',
  HandlerWireTransferPaymentStarted = 'HandlerWireTransferPaymentStarted',
  GeneratePaymentReceiptPDFStarted = 'GeneratePaymentReceiptPDFStarted',
  GeneratePaymentReceiptPDFFailed = 'GeneratePaymentReceiptPDFFailed',
  ProcessPaymentOrderForWireTransferStarted = 'ProcessPaymentOrderForWireTransferStarted',
  PaymentOrderNotFound = 'PaymentOrderNotFound',
  HandlerProcessPaymentOrderForWireTransferFailed = 'HandlerProcessPaymentOrderForWireTransferFailed',
  HandlerWireTransferPaymentFailed = 'HandlerWireTransferPaymentFailed',
  UploadOfReceiptPDFStarted = 'UploadOfReceiptPDFStarted',
  UploadPaymentReceiptPDFFailed = 'UploadPaymentReceiptPDFFailed',
  CreatedReportPeriodMilestone = 'CreatedReportPeriodMilestone',
}
