import {Stripe} from 'stripe'
import {Injectable} from '@nestjs/common'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'
import {OpenTelemetryService} from '@libs/common/services/open-telemetry.service'
import {StructuredLogger} from '../utils'
import {
  BadRequestWarningException,
  InternalServerErrorException,
} from '@libs/services-common/exceptions'
import * as activityLogs from '@libs/common/enums/activity-logs'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {StripeCardDeclineCodes} from '@libs/common/enums/activity-logs'

export type StripeCustomerCreateParams = {
  email: string
  firstName: string
  lastName: string
}

export type StripePaymentIntent = {
  amount: number
  currency: string
  customer: string
  payment_method: string
  off_session: boolean
  confirm: boolean
  capture_method: string
}

export enum StripeCurrency {
  USD = 'usd',
  CAD = 'cad',
}

@Injectable()
export class StripeAdapter {
  constructor(
    private configService: NestprojectConfigService,
    private telemetry: OpenTelemetryService,
  ) {}

  private stripeInstance = this.createInstance('STRIPE_SECRET_KEY')

  private commonOptions = {
    apiVersion: '2020-08-27',
  }

  private createInstance(secretKey: string, config = null): Stripe {
    return new Stripe(this.configService.get<string>(secretKey), config)
  }

  async createUser(customerCreateParams: StripeCustomerCreateParams): Promise<Stripe.Customer> {
    const span = this.telemetry.startSpan('StripeAdapter:createUser')

    const {email, firstName, lastName} = customerCreateParams

    const name = `${firstName} ${lastName}`
    const userData: Stripe.CustomerCreateParams = {
      email,
      name,
      description: `Nestproject: ${name}`,
    }

    span.addEvent('Create Stripe customer')
    const customer = await this.stripeInstance.customers.create(userData, this.commonOptions)
    span.end()

    return customer
  }

  async customerEphemeralKeys(customer: string): Promise<Stripe.EphemeralKey> {
    const span = this.telemetry.startSpan('StripeAdapter:customerEphemeralKeys')

    const ephemeralKeys = await this.stripeInstance.ephemeralKeys.create(
      {customer},
      this.commonOptions,
    )
    span.end()

    return ephemeralKeys
  }

  async setupIntentCreate(customer: string): Promise<Stripe.SetupIntent> {
    const span = this.telemetry.startSpan('StripeAdapter:setupIntentCreate')

    const setupIntent = this.stripeInstance.setupIntents.create(
      {
        payment_method_types: ['card'],
        customer,
      },
      this.commonOptions,
    )
    span.end()

    return setupIntent
  }

  async setupIntentRetrieve(setupIntentId: string): Promise<Stripe.SetupIntent> {
    const span = this.telemetry.startSpan('StripeAdapter:setupIntentRetrieve')

    const setupIntent = await this.stripeInstance.setupIntents.retrieve(
      setupIntentId,
      this.commonOptions,
    )
    span.end()

    return setupIntent
  }

  async setupIntentUpdateMetadataIdempotencyId(
    setupIntentId: string,
    idempotencyId: string,
  ): Promise<Stripe.SetupIntent> {
    const span = this.telemetry.startSpan('StripeAdapter:setupIntentUpdateMetadataIdempotencyId')

    const setupIntent = await this.stripeInstance.setupIntents.update(
      setupIntentId,
      {
        metadata: {idempotencyId},
      },
      this.commonOptions,
    )
    span.end()

    return setupIntent
  }

  async setupIntentCancel(setupIntentId: string): Promise<Stripe.SetupIntent> {
    const span = this.telemetry.startSpan('StripeAdapter:setupIntentCancel')
    const cancelledIntent = await this.stripeInstance.setupIntents.cancel(
      setupIntentId,
      this.commonOptions,
    )
    span.end()

    return cancelledIntent
  }

  isSetupIntentComplete(setupIntent: Stripe.SetupIntent): boolean {
    return setupIntent.status === 'succeeded'
  }

  isSetupIntentCancelable(setupIntent: Stripe.SetupIntent): boolean {
    const cancelableStatuses = [
      'requires_payment_method',
      'requires_confirmation',
      'requires_action',
    ]
    return cancelableStatuses.includes(setupIntent.status)
  }

  async paymentMethodRetrieve(paymentMethodId: string): Promise<Stripe.PaymentMethod> {
    const span = this.telemetry.startSpan('StripeAdapter:paymentMethodRetrieve')
    const paymentMethod = await this.stripeInstance.paymentMethods.retrieve(
      paymentMethodId,
      this.commonOptions,
    )
    span.end()

    return paymentMethod
  }

  async listCustomerPaymentMethods(
    customerId: string,
    limit = 10,
  ): Promise<Stripe.ApiListPromise<Stripe.PaymentMethod>> {
    const span = this.telemetry.startSpan('StripeAdapter:listCustomerPaymentMethods')
    const list = await this.stripeInstance.customers.listPaymentMethods(customerId, {
      limit,
    })
    span.end()

    return list
  }

  async detachPaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      await this.stripeInstance.paymentMethods.detach(paymentMethodId)
    } catch (error) {
      StructuredLogger.error(
        activityLogs.PaymentMethodsServiceFunctions.DetachPaymentMethod,
        activityLogs.PaymentMethodsServiceActions.DetachPaymentMethodFailed,
        parseError(error),
      )
      throw new InternalServerErrorException(i18Messages.PAYMENT_METHOD_NOT_FOUND)
    }
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<void> {
    try {
      this.logInfo(
        `Start cancelPaymentIntent in stripeAdapter, paymentIntentId: ${paymentIntentId}`,
        activityLogs.StripeFunctions.CancelPaymentIntent,
      )
      const span = this.telemetry.startSpan('StripeAdapter:cancelPaymentIntent')
      await this.stripeInstance.paymentIntents.cancel(paymentIntentId)
      span.end()
    } catch (error) {
      StructuredLogger.error(
        activityLogs.CartPaymentServiceFunctions.CancelPaymentIntent,
        activityLogs.CartPaymentServiceActions.CancelPaymentIntentFail,
        parseError(error),
      )
      throw new InternalServerErrorException(i18Messages.PAYMENT_DECLINED)
    }
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return this.stripeInstance.paymentIntents.retrieve(paymentIntentId)
    } catch (error) {
      StructuredLogger.error(
        activityLogs.CartPaymentServiceFunctions.RetrievePaymentIntent,
        activityLogs.CartPaymentServiceActions.RetrievePaymentIntentFailed,
        parseError(error),
      )

      return null
    }
  }

  async retrieveCharge(chargeId: string): Promise<Stripe.Charge> {
    try {
      return this.stripeInstance.charges.retrieve(chargeId)
    } catch (error) {
      StructuredLogger.error(
        activityLogs.CartPaymentServiceFunctions.RetrieveCharge,
        activityLogs.CartPaymentServiceActions.RetrieveChargeFailed,
        parseError(error),
      )

      return null
    }
  }

  async createPaymentIntent({
    stripeCustomerId,
    paymentMethodId,
    amount,
    idempotencyKey,
  }: {
    stripeCustomerId: string
    paymentMethodId: string
    amount: number
    idempotencyKey?: string
  }): Promise<Stripe.PaymentIntent> {
    try {
      this.logInfo(
        `Start createPaymentIntent in stripeAdapter, stripeCustomerId: ${stripeCustomerId}, paymentMethodId: ${paymentMethodId},idempotencyKey: ${idempotencyKey}  `,
        activityLogs.StripeFunctions.CreatePaymentIntent,
      )

      const options: Stripe.RequestOptions = {...this.commonOptions}
      if (idempotencyKey) {
        options.idempotencyKey = 'paymentIntents_create_' + idempotencyKey //stripe not support the same idempotencyKey even for diff APIs
      }

      const span = this.telemetry.startSpan('StripeAdapter:createPaymentIntent')
      const paymentIntent = await this.stripeInstance.paymentIntents.create(
        {
          amount: this.toStripeAmount(amount),
          currency: StripeCurrency.CAD,
          customer: stripeCustomerId,
          payment_method: paymentMethodId,
          off_session: true,
          confirm: true,
          capture_method: 'manual',
          metadata: {idempotencyKey},
        },
        options,
      )
      span.end()

      const idempotentReplayed = this.getIdempotentReplayed(paymentIntent)
      this.logInfo(
        `createPaymentIntent idempotentReplayed: ${idempotentReplayed}`,
        activityLogs.StripeFunctions.CreatePaymentIntent,
      )

      return paymentIntent
    } catch (error) {
      if (StripeCardDeclineCodes.includes(error?.raw?.decline_code)) {
        StructuredLogger.warn(
          activityLogs.CartPaymentServiceFunctions.CreatePaymentIntent,
          activityLogs.CartPaymentServiceActions.CreatePaymentIntentWarn,
          parseError(error),
        )

        throw new BadRequestWarningException(i18Messages.PAYMENT_DECLINED) //to not write logError
      } else {
        StructuredLogger.error(
          activityLogs.CartPaymentServiceFunctions.CreatePaymentIntent,
          activityLogs.CartPaymentServiceActions.CreatePaymentIntentFail,
          {...parseError(error), errMsg: `decline_code: ${error?.raw?.decline_code}`},
        )

        throw new InternalServerErrorException(i18Messages.PAYMENT_DECLINED)
      }
    }
  }

  async capturePaymentIntent(
    paymentIntentId: string,
    idempotencyKey: string,
  ): Promise<{capture: Stripe.PaymentIntent; idempotentReplayed: boolean}> {
    try {
      this.logInfo(
        `Start capturePaymentIntent in stripeAdapter, paymentIntentId: ${paymentIntentId}, idempotencyKey: ${idempotencyKey}`,
        activityLogs.StripeFunctions.CapturePaymentIntent,
      )

      const options: Stripe.RequestOptions = {}
      if (idempotencyKey) {
        options.idempotencyKey = 'paymentIntents_capture_' + idempotencyKey //stripe not support the same idempotencyKey even for diff APIs
      }

      const span = this.telemetry.startSpan('StripeAdapter:capturePaymentIntent')
      const capture = await this.stripeInstance.paymentIntents.capture(
        paymentIntentId,
        null,
        options,
      )
      span.end()

      const idempotentReplayed = this.getIdempotentReplayed(capture)

      this.logInfo(
        `capturePaymentIntent idempotentReplayed: ${idempotentReplayed}`,
        activityLogs.StripeFunctions.CapturePaymentIntent,
      )

      return {capture, idempotentReplayed}
    } catch (error) {
      if (StripeCardDeclineCodes.includes(error?.raw?.decline_code)) {
        StructuredLogger.warn(
          activityLogs.CartPaymentServiceFunctions.CapturePaymentIntent,
          activityLogs.CartPaymentServiceActions.CapturePaymentIntentWarn,
          parseError(error),
        )

        throw new BadRequestWarningException(i18Messages.PAYMENT_DECLINED) //to not write logError
      } else {
        StructuredLogger.error(
          activityLogs.CartPaymentServiceFunctions.CapturePaymentIntent,
          activityLogs.CartPaymentServiceActions.CapturePaymentIntentFail,
          {...parseError(error), errMsg: `decline_code: ${error?.raw?.decline_code}`},
        )

        throw new InternalServerErrorException(i18Messages.PAYMENT_DECLINED)
      }
    }
  }

  async createSubscription(payload: {
    customer: string
    billing_cycle_anchor: number
    default_payment_method?: string
    price: string
    metadata?: Record<string, string>
  }): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripeInstance.subscriptions.create({
        customer: payload.customer,
        billing_cycle_anchor: payload.billing_cycle_anchor,
        default_payment_method: payload?.default_payment_method,
        items: [
          {
            price: payload.price,
            quantity: 1,
          },
        ],
        off_session: true,
        payment_behavior: 'error_if_incomplete',
        proration_behavior: 'none',
        metadata: payload?.metadata || null,
      })

      return subscription
    } catch (error) {
      StructuredLogger.error(
        activityLogs.CartPaymentServiceFunctions.CreateSubscription,
        activityLogs.CartPaymentServiceActions.CreateSubscriptionFailed,
        {message: 'Stripe subscription creation failed', ...parseError(error)},
      )

      throw new Error(error)
    }
  }

  async retrieveSubscription(id: string): Promise<Stripe.Response<Stripe.Subscription>> {
    try {
      this.logInfo(`Start retrieval of subscription ${id}`, 'StripeRetrieveSubscription')

      return await this.stripeInstance.subscriptions.retrieve(id)
    } catch (error) {
      StructuredLogger.error('StripeRetrievesubscription', 'StripeRetrieveSubscriptionFailed', {
        message: 'Stripe subscription fetching failed',
        ...parseError(error),
      })

      return null
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      this.logInfo(
        `Start cancelSubscription, subscriptionId: ${subscriptionId}`,
        'StripeRetrieveInvoice',
      )

      return await this.stripeInstance.subscriptions.cancel(subscriptionId)
    } catch (error) {
      StructuredLogger.error('cancelSubscription', 'cancelSubscriptionFailed', {
        message: 'Stripe Subscription canceling failed',
        ...parseError(error),
      })

      throw new Error(error)
    }
  }

  async updateCustomerInvoicePaymentMethod(
    customerId: string,
    paymenthMethodId: string,
  ): Promise<Stripe.Response<Stripe.Customer>> {
    try {
      if (!paymenthMethodId || !customerId) {
        this.logInfo(
          `Payment method or Customer id not provided. PaymentMethod: ${paymenthMethodId}, Customer: ${customerId}. Customer update skipped.`,
          'StripeSetDefaultInvoicePaymentMethod',
        )
        return null
      }

      return await this.stripeInstance.customers.update(customerId, {
        invoice_settings: {default_payment_method: paymenthMethodId},
      })
    } catch (error) {
      StructuredLogger.error(
        'StripeSetDefaultInvoicePaymentMethod',
        'StripeSetDefaultInvoicePaymentMethodFailed',
        {
          message: 'Stripe customer update for default invoice payment method failed',
          ...parseError(error),
        },
      )

      return null
    }
  }

  async retrieveInvoice(id: string): Promise<Stripe.Response<Stripe.Invoice>> {
    try {
      this.logInfo(`Start retrieval of invoice ${id}`, 'StripeRetrieveInvoice')

      return await this.stripeInstance.invoices.retrieve(id)
    } catch (error) {
      StructuredLogger.error('StripeRetrieveInvoice', 'StripeRetrieveInvoiceFailed', {
        message: 'Stripe invoice fetching failed',
        ...parseError(error),
      })

      return null
    }
  }

  async listInvoices(
    params: Stripe.InvoiceListParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Response<Stripe.ApiList<Stripe.Invoice>>> {
    try {
      return await this.stripeInstance.invoices.list(params, options)
    } catch (error) {
      StructuredLogger.error('StripeRetrieveInvoiceList', 'StripeRetrieveInvoiceListFailed', {
        message: 'Stripe invoice list fetching failed',
        ...parseError(error),
      })

      return null
    }
  }

  async createBillingPortalSession(
    customerId: string,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    try {
      return await this.stripeInstance.billingPortal.sessions.create({
        customer: customerId,
      })
    } catch (error) {
      StructuredLogger.error(
        'StripeCreateBillingPortalSession',
        'CreateBillingPortalSessionFailed',
        {
          message: 'Stripe billing portal session fetching failed',
          ...parseError(error),
        },
      )

      return null
    }
  }

  verifyWebhookSignature(rawBody: Buffer, signature: string | string[]): Stripe.Event {
    try {
      const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET')
      return this.stripeInstance.webhooks.constructEvent(rawBody, signature, endpointSecret)
    } catch (error) {
      StructuredLogger.error('verifyWebhookSignature', 'verifyWebhookSignatureFailed', {
        message: 'Stripe signature validation failed',
        ...parseError(error),
      })

      return null
    }
  }

  private getIdempotentReplayed(capture: Stripe.Response<Stripe.PaymentIntent>): boolean {
    return !!capture?.lastResponse?.headers['idempotent-replayed']
  }

  isPaymentIntentRequiresCapture(paymentIntent: Stripe.PaymentIntent): boolean {
    return paymentIntent?.status === 'requires_capture'
  }

  toStripeAmount(amount: number): number {
    return Math.round(amount * 100)
  }

  logInfo(message: string, logEvent: string): void {
    StructuredLogger.info(logEvent, activityLogs.StripeEvent.Info, {
      message,
    })
  }
}
