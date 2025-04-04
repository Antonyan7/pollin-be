import axios from 'axios'
import {Injectable} from '@nestjs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {NestprojectConfigService} from '../services'
import {StructuredLogger} from '../utils'
import {writeExtendedLogForAxiosException} from './common/error-helpers'

export type DrugBankTokenResponse = {
  token: string
}

export type DrugBankIngredient = {
  drugbank_id: string
  name: string
}

/**
 * Response when used with `product_concept_id` query
 */
export type DrugToDrugProductInteraction = {
  product_concept_id: string
  product_concept_name: string
  product_ingredient: DrugBankIngredient
  affected_product_concept_id: string
  affected_product_concept_name: string
  affected_product_ingredient: DrugBankIngredient
  description: string
  extended_description: string
  action: string
  severity: string
  management: string
}

export type DrugBankProductInteractionResponse = {
  interactions: Array<DrugToDrugProductInteraction>
  total_results: number
}

type Drug = {
  name: string
  drugbank_id: string
}

type Strength = {
  amount: number
  per: number
  units: string
}

export type DrugBankIngredients = {
  name: string
  drug: Drug
  strength: Strength
}

export type GetDrugBankDetailsResponse = {
  name: string
  display_name: string
  drugbank_pcid: string
  route: string
  form: string
  strengths: string
  ingredients: DrugBankIngredients[]
}

export type DrugBankAdapterData<T> = {
  status: number
  data: T
}

/**
 * Interact with Drug Bank APIs
 * https://docs.drugbank.com/v1/#introduction
 */
@Injectable()
export class DrugBankAdapter {
  private apiKey: string
  private apiPath = 'https://api.drugbank.com/v1'
  private tokenExpireHours: number

  constructor(private configService: NestprojectConfigService) {
    this.apiKey = this.configService.get<string>('DRUG_BANK_SECRET_KEY')
    this.tokenExpireHours = this.configService.get<number>('DRUG_BANK_SECRET_EXPIRE_HOURS')
  }

  /**
   * Generate access token (JWT) to gain access to Drug Bank APIs without exposing secret key. Expires in maximum 24h.
   * Lifetime can be configured by `ttl`
   */
  async accessToken(): Promise<DrugBankAdapterData<string>> {
    try {
      const response = await axios.post<DrugBankTokenResponse>(
        `${this.apiPath}/tokens`,
        {
          ttl: this.tokenExpireHours,
        },
        {
          headers: {Authorization: this.apiKey},
        },
      )

      return {status: response.status, data: response?.data?.token}
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: activityLogs.DrugBankFunctions.AccessToken,
        logAct: activityLogs.DrugBankActions.AccessTokenGenerationFailed,

        error,
        payloadAsString: '',
      })

      return null
    }
  }

  /**
   * Check drug-to-drug interactions
   * https://docs.drugbank.com/v1/#find-ddi-with-drugbank-i
   * @param drugBankIds Product Concept IDs e.g: DBPC0740409, DBPC0017698.
   * IDs passed to Interaction API should have completed 4 levels of drug query
   */
  async checkInteractionsByDrugBankIDs(
    drugBankIds: string[],
  ): Promise<DrugBankAdapterData<DrugBankProductInteractionResponse | null>> {
    try {
      if (drugBankIds?.length < 2) {
        StructuredLogger.warn(
          activityLogs.DrugBankFunctions.CheckInteractionsByDrugBankIDs,
          activityLogs.DrugBankActions.CheckInteractionsByDrugBankIDs,
          {message: 'Drug Banks needs 2 or more ID to check interaction'},
        )
        return null
      }

      const url = new URL(`${this.apiPath}/ddi`)
      url.searchParams.set('product_concept_id', drugBankIds.join(','))

      const response = await axios.get<DrugBankProductInteractionResponse>(url.href, {
        headers: {Authorization: this.apiKey},
      })

      return {status: response.status, data: response?.data}
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: activityLogs.DrugBankFunctions.CheckInteractionsByDrugBankIDs,
        logAct: activityLogs.DrugBankActions.CheckInteractionsByDrugBankIDsFailed,

        error,
        payloadAsString: JSON.stringify(drugBankIds),
      })

      return null
    }
  }

  async getDrugDetails(
    id: string,
  ): Promise<DrugBankAdapterData<GetDrugBankDetailsResponse | null>> {
    try {
      const url = new URL(`${this.apiPath}/product_concepts/${id}`)

      const response = await axios.get<GetDrugBankDetailsResponse>(url.href, {
        headers: {Authorization: this.apiKey},
      })

      return {status: response.status, data: response?.data}
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: activityLogs.DrugBankFunctions.GetDrugDetails,
        logAct: activityLogs.DrugBankActions.GetDrugDetailsFailed,

        error,
        payloadAsString: JSON.stringify(id),
      })

      return null
    }
  }
}
