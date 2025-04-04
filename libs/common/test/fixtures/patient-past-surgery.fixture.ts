import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common/utils'
import {PatientPastSurgery} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientForProfileOverviewFemaleFixture} from './patient.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const patientPastSurgeryFixture: Partial<PatientPastSurgery> = {
  id: 1,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249b',
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: 'PastSurgery type',
  date: dateTimeUtil.now(),
}
