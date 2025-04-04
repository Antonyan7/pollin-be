import {TestGroup} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  individualOrderSetWithOneTestTypeFixture,
  orderSetWithOneTestTypeFixture,
  testOrderisActiveFixture,
  testOrderTypeFixture,
  testOrderTypeForParentTestGroupFixture,
  testOrderTypeLibraryContentFixture,
  testOrderTypeOrderActionsFixture,
  testOrderTypeOrderSetsFixture,
  testOrderViewState,
} from './test-order-type.fixture'
import {TestOrderGroupTypeEnum} from '@libs/data-layer/apps/clinic-test/enums'

export const testGroupFixture: Partial<TestGroup> = {
  id: 1,
  uuid: 'testGroup132d-11ed-814e-0242ac122002',
  testOrderTypeId: testOrderTypeFixture.id,
  type: TestOrderGroupTypeEnum.OrderGroup,
  title: 'testGroupFixtureTitle',
}

export const parentTestGroupFixture: Partial<TestGroup> = {
  id: 2,
  uuid: 'testGroup132d-11ed-814e-0242ac122003',
  testOrderTypeId: testOrderTypeForParentTestGroupFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
}

export const testGroupOrderSetOneDayWorkupFixture: Partial<TestGroup> = {
  id: 3,
  uuid: 'testGroup132d-11ed-814e-0242ac122222',
  testOrderTypeId: testOrderTypeOrderSetsFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'One Day Workup',
  abbreviation: 'ODW',
  isActive: true,
}

export const testGroupOrderGroupHemFNestprojectTestGroupFixture: Partial<TestGroup> = {
  id: 4,
  uuid: 'testGroup132d-11ed-814e-0242ac122333',
  testOrderTypeId: testOrderTypeOrderSetsFixture.id,
  type: TestOrderGroupTypeEnum.OrderGroup,
  title: 'HemF Nestproject Test Group',
  abbreviation: 'HFPTG',
}

export const groupWithOneOnlyTestTypeFixture: Partial<TestGroup> = {
  id: 5,
  uuid: 'testGroup137d-11zd-114e-0242ac122222',
  testOrderTypeId: orderSetWithOneTestTypeFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'One Only Test Type',
  abbreviation: 'OoTT',
}

export const individualGroupFixture: Partial<TestGroup> = {
  id: 6,
  uuid: 'testGroup172d-16ed-814e-0242ac122133',
  testOrderTypeId: individualOrderSetWithOneTestTypeFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'Individual Group',
  abbreviation: 'INDGR',
}

export const testGroupForPlanCreationFixture: Partial<TestGroup> = {
  id: 7,
  uuid: 'testGroup333d-11ed-814e-0242ac122002',
  testOrderTypeId: testOrderTypeFixture.id,
  type: TestOrderGroupTypeEnum.OrderGroup,
}

export const testGroupForOrderViewFixture: Partial<TestGroup> = {
  id: 8,
  uuid: '29be3922-2b0b-467b-b0db-13bf62888244',
  testOrderTypeId: testOrderViewState.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'testGroupForOrderViewFixture',
}

export const testGroupForOrderActionsFixture: Partial<TestGroup> = {
  id: 9,
  uuid: '81be3922-2b0b-467b-b0db-13bf62888274',
  testOrderTypeId: testOrderTypeOrderActionsFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'testGroupForOrderActionsFixture',
}

export const testGroupForGeneticTestingFixture: Partial<TestGroup> = {
  id: 10,
  uuid: 'e70c89ae-c5f8-4f83-92b7-1888669529f4',
  testOrderTypeId: testOrderTypeOrderSetsFixture.id,
  showOnPlans: true,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'testGroupForGeneticTestingFixture',
  sequence: 1,
  isActive: true,
}

export const testGroupForGeneticTestingAlternativeFixture: Partial<TestGroup> = {
  id: 11,
  uuid: '8720022f-c73f-44c6-83c0-a5234e1604dc',
  testOrderTypeId: testOrderTypeOrderSetsFixture.id,
  showOnPlans: true,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'testGroupForGeneticTestingAlternativeFixture',
  sequence: 2,
}

export const notActiveTestGroupFixture: Partial<TestGroup> = {
  id: 12,
  uuid: 'd5f9b7a2-3cb4-4ad5-9d74-65191d9d5f0a',
  testOrderTypeId: testOrderisActiveFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'notActiveTestGroupFixture',
  isActive: false,
  sequence: 2,
}

export const testGroupOrderForLibraryTypeFixture: Partial<TestGroup> = {
  id: 14,
  uuid: 14 + 'stGroup132d-11ed-814e-0242ac122222',
  testOrderTypeId: testOrderTypeLibraryContentFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'LibraryContentTitle',
  abbreviation: 'LibCont',
}

export const testGroupForLibraryContentFixture: Partial<TestGroup> = {
  id: 15,
  uuid: 15 + 'stGroup132d-11ed-814e-0242ac122222',
  testOrderTypeId: testOrderTypeLibraryContentFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'testGroupForLibraryContentFixtureTitle',
  abbreviation: 'testGroupForLibraryContentFixtureAbrev',
}

export const testGroupHighlightsFixture: Partial<TestGroup> = {
  id: 16,
  uuid: '3d2aedca-13dc-4d03-9fb3-a12e51d0dc28',
  testOrderTypeId: testOrderTypeLibraryContentFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'testGroupHighlightsFixture',
  abbreviation: 'testGroupHighlightsFixture',
}

export const testResultFilteringByTestGroupFixture: Partial<TestGroup> = {
  id: 17,
  uuid: '9e73cd53-2984-4c59-b8ff-f49703b7c0dd',
  testOrderTypeId: testOrderisActiveFixture.id,
  type: TestOrderGroupTypeEnum.OrderSet,
  title: 'TestResultFilteringTestGroupFixture',
  isActive: true,
  sequence: 2,
}
