import {TestResultSonoDetail} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TubeOptionEnum, UterineCavity} from '@libs/data-layer/apps/clinic-test/enums'
import {testResultSonoTypeForFertilityIQFemaleReleasedFixture} from './test-result.fixture'

export const testResultSonoDetailForReleasedStateFixture: Partial<TestResultSonoDetail> = {
  id: 1,
  uuid: '227c8be1-6cff-4d1b-b99f-fb36ccf656d2',
  testResultId: testResultSonoTypeForFertilityIQFemaleReleasedFixture.id,
  uterineCavity: UterineCavity.Normal,
  rightTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
  leftTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
  sonohysterogramNote: 'Sono detail note for Released',
}
