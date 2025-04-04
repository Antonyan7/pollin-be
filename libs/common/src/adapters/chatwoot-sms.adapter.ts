import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {NestprojectConfigService, StructuredLogger} from '@libs/common'
import {cleanPhoneNumber} from '../helpers/phone-number.helper'
import {getChatwootToken} from '../helpers/hash.helper'
import {sleep} from '../helpers/sleep.helper'
import {
  ChatwootConfig,
  ChatwootContact,
  ChatwootConversation,
  ChatwootError,
  ChatwootMessage,
  IChatwootSMSAdapter,
} from '../interfaces/chatwoot-sms.adapter'

export class ChatwootSMSAdapter implements IChatwootSMSAdapter {
  private readonly config: ChatwootConfig

  private readonly headers: Record<string, string>

  private readonly configService = NestprojectConfigService.getInstance()

  private readonly MAX_RETRIES = 2
  private readonly RETRY_DELAY = 1000 // ms

  constructor(private readonly inboxId: string) {
    const chatUrl = this.configService.get<string>('CONVERSATION_PLATFORM_URL')

    this.config = {
      apiUrl: chatUrl ? chatUrl + '/api/' : null,
      accessToken: this.configService.get<string>('CONVERSATION_PLATFORM_ACCESS_TOKEN'),
      accountId: this.configService.get<string>('CONVERSATION_PLATFORM_ACCOUNT_ID'),
      pushValidationPrivateKey: this.configService.get<string>(
        'CONVERSATION_PLATFORM_PUSH_VALIDATION_PRIVATE_KEY',
      ),
    }

    const missingFields = Object.entries(this.config)
      .filter(([_, value]) => !value)
      .map(([key]) => key)
    if (missingFields.length > 0) {
      throw new Error(`Missing required configuration: ${missingFields.join(', ')}`)
    }

    this.headers = this.getHeaders()
  }

  private async axiosWithRetry<T>(
    config: AxiosRequestConfig,
    context: string,
  ): Promise<AxiosResponse<T>> {
    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        return await axios(config)
      } catch (error) {
        StructuredLogger.warn(context, 'RetryAttempt', {
          attempt,
          errorInfo: {message: error},
        })

        if (attempt < this.MAX_RETRIES) {
          await sleep(this.RETRY_DELAY * attempt)
        }
      }
    }

    throw new Error(`Failed to ${context} after ${this.MAX_RETRIES} attempts`)
  }

  async sendSMS(message: string, conversationId: string): Promise<{id: string}> {
    try {
      if (!message?.trim()) {
        throw new Error('Message is required')
      }
      if (!conversationId?.trim()) {
        throw new Error('Conversation ID is required')
      }

      const response = await this.axiosWithRetry<ChatwootMessage>(
        {
          method: 'POST',
          headers: this.headers,
          url: `${this.config.apiUrl}v1/accounts/${this.config.accountId}/conversations/${conversationId}/messages`,
          data: {
            content: message,
            message_type: 'outgoing',
          },
        },
        'SendSMS',
      )

      StructuredLogger.info('SendSMS', 'MessageSent', {
        conversationId,
        messageId: response.data.id,
      })

      return {id: String(response.data.id)}
    } catch (error) {
      StructuredLogger.error('SendSMS', 'MessageSendFailed', {
        conversationId,
        errorInfo: {message: 'Error sending SMS'},
      })
      throw error
    }
  }

  async getConversationId(
    phoneNumber: string,
    patientUUID: string,
    patientFullName: string,
  ): Promise<string> {
    try {
      if (!phoneNumber?.trim()) {
        throw new Error('Phone number is required')
      }
      if (!patientUUID?.trim()) {
        throw new Error('Patient UUID is required')
      }
      if (!patientFullName?.trim()) {
        throw new Error('Patient full name is required')
      }

      let contact = await this.getContact(patientUUID)
      if (!contact) {
        contact = await this.createContact(patientUUID, patientFullName)
      }

      await this.updateContactInfoIfNeeded(contact, phoneNumber, patientUUID)

      return this.createConversation(phoneNumber, String(contact.id))
    } catch (error) {
      StructuredLogger.error('GetConversationId', 'ConversationCreationFailed', {
        errorInfo: {message: 'Error getting conversation'},
      })
      throw error
    }
  }

  private async createConversation(phoneNumber: string, contactId: string): Promise<string> {
    const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber)

    try {
      const response = await this.axiosWithRetry<ChatwootConversation>(
        {
          method: 'POST',
          headers: this.headers,
          url: this.config.apiUrl + `v1/accounts/${this.config.accountId}/conversations`,
          data: {
            source_id: cleanedPhoneNumber,
            inbox_id: this.inboxId,
            contact_id: contactId,
          },
        },
        'CreateConversation',
      )

      StructuredLogger.info('CreateConversation', 'ConversationCreated', {
        contactId,
        conversationId: response.data?.id,
      })
      if (response.data?.id) {
        return String(response.data.id)
      }

      return null
    } catch (error) {
      StructuredLogger.error('CreateConversation', 'ConversationCreationFailed', {
        contactId,
        errorInfo: {message: 'Error creating conversation'},
      })
      throw error
    }
  }

  private async getContact(patientUUID: string): Promise<ChatwootContact | null> {
    const response = await this.axiosWithRetry<{payload: ChatwootContact[]}>(
      {
        method: 'POST',
        url: this.config.apiUrl + `v1/accounts/${this.config.accountId}/contacts/filter`,
        headers: this.headers,
        data: {
          payload: [
            {
              attribute_key: 'identifier',
              filter_operator: 'equal_to',
              values: [patientUUID],
            },
          ],
        },
      },
      'GetContact',
    )

    const contact = response.data.payload[0]
    return contact ?? null
  }

  private async createContact(
    patientUUID: string,
    patientFullName: string,
  ): Promise<ChatwootContact> {
    const response = await this.axiosWithRetry<{payload: {contact: ChatwootContact}}>(
      {
        method: 'POST',
        headers: this.headers,
        url: this.config.apiUrl + `v1/accounts/${this.config.accountId}/contacts`,
        data: {
          name: patientFullName,
          identifier: patientUUID,
          custom_attributes: {
            webhook_payload_validation_token: this.getValidationToken(patientUUID),
          },
        },
      },
      'CreateContact',
    )

    if (response.data.payload.contact) {
      return response.data.payload.contact
    }

    throw new Error('Failed to create contact. Check phonenumber and patient uuid uniqueness')
  }

  private async updateContactInfoIfNeeded(
    contact: ChatwootContact,
    phoneNumber: string,
    patientUUID: string,
  ): Promise<void> {
    const validationToken = this.getValidationToken(patientUUID)

    if (
      contact?.phone_number === cleanPhoneNumber(phoneNumber) &&
      contact?.custom_attributes?.webhook_payload_validation_token === validationToken
    ) {
      return
    }

    StructuredLogger.info('UpdateContactPhoneNumber', 'ContactInfoNeedsUpdate', {
      contactId: contact?.id,
      patientUUID,
    })

    try {
      await this.axiosWithRetry<void>(
        {
          method: 'PATCH',
          headers: this.headers,
          url: this.config.apiUrl + `v1/accounts/${this.config.accountId}/contacts/${contact.id}`,
          data: {
            phone_number: cleanPhoneNumber(phoneNumber),
            custom_attributes: {
              webhook_payload_validation_token: validationToken,
            },
          },
        },
        'UpdateContactPhoneNumber',
      )
    } catch (error) {
      StructuredLogger.warn('UpdateContactPhoneNumber', 'ContactUpdateFailed', {
        contactId: contact?.id,
        errorInfo: {
          message: error,
        },
      })

      throw new Error(ChatwootError.ContactWithPhoneNumberAlreadyExists)
    }
  }

  private getValidationToken(identifier: string): string {
    return getChatwootToken(this.config.pushValidationPrivateKey, identifier)
  }

  private getHeaders(): Record<string, string> {
    return {
      api_access_token: this.config.accessToken,
    }
  }
}
