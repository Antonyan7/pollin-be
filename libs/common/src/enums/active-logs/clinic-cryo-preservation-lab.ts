export enum CryoInventoryFunctions {
  GetInventoryOptions = 'GetInventoryOptions',
  GetInventoryList = 'GetInventoryList',
}

export enum CryoInventoryActions {
  GetInventoryOptionsFailed = 'GetInventoryOptionsFailed',
  GetInventoryListFailed = 'GetInventoryListFailed',
}

export enum CryoCardsFunctions {
  GetDiscardReasons = 'GetDiscardReasons',
  CreateEmptyEmbryo = 'CreateEmptyEmbryo',
  GetDropdownOptions = 'GetDropdownOptions',
  CreateCryoCard = 'CreateCryoCard',
  CreateCryoContainer = 'CreateCryoContainer',
  GetCryoCardDetails = 'GetCryoCardDetails',
  UpdateCapacity = 'UpdateCapacity',
  UpdateCryoCardDetails = 'UpdateCryoCardDetails',
  UpdateStrawsDetails = 'UpdateStrawsDetails',
  UpdateDonorDetails = 'UpdateDonorDetails',
  UpdateMediaLotAndReagent = 'UpdateMediaLotAndReagent',
  UpdateExternalSample = 'UpdateExternalSample',
}

export enum CryoCardsActions {
  GetDiscardReasonsFailed = 'GetDiscardReasonsFailed',
  CreateEmptyEmbryoFailed = 'CreateEmptyEmbryoFailed',
  GetDropdownOptionsFailed = 'GetDropdownOptionsFailed',
  CreateCryoCardFailed = 'CreateCryoCardFailed',
  CreateCryoContainerFailed = 'CreateCryoContainerFailed',
  GetCryoCardDetailsFailed = 'GetCryoCardDetailsFailed',
  UpdateCryoCardDetailsFailed = 'UpdateCryoCardDetailsFailed',
  UpdateStrawsDetailsFailed = 'UpdateStrawsDetailsFailed',
  UpdateDonorDetailsFailed = 'UpdateDonorDetailsFailed',
  UpdateMediaLotAndReagentFailed = 'UpdateMediaLotAndReagentFailed',
  ReagentWasNotFound = 'ReagentWasNotFound',
  WrongPayload = 'WrongPayload',
  UpdateExternalSampleFailed = 'UpdateExternalSampleFailed',
}

export enum CryoLocationFunctions {
  VerifyLocation = 'VerifyLocation',
}

export enum CryoLocationActions {
  VerifyLocationFailed = 'VerifyLocationFailed',
}
