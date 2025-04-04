import {PaymentMethod} from '@libs/data-layer/apps/checkout/entities/typeorm'
import {paymentOrderForPaymentsHistoryV2Fixture} from '@libs/common/test/fixtures/payment-order.fixture'

export const paymentMethodFixture: Partial<PaymentMethod> = {
  id: 1,
  paymentOrderId: paymentOrderForPaymentsHistoryV2Fixture.id,
  amount: 300,
  paymentMethod: 'card',
  stripePaymentIntentId: 'stripePaymentIntentId',
  paymentCardBrand: 'visa',
  paymentCardLast4: '1111',
}

export const paymentMethodForHistoryFixture: Partial<PaymentMethod> = {
  id: 2,
  paymentOrderId: paymentOrderForPaymentsHistoryV2Fixture.id,
  amount: 400,
  paymentMethod: 'card',
  stripePaymentIntentId: 'stripePaymentIntentId',
  paymentCardBrand: 'master',
  paymentCardLast4: '2222',
}

export const paymentMethodWithDuplicateSetupIntentId: Partial<PaymentMethod> = {
  id: 3,
  paymentOrderId: paymentOrderForPaymentsHistoryV2Fixture.id,
  paymentMethod: 'card',
  amount: 400,
  stripePaymentIntentId: 'stripePaymentIntentId',
  paymentCardBrand: 'master',
  paymentCardLast4: '2222',
  setupIntentId: 'split_setup_intent_id_4',
}
