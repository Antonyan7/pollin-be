export enum SpermCryoListSortFieldsEnum {
  DateOrdered = 'DateOrdered',
  DateCollected = 'DateCollected',
}

export enum SpermCryoListFilterTypesEnum {
  Tank = 'Tank',
  Can = 'Can',
  MediaLot = 'MediaLot',
  Reagent = 'Reagent',
}

export const getSpermCryoListFilterTitle = new Map<SpermCryoListFilterTypesEnum, string>([
  [SpermCryoListFilterTypesEnum.Tank, 'Tank'],
  [SpermCryoListFilterTypesEnum.Can, 'Can'],
  [SpermCryoListFilterTypesEnum.MediaLot, 'Media Lot'],
  [SpermCryoListFilterTypesEnum.Reagent, 'Reagent'],
])

export enum DonorSperm {
  Yes = 'Yes',
  No = 'No',
}

export enum SpermCryoDropdownsEnum {
  IsDonorSperm = 'isDonorSperm',
  DonorEligibility = 'donorEligibility',
  MediaLot = 'mediaLot',
  Reagent = 'reagent',
  SampleType = 'sampleType',
  Tank = 'tank',
  Can = 'can',
  Cane = 'cane',
}
