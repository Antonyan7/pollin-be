import {Injectable} from '@nestjs/common'
import {StructuredLogger} from '@libs/common'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {BadRequestException} from '@libs/services-common/exceptions'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {LabSyncLinkRequestDTO} from '../dto/lab-sync-test-result-link.dto'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {
  LabSyncObservationRequestRepository,
  LabSyncObservationResultRepository,
  TestResultAttachmentRepository,
  TestResultMeasurementRepository,
  TestResultRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {
  LabIntegrationCode,
  LabSyncTestResultStatus,
  LinkMethod,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  LabSyncObservationRequest,
  LabSyncObservationResult,
  TestResult,
  TestResultAttachment,
  TestResultMeasurement,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {LabSyncEntitiesAuditTrialService} from '@libs/audit-trail/services/lab-sync-entities-audit-trial.service'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {Equal} from 'typeorm'
import {LabSyncObservationRequestStatusHistoryRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/lab-sync-observation-request-status-history.repository'
import {DefaultValue} from '@libs/common/enums'
import {hl7StatusToNestprojectMeasurementType} from '@libs/common/helpers/lab-integration/abnormal-flag.helper'

export type ResultLinkStatus = {message?: string; isValid: boolean}

@Injectable()
export class LabSyncTestResultLinkService {
  private dateTimeUtil = new DateTimeUtil()

  // eslint-disable-next-line max-params
  constructor(
    private i18nService: I18nLocalizationService,
    private patientRepository: PatientRepository,
    private testResultRepository: TestResultRepository,
    private testResultMeasurementRepository: TestResultMeasurementRepository,
    private labSyncOBRRepository: LabSyncObservationRequestRepository,
    private labSyncOBXRepository: LabSyncObservationResultRepository,
    private labSyncEntitiesAuditTrialService: LabSyncEntitiesAuditTrialService,
    private staffRepository: StaffRepository,
    private obrStatusHistoryRepository: LabSyncObservationRequestStatusHistoryRepository,
    private testResultAttachmentRepository: TestResultAttachmentRepository,
  ) {}

  async linkToTestResult(dto: LabSyncLinkRequestDTO, authUserId: string): Promise<void> {
    const {patientId, pendingTestResultId, unlinkedTestResultId} = dto

    try {
      const staff: Staff = await this.staffRepository.findOneBy({authUserId: Equal(authUserId)})

      const [patient, testResult, syncedOBRequest] = await Promise.all([
        this.patientRepository.findOneByUUID(patientId),
        this.testResultRepository.findOneWithMeasurementAndTests(pendingTestResultId),
        this.labSyncOBRRepository.findOneWithResults(unlinkedTestResultId),
      ])

      if (!patient || !testResult || !syncedOBRequest) {
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.INVALID_TEST_RESULT_LINK_PAYLOAD),
        )
      }

      if (patient.id !== testResult.patientId) {
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.TEST_RESULT_LINK_PATIENT_NOT_MATCH),
        )
      }

      this.validateTestResult(testResult)

      const measurementUpdates = testResult.testResultMeasurements.map(async (measurement) =>
        this.linkMeasurement({measurement, testResult, syncedOBRequest, staff}),
      )

      const linkResults = await Promise.all(measurementUpdates)
      const failures = linkResults.filter((result) => !result.isValid)
      this.checkAndLogFailures(failures)

      const revisionId = generateRevisionId(this.dateTimeUtil.now())

      const updatedOBR = await this.labSyncOBRRepository.save<Partial<LabSyncObservationRequest>>({
        ...syncedOBRequest,
        testResultId: testResult.id,
        status: LabSyncTestResultStatus.Linked,
        revisionId,
        updatedBy: staff.authUserId,
        updatedByStaffId: staff.id,
        linkMethod: LinkMethod.Manual,
        linkedByStaffId: staff.id,
      })

      await this.linkAttachment(updatedOBR)

      await this.obrStatusHistoryRepository.addActionHistory(
        syncedOBRequest.id,
        LabSyncTestResultStatus.Linked,
        staff.id,
      )

      const updatedData = await this.labSyncOBRRepository.findOneBy({id: Equal(syncedOBRequest.id)})

      const updatedMeasurements = await this.testResultMeasurementRepository.findByTestResultId(
        testResult.id,
      )

      if (updatedMeasurements?.every((measurement) => Boolean(measurement.result))) {
        await this.testResultRepository.update(
          {id: testResult.id},
          {status: TestResultStatus.WaitingCompletion, updatedByStaffId: staff.id},
        )

        StructuredLogger.info(
          activityLogs.LabSyncTestResultsFunctions.LinkMeasurement,
          activityLogs.LabSyncTestResultsActions.MarkedWaitingForCompletion,
          {message: `Result was marked as Waiting for Completion: ${testResult.uuid}`},
        )
      }

      await this.labSyncEntitiesAuditTrialService.addLabSyncObservationsAudit<LabSyncObservationRequest>(
        {
          staff,
          updatedData,
          userAction: AuditUserAction.Update,
          revisionId,
          tableUpdated: AuditTrailCollection.LabSyncObservationRequestRevisions,
        },
      )
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabSyncTestResultsFunctions.LinkToTestResult,
        eventName: activityLogs.LabSyncTestResultsActions.LinkToTestResultFailed,
      })
    }
  }

  private async linkMeasurement({
    measurement,
    testResult,
    syncedOBRequest,
    staff,
  }: {
    measurement: TestResultMeasurement
    testResult: TestResult
    syncedOBRequest: LabSyncObservationRequest
    staff: Staff
  }): Promise<ResultLinkStatus> {
    const commonMessage = `Result linking failed: Result ID: ${testResult.uuid}, Measurement ID: ${measurement.uuid}, OBRequest ID: ${syncedOBRequest.uuid} - `

    try {
      const universalCode = this.getUniversalCode(
        measurement,
        syncedOBRequest.labSyncRawData?.labInfo?.integrationCode,
      )

      if (!universalCode) {
        return {
          message: commonMessage + 'measurement universalCode for TestType is missing',
          isValid: false,
        }
      }

      StructuredLogger.info(
        activityLogs.LabSyncTestResultsFunctions.LinkMeasurement,
        activityLogs.LabSyncTestResultsActions.FindUniversalCode,
        {message: `Try to find measurement for universal code ${universalCode}`},
      )

      // Add linking relation if match was found with universal code
      const unlinkedResult = syncedOBRequest.labSyncObservationResults.find(
        (obx) => obx.universalCode === universalCode,
      )

      if (!unlinkedResult) {
        return {message: commonMessage + 'Universal Codes do not match ', isValid: false}
      }

      await this.testResultMeasurementRepository.update(
        {id: measurement.id},
        {
          dateReceived: this.dateTimeUtil.now(),
          result: unlinkedResult.resultValue,
          labComment: unlinkedResult?.labComment,
          resultType: hl7StatusToNestprojectMeasurementType(unlinkedResult.abnormalFlags),
        },
      )

      const revisionId = generateRevisionId(this.dateTimeUtil.now())

      await this.labSyncOBXRepository.linkMeasurement({
        id: unlinkedResult.id,
        testResultMeasurementId: measurement.id,
        revisionId,
        updatedBy: staff.authUserId,
      })

      const updatedData = await this.labSyncOBXRepository.findOneBy({id: Equal(unlinkedResult.id)})

      await this.labSyncEntitiesAuditTrialService.addLabSyncObservationsAudit<LabSyncObservationResult>(
        {
          updatedData,
          userAction: AuditUserAction.Update,
          staff,
          revisionId,
          tableUpdated: AuditTrailCollection.LabSyncObservationResultRevisions,
        },
      )

      const message = `Measurement for Result ${testResult.uuid} has been linked with Universal Code: ${universalCode}. OBX ID: ${unlinkedResult.uuid}`

      StructuredLogger.info(
        activityLogs.LabSyncTestResultsFunctions.LinkMeasurement,
        activityLogs.LabSyncTestResultsActions.MeasurementLinked,
        {message},
      )

      return {message, isValid: true}
    } catch (error) {
      return {
        message: commonMessage + 'Measurement update failed: ' + error?.message,
        isValid: false,
      }
    }
  }

  private getUniversalCode(
    measurement: TestResultMeasurement,
    labIntegrationCode: LabIntegrationCode,
  ): string | undefined {
    switch (labIntegrationCode) {
      case LabIntegrationCode.LifelabsOntario:
        return measurement.testType?.lifeLabsCode
      case LabIntegrationCode.Dynacare:
        return measurement.testType?.dynacareCode
      default:
        return measurement.testType?.dynacareCode || measurement.testType?.lifeLabsCode
    }
  }

  private async linkAttachment(observationRequest: LabSyncObservationRequest): Promise<void> {
    try {
      if (!observationRequest?.pdfReportPath) {
        StructuredLogger.warn(
          activityLogs.LabSyncTestResultsFunctions.LinkAttachment,
          activityLogs.LabSyncTestResultsActions.PdfReportPathIsNull,
          {message: 'Pdf report path is null'},
        )

        return
      }

      const entityToSave: Partial<TestResultAttachment> = {
        testResultId: observationRequest.testResultId,
        title: observationRequest.testName,
        url: observationRequest.pdfReportPath,
        notes: observationRequest?.pdfReportComment || DefaultValue.Empty,
      }

      await this.testResultAttachmentRepository.save(entityToSave)
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabSyncTestResultsFunctions.LinkAttachment,
        eventName: activityLogs.LabSyncTestResultsActions.LinkAttachmentFailed,
      })
    }
  }

  private validateTestResult(testResult: TestResult): void {
    if (!testResult.testResultMeasurements.length) {
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.TEST_RESULT_LINK_MEASUREMENTS_MISSING),
      )
    }

    if (
      ![
        TestResultStatus.NotReceived,
        TestResultStatus.Pending,
        TestResultStatus.Verbal,
        TestResultStatus.WaitingCompletion,
      ].includes(testResult.status)
    ) {
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.INVALID_STATUS_FOR_TEST_RESULT_LINKING),
      )
    }
  }

  private checkAndLogFailures(failures: ResultLinkStatus[]): void {
    if (failures.length) {
      // Report issues and stop execution
      StructuredLogger.error(
        activityLogs.LabSyncTestResultsFunctions.LinkToTestResult,
        activityLogs.LabSyncTestResultsActions.LinkToTestResultFailed,
        {message: failures.map((fail) => fail?.message).join(' /n')},
      )

      throw new BadRequestException(this.i18nService.translate(i18Messages.TEST_RESULT_LINK_FAILED))
    }
  }
}
