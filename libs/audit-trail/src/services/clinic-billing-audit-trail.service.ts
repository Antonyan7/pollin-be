import {Injectable} from '@nestjs/common'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {
  OhipClaimRepository,
  OhipClaimToCodeRepository,
} from '@libs/data-layer/apps/clinic-billing/repositories'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {AuditTrailPubSubService} from '@libs/audit-trail/services/audit-trail-pubsub.service'
import {
  OhipClaimToCode,
  PatientPaymentEstimateEmailAttempt,
} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {PatientAdhocPaymentRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-adhoc-payment.repository'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'

@Injectable()
export class ClinicBillingAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private readonly auditTrailPubSubService: AuditTrailPubSubService,
    private readonly configService: NestprojectConfigService,
    private readonly staffRepository: StaffRepository,
    private readonly ohipClaimRepository: OhipClaimRepository,
    private readonly ohipClaimToCodeRepository: OhipClaimToCodeRepository,
    private readonly patientAdhocPaymentRepository: PatientAdhocPaymentRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async addOhipClaimToCodeAuditTrailFromClinic(data: {
    authUserId: string
    authUserName: string
    userAction: AuditUserAction
    ohipClaimToCode: OhipClaimToCode
  }): Promise<void> {
    const {authUserId, authUserName, userAction, ohipClaimToCode} = data

    const revisionId =
      userAction === AuditUserAction.Delete
        ? ohipClaimToCode.revisionId
        : generateRevisionId(this.dateTimeUtil.now())

    const promises = []
    promises.push(
      this.auditTrailPubSubService.publish({
        authUserId,
        userAction,
        revisionId,
        latestData: JSON.stringify(ohipClaimToCode),
        authUserName,
        tableUpdated: AuditTrailCollection.OHIPClaimToCodeRevisions,
      }),
    )

    if (userAction !== AuditUserAction.Delete) {
      promises.push(this.ohipClaimToCodeRepository.update({id: ohipClaimToCode.id}, {revisionId}))
    }

    await Promise.all(promises)
  }

  async addOhipClaimAuditTrailFromClinic(
    ohipClaimUUID: string,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [ohipClaim, staffUser] = await Promise.all([
      this.ohipClaimRepository.findOneByUuid(ohipClaimUUID),
      this.staffRepository.findOneByAuthUserId(authUserId),
    ])

    const authUserName = getFullName(staffUser.firstName, staffUser.lastName)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())

    await Promise.all([
      this.ohipClaimRepository.update({uuid: ohipClaimUUID}, {revisionId}),
      this.auditTrailPubSubService.publish({
        authUserId,
        userAction,
        revisionId,
        latestData: JSON.stringify(ohipClaim),
        authUserName,
        tableUpdated: AuditTrailCollection.OHIPClaimRevisions,
      }),
    ])
  }

  async addPatientAdhocPaymentAudit(
    authUserId: string,
    userAction: AuditUserAction,
    id: number,
  ): Promise<void> {
    const staffUser = await this.staffRepository.findOneByAuthUserId(authUserId)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staffUser.firstName, staffUser.lastName)
    const patientAdhocPayment = await this.patientAdhocPaymentRepository.findOneBy({id})

    await Promise.all([
      this.patientAdhocPaymentRepository.update({id}, {revisionId}),
      this.auditTrailPubSubService.publish({
        authUserId,
        userAction,
        revisionId,
        latestData: JSON.stringify(patientAdhocPayment),
        authUserName,
        tableUpdated: AuditTrailCollection.PatientAdhocPaymentRevisions,
      }),
    ])
  }

  async addPatientAdhocPaymentAuditFromMobile(
    authUserId: string,
    userAction: AuditUserAction,
    id: number,
  ): Promise<void> {
    const patient = await this.patientRepository.findOneByAuthUserId(authUserId)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(patient.firstName, patient.lastName)
    const patientAdhocPayment = await this.patientAdhocPaymentRepository.findOneBy({id})

    await Promise.all([
      this.patientAdhocPaymentRepository.update({id}, {revisionId}),
      this.auditTrailPubSubService.publish({
        authUserId,
        userAction,
        revisionId,
        latestData: JSON.stringify(patientAdhocPayment),
        authUserName,
        tableUpdated: AuditTrailCollection.PatientAdhocPaymentRevisions,
      }),
    ])
  }

  async addPatientPaymentEstimateEmailAttemptAudit(
    emailAttempt: PatientPaymentEstimateEmailAttempt,
    userAction: AuditUserAction,
    user: Patient | Staff,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await this.auditTrailPubSubService.publish({
      authUserId: user.authUserId,
      userAction,
      revisionId: emailAttempt.revisionId,
      latestData: JSON.stringify(emailAttempt),
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPaymentEstimateEmailAttemptsRevisions,
    })
  }
}
