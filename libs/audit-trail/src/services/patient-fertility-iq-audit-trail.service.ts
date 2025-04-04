import {Injectable} from '@nestjs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  PatientFertilityIQ,
  PatientFertilityIQFemale,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  PatientFertilityIQRepository,
  PatientFertilityIQFemaleRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'

@Injectable()
export class PatientFertilityIQAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private auditPubSub: AuditTrailPubSubService,
    private configService: NestprojectConfigService,
    private patientFertilityIQRepository: PatientFertilityIQRepository,
    private patientFertilityIQFemaleRepository: PatientFertilityIQFemaleRepository,
  ) {}

  async addPatientFertilityIQAudit(
    data: PatientFertilityIQ,
    userAction: AuditUserAction,
    staff: Staff | null,
  ): Promise<void> {
    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = staff ? getFullName(staff.firstName, staff.lastName) : 'System'

    await this.patientFertilityIQRepository.update(
      {id: data.id},
      {
        revisionId,
        updatedBy: staff ? staff.authUserId : 'System',
        updatedByStaffId: staff ? staff.id : null,
      },
    )

    await this.auditPubSub.publish({
      authUserId: staff ? staff.authUserId : 'System',
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientFertilityIQRevisions,
    })
  }

  async addPatientFertilityIQFemaleAudit(
    data: PatientFertilityIQFemale,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await this.patientFertilityIQFemaleRepository.update(
      {id: data.id},
      {
        revisionId,
        updatedBy: staff.authUserId,
        updatedByStaffId: staff.id,
      },
    )

    await this.auditPubSub.publish({
      authUserId: staff.authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientFertilityIQRevisions,
    })
  }
}
