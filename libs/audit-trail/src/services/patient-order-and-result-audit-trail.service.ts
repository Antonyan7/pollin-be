import {Injectable} from '@nestjs/common'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {
  SpecimenRepository,
  TestOrderItemRepository,
  TestOrderRepository,
  TestResultAttachmentRepository,
  TestResultMeasurementRepository,
  TestResultOvaryMeasurementRepository,
  TestResultRepository,
  TestResultUterusMeasurementRepository,
  TransportFolderRepository,
  TestResultObUltrasoundRepository,
  TestResultOvaryCystMeasurementRepository,
  TestResultUltrasoundFinalReportRepository,
  TestResultOHSSFluidMeasurementRepository,
  TestResultOHSSOvaryMeasurementRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {AuditTrailPubSubService} from '@libs/audit-trail'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  Specimen,
  TestOrder,
  TestOrderComment,
  TestOrderItem,
  TestResult,
  TestResultAttachment,
  TestResultMeasurement,
  TestResultObservation,
  TestResultObUltrasound,
  TestResultOHSSFluidMeasurement,
  TestResultOHSSOvaryMeasurement,
  TestResultOvaryCystMeasurement,
  TestResultUltrasoundFinalReport,
  TransportFolder,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {In} from 'typeorm/find-options/operator/In'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {Equal} from 'typeorm'
import {TestOrderCommentRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-order-comment.repository'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm'

@Injectable()
export class PatientOrderAndResultAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private configService: NestprojectConfigService,
    private testOrderRepository: TestOrderRepository,
    private testOrderItemRepository: TestOrderItemRepository,
    private specimenRepository: SpecimenRepository,
    private testResultRepository: TestResultRepository,
    private testResultMeasurementRepository: TestResultMeasurementRepository,
    private testResultAttachmentRepository: TestResultAttachmentRepository,
    private testResultUterusMeasurementRepository: TestResultUterusMeasurementRepository,
    private testResultOvaryMeasurementRepository: TestResultOvaryMeasurementRepository,
    private testResultObUltrasoundRepository: TestResultObUltrasoundRepository,
    private transportFolderRepository: TransportFolderRepository,
    private testResultOvaryCystMeasurementRepository: TestResultOvaryCystMeasurementRepository,
    private testResultUltrasoundFinalReportRepository: TestResultUltrasoundFinalReportRepository,
    private staffRepository: StaffRepository,
    private auditPubSub: AuditTrailPubSubService,
    private testOrderCommentRepository: TestOrderCommentRepository,
    private testResultOHSSFluidMeasurementRepository: TestResultOHSSFluidMeasurementRepository,
    private testResultOHSSOvaryMeasurementRepository: TestResultOHSSOvaryMeasurementRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async addOrderAudit(
    testOrderId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, TestOrder] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testOrderRepository.findOneBy({id: testOrderId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testOrderRepository.update(
        {id: testOrderId},
        {revisionId, updatedBy: updaterAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestOrderRevisions,
      }),
    ])
  }

  async addOrderItemAudit(
    testOrderItemId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, TestOrderItem] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testOrderItemRepository.findOneBy({id: testOrderItemId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testOrderItemRepository.update(
        {id: testOrderItemId},
        {revisionId, updatedBy: updaterAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestOrderItemRevisions,
      }),
    ])
  }

  async addOrderItemAuditMobile(
    testOrderItemId: number,
    userAction: AuditUserAction,
    patientAuthUserId: string,
  ): Promise<void> {
    const [patient, data] = await Promise.all([
      this.patientRepository.findOneByAuthUserId(patientAuthUserId),
      this.testOrderItemRepository.findOneBy({id: testOrderItemId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(patient.firstName, patient.lastName)

    await Promise.all([
      this.testOrderItemRepository.update(
        {id: testOrderItemId},
        {revisionId, updatedBy: patientAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: patientAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestOrderItemRevisions,
      }),
    ])
  }

  async addOrderCommentAudit(
    testOrderCommentId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, TestOrderComment] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testOrderCommentRepository.findOneBy({id: testOrderCommentId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testOrderCommentRepository.update(
        {id: testOrderCommentId},
        {revisionId, updatedBy: updaterAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestOrderCommentRevisions,
      }),
    ])
  }

  async addSpecimenAudit(
    specimenId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, Specimen] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.specimenRepository.findOneBy({id: specimenId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.specimenRepository.update({id: specimenId}, {revisionId, updatedBy: updaterAuthUserId}),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.SpecimenRevisions,
      }),
    ])
  }

  async addTestResultAudit(
    testResultId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, TestResult] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testResultRepository.findOneBy({id: testResultId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testResultRepository.update(
        {id: testResultId},
        {revisionId, updatedBy: updaterAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultRevisions,
      }),
    ])
  }

  async addTestResultsAudit(
    testResultIds: number[],
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, testResults]: [Staff, TestResult[]] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testResultRepository.findBy({id: In(testResultIds)}),
    ])

    const latestData = JSON.stringify(testResults)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testResultRepository.update(
        {id: In(testResultIds)},
        {revisionId, updatedBy: updaterAuthUserId, updatedByStaffId: staff.id},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultRevisions,
      }),
    ])
  }

  async addTestResultMeasurementAudit(
    testResultMeasurementId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, TestResultMeasurement] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: Equal(updaterAuthUserId)}),
      this.testResultMeasurementRepository.findOneBy({id: Equal(testResultMeasurementId)}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testResultMeasurementRepository.update(
        {id: testResultMeasurementId},
        {revisionId, updatedBy: updaterAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultMeasurementRevisions,
      }),
    ])
  }

  async addTestResultAttachmentAudit(
    testResultAttachmentId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, TestResultAttachment] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testResultAttachmentRepository.findOneBy({id: testResultAttachmentId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testResultAttachmentRepository.update(
        {id: testResultAttachmentId},
        {revisionId, updatedBy: updaterAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultAttachmentRevisions,
      }),
    ])
  }

  async addTransportFolderAudit(
    transportFolderId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, TransportFolder] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.transportFolderRepository.findOneBy({id: transportFolderId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.transportFolderRepository.update(
        {id: transportFolderId},
        {revisionId, updatedBy: updaterAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction: userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TransportFolderRevisions,
      }),
    ])
  }

  async addUterusMeasurementAudit(
    uterusMeasurementId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testResultUterusMeasurementRepository.findOneBy({id: uterusMeasurementId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testResultUterusMeasurementRepository.update(uterusMeasurementId, {
        revisionId,
        updatedBy: updaterAuthUserId,
      }),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultUterusMeasurementRevisions,
      }),
    ])
  }

  async addOvaryMeasurementsAudit(
    ovaryMeasurementId: number,
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const [staff, data] = await Promise.all([
      this.staffRepository.findOneBy({authUserId: updaterAuthUserId}),
      this.testResultOvaryMeasurementRepository.findOneBy({id: ovaryMeasurementId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testResultOvaryMeasurementRepository.update(ovaryMeasurementId, {
        revisionId,
        updatedBy: updaterAuthUserId,
      }),
      this.auditPubSub.publish({
        authUserId: updaterAuthUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultOvaryMeasurementRevisions,
      }),
    ])
  }

  async addOvaryCystsMeasurementsAudit(
    testResultOvaryCystMeasurements: TestResultOvaryCystMeasurement[],
    userAction: AuditUserAction,
    updaterAuthUserId: string,
  ): Promise<void> {
    const staff = await this.staffRepository.findOneByAuthUserId(updaterAuthUserId)
    const testResultOvaryCystMeasurementIds = testResultOvaryCystMeasurements.map((item) => item.id)
    const authUserName = getFullName(staff.firstName, staff.lastName)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())

    await Promise.all([
      this.testResultOvaryCystMeasurementRepository.update(
        {id: In(testResultOvaryCystMeasurementIds)},
        {
          revisionId,
          updatedBy: updaterAuthUserId,
        },
      ),
      testResultOvaryCystMeasurements.map((measurement) =>
        this.auditPubSub.publish({
          authUserId: updaterAuthUserId,
          userAction,
          revisionId: measurement.revisionId,
          latestData: JSON.stringify(measurement),
          authUserName,
          tableUpdated: AuditTrailCollection.TestResultOvaryCystMeasurementRevisions,
        }),
      ),
    ])
  }

  async addTestResultFinalReportAudit(
    testResultReport: TestResultUltrasoundFinalReport,
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const latestData = JSON.stringify(testResultReport)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all([
      this.testResultUltrasoundFinalReportRepository.update(
        {id: testResultReport.id},
        {revisionId, updatedBy: user.authUserId},
      ),
      this.auditPubSub.publish({
        authUserId: user.authUserId,
        userAction,
        revisionId: testResultReport.revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultUltrasoundFinalReportRevisions,
      }),
    ])
  }

  async addTestResultObUltrasoundAudit(
    data: TestResultObUltrasound,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const staff = await this.staffRepository.findOneByAuthUserId(authUserId)

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.testResultObUltrasoundRepository.update(data.id, {
        revisionId,
        updatedBy: authUserId,
      }),
      this.auditPubSub.publish({
        authUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.TestResultObUltrasoundRevisions,
      }),
    ])
  }

  async addTestResultOHSSFluidMeasurementAudit(
    data: TestResultOHSSFluidMeasurement,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await this.testResultOHSSFluidMeasurementRepository.update(data.id, {
      revisionId,
      updatedBy: staff.authUserId,
      updatedByStaffId: staff.id,
    })

    await this.auditPubSub.publish({
      authUserId: staff.authUserId,
      userAction,
      revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.TestResultOHSSUltrasoundRevisions,
    })
  }

  async addTestResultOHSSOvaryMeasurementsAudit(
    data: TestResultOHSSOvaryMeasurement[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const latestData = JSON.stringify(data)
    const entityIds = data.map((item) => item.id)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await this.testResultOHSSOvaryMeasurementRepository.update(
      {id: In(entityIds)},
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
      tableUpdated: AuditTrailCollection.TestResultOHSSUltrasoundRevisions,
    })
  }

  async addTestResultObservationsAudit(
    testResultObservations: TestResultObservation[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all(
      testResultObservations.map((observation) =>
        this.auditPubSub.publish({
          authUserId: staff.authUserId,
          userAction: userAction,
          revisionId: observation.revisionId,
          latestData: JSON.stringify(observation),
          authUserName,
          tableUpdated: AuditTrailCollection.TestResultObservationRevisions,
        }),
      ),
    )
  }
}
