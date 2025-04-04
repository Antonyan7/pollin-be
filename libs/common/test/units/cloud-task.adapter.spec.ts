// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import {NestprojectConfigService} from '../../src/services/config/config-service'
import {CloudTaskAdapter} from '@libs/common/adapters'
import {CloudTasksClient} from '@google-cloud/tasks'
import {
  SendReminderToInvitePartnerPayload,
  SendReminderToInvitePartnerSchema,
} from '@libs/common/model/proto-schemas/send-reminder-to-invite-partner.schema'

jest.mock('@google-cloud/tasks', () => ({
  CloudTasksClient: jest.fn().mockImplementation(() => ({})),
}))

jest.mock('@libs/common', () => ({
  StructuredLogger: jest.fn().mockImplementation(() => ({})),
}))

describe('CloudTaskAdapter', () => {
  let adapter: CloudTaskAdapter
  let mockCloudTasksClient: CloudTasksClient
  let mockConfigService: NestprojectConfigService

  beforeEach(() => {
    mockCloudTasksClient = new CloudTasksClient()
    mockConfigService = NestprojectConfigService.getInstance()

    adapter = new CloudTaskAdapter('queueName')
  })

  it('should create a task correctly', async () => {
    const mockResponse = {name: 'MockTaskId'}
    mockCloudTasksClient.createTask = jest.fn().mockResolvedValue([mockResponse])

    const result = await adapter.createTask<SendReminderToInvitePartnerPayload>({
      data: {patientId: 12},
      schemaType: SendReminderToInvitePartnerSchema,
      targetURL: mockConfigService.get<string>('TARGET_URL'),
    })

    expect(result).toEqual('MockTaskId')
  })

  it('should delete a task correctly', async () => {
    mockCloudTasksClient.deleteTask = jest.fn()

    const result = await adapter.deleteTask('MockTaskId')

    expect(result).toBeFalsy()
  })
})
