import {TestOrderType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestOrderTypeCodeEnum} from '@libs/data-layer/apps/clinic-test/enums'

export const testOrderTypeFixture: Partial<TestOrderType> = {
  id: 1,
  uuid: 'testOrderType-11ed-814e-0242ac122002',
  priority: 1,
  title: 'Test Order Type 1',
  code: TestOrderTypeCodeEnum.CycleMonitoring,
  showAsTestResultsTab: true,
}

export const testOrderTypeForParentTestGroupFixture: Partial<TestOrderType> = {
  id: 2,
  uuid: 'testOrderType-11ed-814e-0242ac122003',
  priority: 2,
}

export const testOrderTypeOrderSetsFixture: Partial<TestOrderType> = {
  id: 3,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49f1e783',
  priority: 3,
  title: 'Order Sets',
  isActive: true,
}

export const orderSetWithOneTestTypeFixture: Partial<TestOrderType> = {
  id: 4,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49k1e783',
  priority: 3,
  title: 'Order Sets One And Only',
}

export const individualOrderSetWithOneTestTypeFixture: Partial<TestOrderType> = {
  id: 5,
  uuid: '51d56a58-625e-4e70-b9d5-87ad49k2e783',
  priority: 3,
  title: 'Individual Tests',
  showAsTestResultsTab: true,
}

export const testOrderViewState: Partial<TestOrderType> = {
  id: 6,
  uuid: '913d2da1-f81d-45e5-9cf0-436f613d00a6',
  priority: 3,
  title: 'testOrderViewState',
}

export const testOrderTypeOrderActionsFixture: Partial<TestOrderType> = {
  id: 7,
  uuid: '888d2da1-f81d-45e5-9cf0-436f613d00a6',
  priority: 3,
  title: 'testOrderOrderActions',
}

export const testOrderisActiveFixture: Partial<TestOrderType> = {
  id: 8,
  uuid: '999d2da1-f81d-45e5-9cf0-436f613d00a6',
  priority: 3,
  title: 'testOrderisActiveFixture',
}

export const testOrderTypeLibraryContentFixture: Partial<TestOrderType> = {
  id: 10,
  uuid: 10 + '9d2da1-f81d-45e5-9cf0-436f613d00a6',
  priority: 5,
  title: 'testOrderTypeLibraryContentFixture',
  isActive: true,
}
