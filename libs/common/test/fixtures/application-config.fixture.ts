import {OperationSystemsEnum} from '@libs/services-common/enums'
import {AppConfigs} from '@libs/data-layer/apps/core/entities/fireorm/app-config'

export const applicationConfigFixture: Partial<AppConfigs> = {
  id: 'details',
  updates: {
    [OperationSystemsEnum.IOS]: {
      force: '0.0.1',
      optional: '0.0.1',
      url: 'https://www.google.com',
      privacyPolicy: 'string',
      termsOfUser: 'string',
    },
    [OperationSystemsEnum.ANDROID]: {
      force: '0.0.1',
      optional: '0.0.1',
      url: 'https://www.google.com',
      privacyPolicy: 'string',
      termsOfUser: 'string',
    },
  },
  chat_config: {
    sms_inbox_id: '201',
    chat_inbox_id: '1',
  },
  payment_config: {
    wireTransferMinimumAmount: 1000,
    splitPaymentAmountThreshold: 1000,
    splitPaymentMaxMethods: 4,
  },
  appointment_config: {
    confirmationBeforeHours: 72,
  },
  updatedBy: 'TEST',
}
