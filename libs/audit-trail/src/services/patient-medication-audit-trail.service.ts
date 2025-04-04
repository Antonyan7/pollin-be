import {Injectable} from '@nestjs/common'
import {
  PatientMedicationRepository,
  PatientRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {PatientPrescriptionRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-prescription.repository'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient, PatientMedication} from '@libs/data-layer/apps/users/entities/typeorm'
import {Equal, In} from 'typeorm'

@Injectable()
export class PatientMedicationAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientMedicationRepository: PatientMedicationRepository,
    private readonly patientPrescriptionRepository: PatientPrescriptionRepository,
    private readonly staffRepository: StaffRepository,
    private readonly auditPubSub: AuditTrailPubSubService,
    private readonly configService: NestprojectConfigService,
  ) {}

  async addPatientMedicationAuditById(
    id: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [patient, patientMedication] = await Promise.all([
      this.patientRepository.findOneByAuthUserId(authUserId),
      this.patientMedicationRepository.findOneBy({
        id,
      }),
    ])
    const latestData = JSON.stringify(patientMedication)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientMedicationRepository.update(
      {id: patientMedication.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientMedicationRevisions,
    })
  }

  async addPatientMedicationAuditFromClinicUser(
    id: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [staff, patientMedication] = await Promise.all([
      this.staffRepository.findOneByAuthUserId(authUserId),
      this.patientMedicationRepository.findOneBy({
        id,
      }),
    ])
    const latestData = JSON.stringify(patientMedication)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientMedicationRepository.update(
      {id: patientMedication.id},
      {revisionId, updatedBy: authUserId, updatedByStaffId: staff.id},
    )
    const authUserName = getFullName(staff.firstName, staff.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientMedicationRevisions,
    })
  }

  async addPatientMedicationsAudit(
    patientMedicationsIds: number[],
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const patientMedications = await this.patientMedicationRepository.findBy({
      id: In(patientMedicationsIds),
    })
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const updatePayload = {
      revisionId,
      updatedBy: user.authUserId,
      updatedByStaffId: user.id,
    }

    await this.patientMedicationRepository.update(
      patientMedications.map((item) => item.id),
      updatePayload,
    )
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      patientMedications.map((item) => {
        const latestData = JSON.stringify({...item, ...updatePayload})

        return this.auditPubSub.publish({
          authUserId: user.authUserId,
          userAction,
          revisionId,
          latestData,
          authUserName,
          tableUpdated: AuditTrailCollection.PatientMedicationRevisions,
        })
      }),
    )
  }

  async addPatientMedicationAuditByUuid(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [staff, patientMedication] = await Promise.all([
      this.staffRepository.findOneBy({authUserId}),
      this.patientMedicationRepository.findOneBy({
        uuid,
      }),
    ])
    const latestData = JSON.stringify(patientMedication)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientMedicationRepository.update(
      {id: patientMedication.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(staff.firstName, staff.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientMedicationRevisions,
    })
  }

  async addPatientPrescriptionAuditFromClinicUser(
    id: number,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const patientPrescription = await this.patientPrescriptionRepository.findOneBy({
      id: Equal(id),
    })

    const authUserId = staff.authUserId
    const latestData = JSON.stringify(patientPrescription)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientPrescriptionRepository.update(patientPrescription.id, {
      revisionId,
      updatedBy: authUserId,
      updatedByStaffId: staff.id,
    })
    const authUserName = getFullName(staff.firstName, staff.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPrescriptionRevisions,
    })
  }

  async addPatientPrescriptionAuditFromMobile(
    id: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [patient, patientPrescription] = await Promise.all([
      this.patientRepository.findOneBy({authUserId}),
      this.patientPrescriptionRepository.findOneBy({
        id,
      }),
    ])
    const latestData = JSON.stringify(patientPrescription)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientPrescriptionRepository.update(patientPrescription.id, {
      revisionId,
      updatedBy: authUserId,
    })
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPrescriptionRevisions,
    })
  }

  async addPatientMedicationAudit(
    patientMedication: PatientMedication,
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const latestData = JSON.stringify(patientMedication)
    const authUserName = getFullName(user.firstName, user.lastName)
    await this.auditPubSub.publish({
      authUserId: user.authUserId,
      userAction,
      revisionId: patientMedication.revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientMedicationRevisions,
    })
  }
}
