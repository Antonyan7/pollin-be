import {TestTypeResultOption} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {testTypeSemenCultureFixture} from './test-type.fixture'

export const testTypeResultOptionFirstFixture: Partial<TestTypeResultOption> = {
  id: 1,
  uuid: 'e0916361-dddf-4852-ac78-0337efdd2068',
  title: 'O+',
  testTypeId: testTypeSemenCultureFixture.id,
}

export const testTypeResultOptionSecondFixture: Partial<TestTypeResultOption> = {
  id: 2,
  uuid: '249b6749-97d1-4080-84b4-f9e4962fc63f',
  title: 'O-',
  testTypeId: testTypeSemenCultureFixture.id,
}
