import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm'
import {PaymentOrderType} from '@libs/data-layer/apps/checkout/enum/payment-order.enum'
import {patientFixtureWireTransfer, wireTransferPatientFixture} from './patient-profile.fixture'
import {v4} from 'uuid'
import {DateTimeUtil} from '@libs/common'
const dateTimeUtil = new DateTimeUtil()

const paymentOrderFixtureCreated5DaysAgoDate: Date = dateTimeUtil.subDays(dateTimeUtil.now(), 5)

export const wireTransferPaymentOrderFixture: Partial<PaymentOrder> = {
  id: 1,
  uuid: v4(),
  patientId: wireTransferPatientFixture.id,
  receiptNumber: 'receiptNumber',
  stripePaymentIntentId: 'stripePaymentIntentId',
  status: 'requires_capture',
  paymentMethod: PaymentOrderType.WireTransfer,
  isPaid: false,
  paymentCardBrand: 'Visa',
  paymentCardLast4: '1111',
  tax: 10,
  subTotal: 10,
  total: 20,
}

export const paymentOrderWireTransferFixture: Partial<PaymentOrder> = {
  id: 2,
  patientId: patientFixtureWireTransfer.id,
  uuid: v4(),
  paymentMethod: PaymentOrderType.WireTransfer,
  isPaid: true,
  status: 'succeeded',
  tax: 10,
  subTotal: 10,
  total: 20,
  createdAt: paymentOrderFixtureCreated5DaysAgoDate,
  receiptNumber: 'PIDTestWireTransferPaid3412',
}
