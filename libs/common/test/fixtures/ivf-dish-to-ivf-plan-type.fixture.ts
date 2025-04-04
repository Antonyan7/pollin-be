import {IvfDishToPlanType} from '@libs/data-layer/apps/clinic-ivf/entities'
import {planTypeFixture} from '@libs/common/test/fixtures/plan-type.fixture'
import {
  ivfDishForScanBarcode1Fixture,
  ivfDishForScanBarcode3Fixture,
} from '@libs/common/test/fixtures/ivf-dish.fixture'
import {ivfDishBarcodeScanDish3Fixture} from '@libs/common/test/fixtures/ivf-dish-barcode.fixture'

export const ivfDishToIvfPlanTypeFixture: Partial<IvfDishToPlanType> = {
  id: 1,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa7',
  planTypeId: planTypeFixture.id,
  ivfDishId: ivfDishForScanBarcode3Fixture.id,
  day: 2,
  required: true,
}

export const ivfDishToIvfPlanType2Fixture: Partial<IvfDishToPlanType> = {
  id: 2,
  uuid: 'a163f9fc-ecc9-4599-8733-4a79b0b9b5c1',
  planTypeId: planTypeFixture.id,
  ivfDishId: ivfDishForScanBarcode1Fixture.id,
  day: 2,
  required: true,
}
export const ivfDishToIvfPlanTypeNewFixture: Partial<IvfDishToPlanType> = {
  id: 3,
  uuid: 'a163f9fc-ecc9-9756-8733-4a79b0b9b5c1',
  planTypeId: planTypeFixture.id,
  ivfDishId: ivfDishBarcodeScanDish3Fixture.id,
  day: 0,
  required: true,
}
