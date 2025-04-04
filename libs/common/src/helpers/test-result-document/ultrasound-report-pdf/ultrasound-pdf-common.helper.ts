import {getCystsDto} from '@apps/lis/diagnostic-imaging/helper/ultrasound.helper'
import {NestprojectConfigService} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'
import {
  TestResult,
  TestResultOvaryMeasurement,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Nestproject_ULTRASOUND_REPORT_LOGO_BASE64} from '@libs/services-common/assets/assets.const'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette} from '@libs/services-common/enums'
import {CystTypeLabel} from '@libs/services-common/enums/stim-sheet.enum'
import {ClinicInfoService} from '@libs/services-common/services/clinic-info.service'
import {ContentImage, ContentTable, CustomTableLayout, Table, TableCell} from 'pdfmake/interfaces'
import {tableBodyCellStyle, tableHeaderCellStyle} from './ultrasound-pdf-styles.helper'
import {convertNumberToStringArray} from '@libs/common/helpers/ultrasound-result.helper'
import {getTestResultTableRowData} from '../test-result-pdf/test-result-pdf.helper'

const configService = NestprojectConfigService.getInstance()
const clinicInfoService: ClinicInfoService = new ClinicInfoService(configService)

export const getUltrasoundReportPDFLogoImage = (): ContentImage => ({
  width: 378,
  image: Nestproject_ULTRASOUND_REPORT_LOGO_BASE64,
  alignment: 'left',
  margin: MarginsPdfEnum.Margin0,
})

export const concatLogoAndClinicAddress = (
  logoImage: ContentImage,
  clinicInternalAddress: string,
): TableCell[] => {
  return [
    {
      ...logoImage,
      marginLeft: MarginsPdfEnum.Margin80,
      marginTop: MarginsPdfEnum.Margin80,
    },
    {
      text: DefaultValue.Empty,
    },
    {
      ...tableBodyCellStyle,
      text: clinicInternalAddress,
      alignment: 'right',
      marginTop: MarginsPdfEnum.Margin80,
      marginRight: MarginsPdfEnum.Margin80,
    },
  ]
}

/** @deprecated */
export const createFileHeaderAndAddressTable = (logoImage: ContentImage): ContentTable => {
  return {
    layout: 'noBorders',
    table: {
      widths: ['auto', '*', 'auto'],
      body: [concatLogoAndClinicAddress(logoImage, clinicInfoService.getClinicInternalAddress())],
    } as Table,
    marginBottom: MarginsPdfEnum.Margin36,
  }
}

export const createTestResultInfoTable = async (testResult: TestResult): Promise<ContentTable> => {
  const testResultTable: CustomTableLayout = {
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
    layout: testResultTable,
    marginLeft: MarginsPdfEnum.Margin80,
    marginRight: MarginsPdfEnum.Margin80,
    table: {
      headerRows: 1,
      widths: [155, 145, '*', 250],
      body: [getTestResultTableRowData(testResult)],
    } as Table,
  }
}

export const tableLayoutCommonNoBordersForUltrasound: CustomTableLayout = {
  vLineColor: ColorPalette.White,
  hLineColor: () => ColorPalette.White,
  hLineWidth: () => 1,
  paddingLeft: () => 0,
  paddingTop: () => 16,
  paddingRight: () => 0,
  paddingBottom: () => 16,
}

export const tableLayoutCommonForUltrasound: CustomTableLayout = {
  vLineColor: ColorPalette.White,
  hLineColor: (i: number) => {
    if (i == 1) {
      return ColorPalette.Green
    }
    return ColorPalette.White
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

export const getCommonUltrasoundTableHeader = (): TableCell[] => [
  {text: 'Type', ...tableHeaderCellStyle},
  {
    text: 'Result',
    ...tableHeaderCellStyle,
  },
  {
    text: DefaultValue.Empty,
  },
  {
    text: DefaultValue.Empty,
  },
  {text: 'Unit', ...tableHeaderCellStyle},
]

export const getOvaryCystsCommon = (ovary: TestResultOvaryMeasurement): TableCell[][] => {
  const cysts = getCystsDto(ovary)

  return cysts.map((cyst) => {
    return [
      {
        text: 'Cyst',
        ...tableBodyCellStyle,
        marginLeft: MarginsPdfEnum.Margin16,
      },
      {
        text: cyst?.count ? cyst.count + ' cysts' : DefaultValue.Empty,
        ...tableBodyCellStyle,
      },
      {
        text:
          cyst?.count && cyst?.sizes?.length
            ? '(cm) ' + convertNumberToStringArray(cyst.sizes).join(', ')
            : DefaultValue.Empty,
        ...tableBodyCellStyle,
      },
      {
        text: cyst?.count && cyst?.typeId ? CystTypeLabel.get(cyst.typeId) : DefaultValue.Empty,
        ...tableBodyCellStyle,
      },
      {
        text: DefaultValue.LongDash,
        ...tableBodyCellStyle,
      },
    ]
  })
}
