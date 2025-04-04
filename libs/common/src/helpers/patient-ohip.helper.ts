import {OHIPValidationPayload, OHIPValidationResponse} from '@libs/common/interfaces/md-billing'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {BadRequestWarningException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {MDBillingAdapterData} from '@libs/common/adapters'
import {StructuredLogger, NestprojectConfigService} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getJustDigitsFromString} from '@libs/common/helpers/string.helper'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/service-type.entity'

// declared to have shorted Logging in service
const logFunc = activityLogs.PatientOhipValidationFunction
const logAct = activityLogs.PatientOhipValidationActions

/** Get clean ohip number without dashes.
 * If empty - return null - to have unique in db (for 2 empty db will return empty)
 */
export const getCleanOhipNumber = (number: string): string => {
  if (!number?.length) {
    return null //lets have already in correct form in db
  }

  return number.replace(/\D/g, '')
}

export const getCleanOhipVersionCode = (formattedVersionCode: string): string => {
  return formattedVersionCode?.length ? formattedVersionCode.toUpperCase() : null //lets have already in correct form in db
}

/** Get clean ohip version code in uppercase for db etc  */
export const formatOhipVersionCode = (formattedVersionCode: string): string => {
  if (!formattedVersionCode?.length) {
    return ''
  }

  return formattedVersionCode.toUpperCase()
}

/** return ohip with dashes: eq.: 1234-567-890 */
export const formatOhipNumber = (cleanNumber: string): string => {
  if (!cleanNumber?.length) {
    return ''
  }

  return `${cleanNumber.slice(0, 4)}-${cleanNumber.slice(4, 7)}-${cleanNumber.slice(7)}`
}

export const isServiceTypeOHIPCovered = (serviceType: ServiceType): boolean => {
  if (!serviceType) {
    return false
  }

  return Boolean(
    serviceType?.serviceTypeToServiceCodes?.length || serviceType?.mdBillingDiagnosticCodeId,
  )
}

export const getValidateHealthCardNumberPayload = (
  payload: OHIPValidationPayload,
): OHIPValidationPayload => {
  const result = {
    HealthCardNumber: getCleanOhipNumber(payload.HealthCardNumber), //with dashed MdBilling return error with wrong way
    BillingNumber: payload.BillingNumber,
  }

  if (payload.VersionCode) {
    return {...result, VersionCode: getCleanOhipVersionCode(payload.VersionCode)}
  }

  return result
}

export const cleanAndValidateOhipValues = (
  number: string,
  versionCode: string,
): {isValid?: boolean; cleanOhipCardNumber?: string; cleanOhipCardVersionCode?: string} => {
  if (!number?.length) {
    return {isValid: false}
  }

  const cleanOhipCardNumber = getCleanOhipNumber(number)
  if (cleanOhipCardNumber.length !== 10) {
    return {isValid: false}
  }

  if (versionCode?.length && versionCode.length > 2) {
    return {isValid: false}
  }

  const cleanOhipCardVersionCode = getCleanOhipVersionCode(versionCode)

  return {
    isValid: true,
    cleanOhipCardNumber,
    cleanOhipCardVersionCode,
  }
}

export function cleanAndValidateFormatOhipWithException(
  number: string,
  versionCode: string,
  i18nService?: I18nLocalizationService,
): {isValid?: boolean; cleanOhipCardNumber?: string; cleanOhipCardVersionCode?: string} {
  const {cleanOhipCardNumber, cleanOhipCardVersionCode, isValid} = cleanAndValidateOhipValues(
    number,
    versionCode,
  )
  if (!isValid) {
    const errorMessage = i18nService
      ? i18nService.translate(i18Messages.VALIDATE_OHIP_NUMBER_AND_CODE_FAILED)
      : i18Messages.VALIDATE_OHIP_NUMBER_AND_CODE_FAILED
    throw new BadRequestWarningException(errorMessage)
  }

  return {
    cleanOhipCardNumber,
    cleanOhipCardVersionCode,
    isValid,
  }
}

/** Returns  mdBilling is down errorMessage, or skipping based on input parameters */
export function getErrorMsgIfResponseFromMdBillingIfWrong({
  validateOhip,
  allowInvalidByMdBilling,
  skipExceptionIfMdBillingIsDown = false,
}: {
  validateOhip: MDBillingAdapterData<OHIPValidationResponse>
  allowInvalidByMdBilling?: boolean
  skipExceptionIfMdBillingIsDown?: boolean
}): {errorMessage: string; doesMdBillingIsDown: boolean} {
  if (allowInvalidByMdBilling || (validateOhip && validateOhip?.status === 200)) {
    return {errorMessage: null, doesMdBillingIsDown: false}
  }

  if (skipExceptionIfMdBillingIsDown) {
    return {errorMessage: null, doesMdBillingIsDown: true}
  }
  const configService = NestprojectConfigService.getInstance()
  const mdBillingProdEnable = configService.getBool('MDBILLING_PROD')
  if (
    !mdBillingProdEnable // this it to allow by mode 10 on dev later
  ) {
    return {errorMessage: null, doesMdBillingIsDown: false}
  }

  // this could happen when mdBilling is down, or staff billingNumber is wrong etc (and extra info will contains log in adapter)
  StructuredLogger.error(
    logFunc.ValidateOhipByMdBilling,
    logAct.ValidateOhipByMdBillingFailFromAdapter,
    {
      message: 'validation by mdBilling failed, adapter has not returned data or status',
    },
  )

  return {errorMessage: i18Messages.OHIP_VALIDATION_MD_BILLING_IS_DOWN, doesMdBillingIsDown: false}
}

export function getMdBillingErrorMsg(
  validateOhip: MDBillingAdapterData<OHIPValidationResponse>,
): string {
  const mdBillingErrors = validateOhip.data?.ErrorMessages?.join(', ') || ''

  if (!mdBillingErrors) {
    StructuredLogger.info(
      logFunc.ValidateOhipByMdBilling,
      logAct.OhipNotValidByMdBIllingAndDoesntHaveErrorMsg,
      {
        errMsg: `data: ${JSON.stringify(validateOhip?.data)}, status: ${validateOhip.status}`,
      },
    )
  }

  return mdBillingErrors
}

export function getInvalidOhipErrorMsg({
  validateOhip,
  showSpecificErrorMsgFromMdBilling,
  allowInvalidByMdBilling,
  i18nService,
}: {
  validateOhip: MDBillingAdapterData<OHIPValidationResponse>
  showSpecificErrorMsgFromMdBilling: boolean
  allowInvalidByMdBilling: boolean
  i18nService?: I18nLocalizationService
}): {errorMsg: string; mdBillingErrors?: string} {
  if (!validateOhip) {
    let errorMsg = ''
    if (allowInvalidByMdBilling) {
      errorMsg = i18nService
        ? i18nService.translate(i18Messages.OHIP_VALIDATE_BY_MD_BILLING_CARD_SAVE_ISSUE)
        : i18Messages.OHIP_VALIDATE_BY_MD_BILLING_CARD_SAVE_ISSUE
    } else {
      errorMsg = i18nService
        ? i18nService.translate(i18Messages.OHIP_VALIDATION_MD_BILLING_IS_DOWN)
        : i18Messages.OHIP_VALIDATION_MD_BILLING_IS_DOWN
    }
    return {errorMsg}
  }
  const mdBillingErrors = getMdBillingErrorMsg(validateOhip)

  if (showSpecificErrorMsgFromMdBilling) {
    return {
      mdBillingErrors,
      errorMsg: i18nService
        ? i18nService.translate(i18Messages.OHIP_VALIDATE_FAILED_BY_MD_BILLING_WITH_REASON, {
            mdBillingErrors,
          })
        : i18Messages.OHIP_VALIDATE_FAILED_BY_MD_BILLING_WITH_REASON.replace(
            '{mdBillingErrors}',
            mdBillingErrors,
          ),
    }
  }

  return {
    mdBillingErrors,
    errorMsg: i18nService
      ? i18nService.translate(i18Messages.OHIP_VALIDATE_BY_MD_BILLING_FALSE)
      : i18Messages.OHIP_VALIDATE_BY_MD_BILLING_FALSE,
  }
}

/** throwErrorMsgForALreadyExistOhip: common for mobile, or specified for web user*/
export function throwErrorMsgForAlreadyExistOhip({
  showSpecificErrorMsgFromMdBilling,
  patientsWithOHIP,
  currentPatientAuthUserId,
  i18nService,
}: {
  showSpecificErrorMsgFromMdBilling: boolean
  patientsWithOHIP: Patient[]
  currentPatientAuthUserId: string
  i18nService?: I18nLocalizationService
}): void {
  if (!showSpecificErrorMsgFromMdBilling) {
    const errorMessage = i18nService
      ? i18nService.translate(i18Messages.PATIENT_WITH_OHIP_ALREADY_EXISTS)
      : i18Messages.PATIENT_WITH_OHIP_ALREADY_EXISTS
    //common fo mobile
    throw new BadRequestWarningException(errorMessage)
  } else {
    //specific for clinic staff
    const patientsWithTheSameOhip = patientsWithOHIP.filter(
      (patient) => patient.authUserId != currentPatientAuthUserId,
    )

    const patientList = patientsWithTheSameOhip
      .map((patient) => `${patient.firstName} ${patient.lastName}`)
      .join(', ')

    const errorMessagePatient = i18nService
      ? i18nService.translate(i18Messages.ALREADY_EXIST_PATIENTS_WITH_THE_SAME_OHIP, {
          patientList,
        })
      : i18Messages.ALREADY_EXIST_PATIENTS_WITH_THE_SAME_OHIP.replace('{patientList}', patientList)
    throw new BadRequestWarningException(errorMessagePatient)
  }
}

export function writeErrorMsgIfBillingNumberHasBadFormat(randomCleanStuff: Staff): void {
  if (getJustDigitsFromString(randomCleanStuff.billingNumberForMdBilling)?.length != 6) {
    StructuredLogger.error(
      logFunc.GetRandomStaffBillingNumber,
      logAct.GetRandomStaffBillingNumberFailed,
      {
        message: `Info msg, staff.billingNumber has wrong format: it should be 6 digits, instead it is: ${randomCleanStuff.billingNumberForMdBilling}, staffUUID: ${randomCleanStuff.uuid}`,
      },
    )
  }
}
export const validateOhipExistence = (
  currentPatientAuthUserId: string,
  patientsWithOhip: Patient[],
): boolean => {
  if (!patientsWithOhip?.length) {
    return true
  }
  return (
    patientsWithOhip?.length === 1 && patientsWithOhip[0]?.authUserId === currentPatientAuthUserId
  )
}

export class OhipData {
  cleanOhipCardNumber?: string
  cleanOhipCardVersionCode?: string
  isValidByMdBilling: boolean
  mdBillingErrorMsg: string
}
