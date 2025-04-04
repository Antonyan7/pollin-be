import {Nestproject_RECEIPT_LOGO_BASE64} from '@libs/services-common/assets/assets.const'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette} from '@libs/services-common/enums'
import {ContentImage, Style} from 'pdfmake/interfaces'

export const getPaymentReceiptLogoImage = (): ContentImage => ({
  width: 208,
  image: Nestproject_RECEIPT_LOGO_BASE64,
  alignment: 'left',
  margin: MarginsPdfEnum.Margin0,
})

export const clinicAddressForPaymentReceiptLineStyle: Style = {
  fontSize: 14,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'right',
  marginBottom: MarginsPdfEnum.Margin6,
}

export const tableHeaderCellBoldStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green800,
  bold: true,
  alignment: 'left',
  noWrap: true,
  marginBottom: MarginsPdfEnum.Margin8,
}
export const tableHeaderAmountCellBoldStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green800,
  bold: true,
  alignment: 'right',
  noWrap: true,
}
export const tableBodyAmountCellStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'right',
  marginBottom: MarginsPdfEnum.Margin8,
}
export const tableBodyCellStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'left',
}

export const tableCellSecondaryStyle: Style = {
  fontSize: 12,
  color: ColorPalette.Green200,
  bold: false,
  alignment: 'left',
}

export const tableHeaderCellStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green600,
  bold: true,
}

export const totalSubTitleHeaderStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green600,
  bold: false,
}
