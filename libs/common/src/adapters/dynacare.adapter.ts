import axios, {AxiosResponse} from 'axios'
import {XMLParser} from 'fast-xml-parser'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {
  DynacareAttachmentXMLResponse,
  DynacareNotification,
  DynacareResult,
} from '../interfaces/dynacare'
import {LogType, StructuredLogger} from '../utils'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {Config} from '@config/index'
import {HttpStatus} from '@nestjs/common'

export class DynacareAdapter {
  private baseURL: string
  private subscriptionKey: string

  constructor() {
    this.subscriptionKey = Config.get<string>('DYNACARE_SUBSCRIPTION_KEY')
    this.baseURL = Config.get<string>('DYNACARE_BASE_URL')
  }

  private getHeaders(): Record<string, string> {
    return {
      'Ocp-Apim-Subscription-Key': this.subscriptionKey,
    }
  }

  private validateResponse(response: AxiosResponse): void | Error {
    if (!response) {
      throw new Error('Response was not received from Dynacare')
    }

    if (response.status !== 200) {
      StructuredLogger.error(
        activityLogs.DynacareAdapterFunctions.ValidateResponse,
        activityLogs.DynacareAdapterActions.ValidationFailed,
        {errorInfo: response.data},
        LogType.DynacareIntegration,
      )
      throw new Error('Response from Dynacare was unsuccefull')
    }
  }

  /**
   * Fetch array of notifications from Dynacare
   */
  async getNotifications(): Promise<DynacareNotification[]> {
    try {
      const requestUrl = `${this.baseURL}/ext_orders/notifications`
      const response = await axios.get<DynacareNotification[]>(requestUrl, {
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/xml',
        },
        timeout: 15000,
      })

      StructuredLogger.info(
        activityLogs.DynacareAdapterFunctions.GetNotifications,
        activityLogs.DynacareAdapterActions.ResponseReceived,
        {
          url: requestUrl,
          responseStatus: response.status,
        },
        LogType.DynacareIntegration,
      )

      this.validateResponse(response)

      return response.data
    } catch (error) {
      StructuredLogger.error(
        activityLogs.DynacareAdapterFunctions.GetNotifications,
        activityLogs.DynacareAdapterActions.RequestFailed,
        {
          message: `Get notifications from Dynacare failed.`,
          axiosError: JSON.stringify(error?.response?.data),
          ...parseError(error),
        },
        LogType.DynacareIntegration,
      )
      return null
    }
  }

  /**
   * Fetch attachments from Dynacare by Order ID. Attachments will be formatted in XML and its parsed by adapter.
   * @param orderId Order ID from Dynacare notification
   */
  async getOrderAttachments(orderId: number): Promise<DynacareAttachmentXMLResponse> {
    try {
      const requestUrl = `${this.baseURL}/ext_orders/${orderId}/attachments`
      const response = await axios.get(requestUrl, {
        headers: {
          ...this.getHeaders(),
        },
        timeout: 15000,
      })

      this.validateResponse(response)

      const parser = new XMLParser()
      const parsedData: DynacareAttachmentXMLResponse = parser.parse(response.data)

      if (!parsedData) {
        StructuredLogger.error(
          activityLogs.DynacareAdapterFunctions.GetOrderAttachments,
          activityLogs.DynacareAdapterActions.XMLParseFailed,
          {errorInfo: response.data},
        )
        throw new Error('Parsing XML from Dynacare was failed')
      }

      return parsedData
    } catch (error) {
      StructuredLogger.error(
        activityLogs.DynacareAdapterFunctions.GetOrderAttachments,
        activityLogs.DynacareAdapterActions.RequestFailed,
        {
          message: `Get attachments from Dynacare failed. Order Id: ${orderId}`,
          axiosError: JSON.stringify(error?.response?.data),
          ...parseError(error),
        },
        LogType.DynacareIntegration,
      )
      return null
    }
  }

  /**
   * Fetch result from Dynacare with StorageReference field
   * @param storageReference from GET Order Attachments API
   * @returns Result with HL7 encoded in base64 or response status code
   */
  async getResult(storageReference: string): Promise<{data: DynacareResult; status: number}> {
    try {
      const response = await axios.get<DynacareResult>(storageReference, {
        headers: {
          ...this.getHeaders(),
        },
        timeout: 15000,
      })

      this.validateResponse(response)

      return {data: response.data, status: HttpStatus.OK}
    } catch (error) {
      if (error.status == 401) {
        return {data: null, status: 401}
      }

      StructuredLogger.error(
        activityLogs.DynacareAdapterFunctions.GetResults,
        activityLogs.DynacareAdapterActions.RequestFailed,
        {
          message: `Get result from Dynacare failed. Storage Reference: ${storageReference}`,
          axiosError: JSON.stringify(error?.response?.data),
          ...parseError(error),
        },
        LogType.DynacareIntegration,
      )
      return null
    }
  }

  async acknowledgeNotification(
    notificationId: number,
    markAcknowledged = true,
  ): Promise<DynacareNotification> {
    try {
      const requestUrl = `${this.baseURL}/ext_orders/notifications`
      const response = await axios.put<DynacareNotification>(
        requestUrl,
        {
          id: notificationId,
          isAcknowledged: markAcknowledged,
        },
        {
          headers: {
            ...this.getHeaders(),
          },
          timeout: 15000,
        },
      )

      this.validateResponse(response)

      return response.data
    } catch (error) {
      StructuredLogger.error(
        activityLogs.DynacareAdapterFunctions.GetResults,
        activityLogs.DynacareAdapterActions.RequestFailed,
        {
          message: `Acknowledge Notification from Dynacare failed. Notification Id: ${notificationId}`,
          axiosError: JSON.stringify(error?.response?.data),
          ...parseError(error),
        },
        LogType.DynacareIntegration,
      )
      return null
    }
  }
}
