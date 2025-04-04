import {testTypeFixture} from '@libs/common/test/fixtures/test-type.fixture'
import {TestTypeRange} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type-range.entity'

export const testTypeRangeFixture: Partial<TestTypeRange> = {
  id: 1,
  uuid: '845e1b3c-3586-4b63-8faf-4452c7b5a144',
  testTypeId: testTypeFixture.id,
  testObservationMetadataId: null,
  min: 1,
  max: 3,
  valueHexColor: '',
  labelHexColor: '',
  label: 'label',
  valueLabel: 'value label',
}
