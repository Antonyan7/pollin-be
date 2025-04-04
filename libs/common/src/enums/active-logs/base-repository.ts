export enum BaseRepositoryFunctions {
  FindAll = 'FindAll',
  ValidateWhereOptionsForUndefined = 'ValidateWhereOptionsForUndefined',
}

export enum BaseRepositoryActions {
  FindAllFailed = 'FindAllFailed',
  WhereIncludesUndefinedKey = 'WhereIncludesUndefinedKey',
}

export enum BaseRepositoryFunctionAndAction {
  FindManyByUserAndServiceCategoryAndQuestionnaire = 'findManyByUserAndServiceCategoryAndQuestionnaire',
  BookingIntentDeleteMany = 'BookingIntentDeleteMany',
  QuestionnaireIntentDeleteMany = 'QuestionnaireIntentDeleteMany',
}
