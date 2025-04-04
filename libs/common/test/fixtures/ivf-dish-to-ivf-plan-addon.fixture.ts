import {IvfDishToPlanAddon} from '@libs/data-layer/apps/clinic-ivf/entities'
import {planAddonFixtureIcsiInjectionFixture} from '@libs/common/test/fixtures/plan-addon.fixture'
import {ivfDishForScanBarcode3Fixture} from '@libs/common/test/fixtures/ivf-dish.fixture'

export const ivfDishToIvfPlanAddonWitnessFixture: Partial<IvfDishToPlanAddon> = {
  id: 1,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa7',
  planAddonId: planAddonFixtureIcsiInjectionFixture.id,
  ivfDishId: ivfDishForScanBarcode3Fixture.id,
  day: 2,
  required: true,
}
