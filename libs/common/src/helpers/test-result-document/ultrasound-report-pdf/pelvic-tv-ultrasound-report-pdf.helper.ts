import {importFollMoreThan1CmIntoRes} from '@apps/lis/diagnostic-imaging/helper/ultrasound.helper'
import {checkMoreOrEqualZeroNotNullValue} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'
import {
  TestResult,
  TestResultOvaryMeasurement,
  TestResultUterusMeasurement,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {OvaryLocation} from '@libs/data-layer/apps/clinic-test/enums'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {Content, Table, TableCell} from 'pdfmake/interfaces'
import {
  getCommonUltrasoundTableHeader,
  getOvaryCystsCommon,
  tableLayoutCommonForUltrasound,
} from './ultrasound-pdf-common.helper'
import {headerCellSecondaryStyle, tableBodyCellStyle} from './ultrasound-pdf-styles.helper'
import {convertNumberToStringArray} from '@libs/common/helpers/ultrasound-result.helper'

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
  {text: DefaultValue.Empty},
  {text: DefaultValue.Empty},
  {
    text: unit,
    ...tableBodyCellStyle,
  },
]

const getUterusMeasurementRowValues = (
  uterusMeasurement: TestResultUterusMeasurement,
): TableCell[][] => {
  return [
    [
      {
        text: 'Uterus',
        ...headerCellSecondaryStyle,
      },
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
    ],
    getRowValue('Length (optional)', uterusMeasurement?.length, 'cm'),
    getRowValue('Width (optional)', uterusMeasurement?.width, 'cm'),
    getRowValue('Height (optional)', uterusMeasurement?.height, 'cm'),
    getRowValue('Volume (optional)', uterusMeasurement?.volume, 'cm³'),
    getRowValue('Endometrium Thickness', uterusMeasurement?.endometriumThickness, 'cm'),
    getRowValue('UT-Trace (optional)', uterusMeasurement?.utTrace, 'cm'),
  ]
}

const getOvaryMeasurementRowValues = (
  ovary: TestResultOvaryMeasurement,
  testResult: TestResult,
): TableCell[][] => {
  const folliclesMoreThanOneCm = importFollMoreThan1CmIntoRes(ovary, testResult)

  return [
    [
      {
        text: ovary.location === OvaryLocation.RightOvary ? 'Right Ovary' : 'Left Ovary',
        ...headerCellSecondaryStyle,
      },
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
    ],
    getRowValue('Length', ovary?.length, 'cm'),
    getRowValue('Width', ovary?.width, 'cm'),
    getRowValue('Height', ovary?.height, 'cm'),
    getRowValue('Volume', ovary?.volume, 'cm³'),
    [
      {
        text: 'AFC',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      {
        text: checkMoreOrEqualZeroNotNullValue(ovary?.totalFollicles)
          ? ovary.totalFollicles + ' follicles'
          : DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
      {
        text: DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
    ],
    [
      {
        text: 'Foll>1.0 cm',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      [
        {
          text: checkMoreOrEqualZeroNotNullValue(folliclesMoreThanOneCm?.count)
            ? folliclesMoreThanOneCm.count + ' follicles'
            : DefaultValue.LongDash,
          ...tableBodyCellStyle,
          marginBottom: MarginsPdfEnum.Margin4,
        },
        {
          text:
            folliclesMoreThanOneCm?.count && folliclesMoreThanOneCm?.sizes?.length
              ? 'Sizes (cm): ' + convertNumberToStringArray(folliclesMoreThanOneCm.sizes).join(', ')
              : DefaultValue.Empty,
          ...tableBodyCellStyle,
          marginBottom: MarginsPdfEnum.Margin4,
        },
        {
          text:
            folliclesMoreThanOneCm?.count && folliclesMoreThanOneCm?.volumes?.length
              ? 'Volumes (cm³): ' +
                convertNumberToStringArray(folliclesMoreThanOneCm.volumes).join(', ')
              : DefaultValue.Empty,
          ...tableBodyCellStyle,
          marginBottom: MarginsPdfEnum.Margin4,
        },
        {
          text: folliclesMoreThanOneCm?.averageVolume
            ? 'Avg. volume (cm³): ' + folliclesMoreThanOneCm.averageVolume
            : DefaultValue.Empty,
          ...tableBodyCellStyle,
        },
      ],
      {
        text: folliclesMoreThanOneCm?.totalVolume
          ? 'Total volume (cm³): ' + folliclesMoreThanOneCm.totalVolume
          : DefaultValue.Empty,
        ...tableBodyCellStyle,
      },
      {text: DefaultValue.Empty},
      {
        text: DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
    ],
    ...getOvaryCystsCommon(ovary),
  ]
}

export const createPelvicTVUltrasoundMainContent = (testResult: TestResult): Content => {
  const ovaryRight = testResult?.testResultOvaryMeasurements?.find(
    (ovaryMeas) => ovaryMeas.location == OvaryLocation.RightOvary,
  )

  const ovaryLeft = testResult?.testResultOvaryMeasurements?.find(
    (ovaryMeas) => ovaryMeas.location == OvaryLocation.LeftOvary,
  )
  return [
    {
      layout: tableLayoutCommonForUltrasound,
      table: {
        headerRows: 1,
        widths: [292, 220, 180, 177, '*'],
        body: [
          getCommonUltrasoundTableHeader(),
          ...getUterusMeasurementRowValues(testResult.testResultUterusMeasurement),
          ...getOvaryMeasurementRowValues(ovaryRight, testResult),
          ...getOvaryMeasurementRowValues(ovaryLeft, testResult),
        ],
      } as Table,
      marginBottom: MarginsPdfEnum.Margin12,
    },
  ]
}
