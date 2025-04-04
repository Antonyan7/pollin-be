import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

// declared to have shorted Logging in service
const logFunc = activityLogs.CreatePatientAndAppointmentFunctions
const logAct = activityLogs.CreatePatientAndAppointmentActions

export const validateEmailWithException = (email: string): void => {
  if (!validateEmail(email)) {
    StructuredLogger.warn(logFunc.ValidateEmail, logAct.ValidateEmailFailed, {})
    throw new Error('Email validation failed')
  }
}

export const validateEmail = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/
  const res = RegExp(regex).test(email)
  return res
}
