import {LabSyncRawData} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {LabSyncStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {labInfoDynacareFixture, labInfoLifeLabsFixture} from './lab-info.fixture'

export const labSyncRawDataFromLifeLabsPendingFixture: Partial<LabSyncRawData> = {
  id: 1,
  labId: labInfoLifeLabsFixture.id,
  status: LabSyncStatus.Pending,
  storagePath: 'path',
}

export const labSyncRawDataFromDynacarePendingFixture: Partial<LabSyncRawData> = {
  id: 2,
  labId: labInfoDynacareFixture.id,
  status: LabSyncStatus.Pending,
  storagePath: 'path',
}
