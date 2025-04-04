import {Injectable} from '@nestjs/common'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {PatientMilestoneRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient, PatientConsentPackage} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  AuditUserAction,
  PatientMilestoneStatus,
  PatientMilestoneType,
} from '@libs/services-common/enums'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {CommonAction, PatientMilestoneActions, PatientMilestoneFunctions} from '@libs/common/enums'
import {PatientAuditTrailService} from '@libs/audit-trail'
import {ConsentsReminderManagmentService} from './consent-reminder-managment.service'
import {Equal} from 'typeorm'

@Injectable()
export class ConsentsMilestoneService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private readonly patientAuditTrailService: PatientAuditTrailService,
    private readonly configService: NestprojectConfigService,
    private readonly patientMilestoneRepository: PatientMilestoneRepository,

    private readonly consentsReminderManagmentService: ConsentsReminderManagmentService,
  ) {}

  async createForConsentPackage(
    patientId: number, // main or one of partners
    patientConsentPackage: PatientConsentPackage,
    user: Patient | Staff,
  ): Promise<{id: string}> {
    if (!this.configService.getBool('FEATURE_CONSENT_MILESTONE')) {
      StructuredLogger.info(
        PatientMilestoneFunctions.CreateForConsentPackage,
        PatientMilestoneActions.CreateForConsentPackageDisabled,
        {patientId},
      )

      return
    }

    const patientConsentPackageId = patientConsentPackage.id

    const patientMilestone = await this.patientMilestoneRepository.save({
      patientId,
      patientConsentPackageId,
      status: PatientMilestoneStatus.Upcoming,
      type: PatientMilestoneType.ConsentPackage,
      isDisabled: false,

      revisionId: generateRevisionId(this.dateTimeUtil.now()),
    })

    await Promise.all([
      this.patientAuditTrailService.addPatientMilestonesAuditForPatient(
        [patientMilestone],
        AuditUserAction.Create,
        user,
      ),
      this.consentsReminderManagmentService.createConsentPackageReminder(
        patientId,
        patientConsentPackageId,
      ),
    ])
  }

  async updateMilestoneToPast(patient: Patient, patientConsentPackageId: number): Promise<void> {
    StructuredLogger.info(
      PatientMilestoneFunctions.UpdateMilestoneToPast,
      CommonAction.StartMethod,
      {
        message: `updateMilestoneToPast starts with patient: ${patient.id} and patientConsentPackageId: ${patientConsentPackageId}`,
      },
    )

    const patientMilestone = await this.patientMilestoneRepository.findOne({
      where: {
        patientId: Equal(patient.id),
        patientConsentPackageId: Equal(patientConsentPackageId),
      },
    })

    await Promise.all([
      this.patientMilestoneRepository.update(patientMilestone.id, {
        status: PatientMilestoneStatus.Past,
      }),

      this.patientAuditTrailService.addPatientMilestonesAuditForPatient(
        [patientMilestone],
        AuditUserAction.Update,
        patient,
      ),
    ])
  }
}
