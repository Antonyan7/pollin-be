import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {StructuredLogger, LogType} from '@libs/common/utils/structured-logger'
import {AuditTrailActions, AuditTrailFunctions, SystemAuthUserId} from '@libs/common/enums'
import {PubSubAdapter} from '@libs/common/adapters'
import {
  AuditTrailPubSubPayload,
  AuditTrailSchema,
} from '@libs/common/model/proto-schemas/audit-trail.schema'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {AuditMetadataPubSubPayload} from '@libs/common/model/proto-schemas/audit-metadata.schema'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm/patient.entity'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export type CloudFunctionAuditTrailPayload = {
  systemAuthUserId: SystemAuthUserId
  requestId?: string
  revisionId: string
  userAction: AuditUserAction
  latestData: string
  tableUpdated: AuditTrailCollection
}

export async function publishCloudFunctionAuditTrailWithoutUser(
  {
    systemAuthUserId,
    revisionId,
    userAction,
    latestData,
    requestId,
    tableUpdated,
  }: CloudFunctionAuditTrailPayload,
  logType = LogType?.SystemLog,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_EMR_DATA_CHANGED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema<AuditTrailPubSubPayload>(
    {
      userAction,
      latestData,
      tableUpdated,
      revisionId,
      requestId,
      authUserId: systemAuthUserId,
      dataUpdateDateTime: dateTimeUtil.nowInISOString(),
    },
    AuditTrailSchema,
  )

  StructuredLogger.info(
    AuditTrailFunctions.PublishCloudFunctionAuditTrailWithoutUser,
    AuditTrailActions.AddAuditTrailPatientEMR,
    {message: 'AddAuditTrailPatientEMR', requestId},
    logType,
  )
}

export async function publishCFUserAuditTrail<T>(
  entities: T[],
  auditMetadata: {
    action: AuditUserAction
    payload: Omit<AuditMetadataPubSubPayload, 'revisionId'>
    tableUpdated: AuditTrailCollection
    user: Staff | Patient
  },
): Promise<void> {
  const audits = entities.map((data) => {
    return PubSubHelpers.publishEmrDataChanged({
      ...auditMetadata.payload,
      revisionId: data['revisionId'],
      userAction: auditMetadata.action,
      latestData: JSON.stringify(data),
      tableUpdated: auditMetadata.tableUpdated,
      dataUpdateDateTime: dateTimeUtil.nowInISOString(),
      authUserId: auditMetadata?.payload?.authUserId || auditMetadata?.user?.authUserId,
      authUserName: auditMetadata.user
        ? getFullName(auditMetadata.user.firstName, auditMetadata.user.lastName)
        : null,
    })
  })

  await Promise.all(audits)
}

export function extractAuditData<T extends Partial<AuditMetadataPubSubPayload>>(
  payload: T,
): AuditMetadataPubSubPayload {
  return {
    deviceId: payload?.deviceId,
    requestId: payload.requestId,
    ipAddress: payload.ipAddress,
    authUserId: payload?.authUserId,
    revisionId: payload?.revisionId,
  }
}
