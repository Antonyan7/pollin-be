export interface IChatwootSMSAdapter {
  sendSMS(message: string, conversationId: string): Promise<{id: string}>

  getConversationId(
    patientUUID: string,
    phoneNumber: string,
    patientFullName: string,
  ): Promise<string>
}

export type ChatwootContact = {
  id: string
  phone_number: string
  custom_attributes: {
    webhook_payload_validation_token: string
  }
}

export type ChatwootConversation = {
  id: string
  inbox_id: string
}

export type ChatwootMessage = {
  id: string
  content: string
  message_type: 'outgoing' | 'incoming'
}

export type ChatwootConfig = {
  apiUrl: string
  accessToken: string
  accountId: string
  pushValidationPrivateKey: string
}

export enum ChatwootError {
  ContactWithPhoneNumberAlreadyExists = 'ContactWithPhoneNumberAlreadyExists',
}
