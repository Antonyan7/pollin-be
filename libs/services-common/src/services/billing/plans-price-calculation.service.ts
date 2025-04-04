import {Injectable} from '@nestjs/common'
import {NestprojectConfigService} from '@libs/common'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {
  getPatientPlanTestTypes,
  getPlanAndAddonsTotal,
} from '@libs/services-common/helpers/plan-price.helper'

@Injectable()
export class PlansPriceCalculationService {
  constructor(
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly configService: NestprojectConfigService,
  ) {}

  /**@returns true if the price was updated */
  async updatePatientPlanPrice(patientPlanId: number): Promise<boolean> {
    const patientPlan = await this.patientPlanRepository.findOneForCheckout(
      {id: patientPlanId},
      null,
      false,
    )

    if (!patientPlan) {
      throw new Error('Patient plan not found')
    }

    const {total} = getPlanAndAddonsTotal(
      patientPlan,
      getPatientPlanTestTypes(patientPlan),
      this.configService.get<number>('TAX'),
    )

    const totalAmountString = total.toFixed(2)
    if (totalAmountString !== patientPlan.totalAmount) {
      await this.patientPlanRepository.update(patientPlanId, {totalAmount: totalAmountString})

      return true
    }

    return false
  }
}
