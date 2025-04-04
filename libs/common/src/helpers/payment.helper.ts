import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {randomCharacters} from '../utils/random'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const generatePaymentReceiptNumber = (date?: Date): string => {
  const dateOrCurrent = date ?? dateTimeUtil.now()
  return (
    `${dateTimeUtil.getYear(dateOrCurrent)}-${dateTimeUtil.getMonth(dateOrCurrent)}-` +
    randomCharacters(6).toUpperCase()
  )
}
export const getAmount = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(price)
}
