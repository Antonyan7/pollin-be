import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order.entity'
import {
  rowMarginBottom,
  rowMarginBottomV2,
} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {CustomTableLayout, Style, TableCell} from 'pdfmake/interfaces'
import {
  clinicAddressForPaymentReceiptLineStyle,
  getPaymentReceiptLogoImage,
  tableBodyAmountCellStyle,
  tableBodyCellStyle,
  tableCellSecondaryStyle,
  tableHeaderAmountCellBoldStyle,
  tableHeaderCellBoldStyle,
  tableHeaderCellStyle,
  totalSubTitleHeaderStyle,
} from './receipt-pdf-styles.helper'
import {groupBy} from 'lodash'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {PaymentOrderItem} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order-item.entity'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {DefaultValue} from '@libs/common/enums'
import {ColorPalette} from '@libs/services-common/enums'
import {PaymentMethod} from '@libs/data-layer/apps/checkout/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {PartnerStatusEnum} from '@libs/data-layer/apps/users/enum'
import {PaymentOrderType} from '@libs/data-layer/apps/checkout/enum/payment-order.enum'
import {PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {getAdhocPaymentRow} from './receipt-pdf-adhoc.helper'
import {Medication} from '@libs/data-layer/apps/medication/entities/typeorm'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const emptyCell = (): TableCell[] => {
  return [
    {
      text: DefaultValue.Empty,
      ...tableHeaderCellBoldStyle,
      ...rowMarginBottomV2,
    },
    {
      text: DefaultValue.Empty,
      ...tableBodyCellStyle,
    },
  ]
}

export const getReceiptPDFLogoAndAddressHeader = (): TableCell[] => {
  const addressFirstLine = configService.get<string>('CLINIC_POLICY_ADDRESS')
  const addressSecondLine = configService.get<string>('CLINIC_FINANCE_STREET_ADDRESS')
  const addressThirdLine = [
    configService.get<string>('CLINIC_CITY'),
    configService.get<string>('CLINIC_FINANCE_PROVINCE_CODE'),
    configService.get<string>('CLINIC_FINANCE_POSTAL_CODE'),
  ].join(' ')
  const addressPhoneNumberLine = configService.get<string>('CLINIC_PHONE_NUMBER')

  return [
    {
      ...getPaymentReceiptLogoImage(),
    },
    {
      text: DefaultValue.Empty,
    },
    [
      {
        ...clinicAddressForPaymentReceiptLineStyle,
        text: addressFirstLine,
      },
      {
        ...clinicAddressForPaymentReceiptLineStyle,
        text: addressSecondLine,
      },
      {
        ...clinicAddressForPaymentReceiptLineStyle,
        text: addressThirdLine,
      },
      {
        ...clinicAddressForPaymentReceiptLineStyle,
        text: addressPhoneNumberLine,
      },
    ],
  ]
}

export const getV2ReceiptTableRowData = (paymentOrder: PaymentOrder): TableCell[] => [
  [
    {
      text: 'Patients',
      ...tableHeaderCellBoldStyle,
      ...rowMarginBottom,
    },
    {
      text: cutSuperLongName(
        `${paymentOrder.patient?.firstName} ${paymentOrder.patient?.lastName}`,
      ),
      ...tableBodyCellStyle,
    },
    ...(paymentOrder.patient?.partnersRelations || paymentOrder.patient?.inviterRelations
      ? getPatientPartners(paymentOrder?.patient)
      : []),
  ],
  [
    {
      text: 'Receipt#',
      ...tableHeaderCellBoldStyle,
      ...rowMarginBottom,
    },
    {
      text: paymentOrder.receiptNumber,
      ...tableBodyCellStyle,
      marginRight: MarginsPdfEnum.Margin10,
    },
    ...emptyCell(),
    {
      text: 'Payment Date',
      ...tableHeaderCellBoldStyle,
      ...rowMarginBottomV2,
    },
    {
      text: dateTimeUtil.formatBirthDate(paymentOrder.paymentMethods[0].createdAt),
      ...tableBodyCellStyle,
    },
  ],
  ...getPaymentMethodsTableRows(paymentOrder.paymentMethods),
]

export const getReceiptTableRowData = (paymentOrder: PaymentOrder): TableCell[] => [
  [
    {
      text: 'Patients',
      ...tableHeaderCellBoldStyle,
      ...rowMarginBottom,
    },
    {
      text: cutSuperLongName(`${paymentOrder.patient.firstName} ${paymentOrder.patient.lastName}`),
      ...tableBodyCellStyle,
    },
    ...(paymentOrder.patient?.partnersRelations || paymentOrder.patient?.inviterRelations
      ? getPatientPartners(paymentOrder?.patient)
      : []),
  ],
  [
    {
      text: 'Receipt#',
      ...tableHeaderCellBoldStyle,
      ...rowMarginBottom,
    },
    {
      text: paymentOrder.receiptNumber,
      ...tableBodyCellStyle,
      marginRight: MarginsPdfEnum.Margin10,
    },
  ],
  [
    {
      text: 'Payment Date',
      ...tableHeaderCellBoldStyle,
      ...rowMarginBottom,
    },
    {
      text: dateTimeUtil.formatBirthDate(paymentOrder.createdAt),
      ...tableBodyCellStyle,
    },
  ],
  paymentOrder.paymentMethod === PaymentOrderType.WireTransfer
    ? [
        {
          text: 'Payment Method',
          ...tableHeaderCellBoldStyle,
          ...rowMarginBottom,
        },
        {
          text: `Wire Transfer ${paymentOrder.paymentICN}`,
          ...tableBodyCellStyle,
        },
      ]
    : [
        {
          text: 'Payment Method',
          ...tableHeaderCellBoldStyle,
          ...rowMarginBottom,
        },
        {
          text: `${paymentOrder.paymentCardBrand} ****${paymentOrder.paymentCardLast4}`,
          ...tableBodyCellStyle,
        },
      ],
]

const cutSuperLongName = (fullName: string): string => {
  return fullName.match(/.{1,15}/g).join('-\n')
}

export const getPatientPartners = (patient: Patient): TableCell[] => {
  let partnersAndInviters: TableCell[] = []
  if (!patient.partnersRelations?.length) {
    partnersAndInviters = [
      ...patient.inviterRelations?.map((patientInviter) => {
        return {
          text: cutSuperLongName(
            `${patientInviter.patient?.firstName} ${patientInviter.patient?.lastName}`,
          ),
          ...({...tableBodyCellStyle, marginTop: MarginsPdfEnum.Margin8} as Style),
        }
      }),
    ]
  }
  partnersAndInviters = [
    ...partnersAndInviters,
    ...patient.partnersRelations?.map((item) => {
      return item.status === PartnerStatusEnum.Accepted
        ? {
            text: cutSuperLongName(`${item.partner.firstName} ${item.partner.lastName}`),
            ...({...tableBodyCellStyle, marginTop: MarginsPdfEnum.Margin8} as Style),
          }
        : null
    }),
  ]
  return partnersAndInviters
}

const defineOrderItemType = async (item: PaymentOrderItem): Promise<TableCell> => {
  if (item.appointmentId) {
    return getAppointmentPaymentRow(item.serviceTypeName, item.appointment)
  }

  if (item.planTypeId) {
    return getPlanTypePaymentRow(item.planType)
  }

  if (item.planAddonId) {
    return [{text: item.planAddonName, ...tableBodyCellStyle}]
  }

  if (item.adhocPaymentId) {
    return getAdhocPaymentRow(item.patientAdhocPayment)
  }

  if (item.testTypeId || item.testPanelId) {
    return [{text: item.testTypeName || item.testPanelName, ...tableBodyCellStyle}]
  }

  if (item.cryoSubscriptionId) {
    // Data access will read latest version, Receipt should show previous renewal date
    const prevRenewal = dateTimeUtil.subYears(
      dateTimeUtil.toDate(item.cryoSubscription.renewalDate),
      1,
    )

    return [
      {text: 'Annual Cryopreservation Renewal Fee', ...tableBodyCellStyle},
      {
        text: `Renewal date: ${dateTimeUtil.formatTzTimeWithMMMDDYYYY(prevRenewal)}`,
        ...tableCellSecondaryStyle,
      },
    ]
  }
}

export const getAppointmentPaymentRow = (
  serviceTypeName: string,
  appointment: Appointment,
): TableCell[] => {
  return [
    {text: serviceTypeName, ...tableBodyCellStyle, marginBottom: MarginsPdfEnum.Margin8},
    {
      text: `Booked for ${dateTimeUtil.formatToAppointmentBookedOn(
        dateTimeUtil.toDate(appointment.start),
      )}`,
      ...tableCellSecondaryStyle,
    },
  ]
}

export const getPlanTypePaymentRow = (planType: PlanType): TableCell[] => {
  const planItems = planType.paymentReceiptDescriptionItem

  return [
    {text: planType.title, ...tableBodyCellStyle},
    {
      markSize: 8,
      markerColor: ColorPalette.Green200,
      margin: [6, 0, 0, 0],
      ul: planType
        ? planItems.map((planItem) => {
            return {
              text: `${planItem.paymentReceiptDescriptionItem.description}`,
              ...{
                ...tableCellSecondaryStyle,
                marginTop: MarginsPdfEnum.Margin6,
              },
            } as Style
          })
        : [],
    },
  ]
}

export const getMedicationPaymentRow = (
  medicationName: string,
  medication: Medication,
): TableCell[] => {
  return [
    {
      text: `${medicationName}${medication?.strength ? ` [${medication.strength}] - ${medication.form}` : ''}`,
      ...tableBodyCellStyle,
      marginBottom: MarginsPdfEnum.Margin8,
    },
    {
      text: `DIN: ${medication?.drugIdentifierNumber}` || DefaultValue.LongDash,
      ...tableCellSecondaryStyle,
      noWrap: true,
    },
  ]
}

const getPriceQuantityTotalTableCellsForOrderItemRows = (
  orderItem: PaymentOrderItem,
  quantity = 1,
  total: number | string,
): TableCell[] => {
  return [
    {
      text: !orderItem.ohipCovered ? `$${orderItem.price}` : 'OHIP',
      ...tableBodyCellStyle,
      alignment: 'right',
    },
    {
      text: quantity, // hardcoded to 1 for every not medication order item
      ...tableBodyCellStyle,
      alignment: 'right',
    },
    {
      text: !orderItem.ohipCovered ? `$${total}` : '$0.00',
      ...tableBodyCellStyle,
      alignment: 'right',
    },
  ]
}

const getRowsForPaymentOrderItems = async (item: PaymentOrderItem): Promise<TableCell[]> => {
  const total = item.price

  return [
    await defineOrderItemType(item),
    ...getPriceQuantityTotalTableCellsForOrderItemRows(item, 1, total),
  ]
}

const combineRowsForMedicationItems = (orderItems: PaymentOrderItem[]): TableCell[][] => {
  // group by medicationId to have dictionary: medicationId => paymentOrderItems
  const medicationOrderItemsGroupedByIdMap = groupBy(orderItems, 'medicationId')

  const keysForRows = Object.keys(medicationOrderItemsGroupedByIdMap)

  return keysForRows.map((key) => {
    const items: PaymentOrderItem[] = medicationOrderItemsGroupedByIdMap[Number(key)]
    const [medicationItem] = items

    const quantity = items.length
    const total = items
      .map((item) => Number(item.price))
      .reduce((a, b) => a + b)
      .toFixed(2)

    return [
      getMedicationPaymentRow(medicationItem.medicationName, medicationItem.medication),
      ...getPriceQuantityTotalTableCellsForOrderItemRows(medicationItem, quantity, total),
    ]
  })
}

export const getReceiptOrderItemsTableRows = async (
  items: PaymentOrderItem[],
): Promise<TableCell[][]> => {
  const rows = await Promise.all(
    items
      .sort((a, b) => (b.appointmentId || 0) - (a.appointmentId || 0))
      .filter((item) => !item?.medicationId)
      .map((item) => getRowsForPaymentOrderItems(item)),
  )

  if (items.some((item) => item.medicationId)) {
    const medicationRows = combineRowsForMedicationItems(items)
    return [...rows, ...medicationRows]
  }

  return [...rows]
}

export const getReceiptOrderItemsTableHeader = (): TableCell[] => [
  {text: 'Items', ...tableHeaderCellStyle},
  {
    text: 'Price',
    ...tableHeaderCellStyle,
    alignment: 'right',
  },
  {
    text: 'Qty',
    ...tableHeaderCellStyle,
    alignment: 'right',
  },
  {
    text: 'Total',
    ...tableHeaderCellStyle,
    alignment: 'right',
  },
]

export const getReceiptServicesProvidedTable = (serviceProviderName: string): TableCell => {
  return [
    [
      {
        text: 'Services provided by:',
        ...tableHeaderCellBoldStyle,
        alignment: 'left',
        marginBottom: MarginsPdfEnum.Margin7,
      },
      {
        text: serviceProviderName,
        ...tableHeaderCellBoldStyle,
        bold: false,
        marginBottom: MarginsPdfEnum.Margin7,
      },
    ],
  ]
}

export const getSubTitleHeader = (value: string, alignment = 'left'): TableCell => ({
  ...totalSubTitleHeaderStyle,
  text: value,
  alignment,
})

export const getTaxHstWithNumberSubTitleHeader = (
  value: string,
  alignment = 'left',
): TableCell => ({
  ...totalSubTitleHeaderStyle,
  text: [
    value,
    {
      fontSize: 12,
      color: ColorPalette.Green200,
      bold: false,
      text: `  ${configService.get<string>('TAXABLE_PAYMENT_HST_NUMBER') ?? ''}`,
    },
  ],
  alignment,
})

export const getReceiptTotalSubTableBody = (paymentOrder: PaymentOrder): TableCell[][] => {
  const tableCells: TableCell[][] = []

  if (paymentOrder.tax !== 0) {
    tableCells.push([
      getSubTitleHeader('SUBTOTAL'),
      getSubTitleHeader(`$${paymentOrder.subTotal.toFixed(2)}`, 'right'),
    ])
    tableCells.push([
      getTaxHstWithNumberSubTitleHeader('HST'),
      getSubTitleHeader(`$${paymentOrder.tax.toFixed(2)}`, 'right'),
    ])
  }

  tableCells.push([
    getSubTitleHeader('TOTAL'),
    getSubTitleHeader(`$${paymentOrder.total.toFixed(2)}`, 'right'),
  ])

  return tableCells
}

export const getReceiptTotalSubTable = (paymentOrder: PaymentOrder): TableCell => {
  const receiptTotalSubTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i: number, _node) => {
      // to define border colors based on if SUBTOTAL and TAX should be shown
      if ((i == 1 || i == 2) && _node.table.body.length == 3) {
        return ColorPalette.Green400
      }
      return ColorPalette.Green
    },
    hLineWidth: (i: number, _node) => {
      // to define border width based on if SUBTOTAL and TAX should be shown
      if ((i == 1 || i == 2) && _node.table.body.length == 3) {
        return 1
      }
      return 2
    },
    paddingLeft: () => 0,
    paddingTop: (_i, _node) => {
      // set padding top to 17 if there is only one row in table ("TOTAL")
      if (_node.table.body.length == 1) {
        return 17
      }
      return 10
    },
    paddingRight: () => 0,
    paddingBottom: (_i, _node) => {
      // set padding bottom to 17 if there is only one row in table ("TOTAL")
      if (_node.table.body.length == 1) {
        return 17
      }
      return 10
    },
  }

  return {
    layout: receiptTotalSubTableLayout,
    table: {
      widths: ['*', '*'],
      body: getReceiptTotalSubTableBody(paymentOrder),
    },
  }
}

export const getPaymentMethodsTableRows = (paymentMethods: PaymentMethod[]): TableCell[] => {
  const methods = paymentMethods.map((item, index) => {
    const paymentMethods = []
    paymentMethods.push([
      ...(index === 0
        ? [
            {
              text: 'Payment Method',
              ...tableHeaderCellBoldStyle,
              ...rowMarginBottomV2,
            },
          ]
        : []),
      {
        text: `${item.paymentCardBrand} **** ${item.paymentCardLast4}`,
        ...({...tableBodyCellStyle, marginBottom: MarginsPdfEnum.Margin8} as Style),
      },
    ])
    return paymentMethods
  })
  const amounts = paymentMethods.map((item, index) => {
    const amountPrice = new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(
      item.amount,
    )
    const amount = []
    amount.push([
      ...(index === 0
        ? [
            {
              text: 'Amount',
              ...tableHeaderAmountCellBoldStyle,
              ...rowMarginBottomV2,
            },
          ]
        : []),
      {
        text: amountPrice,
        ...tableBodyAmountCellStyle,
      },
    ])
    return amount
  })
  return [[...methods], [...amounts]]
}

export const getPaymentDetailRow = (): TableCell[][] => {
  const data = [
    [
      [
        {
          text: 'Payment Details',
          ...tableHeaderCellBoldStyle,
          ...rowMarginBottom,
        },
        {
          text: DefaultValue.Empty,
          ...tableBodyCellStyle,
        },
      ],
      emptyCell(),
      emptyCell(),
    ],
  ]
  return [...data]
}
