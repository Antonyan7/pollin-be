import {PaymentOrderItem} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order-item.entity'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order.entity'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette} from '@libs/services-common/enums'
import {Content, ContentTable, CustomTableLayout, Table} from 'pdfmake/interfaces'
import {
  getReceiptOrderItemsTableHeader,
  getReceiptOrderItemsTableRows,
  getReceiptPDFLogoAndAddressHeader,
  getReceiptServicesProvidedTable,
  getReceiptTableRowData,
  getReceiptTotalSubTable,
  getV2ReceiptTableRowData,
} from './receipt-pdf-infrastructure.helper'

export const createLogoAndAddressTable = (): ContentTable => {
  return {
    layout: 'noBorders',
    margin: [
      MarginsPdfEnum.Margin65,
      MarginsPdfEnum.Margin65,
      MarginsPdfEnum.Margin65,
      MarginsPdfEnum.Margin0,
    ],
    table: {
      widths: ['auto', '*', 'auto'],
      body: [getReceiptPDFLogoAndAddressHeader()],
    } as Table,
  }
}

export const createV2ReceiptInfoTable = (paymentOrder: PaymentOrder): ContentTable => {
  const receiptInfoTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: ColorPalette.Green400,
    hLineWidth: () => 1,
    paddingLeft: () => MarginsPdfEnum.Margin0,
    paddingTop: () => MarginsPdfEnum.Margin10,
    paddingRight: () => MarginsPdfEnum.Margin0,
    paddingBottom: () => MarginsPdfEnum.Margin10,
  }

  return {
    layout: receiptInfoTableLayout,
    margin: [MarginsPdfEnum.Margin65, MarginsPdfEnum.Margin8],
    table: {
      headerRows: 1,
      widths: [130, 130, 160, 110],
      body: [getV2ReceiptTableRowData(paymentOrder)],
    } as Table,
  }
}

export const createReceiptInfoTable = (paymentOrder: PaymentOrder): ContentTable => {
  const receiptInfoTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: () => {
      return ColorPalette.Green400
    },
    hLineWidth: () => 1,
    paddingLeft: () => MarginsPdfEnum.Margin0,
    paddingTop: () => MarginsPdfEnum.Margin10,
    paddingRight: () => MarginsPdfEnum.Margin0,
    paddingBottom: () => MarginsPdfEnum.Margin10,
  }

  return {
    layout: receiptInfoTableLayout,
    margin: [MarginsPdfEnum.Margin65, MarginsPdfEnum.Margin24],
    table: {
      headerRows: 1,
      widths: [130, 120, 120, 160],
      body: [getReceiptTableRowData(paymentOrder)],
    } as Table,
  }
}

export const createReceiptOrderItemsRowsTable = async (
  orderItems: PaymentOrderItem[],
): Promise<ContentTable> => {
  const receiptOrderItemsTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i: number) => (i == 1 ? ColorPalette.Green : ColorPalette.White),
    hLineWidth: (i: number) => (i == 1 ? 2 : 1),
    paddingLeft: () => 0,
    paddingTop: () => 8,
    paddingRight: () => 0,
    paddingBottom: () => 8,
  }

  return {
    layout: receiptOrderItemsTableLayout,
    table: {
      headerRows: 1,
      widths: ['*', 'auto', 45, 80],
      body: [
        getReceiptOrderItemsTableHeader(),
        ...(await getReceiptOrderItemsTableRows(orderItems)),
      ],
    } as Table,
  }
}

export const createV2HeaderContent = (paymentOrder: PaymentOrder): Content => {
  return [createLogoAndAddressTable(), createV2ReceiptInfoTable(paymentOrder)]
}
export const createHeaderContent = (paymentOrder: PaymentOrder): Content => {
  return [createLogoAndAddressTable(), createReceiptInfoTable(paymentOrder)]
}

export const createReceiptTotalTable = (paymentOrder: PaymentOrder): ContentTable => {
  return {
    layout: 'noBorders',
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        [
          getReceiptServicesProvidedTable(paymentOrder.patient?.serviceProvider?.title),
          getReceiptTotalSubTable(paymentOrder),
        ],
      ],
    } as Table,
    marginTop: MarginsPdfEnum.Margin24,
  }
}

export const createFooterContent = (currentPage: number, pageCount: number): Content => {
  return {
    text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
    alignment: 'right',
    style: 'normalText',
    marginRight: MarginsPdfEnum.Margin65,
    marginBottom: MarginsPdfEnum.Margin45,
  }
}
