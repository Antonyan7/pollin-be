import {DateTimeUtil} from '@libs/common'
import {
  patientEmailVerifiedFixture,
  patientForV2SplitPaymentHistoryFixture,
  patientWireTransferV2Fixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order.entity'
import {commonConfig} from '@config/common.configuration'
import {PaymentOrderType} from '@libs/data-layer/apps/checkout/enum/payment-order.enum'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)
export const paymentOrderFixtureCreated5DaysAgoDate: Date = dateTimeUtil.subDays(
  dateTimeUtil.now(),
  5,
)

export const paymentOrderFixture: Partial<PaymentOrder> = {
  id: 1,
  uuid: '84f2c626-4f0a-4ac2-af39-0ef1cc22f27c',
  patientId: patientEmailVerifiedFixture.id,
  stripePaymentIntentId: 'stripePaymentIntentId',
  status: 'requires_capture',
  paymentMethod: PaymentOrderType.Card,
  isPaid: true,
  paymentCardBrand: 'Visa',
  paymentCardLast4: '1111',
  tax: 10,
  subTotal: 10,
  total: 20,
  createdAt: paymentOrderFixtureCreated5DaysAgoDate,
}

export const paymentOrderForPaymentsHistoryFixture: Partial<PaymentOrder> = {
  id: 2,
  uuid: 'f72dbb4b-8d4e-4fbc-ba51-189cb4c25855',
  patientId: patientEmailVerifiedFixture.id,
  paymentMethod: PaymentOrderType.Card,
  isPaid: true,
  stripePaymentIntentId: 'stripePaymentIntentId',
  status: 'succeeded',
  paymentCardBrand: 'Visa',
  paymentCardLast4: '7777',
  tax: 70,
  subTotal: 10,
  total: 700.77,
  receiptUrl: 'receipt_url',
}

export const paymentOrderForPaymentsHistoryV2Fixture: Partial<PaymentOrder> = {
  id: 3,
  uuid: '7c4f27f7-94aa-4842-b4f7-39cd83f1bebc',
  patientId: patientForV2SplitPaymentHistoryFixture.id,
  paymentMethod: PaymentOrderType.Card,
  isPaid: true,
  stripePaymentIntentId: 'stripePaymentIntentId',
  status: 'succeeded',
  paymentCardBrand: 'Visa',
  paymentCardLast4: '7777',
  tax: 70,
  subTotal: 10,
  total: 700.77,
  receiptUrl: 'receipt_url',
}

export const paymentOrderForWireTransferFixture: Partial<PaymentOrder> = {
  id: 4,
  uuid: '7a7c5c0c-3d41-4ab1-a41b-fb6a7796cf9c',
  patientId: patientWireTransferV2Fixture.id,
  paymentMethod: PaymentOrderType.WireTransfer,
  isPaid: true,
  stripePaymentIntentId: 'stripePaymentIntentId',
  status: 'succeeded',
  paymentCardBrand: 'Visa',
  paymentCardLast4: '7777',
  tax: 70,
  paymentICN: '123456789',
  subTotal: 10,
  total: 700.77,
  receiptUrl: 'receipt_url',
}
