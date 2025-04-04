import {planTypeFixture} from './plan-type.fixture'
import {testTypeE2Fixture, testTypeFixture} from './test-type.fixture'
import {PlanTypeSheetTestType} from '@libs/data-layer/apps/plan/entities/typeorm/plan-type-sheet-test-type.entity'

export const planTypeSheetTestTypeFixture: Partial<PlanTypeSheetTestType> = {
  id: 1,
  planTypeSheetId: planTypeFixture.sheets[0].id,
  testTypeId: testTypeFixture.id,
  sequence: 2,
}

export const planTypeSheetTestTypeE2Fixture: Partial<PlanTypeSheetTestType> = {
  id: 2,
  planTypeSheetId: planTypeFixture.sheets[0].id,
  testTypeId: testTypeE2Fixture.id,
  sequence: 1,
}
