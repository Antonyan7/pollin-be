import axios from 'axios'
import {RedisService} from '@libs/redis'
import {Cluster} from 'ioredis'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {ZoomAdapter} from '@libs/common/adapters/zoom.adapter'

jest.mock('axios')
jest.mock('@libs/common/utils/structured-logger')

// eslint-disable-next-line max-lines-per-function
describe('Zoom adapter', () => {
  const mockRedisClient = {
    get: jest.fn(),
    set: jest.fn(),
  } as unknown as Cluster

  const mockedAxios = axios as jest.MockedFunctionDeep<typeof axios>

  const dateTimeUtil = new DateTimeUtil()
  const configService = NestprojectConfigService.getInstance()

  const redisService = new RedisService(mockRedisClient)

  const spyOnRedisGet = jest.spyOn(RedisService.prototype, 'get')
  const spyOnRedisSet = jest.spyOn(RedisService.prototype, 'set')

  const adapter = new ZoomAdapter(redisService, configService)

  it('should create a meeting - success', async () => {
    spyOnRedisGet.mockImplementation(async () => 'key')

    const inviteesEmails = ['fhealthdev@fhhealth.com']
    const title = 'title'

    const axiosResponse = {
      data: {
        uuid: 'CjhWtTebR3a4vGYUAmNjbg==',
        id: 85947811845,
        join_url: 'https://us06web.zoom.us/j/85947811845',
      },
    }

    mockedAxios.mockResolvedValue(axiosResponse)

    const date = dateTimeUtil.now()

    const {meetingId, meetingURL} = await adapter.createMeeting('userId', {
      date: dateTimeUtil.now(),
      inviteesEmails,
      title,
      duration: 30,
    })

    expect(mockedAxios).toBeCalledWith({
      url: expect.any(String),
      method: 'POST',
      data: JSON.stringify({
        topic: `${configService.get('CLINIC_NAME')} ${title}`,
        duration: 30,
        meeting_invitees: [{email: inviteesEmails[0]}],
        private_meeting: false,
        start_time: dateTimeUtil.formatInISO(date),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer key`,
      },
    })
    mockedAxios.mockClear()

    expect(meetingId).toBe(axiosResponse.data.id)
    expect(meetingURL).toBe(axiosResponse.data.join_url)
  })

  it('should not create a meeting fron 2 attempts', async () => {
    spyOnRedisGet.mockImplementation(async () => 'key')

    mockedAxios.mockResolvedValue(null)

    const {meetingId, meetingURL} = await adapter.createMeeting('userId', {
      date: dateTimeUtil.now(),
      inviteesEmails: [],
      title: 'title',
      duration: 30,
    })

    expect(mockedAxios).toBeCalledTimes(2)

    expect(meetingId).toBe(null)
    expect(meetingURL).toBe(null)
  })

  it('should update a meeting - success', async () => {
    spyOnRedisGet.mockImplementation(async () => 'key')

    const title = 'title'

    mockedAxios.mockResolvedValue({status: 204})

    const date = dateTimeUtil.now()

    const result = await adapter.updateMeeting('meetingId', {
      date: dateTimeUtil.now(),
      title,
      duration: 30,
    })

    expect(mockedAxios).toBeCalledWith({
      url: expect.any(String),
      method: 'PATCH',
      data: JSON.stringify({
        topic: `${configService.get('CLINIC_NAME')} ${title}`,
        duration: 30,
        start_time: dateTimeUtil.formatInISO(date),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer key`,
      },
    })

    mockedAxios.mockClear()

    expect(result).toBeTruthy()
  })

  it('should not update a meeting - wrong response code', async () => {
    spyOnRedisGet.mockImplementation(async () => 'key')

    mockedAxios.mockResolvedValue({status: 200})

    const result = await adapter.updateMeeting('meetingId', {
      date: dateTimeUtil.now(),
      title: 'title',
      duration: 30,
    })

    expect(mockedAxios).toBeCalledTimes(2)

    mockedAxios.mockClear()

    expect(result).toBeFalsy()
  })

  it('should delete a meeting - success', async () => {
    spyOnRedisGet.mockImplementation(async () => 'key')

    mockedAxios.mockResolvedValue({status: 204})

    const result = await adapter.deleteMeeting('meetingId')

    expect(mockedAxios).toBeCalledWith({
      url: expect.any(String),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer key`,
      },
    })

    mockedAxios.mockClear()

    expect(result).toBeTruthy()
  })

  it('should not delete a meeting - status code is wrong', async () => {
    spyOnRedisGet.mockImplementation(async () => 'key')

    mockedAxios.mockResolvedValue({status: 200})

    const result = await adapter.deleteMeeting('meetingId')

    expect(mockedAxios).toBeCalledTimes(2)

    mockedAxios.mockClear()

    expect(result).toBeFalsy()
  })

  it('should refresh redis access key', async () => {
    spyOnRedisGet.mockImplementation(async () => null)
    spyOnRedisSet.mockImplementation(async () => null)

    const newToken = 'sdfsdfsdfsd'

    mockedAxios.mockResolvedValue({data: {access_token: newToken}})

    const result = await adapter.getAccessToken()

    expect(spyOnRedisSet).toHaveBeenCalledWith('zoom_access_token', newToken, 3300)

    mockedAxios.mockClear()

    expect(result).toBe(newToken)
  })

  it('should get access key with unavailable redis', async () => {
    spyOnRedisGet.mockImplementation(async () => {
      throw new Error()
    })
    spyOnRedisSet.mockImplementation(async () => {
      throw new Error()
    })

    const newToken = 'sdfsdfsdfsd'

    mockedAxios.mockResolvedValue({data: {access_token: newToken}})

    const result = await adapter.getAccessToken()

    expect(spyOnRedisSet).toHaveBeenCalledWith('zoom_access_token', newToken, 3300)

    mockedAxios.mockClear()

    expect(result).toBe(newToken)
  })
})
