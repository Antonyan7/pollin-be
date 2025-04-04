import {PlanTypePaymentReceiptDescriptionItem} from '@libs/data-layer/apps/plan/entities/typeorm'
import {planTypeWithTestResultsFixture} from '@libs/common/test/fixtures/plan-type.fixture'
import {paymentReceiptDescriptionItemFixture} from '@libs/common/test/fixtures/payment-receipt-description-item.fixture'

export const PlanTypePaymentReceiptDescriptionItemFixture: Partial<PlanTypePaymentReceiptDescriptionItem> =
  {
    id: 1,
    uuid: '5486f68c-9828-44fc-aae6-122185c0254c',
    planTypeId: planTypeWithTestResultsFixture.id,
    paymentReceiptDescriptionItemId: paymentReceiptDescriptionItemFixture.id,
  }
