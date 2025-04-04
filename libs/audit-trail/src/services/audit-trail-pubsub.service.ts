import {Injectable} from '@nestjs/common'
import {DateTimeUtil, StructuredLogger, NestprojectConfigService} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {getAuditTrailRequestMetadata} from '@libs/services-common/helpers/async-hook'

@Injectable()
export class AuditTrailPubSubService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(private configService: NestprojectConfigService) {}

  async publish({
    authUserId,
    userAction,
    revisionId,
    latestData,
    authUserName,
    tableUpdated,
  }: {
    authUserId: string
    userAction: AuditUserAction
    revisionId: string
    latestData: string
    authUserName: string
    tableUpdated: AuditTrailCollection
  }): Promise<void> {
    const {deviceId, requestId, ipAddress} = getAuditTrailRequestMetadata()
    await PubSubHelpers.publishEmrDataChanged({
      revisionId,
      requestId,
      deviceId,
      authUserId,
      ipAddress,
      authUserName,
      dataUpdateDateTime: this.dateTimeUtil.nowInISOString(),
      userAction: userAction,
      latestData,
      tableUpdated,
    })
    StructuredLogger.info(
      activityLogs.AuditTrailServiceFunctions.PushTrailInPubSub,
      activityLogs.AuditTrailServiceActions.AuditTrailActivity,
      {
        authUserId,
        deviceId,
        requestId,
        userAction,
        tableUpdated,
      },
    )
  }
}
