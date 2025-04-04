import {Injectable} from '@nestjs/common'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {AuditTrailPubSubService} from '@libs/audit-trail'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

@Injectable()
export class LabSyncEntitiesAuditTrialService {
  constructor(private auditPubSub: AuditTrailPubSubService) {}

  async addLabSyncObservationsAudit<T>({
    updatedData,
    userAction,
    staff,
    revisionId,
    tableUpdated,
  }: {
    updatedData: T
    userAction: AuditUserAction
    staff: Staff
    revisionId: string
    tableUpdated: AuditTrailCollection
  }): Promise<void> {
    const latestData = JSON.stringify(updatedData)
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await this.auditPubSub.publish({
      authUserId: staff.authUserId,
      userAction: userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated,
    })
  }
}
