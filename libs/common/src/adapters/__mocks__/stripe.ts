/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines */
import {StripeCustomerCreateParams} from '@libs/common/adapters/stripe.adapter'
import {StripePaymentIntent} from '@libs/common/adapters/stripe.adapter'
import {SetupIntentStatuses} from '@apps/core/cart/dto/payment-info.dto'

const wrongPaymentMethodId = 'TEST_WRONG_PAYMENT_METHOD_ID'
let getSetupIntentCount = 1
let createSetupIntentCount = 1
let createSetupIntentPaymentSheetCount = 1

export const mockedDefaultIdempotencyId = '00000000-0000-0000-0000-000000000002'
export const mockedDefaultSetupIntentId = 'setup_intent_id'

export class Stripe {
  customers = {
    create: async (data: StripeCustomerCreateParams): Promise<unknown> => {
      if (data.email == 'emailNotFoundUser') {
        throw {statusCode: 500, status: 'STRIPE_CREATE_USER_ERROR'}
      }

      return {
        id: 'cus_CartTestStriperCustomerID',
        object: 'customer',
        address: null,
        balance: 0,
        created: 1489792893,
        currency: 'cad',
        default_source: 'card_19yUO12eZvKYlo2CQF18JytV',
        delinquent: true,
        description: 'My First Test Customer (created for API docs)',
        discount: null,
        email: 'fhealthdev+email+verified@gmail.com',
        invoice_prefix: 'B568657',
        invoice_settings: {
          custom_fields: null,
          default_payment_method: null,
          footer: null,
        },
        livemode: false,
        metadata: {},
        name: null,
        next_invoice_sequence: 42780,
        phone: null,
        preferred_locales: [],
        shipping: null,
        tax_exempt: 'none',
      }
    },
    listPaymentMethods: async (): Promise<unknown> => {
      return {
        data: [
          {
            id: 'pm_1LPe2O2eZvKYlo2CT2WslWC2',
            object: 'payment_method',
            card: {
              brand: 'visa',
              country: 'CA',
              exp_month: 8,
              exp_year: 2023,
              fingerprint: 'Xt5EWLLDS7FJjR1c',
              funding: 'credit',
              generated_from: null,
              last4: '4242',
              three_d_secure_usage: {
                supported: true,
              },
              wallet: null,
            },
            created: 1658804544,
            customer: 'cus_CartTestStriperCustomerID',
            type: 'card',
          },
          {
            id: 'pm_1LPe2O2eZvKYlo2CT2WslWC3',
            object: 'payment_method',
            card: {
              brand: 'visa',
              country: 'CA',
              exp_month: 8,
              exp_year: 2023,
              fingerprint: 'Xt5EWLLDS7FJjR1c',
              funding: 'credit',
              generated_from: null,
              last4: '5555',
              three_d_secure_usage: {
                supported: true,
              },
              wallet: {
                type: 'google_pay',
              },
            },
            created: 1658804544,
            customer: 'cus_CartTestStriperCustomerID',
            type: 'card',
          },
        ],
      }
    },
    update: async (): Promise<unknown> => {
      return {
        id: 'cus_CartTestStriperCustomerID',
      }
    },
  }

  ephemeralKeys = {
    create: async (): Promise<unknown> => {
      return {
        id: 'ephkey_2IlIq9DSeop22AOrZzSgsY2Z',
        object: 'ephemeral_key',
        associated_objects: [
          {
            type: 'customer',
            id: 'cus_JO50mgLC6GLyk1',
          },
        ],
        created: 1619637269,
        expires: 1619640869,
        livemode: false,
        secret:
          'ek_test_YWNjdF8xSWN6TERT2VvcDIyQU9yLG1jNWdaa1NpTFZBcFhBY1k1RTZLR1Z2ZVRxNGltbk0_00aISCap12',
      }
    },
  }

  setupIntents = {
    retrieve: async (id: string): Promise<unknown> => {
      if (id === 'patientCartConfirmWithUpdatedPricesNoOhipFixture') {
        return {
          id: 'patientCartConfirmWithUpdatedPricesNoOhipFixture',
          payment_method_types: ['card'],
          customer: 'patientCartConfirmWithUpdatedPricesNoOhipFixture',
          status: 'succeeded',
          payment_method: 'patientCartConfirmWithUpdatedPricesNoOhipFixture',
          metadata: {
            idempotencyId: '00000000-0000-0000-0000-000000000005',
          },
        }
      }

      if (id === mockedDefaultSetupIntentId) {
        return {
          payment_method: 'pm_test_payment_method_1',
          id: mockedDefaultSetupIntentId,
          customer: 'cus_CartTestStriperCustomerID',
          status: 'succeeded',
          metadata: {
            idempotencyId: mockedDefaultIdempotencyId,
          },
        }
      }

      if (id === 'split_setup_intent_id_1' && getSetupIntentCount === 1) {
        getSetupIntentCount += 1
        return {
          payment_method: 'pm_test_payment_method_1',
          id: 'split_setup_intent_id_1',
          customer: 'stripe_customer_id_for_split_payment',
          status: 'succeeded',
          metadata: {
            idempotencyId: '00000000-0000-0000-0000-000000000001',
          },
        }
      }
      if (id === 'split_setup_intent_id_2' && getSetupIntentCount === 2) {
        getSetupIntentCount += 1
        return {
          payment_method: 'pm_test_payment_method_2',
          id: 'split_setup_intent_id_2',
          customer: 'stripe_customer_id_for_split_payment',
          status: 'succeeded',
          metadata: {
            idempotencyId: '00000000-0000-0000-0000-000000000002',
          },
        }
      }
      if (id == 'NOT_BELONGS_USER_SETUP_INTENT_ID') {
        return {setupIntentId: id}
      }
      if (id == 'PAYMENT_INFORMATION_NOT_AVAILABLE') {
        return {
          payment_method: 'pm_test_payment_method',
          id: 'setup_intent_id',
          customer: 'cus_CartTestStriperCustomerID',
          status: SetupIntentStatuses.Canceled,
          metadata: {
            idempotencyId: '00000000-0000-0000-0000-000000000003',
          },
        }
      }

      if (id == 'cartFixtureSplitPaymentSuccess') {
        return {
          payment_method: 'cartFixtureSplitPaymentSuccess',
          id: 'cartFixtureSplitPaymentSuccess',
          customer: 'cartFixtureSplitPaymentSuccess',
          status: SetupIntentStatuses.Pending,
          metadata: {
            idempotencyId: '00000000-0000-0000-0000-000000000011',
          },
        }
      }

      return {
        payment_method: 'pm_test_payment_method',
        id: 'setup_intent_id',
        customer: 'cus_CartTestStriperCustomerID',
        status: 'succeeded',
        metadata: {
          idempotencyId: '00000000-0000-0000-0000-000000000001',
        },
      }
    },
    create: async (data: {payment_method_types: string[]; customer: string}): Promise<unknown> => {
      const {customer} = data
      if (customer === 'stripe_patientForV2ConfirmSuccessFixture') {
        return {
          id: 'stripe_patientForV2ConfirmSuccessFixture',
          payment_method_types: ['card'],
          customer: 'stripe_patientForV2ConfirmSuccessFixture',
          status: 'succeeded',
        }
      }
      if (customer === 'patientCartConfirmWithUpdatedPricesNoOhipFixture') {
        return {
          id: 'patientCartConfirmWithUpdatedPricesNoOhipFixture',
          payment_method_types: ['card'],
          customer: 'patientCartConfirmWithUpdatedPricesNoOhipFixture',
          status: 'succeeded',
        }
      }

      if (customer === 'stripe_customer_id_for_split_payment' && createSetupIntentCount === 1) {
        createSetupIntentCount += 1
        return {
          id: 'split_setup_intent_id_1',
          payment_method_types: ['card'],
          customer: 'stripe_customer_id_for_split_payment',
          status: 'succeeded',
        }
      }
      if (customer === 'stripe_customer_id_for_split_payment' && createSetupIntentCount === 2) {
        createSetupIntentCount += 1
        return {
          id: 'split_setup_intent_id_2',
          payment_method_types: ['card'],
          customer: 'stripe_customer_id_for_split_payment',
          status: 'succeeded',
        }
      }

      if (customer === 'stripe_customer_id_for_split_payment') {
        return {
          id: 'split_setup_intent_id_10',
          payment_method_types: ['card'],
          customer: 'stripe_customer_id_for_split_payment_10',
          status: 'succeeded',
        }
      }

      if (customer === 'stripe_customer_payment_sheet_v2') {
        createSetupIntentPaymentSheetCount += 1
        return {
          id: `payment_sheet_${createSetupIntentPaymentSheetCount}`,
          payment_method_types: ['card'],
          customer: 'cus_CartTestStriperCustomerID',
          status: 'succeeded',
        }
      }

      return {
        id: 'setup_intent_id',
        payment_method_types: ['card'],
        customer: 'cus_CartTestStriperCustomerID',
        status: 'succeeded',
        client_secret: 'seti_test_secret_key',
      }
    },
    cancel: async (): Promise<void> => {
      return
    },
    update: async (id: string, data: string): Promise<unknown> => {
      if (id === 'setup_intent_invalid') {
        throw {statusCode: 400, status: 'STRIPE_UPDATE_SETUP_INTENT_FAILED'}
      }

      return {
        id: 'setup_intent_id',
        payment_method_types: ['card'],
        customer: 'cus_CartTestStriperCustomerID',
        status: 'succeeded',
        metadata: {data},
      }
    },
  }
  paymentMethods = {
    retrieve: async (paymentMethodId: string): Promise<unknown> => {
      if (paymentMethodId === 'pm_differentCustomer') {
        return {
          id: paymentMethodId,
          object: 'payment_method',
          customer: 'cus_differentCustomerId',
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 8,
            exp_year: 2023,
          },
          created: 1658804544,
        }
      }

      // Default payment method response (belongs to test customer)
      return {
        id: paymentMethodId,
        object: 'payment_method',
        customer: 'cus_CartTestStriperCustomerID',
        type: 'card',
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 8,
          exp_year: 2023,
        },
        created: 1658804544,
      }
    },
    detach: async (paymentMethodId: string): Promise<unknown> => {
      if (paymentMethodId === 'pm_invalid') {
        throw {
          type: 'StripeInvalidRequestError',
          raw: {
            statusCode: 404,
            code: 'resource_missing',
            message: 'No such payment method',
            type: 'invalid_request_error',
          },
        }
      }
      return {
        id: paymentMethodId,
        object: 'payment_method',
        detached: true,
      }
    },
  }

  paymentIntents = {
    // eslint-disable-next-line max-lines-per-function
    create: async (data: StripePaymentIntent): Promise<unknown> => {
      if (data.payment_method === wrongPaymentMethodId) {
        throw {statusCode: 500, status: 'CONFIRM_PAYMENT_FAILED'}
      }

      if (data.payment_method === 'payment_intent_fail_id') {
        return null
      }

      if (data.payment_method === 'cartFixtureSplitPaymentSuccess') {
        return {
          id: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH',
          object: 'payment_intent',
          amount: 2000,
          status: 'requires_capture',
          metadata: {
            idempotencyKey: '00000000-0000-0000-0000-000000000011',
          },
          payment_method: 'cartFixtureSplitPaymentSuccess',
          payment_method_types: ['card'],
        }
      }

      if (data.payment_method === 'patientCartConfirmWithUpdatedPricesNoOhipFixture') {
        return {
          id: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH',
          object: 'payment_intent',
          amount: 2000,
          amount_capturable: 0,
          amount_details: {
            tip: {},
          },
          amount_received: 0,
          application: null,
          application_fee_amount: null,
          automatic_payment_methods: null,
          canceled_at: null,
          cancellation_reason: null,
          capture_method: 'manual',
          charges: {
            object: 'list',
            data: [],
            has_more: false,
            url: '/v1/charges?payment_intent=pi_1DrPsv2eZvKYlo2CEDzqXfPH',
          },
          client_secret: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH_secret_DDAO0OLHB8Q8oN5btYX9rg9j2',
          confirmation_method: 'automatic',
          created: 1547212637,
          currency: 'usd',
          customer: 'cus_CartTestStriperCustomerID',
          description: null,
          invoice: null,
          last_payment_error: null,
          livemode: false,
          metadata: {
            idempotencyKey: '00000000-0000-0000-0000-000000000005',
          },
          next_action: null,
          on_behalf_of: null,
          payment_method: 'pm_test_payment_method_2',
          payment_method_options: {},
          payment_method_types: ['card'],
          processing: null,
          receipt_email: null,
          redaction: null,
          review: null,
          setup_future_usage: null,
          shipping: null,
          statement_descriptor: null,
          statement_descriptor_suffix: null,
          status: 'requires_capture',
          transfer_data: null,
          transfer_group: null,
        }
      }

      if (data.payment_method === 'pm_test_payment_method_2') {
        return {
          id: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH',
          object: 'payment_intent',
          amount: 2000,
          amount_capturable: 0,
          amount_details: {
            tip: {},
          },
          amount_received: 0,
          application: null,
          application_fee_amount: null,
          automatic_payment_methods: null,
          canceled_at: null,
          cancellation_reason: null,
          capture_method: 'manual',
          charges: {
            object: 'list',
            data: [],
            has_more: false,
            url: '/v1/charges?payment_intent=pi_1DrPsv2eZvKYlo2CEDzqXfPH',
          },
          client_secret: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH_secret_DDAO0OLHB8Q8oN5btYX9rg9j2',
          confirmation_method: 'automatic',
          created: 1547212637,
          currency: 'usd',
          customer: 'cus_CartTestStriperCustomerID',
          description: null,
          invoice: null,
          last_payment_error: null,
          livemode: false,
          metadata: {
            idempotencyKey: '00000000-0000-0000-0000-000000000001',
          },
          next_action: null,
          on_behalf_of: null,
          payment_method: 'pm_test_payment_method_2',
          payment_method_options: {},
          payment_method_types: ['card'],
          processing: null,
          receipt_email: null,
          redaction: null,
          review: null,
          setup_future_usage: null,
          shipping: null,
          statement_descriptor: null,
          statement_descriptor_suffix: null,
          status: 'requires_capture',
          transfer_data: null,
          transfer_group: null,
        }
      }

      return {
        id: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH',
        object: 'payment_intent',
        amount: 2000,
        amount_capturable: 0,
        amount_details: {
          tip: {},
        },
        amount_received: 0,
        application: null,
        application_fee_amount: null,
        automatic_payment_methods: null,
        canceled_at: null,
        cancellation_reason: null,
        capture_method: 'manual',
        charges: {
          object: 'list',
          data: [],
          has_more: false,
          url: '/v1/charges?payment_intent=pi_1DrPsv2eZvKYlo2CEDzqXfPH',
        },
        client_secret: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH_secret_DDAO0OLHB8Q8oN5btYX9rg9j2',
        confirmation_method: 'automatic',
        created: 1547212637,
        currency: 'usd',
        customer: 'cus_CartTestStriperCustomerID',
        description: null,
        invoice: null,
        last_payment_error: null,
        livemode: false,
        metadata: {
          idempotencyKey: '00000000-0000-0000-0000-000000000002',
        },
        next_action: null,
        on_behalf_of: null,
        payment_method: 'pm_test_payment_method_1',
        payment_method_options: {},
        payment_method_types: ['card'],
        processing: null,
        receipt_email: null,
        redaction: null,
        review: null,
        setup_future_usage: null,
        shipping: null,
        statement_descriptor: null,
        statement_descriptor_suffix: null,
        status: 'requires_capture',
        transfer_data: null,
        transfer_group: null,
      }
    },
    capture: async (data: string): Promise<unknown> => {
      if (data === 'failed_capture') {
        throw {statusCode: 400, status: 'STRIPE_PAYMENT_CAPTURE_FAILED'}
      }

      return {
        status: 'succeeded',
      }
    },
    cancel: async (): Promise<void> => {
      return
    },
    verifyWebhookSignature: (_: Buffer, signature: string): Record<string, unknown> => {
      switch (signature) {
        case 'invoice.payment_succeeded':
          return {
            id: 'evt_1QSgRbLu576imiDMvJIBs0QN',
            type: 'invoice.payment_succeeded',
            data: {
              object: {
                lines: {
                  data: [
                    {
                      price: {
                        id: 'TEST_PRICE',
                      },
                    },
                  ],
                },
              },
            },
          }

        default:
          break
      }
    },
  }

  webhooks = {
    constructEvent: (_: unknown, signature: string, __: string): unknown => {
      const cryoSubLineItem = {
        id: 'il_1QU4u7Lu576imiDMissi4TkL',
        object: 'line_item',
        price: {
          id: 'price_test',
        },
      }

      const subscription = {
        toString: () => 'sub_cryo-basic',
      }

      switch (signature) {
        case 'upcoming-basic':
          return {
            id: 'upcoming',
            type: 'invoice.upcoming',
            data: {
              object: {
                id: 'in_1QU4u8Lu576imiDMQqJ9mhHp',
                lines: {
                  object: 'list',
                  data: [cryoSubLineItem],
                },
                subscription,
              },
            },
          }
        case 'failed-first-attempt-basic':
          return {
            id: 'invoice.payment_failed',
            type: 'invoice.payment_failed',
            data: {
              object: {
                id: 'in_1QU4u8Lu576imiDMQqJ9mhHp',
                attempt_count: 1,
                lines: {
                  object: 'list',
                  data: [cryoSubLineItem],
                },
                subscription,
              },
            },
          }
        case 'invoice-uncollectible-basic':
          return {
            id: 'invoice.marked_uncollectible',
            type: 'invoice.marked_uncollectible',
            data: {
              object: {
                id: 'in_1QU4u8Lu576imiDMQqJ9mhHp',
                attempt_count: 1,
                lines: {
                  object: 'list',
                  data: [cryoSubLineItem],
                },
                subscription,
              },
            },
          }
        case 'payment_method.attached':
          return {
            id: 'payment_method.attached',
            type: 'payment_method.attached',
            data: {
              object: {
                id: 'pm_1Q0PsIJvEtkwdCNYMSaVuRz6',
                object: 'payment_method',
                customer: 'cus_CartTestStriperCustomerID',
              },
            },
          }
        default:
          break
      }
    },
  }

  charges = {
    retrieve: async (): Promise<Record<string, unknown>> => {
      return {
        id: 'ch_identifier',
        payment_intent: {
          toString: () => 'pi_intent',
        },
        status: 'success',
        amount: 900,
        payment_method: {
          toString: () => 'pm_payment_method',
        },
      }
    },
  }

  subscriptions = {
    create: async (_: object): Promise<unknown> => {
      return {
        id: `sub_${_['customer']}`,
      }
    },
    retrieve: async (_: string): Promise<unknown> => {
      return {
        id: 'invoice_id',
        latest_invoice: 'latest_invoice_id',
      }
    },
    cancel: async (): Promise<unknown> => {
      return
    },
  }

  billingPortal = {
    sessions: {
      create: (): Promise<string> => {
        return Promise.resolve(`https://link.to.billing.portal`)
      },
    },
  }

  invoices = {
    list: async (): Promise<unknown> => {
      return {
        data: [
          {
            id: 'in_1QU4u8Lu576imiDMQqJ9mhHp',
            object: 'invoice',
            payment_intent: 'pi_1DrPsv2eZvKYlo2CEDzqXfPH',
          },
        ],
      }
    },
  }
}

export default Stripe
