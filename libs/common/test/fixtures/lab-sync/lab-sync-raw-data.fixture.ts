import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {LabSyncRawData} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {LabSyncStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {labInfoDynacareFixture, labInfoLifeLabsFixture} from '../lab-info.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const LabSyncRawDataSuccessFixture: Partial<LabSyncRawData> = {
  id: 1,
  storagePath: 'path',
  status: LabSyncStatus.Success,
  labId: labInfoDynacareFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}

export const labSyncRawDataFromLifeLabsPendingFixture: Partial<LabSyncRawData> = {
  id: 2,
  storagePath: 'path',
  status: LabSyncStatus.Pending,
  labId: labInfoLifeLabsFixture.id,
}

export const labSyncRawDataFailedFromDynacareFixture: Partial<LabSyncRawData> = {
  id: 3,
  status: LabSyncStatus.Failed,
  labId: labInfoDynacareFixture.id,
}

export const labSyncRawDataSuccessFromDynacareFixture: Partial<LabSyncRawData> = {
  id: 4,
  status: LabSyncStatus.Success,
  labId: labInfoDynacareFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}
