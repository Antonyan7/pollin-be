import {PaymentOrderItem} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order-item.entity'
import {paymentOrderFixture} from '@libs/common/test/fixtures/payment-order.fixture'
import {serviceTypeFixture} from '@libs/common/test/fixtures/service-type.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {patientAdhocPaymentForAlertFixtureId} from '@libs/common/test/fixtures/patient-adhoc-payment.fixture'
import {appointmentFixture} from '@libs/common/test/fixtures/appointment.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)
export const paymentOrderItemFixtureCreatedAt: Date = dateTimeUtil.now()

export const paymentOrderItemFixture: Partial<PaymentOrderItem> = {
  id: 1,
  paymentOrderId: paymentOrderFixture.id,
  serviceTypeName: 'Payment Order Service Type Name',
  price: 120,
  serviceTypeId: serviceTypeFixture.id,
  createdAt: paymentOrderItemFixtureCreatedAt,
  adhocPaymentId: patientAdhocPaymentForAlertFixtureId,
  appointmentId: appointmentFixture.id,
}
