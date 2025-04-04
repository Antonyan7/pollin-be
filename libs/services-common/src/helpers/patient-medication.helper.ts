import {DrugBankIngredients, GetDrugBankDetailsResponse} from '@libs/common/adapters'

import {DrugBankMissingFields} from '@libs/services-common/enums'

export const getMissingValues = (drugBankMedication: GetDrugBankDetailsResponse): string[] => {
  const missingValues = []
  if (!drugBankMedication[DrugBankMissingFields.Route]) {
    missingValues.push(DrugBankMissingFields.Route)
  }
  if (!drugBankMedication[DrugBankMissingFields.Form]) {
    missingValues.push(DrugBankMissingFields.Form)
  }
  if (!drugBankMedication[DrugBankMissingFields.Strengths]) {
    missingValues.push(DrugBankMissingFields.Strengths)
  }
  return missingValues
}

export const generateMissingValuesErrorMessage = (fields: string[]): string => {
  return fields.length === 1
    ? `${fields.join('')} input is missing`
    : `${fields.join(' ')} inputs are missing`
}

export const generateDrugBankName = (ingredients: DrugBankIngredients[]): string => {
  return ingredients.map((ingredient) => ingredient.name).join(', ')
}
