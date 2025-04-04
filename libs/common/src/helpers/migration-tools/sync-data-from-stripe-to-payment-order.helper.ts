import {NestprojectConfigService, StructuredLogger} from '@libs/common'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order.entity'
import Stripe from 'stripe'
import {IsNull} from 'typeorm'
import {PaymentOrderToStripePaymentIntent} from 'migrations/dto/payment-order-data-sync'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'

const configService = NestprojectConfigService.getInstance()

const stripeInstance = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), null)

export const getPaymentOrdersStripePaymentIntentsIds = async (): Promise<
  PaymentOrderToStripePaymentIntent[]
> => {
  try {
    const dataSource = await getCreateDatabaseConnection()

    const paymentOrderRepository = dataSource.getRepository(PaymentOrder)

    const paymentOrdersDb = await paymentOrderRepository.find({
      select: {id: true, stripePaymentIntentId: true},
      where: {paymentCardBrand: IsNull(), paymentCardLast4: IsNull()},
    })

    return paymentOrdersDb.map((payment) => ({
      paymentOrderId: payment.id,
      stripePaymentIntentId: payment.stripePaymentIntentId,
    }))
  } catch (error) {
    StructuredLogger.error(
      'GetPaymentOrdersStripePaymentIntentsIds',
      'GetPaymentOrdersStripePaymentIntentsIdsFailed',
      {message: JSON.stringify(error)},
    )
  }
}

export const getStripePaymentIntentDetails = async (
  stripePaymentIntentId: string,
): Promise<Stripe.Response<Stripe.PaymentIntent>> => {
  return stripeInstance.paymentIntents.retrieve(stripePaymentIntentId)
}

export const getPaymentMethodDetails = async (
  paymentMethodId: string,
): Promise<Stripe.Response<Stripe.PaymentMethod>> => {
  return stripeInstance.paymentMethods.retrieve(paymentMethodId)
}

export const logInfoMessage = (message: string): void => {
  StructuredLogger.info(
    'UpdatePaymentOrderWithCardBrandAndLast4',
    'UpdatePaymentOrderWithCardBrandAndLast4Successfully',
    {
      message,
    },
  )
}
