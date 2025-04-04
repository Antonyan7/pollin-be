import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'
import {TestResult, TestResultMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {Nestproject_TEST_RESULT_LOGO_BASE64} from '@libs/services-common/assets/assets.const'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette, PatientAddressType} from '@libs/services-common/enums'
import {
  createFileHeaderAndAddressTable,
  createPatientTable,
  getPatientAddressFormattedText,
} from '@libs/services-common/helpers/pdf-kit-helpers/common/common-pdf.helper'
import {
  Content,
  ContentImage,
  ContentTable,
  CustomTableLayout,
  Style,
  Table,
  TableCell,
  TableLayout,
} from 'pdfmake/interfaces'
import {
  headerTextBoldStyle,
  headerTextStyle,
} from '@libs/common/helpers/pdf-document/pdf-header.helper'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const getTestResultPDFLogoImage = (): ContentImage => ({
  width: 470,
  image: Nestproject_TEST_RESULT_LOGO_BASE64,
  alignment: 'left',
  margin: MarginsPdfEnum.Margin0,
})

export const tableBodyCellStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'left',
}

export const tableBodyCellSecondaryStyle: Style = {
  ...tableBodyCellStyle,
  fontSize: 28,
}

export const tableHeaderCellStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green600,
  bold: true,
}

export const defineMarginValue = (patient: Patient): number => {
  const patientAddress = patient.patientAddresses?.find(
    (item) => item.type === PatientAddressType.Primary,
  )
  const text = patientAddress
    ? getPatientAddressFormattedText(patientAddress)
    : DefaultValue.LongDash

  const length = text?.length

  switch (true) {
    case length == 1:
      return MarginsPdfEnum.Margin340

    case length > 30 && length <= 50:
      return MarginsPdfEnum.Margin370

    case length > 50:
      return MarginsPdfEnum.Margin420

    default:
      return MarginsPdfEnum.Margin340
  }
}

const getDateLabel = (testResult: TestResult): string => {
  const specialWorkflow =
    testResult?.testPanel?.superType?.specialWorkflow ||
    testResult?.testType?.superType?.specialWorkflow

  return specialWorkflow !== ServiceTypeWorkflow.DiagnosticImaging
    ? 'Date Collected'
    : 'Appointment date'
}

const getDateFormattedForPdf = (testResult: TestResult): string => {
  const specialWorkflow =
    testResult?.testPanel?.superType?.specialWorkflow ||
    testResult?.testType?.superType?.specialWorkflow

  if (specialWorkflow !== ServiceTypeWorkflow.DiagnosticImaging) {
    return testResult?.specimen?.collectedOn
      ? dateTimeUtil.formatToZonedDateTimeWithAbbreviation({
          date: dateTimeUtil.toDate(testResult.specimen.collectedOn),
        })
      : DefaultValue.LongDash
  } else {
    return testResult?.appointment?.start
      ? dateTimeUtil.formatBirthDate(testResult.appointment.start)
      : DefaultValue.LongDash
  }
}

export const getTestResultTableRowData = (testResult: TestResult): TableCell[] => {
  return [
    [
      {
        ...headerTextBoldStyle,
        text: 'Test Name',
        marginBottom: MarginsPdfEnum.Margin16,
      },
      {
        ...headerTextStyle,
        text: testResult?.testType?.title || testResult?.testPanel?.title,
      },
    ],
    [
      {
        ...headerTextBoldStyle,
        text: 'Lab',
        marginBottom: MarginsPdfEnum.Margin16,
      },
      {
        ...headerTextStyle,
        text: testResult?.labInfo?.name || DefaultValue.LongDash,
      },
    ],
    [
      {
        ...headerTextBoldStyle,
        text: getDateLabel(testResult),
        marginBottom: MarginsPdfEnum.Margin16,
      },
      {
        ...headerTextStyle,
        text: getDateFormattedForPdf(testResult),
      },
    ],
  ]
}

export const createTestResultInfoTable = async (testResult: TestResult): Promise<ContentTable> => {
  const testResultTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: () => ColorPalette.White,
    hLineWidth: () => 1,
    paddingLeft: () => 0,
    paddingTop: (i: number) => {
      if (i == 1) {
        return 24
      }
      return 0
    },
    paddingRight: () => 0,
    paddingBottom: (i: number) => {
      if (i == 0) {
        return 24
      }
      return 0
    },
  }

  return {
    layout: testResultTableLayout,
    marginBottom: MarginsPdfEnum.Margin40,
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      body: [getTestResultTableRowData(testResult)],
    } as Table,
  }
}

export const noBorderNoPaddingTableLayout = (): TableLayout => ({
  vLineColor: ColorPalette.White,
  hLineColor: () => ColorPalette.White,
  hLineWidth: () => 0,
  paddingLeft: () => 0,
  paddingTop: () => 0,
  paddingRight: () => 0,
  paddingBottom: () => 0,
})

/** @deprecated */
export const createHeaderContent = async (testResult: TestResult): Promise<Content> => {
  return [
    createFileHeaderAndAddressTable(getTestResultPDFLogoImage()),
    await createTestResultInfoTable(testResult),
    await createPatientTable(testResult.patient),
  ]
}

export const getTestResultMeasurementsTableHeader = (): TableCell[] => [
  {text: 'Test Name', ...tableHeaderCellStyle},
  {
    text: 'Result',
    ...tableHeaderCellStyle,
  },
  {text: 'Unit', ...tableHeaderCellStyle},
  {
    text: 'Reference Ranges',
    ...tableHeaderCellStyle,
    noWrap: true,
  },
  {
    text: 'Result Type',
    ...tableHeaderCellStyle,
    noWrap: true,
  },
]

export const getRowItems = (measurement: TestResultMeasurement): TableCell[] => [
  {
    text: measurement?.testType?.title,
    ...tableBodyCellStyle,
    marginRight: MarginsPdfEnum.Margin30,
  },
  {
    text: measurement?.result || DefaultValue.LongDash,
    ...tableBodyCellStyle,
    noWrap: false,
    marginRight: MarginsPdfEnum.Margin30,
  },
  {
    text: measurement?.testType?.unit || DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: measurement?.testType?.averageRange || DefaultValue.LongDash,
    ...tableBodyCellStyle,
    marginLeft: MarginsPdfEnum.Margin10,
  },
  {
    text: measurement?.resultType || DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
]

export const getTestResultMeasurementsTableRowsValues = (
  items: TestResultMeasurement[],
): TableCell[][] => items.map((item) => getRowItems(item))

export const createTestResultMeasurementsTable = (
  measurements: TestResultMeasurement[],
): ContentTable => {
  const testResultMeasurementsTable: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i: number) => {
      if (i == 1) {
        return ColorPalette.Green
      }
      return i == 0 ? ColorPalette.White : ColorPalette.Green400
    },
    hLineWidth: (i: number, node) => {
      if (i === node.table.body.length) {
        return 0
      }

      return i === 1 ? 2 : 1
    },
    paddingLeft: () => 0,
    paddingTop: (i: number) => (i == 0 ? 8 : 16),
    paddingRight: () => 0,
    paddingBottom: (i: number) => (i == 0 ? 8 : 16),
  }

  return {
    layout: testResultMeasurementsTable,
    table: {
      headerRows: 1,
      widths: ['*', 230, '*', '*', '*'],
      body: [
        getTestResultMeasurementsTableHeader(),
        ...getTestResultMeasurementsTableRowsValues(measurements),
      ],
      marginTop: MarginsPdfEnum.Margin24,
    } as Table,
  }
}
