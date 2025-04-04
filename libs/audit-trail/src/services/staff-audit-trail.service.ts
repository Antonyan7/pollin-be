import {Injectable} from '@nestjs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {Staff, Task} from '@libs/data-layer/apps/clinic-tasks/entities'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'

@Injectable()
export class StaffAuditTrailService {
  constructor(private readonly auditTrailPubSubService: AuditTrailPubSubService) {}

  async addTaskAudit(task: Task, userAction: AuditUserAction, staff: Staff): Promise<void> {
    await this.auditTrailPubSubService.publish({
      authUserId: staff.authUserId,
      userAction,
      revisionId: task.revisionId,
      latestData: JSON.stringify(task),
      authUserName: `${staff?.firstName} ${staff?.lastName}`,
      tableUpdated: AuditTrailCollection.TaskRevisions,
    })
  }
}
