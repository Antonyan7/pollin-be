import {
  AcuityCreateDTO,
  AcuityUpdateDTO,
  AppointmentAcuityResponse,
} from '@libs/common/model/acuity.model'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {IncomingHttpHeaders} from 'http'
import {AuthUserFixture} from '@libs/common/test/fixtures/auth.fixture'
import axios, {AxiosError} from 'axios'
import {LogType, StructuredLogger} from '@libs/common'
import {
  AcuityAppointmentCreatePlainFieldsDTO,
  AcuityPlainFieldsDTO,
} from '@libs/services-common/utils/acuity-fields.helper'
import {handleError, parseError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
//should be called from auth.fixture

export const MockAcuityAdapterValidSignature = 'MockAcuityAdapterValidSignature'

export const MockAcuityAppointmentIdToReturnBadDate = 4544541
export const MockAcuityAppointmentCalendarIdNotExistInOurDb = 4544542
export const MockAcuityAppointmentAppTypeIdNotExistInOurDb = 4544543
export const MockPatAndAcuityAppointmentAlreadyExist = 4544545 //used for a few diff cases

export const MockAcuityPatientAlreadyExistNoIC = 4544548
export const MockAcuityPatientAlreadyExistWithIC = 4544550

export const MockAcuityPatientMatchName = 4544599
export const MockAcuityPatientAlreadyExistButWithDiffPatientData = 454455
export const MockAcuityAppointmentSexAtBirthIsEmpty = 4544547
export const MockAcuityAppointmentSexAtBirthIsWrongValue = 4544549
export const MockAcuityAppointmentSexAtBirthMaleAndStartTimeInPast = 4544552

export const MockAcuityAppointmentIdForReschedule = 4544555

export const MockAcuityPatientLastNameForAlreadyExistPatient = 'AcuityMockLNAlreadyExistPatient'
export const MockAcuityPatientFirstNameForAlreadyExistPatient = 'AcuityMockFNAlreadyExistPatient'

export const MockAcuityPatientLastNameForAlreadyExistPatientWithIC =
  'AcuiLNAlreadyExistPatientWithIC'
export const MockAcuityPatientFirstNameForAlreadyExistPatientWithIC =
  'AcuiFNAlreadyExistPatientWIthIC'
export const MockAppointmentUUIDForCreateAcuityAppointmentRetry = 'MockAppointmentUUIDRetry'
export const MockAcuityAppointmentIdForUpdateAcuityAppointmentRetry = 147147

const dateTime = `2060-11-30T09:00:00-0500`

const logFunc = activityLogs.AcuityAdapterFunctions
const logAct = activityLogs.AcuityAdapterActions

export const MockAppointmentAcuityResponse: AppointmentAcuityResponse = {
  appointmentTypeID: 111,
  appointmentUUID: '111',
  barCodeNumber: 'string',
  calendar: 'string',
  calendarID: 1234,
  canceled: false,
  canClientCancel: true,
  canClientReschedule: true,
  certificate: 'certificate',
  confirmationPage: '',
  date: 'string',

  dateOfBirthDay: '01',
  dateOfBirthMonth: 'January', //full name
  dateOfBirthYear: 1990,

  datetime: dateTime,
  email: 'fhealthdev+acuityMock@gmail.com',
  firstName: 'AcuityMockFirstName',
  lastName: 'AcuityMockLastName',
  id: 345459798,
  // labels: [],
  location: 'string',
  phone: '+16501234567',
  forms: [],
  time: dateTime,
  price: '100.00',
  priceSold: '100.00',
  amountPaid: '100.00',
  bookAppointmentWithPhysician: false,
  sexAtBirth: SexAtBirth.Female.toString(),

  primaryReason: 'MockPrimaryReason',
  primaryReasonOtherDescription: 'MockPrimaryReasonOtherDescription',
  addedToReadyWaitList: false,
  ageGroup: '31-35',

  haveReferral: true,
  interestedService: 'interestedServiceMock',
  interestedServiceOther: 'interestedServiceOtherMock',
  agreeTermsAndConditions: true,
  agreeReceivingCommunications: true,
}

export const MockAppointmentAcuityResponseForCreatedPatAndApp: Partial<AppointmentAcuityResponse> =
  {
    id: 459872489,
    email: 'fhealthdev+acuityMockForAddPatAndApp@gmail.com',
    firstName: 'AcuityMockFirstNameAddPatAndApp',
    lastName: 'AcuityMockLastNameAddPatAndApp',
  }

export class AcuityAdapter {
  async getAppointmentByIdFromAcuityService(id: number): Promise<AppointmentAcuityResponse> {
    if (id == MockAcuityAppointmentIdToReturnBadDate) {
      return {...MockAppointmentAcuityResponse, datetime: 'invalidDate'}
    }
    if (id == MockAcuityAppointmentCalendarIdNotExistInOurDb) {
      return {...MockAppointmentAcuityResponse, calendarID: 123}
    }
    if (id == MockAcuityAppointmentAppTypeIdNotExistInOurDb) {
      return {...MockAppointmentAcuityResponse, appointmentTypeID: 1234}
    }
    if (id == MockPatAndAcuityAppointmentAlreadyExist) {
      return {
        ...MockAppointmentAcuityResponse,
        id: MockPatAndAcuityAppointmentAlreadyExist,
      }
    }
    if (id == MockAcuityPatientAlreadyExistNoIC) {
      return {
        ...MockAppointmentAcuityResponse,
        email: AuthUserFixture.acuityWebhookPatientExistNoIC.email,
        firstName: MockAcuityPatientFirstNameForAlreadyExistPatient,
        lastName: MockAcuityPatientLastNameForAlreadyExistPatient,
      }
    }

    if (id == MockAcuityPatientAlreadyExistWithIC) {
      return {
        ...MockAppointmentAcuityResponse,
        id: 9834045, //anything which should not exist yes
        email: AuthUserFixture.acuityWebhookPatientExistWithIC.email,
        firstName: MockAcuityPatientFirstNameForAlreadyExistPatientWithIC,
        lastName: MockAcuityPatientLastNameForAlreadyExistPatientWithIC,
      }
    }

    if (id == MockAcuityPatientAlreadyExistButWithDiffPatientData) {
      return {
        ...MockAppointmentAcuityResponse,
        email: AuthUserFixture.acuityWebhookPatientExistDiffName.email,
        firstName: 'SomeAnoterAcuityMockName',
      }
    }

    if (id == MockAcuityAppointmentSexAtBirthIsEmpty) {
      return {
        ...MockAppointmentAcuityResponse,
        sexAtBirth: '',
      }
    }
    if (id == MockAcuityAppointmentSexAtBirthIsWrongValue) {
      return {
        ...MockAppointmentAcuityResponse,
        sexAtBirth: 'wrongValue',
      }
    }

    if (id == MockAcuityAppointmentSexAtBirthMaleAndStartTimeInPast) {
      return {
        ...MockAppointmentAcuityResponse,
        sexAtBirth: SexAtBirth.Male.toString(),
        datetime: '2020-01-30T09:00:00-0500',
      }
    }

    if (id == MockAppointmentAcuityResponseForCreatedPatAndApp.id) {
      return {
        ...MockAppointmentAcuityResponse,
        ...MockAppointmentAcuityResponseForCreatedPatAndApp,
      }
    }

    return MockAppointmentAcuityResponse
  }

  async rescheduleAcuityAppoinment(
    id: number,
    datetime: string,
  ): Promise<AppointmentAcuityResponse> {
    return {...MockAppointmentAcuityResponse, id, datetime}
  }

  async cancelAppointmentOnAcuity(id: number, noShow = false): Promise<AppointmentAcuityResponse> {
    return {...MockAppointmentAcuityResponse, id, canceled: true, noShow}
  }

  //_reqBody need to have proper properties in order
  validateAcuitySignature(_reqBody: Record<string, string>, headers: IncomingHttpHeaders): boolean {
    const acuitySignatureHeader = headers['x-acuity-signature']
    return acuitySignatureHeader == MockAcuityAdapterValidSignature
  }

  async updateAppointmentOnAcuityService({
    id,
    fieldsData,
    mainData,
    retryCount = 0,
    appointmentUUID,
  }: {
    id: number
    fieldsData: AcuityUpdateDTO
    mainData: AcuityPlainFieldsDTO
    retryCount?: number
    appointmentUUID?: string
  }): Promise<AppointmentAcuityResponse> {
    try {
      if (id === MockAcuityAppointmentIdForUpdateAcuityAppointmentRetry) {
        await axios.post<AppointmentAcuityResponse>('mocked api call', JSON.stringify({}))
      }
      return {...MockAppointmentAcuityResponse, id}
    } catch (error) {
      if (
        this.doesNeedRetryBasedOrError(error) &&
        this.retryCountIsLessThanMaximumRetryCount(retryCount)
      ) {
        await this.delayForRetry(retryCount)
        const retryResponse = await this.updateAppointmentOnAcuityService({
          id,
          fieldsData,
          mainData,
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

  retryCountToDelaysMs = new Map<number, number>([
    [0, 2 * 1000], // 2 sec
    [1, 3 * 1000], // 3 sec
    [2, 4 * 1000], // 4 sec
    [3, 5 * 1000], // 5 sec
  ])

  private retryCountIsLessThanMaximumRetryCount(retryCount: number): boolean {
    return retryCount < this.retryCountToDelaysMs.size
  }

  private doesNeedRetryBasedOrError(e: AxiosError): boolean {
    return !e.response || e.response?.status == 404 || e.response?.status == 500
  }

  private async delayForRetry(retryCount: number): Promise<void> {
    const retryDelay = this.retryCountToDelaysMs.get(retryCount)
    StructuredLogger.warn('RescheduleAppoinmentService', 'Retry', {
      message: `No response from acuity or returned 404, 500 code. Start Retry , retryCount: ${
        retryCount + 1
      }, retryDelay before call again in: ${retryDelay} ms`,
    })

    await new Promise((resolve) => setTimeout(resolve, retryDelay))
  }

  async createAppointmentOnAcuityService(
    fieldsData: AcuityCreateDTO,
    mainData: AcuityAppointmentCreatePlainFieldsDTO,
    retryCount = 0,
  ): Promise<AppointmentAcuityResponse> {
    try {
      if (fieldsData.appointmentUUID === MockAppointmentUUIDForCreateAcuityAppointmentRetry) {
        await axios.post<AppointmentAcuityResponse>('mocked api call', JSON.stringify({}))
      }
      return {...MockAppointmentAcuityResponse}
    } catch (error) {
      if (
        this.doesNeedRetryBasedOrError(error) &&
        this.retryCountIsLessThanMaximumRetryCount(retryCount)
      ) {
        await this.delayForRetry(retryCount)
        const retryResponse = await this.createAppointmentOnAcuityService(
          fieldsData,
          mainData,
          retryCount + 1,
        )
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
        LogType.AcuityAppointmentSyncFailed,
      )
      handleError(error, {
        functionName: logFunc.CreateAppointmentOnAcuityService,
        eventName: logAct.InternalError,
      })
    }
  }
}
