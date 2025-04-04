import {
  ZoomMeetingCreationPayload,
  ZoomMeetingUpdatePayload,
} from '../interfaces/zoom-adapter.interface'
import axios from 'axios'
import {RedisService} from '@libs/redis'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {NestprojectConfigService, StructuredLogger, DateTimeUtil} from '@libs/common'

export class ZoomAdapter {
  private readonly apiUrl: string

  private readonly redisKey = 'zoom_access_token'
  private readonly dateTimeUtil = new DateTimeUtil()

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: NestprojectConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('ZOOM_API_URL')
  }

  async createMeeting(
    userId: string,
    data: ZoomMeetingCreationPayload,
    attempt = 0,
  ): Promise<{meetingId: string; meetingURL: string}> {
    try {
      this.validateUserId(userId)

      const headers = await this.getHeaders()

      const startTime = this.dateTimeUtil.formatInISO(data.date)

      StructuredLogger.info('CreateMeeting', 'MeetingInfo', {
        date: startTime,
        duration: data.duration,
      })

      const response = await axios({
        url: this.apiUrl + `v2/users/${userId}/meetings`,
        method: 'POST',
        data: JSON.stringify({
          topic: `${this.configService.get('CLINIC_NAME')} ${data.title}`,
          duration: data.duration,
          meeting_invitees: data.inviteesEmails.map((email) => ({email})),
          private_meeting: false,
          start_time: startTime,
        }),
        headers,
      })

      const meetingURL = response?.data?.join_url
      const meetingId = response?.data?.id

      if (!meetingId || !meetingURL) {
        throw new Error(`Meeting for user: ${userId} was not created. ${meetingId}`)
      }

      StructuredLogger.info('CreateMeeting', 'Success', {
        message: `Meeting id: ${meetingId}`,
      })

      return {meetingId, meetingURL}
    } catch (error) {
      StructuredLogger.error('CreateMeeting', 'CreateMeetingFailed', {
        axiosError: JSON.stringify(error?.response?.data),
        ...parseError(error),
      })

      if (attempt === 0) {
        StructuredLogger.info('CreateMeeting', 'AttemptingAgain', {
          message: `UserId: ${userId}`,
        })

        return this.createMeeting(userId, data, 1)
      }

      return {meetingId: null, meetingURL: null}
    }
  }

  async updateMeeting(
    meetingId: string,
    data: ZoomMeetingUpdatePayload,
    attempt = 0,
  ): Promise<boolean> {
    try {
      this.validateMeetingId(meetingId)

      const headers = await this.getHeaders()

      const startTime = this.dateTimeUtil.formatInISO(data.date)

      StructuredLogger.info('UpdateMeeting', 'MeetingInfo', {
        date: startTime,
        duration: data.duration,
        meetingId,
      })

      const response = await axios({
        url: this.apiUrl + `v2/meetings/${meetingId}`,
        method: 'PATCH',
        data: JSON.stringify({
          topic: `${this.configService.get('CLINIC_NAME')} ${data.title}`,
          duration: data.duration,
          start_time: startTime,
        }),
        headers,
      })

      if (response.status === 204) {
        return true
      }

      throw new Error(`Cant update meeting ${meetingId}. Response code: ${response?.status}`)
    } catch (error) {
      StructuredLogger.error('UpdateMeeting', 'UpdateMeetingFailed', {
        axiosError: JSON.stringify(error?.response?.data),
        ...parseError(error),
      })

      if (attempt === 0) {
        StructuredLogger.info('UpdateMeeting', 'AttemptingAgain', {
          meetingId,
        })

        return this.updateMeeting(meetingId, data, 1)
      }

      return false
    }
  }

  async deleteMeeting(meetingId: string, attempt = 0): Promise<boolean> {
    try {
      this.validateMeetingId(meetingId)

      const headers = await this.getHeaders()

      StructuredLogger.info('DeleteMeeting', 'MeetingInfo', {
        meetingId,
      })

      const response = await axios({
        url: this.apiUrl + `v2/meetings/${meetingId}`,
        method: 'DELETE',
        headers,
      })

      if (response.status === 204) {
        return true
      }

      throw new Error(`Cant delete meeting ${meetingId}. Response code: ${response?.status}.`)
    } catch (error) {
      StructuredLogger.error('DeleteMeeting', 'DeleteMeetingFailed', {
        axiosError: JSON.stringify(error?.response?.data),
        ...parseError(error),
      })

      if (attempt === 0) {
        StructuredLogger.info('DeleteMeeting', 'AttemptingAgain', {
          meetingId,
        })

        return this.deleteMeeting(meetingId, 1)
      }

      return false
    }
  }

  async getAccessToken(): Promise<string> {
    const redisToken = await this.getRedisToken()

    if (redisToken) {
      return redisToken
    }

    StructuredLogger.info('GetAccessToken', 'TokenWasNotFound', {
      message: 'Token was not found in redis storage, getting new one',
    })

    const key = Buffer.from(
      `${this.configService.get<string>('ZOOM_CLIENT_ID')}:${this.configService.get<string>('ZOOM_SECRET_ID')}`,
    ).toString('base64')

    const accountId = Buffer.from(this.configService.get<string>('ZOOM_ACCOUNT_ID'))

    const response = await axios({
      url: this.apiUrl + 'oauth/token',
      method: 'POST',
      data: `grant_type=account_credentials&account_id=${accountId}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${key}`,
      },
    })

    const newToken = response?.data?.access_token
    if (!newToken) {
      throw new Error(
        `Cant generate access token for Zoom API. Response code: ${response?.status}, message: ${response?.data?.message}`,
      )
    }

    await this.setRedisToken(newToken)

    return newToken
  }

  private async getRedisToken(): Promise<string> {
    try {
      const token = await this.redisService.get(this.redisKey)

      return token
    } catch (error) {
      StructuredLogger.error('GetRedisToken', 'GetRedisToken', {
        ...parseError(error),
      })

      return null
    }
  }

  private async setRedisToken(newToken: string): Promise<void> {
    try {
      await this.redisService.set(this.redisKey, newToken, 3300)
    } catch (error) {
      StructuredLogger.error('SetRedisToken', 'SetRedisTokenFailed', {
        ...parseError(error),
      })
    }
  }

  private async getHeaders(): Promise<Record<string, string>> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await this.getAccessToken()}`,
    }
  }

  private validateUserId(userId: string): void {
    if (!userId) {
      throw new Error(`UserId is not valid: ${userId}`)
    }
  }

  private validateMeetingId(meetingId: string): void {
    if (!meetingId) {
      throw new Error(`Meeting is not valid: ${meetingId}`)
    }
  }
}
