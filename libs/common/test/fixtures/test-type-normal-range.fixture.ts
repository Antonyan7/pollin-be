import {TestTypeNormalRange} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type-normal-range.entity'
import {
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeForTestResultFixture,
} from './test-type.fixture'

export const testTypeNormalRangeFixture: Partial<TestTypeNormalRange> = {
  id: 1,
  uuid: 1 + '45e1b3c-3586-4b63-8faf-4452c7b5a144',
  testTypeId: testTypeForTestResultFixture.id,
  min: 100,
  max: 200,
  ageMin: 20,
  ageMax: 30,
}

export const testTypeNormalRangeForTestTypeAMHWithMdBIllingCodeFixture: Partial<TestTypeNormalRange> =
  {
    id: 2,
    uuid: 2 + '45e1b3c-3586-4b63-8faf-4452c7b5a144',
    testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
    min: 100,
    ageMin: 20,
  }

export const testTypeNormalRangeForTestTypeAMHWithMdBIllingCodeWithMaxValueFixture: Partial<TestTypeNormalRange> =
  {
    id: 3,
    uuid: 3 + '45e1b3c-3586-4b63-8faf-4452c7b5a144',
    testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
    max: 101,
    ageMax: 22,
  }
