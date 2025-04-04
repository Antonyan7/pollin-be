import {DefaultValue} from '@libs/common/enums'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  PatientFertilityIQ,
  TestResult,
  TestResultSonoDetail,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestObservationMetadata} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-observations-metadata.entity'
import {
  OvaryLocation,
  TestResultKind,
  tubeOptionLabelMap,
} from '@libs/data-layer/apps/clinic-test/enums'
import {ObservationType} from '@libs/data-layer/apps/clinic-test/enums/observation-type.enum'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {Content, ContentTable, Table} from 'pdfmake/interfaces'
import {ProfileTestResultToTestResult} from './fertility-iq-file-definition.helper'
import {
  labelSmallBoldStyle,
  labelSmallStyle,
  subHeaderStyle,
  textMediumBoldStyle,
  textMediumSecondaryBoldStyle,
  textMediumStyle,
} from './fertility-iq-styles.helper'
import {checkSonoDetailExist} from './fertility-iq-util.helper'
import {getImageForFertilityIqPdf} from './manage-document.helper'

const getTestResultSection = async (testResult: TestResult): Promise<ContentTable> => {
  const testKind =
    testResult?.testResultKind === TestResultKind.TestType && testResult !== null
      ? testResult.testType
      : testResult.testPanel

  const imageBase64 = await getImageForFertilityIqPdf(testKind.fertilityIQImageURL, testKind.title)

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
      marginTop: MarginsPdfEnum.Margin60,
    },
  ]

  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', 811],
      body: [[imageFirstContent, valuesContent]],
    } as Table,
    marginBottom: MarginsPdfEnum.Margin48,
  }
}

const getAFCSection = async (fertilityIQ: PatientFertilityIQ): Promise<ContentTable> => {
  const dataSource = await getCreateDatabaseConnection()
  const testObservationMetadataRepository = dataSource.getRepository(TestObservationMetadata)

  const AFCMetadata = await testObservationMetadataRepository.findOneBy({
    type: ObservationType.AFC,
  })

  const imageBase64 = await getImageForFertilityIqPdf(AFCMetadata?.imageURL, AFCMetadata?.title)

  const imageContent: Content = {
    image: imageBase64,
    width: 445,
  }

  const valuesContent: Content = [
    {
      ...textMediumStyle,
      text: AFCMetadata.description || DefaultValue.LongDash,
    },
    {
      text: [
        {...labelSmallStyle, text: 'Right Ovary AFC '},
        {
          ...textMediumSecondaryBoldStyle,
          text: fertilityIQ.fertilityIQFemale.antralFollicleCountRight,
        },
        {...labelSmallStyle, fontSize: 24, text: ' | '},
        {...labelSmallStyle, text: 'Left Ovary AFC '},
        {
          ...textMediumSecondaryBoldStyle,
          text: fertilityIQ.fertilityIQFemale.antralFollicleCountLeft,
        },
      ],
      marginTop: MarginsPdfEnum.Margin40,
    },
  ]

  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', 811],
      body: [[imageContent, valuesContent]],
    } as Table,
  }
}

const getSonoValuesContent = (
  SONOMetadata: TestObservationMetadata,
  resultSonoDetail: TestResultSonoDetail,
): Content => [
  {
    ...textMediumStyle,
    text: SONOMetadata.description || DefaultValue.LongDash,
  },
  {
    text: [
      {...labelSmallStyle, text: 'Left Tube '},
      {
        ...labelSmallBoldStyle,
        text: resultSonoDetail.leftTube.map((item) => tubeOptionLabelMap.get(item)).join(', '),
      },
      {...labelSmallStyle, fontSize: 24, text: ' | '},
      {...labelSmallStyle, text: 'Right Tube '},
      {
        ...labelSmallBoldStyle,
        text: resultSonoDetail.rightTube.map((item) => tubeOptionLabelMap.get(item)).join(', '),
      },
      {...labelSmallStyle, fontSize: 24, text: ' | '},
      {...labelSmallStyle, text: 'Uterine Cavity '},
      {...labelSmallBoldStyle, text: resultSonoDetail.uterineCavity},
    ],
    marginTop: MarginsPdfEnum.Margin20,
  },
  {
    ...subHeaderStyle,
    text: 'Notes',
    marginTop: MarginsPdfEnum.Margin16,
    marginBottom: MarginsPdfEnum.Margin16,
  },
  {
    ...textMediumStyle,
    text: resultSonoDetail.sonohysterogramNote || DefaultValue.LongDash,
  },
]

const getSonoSection = async (resultSonoDetail: TestResultSonoDetail): Promise<ContentTable> => {
  const dataSource = await getCreateDatabaseConnection()
  const testObservationMetadataRepository = dataSource.getRepository(TestObservationMetadata)

  const SONOMetadata = await testObservationMetadataRepository.findOneBy({
    type: ObservationType.SONOHYSTOGRAM,
  })

  const imageBase64 = await getImageForFertilityIqPdf(SONOMetadata?.imageURL, SONOMetadata?.title)

  const imageContent: Content = {
    image: imageBase64,
    width: 445,
  }

  const valuesContent = getSonoValuesContent(SONOMetadata, resultSonoDetail)

  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', 811],
      body: [[imageContent, valuesContent]],
    } as Table,
  }
}

async function getResultSectionContent(fertilityIQ: PatientFertilityIQ): Promise<Content> {
  const fertilityIqResults = fertilityIQ.patientFertilityIQToTestResults.filter(
    (item) =>
      item.testResult.testType.processType !== ProcessType.UltrasoundDay3 &&
      item.testResult.testType.processType !== ProcessType.UltrasoundSonohysterogram,
  )

  const [fertilityIQTestResult] = fertilityIqResults

  const testResult = fertilityIQTestResult?.testResult

  if (!testResult) {
    return null
  }

  return [
    {
      ...subHeaderStyle,
      text: 'Anti-Mullerian Hormone (AMH)',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getTestResultSection(testResult),
  ]
}

async function getAFCSectionContent(fertilityIQ: PatientFertilityIQ): Promise<Content> {
  return [
    {
      ...subHeaderStyle,
      text: 'Antral Follicle Count (AFC)',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getAFCSection(fertilityIQ),
  ]
}

async function getSonoSectionContent(fertilityIQ: PatientFertilityIQ): Promise<Content> {
  const fertilityIQFemaleResult = fertilityIQ.patientFertilityIQToTestResults.find(
    (item) => item?.testResult?.testResultSonoDetail?.id,
  )

  if (!fertilityIQFemaleResult) {
    return null
  }

  const resultSonoDetail = fertilityIQFemaleResult?.testResult?.testResultSonoDetail

  if (!checkSonoDetailExist(resultSonoDetail)) {
    return null
  }

  return [
    {
      ...subHeaderStyle,
      text: 'Sonohysterogram',
      marginTop: MarginsPdfEnum.Margin48,
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getSonoSection(resultSonoDetail),
  ]
}

export async function getFemaleFertilityIqContent(
  fertilityIQ: PatientFertilityIQ,
): Promise<Content> {
  return [
    await getResultSectionContent(fertilityIQ),
    await getAFCSectionContent(fertilityIQ),
    await getSonoSectionContent(fertilityIQ),
  ]
}

async function getResultPreReleaseSectionContent(
  row: ProfileTestResultToTestResult,
): Promise<Content> {
  const testResult = row.testResult

  if (!testResult) {
    return null
  }

  return [
    {
      ...subHeaderStyle,
      text: 'Anti-Mullerian Hormone (AMH)',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getTestResultSection(testResult),
  ]
}

const getAFCPreReleaseSection = async (
  row: ProfileTestResultToTestResult,
): Promise<ContentTable> => {
  const AFCMetadata = row.AFCMetadata

  const imageBase64 = await getImageForFertilityIqPdf(AFCMetadata?.imageURL, AFCMetadata?.title)

  const imageContent: Content = {
    image: imageBase64,
    width: 445,
  }

  const resultOvaryMeasurementRight = row.testResult?.testResultOvaryMeasurements?.find(
    (item) => item?.location === OvaryLocation.RightOvary,
  )
  const resultOvaryMeasurementLeft = row.testResult?.testResultOvaryMeasurements?.find(
    (item) => item?.location === OvaryLocation.LeftOvary,
  )

  const valuesContent: Content = [
    {
      ...textMediumStyle,
      text: AFCMetadata.description || DefaultValue.LongDash,
    },
    {
      text: [
        {...labelSmallStyle, text: 'Right Ovary AFC '},
        {
          ...textMediumBoldStyle,
          text: resultOvaryMeasurementRight.totalFollicles,
        },
        {...labelSmallStyle, fontSize: 24, text: ' | '},
        {...labelSmallStyle, text: 'Left Ovary AFC '},
        {...textMediumBoldStyle, text: resultOvaryMeasurementLeft.totalFollicles},
      ],
      marginTop: MarginsPdfEnum.Margin40,
    },
  ]

  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', 811],
      body: [[imageContent, valuesContent]],
    } as Table,
  }
}

async function getAFCPreReleaseSectionContent(
  row: ProfileTestResultToTestResult,
): Promise<Content> {
  return [
    {
      ...subHeaderStyle,
      text: 'Antral Follicle Count (AFC)',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getAFCPreReleaseSection(row),
  ]
}

const getSonoPreReleaseSection = async (
  resultSonoDetail: TestResultSonoDetail,
  SONOMetadata: TestObservationMetadata,
): Promise<ContentTable> => {
  const imageBase64 = await getImageForFertilityIqPdf(SONOMetadata?.imageURL, SONOMetadata?.title)

  const imageContent: Content = {
    image: imageBase64,
    width: 445,
  }

  const valuesContent = getSonoValuesContent(SONOMetadata, resultSonoDetail)

  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', 811],
      body: [[imageContent, valuesContent]],
    } as Table,
  }
}

async function getSonoPreReleaseSectionContent(
  row: ProfileTestResultToTestResult,
): Promise<Content> {
  if (!checkSonoDetailExist(row?.sonoDetail)) {
    return null
  }

  return [
    {
      ...subHeaderStyle,
      text: 'Sonohysterogram',
      marginTop: MarginsPdfEnum.Margin48,
      marginBottom: MarginsPdfEnum.Margin16,
    },
    await getSonoPreReleaseSection(row.sonoDetail, row.SONOMetadata),
  ]
}

export async function getFemaleFertilityIqPreReleaseContent(
  rows: ProfileTestResultToTestResult[],
): Promise<Content> {
  return [
    await getResultPreReleaseSectionContent(rows.find((item) => !item.isRequiredForFertilityIQ)),
    await getAFCPreReleaseSectionContent(rows.find((item) => item.isRequiredForFertilityIQ)),
    await getSonoPreReleaseSectionContent(rows.find((item) => !!item?.sonoDetail)),
  ]
}
