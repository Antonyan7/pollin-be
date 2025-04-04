import {
  Cart,
  CartItem,
  CartItemType,
  TestsCartItemTestsType,
} from '@libs/data-layer/apps/checkout/entities/fireorm/cart'
import {AuthUserFixture} from '@libs/common/test/fixtures/auth.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {planTypeFixture} from '@libs/common/test/fixtures/plan-type.fixture'
import {
  patientPlanCartConfirmWithUpdatedPricesNoOhipFixture,
  patientPlanSplitPaymentFixture,
  patientPlanSplitPaymentSuccessFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))

export const cartFixtureSuccess: Cart = {
  id: 'id_cart_success',
  authUserId: AuthUserFixture.cartConfirmSplitPaymentV2.uid,
  idempotencyId: '00000000-0000-0000-0000-000000000000',
  patientHasOhip: false,
  setupIntentId: null,
  setupIntents: [
    {
      idempotencyId: '00000000-0000-0000-0000-000000000001',
      setupIntentId: 'split_setup_intent_id_1',
      splitAmount: 4795.0,
    },
    {
      idempotencyId: '00000000-0000-0000-0000-000000000002',
      setupIntentId: 'split_setup_intent_id_2',
      splitAmount: 1000.77,
    },
  ],
}

export const cartItemsFixture: CartItem = {
  id: 'BqhNwJcO3Lzmcs2pmT55',
  adhocPayments: null,
  appointment: null,
  bookedAppointmentId: null,
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  medications: null,
  price: 5112.0,
  tests: null,
  title: 'test',
  type: CartItemType.Plan,
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: null,
  plan: {
    isPaymentRequired: true,
    expectedNextPeriodDate: null,
    id: 1,
    planId: patientPlanSplitPaymentFixture.uuid,
    planTypeName: 'Demo Plan v3',
    planTypeId: planTypeFixture.id,
    planAddons: [
      {
        id: 10,
        price: 17,
        taxable: true,
        title: 'ICSI',
      },
    ],
    testTypes: [],
  },
}

export const cartForUpdatedPriceFixtureSuccess: Cart = {
  id: 'id_cartForUpdatedPriceFixtureSuccess',
  authUserId: AuthUserFixture.cartConfirmWithUpdatedPricesNoOhip.uid,
  idempotencyId: '00000000-0000-0000-0000-000000000000',
  patientHasOhip: false,
  setupIntentId: null,
  setupIntents: [
    {
      idempotencyId: '00000000-0000-0000-0000-000000000005',
      setupIntentId: 'patientCartConfirmWithUpdatedPricesNoOhipFixture',
      splitAmount: 5795.77,
    },
  ],
}

export const cartForUpdatedPriceItemsFixture: CartItem = {
  id: 'id_cartForUpdatedPriceItemsFixture',
  adhocPayments: null,
  appointment: null,
  bookedAppointmentId: null,
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  medications: null,
  price: 5112.0,
  tests: null,
  title: 'test',
  type: CartItemType.Plan,
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: null,
  plan: {
    isPaymentRequired: true,
    expectedNextPeriodDate: null,
    id: 1,
    planId: patientPlanCartConfirmWithUpdatedPricesNoOhipFixture.uuid,
    planTypeName: 'Demo Plan v3',
    planTypeId: planTypeFixture.id,
    planAddons: [
      {
        id: 10,
        price: 17,
        taxable: true,
        title: 'ICSI',
      },
    ],
    testTypes: [],
  },
}

export const cartForUpdatedOrderFixture: Cart = {
  id: 'cartForUpdatedOrderFixture',
  authUserId: AuthUserFixture.cartConfirmUpdatedOrders.uid,
  idempotencyId: '00000000-0000-0000-0000-000000000000',
  patientHasOhip: false,
  setupIntentId: null,
  setupIntents: [
    {
      idempotencyId: '00000000-0000-0000-0000-000000000001',
      setupIntentId: 'split_setup_intent_id_1',
      splitAmount: 4795.0,
    },
  ],
}

export const cartItemsForUpdatedOrderFixture: CartItem = {
  id: 'BqhNwJcO3Lzmcs2pmT55',
  adhocPayments: null,
  milestoneId: 9999999, // not found milestone id
  appointment: null,
  bookedAppointmentId: null,
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  medications: null,
  price: 5112.0,
  title: 'test',
  type: CartItemType.Tests,
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: null,
  tests: [
    {
      id: 1,
      name: 'string',
      quantity: 1,
      price: 100.2,
      type: TestsCartItemTestsType.TestType,
      isPaymentRequired: true,
    },
  ],
}

export const cartFixtureSplitPaymentSuccess: Cart = {
  id: 'cartFixtureSplitPaymentSuccess',
  authUserId: AuthUserFixture.cartConfirmSplitPaymentV2Success.uid,
  idempotencyId: '00000000-0000-0000-0000-000000000011',
  patientHasOhip: false,
  setupIntentId: null,
  setupIntents: [
    {
      idempotencyId: '00000000-0000-0000-0000-000000000011',
      setupIntentId: 'cartFixtureSplitPaymentSuccess',
      splitAmount: 5795.77,
    },
  ],
}

export const cartItemsSplitPaymentFixture: CartItem = {
  id: 'cartItemsSplitPaymentFixture',
  adhocPayments: null,
  appointment: null,
  bookedAppointmentId: null,
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  medications: null,
  price: 5112.0,
  tests: null,
  title: 'test',
  type: CartItemType.Plan,
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: null,
  plan: {
    isPaymentRequired: true,
    expectedNextPeriodDate: null,
    id: 1,
    planId: patientPlanSplitPaymentSuccessFixture.uuid,
    planTypeName: 'Demo Plan v3',
    planTypeId: planTypeFixture.id,
    planAddons: [
      {
        id: 9,
        price: 17,
        taxable: true,
        title: 'ICSI',
      },
    ],
    testTypes: [],
  },
}
