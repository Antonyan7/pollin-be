import {Injectable} from '@nestjs/common'
import {AuditTrailPubSubService} from '@libs/audit-trail'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {AppointmentAddonRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {AppointmentAddon} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment-addon.entity'

@Injectable()
export class AppointmentAddonAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private appointmentAddonRepository: AppointmentAddonRepository,
    private readonly auditTrailPubSubService: AuditTrailPubSubService,
    private readonly staffRepository: StaffRepository,
    private readonly configService: NestprojectConfigService,
  ) {}

  async createAppointmentAddonAudit(data: {
    userAction: AuditUserAction
    authUserId: string
    appointmentId: number
    addonId: number
    appointmentAddon: AppointmentAddon
  }): Promise<void> {
    const {userAction, authUserId, appointmentId, addonId, appointmentAddon} = data
    const staffUser = await this.staffRepository.findOneByAuthUserId(authUserId)

    const authUserName = getFullName(staffUser.firstName, staffUser.lastName)
    const revisionId =
      userAction === AuditUserAction.Delete
        ? appointmentAddon.revisionId
        : generateRevisionId(this.dateTimeUtil.now())

    if (userAction !== AuditUserAction.Delete) {
      await this.appointmentAddonRepository.update(
        {appointmentId, addonId},
        {
          revisionId,
        },
      )
    }

    await this.auditTrailPubSubService.publish({
      authUserId,
      userAction,
      revisionId,
      latestData: JSON.stringify(appointmentAddon),
      authUserName,
      tableUpdated: AuditTrailCollection.AppointmentAddonRevisions,
    })
  }
}
