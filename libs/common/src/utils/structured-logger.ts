import * as bunyan from 'bunyan'
import {LoggingBunyan} from '@google-cloud/logging-bunyan'
import {IOpenInformation} from '@libs/common/enums/logger.enum'
import {getRequestContext} from '@libs/services-common/helpers/async-hook'
import {ClientHeaders} from '@libs/common/enums'
import {isGAEorGCF, isMigration} from '@libs/common/utils/google-cloud-env'
import {isE2E} from './util'

export enum LogType {
  UserActivity = 'UserActivity',
  SystemLog = 'SystemLog',
  SpecimenGeneration = 'SpecimenGeneration',
  TestResultGeneration = 'TestResultGeneration',
  MilestoneGeneration = 'MilestoneGeneration',
  BloodMachineIntegration = 'BloodMachineIntegration',
  UltrasoundMachineIntegration = 'UltrasoundMachineIntegration',
  StripeIntegration = 'StripeIntegration',
  DrugBankIntegration = 'DrugBankIntegration',
  MailgunIntegration = 'MailgunIntegration',
  SendinblueIntegration = 'SendinblueIntegration',
  EmailNotification = 'EmailNotification',
  LabIntegration = 'LabIntegration',
  DynacareIntegration = 'DynacareIntegration',
  LifeLabsIntegration = 'LifeLabsIntegration',
  Migration = 'Migration',
  MigrationToolScript = 'MigrationToolScript',
  AutomatedTask = 'AutomatedTask',
  PushNotification = 'PushNotification',
  AcuityWebHook = 'AcuityWebHook',
  AdConversions = 'AdConversions',
  AcuityAppointmentSyncFailed = 'AcuityAppointmentSyncFailed',
  RescheduleAcuityAppointment = 'RescheduleAcuityAppointment',
  CancelAcuityAppointment = 'CancelAcuityAppointment',
  UpdatePatientContactInformationInAcuityAppointments = 'UpdatePatientContactInformationInAcuityAppointments',
  PaymentOrderUpdates = 'PaymentOrderUpdates',
  PaymentReceiptPDF = 'PaymentReceiptPDF',
  BulkDownloadGenerateDocument = 'BulkDownloadGenerateDocument',
  OhipValidation = 'OhipValidation',
  CryoSubscriptions = 'CryoSubscriptions',
  FertilityIqPDFReport = 'FertilityIqPDFReport',
  EggFreezingPDFReport = 'EggFreezingPDFReport',
  SendingSMSFailed = 'SendingSMSFailed',
}

type RequestContext = {
  authUserID: string
  deviceID: string
  requestID: string
  ipAddress: string
}

type LoggerContext<T> = {
  logType: LogType
  requestContext: RequestContext
  eventName: string
  functionName: string
  message?: string
  additionalMetaData: T
}

type UserActivityLoggerContext = {
  authUserId: string
  endpoint: string
}

const loggerPayload = <T>(
  context: {functionName: string; eventName: string; logType?: LogType},
  data: {message?: string} & T,
): LoggerContext<T> => {
  const {functionName, eventName, logType} = context
  const request = getRequestContext()
  const requestContext = request
    ? {
        authUserID: request?.userId,
        deviceID: request[ClientHeaders.DeviceId],
        requestID: request[ClientHeaders.RequestId],
        ipAddress: request.ipAddress,
      }
    : null

  return {
    logType: logType ?? LogType.SystemLog,
    requestContext: requestContext ?? StructuredLogger.requestContext ?? null,
    eventName,
    functionName,
    message: data?.message,
    additionalMetaData: data,
  }
}

type ActivityLogPayload<T> = {
  logType: LogType
  requestContext: {
    authUserID: string
    deviceID: string
    requestID: string
    ipAddress: string
  }
  endpoint: string
  additionalMetaData?: T
}

const userActivityLoggerPayload = <T>(
  {authUserId, endpoint}: UserActivityLoggerContext,
  additionalMetaData: T,
): ActivityLogPayload<T> => {
  const request = getRequestContext()

  const requestContext = {
    authUserID: authUserId,
    deviceID: request[ClientHeaders.DeviceId],
    requestID: request[ClientHeaders.RequestId],
    ipAddress: request.ipAddress,
  }

  const result: ActivityLogPayload<T> = {
    logType: LogType.UserActivity,
    requestContext,
    endpoint,
  }

  if (additionalMetaData) {
    result.additionalMetaData = additionalMetaData
  }

  return result
}
export class StructuredLogger {
  private static logger: bunyan = null

  private static initLogger(sourceName: string): bunyan {
    // Creates a Bunyan Cloud Logging client
    const logStreams = []

    if (isE2E()) {
      // for e2e test only log on console
      return bunyan.createLogger({
        name: sourceName,
        streams: [{stream: process.stdout, level: 'info'}],
      })
    }

    if (isGAEorGCF() || isMigration()) {
      const loggingBunyan = new LoggingBunyan({
        redirectToStdout: true,
        useMessageField: false,
      })
      // And log to Cloud Logging, logging at 'info' and above
      logStreams.push(loggingBunyan.stream('info'))
    } else {
      // Log to the console at 'info' and above
      logStreams.push({stream: process.stdout, level: 'info'})
    }

    // Create a Bunyan logger that streams to Cloud Logging
    return bunyan.createLogger({name: sourceName, streams: logStreams})
  }

  static requestContext: RequestContext
  // eslint-disable-next-line max-params
  static info(
    functionName: string,
    eventName: string,
    data: IOpenInformation,
    logType?: LogType,
  ): void {
    StructuredLogger.logger.info(loggerPayload({functionName, eventName, logType}, data))
  }

  // eslint-disable-next-line max-params
  static warn(
    functionName: string,
    eventName: string,
    data: IOpenInformation,
    logType?: LogType,
  ): void {
    StructuredLogger.logger.warn(loggerPayload({functionName, eventName, logType}, data))
  }

  static debug(functionName: string, eventName: string, data: IOpenInformation): void {
    StructuredLogger.logger.debug(loggerPayload({functionName, eventName}, data))
  }

  // eslint-disable-next-line max-params
  static error(
    functionName: string,
    eventName: string,
    data: IOpenInformation,
    logType?: LogType,
  ): void {
    StructuredLogger.logger.error(loggerPayload({functionName, eventName, logType}, data))
  }

  static activity(authUserId: string, endpoint: string, data: unknown): void {
    StructuredLogger.logger.info(userActivityLoggerPayload({authUserId, endpoint}, data))
  }

  static getLogger(): bunyan {
    if (!StructuredLogger.logger) {
      StructuredLogger.logger = this.initLogger(LogType.SystemLog)
    }
    return StructuredLogger.logger
  }

  // Used only for cloud functions, since we don't have asyncStorage there
  static setRequestContext({
    requestId,
    authUserId,
    deviceId,
    ipAddress,
  }: {
    requestId: string
    authUserId: string
    deviceId: string
    ipAddress: string
  }): void {
    StructuredLogger.requestContext = {
      requestID: requestId,
      authUserID: authUserId,
      deviceID: deviceId,
      ipAddress,
    }
  }
}

StructuredLogger.getLogger()

export const ActivityLogFields = new Set(['patientId', 'staffUserId'])
