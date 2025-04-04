import {IvfTaskToDayToPlanType} from '@libs/data-layer/apps/clinic-ivf/entities'
import {planTypeFixture} from '@libs/common/test/fixtures/plan-type.fixture'
import {
  ivfTaskToDay2Fixture,
  ivfTaskToDay3Fixture,
  ivfTaskToDayFixture,
  ivfTaskToDay4Fixture,
  ivfTaskToDayZeroPICSIFixture,
  ivfTaskPrintLabelFixture,
  ivfTaskDayFreezeEmrbyoFixture,
  ivfTaskDayCallPatientFixture,
} from '@libs/common/test/fixtures/ivf-task-to-day.fixture'

export const ivfTaskToDayToPlanTypeDayZeroFixture: Partial<IvfTaskToDayToPlanType> = {
  id: 1,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
}

export const ivfTaskToDayToPlanType2Fixture: Partial<IvfTaskToDayToPlanType> = {
  id: 2,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskToDay2Fixture.id,
}

export const ivfTaskToDayToPlanType3Fixture: Partial<IvfTaskToDayToPlanType> = {
  id: 3,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskToDay3Fixture.id,
}

export const ivfTaskToDayToPlanType4Fixture: Partial<IvfTaskToDayToPlanType> = {
  id: 4,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskToDay4Fixture.id,
}

export const ivfTaskToDayToPlanTypeFixture: Partial<IvfTaskToDayToPlanType> = {
  id: 5,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
}

export const ivfTaskToDayToPlanTypePicsiFixture: Partial<IvfTaskToDayToPlanType> = {
  id: 7,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskToDayZeroPICSIFixture.id,
}

export const ivfTaskToDayToPlanType5Fixture: Partial<IvfTaskToDayToPlanType> = {
  id: 6,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskPrintLabelFixture.id,
}

export const ivfTaskToDayToPlanTypeFreezeEmbryoFixture: Partial<IvfTaskToDayToPlanType> = {
  id: 8,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskDayFreezeEmrbyoFixture.id,
}

export const ivfTaskToDayToPlanTypeCallPatientFixture: Partial<IvfTaskToDayToPlanType> = {
  id: 9,
  planTypeId: planTypeFixture.id,
  IVFTaskToDayId: ivfTaskDayCallPatientFixture.id,
}
