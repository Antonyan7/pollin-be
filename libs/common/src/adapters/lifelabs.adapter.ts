import * as fs from 'fs/promises'
import * as https from 'https'
import axios from 'axios'
import FormData from 'form-data'
import {Config} from '@config/index'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {LogType, StructuredLogger} from '../utils'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {LifeLabsAcknowledgementStatus} from '../enums/test-orders-and-results.enum'

const serializeCookies = (cookies: Record<string, string>): string => {
  return Object.entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(';')
}

export class LifeLabsAdapter {
  private userId: string
  private password: string
  private passphrase: string
  private host: string
  private baseUrl: string

  private sessionCookies: Record<string, string> = {}

  private timeout = 30000

  constructor() {
    this.userId = Config.get('LIFELABS_USERID')
    this.password = Config.get('LIFELABS_PASSWORD')
    this.host = Config.get<string>('LIFELABS_HOST')
    this.baseUrl = `https://${this.host}`
    this.passphrase = Config.get<string>('LIFELABS_PASSPHRASE')
  }

  private handleCookie = (cookies: string[]): Record<string, string> => {
    cookies.forEach((cookie) => {
      const cookiesParts = cookie.split(';')
      const valueKeys = cookiesParts[0]
      const [key, value] = valueKeys.split('=')

      if (value === 'deleted') {
        delete this.sessionCookies[key]
      } else {
        this.sessionCookies[key] = value
      }
    })

    return this.sessionCookies
  }

  private async readCertificate(): Promise<Buffer> {
    const path = __dirname + '/certs/lifelabs.pfx'

    try {
      const pfx = await fs.readFile(path)
      return pfx
    } catch (error) {
      const message = 'PFX certificate for lifelabs could not be found in ' + path
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.ReadCertificate,
        activityLogs.LifeLabsAdapterActions.ReadCertificateFailed,
        {message, errMsg: error?.message},
        LogType.LifeLabsIntegration,
      )

      throw new Error(message)
    }
  }

  private async createHTTPAgent(): Promise<https.Agent> {
    const agentOptions = {
      pfx: await this.readCertificate(),
      passphrase: this.passphrase,
      host: this.host,
    }

    return new https.Agent(agentOptions)
  }

  private createAuthFormData(): FormData {
    const data = new FormData()

    data.append('Page', 'Login')
    data.append('Mode', 'Silent')
    data.append('UserID', this.userId)
    data.append('Password', this.password)

    return data
  }

  private async auth(): Promise<Record<string, string> | null> {
    /**
     * Set up axios intance without redirection to catch redirect with interceptor
     */
    const axiosInstance = axios.create({
      withCredentials: true,
      maxRedirects: 0,
      httpsAgent: await this.createHTTPAgent(),
      timeout: this.timeout,
    })

    /**
     * Register Interceptor to collect initial cookies
     */
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const isRedirect = error.response && [301, 302].includes(error.response.status)

        if (isRedirect) {
          const redirectLocation = error.response.headers.location
          this.handleCookie(error.response.headers['set-cookie'])

          const axiosRedirect = axios.create({
            withCredentials: true,
            maxRedirects: 3,
            httpsAgent: await this.createHTTPAgent(),
            timeout: this.timeout,
          })

          const redirect = await axiosRedirect.get(this.baseUrl + redirectLocation, {
            headers: {
              Cookie: serializeCookies(this.sessionCookies),
            },
            timeout: this.timeout,
          })

          this.handleCookie(redirect.headers['set-cookie'])
          StructuredLogger.info(
            activityLogs.LifeLabsAdapterFunctions.FollowRedirect,
            activityLogs.LifeLabsAdapterActions.FollowRedirectSuccess,
            {message: 'Initial cookies were collected succesfully'},
            LogType.LifeLabsIntegration,
          )

          return redirect
        }
      },
    )

    try {
      // Request will go though redirect via Interceptor
      await axiosInstance({
        method: 'post',
        url: `${this.baseUrl}/hl7pull.aspx`,
        data: this.createAuthFormData(),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: this.timeout,
      })

      return this.sessionCookies
    } catch (error) {
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.Auth,
        activityLogs.LifeLabsAdapterActions.AuthFailed,
        {axiosError: JSON.stringify(error?.response?.data), ...parseError(error)},
        LogType.LifeLabsIntegration,
      )
      return null
    }
  }

  /**
   * Exchange initial cookies from auth() function for Session ID
   */
  private async initSession(): Promise<Record<string, string> | null> {
    try {
      const axiosResultsInstance = axios.create({
        withCredentials: true,
        maxRedirects: 3,
        httpsAgent: await this.createHTTPAgent(),
        timeout: this.timeout,
      })

      const finishLogin = await axiosResultsInstance({
        method: 'post',
        url: `${this.baseUrl}/hl7pull.aspx`,
        data: this.createAuthFormData(),
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: serializeCookies(this.sessionCookies),
        },
        timeout: this.timeout,
      })

      this.handleCookie(finishLogin.headers['set-cookie'])
      StructuredLogger.info(
        activityLogs.LifeLabsAdapterFunctions.InitSession,
        activityLogs.LifeLabsAdapterActions.InitSessionFailed,
        {message: 'Initial cookies were exchanged for session cookies successfully'},
        LogType.LifeLabsIntegration,
      )

      return this.sessionCookies
    } catch (error) {
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.InitSession,
        activityLogs.LifeLabsAdapterActions.InitSessionFailed,
        {axiosError: JSON.stringify(error?.response?.data), ...parseError(error)},
        LogType.LifeLabsIntegration,
      )
      return null
    }
  }

  private async login(): Promise<void> {
    const auth = await this.auth()
    if (!auth) {
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.PullResults,
        activityLogs.LifeLabsAdapterActions.PullResultsFailed,
        {message: 'Authentication for Lifelabs failed'},
        LogType.LifeLabsIntegration,
      )
      return null
    }

    const session = await this.initSession()
    if (!session) {
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.PullResults,
        activityLogs.LifeLabsAdapterActions.PullResultsFailed,
        {message: 'Session could not be initiated for Lifelabs'},
        LogType.LifeLabsIntegration,
      )
      return null
    }
  }

  /**
   * Pulls results from LifeLabs.
   * lease note that if the client application tries to pull HL7 messages multiple times
   * without sending an acknowledgement, the client application will be blocked for
   * 10 minutes before being able to pull messages again
   *
   * @returns XML that contains HL7 messages
   *`<HL7Messages MessageFormat=”HL7” MessageCount=”14” Version=”2.3”>
   *     <Message MsgID=”1”></Message>
   * </HL7Messages>`
   */
  async pullResults(): Promise<string | null> {
    try {
      await this.login()

      const data = new FormData()
      data.append('Page', 'HL7')
      data.append('Query', 'NewRequests')

      const results = await axios({
        method: 'post',
        url: `${this.baseUrl}/hl7pull.aspx`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Host: 'api.ontest.excelleris.com',
          Cookie: serializeCookies(this.sessionCookies),
        },
        timeout: this.timeout,
        httpsAgent: await this.createHTTPAgent(),
        withCredentials: true,
      })

      StructuredLogger.info(
        activityLogs.LifeLabsAdapterFunctions.PullResults,
        activityLogs.LifeLabsAdapterActions.PullResultsSuccess,
        {message: 'Results were pulled succesfully', responseStatus: results.status},
        LogType.LifeLabsIntegration,
      )

      return results.data
    } catch (error) {
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.PullResults,
        activityLogs.LifeLabsAdapterActions.PullResultsFailed,
        {axiosError: JSON.stringify(error?.response?.data), ...parseError(error)},
        LogType.LifeLabsIntegration,
      )
      return null
    }
  }

  /**
   * Once the user has completed all the tasks, the client application should make the
   * following HTTPS request to properly sign the user out
   */
  async signOut(): Promise<void> {
    try {
      const axiosLogoutInstance = axios.create({
        httpsAgent: await this.createHTTPAgent(),
        timeout: this.timeout,
      })

      const data = new FormData()
      data.append('Logout', 'Yes')

      const response = await axiosLogoutInstance({
        method: 'post',
        url: `${this.baseUrl}/hl7pull.aspx`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: serializeCookies(this.sessionCookies),
        },
        timeout: this.timeout,
      })

      // Clear old cookies
      this.sessionCookies = {}

      StructuredLogger.info(
        activityLogs.LifeLabsAdapterFunctions.SingOut,
        activityLogs.LifeLabsAdapterActions.SignOutSuccess,
        {
          responseStatus: response.status,
          message: `Client were succesfully signed out from LifeLabs`,
        },
        LogType.LifeLabsIntegration,
      )
    } catch (error) {
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.SingOut,
        activityLogs.LifeLabsAdapterActions.SignOutFailed,
        {axiosError: JSON.stringify(error?.response?.data), ...parseError(error)},
        LogType.LifeLabsIntegration,
      )
      return null
    }
  }

  /**
   * Once the client application has received the new HL7 messages, it should send
   * back a positive acknowledgement, so that LifeLabs knows to mark the received
   * messages, and won’t trigger the same set of messages for retrieval the next time
   * the client queries for new messages
   *
   * @param acknowledgementStatus if the messages could
   *    not be processed properly, the “ACK” parameter should be “Negative” and the
   *    messages will not be marked as received.
   */
  async sendAcknowledgement(
    acknowledgementStatus = LifeLabsAcknowledgementStatus.Positive,
  ): Promise<void> {
    try {
      const axiosAcknowledgement = axios.create({
        httpsAgent: await this.createHTTPAgent(),
        timeout: this.timeout,
      })

      const data = new FormData()
      data.append('Page', 'HL7')
      data.append('ACK', acknowledgementStatus)

      const response = await axiosAcknowledgement({
        method: 'post',
        url: `${this.baseUrl}/hl7pull.aspx`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: serializeCookies(this.sessionCookies),
        },
        timeout: this.timeout,
      })

      StructuredLogger.info(
        activityLogs.LifeLabsAdapterFunctions.SendAcknowledgement,
        activityLogs.LifeLabsAdapterActions.AcknowledgementSuccess,
        {
          responseStatus: response.status,
          message: `Acknowledge for status: ${acknowledgementStatus} were successfully received by LifeLabs: Response Message ${response.data}`,
        },
        LogType.LifeLabsIntegration,
      )
    } catch (error) {
      StructuredLogger.error(
        activityLogs.LifeLabsAdapterFunctions.SendAcknowledgement,
        activityLogs.LifeLabsAdapterActions.AcknowledgementFailed,
        {axiosError: JSON.stringify(error?.response?.data), ...parseError(error)},
        LogType.LifeLabsIntegration,
      )
      return null
    }
  }
}
