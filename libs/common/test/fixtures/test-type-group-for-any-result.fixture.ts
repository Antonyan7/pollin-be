import {TestTypeGroupForAnyResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type-group-for-any-result.entity'
import {notTaxableTestTypeAMHFixture, testTypeForTestResultFixture} from './test-type.fixture'
import {TestTypeGroupForAnyResultTestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type-group-for-any-result-test-type.entity'

export const testTypeGroupForAnyResultFixture: Partial<TestTypeGroupForAnyResult> = {
  id: 1,
  internalName: 'test display group AMH',
  testTypesRelations: [
    {id: 1, testTypeId: testTypeForTestResultFixture.id},
    {id: 2, testTypeId: notTaxableTestTypeAMHFixture.id},
  ] as TestTypeGroupForAnyResultTestType[],
}
