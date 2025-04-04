import {
  DrugBankAdapterData,
  DrugBankProductInteractionResponse,
  DrugToDrugProductInteraction,
  GetDrugBankDetailsResponse,
} from '@libs/common/adapters/drug-bank.adapter'

export class DrugBankAdapter {
  async accessToken(): Promise<DrugBankAdapterData<string>> {
    return Promise.resolve({status: 200, data: 'DRUG_BANK_TOKEN'})
  }

  async checkInteractionsByDrugBankIDs(
    drugBankIds: string[],
  ): Promise<DrugBankAdapterData<DrugBankProductInteractionResponse>> {
    if (drugBankIds?.length < 2) {
      return null
    }

    const interactions: Array<DrugToDrugProductInteraction> = [
      {
        product_concept_id: 'DBPC0740409',
        product_concept_name:
          'Sulfamethoxazole 80 mg / Trimethoprim 16 mg /mL Intravenous Solution',
        product_ingredient: {
          drugbank_id: 'DB01015',
          name: 'Sulfamethoxazole',
        },
        affected_product_concept_id: 'DBPC0017698',
        affected_product_concept_name: 'Warfarin 1 mg Oral Tablet',
        affected_product_ingredient: {
          drugbank_id: 'DB00682',
          name: 'Warfarin',
        },
        description:
          'The serum concentration of Warfarin can be increased when it is combined with Sulfamethoxazole.',
        extended_description:
          'The co-administration of warfarin and CYP3A4 inhibitors may cause increased warfarin serum concentrations, which may change INR values and increase the risk of bleeding.',
        action: 'increase_serum_concentration',
        severity: 'moderate',
        management:
          'Watch for signs and symptoms of bleeding, and monitor INR closely when these agents are used in combination, particularly when starting, stopping, or changing doses of the CYP3A4 inhibitor.',
      },
    ]

    return Promise.resolve({status: 200, data: {total_results: 1, interactions}})
  }

  async getDrugDetails(
    drugBankId: string,
  ): Promise<DrugBankAdapterData<GetDrugBankDetailsResponse>> {
    let data
    // this cases used by prescription-medication-with-drugbank.test.ts
    if (drugBankId === 'createDrugBankMedication') {
      data = {
        name: `drug1`,
        display_name: `display_name`,
        drugbank_pcid: `createDrugBankMedication`,
        route: 'Orally',
        form: 'form',
        strengths: 'strengths',
        ingredients: [
          {
            name: 'drugName',
            drug: {
              name: 'string',
              drugbank_id: 'drugbank_pcid',
            },
            strength: {
              amount: 1,
              per: 1,
              units: 'mg',
            },
          },
        ],
      }
    }

    // this cases used by prescription-medication-with-drugbank.test.ts
    if (drugBankId === 'createPrescriptionDrugBankMedication') {
      data = {
        name: `drug2`,
        display_name: `display_name`,
        drugbank_pcid: `createPrescriptionDrugBankMedication`,
        route: 'Orally',
        form: 'form',
        strengths: 'strengths',
        ingredients: [
          {
            name: 'drugName',
            drug: {
              name: 'string',
              drugbank_id: 'drugbank_pcid2',
            },
            strength: {
              amount: 1,
              per: 1,
              units: 'mg',
            },
          },
        ],
      }
    }

    //this cases used by create-plan-with-drugbank.test.ts
    if (drugBankId === 'createPlanDrugBankMedication') {
      data = {
        name: `drug3`,
        display_name: `display_name`,
        drugbank_pcid: `createPlanDrugBankMedication`,
        route: 'Orally',
        form: 'form',
        strengths: 'strengths',
        ingredients: [
          {
            name: 'drugName',
            drug: {
              name: 'string',
              drugbank_id: 'drugbank_pcid',
            },
            strength: {
              amount: 1,
              per: 1,
              units: 'mg',
            },
          },
        ],
      }
    }
    return Promise.resolve({status: 200, data})
  }
}
