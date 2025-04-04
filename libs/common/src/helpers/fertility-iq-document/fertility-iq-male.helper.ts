import {sortMeasurementsByTestPanelToTestTypes} from '@apps/lis/test-result/helper/test-result-details.helper'
import {DefaultValue} from '@libs/common/enums'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  PatientFertilityIQ,
  ProfileTestResult,
  TestResult,
  TestResultMeasurement,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  ProfileTestResultType,
  SexAtBirth,
  TestResultKind,
} from '@libs/data-layer/apps/clinic-test/enums'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette} from '@libs/services-common/enums'
import {Content, ContentImage, ContentStack, ContentTable, Table} from 'pdfmake/interfaces'
import {ProfileTestResultToTestResult} from './fertility-iq-file-definition.helper'
import {
  labelSmallStyle,
  subHeaderStyle,
  tabBodyCellBoldStyle,
  tabBodyCellStyle,
  tabHeaderCellStyle,
  textMediumSecondaryBoldStyle,
  textMediumStyle,
} from './fertility-iq-styles.helper'
import {getImageForFertilityIqPdf} from './manage-document.helper'

export const getSemenAnalysisTableContent = async (
  measurements: TestResultMeasurement[],
): Promise<ContentStack> => {
  const tableRows = measurements.map((measurement) => {
    return [
      {
        fillColor: ColorPalette.Dew,
        text: [
          {...tabBodyCellBoldStyle, text: `${measurement.testType.title} \n`},
          {
            ...tabBodyCellStyle,
            fillColor: ColorPalette.Dew,
            text: measurement.testType.description,
          },
        ],
      },
      {...tabBodyCellStyle, text: measurement.testType.averageRange || DefaultValue.LongDash},
      {
        ...tabBodyCellBoldStyle,
        text: `${measurement.result} ${measurement?.testType?.unit || DefaultValue.Empty}`,
      },
    ]
  })

  return {
    stack: [
      {
        table: {
          headerRows: 1,
          widths: [300, '*', 222],
          body: [
            [
              {...tabHeaderCellStyle, text: 'Semen Analysis Parameter'},
              {...tabHeaderCellStyle, alignment: 'center', text: 'Normal Values'},
              {...tabHeaderCellStyle, text: 'Your Results'},
            ],
            ...tableRows,
          ],
        } as Table,
        layout: {
          vLineColor: () => ColorPalette.Green400,
          hLineColor: () => ColorPalette.Green400,
          paddingTop: () => 20.5,
          paddingBottom: () => 20.5,
          paddingLeft: () => 16.5,
          paddingRight: () => 16.5,
          hLineWidth: () => 1,
        },
      },
    ],
  }
}

const getTestResultRequiredSection = async (
  row: ProfileTestResultToTestResult,
): Promise<ContentTable> => {
  const testResult = row.testResult
  const testKind =
    testResult?.testResultKind === TestResultKind.TestType && testResult !== null
      ? testResult.testType
      : testResult.testPanel

  const imageBase64 = await getImageForFertilityIqPdf(
    testKind?.fertilityIQImageURL,
    testKind?.title,
  )

  const imageFirstContent: ContentImage = {
    image: imageBase64,
    width: 516,
  }

  const testResultSemenAnalysisIds = row.semenProfileTestResults.map((item) => item.testTypeId)

  const measurementsFilteredByTestType = testResult.testResultMeasurements.filter((item) =>
    testResultSemenAnalysisIds.includes(item.testTypeId),
  )

  const result: TestResult = {...testResult, testResultMeasurements: measurementsFilteredByTestType}

  const measurementsSortedByPanelSequence = sortMeasurementsByTestPanelToTestTypes(result)

  const semenAnalysisTableContent = await getSemenAnalysisTableContent(
    measurementsSortedByPanelSequence,
  )

  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', 750],
      body: [[imageFirstContent, semenAnalysisTableContent]],
    } as Table,
    marginBottom: MarginsPdfEnum.Margin48,
  }
}

async function getResultRequiredSectionContent(
  fertilityIQ: PatientFertilityIQ,
  profileTestResults: ProfileTestResult[],
): Promise<Content> {
  const profileTestResultsRequired = profileTestResults.filter(
    (item) => item.isRequiredForFertilityIQ,
  )
  const [profileTestResultRequired] = profileTestResultsRequired

  const testResults = fertilityIQ.patientFertilityIQToTestResults.map((item) => item.testResult)

  const testResultRequired =
    testResults.find((result) => result?.testType?.id === profileTestResultRequired?.testTypeId) ||
    testResults.find((result) => result?.testPanel?.id === profileTestResultRequired?.testPanelId)

  const dataSource = await getCreateDatabaseConnection()
  const profileTestResultRepository = dataSource.getRepository(ProfileTestResult)

  const testResultsSemenAnalysisDb = await profileTestResultRepository.find({
    where: {type: ProfileTestResultType.FertilityIQSemenAnalysis, sexAtBirth: SexAtBirth.Male},
  })

  const row: ProfileTestResultToTestResult = {
    testResult: testResultRequired,
    isRequiredForFertilityIQ: true,
    profileTestResult: profileTestResultRequired,
    semenProfileTestResults: testResultsSemenAnalysisDb,
  }

  return [
    {
      ...subHeaderStyle,
      text: 'Semen Analysis',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getTestResultRequiredSection(row),
  ]
}

const getTestResultNotRequiredSection = async (
  row: ProfileTestResultToTestResult,
): Promise<ContentTable> => {
  const testResult = row.testResult
  const testKind =
    testResult?.testResultKind === TestResultKind.TestType && testResult !== null
      ? testResult.testType
      : testResult.testPanel

  const imageBase64 = await getImageForFertilityIqPdf(
    testKind?.fertilityIQImageURL,
    testKind?.title,
  )

  const imageFirstContent: Content = {
    image: imageBase64,
    width: 445,
  }

  const resultValue = testResult.testResultMeasurements[0].result
  const unit = testResult?.testResultMeasurements[0]?.testType?.unit || DefaultValue.Empty

  const valuesContent: Content = [
    {
      ...textMediumStyle,
      text: testKind.description || DefaultValue.LongDash,
    },
    {
      text: [
        {...labelSmallStyle, text: 'Your result '},
        {...textMediumSecondaryBoldStyle, text: `${resultValue} ${unit}`},
      ],
      marginTop: MarginsPdfEnum.Margin24,
    },
  ]

  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', 811],
      body: [[imageFirstContent, valuesContent]],
    } as Table,
  }
}

async function getResultNotRequiredSectionContent(
  fertilityIQ: PatientFertilityIQ,
  profileTestResults: ProfileTestResult[],
): Promise<Content> {
  const profileTestResultsNotRequired = profileTestResults.filter(
    (item) => !item.isRequiredForFertilityIQ,
  )
  const [profileTestResultNotRequired] = profileTestResultsNotRequired

  const testResults = fertilityIQ.patientFertilityIQToTestResults.map((item) => item.testResult)

  const testResultNotRequired =
    testResults.find(
      (result) => result?.testType?.id === profileTestResultNotRequired?.testTypeId,
    ) ||
    testResults.find(
      (result) => result?.testPanel?.id === profileTestResultNotRequired?.testPanelId,
    )

  if (!testResultNotRequired) {
    return null
  }

  const row: ProfileTestResultToTestResult = {
    testResult: testResultNotRequired,
    isRequiredForFertilityIQ: false,
    profileTestResult: profileTestResultNotRequired,
  }

  return [
    {
      ...subHeaderStyle,
      text: 'DNA Fragmentation Index',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getTestResultNotRequiredSection(row),
  ]
}

export async function getMaleFertilityIqContent(fertilityIQ: PatientFertilityIQ): Promise<Content> {
  const dataSource = await getCreateDatabaseConnection()
  const profileTestResultRepository = dataSource.getRepository(ProfileTestResult)

  const profileTestResults = await profileTestResultRepository.find({
    where: {type: ProfileTestResultType.FertilityIQ, sexAtBirth: SexAtBirth.Male},
  })

  return [
    await getResultRequiredSectionContent(fertilityIQ, profileTestResults),
    await getResultNotRequiredSectionContent(fertilityIQ, profileTestResults),
  ]
}

async function getRequiredPreReleaseSectionContent(
  row: ProfileTestResultToTestResult,
): Promise<Content> {
  return [
    {
      ...subHeaderStyle,
      text: 'Semen Analysis',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getTestResultRequiredSection(row),
  ]
}

async function getNotRequiredPreReleaseSectionContent(
  row: ProfileTestResultToTestResult,
): Promise<Content> {
  if (!row?.testResult) {
    return null
  }

  return [
    {
      ...subHeaderStyle,
      text: 'DNA Fragmentation Index',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getTestResultNotRequiredSection(row),
  ]
}

export async function getMaleFertilityIqPreReleaseContent(
  rows: ProfileTestResultToTestResult[],
): Promise<Content> {
  const requiredRow = rows.find((item) => item.isRequiredForFertilityIQ)
  const notRequiredRow = rows.find((item) => !item.isRequiredForFertilityIQ)

  return [
    await getRequiredPreReleaseSectionContent(requiredRow),
    await getNotRequiredPreReleaseSectionContent(notRequiredRow),
  ]
}
