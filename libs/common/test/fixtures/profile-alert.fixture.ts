import {testTypeGroupForAnyResultFixture} from './test-type-group-for-any-result.fixture'
import {ProfileAlert} from '@libs/data-layer/apps/users/entities/typeorm'
import {testTypeSemenCultureFixture} from './test-type.fixture'
import {ProfileAlertType} from '@libs/data-layer/apps/users/enum'

export const profileAlertAbnormalSpermFixture: Partial<ProfileAlert> = {
  id: 1,
  text: 'profileAlertAbnormalSpermFixture',
  sequence: 1,
  testTypeId: testTypeSemenCultureFixture.id,
  type: ProfileAlertType.AbnormalPartnerResult,
}

export const profileAlertAbnormalGroupFixture: Partial<ProfileAlert> = {
  id: 2,
  text: 'profileAlertAbnormalGroupFixture',
  sequence: 2,
  testTypeGroupForAnyResultId: testTypeGroupForAnyResultFixture.id,
  type: ProfileAlertType.AbnormalPartnerResult,
}
