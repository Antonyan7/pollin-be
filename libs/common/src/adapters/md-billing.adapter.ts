import axios, {AxiosBasicCredentials, AxiosRequestConfig} from 'axios'
import {Config} from '@config/index'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {StructuredLogger, isE2E} from '../utils'
import {
  CreateClaimRequest,
  CreateClaimResponse,
  DiagnosticCodeItem,
  GetClaimDetailsPayload,
  GetClaimDetailsResponse,
  GetDiagnosticCodesResponse,
  GetServiceCodesResponse,
  OHIPValidationPayload,
  OHIPValidationResponse,
  ServiceCodeItem,
} from '../interfaces/md-billing'
import {removeSpecialCharacters} from '../helpers/string.helper'
import {MDBillingAdapterE2E} from './e2e/md-billing-e2e.adapter'
import {getValidateHealthCardNumberPayload} from '../helpers/patient-ohip.helper'
import {writeExtendedLogForAxiosException} from './common/error-helpers'

export type MDBillingAdapterData<T> = {
  status: number
  data: T
}

/**
 * Default card used in MD Billing QA envs
 */
const MDBILLING_DEV_CARD = '7777777777'

/**
 * From local - needs VPN
 */
export class MDBillingAdapter {
  private apiToken: string
  private username: string
  private password: string
  private baseURL: string
  private MOHGroup: string

  private isProdEnv: boolean

  constructor() {
    this.apiToken = Config.get<string>('MDBILLING_API_TOKEN')
    this.username = Config.get<string>('MDBILLING_API_USERNAME')
    this.password = Config.get<string>('MDBILLING_API_PASSWORD')
    this.baseURL = Config.get<string>('MDBILLING_BASE_URL')
    this.MOHGroup = Config.get<string>('MDBILLING_MOH_GROUP')

    this.isProdEnv = Config.getBool('MDBILLING_PROD')
  }

  private auth(): AxiosBasicCredentials {
    return {username: this.username, password: this.password}
  }

  private requestConfig(): AxiosRequestConfig {
    return {
      auth: this.auth(),
      headers: {
        'content-type': 'application/json',
      },
      timeout: 30000,
    }
  }

  private readHealthCardNumber(cardNumber: string): string {
    return this.isProdEnv ? removeSpecialCharacters(cardNumber) : MDBILLING_DEV_CARD
  }

  async getServiceCodes(billingNumber: string): Promise<MDBillingAdapterData<ServiceCodeItem[]>> {
    if (isE2E()) {
      return MDBillingAdapterE2E.getServiceCodes(billingNumber)
    }

    try {
      const params = {
        TokenId: this.apiToken,
        BillingNumber: billingNumber,
      }

      const requestUrl = `${this.baseURL}/GetServiceCodes`
      const response = await axios.post<GetServiceCodesResponse>(
        requestUrl,
        params,
        this.requestConfig(),
      )
      StructuredLogger.info(
        activityLogs.MDBillingAdapterFunctions.GetServiceCodes,
        activityLogs.MDBillingAdapterActions.ResponseReceivedFromMDBilling,
        {
          url: requestUrl,
          responseStatus: response.status,
        },
      )

      return {status: response.status, data: response.data.ServiceCodeMobileAppItems}
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: activityLogs.MDBillingAdapterFunctions.GetServiceCodes,
        logAct: activityLogs.MDBillingAdapterActions.ReadServiceCodesFailed,

        error,
        payloadAsString: JSON.stringify(billingNumber),
      })

      return null
    }
  }

  async getDiagnosticCodes(
    billingNumber: string,
  ): Promise<MDBillingAdapterData<DiagnosticCodeItem[]>> {
    if (isE2E()) {
      return MDBillingAdapterE2E.getDiagnosticCodes(billingNumber)
    }

    try {
      const params = {
        TokenId: this.apiToken,
        BillingNumber: billingNumber,
      }

      const requestUrl = `${this.baseURL}/GetDiagnosticCodes`
      const response = await axios.post<GetDiagnosticCodesResponse>(
        requestUrl,
        params,
        this.requestConfig(),
      )
      StructuredLogger.info(
        activityLogs.MDBillingAdapterFunctions.GetDiagnosticCodes,
        activityLogs.MDBillingAdapterActions.ResponseReceivedFromMDBilling,
        {
          url: requestUrl,
          responseStatus: response.status,
        },
      )
      return {status: response.status, data: response.data.DiagnosticCodeMobileAppItems}
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: activityLogs.MDBillingAdapterFunctions.GetDiagnosticCodes,
        logAct: activityLogs.MDBillingAdapterActions.ReadDiagnosticCodesFailed,

        error,
        payloadAsString: JSON.stringify(billingNumber),
      })

      return null
    }
  }

  /**
   * Validates an Ontario Health Card Number.
   *
   * From local - needs VPN
   * if ohipNumbers has not just digits - bdBilling will return 400
   */
  async validateOHIP(
    validationPayload: OHIPValidationPayload,
  ): Promise<MDBillingAdapterData<OHIPValidationResponse>> {
    if (isE2E()) {
      return MDBillingAdapterE2E.validateOHIP(validationPayload)
    }

    try {
      const data = getValidateHealthCardNumberPayload(validationPayload)

      const params = {
        TokenId: this.apiToken,
        ...data,
      }

      const requestURL = `${this.baseURL}/ValidateHealthCardNumber`
      const response = await axios.post<OHIPValidationResponse>(
        requestURL,
        params,
        this.requestConfig(),
      )

      StructuredLogger.info(
        activityLogs.MDBillingAdapterFunctions.ValidateOHIP,
        activityLogs.MDBillingAdapterActions.ResponseReceivedFromMDBilling,
        {
          url: requestURL,
          responseStatus: response.status,
        },
      )

      return {status: response.status, data: response.data}
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: activityLogs.MDBillingAdapterFunctions.ValidateOHIP,
        logAct: activityLogs.MDBillingAdapterActions.OHIPValidationFailed,

        error,
        payloadAsString: JSON.stringify(validationPayload),
      })
      return null
    }
  }

  /**
   * Creates a new claim as well as a new patient if that patient does not exist in MDBilling  system. Patient is unique per OHIP card number.
   */
  async createClaim(
    payload: CreateClaimRequest,
  ): Promise<MDBillingAdapterData<CreateClaimResponse>> {
    if (isE2E()) {
      return MDBillingAdapterE2E.createClaim(payload)
    }

    try {
      payload.PatientForMDBAPI.HealthCardNumber = this.readHealthCardNumber(
        payload.PatientForMDBAPI.HealthCardNumber,
      )

      const params = {
        TokenId: this.apiToken,
        ...payload,
        MOHGroup: this.MOHGroup,
        // Should Allways be false
        IsWSIBClaim: false,
        // Should Allways be true. Sets the claim to Unsubmitted status instead of Saved status.
        // Unsubmitted status is what triggers the claim to be sent from MDBilling to MOH
        SetClaimToUnsubmitted: true,
      }

      const requestURL = `${this.baseURL}/CreateClaim`
      const response = await axios.post<CreateClaimResponse>(
        requestURL,
        params,
        this.requestConfig(),
      )

      StructuredLogger.info(
        activityLogs.MDBillingAdapterFunctions.CreateClaim,
        activityLogs.MDBillingAdapterActions.ResponseReceivedFromMDBilling,
        {
          url: requestURL,
          responseStatus: response.status,
          message: `Response for Claim create has been received: ID ${response?.data?.ClaimId}, message: ${response.data?.ErrorMessages}, StatusCode: ${response.data?.StatusCode}`,
        },
      )

      return {status: response.status, data: response.data}
    } catch (error) {
      StructuredLogger.error(
        activityLogs.MDBillingAdapterFunctions.CreateClaim,
        activityLogs.MDBillingAdapterActions.CreateClaimFailed,
        {
          message: `MD Billing Adapter received error: ${JSON.stringify(error?.response?.data)}, status: ${error?.response?.status}`,
        },
      )

      return null
    }
  }

  /**
   * Contains the MDBilling.ca unique Claim Ids of the user (supports a max of 100 Id's on any one call)
   */
  async getClaimDetails(
    payload: GetClaimDetailsPayload,
  ): Promise<MDBillingAdapterData<GetClaimDetailsResponse>> {
    if (isE2E()) {
      return MDBillingAdapterE2E.getClaimDetails(payload)
    }

    try {
      const params = {
        TokenId: this.apiToken,
        ...payload,
      }

      const requestURL = `${this.baseURL}/GetClaimsDetails`
      const response = await axios.post<GetClaimDetailsResponse>(
        requestURL,
        params,
        this.requestConfig(),
      )

      StructuredLogger.info(
        activityLogs.MDBillingAdapterFunctions.GetClaimDetails,
        activityLogs.MDBillingAdapterActions.ResponseReceivedFromMDBilling,
        {
          url: requestURL,
          responseStatus: response.status,
        },
      )

      return {status: response.status, data: response.data}
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: activityLogs.MDBillingAdapterFunctions.GetClaimDetails,
        logAct: activityLogs.MDBillingAdapterActions.GetClaimDetailsFailed,

        error,
        payloadAsString: JSON.stringify(payload),
      })

      return null
    }
  }
}
