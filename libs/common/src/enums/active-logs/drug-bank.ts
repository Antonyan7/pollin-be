export enum DrugBankFunctions {
  AccessToken = 'AccessToken',
  CheckInteractionsByDrugBankIDs = 'CheckInteractionsByDrugBankIDs',
  GetDrugDetails = 'GetDrugDetails',
  HandleStatus = 'HandleStatus',
  GenerateAccessToken = 'GenerateAccessToken',
  CheckInteraction = 'CheckInteraction',
}

export enum DrugBankActions {
  GenerateAccessToken = 'GenerateAccessToken',
  AccessTokenGenerationFailed = 'AccessTokenGenerationFailed',
  GetDrugDetailsFailed = 'GetDrugDetailsFailed',
  CheckInteractionsByDrugBankIDsFailed = 'CheckInteractionsByDrugBankIDsFailed',
  CheckInteractionsByDrugBankIDs = 'CheckInteractionsByDrugBankIDs',
  NoDrugDrugInteractionsFound = 'NoDrugDrugInteractionsFound',
  DrugBankFailure = 'DrugBankFailure',
  DrugBankResourceNotFound = 'DrugBankResourceNotFound',
  DrugBankUnprocessable = 'DrugBankUnprocessable',
  DrugBankStatus = 'DrugBankStatus',
  GenerateAccessTokenFailed = 'GenerateAccessTokenFailed',
  CheckInteractionFailed = 'CheckInteractionFailed',
}
