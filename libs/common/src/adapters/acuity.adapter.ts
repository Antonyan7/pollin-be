/**
 * info - adapter copied from FH
 */
import * as crypto from 'crypto'
import {URLSearchParams} from 'url'
import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import {LogType, StructuredLogger} from '@libs/common'
import {
  AcuityCreateDTO,
  AcuityGetAppointmentsQuery,
  AcuityUpdateDTO,
  AppointmentAcuityResponse,
} from '../model/acuity.model'
import {
  AcuityAppointmentCreatePlainFieldsDTO,
  AcuityFieldsHelper,
  AcuityPlainFieldsDTO,
} from '@libs/services-common/utils/acuity-fields.helper'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'
import {IncomingHttpHeaders} from 'http'
import {handleError, parseError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {AcuityWebhookData} from '@libs/common/model/acuity.model'
import {writeExtendedLogForAxiosException} from './common/error-helpers'
import {HttpStatus} from '@nestjs/common'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'

// declared to have shorted Logging in service
const logFunc = activityLogs.AcuityAdapterFunctions
const logAct = activityLogs.AcuityAdapterActions

const configService = NestprojectConfigService.getInstance()
let APIURL = configService.get<string>('ACUITY_SCHEDULER_API_URL')
let acuityUserId = configService.get<string>('ACUITY_USER_ID')
let acuityPassword = configService.get<string>('ACUITY_PASSWORD')

export const AcuitySignatureHeader = 'x-acuity-signature'

export class AcuityAdapter {
  private acuityMapper = new AcuityFieldsHelper()

  private getApiKey(): string {
    if (!acuityUserId || !acuityPassword) {
      //sometime there is bug when it not got config yet
      //trying load 1 more time

      APIURL = configService.get<string>('ACUITY_SCHEDULER_API_URL')
      acuityUserId = configService.get<string>('ACUITY_USER_ID')
      acuityPassword = configService.get<string>('ACUITY_PASSWORD')

      //if not able to load 2 time - throw error
      if (!acuityUserId || !acuityPassword) {
        StructuredLogger.error(logFunc.GetApiKey, logAct.AcuitySecretUserIdOrPasswordNotFound, {})
        throw new Error('Acuity userId or password not found in secrets')
      }
    }
    return acuityUserId + ':' + acuityPassword
  }

  async getAppointmentByIdFromAcuityService(
    id: number,
    notThrowExceptionIfAcuityIdNotFound = false,
  ): Promise<AppointmentAcuityResponse> {
    StructuredLogger.info(logFunc.GetAppointmentByIdFromAcuityService, logAct.StartMethod, {
      url: 'AcuityAdapterGetAppointment',
      message: `acuityID: ${id} `,
    })
    const apiUrl = APIURL + `/api/v1/appointments/${id}`
    try {
      const res = await axios.get<AppointmentAcuityResponse>(apiUrl, this.requestConfig())

      const appointment = res.data

      return this.customFieldsToAppointment(appointment)
    } catch (error) {
      if (notThrowExceptionIfAcuityIdNotFound && error?.response?.status == HttpStatus.NOT_FOUND) {
        StructuredLogger.warn(
          logFunc.GetAppointmentByIdFromAcuityService,
          logAct.AcuityAppointmentNotFoundById,
          {
            message: `AcuityAppointment not found by id, staff entered bad id. id: ${id}. notThrowExceptionIfAcuityIdNotFound = true`,
          },
        )
        return null
      }
      if (notThrowExceptionIfAcuityIdNotFound && error?.response?.status == HttpStatus.FORBIDDEN) {
        StructuredLogger.warn(
          logFunc.GetAppointmentByIdFromAcuityService,
          logAct.AcuityAppointmentNotFoundById,
          {
            message: `AcuityAppointment not found by id, staff entered bad id. or you don't have access (probably id from diff env and not exist on current env. So reason: acuity not exist (bad id)). id: ${id}. notThrowExceptionIfAcuityIdNotFound = true`,
          },
        )
        return null
      }

      writeExtendedLogForAxiosException({
        logFunc: logFunc.GetAppointmentByIdFromAcuityService,
        logAct: logAct.InternalError,
        error,
        payloadAsString: JSON.stringify(`id: ${id}`),
      })

      const result = error.response?.data
      StructuredLogger.error(logFunc.GetAppointmentByIdFromAcuityService, logAct.InternalError, {
        errMsg: `syncAppointmentFromAcuityToDB, InvalidAcuityIDPosted,
          acuityID: ${id},
          acuityStatusCode: ${result?.status_code}`,
        axiosError: error?.response?.data,
        ...parseError(error),
      })

      handleError(error, {
        functionName: logFunc.GetAppointmentByIdFromAcuityService,
        eventName: logAct.InternalError,
      })
    }
  }

  private customFieldsToAppointment(
    appointment: AppointmentAcuityResponse,
  ): AppointmentAcuityResponse {
    StructuredLogger.info(logFunc.CustomFieldsToAppoinment, logAct.StartMethod, {
      message: `customFieldsToAppoinment starts, acuityID: ${appointment?.id} `,
    })

    //set default values
    appointment.dateOfBirthDay = ''
    appointment.dateOfBirthMonth = ''
    appointment.dateOfBirthYear = 0
    appointment.sexAtBirth = null
    appointment.bookAppointmentWithPhysician = null
    appointment.haveReferral = null
    appointment.interestedService = ''
    appointment.interestedServiceOther = ''
    appointment.agreeTermsAndConditions = null
    appointment.agreeReceivingCommunications = null

    const acuityForm = this.acuityMapper.mapAppointmentFromForm(appointment)

    appointment = {
      ...appointment,
      ...acuityForm,
    }

    return appointment
  }

  /**
   * Verify Acuity signature
   * https://developers.acuityscheduling.com/docs/webhooks#verifying-webhook-requests
   */
  validateAcuitySignature(
    reqBody: Record<string, string>,
    headers: IncomingHttpHeaders,
    acuityPayload: AcuityWebhookData,
  ): boolean {
    try {
      StructuredLogger.info(logFunc.ValidateAcuitySignature, logAct.StartMethod, {
        message: `validateAcuitySignature starts `,
      })

      const acuitySignatureHeader = headers[AcuitySignatureHeader]

      // For get Hash, params should be in proper order
      // based on Acuity doc: https://developers.acuityscheduling.com/docs/webhooks#verifying-webhook-requests
      const paramsInOrder = `action=${acuityPayload.action}&id=${acuityPayload.id}&calendarID=${acuityPayload.calendarID}&appointmentTypeID=${acuityPayload.appointmentTypeID}`

      const hashInOrder = this.getHashByParamsAndAcuitySecrets(paramsInOrder)

      // Compare hash to Acuity signature:
      if (hashInOrder === acuitySignatureHeader) {
        return true
      }

      StructuredLogger.error(logFunc.ValidateAcuitySignature, logAct.ValidateAcuitySignatureFalse, {
        message: `validateAcuitySignature fail, acuityPayload: ${JSON.stringify(
          acuityPayload,
        )}, reqBody: ${JSON.stringify(
          reqBody,
        )}, hashInOrder: ${hashInOrder}, acuitySignatureHeader= ${acuitySignatureHeader}, paramsInOrder: ${paramsInOrder} `,
      })
      return false
    } catch (error) {
      StructuredLogger.error(logFunc.ValidateAcuitySignature, logAct.InternalError, {
        ...parseError(error),
        errMsg: `acuityPayload: ${JSON.stringify(acuityPayload)}, reqBody: ${JSON.stringify(
          reqBody,
        )}`,
      })
      return false
    }
  }

  private getHashByParamsAndAcuitySecrets(paramsInOrder: string): string {
    const messageParams = new URLSearchParams(paramsInOrder)

    const message = messageParams.toString()
    const hasher = crypto.createHmac('sha256', acuityPassword)
    const buffer = Buffer.from(message)
    hasher.update(buffer.toString())
    const hash = hasher.digest('base64')
    return hash
  }

  /** With Headers and basic auth */
  private requestConfig(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: 'Basic ' + this.getUserPassBase64(),
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      timeout: 15000,
    }
  }
  /**
   * @param retryCount - it will retry a few time if there is internet connection issue or similar
   */
  async rescheduleAcuityAppoinment(
    {
      id,
      datetime,
      calendarID,
      retryCount = 0,
    }: {
      id: number
      datetime: string
      calendarID?: number
      retryCount?: number
    },
    appointment: Appointment,
  ): Promise<AppointmentAcuityResponse> {
    StructuredLogger.info(logFunc.RescheduleAppoinmentService, logAct.StartMethod, {
      message: `acuityID: ${id}, datetime: ${datetime}, calendarID: ${calendarID}, retryCount: ${retryCount}`,
    })

    const apiUrl = `${APIURL}/api/v1/appointments/${id}/reschedule?admin=true`
    const params = {
      datetime,
      ...(calendarID ? {calendarID} : {}),
    }

    try {
      const res = await axios.put<AppointmentAcuityResponse>(
        apiUrl,
        JSON.stringify(params),
        this.requestConfig(),
      )

      const appointment = res.data
      return this.customFieldsToAppointment(appointment)
    } catch (error) {
      const result = error.response?.data

      StructuredLogger.error(logFunc.RescheduleAppoinmentService, logAct.InternalError, {
        errMsg: `AcuityAdapter rescheduleAppoinmentService failed,
            acuityID: ${id},
            appointmentDateTime: ${datetime}
            acuityStatusCode: ${result?.status_code},
            retryCount: ${retryCount}`,
        axiosError: error?.response?.data,
        ...parseError(error),
      })

      if (
        this.doesNeedRetryBasedOrError(error) &&
        this.retryCountIsLessThanMaximumRetryCount(retryCount)
      ) {
        await this.delayForRetry(retryCount)
        const retryResponse = await this.rescheduleAcuityAppoinment(
          {
            id,
            datetime,
            calendarID,
            retryCount: retryCount + 1,
          },
          appointment,
        ) // recursive
        if (retryResponse) {
          return retryResponse
        }
      }

      StructuredLogger.error(
        logFunc.RescheduleAppoinmentService,
        logAct.SyncFailedFromClinicPortalToAcuity,
        {
          ...parseError(error),
          message: `Not able to “reschedule” appointment with ${appointment.serviceProvider.uuid} for patient ${appointment.patient.patientIdentifier} scheduled on ${datetime} in acuity`,
          appointmentId: appointment?.id,
        },
        LogType.AcuityAppointmentSyncFailed,
      )
      handleError(error, {
        functionName: logFunc.RescheduleAppoinmentService,
        eventName: logAct.SyncFailedFromClinicPortalToAcuity,
      })
    }
  }

  //CF has limit for 9 min
  retryCountToDelaysMs = new Map<number, number>([
    [0, 2 * 1000], // 2 sec
    [1, 30 * 1000], // 30 sec
    [2, 1 * 60 * 1000], // 1 min
    [3, 2 * 60 * 1000], // 2 min (sum 4 min)
  ])

  private retryCountIsLessThanMaximumRetryCount(retryCount: number): boolean {
    return retryCount < this.retryCountToDelaysMs.size
  }

  private async delayForRetry(retryCount: number): Promise<void> {
    const retryDelay = this.retryCountToDelaysMs.get(retryCount)
    StructuredLogger.warn(logFunc.DelayForRetry, logAct.Retry, {
      message: `No response from acuity or returned 404, 500 code. Start Retry , retryCount: ${
        retryCount + 1
      }, retryDelay before call again in: ${retryDelay} ms`,
    })

    await new Promise((resolve) => setTimeout(resolve, retryDelay))
  }

  private doesNeedRetryBasedOrError(e: AxiosError): boolean {
    return (
      !e.response || // bad url or issue with internet connection on acuity or our side
      e.response?.status == 404 || // issue on acuity side (or bad subPath in acuity url)
      e.response?.status == 500
    )
  }

  /**
   * @param retryCount - it will retry a few time if there is internet connection issue or similar
   */
  async cancelAppointmentOnAcuity(
    id: number,
    noShow = false,
    retryCount = 0,
  ): Promise<AppointmentAcuityResponse> {
    const apiUrl = APIURL + `/api/v1/appointments/${id}/cancel?admin=true`

    StructuredLogger.info(logFunc.CancelAppointmentOnAcuityService, logAct.StartMethod, {
      message: `acuityID: ${id}, noShow: ${noShow}, retryCount: ${retryCount}`,
    })

    try {
      const res = await axios.put<AppointmentAcuityResponse>(apiUrl, {noShow}, this.requestConfig())
      const appointment = res.data
      return this.customFieldsToAppointment(appointment)
    } catch (error) {
      const result = error.response?.data

      StructuredLogger.error(logFunc.CancelAppointmentOnAcuityService, logAct.InternalError, {
        errMsg: `AcuityAdapter:cancelAppointmentOnAcuityService, FailedAcuityCancel,
          acuityID: ${id},
          acuityStatusCode: ${result?.status_code},
          errorMessage: ${result?.message || error.toJSON()?.message || error}`,
        axiosError: error?.response?.data,
        ...parseError(error),
      })

      if (
        this.doesNeedRetryBasedOrError(error) &&
        this.retryCountIsLessThanMaximumRetryCount(retryCount)
      ) {
        await this.delayForRetry(retryCount)
        const retryResponse = await this.cancelAppointmentOnAcuity(id, noShow, retryCount + 1) // recursive
        if (retryResponse) {
          return retryResponse
        }
      }

      StructuredLogger.error(
        logFunc.CancelAppointmentOnAcuityService,
        logAct.InternalError,
        {
          ...parseError(error),
          message: `Not able to cancel appointment, acuityID: ${id}`,
        },
        LogType.AcuityAppointmentSyncFailed,
      )

      handleError(error, {
        functionName: logFunc.CancelAppointmentOnAcuityService,
        eventName: logAct.InternalError,
      })
    }
  }

  private getUserPassBase64(): string {
    const userPassBuf = Buffer.from(this.getApiKey())
    const userPassBase64 = userPassBuf.toString('base64')
    return userPassBase64
  }

  async updateAppointmentOnAcuityService({
    id,
    fieldsData,
    mainData,
    appointmentUUID,
    retryCount = 0,
  }: {
    id: number
    fieldsData: AcuityUpdateDTO
    mainData: AcuityPlainFieldsDTO
    appointmentUUID?: string
    retryCount?: number
  }): Promise<AppointmentAcuityResponse> {
    StructuredLogger.info(logFunc.ValidateAcuitySignature, logAct.StartMethod, {
      message: `UpdateAppointmentOnAcuityService starts `,
    })

    const fields = this.acuityMapper.renameKeysToId(fieldsData)

    const apiUrl = `${APIURL}/api/v1/appointments/${id}?admin=true`

    try {
      const params = {
        ...mainData,
        fields: this.acuityMapper.handleBooleans(fields),
      }

      const res = await axios.put<AppointmentAcuityResponse>(
        apiUrl,
        JSON.stringify(params),
        this.requestConfig(),
      )

      StructuredLogger.info(logFunc.ValidateAcuitySignature, logAct.StartMethod, {
        message: `updateAppointmentOnAcuityService Success,  acuityID: ${id}`,
      })

      const appointment = res.data
      return this.customFieldsToAppointment(appointment)
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: logFunc.CancelAppointmentOnAcuityService,
        logAct: logAct.InternalError,

        error,
        payloadAsString: `id: ${id}, fieldsData: ${JSON.stringify(fieldsData)} `,
      })

      if (
        this.doesNeedRetryBasedOrError(error) &&
        this.retryCountIsLessThanMaximumRetryCount(retryCount)
      ) {
        await this.delayForRetry(retryCount)
        const retryResponse = await this.updateAppointmentOnAcuityService({
          id,
          fieldsData,
          mainData,
          appointmentUUID,
          retryCount: retryCount + 1,
        }) // recursive
        if (retryResponse) {
          return retryResponse
        }
      }

      StructuredLogger.error(
        logFunc.UpdateAppointmentOnAcuityService,
        logAct.SyncFailedFromClinicPortalToAcuity,
        {
          ...parseError(error),
          message: `Not able to update appointment, acuityID: ${id}. AppointmentID: ${appointmentUUID}`,
        },
        LogType.AcuityAppointmentSyncFailed,
      )
    }
  }

  async createAppointmentOnAcuityService(
    fieldsData: AcuityCreateDTO,
    mainData: AcuityAppointmentCreatePlainFieldsDTO,
    retryCount = 0,
  ): Promise<AppointmentAcuityResponse> {
    StructuredLogger.info(logFunc.CreateAppointmentOnAcuityService, logAct.StartMethod, {
      message: `CreateAppointmentOnAcuityService starts `,
    })
    const fields = this.acuityMapper.renameKeysToId(fieldsData)
    const apiUrl = `${APIURL}/api/v1/appointments?admin=true`

    try {
      const params = {...mainData, fields: this.acuityMapper.handleBooleans(fields)}
      const res = await axios.post<AppointmentAcuityResponse>(
        apiUrl,
        JSON.stringify(params),
        this.requestConfig(),
      )

      const appointment = res.data
      StructuredLogger.info(logFunc.CreateAppointmentOnAcuityService, logAct.AppointmentCreated, {
        message: `createAppointmentOnAcuityService Success, acuityAppointmentId: ${appointment.id}`,
      })
      return this.customFieldsToAppointment(appointment)
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: logFunc.CreateAppointmentOnAcuityService,
        logAct: logAct.InternalError,
        error,
        payloadAsString: `fieldsData: ${JSON.stringify(fieldsData)} `,
      })

      if (
        this.doesNeedRetryBasedOrError(error) &&
        this.retryCountIsLessThanMaximumRetryCount(retryCount)
      ) {
        await this.delayForRetry(retryCount)
        const retryResponse = await this.createAppointmentOnAcuityService(
          fieldsData,
          mainData,
          retryCount + 1,
        ) // recursive
        if (retryResponse) {
          return retryResponse
        }
      }
      StructuredLogger.error(
        logFunc.CreateAppointmentOnAcuityService,
        logAct.InternalError,
        {
          ...parseError(error),
          message: `Not able to create appointment: appointmentUUID: ${fieldsData.appointmentUUID}`,
        },
        LogType.SystemLog,
      )
      handleError(error, {
        functionName: logFunc.CreateAppointmentOnAcuityService,
        eventName: logAct.InternalError,
      })
    }
  }

  async getAppointmentsFromAcuityService(
    queryParams?: AcuityGetAppointmentsQuery,
    retryCount = 0,
  ): Promise<AppointmentAcuityResponse[]> {
    StructuredLogger.info(logFunc.GetAppointmentsOnAcuityService, logAct.StartMethod, {
      message: `GetAppointmentsOnAcuityService starts`,
    })
    const apiUrl = `${APIURL}/api/v1/appointments?admin=true`
    try {
      const res = await axios.get<AppointmentAcuityResponse[]>(apiUrl, {
        params: queryParams,
        ...this.requestConfig(),
      })
      const appointments = res.data
      StructuredLogger.info(logFunc.GetAppointmentsOnAcuityService, logAct.AppointmentCreated, {
        message: `getAppointmentsOnAcuityService Success, appointments length: ${appointments.length}`,
      })
      return appointments.map((appointment) => this.customFieldsToAppointment(appointment))
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: logFunc.GetAppointmentsOnAcuityService,
        logAct: logAct.InternalError,
        error,
        payloadAsString: `queryParams: ${JSON.stringify(queryParams)} `,
      })

      if (
        this.doesNeedRetryBasedOrError(error) &&
        this.retryCountIsLessThanMaximumRetryCount(retryCount)
      ) {
        await this.delayForRetry(retryCount)
        const retryResponse = await this.getAppointmentsFromAcuityService(
          queryParams,
          retryCount + 1,
        ) // recursive
        if (retryResponse) {
          return retryResponse
        }
      }
      StructuredLogger.error(
        logFunc.GetAppointmentsOnAcuityService,
        logAct.InternalError,
        {...parseError(error), message: `Not able to get appointments`},
        LogType.AcuityAppointmentSyncFailed,
      )
      handleError(error, {
        functionName: logFunc.GetAppointmentsOnAcuityService,
        eventName: logAct.InternalError,
      })
    }
  }
}
