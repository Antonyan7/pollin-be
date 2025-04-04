import {Injectable} from '@nestjs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {
  Patient,
  PatientConsentModule,
  PatientConsentPackage,
  PatientConsentPackageSignatory,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

@Injectable()
export class PatientConsentAuditTrailService {
  constructor(private readonly auditPubSub: AuditTrailPubSubService) {}

  async addPatientPackageConsentAudit(
    items: PatientConsentPackage[],
    user: Staff | Patient,
    userAction: AuditUserAction,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      items.map((item) =>
        this.auditPubSub.publish({
          authUserId: user.authUserId,
          userAction,
          revisionId: item.revisionId,
          latestData: JSON.stringify(item),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientConsentPackageRevisions,
        }),
      ),
    )
  }

  async addPatientConsentModuleAudit(
    items: PatientConsentModule[],
    user: Staff | Patient,
    userAction: AuditUserAction,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      items.map((item) =>
        this.auditPubSub.publish({
          authUserId: user.authUserId,
          userAction,
          revisionId: item.revisionId,
          latestData: JSON.stringify(item),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientConsentModuleRevisions,
        }),
      ),
    )
  }

  async addPatientConsentPackageSignatoryAudit(
    items: PatientConsentPackageSignatory[],
    user: Staff | Patient,
    userAction: AuditUserAction,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      items.map((item) =>
        this.auditPubSub.publish({
          authUserId: user.authUserId,
          userAction,
          revisionId: item.revisionId,
          latestData: JSON.stringify(item),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientConsentPackageSignatoryRevisions,
        }),
      ),
    )
  }
}
