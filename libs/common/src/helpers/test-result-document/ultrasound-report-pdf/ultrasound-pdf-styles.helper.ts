import {ColorPalette} from '@libs/services-common/enums'
import {Style} from 'pdfmake/interfaces'

export const tableBodyCellStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'left',
}

export const headerCellSecondaryStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green800,
  bold: true,
  alignment: 'left',
  noWrap: true,
}

export const tableHeaderCellStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green800,
  bold: true,
}
