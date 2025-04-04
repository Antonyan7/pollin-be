import {MultiFactorInfo, PhoneMultiFactorInfo} from 'firebase-admin/lib/auth'
import {UserRecord} from 'firebase-admin/auth'
import {handleOptionalStringValues, StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {BadRequestValidationException} from '@libs/services-common/exceptions'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import * as i18Messages from '@libs/common/i18n/en/message.json'

// declared to have shorted Logging in service
const logFunc = activityLogs.CreatePatientAndAppointmentFunctions
const logAct = activityLogs.CreatePatientAndAppointmentActions

/**Coverts only Canadian/USA (+14092841029 to (409) 284-1029)**/
export function formatPhoneNumber(rawPhoneNumber: string): string {
  if (typeof rawPhoneNumber !== 'string') {
    return rawPhoneNumber
  }

  const match = rawPhoneNumber.match(/^(\+1)(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[2] + ') ' + match[3] + '-' + match[4]
  }

  return rawPhoneNumber
}

export function cleanPhoneNumber(rawNumber: string): string {
  return handleOptionalStringValues(rawNumber?.replace(/[^\d+]/g, '')?.replace(/(?!^)\+/g, ''))
}

export function getPhoneNumberFactor(enrolledFactors: MultiFactorInfo[]): PhoneMultiFactorInfo {
  const phoneMultiFactorInfos = enrolledFactors?.filter((factor) => factor.factorId === 'phone')
  if (!phoneMultiFactorInfos?.length) {
    return null
  }

  const latestPhoneMultiFactorInfo = phoneMultiFactorInfos[
    phoneMultiFactorInfos.length - 1
  ] as PhoneMultiFactorInfo
  return latestPhoneMultiFactorInfo
}

export function getPhoneNumber(userInfo: UserRecord): string {
  return getPhoneNumberFactor(userInfo?.multiFactor?.enrolledFactors)?.phoneNumber
}

/**
 * Automatically add + or +1 if phone has less 10 digits
 * it is not perfect - as some country has 1 county code and some 2 numbers
 */
export const autoCompletePhoneNumberForShortFormat = (phoneNumber: string): string => {
  // get just digits
  let justNumbersPhone = phoneNumber.replace(/\D/g, '')

  if (justNumbersPhone.length <= 10) {
    justNumbersPhone = '1' + justNumbersPhone

    if (justNumbersPhone.length < 10) {
      StructuredLogger.warn(
        logFunc.AutoFillPhoneNumberForShortFormat,
        logAct.PhoneNumberHasLessThan10DigitsAndWeAutomaticallyAddedPlus1WhichCouldCauseIssue,
        {},
      )
    }
  }
  return '+' + justNumbersPhone
}

export const validatePhoneNumberWithException = (
  phoneNumber: string,
  i18nService: I18nLocalizationService,
): void => {
  if (!validatePhoneNumber(phoneNumber)) {
    StructuredLogger.warn(logFunc.ValidatePhoneNumber, logAct.ValidatePhoneNumberFailed, {})
    throw new BadRequestValidationException(
      i18nService
        ? i18nService.translate(i18Messages.VALIDATE_PHONE_NUMBER_FAILED)
        : i18Messages.VALIDATE_PHONE_NUMBER_FAILED,
    )
  }
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const regexForNumber = `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$`
  return RegExp(regexForNumber).test(phoneNumber)
}
