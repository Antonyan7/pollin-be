import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {
  createFooterContent,
  createHeaderContent,
  createReceiptOrderItemsRowsTable,
  createReceiptTotalTable,
  createV2HeaderContent,
} from '@libs/common/helpers/payment-receipt/receipt-pdf-tables.helper'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm'
import {Content, ContentTable, TDocumentDefinitions} from 'pdfmake/interfaces'
import {PartnerStatusEnum} from '@libs/data-layer/apps/users/enum'

export const getFileDefinition = (
  paymentOrder: PaymentOrder,
  content: Content,
): TDocumentDefinitions => {
  return {
    pageSize: {
      width: 663,
      height: 858,
    },
    pageMargins: [
      MarginsPdfEnum.Margin65,
      countFileHeaderTopMargin(paymentOrder),
      MarginsPdfEnum.Margin65,
      MarginsPdfEnum.Margin60,
    ],
    header: () => getHeader(paymentOrder),
    content,
    footer: (currentPage, pageCount) => createFooterContent(currentPage, pageCount),
    defaultStyle: {
      font: setDefaultFont(),
    },
  }
}

export const getHeader = (paymentOrder: PaymentOrder): Content => {
  if (paymentOrder.paymentMethods?.length > 1) {
    return createV2HeaderContent(paymentOrder)
  } else {
    return createHeaderContent(paymentOrder)
  }
}

export const getContent = async (paymentOrder: PaymentOrder): Promise<ContentTable[]> => {
  const receiptTotalTable = createReceiptTotalTable(paymentOrder)
  const receiptOrderItemsRowsTable = await createReceiptOrderItemsRowsTable(
    paymentOrder?.paymentOrderItems,
  )

  return [receiptOrderItemsRowsTable, receiptTotalTable]
}
const countFileHeaderTopMargin = (paymentOrder: PaymentOrder): MarginsPdfEnum | number => {
  const additionalMarginRequiredCharactersLength = 15

  let partnersAndInviters = paymentOrder.patient?.partnersRelations?.filter(
    (partner) => partner.status === PartnerStatusEnum.Accepted,
  )

  const longPatientNameAdditionalMargin =
    `${paymentOrder.patient.firstName} ${paymentOrder.patient.lastName}`.length >
    additionalMarginRequiredCharactersLength
      ? MarginsPdfEnum.Margin12
      : MarginsPdfEnum.Margin0

  partnersAndInviters = [...partnersAndInviters, ...paymentOrder.patient?.inviterRelations]

  const paymentMethodsAdditionalMargin =
    partnersAndInviters.length <= 1 && paymentOrder.paymentMethods.length > 3
      ? MarginsPdfEnum.Margin20
      : MarginsPdfEnum.Margin0

  const additionalMarginForPartnersAndInviters = partnersAndInviters.reduce(
    (margin) => (margin += MarginsPdfEnum.Margin25),
    MarginsPdfEnum.Margin0,
  )

  return (
    MarginsPdfEnum.Margin300 +
    paymentMethodsAdditionalMargin +
    additionalMarginForPartnersAndInviters +
    longPatientNameAdditionalMargin
  )
}
