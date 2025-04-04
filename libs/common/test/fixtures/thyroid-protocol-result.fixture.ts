import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {ThyroidProtocolResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {patientForThyroidProtocolFixture} from './patient.fixture'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const thyroidProtocolResultToBeRemovedFixture: Partial<ThyroidProtocolResult> = {
  id: 1,
  uuid: 'e0916361-dddf-4852-ac78-0337efdd2068',
  patientId: patientForThyroidProtocolFixture.id,
  date: dateTimeUtil.formatDateYMD(dateTimeUtil.subDays(dateTimeUtil.now(), 5)),
}

export const thyroidProtocolResultToNotUpdateFixture: Partial<ThyroidProtocolResult> = {
  id: 2,
  uuid: 'e0912361-addf-4852-ac78-0337efdd2068',
  patientId: patientForThyroidProtocolFixture.id,
  date: '2022-01-01',
}
