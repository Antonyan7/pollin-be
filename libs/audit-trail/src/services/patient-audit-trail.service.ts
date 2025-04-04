/* eslint-disable max-lines */
import {Injectable} from '@nestjs/common'
import {
  PatientAbortionHistoryRepository,
  PatientAddressRepository,
  PatientAlertRepository,
  PatientDetailFemaleRepository,
  PatientDetailMaleRepository,
  PatientDetailRepository,
  PatientDoctorRepository,
  PatientEctopicPregnancyHistoryRepository,
  PatientFamilyHealthProblemRepository,
  PatientFullTermDeliveryHistoryRepository,
  PatientMiscarriageHistoryRepository,
  PatientPastSurgeryRepository,
  PatientPreTermDeliveryHistoryRepository,
  PatientPreviousFertilityTreatmentRepository,
  PatientRepository,
  PatientVitaminSupplementRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {
  Patient,
  PatientAlert,
  PatientDetailFemale,
  PatientDocument,
  PatientReferral,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Pharmacy} from '@libs/data-layer/apps/users/entities/typeorm/pharmacy.entity'
import {PharmacyRepository} from '@libs/data-layer/apps/users/repositories/typeorm/pharmacy.repository'

@Injectable()
export class PatientAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly patientDetailRepository: PatientDetailRepository,
    private readonly patientDetailFemaleRepository: PatientDetailFemaleRepository,
    private readonly patientDetailMaleRepository: PatientDetailMaleRepository,
    private readonly patientAddressRepository: PatientAddressRepository,
    private readonly patientEctopicPregnancyHistoryRepository: PatientEctopicPregnancyHistoryRepository,
    private readonly patientFamilyHealthProblemRepository: PatientFamilyHealthProblemRepository,
    private readonly patientFullTermDeliveryHistoryRepository: PatientFullTermDeliveryHistoryRepository,
    private readonly patientPreTermDeliveryHistoryRepository: PatientPreTermDeliveryHistoryRepository,
    private readonly patientMiscarriageHistoryRepository: PatientMiscarriageHistoryRepository,
    private readonly patientAbortionHistoryRepository: PatientAbortionHistoryRepository,
    private readonly patientDoctorRepository: PatientDoctorRepository,
    private readonly patientPastSurgeryRepository: PatientPastSurgeryRepository,
    private readonly patientPreviousFertilityTreatmentRepository: PatientPreviousFertilityTreatmentRepository,
    private readonly patientVitaminSupplementRepository: PatientVitaminSupplementRepository,
    private readonly staffRepository: StaffRepository,
    private readonly auditPubSub: AuditTrailPubSubService,
    private readonly patientAlertRepository: PatientAlertRepository,
    private readonly pharmacyRepository: PharmacyRepository,
    private configService: NestprojectConfigService,
  ) {}

  async addPatientAudit(
    authUserId: string,
    userAction: AuditUserAction,
    patientId?: number,
  ): Promise<void> {
    const patient = authUserId
      ? await this.patientRepository.findOneBy({authUserId})
      : await this.patientRepository.findOneById(patientId)

    if (!patient) {
      return
    }

    const latestData = JSON.stringify(patient)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientRepository.update({id: patient.id}, {revisionId, updatedBy: authUserId})
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientsRevisions,
    })
  }

  async addPatientAuditByUser(
    user: Staff | Patient,
    userAction: AuditUserAction,
    patient: Patient,
  ): Promise<void> {
    if (!patient) {
      return
    }

    await this.auditPubSub.publish({
      authUserId: user.authUserId,
      userAction,
      revisionId: patient.revisionId,
      latestData: JSON.stringify(patient),
      authUserName: getFullName(user.firstName, user.lastName),
      tableUpdated: AuditTrailCollection.PatientsRevisions,
    })
  }

  async addPatientAuditFromClinic(
    patientAuthUserId: string,
    userAction: AuditUserAction,
    clinicStaffAuthUserId: string,
  ): Promise<void> {
    const updaterUser = await this.staffRepository.findOneBy({authUserId: clinicStaffAuthUserId})
    const patientData = await this.patientRepository.findOneBy({authUserId: patientAuthUserId})
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: patientAuthUserId},
    )

    const authUserName = `${updaterUser.firstName} ${updaterUser.lastName}`

    await this.auditPubSub.publish({
      authUserId: clinicStaffAuthUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientsRevisions,
    })
  }

  async addPatientDetailAudit(
    authUserId: string,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const updaterUser = await this.staffRepository.findOneBy({authUserId: updaterAuthUserId})
    const patient = await this.patientRepository.findOne({
      where: {authUserId},
      relations: {detail: true},
    })
    const patientDetail = patient.detail
    const latestData = JSON.stringify(patientDetail)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientDetailRepository.update(
      {id: patientDetail.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = `${updaterUser.firstName} ${updaterUser.lastName}`
    await this.auditPubSub.publish({
      authUserId: updaterAuthUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientDetailRevisions,
    })
  }

  async addPatientDetailFemaleAudit(
    authUserId: string,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const updaterUser = await this.staffRepository.findOneBy({authUserId: updaterAuthUserId})
    const patient = await this.patientRepository.findOne({
      where: {authUserId},
      relations: {detailFemale: true},
    })
    const patientDetailFemale = patient.detailFemale
    const latestData = JSON.stringify(patientDetailFemale)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientDetailFemaleRepository.update(
      {id: patientDetailFemale.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = `${updaterUser.firstName} ${updaterUser.lastName}`
    await this.auditPubSub.publish({
      authUserId: updaterAuthUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientDetailFemaleRevisions,
    })
  }

  async addPatientDetailMaleAudit(
    authUserId: string,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const updaterUser = await this.staffRepository.findOneBy({authUserId: updaterAuthUserId})
    const patient = await this.patientRepository.findOne({
      where: {authUserId},
      relations: {detailMale: true},
    })
    const patientDetailMale = patient.detailMale
    const latestData = JSON.stringify(patientDetailMale)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientDetailMaleRepository.update(
      {id: patientDetailMale.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = `${updaterUser.firstName} ${updaterUser.lastName}`
    await this.auditPubSub.publish({
      authUserId: updaterAuthUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientDetailMaleRevisions,
    })
  }

  async addPatientAddressAudit(
    authUserId: string,
    userAction: AuditUserAction,
    id: number,
  ): Promise<void> {
    const addressData = await this.patientAddressRepository.findOneBy({id})
    const patient = await this.patientRepository.findOneBy({authUserId})
    const latestData = JSON.stringify(addressData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientAddressRepository.update({id}, {revisionId, updatedBy: authUserId})
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientAddressRevisions,
    })
  }

  async addPatientAddressAuditFromClinicUser(
    authUserId: string,
    userAction: AuditUserAction,
    id: number,
  ): Promise<void> {
    const addressData = await this.patientAddressRepository.findOneBy({id})
    const authUser = await this.staffRepository.findOneBy({authUserId})
    const latestData = JSON.stringify(addressData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientAddressRepository.update({id}, {revisionId, updatedBy: authUserId})
    const authUserName = getFullName(authUser.firstName, authUser.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientAddressRevisions,
    })
  }

  async addPatientEctopicPregnancyHistoryAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const patient = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientEctopicPregnancyHistoryRepository.findOneBy({uuid})
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientEctopicPregnancyHistoryRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientEctopicPregnancyHistoryRevisions,
    })
  }

  async addPatientFamilyHealthProblemAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const patient = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientFamilyHealthProblemRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientFamilyHealthProblemRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientFamilyHealthProblemRevisions,
    })
  }

  async addPatientFullTermDeliveryHistoryAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const updaterUser = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientFullTermDeliveryHistoryRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientFullTermDeliveryHistoryRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = `${updaterUser.firstName} ${updaterUser.lastName}`
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientFullTermDeliveryHistoryRevisions,
    })
  }

  async addPatientPreTermDeliveryHistoryAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const patient = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientPreTermDeliveryHistoryRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientPreTermDeliveryHistoryRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPreTermDeliveryHistoryRevisions,
    })
  }

  async addPatientMiscarriageHistoryAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const updaterUser = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientMiscarriageHistoryRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientMiscarriageHistoryRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = `${updaterUser.firstName} ${updaterUser.lastName}`
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientMiscarriageHistoryRevisions,
    })
  }

  async addPatientAbortionHistoryAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const patient = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientAbortionHistoryRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientAbortionHistoryRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientAbortionHistoryRevisions,
    })
  }

  async addPatientDoctorAudit(
    id: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const patient = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientDoctorRepository.findOneBy({id})
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientDoctorRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientDoctorRevisions,
    })
  }

  async addPatientPastSurgeryAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const patient = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientPastSurgeryRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientPastSurgeryRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPastSurgeryRevisions,
    })
  }

  async addPatientPreviousFertilityTreatmentAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const updaterUser = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientPreviousFertilityTreatmentRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientPreviousFertilityTreatmentRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = `${updaterUser.firstName} ${updaterUser.lastName}`
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPreviousFertilityTreatmentRevisions,
    })
  }

  async addPatientVitaminSupplementAudit(
    uuid: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const patient = await this.staffRepository.findOneBy({authUserId})
    const patientData = await this.patientVitaminSupplementRepository.findOneBy({
      uuid,
    })
    const latestData = JSON.stringify(patientData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await this.patientVitaminSupplementRepository.update(
      {id: patientData.id},
      {revisionId, updatedBy: authUserId},
    )
    const authUserName = getFullName(patient.firstName, patient.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientVitaminSupplementRevisions,
    })
  }

  async addPatientMilestonesAuditFromClinic(
    patientMilestones: PatientMilestone[],
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const staff = await this.staffRepository.findOneBy({authUserId})

    const authUserName = getFullName(staff.firstName, staff.lastName)
    await Promise.all(
      patientMilestones.map((patientMilestone) => {
        const latestData = JSON.stringify(patientMilestone)
        return this.auditPubSub.publish({
          authUserId,
          userAction,
          revisionId: patientMilestone.revisionId,
          latestData,
          authUserName,
          tableUpdated: AuditTrailCollection.PatientMilestoneRevisions,
        })
      }),
    )
  }

  async addPatientMilestonesAuditForPatient(
    patientMilestones: PatientMilestone[],
    userAction: AuditUserAction,
    user: Patient | Staff,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)
    await Promise.all(
      patientMilestones.map((patientMilestone) => {
        const latestData = JSON.stringify(patientMilestone)
        return this.auditPubSub.publish({
          authUserId: user.authUserId,
          userAction,
          revisionId: patientMilestone.revisionId,
          latestData,
          authUserName,
          tableUpdated: AuditTrailCollection.PatientMilestoneRevisions,
        })
      }),
    )
  }

  async addPatientMilestoneAuditForPatient(
    patientMilestone: PatientMilestone,
    userAction: AuditUserAction,
    patient: Patient,
  ): Promise<void> {
    const authUserName = getFullName(patient?.firstName, patient?.lastName)
    await this.auditPubSub.publish({
      authUserId: patient?.authUserId,
      userAction,
      revisionId: patientMilestone.revisionId,
      latestData: JSON.stringify(patientMilestone),
      authUserName,
      tableUpdated: AuditTrailCollection.PatientMilestoneRevisions,
    })
  }

  async addPatientDocumentAudit(
    patientDocument: PatientDocument,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const staff = await this.staffRepository.findOneBy({authUserId})
    const authUserName = getFullName(staff?.firstName, staff?.lastName)
    await this.auditPubSub.publish({
      authUserId,
      userAction,
      revisionId: patientDocument.revisionId,
      latestData: JSON.stringify(patientDocument),
      authUserName,
      tableUpdated: AuditTrailCollection.PatientDocumentRevisions,
    })
  }

  async addPatientReferralsAudit(
    patientReferrals: PatientReferral[],
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const staff = await this.staffRepository.findOneBy({authUserId})
    const authUserName = getFullName(staff?.firstName, staff?.lastName)
    await Promise.all([
      patientReferrals.map((patientReferral) =>
        this.auditPubSub.publish({
          authUserId,
          userAction,
          revisionId: patientReferral.revisionId,
          latestData: JSON.stringify(patientReferral),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientReferralRevisions,
        }),
      ),
    ])
  }

  async addPatientAlertAudit(
    authUserId: string,
    userAction: AuditUserAction,
    patientAlert: PatientAlert,
  ): Promise<void> {
    const staff = await this.staffRepository.findOneBy({authUserId})
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await Promise.all([
      this.patientAlertRepository.update({id: patientAlert.id}, {revisionId}),
      this.auditPubSub.publish({
        authUserId,
        userAction,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
        latestData: JSON.stringify(patientAlert),
        authUserName: getFullName(staff.firstName, staff.lastName),
        tableUpdated: AuditTrailCollection.PatientAlertRevisions,
      }),
    ])
  }

  async addPatientPharmacyAudit(
    pharmacy: Pharmacy,
    user: Staff | Patient,
    userAction: AuditUserAction,
  ): Promise<void> {
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    await Promise.all([
      this.pharmacyRepository.update({id: pharmacy.id}, {revisionId}),
      this.auditPubSub.publish({
        authUserId: user?.authUserId,
        userAction,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
        latestData: JSON.stringify(pharmacy),
        authUserName: getFullName(user?.firstName, user?.lastName),
        tableUpdated: AuditTrailCollection.PatientPharmacyRevisions,
      }),
    ])
  }

  async addPatientDetailFemaleAuditByUser(
    patientDetailFemale: PatientDetailFemale,
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)
    await this.auditPubSub.publish({
      authUserId: user.authUserId,
      userAction,
      revisionId: patientDetailFemale.revisionId,
      latestData: JSON.stringify(patientDetailFemale),
      authUserName,
      tableUpdated: AuditTrailCollection.PatientDetailFemaleRevisions,
    })
  }
}
