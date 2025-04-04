import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {Content, TDocumentDefinitions} from 'pdfmake/interfaces'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {
  getFemaleFertilityIqContent,
  getFemaleFertilityIqPreReleaseContent,
} from './fertility-iq-female.helper'
import {
  PatientFertilityIQ,
  ProfileTestResult,
  TestResult,
  TestResultSonoDetail,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ColorPalette} from '@libs/services-common/enums'
import {DefaultValue} from '@libs/common/enums'
import {
  getMaleFertilityIqContent,
  getMaleFertilityIqPreReleaseContent,
} from './fertility-iq-male.helper'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {TestObservationMetadata} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-observations-metadata.entity'

export class ProfileTestResultToTestResult {
  testResult: TestResult
  profileTestResult: ProfileTestResult
  isRequiredForFertilityIQ: boolean
  semenProfileTestResults?: ProfileTestResult[]
  AFCMetadata?: TestObservationMetadata
  sonoDetail?: TestResultSonoDetail
  SONOMetadata?: TestObservationMetadata
}

export class TestResultToProfileTestResultMap {
  rows: ProfileTestResultToTestResult[]
}

export const getFertilityIQSubHeader = (): Content => ({
  text: 'Fertility IQ',
  fontSize: 36,
  lineHeight: 1.1,
  bold: true,
  color: ColorPalette.Green800,
  marginTop: MarginsPdfEnum.Margin32,
  marginLeft: MarginsPdfEnum.Margin80,
})

export async function getFertilityIqPDFContent(fertilityIQ: PatientFertilityIQ): Promise<Content> {
  const notesContent: Content = [
    {
      text: 'Message from your Care Team',
      fontSize: 24,
      color: ColorPalette.Green,
      lineHeight: 1.1,
      bold: true,
      marginBottom: MarginsPdfEnum.Margin16,
    },
    {
      text: fertilityIQ?.releaseNote || DefaultValue.LongDash,
      fontSize: 22,
      color: ColorPalette.Green800,
      lineHeight: 1.4,
      marginBottom: MarginsPdfEnum.Margin48,
    },
  ]

  const resultsContent = fertilityIQ.fertilityIQFemale?.id
    ? await getFemaleFertilityIqContent(fertilityIQ)
    : await getMaleFertilityIqContent(fertilityIQ)

  return [notesContent, resultsContent]
}

export async function createFertilityIqPDF(
  fertilityIQ: PatientFertilityIQ,
  patient: Patient,
  staff: Staff,
): Promise<TDocumentDefinitions> {
  try {
    const headerContent = await getHeaderContent(patient)
    const subHeaderContent = getFertilityIQSubHeader()

    const content = await getFertilityIqPDFContent(fertilityIQ)

    const fileDefinition: TDocumentDefinitions = {
      pageMargins: [
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin375,
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin120,
      ],
      pageSize: {
        width: 1440,
        height: 1865,
      },
      header: () => [headerContent, subHeaderContent],
      content: [content],
      footer: (page, pageCount) => getFooterContent(staff, {page, pageCount}),
      info: {title: 'fertility-iq.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
      },
    }

    return fileDefinition
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.FertilityIQFunctions.CreateFertilityIqPDF,
      eventName: activityLogs.FertilityIQActions.CreateFertilityIqPDFFailed,
    })
  }
}

export async function getFertilityIqPreReleasePDFContent(
  rows: ProfileTestResultToTestResult[],
  sexAtBirth: SexAtBirth,
): Promise<Content> {
  const notesContent: Content = [
    {
      text: 'Message from your Care Team',
      fontSize: 24,
      color: ColorPalette.Green,
      lineHeight: 1.1,
      bold: true,
      marginBottom: MarginsPdfEnum.Margin16,
    },
    {
      text: DefaultValue.LongDash, // hardcoded, because not released state
      fontSize: 20,
      color: ColorPalette.Green800,
      lineHeight: 1.2,
      marginBottom: MarginsPdfEnum.Margin48,
    },
  ]

  const resultsContent =
    sexAtBirth === SexAtBirth.Male
      ? await getMaleFertilityIqPreReleaseContent(rows)
      : await getFemaleFertilityIqPreReleaseContent(rows)

  return [notesContent, resultsContent]
}

export async function createFertilityIqPreReleasePDF(
  patient: Patient,
  staff: Staff,
  rows: ProfileTestResultToTestResult[],
): Promise<TDocumentDefinitions> {
  try {
    const headerContent = await getHeaderContent(patient)
    const subHeaderContent = getFertilityIQSubHeader()

    const content = await getFertilityIqPreReleasePDFContent(rows, patient.sexAtBirth)

    const fileDefinition: TDocumentDefinitions = {
      pageMargins: [
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin375,
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin120,
      ],
      pageSize: {
        width: 1440,
        height: 1865,
      },
      header: () => [headerContent, subHeaderContent],
      content: [content],
      footer: (page, pageCount) => getFooterContent(staff, {page, pageCount}),
      info: {title: 'fertility-iq-pre-release.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
      },
    }

    return fileDefinition
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.FertilityIQFunctions.CreateFertilityIqPreReleasePDF,
      eventName: activityLogs.FertilityIQActions.CreateFertilityIqPreReleasePDFFailed,
    })
  }
}
