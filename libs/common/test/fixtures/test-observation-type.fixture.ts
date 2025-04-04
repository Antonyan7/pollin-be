import {TestObservationType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestObservationTypeResultOption} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-observation-type-result-option.entity'
import {
  TestObservationDisplaySize,
  TestObservationDisplayType,
} from '@libs/data-layer/apps/clinic-test/enums'

export const testObservationTypeStringFixture: Partial<TestObservationType> = {
  id: 1,
  uuid: 'cd22356f-d369-4bb2-a063-e485fbd1cb92',
  title: 'testObservationTypeStringFixtureSonoTitle',
  displayType: TestObservationDisplayType.Dropdown,
  displaySize: TestObservationDisplaySize.Small,
  resultOptions: [
    {id: 1, uuid: 'cd22356f-d369-4bb2-a063-e485fbd1cb92', sequence: 2, valueString: 'value2'},
    {id: 2, uuid: 'ad22356f-d369-4bb2-a063-e485fbd1cb92', sequence: 1, valueString: 'value1'},
  ] as TestObservationTypeResultOption[],
}

export const testObservationTypeStringOptionalFixture: Partial<TestObservationType> = {
  id: 2,
  uuid: 'cd22356f-d369-4bb2-a063-e485fbd1cb91',
  title: 'testObservationTypeStringOptionalFixture',
  displayType: TestObservationDisplayType.String,
  displaySize: TestObservationDisplaySize.Large,
  optional: true,
}
