import {Injectable} from '@nestjs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {
  SchedulingTemplate,
  SchedulingTemplatePeriod,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'

@Injectable()
export class SchedulingAuditTrailService {
  constructor(private readonly auditTrailPubSubService: AuditTrailPubSubService) {}

  async addSchedulingTemplateAudit(
    schedulingTemplate: SchedulingTemplate,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    await this.auditTrailPubSubService.publish({
      authUserId: staff.authUserId,
      userAction,
      revisionId: schedulingTemplate.revisionId,
      latestData: JSON.stringify(schedulingTemplate),
      authUserName: `${staff.firstName} ${staff.lastName}`,
      tableUpdated: AuditTrailCollection.SchedulingTemplateRevisions,
    })
  }

  async addSchedulingTemplatePeriodsAudit(
    schedulingTemplatePeriodsWithServiceTypes: SchedulingTemplatePeriod[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    await Promise.all(
      schedulingTemplatePeriodsWithServiceTypes.map((schedulingTemplatePeriod) => {
        //Recreate relation for JSON
        const schedulingTemplatePeriodToServiceType = schedulingTemplatePeriod.serviceTypes?.map(
          ({id}) => ({schedulingTemplatePeriodId: schedulingTemplatePeriod.id, serviceTypeId: id}),
        )
        schedulingTemplatePeriod.serviceTypes = null

        return this.auditTrailPubSubService.publish({
          authUserId: staff.authUserId,
          userAction,
          revisionId: schedulingTemplatePeriod.revisionId,
          latestData: JSON.stringify({
            ...schedulingTemplatePeriod,
            schedulingTemplatePeriodToServiceType,
          }),
          authUserName: `${staff.firstName} ${staff.lastName}`,
          tableUpdated: AuditTrailCollection.SchedulingTemplatePeriodRevisions,
        })
      }),
    )
  }
}
