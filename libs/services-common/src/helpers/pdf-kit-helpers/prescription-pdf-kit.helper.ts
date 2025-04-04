import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'
import {PatientMedication} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {
  Content,
  ContentImage,
  ContentTable,
  CustomTableLayout,
  Style,
  Table,
  TableCell,
} from 'pdfmake/interfaces'
import {ColorPalette} from '@libs/services-common/enums/color-palette.enum'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {
  headerTextBoldStyle,
  headerTextStyle,
} from '@libs/common/helpers/pdf-document/pdf-header.helper'
import {Nestproject_SUB_HEADER_PRESCRIPTION_LOGO} from '@libs/services-common/assets/assets.const'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const tableHeaderCellStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green600,
  bold: true,
}

export const tableBodyCellStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'left',
}

// File footer styles
export const footerSignatureBlockStyle: Style = {
  fontSize: 20,
  color: ColorPalette.Green,
  alignment: 'left',
}
export const footerAuthorSignatureLabelStyle: Style = {
  ...footerSignatureBlockStyle,
  color: ColorPalette.Green800,
  bold: true,
  marginBottom: MarginsPdfEnum.Margin10,
}

export const footerDesignationLabelStyle: Style = {
  ...footerSignatureBlockStyle,
  color: ColorPalette.Grey500,
}

const getPrescriberTableRowData = (prescription: PatientPrescription): TableCell[] => [
  [
    {
      ...headerTextBoldStyle,
      text: 'Prescriber Name',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    {
      ...headerTextStyle,
      text: `${prescription.prescriber.firstName} ${prescription.prescriber.lastName}`,
    },
  ],
  [
    {
      ...headerTextBoldStyle,
      text: 'Prescriber CPSO Registration No.',
      marginBottom: MarginsPdfEnum.Margin16,
    },
    {
      ...headerTextStyle,
      text: prescription?.prescriber?.cpso || DefaultValue.LongDash,
    },
  ],
  [
    {
      ...headerTextBoldStyle,
      marginBottom: MarginsPdfEnum.Margin16,
      text: 'Prescription Date',
    },
    {
      ...headerTextStyle,
      text: dateTimeUtil.formatBirthDateWithFullMonth(prescription.prescribedOn),
    },
  ],
]

export const getPrescriberFileContent = async (
  prescription: PatientPrescription,
): Promise<Content> => {
  const prescriberAndPatientTable: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: () => ColorPalette.White,
    hLineWidth: () => 1,
    paddingLeft: () => 0,
    paddingTop: () => 0,
    paddingRight: () => 0,
    paddingBottom: (i: number) => {
      if (i == 0) {
        return 24
      }
      return 0
    },
  }

  return {
    layout: prescriberAndPatientTable,
    marginBottom: MarginsPdfEnum.Margin28,
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      body: [getPrescriberTableRowData(prescription)],
    } as Table,
  }
}

export const getPrescriptionDosageData = (medication: PatientMedication): string => {
  const dosage = medication.dosage || DefaultValue.LongDash
  const route = medication.route || DefaultValue.LongDash
  const frequency = medication.frequency ?? DefaultValue.LongDash

  const duration =
    dateTimeUtil.differenceInDays(
      dateTimeUtil.toDate(medication.endDate),
      dateTimeUtil.toDate(medication.startDate),
    ) + 1

  const durationUnit = duration > 1 ? 'days' : 'day'

  const durationStatement = `, ${duration} ${durationUnit}`

  const medicationTime = medication.medicationTime || DefaultValue.LongDash

  return `${dosage}, ${route}, ${frequency}${durationStatement}, ${medicationTime}`
}

const getPrescriptionSubHeaderLogo = (): ContentImage => ({
  width: 398,
  image: Nestproject_SUB_HEADER_PRESCRIPTION_LOGO,
  marginLeft: MarginsPdfEnum.Margin80,
  marginBottom: MarginsPdfEnum.Margin24,
})

export const getPrescriptionSubHeader = async (): Promise<Content> => {
  const subHeaderLogo = getPrescriptionSubHeaderLogo()
  return [subHeaderLogo]
}

export const getPatientMedicationsTableHeader = (): TableCell[] => [
  {text: 'Medication', ...tableHeaderCellStyle},
  {text: 'Dosage', ...tableHeaderCellStyle},
  {text: 'Qty', ...tableHeaderCellStyle, noWrap: true, marginRight: MarginsPdfEnum.Margin28},
  {
    text: 'Refill No.',
    ...tableHeaderCellStyle,
    noWrap: true,
    marginRight: MarginsPdfEnum.Margin30,
  },
  {
    text: 'Refill Notes',
    ...tableHeaderCellStyle,
    marginRight: MarginsPdfEnum.Margin40,
    noWrap: true,
  },
  {text: 'Other doctor’s notes', ...tableHeaderCellStyle},
]

export const getRowItems = (item: PatientMedication): TableCell[] => [
  [
    {
      text: item.name,
      ...tableBodyCellStyle,
      marginRight: MarginsPdfEnum.Margin20,
      marginBottom: MarginsPdfEnum.Margin6,
      bold: true,
    },
    {
      ...tableBodyCellStyle,
      text: `Strength: ${item?.strength || DefaultValue.LongDash}`,
      marginRight: MarginsPdfEnum.Margin20,
      marginBottom: MarginsPdfEnum.Margin6,
    },
    {
      ...tableBodyCellStyle,
      text: `Form: ${item?.form || DefaultValue.LongDash}`,
      marginRight: MarginsPdfEnum.Margin20,
      marginBottom: MarginsPdfEnum.Margin6,
      noWrap: true,
    },
    {
      ...tableBodyCellStyle,
      text: `DIN: ${item?.medication?.drugIdentifierNumber || DefaultValue.LongDash}`,
      marginRight: MarginsPdfEnum.Margin20,
      noWrap: true,
    },
  ],
  {
    text: getPrescriptionDosageData(item),
    ...tableBodyCellStyle,
    marginRight: MarginsPdfEnum.Margin30,
  },
  {
    text: item.quantity || DefaultValue.LongDash,
    ...tableBodyCellStyle,
    marginLeft: MarginsPdfEnum.Margin6,
  },
  {
    text: item.refill || DefaultValue.LongDash,
    ...tableBodyCellStyle,
    marginLeft: MarginsPdfEnum.Margin6,
    marginRight: MarginsPdfEnum.Margin80,
  },
  {
    text: item.refillNote || DefaultValue.LongDash,
    ...tableBodyCellStyle,
    marginRight: MarginsPdfEnum.Margin40,
  },
  {text: item.doctorNote || DefaultValue.LongDash, ...tableBodyCellStyle},
]

export const getPatientMedicationsTableRowsValues = (items: PatientMedication[]): TableCell[][] =>
  items.map((item) => getRowItems(item))

export const createPatientMedicationsTable = (medications: PatientMedication[]): ContentTable => {
  const patientMedicationsTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i: number) => {
      if (i == 1) {
        return ColorPalette.Green
      }
      return i == 0 ? ColorPalette.White : ColorPalette.Green400
    },
    hLineWidth: (i: number) => (i == 1 ? 2 : 1),
    paddingLeft: () => 0,
    paddingTop: (i: number) => (i == 0 ? 8 : 16),
    paddingRight: () => 0,
    paddingBottom: (i: number) => (i == 0 ? 8 : 16),
  }

  return {
    layout: patientMedicationsTableLayout,
    table: {
      headerRows: 1,
      widths: ['auto', 220, 54, 'auto', '*', '*'],
      body: [
        getPatientMedicationsTableHeader(),
        ...getPatientMedicationsTableRowsValues(medications),
      ],
    } as Table,
  }
}
