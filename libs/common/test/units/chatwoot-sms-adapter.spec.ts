import axios from 'axios'
import {NestprojectConfigService} from '@libs/common'
import {ChatwootSMSAdapter} from '@libs/common/adapters/chatwoot-sms.adapter'
import {AxiosRequestConfig} from 'axios'
import {ChatwootError} from '@libs/common/interfaces/chatwoot-sms.adapter'
import {cleanPhoneNumber} from '@libs/common/helpers/phone-number.helper'

jest.mock('axios')
jest.mock('@libs/common/utils/structured-logger')

// eslint-disable-next-line max-lines-per-function
describe('ChatwootSMSAdapter', () => {
  const mockedAxios = axios as jest.MockedFunctionDeep<typeof axios>
  let adapter: ChatwootSMSAdapter

  beforeEach(() => {
    adapter = new ChatwootSMSAdapter('inbox-123')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('should throw error when config is missing', () => {
      jest.spyOn(NestprojectConfigService, 'getInstance').mockReturnValueOnce({
        get: () => undefined,
      } as unknown as NestprojectConfigService)

      expect(() => new ChatwootSMSAdapter('inbox-123')).toThrow('Missing required configuration')
    })

    it('should throw error with specific missing config fields', () => {
      const mockConfig = {
        CONVERSATION_PLATFORM_URL: 'test-url',
        CONVERSATION_PLATFORM_ACCESS_TOKEN: undefined,
        CONVERSATION_PLATFORM_ACCOUNT_ID: 'test-account',
        CONVERSATION_PLATFORM_PUSH_VALIDATION_PRIVATE_KEY: 'test-key',
      }

      jest.spyOn(NestprojectConfigService, 'getInstance').mockReturnValueOnce({
        get: (key: string) => mockConfig[key],
      } as unknown as NestprojectConfigService)

      expect(() => new ChatwootSMSAdapter('inbox-123')).toThrow(
        'Missing required configuration: accessToken',
      )
    })

    it('should initialize with valid config', () => {
      expect(adapter).toBeDefined()
    })
  })

  describe('sending SMS messages', () => {
    const validMessage = 'Test message'
    const validConversationId = 123

    it('should successfully send SMS', async () => {
      mockedAxios.mockResolvedValueOnce({data: {id: 123}})

      const result = await adapter.sendSMS(validMessage, String(validConversationId))

      expect(result).toEqual({id: '123'})
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          data: {
            content: validMessage,
            message_type: 'outgoing',
          },
        }),
      )
    })

    it('should validate inputs', async () => {
      await expect(adapter.sendSMS('', String(validConversationId))).rejects.toThrow(
        'Message is required',
      )
      await expect(adapter.sendSMS(validMessage, '')).rejects.toThrow('Conversation ID is required')
    })

    it('should retry on failure and succeed', async () => {
      mockedAxios.mockRejectedValueOnce(new Error('Network error'))
      mockedAxios.mockResolvedValueOnce({data: {id: 123}})

      const result = await adapter.sendSMS(validMessage, String(validConversationId))

      expect(result).toEqual({id: '123'})
      expect(mockedAxios).toHaveBeenCalledTimes(2) // Initial call + retry
    })

    it('should throw error after max retries', async () => {
      mockedAxios.mockRejectedValue(new Error('Network error'))

      await expect(adapter.sendSMS(validMessage, String(validConversationId))).rejects.toThrow(
        'Failed to SendSMS after 2 attempts',
      )
    })

    it('should handle network timeout errors', async () => {
      const networkError = new Error('Network timeout')
      networkError.name = 'TimeoutError'
      mockedAxios.mockRejectedValue(networkError)

      await expect(adapter.sendSMS('test message', '123')).rejects.toThrow(
        'Failed to SendSMS after 2 attempts',
      )
    })

    it('should handle rate limit errors with retries', async () => {
      const rateLimitError = new Error('Too many requests')
      rateLimitError.name = 'RateLimitError'
      mockedAxios.mockRejectedValueOnce(rateLimitError).mockResolvedValueOnce({data: {id: 123}})

      const result = await adapter.sendSMS('test message', '123')
      expect(result).toEqual({id: '123'})
      expect(mockedAxios).toHaveBeenCalledTimes(2)
    })
  })

  // eslint-disable-next-line max-lines-per-function
  describe('conversation management', () => {
    const validPhone = '+1234567890'
    const validPatientUUID = 'patient-123'
    const validPatientName = 'John Doe'

    it('should get conversation ID successfully', async () => {
      // First call for getContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [
            {
              id: 123,
              phone_number: validPhone,
              custom_attributes: {
                webhook_payload_validation_token: 'token',
              },
            },
          ],
        },
      })

      // Mock createConversation response for both initial try and retry
      const conversationResponse = {
        data: {
          id: 123,
          inbox_id: 'inbox-123',
        },
      }
      mockedAxios
        .mockResolvedValueOnce(conversationResponse) // First attempt
        .mockResolvedValueOnce(conversationResponse) // Retry if needed

      const result = await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)
      expect(result).toBe('123')
    })

    it('should create new contact and update phone number if not exists', async () => {
      // First call for getContact returns empty
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [],
        },
      })

      // Second call for createContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: {
            contact: {
              id: 123,
              custom_attributes: {
                webhook_payload_validation_token: 'token',
              },
            },
          },
        },
      })

      // Third call for updateContactPhoneNumber
      mockedAxios.mockResolvedValueOnce({data: {}})

      // Fourth call for createConversation
      mockedAxios.mockResolvedValueOnce({
        data: {
          id: 456,
        },
      })

      const result = await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)

      expect(result).toBe('456')
      expect(mockedAxios).toHaveBeenCalledTimes(4) // getContact + createContact + updateContact + createConversation

      // Verify createContact payload doesn't include phone_number
      const createContactCall = mockedAxios.mock.calls[1][0] as AxiosRequestConfig
      expect(createContactCall.data).not.toHaveProperty('phone_number')
      expect(createContactCall.data).toMatchObject({
        name: validPatientName,
        identifier: validPatientUUID,
        custom_attributes: {
          webhook_payload_validation_token: expect.any(String),
        },
      })

      // Verify updateContact was called with phone number
      const updateContactCall = mockedAxios.mock.calls[2][0] as AxiosRequestConfig
      expect(updateContactCall.data).toMatchObject({
        phone_number: cleanPhoneNumber(validPhone),
        custom_attributes: {
          webhook_payload_validation_token: expect.any(String),
        },
      })
    })

    it('should update contact if validation token is different', async () => {
      // First call for getContact with different validation token
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [
            {
              id: 123,
              phone_number: validPhone,
              custom_attributes: {
                webhook_payload_validation_token: 'old-token',
              },
            },
          ],
        },
      })

      // Second call for updateContactPhoneNumber
      mockedAxios.mockResolvedValueOnce({data: {}})

      // Third call for createConversation
      mockedAxios.mockResolvedValueOnce({
        data: {
          id: 123,
        },
      })

      const result = await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)

      expect(result).toBe('123')
      expect(mockedAxios).toHaveBeenCalledTimes(3)
      expect(mockedAxios.mock.calls[1][0]).toMatchObject({
        method: 'PATCH',
        url: expect.stringContaining('/contacts/123'),
        data: expect.objectContaining({
          phone_number: validPhone,
          custom_attributes: {
            webhook_payload_validation_token: expect.any(String),
          },
        }),
      })
    })

    it('should throw ContactWithPhoneNumberAlreadyExists when updating contact fails', async () => {
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [
            {
              id: 123,
              phone_number: '+9999999999',
              custom_attributes: {
                webhook_payload_validation_token: 'old-token',
              },
            },
          ],
        },
      })
      mockedAxios.mockRejectedValueOnce(new Error('Update failed'))

      await expect(
        adapter.getConversationId(validPhone, validPatientUUID, validPatientName),
      ).rejects.toThrow(ChatwootError.ContactWithPhoneNumberAlreadyExists)
    })

    it('should validate inputs', async () => {
      await expect(
        adapter.getConversationId('', validPatientUUID, validPatientName),
      ).rejects.toThrow('Phone number is required')

      await expect(adapter.getConversationId(validPhone, '', validPatientName)).rejects.toThrow(
        'Patient UUID is required',
      )

      await expect(adapter.getConversationId(validPhone, validPatientUUID, '')).rejects.toThrow(
        'Patient full name is required',
      )
    })

    it('should throw error if contact creation fails', async () => {
      mockedAxios.mockResolvedValueOnce({data: {payload: []}}) // getContact returns empty
      mockedAxios.mockResolvedValueOnce({data: {payload: {contact: null}}}) // createContact fails

      await expect(
        adapter.getConversationId(validPhone, validPatientUUID, validPatientName),
      ).rejects.toThrow('Failed to create contact')
    })

    it('should handle null response from createConversation', async () => {
      // First call for getContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [
            {
              id: 123,
              phone_number: validPhone,
              custom_attributes: {
                webhook_payload_validation_token: 'token',
              },
            },
          ],
        },
      })

      // Mock createConversation response with null id for both attempts
      const nullResponse = {
        data: {
          id: null,
          inbox_id: 'inbox-123',
        },
      }
      mockedAxios
        .mockResolvedValueOnce(nullResponse) // First attempt
        .mockResolvedValueOnce(nullResponse) // Retry if needed

      const result = await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)
      expect(result).toBeNull()
    })

    it('should handle validation token generation', async () => {
      // First call for getContact returns empty
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [],
        },
      })

      // Second call for createContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: {
            contact: {
              id: 123,
              phone_number: validPhone,
              custom_attributes: {
                webhook_payload_validation_token: 'token',
              },
            },
          },
        },
      })

      // Third call for createConversation (with retry)
      const conversationResponse = {
        data: {
          id: 456,
          inbox_id: 'inbox-123',
        },
      }
      mockedAxios
        .mockResolvedValueOnce(conversationResponse) // First attempt
        .mockResolvedValueOnce(conversationResponse) // Retry if needed

      await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)

      const createContactCall = mockedAxios.mock.calls[1][0] as AxiosRequestConfig
      expect(createContactCall.data.custom_attributes).toHaveProperty(
        'webhook_payload_validation_token',
      )
    })

    it('should clean phone numbers before making requests', async () => {
      // First call for getContact returns empty
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [],
        },
      })

      // Second call for createContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: {
            contact: {
              id: 123,
              custom_attributes: {
                webhook_payload_validation_token: 'token',
              },
            },
          },
        },
      })

      // Third call for updateContactPhoneNumber
      mockedAxios.mockResolvedValueOnce({data: {}})

      // Fourth call for createConversation
      mockedAxios.mockResolvedValueOnce({
        data: {
          id: 456,
        },
      })

      await adapter.getConversationId('+(123) 456-7890', validPatientUUID, validPatientName)

      // Verify updateContact was called with cleaned phone number
      const updateContactCall = mockedAxios.mock.calls[2][0] as AxiosRequestConfig
      expect(updateContactCall.data.phone_number).toBe('+1234567890')
    })

    it('should handle contact update failure gracefully', async () => {
      mockedAxios.mockResolvedValueOnce({
        data: {payload: [{id: 123, phone_number: '+9999999999'}]},
      })
      mockedAxios.mockRejectedValueOnce(new Error('Update failed'))

      await expect(
        adapter.getConversationId('+1234567890', 'patient-123', 'John Doe'),
      ).rejects.toThrow()
    })

    it('should handle contact creation failure with specific error', async () => {
      // Mock getContact to return empty result
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [],
        },
      })

      // Mock createContact to fail
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: {
            contact: null,
          },
        },
      })

      await expect(
        adapter.getConversationId(validPhone, validPatientUUID, validPatientName),
      ).rejects.toThrow('Failed to create contact. Check phonenumber and patient uuid uniqueness')

      // Verify createContact payload doesn't include phone_number
      const createContactCall = mockedAxios.mock.calls[1][0] as AxiosRequestConfig
      expect(createContactCall.data).not.toHaveProperty('phone_number')
    })

    it('should skip contact update when validation token and phone number match', async () => {
      const validationToken = adapter['getValidationToken'](validPatientUUID) // Get actual token
      const cleanedPhone = '+1234567890'

      // Mock getContact to return contact with matching validation token and phone
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [
            {
              id: 123,
              phone_number: cleanedPhone,
              custom_attributes: {
                webhook_payload_validation_token: validationToken,
              },
            },
          ],
        },
      })

      // Mock createConversation
      mockedAxios.mockResolvedValueOnce({
        data: {
          id: 456,
        },
      })

      await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)

      // Should only have 2 calls - getContact and createConversation
      expect(mockedAxios).toHaveBeenCalledTimes(2)
    })

    it('should handle null response from getContact gracefully', async () => {
      // Mock getContact to return empty array instead of null
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [],
        },
      })

      // Mock createContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: {
            contact: {
              id: 123,
              custom_attributes: {
                webhook_payload_validation_token: 'token',
              },
            },
          },
        },
      })

      // Mock updateContactPhoneNumber
      mockedAxios.mockResolvedValueOnce({data: {}})

      // Mock createConversation
      mockedAxios.mockResolvedValueOnce({
        data: {
          id: 456,
        },
      })

      const result = await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)
      expect(result).toBe('456')
    })

    it('should handle axios network errors during contact update', async () => {
      // Mock getContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [
            {
              id: 123,
              phone_number: '+9999999999', // Different phone number to trigger update
              custom_attributes: {
                webhook_payload_validation_token: 'old-token',
              },
            },
          ],
        },
      })

      // Mock updateContact to fail with network error
      mockedAxios.mockRejectedValueOnce(new Error('Update failed'))

      await expect(
        adapter.getConversationId(validPhone, validPatientUUID, validPatientName),
      ).rejects.toThrow(ChatwootError.ContactWithPhoneNumberAlreadyExists)
    })

    it('should retry createConversation on failure', async () => {
      // Mock getContact
      mockedAxios.mockResolvedValueOnce({
        data: {
          payload: [
            {
              id: 123,
              phone_number: validPhone,
              custom_attributes: {
                webhook_payload_validation_token: adapter['getValidationToken'](validPatientUUID),
              },
            },
          ],
        },
      })

      // Mock createConversation to fail first, then succeed
      mockedAxios.mockRejectedValueOnce(new Error('Network error'))
      mockedAxios.mockResolvedValueOnce({
        data: {
          id: 456,
        },
      })

      const result = await adapter.getConversationId(validPhone, validPatientUUID, validPatientName)
      expect(result).toBe('456')
      expect(mockedAxios).toHaveBeenCalledTimes(3) // getContact + 2 createConversation attempts
    })
  })
})
