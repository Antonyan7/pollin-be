import {
  ChatMessageStatus,
  ChatMessageType,
  ChatMessageWebhookData,
} from '@firebase-platform/functions/push-notification/src/chat-message-created-updated/helper/chat-message-created-type'
import {validateSMSStatus} from '@firebase-platform/functions/push-notification/src/chat-message-created-updated/helper/chat-message.helper'

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.setTimeout(10000)

describe('SMS Validation', () => {
  it('should validate successful SMS payload', async () => {
    const payload: ChatMessageWebhookData = {
      id: 'msg-123',
      message_type: ChatMessageType.Outgoing,
      inbox: {
        id: '201',
      },
      conversation: {
        id: 'conv-123',
        meta: null,
        contact_inbox: {
          source_id: 'phoneNumber',
        },
        messages: [
          {
            status: ChatMessageStatus.Sent,
            content: 'Test message',
          },
        ],
      },
    }

    await expect(validateSMSStatus(payload)).resolves.not.toThrow()
  })

  it('should throw error when outgoing message fails', async () => {
    const payload: ChatMessageWebhookData = {
      id: 'msg-123',
      message_type: ChatMessageType.Outgoing,
      inbox: {
        id: '201',
      },
      conversation: {
        id: 'conv-123',
        meta: null,
        contact_inbox: {
          source_id: 'phoneNumber',
        },
        messages: [
          {
            status: ChatMessageStatus.Failed,
            content: 'Test message',
          },
        ],
      },
    }

    await expect(validateSMSStatus(payload)).rejects.toThrow('Message failed to send')
  })
})
