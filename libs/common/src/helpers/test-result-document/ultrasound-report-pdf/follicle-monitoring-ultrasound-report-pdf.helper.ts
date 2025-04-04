import {
  getBooleanValueIntoString,
  importFollMoreThan1CmIntoRes,
} from '@apps/lis/diagnostic-imaging/helper/ultrasound.helper'
import {checkMoreOrEqualZeroNotNullValue} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'
import {
  TestResult,
  TestResultOvaryMeasurement,
  TestResultUterusMeasurement,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {OvaryLocation} from '@libs/data-layer/apps/clinic-test/enums'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {TrilaminarEndometriumOptions, UterusResultLabels} from '@libs/services-common/enums'
import {Content, Table, TableCell} from 'pdfmake/interfaces'
import {
  getCommonUltrasoundTableHeader,
  getOvaryCystsCommon,
  tableLayoutCommonForUltrasound,
} from './ultrasound-pdf-common.helper'
import {headerCellSecondaryStyle, tableBodyCellStyle} from './ultrasound-pdf-styles.helper'
import {convertNumberToStringArray} from '@libs/common/helpers/ultrasound-result.helper'

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
    [
      {
        text: 'Endometrium Thickness',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      {
        text: checkMoreOrEqualZeroNotNullValue(uterusMeasurement?.endometriumThickness)
          ? uterusMeasurement.endometriumThickness
          : DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
      {text: DefaultValue.Empty},
      {text: DefaultValue.Empty},
      {
        text: 'cm',
        ...tableBodyCellStyle,
      },
    ],
    [
      {
        text: 'Trilaminar Endometrium',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      {
        text: uterusMeasurement?.trilaminarEndometrium
          ? UterusResultLabels.get(
              TrilaminarEndometriumOptions[uterusMeasurement.trilaminarEndometrium],
            )
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
        text: 'Free Fluid',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      {
        text:
          uterusMeasurement?.freeFluid !== null
            ? UterusResultLabels.get(getBooleanValueIntoString(uterusMeasurement.freeFluid))
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
      {
        text: checkMoreOrEqualZeroNotNullValue(folliclesMoreThanOneCm?.count)
          ? folliclesMoreThanOneCm.count + ' follicles'
          : DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
      {
        text: folliclesMoreThanOneCm?.count
          ? 'Sizes (cm): ' + convertNumberToStringArray(folliclesMoreThanOneCm.sizes).join(', ')
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

export const createFollicleMonitoringUltrasoundMainContent = (testResult: TestResult): Content => {
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
        widths: [300, 180, 182, 185, '*'],
        body: [
          getCommonUltrasoundTableHeader(),
          ...getUterusMeasurementRowValues(testResult.testResultUterusMeasurement),
          ...getOvaryMeasurementRowValues(ovaryRight, testResult),
          ...getOvaryMeasurementRowValues(ovaryLeft, testResult),
        ],
      } as Table,
      marginBottom: MarginsPdfEnum.Margin24,
    },
  ]
}
