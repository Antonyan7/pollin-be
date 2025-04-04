import {IvfDish} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DishOwner} from '@libs/data-layer/apps/clinic-ivf/enums'

export const ivfDishFixture: Partial<IvfDish> = {
  id: 1,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa7',
  dishLabel: 'Strip',
  dishOwner: DishOwner.Patient,
}

export const ivfDishForScanBarcode1Fixture: Partial<IvfDish> = {
  id: 6,
  uuid: '1ab1309b-0645-4766-86da-4dad75a2e588',
  dishLabel: 'dishLabel1',
  dishOwner: DishOwner.Patient,
}
export const ivfDishForScanBarcode2Fixture: Partial<IvfDish> = {
  id: 7,
  uuid: 'ed44a650-7b5e-46be-a73a-0a277ec90ca0',
  dishLabel: 'dishLabel2',
  dishOwner: DishOwner.Patient,
}
export const ivfDishForScanBarcode3Fixture: Partial<IvfDish> = {
  id: 8,
  uuid: 'e85959ca-2c47-4827-b4f8-d8562d7eb230',
  dishLabel: 'dishLabel3',
  dishOwner: DishOwner.Patient,
}

export const ivfDishForScanBarcode4Fixture: Partial<IvfDish> = {
  id: 9,
  uuid: 'b8257d8e-caf2-41ef-bfac-4fcfbb0d71de',
  dishLabel: 'dishLabel4',
  dishOwner: DishOwner.Patient,
}

export const ivfDishPatientPartnerFixture: Partial<IvfDish> = {
  id: 2,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa8',
  dishLabel: 'Strip',
  dishOwner: DishOwner.PatientPartner,
}

export const ivfDishScanDishPrepDayFixture: Partial<IvfDish> = {
  id: 3,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa9',
  dishLabel: 'Strip 1',
  dishOwner: DishOwner.Patient,
}

export const ivfDishScanDishDay0Fixture: Partial<IvfDish> = {
  id: 4,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab0',
  dishLabel: 'Strip 2',
  dishOwner: DishOwner.Patient,
}

export const ivfDishScanDishDay1Fixture: Partial<IvfDish> = {
  id: 5,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab1',
  dishLabel: 'Strip 3',
  dishOwner: DishOwner.Patient,
}

export const ivfDishPatientSubmitDishInventoryFixture: Partial<IvfDish> = {
  id: 10,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaab',
  dishLabel: 'Strip',
  dishOwner: DishOwner.Patient,
}

export const ivfDishScanDishNotAssignedFixture: Partial<IvfDish> = {
  id: 11,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab2',
  dishLabel: 'Strip 4',
  dishOwner: DishOwner.Patient,
}

export const ivfDishBarcodeAlreadyUsedFixture: Partial<IvfDish> = {
  id: 12,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aa0a',
  dishLabel: 'Strip',
  dishOwner: DishOwner.Patient,
}

export const ivfDishForPartnerFixture: Partial<IvfDish> = {
  id: 13,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aa0b',
  dishLabel: 'Strip',
  dishOwner: DishOwner.Patient,
}

export const ivfDishWitnessingChecklistFixture: Partial<IvfDish> = {
  id: 14,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaad',
  dishLabel: 'Strip',
  dishOwner: DishOwner.Patient,
}

export const ivfDishWitnessingForPartnerBarcodeFixture: Partial<IvfDish> = {
  id: 15,
  uuid: '59f32eda-847f-4ca0-bafb-45cd6daa599e',
  dishLabel: 'DishLabel',
  dishOwner: DishOwner.PatientPartner,
}

export const ivfDishNotRequiredFixture: Partial<IvfDish> = {
  id: 16,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaae',
  dishLabel: 'Strip',
  dishOwner: DishOwner.Patient,
}

export const ivfDishForDiscardFixture: Partial<IvfDish> = {
  id: 17,
  uuid: '37cb3f7f-cb92-46fd-944d-40d965b48380',
  dishLabel: 'dishLabel17',
  dishOwner: DishOwner.Patient,
}
