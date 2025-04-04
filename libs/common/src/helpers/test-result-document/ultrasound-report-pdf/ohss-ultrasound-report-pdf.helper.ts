import {checkMoreOrEqualZeroNotNullValue} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'
import {
  TestResultOHSSFluidMeasurement,
  TestResultOHSSOvaryMeasurement,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {OvaryLocation} from '@libs/data-layer/apps/clinic-test/enums'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ContentTable, Table, TableCell} from 'pdfmake/interfaces'
import {tableLayoutCommonForUltrasound} from './ultrasound-pdf-common.helper'
import {
  headerCellSecondaryStyle,
  tableBodyCellStyle,
  tableHeaderCellStyle,
} from './ultrasound-pdf-styles.helper'
import {convertStringToNumberArray} from '@libs/common/helpers/ultrasound-result.helper'

export const getOHSSUltrasoundMeasurementsTableHeader = (): TableCell[] => [
  {text: 'Type', ...tableHeaderCellStyle},
  {text: 'Result', ...tableHeaderCellStyle},
  {text: 'Unit', ...tableHeaderCellStyle},
]

const getRowValue = (title: string, value: number, unit: string): TableCell[] => [
  {
    text: title,
    ...tableBodyCellStyle,
    marginLeft: MarginsPdfEnum.Margin16,
  },
  {
    text: checkMoreOrEqualZeroNotNullValue(value) ? value : DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: unit,
    ...tableBodyCellStyle,
  },
]

const threeLargestAvgSizeTableRowValue = (ovary: TestResultOHSSOvaryMeasurement): TableCell[] => {
  const [first, second, third] = convertStringToNumberArray(ovary?.threeLargestAvgInSize)

  return [
    {
      text: '3 Largest Avg in size',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin16,
      marginTop: MarginsPdfEnum.Margin16,
    },
    [
      {
        text: checkMoreOrEqualZeroNotNullValue(first) ? first : DefaultValue.LongDash,
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: checkMoreOrEqualZeroNotNullValue(second) ? second : DefaultValue.LongDash,
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: checkMoreOrEqualZeroNotNullValue(third) ? third : DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
    ],
    [
      {
        text: 'cm',
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: 'cm',
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: 'cm',
        ...tableBodyCellStyle,
      },
    ],
  ]
}

export const getOHSSOvaryMeasurementsRowValues = (
  ovary: TestResultOHSSOvaryMeasurement,
): TableCell[][] => {
  return [
    [
      {
        text: ovary.location === OvaryLocation.RightOvary ? 'Right Ovary' : 'Left Ovary',
        ...headerCellSecondaryStyle,
      },
      {
        text: DefaultValue.Empty,
      },
      {
        text: DefaultValue.Empty,
      },
    ],
    getRowValue('Length', ovary?.length, 'cm'),
    getRowValue('Width', ovary?.width, 'cm'),
    getRowValue('Height', ovary?.height, 'cm'),
    getRowValue('Volume', ovary?.volume, 'cm³'),
    getRowValue('Approx No. of Cysts', ovary?.approxNumberOfCysts, DefaultValue.LongDash),
    threeLargestAvgSizeTableRowValue(ovary),
  ]
}

const PCDSTableRowValues = (fluidMeasurement: TestResultOHSSFluidMeasurement): TableCell[] => {
  return [
    {
      text: 'PCDS',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin16,
      marginTop: MarginsPdfEnum.Margin20,
    },
    [
      {
        text: checkMoreOrEqualZeroNotNullValue(fluidMeasurement?.PCDSLength)
          ? 'Length: ' + fluidMeasurement.PCDSLength
          : DefaultValue.LongDash,
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: checkMoreOrEqualZeroNotNullValue(fluidMeasurement?.PCDSWidth)
          ? 'Width: ' + fluidMeasurement.PCDSWidth
          : DefaultValue.LongDash,
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: checkMoreOrEqualZeroNotNullValue(fluidMeasurement?.PCDSAp)
          ? 'AP: ' + fluidMeasurement.PCDSAp
          : DefaultValue.LongDash,
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: checkMoreOrEqualZeroNotNullValue(fluidMeasurement?.PCDSVolume)
          ? 'Volume: ' + fluidMeasurement.PCDSVolume
          : DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
    ],
    [
      {
        text: 'cm',
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: 'cm',
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: 'cm',
        ...tableBodyCellStyle,
        marginBottom: MarginsPdfEnum.Margin3,
      },
      {
        text: 'cc',
        ...tableBodyCellStyle,
      },
    ],
  ]
}

export const getOHSSPelvicFreeFluidCollectionRowValues = (
  fluidMeasurement: TestResultOHSSFluidMeasurement,
): TableCell[][] => {
  return [
    [
      {
        text: 'Pelvic Free Fluid Collection',
        ...headerCellSecondaryStyle,
      },
      {
        text: DefaultValue.Empty,
      },
      {
        text: DefaultValue.Empty,
      },
    ],
    PCDSTableRowValues(fluidMeasurement),
    getRowValue('Right Adnexa', fluidMeasurement?.rightAdnexa, 'cc'),
    getRowValue('Left Adnexa', fluidMeasurement?.leftAdnexa, 'cc'),
    getRowValue('ACDS', fluidMeasurement?.ACDS, 'cc'),
  ]
}

export const getOHSSAbdominalFreeFluidCollectionRowValues = (
  fluidMeasurement: TestResultOHSSFluidMeasurement,
): TableCell[][] => {
  return [
    [
      {
        text: 'Abdominal Free Fluid Collection',
        ...headerCellSecondaryStyle,
      },
      {
        text: DefaultValue.Empty,
      },
      {
        text: DefaultValue.Empty,
      },
    ],
    getRowValue('Morrison’s Pouch RUQ', fluidMeasurement?.morrisonPouchRUQ, 'cc'),
    getRowValue('Right Subdiaphragmatic', fluidMeasurement?.rightSubdiaphragmatic, 'cc'),
    getRowValue('Right Flank', fluidMeasurement?.rightFlank, 'cc'),
    getRowValue('LUQ', fluidMeasurement?.LUQ, 'cc'),
    getRowValue('Left Subdiaphragmatic', fluidMeasurement?.leftSubdiaphragmatic, 'cc'),
    getRowValue('Left Flank', fluidMeasurement?.leftFlank, 'cc'),
    getRowValue('Total Amount of free fluid', fluidMeasurement?.totalAmountFreeFluid, 'cc'),
  ]
}

const getBooleanAnswer = (value: boolean): string => {
  return value !== null ? (value ? 'Yes' : 'No') : DefaultValue.LongDash
}

export const getOHSSPleuralEffusionPresenceRowValues = (
  fluidMeasurement: TestResultOHSSFluidMeasurement,
): TableCell[][] => {
  return [
    [
      {
        text: 'Presence of Pleural Effusion',
        ...headerCellSecondaryStyle,
      },
      {
        text: DefaultValue.Empty,
      },
      {
        text: DefaultValue.Empty,
      },
    ],
    [
      {
        text: 'Right',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      {
        text: getBooleanAnswer(fluidMeasurement?.pleuralEffusionRight),
        ...tableBodyCellStyle,
      },
      {
        text: DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
    ],
    [
      {
        text: 'Left',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      {
        text: getBooleanAnswer(fluidMeasurement?.pleuralEffusionLeft),
        ...tableBodyCellStyle,
      },
      {
        text: DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
    ],
  ]
}

export const createOHSSUltrasoundMainContent = (
  OHSSOvaryMeasurements: TestResultOHSSOvaryMeasurement[],
  testResultOHSSFluidMeasurement: TestResultOHSSFluidMeasurement,
): ContentTable => {
  const ovaryRightMeasurement = OHSSOvaryMeasurements?.length
    ? OHSSOvaryMeasurements.find((item) => item.location === OvaryLocation.RightOvary)
    : null

  const ovaryLeftMeasurement = OHSSOvaryMeasurements?.length
    ? OHSSOvaryMeasurements.find((item) => item.location === OvaryLocation.LeftOvary)
    : null

  return {
    layout: tableLayoutCommonForUltrasound,
    table: {
      headerRows: 1,
      widths: [330, 210, '*'],
      body: [
        getOHSSUltrasoundMeasurementsTableHeader(),
        [
          {
            text: 'Pelvic',
            ...headerCellSecondaryStyle,
            marginTop: MarginsPdfEnum.Margin16,
            marginBottom: MarginsPdfEnum.Margin24,
          },
          {text: DefaultValue.Empty},
          {text: DefaultValue.Empty},
        ],
        ...getOHSSOvaryMeasurementsRowValues(ovaryRightMeasurement),
        ...getOHSSOvaryMeasurementsRowValues(ovaryLeftMeasurement),
        ...getOHSSPelvicFreeFluidCollectionRowValues(testResultOHSSFluidMeasurement),
        ...getOHSSAbdominalFreeFluidCollectionRowValues(testResultOHSSFluidMeasurement),
        ...getOHSSPleuralEffusionPresenceRowValues(testResultOHSSFluidMeasurement),
      ],
      marginTop: MarginsPdfEnum.Margin24,
    } as Table,
  }
}
