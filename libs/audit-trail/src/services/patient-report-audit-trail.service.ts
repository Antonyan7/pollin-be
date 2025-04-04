import {Injectable} from '@nestjs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PatientReport} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {PatientReportRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'

@Injectable()
export class PatientReportAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(
    private readonly auditPubSub: AuditTrailPubSubService,
    private configService: NestprojectConfigService,
    private patientReportRepository: PatientReportRepository,
  ) {}

  async addPatientReportAudit(
    data: PatientReport,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const latestData = JSON.stringify(data)
    const authUserName = getFullName(staff.firstName, staff.lastName)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())

    await this.patientReportRepository.update(
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
      tableUpdated: AuditTrailCollection.PatientReportRevisions,
    })
  }

  async updatePatientReportAudit(
    data: PatientReport,
    emrDataChangePayload: {userAction: AuditUserAction; authUserId: string},
    patient: Patient,
  ): Promise<void> {
    const latestData = JSON.stringify(data)
    const authUserName = getFullName(patient.firstName, patient.lastName)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())

    await this.patientReportRepository.update(
      {id: data.id},
      {
        revisionId,
        updatedBy: patient.authUserId,
      },
    )

    await this.auditPubSub.publish({
      authUserId: emrDataChangePayload.authUserId,
      userAction: emrDataChangePayload.userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientReportRevisions,
    })
  }
}
