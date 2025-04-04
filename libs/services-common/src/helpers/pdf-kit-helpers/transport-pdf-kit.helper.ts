import {Specimen} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  ContentImage,
  ContentTable,
  CustomTableLayout,
  Style,
  Table,
  TableCell,
} from 'pdfmake/interfaces'
import {
  getLabsTrackSubTableBody,
  getPatientDataHeader,
  getPatientDataRowsValues,
} from '@apps/lis/transport/helper/transport-pdf.helper'
import {ColorPalette} from '@libs/services-common/enums/color-palette.enum'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'

export const headerStyle: Style = {
  fontSize: 20,
  color: ColorPalette.Green,
  bold: true,
}

export const tableHeaderCellStyle: Style = {
  ...headerStyle,
  fontSize: 16,
}
export const bodyCellStyle: Style = {fontSize: 16, color: ColorPalette.Grey600}

export const imageStyle: ContentImage = {
  image: '',
  width: 80,
  height: 80,
  marginBottom: MarginsPdfEnum.Margin24,
}

// layout of invisible table header
export const headerLayout: CustomTableLayout = {
  vLineColor: ColorPalette.White,
  hLineColor: (i) => {
    return i === 1 ? ColorPalette.Green : ColorPalette.White
  },
  paddingLeft: () => {
    return 0
  },
  paddingTop: () => {
    return 7.5
  },
  paddingRight: () => {
    return 0
  },
  paddingBottom: () => {
    return 7.5
  },
}

export const labsTrackTableLayout: CustomTableLayout = {
  vLineColor: ColorPalette.White,
  hLineColor: ColorPalette.White,
  paddingLeft: () => {
    return 0
  },
  paddingTop: () => {
    return 5
  },
  paddingRight: () => {
    return 0
  },
  paddingBottom: () => {
    return 5
  },
}

export const getLabsTrackSubTable = (name: string, location: string, phone: string): TableCell => ({
  layout: labsTrackTableLayout,
  table: {
    widths: ['*', '*'],
    body: getLabsTrackSubTableBody(name, location, phone),
  },
})

export const composePatientDataTable = (specimens: Specimen[]): ContentTable => {
  const patientDataTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i) => {
      return i === 0 ? ColorPalette.White : ColorPalette.Green400
    },
    hLineWidth: () => {
      return 2
    },
    paddingLeft: () => {
      return 8
    },
    paddingTop: () => {
      return 8
    },
    paddingRight: () => {
      return 8
    },
    paddingBottom: () => {
      return 8
    },
  }

  return {
    layout: patientDataTableLayout,
    table: {
      headerRows: 1,
      widths: ['*', '*', '*', '*'],
      body: [getPatientDataHeader(), ...getPatientDataRowsValues(specimens)],
    } as Table,
  }
}
