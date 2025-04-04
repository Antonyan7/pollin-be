import {ColorPalette} from '@libs/services-common/enums'
import {Style} from 'pdfmake/interfaces'

export const labelSmallStyle: Style = {
  fontSize: 18,
  lineHeight: 1.4,
  color: ColorPalette.Green,
}

export const labelSmallBoldStyle: Style = {
  ...labelSmallStyle,
  color: ColorPalette.Green800,
  bold: true,
}

export const textMediumStyle: Style = {
  fontSize: 22,
  lineHeight: 1.4,
  color: ColorPalette.Green800,
}

export const textMediumBoldStyle: Style = {
  ...textMediumStyle,
  bold: true,
}

export const textMediumSecondaryBoldStyle: Style = {
  ...textMediumStyle,
  fontSize: 20,
  bold: true,
}

export const subHeaderStyle: Style = {
  fontSize: 24,
  lineHeight: 1.1,
  color: ColorPalette.Green,
  bold: true,
}

export const tabHeaderCellStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green800,
  fillColor: ColorPalette.Alabaster,
  bold: true,
}

export const tabBodyCellStyle: Style = {
  fontSize: 16,
  lineHeight: 1.4,
  color: ColorPalette.Grey500,
  fillColor: ColorPalette.Dew,
}

export const tabBodyCellBoldStyle: Style = {
  ...tabBodyCellStyle,
  fontSize: 16,
  lineHeight: 1.4,
  bold: true,
}
