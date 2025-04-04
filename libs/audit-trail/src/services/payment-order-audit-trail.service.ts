import {Injectable} from '@nestjs/common'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {PaymentOrderRepository} from '@libs/data-layer/apps/checkout/repositories/typeorm/payment-order.repository'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order.entity'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {AuditTrailPubSubService} from '@libs/audit-trail/services/audit-trail-pubsub.service'
import {PaymentOrderItemRepository} from '@libs/data-layer/apps/checkout/repositories/typeorm/payment-order-item.repository'

@Injectable()
export class PaymentOrderAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private readonly configService: NestprojectConfigService,
    private readonly paymentOrderRepository: PaymentOrderRepository,
    private readonly paymentOrderItemRepository: PaymentOrderItemRepository,
    private readonly auditTrailPubSubService: AuditTrailPubSubService,
  ) {}

  async addPaymentOrderAuditTrail(data: {
    authUserId: string
    paymentOrder: PaymentOrder
    authUserName: string
  }): Promise<void> {
    const {authUserId, paymentOrder, authUserName} = data
    const revisionId = generateRevisionId(this.dateTimeUtil.now())

    await Promise.all([
      this.paymentOrderRepository.update(
        {id: paymentOrder.id},
        {revisionId, updatedBy: authUserId},
      ),
      this.auditTrailPubSubService.publish({
        authUserId,
        userAction: AuditUserAction.Create,
        revisionId,
        latestData: JSON.stringify(paymentOrder),
        authUserName,
        tableUpdated: AuditTrailCollection.PaymentOrderRevisions,
      }),
    ])
  }

  async addPaymentOrderItemAuditTrail(data: {
    authUserId: string
    paymentOrderId: number
    authUserName: string
  }): Promise<void> {
    const {authUserId, paymentOrderId, authUserName} = data
    const paymentOrderItems = await this.paymentOrderItemRepository.find({where: {paymentOrderId}})

    const promises = paymentOrderItems.reduce((acc, item) => {
      acc.push(
        this.paymentOrderItemRepository.update(
          {id: item.id},
          {revisionId: generateRevisionId(this.dateTimeUtil.now())},
        ),
      )
      acc.push(
        this.auditTrailPubSubService.publish({
          authUserId,
          userAction: AuditUserAction.Create,
          revisionId: generateRevisionId(this.dateTimeUtil.now()),
          latestData: JSON.stringify(item),
          authUserName,
          tableUpdated: AuditTrailCollection.PaymentOrderItemRevisions,
        }),
      )
      return acc
    }, [])

    await Promise.all(promises)
  }
}
