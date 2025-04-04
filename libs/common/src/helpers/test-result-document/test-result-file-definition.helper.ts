import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {
  ServiceTypeWorkflow,
  testResultWorkflows,
  ultrasoundWorkflows,
} from '@libs/data-layer/apps/scheduling/enums'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {StructuredLogger} from '@libs/common/utils'
import {Content, TDocumentDefinitions} from 'pdfmake/interfaces'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {
  createTestResultInfoTable,
  createTestResultMeasurementsTable,
  defineMarginValue,
  noBorderNoPaddingTableLayout,
} from './test-result-pdf/test-result-pdf.helper'
import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-result.entity'
import {createPelvicTVUltrasoundMainContent} from './ultrasound-report-pdf/pelvic-tv-ultrasound-report-pdf.helper'
import {createOHSSUltrasoundMainContent} from './ultrasound-report-pdf/ohss-ultrasound-report-pdf.helper'
import {createFollicleMonitoringUltrasoundMainContent} from './ultrasound-report-pdf/follicle-monitoring-ultrasound-report-pdf.helper'
import {createOBUltrasoundMainContent} from './ultrasound-report-pdf/ob-ultrasound-report-pdf.helper'
import {getRepositories} from '@libs/common/helpers/test-result-document/repository-provider.helper'
import {Equal} from 'typeorm/find-options/operator/Equal'
import {findOneByUuidAndDataForUltrasound, findOneWithDetails} from './test-result-finder.helper'
import {NotDownloadableProcessTypes} from '@libs/services-common/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {getTestResultSubHeader} from './test-result-document.helper'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {sortMeasurementsByTestPanelToTestTypes} from '@apps/lis/test-result/helper/test-result-details.helper'

export async function getTestResultPDFContent(testResult: TestResult): Promise<Content[]> {
  try {
    const measurementsSortedByPanelSequence = sortMeasurementsByTestPanelToTestTypes(testResult)

    const testResultMeasurementsDataTable = createTestResultMeasurementsTable(
      measurementsSortedByPanelSequence,
    )

    return [testResultMeasurementsDataTable]
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetTestResultPDFContent,
      eventName: activityLogs.TestResultActions.GetTestResultPDFContent,
    })
  }
}

async function getUltrasoundReportPDFMainContent(
  testResult: TestResult,
  processType: ProcessType,
): Promise<Content> {
  try {
    switch (processType) {
      case ProcessType.UltrasoundObstetric: {
        const {testResultObUltrasoundRepository} = await getRepositories()
        const obUltrasound = await testResultObUltrasoundRepository.findOneBy({
          testResultId: Equal(testResult.id),
        })

        return createOBUltrasoundMainContent(obUltrasound)
      }
      case ProcessType.UltrasoundFolliclesMonitoring: {
        return createFollicleMonitoringUltrasoundMainContent(testResult)
      }
      case ProcessType.UltrasoundDay3: {
        return createPelvicTVUltrasoundMainContent(testResult)
      }
      case ProcessType.UltrasoundOHSS: {
        const {testResultOHSSOvaryMeasurementRepository, testResultOHSSFluidMeasurementRepository} =
          await getRepositories()

        const OHSSOvaryMeasurements = await testResultOHSSOvaryMeasurementRepository.findBy({
          testResultId: Equal(testResult.id),
        })

        const testResultOHSSFluidMeasurement =
          await testResultOHSSFluidMeasurementRepository.findOneBy({
            testResultId: Equal(testResult.id),
          })

        return createOHSSUltrasoundMainContent(
          OHSSOvaryMeasurements,
          testResultOHSSFluidMeasurement,
        )
      }
      default: {
        return null
      }
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetUltrasoundReportPDFMainContent,
      eventName: activityLogs.TestResultActions.GetUltrasoundReportPDFMainContentFailed,
    })
  }
}

async function getUltrasoundReportPDFContent(
  testResultUUID: string,
  processType: ProcessType,
): Promise<Content[]> {
  try {
    const testResult = await findOneByUuidAndDataForUltrasound(testResultUUID)
    if (!testResult) {
      StructuredLogger.warn(
        activityLogs.TestResultFunctions.CreateUltrasoundReportPDF,
        activityLogs.TestResultActions.CreateUltrasoundReportPDF,
        {
          testResultUUID,
          message: `Test result for Ultrasound not found. TestResultUUID: ${testResultUUID}`,
        },
      )
      return []
    }

    const mainContent = await getUltrasoundReportPDFMainContent(testResult, processType)

    return [mainContent]
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.CreateUltrasoundReportPDF,
      eventName: activityLogs.TestResultActions.CreateUltrasoundReportPDFFailed,
    })
  }
}

export async function getFileContentPerSpecialWorkflow(data: {
  testResultUUID: string
  specialWorkflow: ServiceTypeWorkflow
  processType: ProcessType
}): Promise<Content[]> {
  const {testResultUUID, specialWorkflow, processType} = data

  try {
    if (testResultWorkflows.includes(specialWorkflow)) {
      const testResult = await findOneWithDetails(testResultUUID)
      return getTestResultPDFContent(testResult)
    }

    if (ultrasoundWorkflows.includes(specialWorkflow)) {
      return getUltrasoundReportPDFContent(testResultUUID, processType)
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetFileDefinitionPerSpecialWorkflow,
      eventName: activityLogs.TestResultActions.GetFileDefinitionPerSpecialWorkflowFailed,
    })
  }
}

export async function getTestResultFileContent(testResult: TestResult): Promise<Content[]> {
  try {
    const specialWorkflow =
      testResult?.testPanel?.superType?.specialWorkflow ||
      testResult?.testType?.superType?.specialWorkflow

    const processType = testResult?.testType?.processType

    const testResultInfo = await createTestResultInfoTable(testResult)

    if (
      [ServiceTypeWorkflow.Procedure].includes(specialWorkflow) ||
      NotDownloadableProcessTypes.includes(processType)
    ) {
      return [testResultInfo]
    }

    const content = await getFileContentPerSpecialWorkflow({
      testResultUUID: testResult.uuid,
      specialWorkflow,
      processType,
    })

    return [
      {
        layout: noBorderNoPaddingTableLayout(),
        table: {
          headerRows: 1,
          widths: ['*'],
          body: [[testResultInfo], [content]],
        },
      },
    ]
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetTestResultFileContent,
      eventName: activityLogs.TestResultActions.GetTestResultFileContentFailed,
    })
  }
}

export async function getTestResultFileDefinition(payload: {
  staff: Staff
  patient: Patient
  content: Content[]

  firstPage?: number
  totalPages?: number
}): Promise<TDocumentDefinitions> {
  try {
    const {staff, patient, content, totalPages, firstPage} = payload

    const headerContent = await getHeaderContent(patient)
    const subHeaderContent = await getTestResultSubHeader()

    return {
      pageMargins: [
        MarginsPdfEnum.Margin80,
        defineMarginValue(patient),
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin120,
      ],
      pageSize: {
        width: 1440,
        height: 1865,
      },
      header: () => [headerContent, subHeaderContent],
      content,
      footer: (page, pageCount) =>
        getFooterContent(staff, {page, pageCount: totalPages ?? pageCount, firstPage}),
      info: {title: 'test-result.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetTestResultFileDefinition,
      eventName: activityLogs.TestResultActions.GetFileDefinitionPerSpecialWorkflowFailed,
    })
  }
}
