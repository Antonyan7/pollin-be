import {DateTimeUtil, StructuredLogger, NestprojectConfigService} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {BadRequestValidationException} from '@libs/services-common/exceptions'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {set} from 'date-fns'
import {ClinicInfoService} from '@libs/services-common/services/clinic-info.service'
import {AppointmentAcuityResponse} from '../model/acuity.model'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {abbreviatedName} from './patient.helper'
import {BadRequestWarningValidationException} from '@libs/services-common/exceptions/bad-request-warning-validation.exception'

// declared to have shorted Logging in service
const logFunc = activityLogs.CreatePatientAndAppointmentFunctions
const logAct = activityLogs.CreatePatientAndAppointmentActions

const configService = NestprojectConfigService.getInstance()

const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
const clinicInfoService = new ClinicInfoService(configService)

export const validateAcuityDateOfBirthWithException = (
  acuityAppointment: AppointmentAcuityResponse,
  i18nService: I18nLocalizationService,
): void => {
  const day = Number(acuityAppointment.dateOfBirthDay)
  const monthNumber = dateTimeUtil.getMonthNumberFromMonthName(acuityAppointment.dateOfBirthMonth)
  const year = acuityAppointment.dateOfBirthYear

  if (!validateDayMonthYearValues(day, monthNumber, year)) {
    throwExceptionAcuityDateOfBirthIsNotValid(i18nService, acuityAppointment)
  }

  if (!dateTimeUtil.isValidDateByYMD({year, day, month: monthNumber})) {
    // for 31 of January
    throwExceptionAcuityDateOfBirthIsNotValid(i18nService, acuityAppointment)
  }

  const acuityAppointmentDateOfBirth = getAcuityAppointmentDateOfBirth(acuityAppointment)

  if (!dateTimeUtil.isValidDate(acuityAppointmentDateOfBirth)) {
    throwExceptionAcuityDateOfBirthIsNotValid(i18nService, acuityAppointment)
  }

  if (dateTimeUtil.isInFuture(acuityAppointmentDateOfBirth)) {
    throwExceptionAcuityDateOfBirthIsNotValid(i18nService, acuityAppointment)
  }
}

function validateDayMonthYearValues(day: number, monthNumber: number, year: number): boolean {
  if (!day || !monthNumber || !Number(year)) {
    return false
  }

  if (day < 1 || day > 31) {
    return false
  }

  if (monthNumber < 1 || monthNumber > 12) {
    return false
  }

  return true
}

function throwExceptionAcuityDateOfBirthIsNotValid(
  i18nService: I18nLocalizationService,
  acuityAppointment: AppointmentAcuityResponse,
): void {
  StructuredLogger.error(
    logFunc.ValidateAcuityDateOfBirthWithException,
    logAct.ValidateAcuityDateOfBirthWithExceptionFailed,
    {
      errMsg: `acuityAppointment DateOfBirth bad values. acuityAppointmentDay: ${acuityAppointment.dateOfBirthDay}, 
   acuityAppointmentMonth: ${acuityAppointment.dateOfBirthMonth}, acuityAppointmentYear: ${acuityAppointment.dateOfBirthYear}`,
    },
  )

  throw new BadRequestValidationException(
    i18nService
      ? i18nService.translate(i18Messages.VALIDATE_ACUITY_DATE_OF_BIRTH_FAILED)
      : i18Messages.VALIDATE_ACUITY_DATE_OF_BIRTH_FAILED,
  )
}

export function validateIsPastDateTime(
  startDate: Date,
  i18nService: I18nLocalizationService,
): void {
  if (dateTimeUtil.isBefore(startDate, dateTimeUtil.now())) {
    const errorMsg = i18nService
      ? i18nService.translate(i18Messages.CREATE_APPOINTMENT_PAST_DATE_TIME_ERROR)
      : i18Messages.CREATE_APPOINTMENT_PAST_DATE_TIME_ERROR

    StructuredLogger.warn(
      activityLogs.AppointmentFunction.CreateAppointment,
      activityLogs.AppointmentAction.DateIsInPast,
      {startDate},
    )
    throw new BadRequestWarningValidationException(errorMsg)
  }
}

export function isOutOfWorkingHours(date: string, durationInMinutes: number): boolean {
  const clinicWorkEndHour = clinicInfoService.getClinicHours().closeTime.split(':')[0]
  const clinicWorkStartHour = clinicInfoService.getClinicHours().openTime.split(':')[0]

  const isAfterClinicEndTime = dateTimeUtil.isBefore(
    set(dateTimeUtil.UTCToTz(date), {hours: Number(clinicWorkEndHour), minutes: 0}),
    dateTimeUtil.addMinutes(dateTimeUtil.UTCToTz(date), durationInMinutes),
  )

  const isBeforeClinicStartTime = dateTimeUtil.isAfter(
    set(dateTimeUtil.UTCToTz(date), {hours: Number(clinicWorkStartHour), minutes: 0}),
    dateTimeUtil.UTCToTz(date),
  )

  return isBeforeClinicStartTime || isAfterClinicEndTime
}

export function validateIsOutOfWorkingOurs(
  dateStr: string,
  durationInMinutes: number,
  i18nService: I18nLocalizationService,
): void {
  if (isOutOfWorkingHours(dateStr, durationInMinutes)) {
    StructuredLogger.warn(
      activityLogs.AppointmentFunction.CreateAppointment,
      activityLogs.AppointmentAction.CreateAppointmentFailed,
      {duration: durationInMinutes},
    )
    throw new BadRequestValidationException(
      i18nService
        ? i18nService.translate(i18Messages.APPOINTMENT_TIME_IS_OUT_OF_WORKING_HOURS)
        : i18Messages.APPOINTMENT_TIME_IS_OUT_OF_WORKING_HOURS,
    )
  }
}

export const validateDateOfBirth = (dateOfBirthStr: string): boolean => {
  const dateOfBirth = dateTimeUtil.toDate(dateOfBirthStr)

  if (!dateTimeUtil.isValidDate(dateOfBirth)) {
    return false
  }

  if (dateTimeUtil.isInFuture(dateOfBirth)) {
    return false
  }

  return true
}

export function getAcuityAppointmentDateOfBirth(
  acuityAppointment: AppointmentAcuityResponse,
): Date {
  return dateTimeUtil.getDateFromYMD({
    day: Number(acuityAppointment.dateOfBirthDay),
    month: dateTimeUtil.getMonthNumberFromMonthName(acuityAppointment.dateOfBirthMonth),
    year: acuityAppointment.dateOfBirthYear,
  })
}

export const validateDateOfBirthWithException = (
  dateOfBirthStr: string,
  i18nService: I18nLocalizationService,
): void => {
  if (!validateDateOfBirth(dateOfBirthStr)) {
    StructuredLogger.error(logFunc.CreatePatientAndAppointment, logAct.ValidateDateOfBirthFailed, {
      dateOfBirth: dateOfBirthStr,
    })
    throw new BadRequestValidationException(
      i18nService
        ? i18nService.translate(i18Messages.VALIDATE_DATE_OF_BIRTH_FAILED)
        : i18Messages.VALIDATE_DATE_OF_BIRTH_FAILED,
    )
  }
}

export const getLastUpdateDetails = (
  dateTimeUtil: DateTimeUtil,
  staff: Staff,
  date: Date,
): string => {
  if (staff && date) {
    return `Last updated by ${abbreviatedName(staff)} on ${dateTimeUtil.formatToMonthsDayYearWithTime(
      date,
    )}`
  }
  return null
}
