import {TransportFolder} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {labInfoFixture, labInfoSecondFixture} from './lab-info.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
const todayTzInUTC: Date = dateTimeUtil.todayWithZeroTimeTZ()

export const transportFolderFixture: Partial<TransportFolder> = {
  id: 1,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49f1e123',
  identifier: 'TRA1-NOV30',
  name: 'test name',
  transportDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  labId: labInfoFixture.id,
}

export const transportFolderToBeUpdatedFixture: Partial<TransportFolder> = {
  id: 2,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49f1e683',
  identifier: 'TRA1-NOV31',
  name: 'Folder name',
  transportDate: dateTimeUtil.formatDateYMD(todayTzInUTC),
  driverName: 'Driver name to be updated',
  comment: 'Comment to be updated',
  labId: labInfoSecondFixture.id,
}

export const transportFolderListFixture: Partial<TransportFolder> = {
  id: 3,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49f1e684',
  identifier: 'TRA1-NOV32',
  name: 'Folder name list',
  transportDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  driverName: 'Driver name for list',
  comment: 'Comment for list',
  labId: labInfoSecondFixture.id,
}
export const transportFolderTomorrowFixture: Partial<TransportFolder> = {
  id: 4,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49f1e685',
  identifier: 'TRA1-NOV34',
  name: 'transportFolderYesterdayFixture',
  transportDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 1)),
  driverName: 'Driver name Tomorrow transportDate',
  comment: 'Comment for Tomorrow transportDate',
  labId: labInfoSecondFixture.id,
}
export const transportFolder2DayLaterFixture: Partial<TransportFolder> = {
  id: 5,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49f1e696',
  identifier: 'TRA1-NOV35',
  name: 'transportFolderYesterdayFixture',
  transportDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 2)),
  driverName: 'Driver name 2 day later transportDate',
  comment: 'Comment for 2 day later transportDate',
  labId: labInfoSecondFixture.id,
}
export const transportFolderWithoutSpecimensFixture: Partial<TransportFolder> = {
  id: 6,
  uuid: '77756a58-625e-4e70-b9d5-87ad49f1e696',
  identifier: 'TRA1-NOV36',
  name: 'transportFolderWithoutSpecimens',
  transportDate: dateTimeUtil.formatDateYMD(todayTzInUTC),
  driverName: 'Driver name with current date',
  comment: 'Comment with current date',
  labId: labInfoSecondFixture.id,
}

export const transportFolderForIVFFixture: Partial<TransportFolder> = {
  id: 7,
  uuid: '22d56a58-625e-4e70-b9d5-87ad49f1e123',
  identifier: 'IVF',
  name: 'transportFolderForIVFFixture',
  transportDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 10)),
  labId: labInfoFixture.id,
}

export const transportFolderForManifestFixture: Partial<TransportFolder> = {
  id: 8,
  uuid: '22d56a58-625a-2e70-b9d5-87ad49f1e124',
  identifier: '765',
  name: 'transportFolderForManifestFixture',
  transportDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 10)),
  labId: labInfoFixture.id,
}
