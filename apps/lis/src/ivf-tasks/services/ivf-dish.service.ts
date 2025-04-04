import {Injectable} from '@nestjs/common'
import {
  DishInventoryResponse,
  IVFDishResponseStatus,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {Equal, IsNull, Not} from 'typeorm'
import {DishOwner} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  IvfDishToIvfTaskGroupRepository,
  PatientPlanCohortIvfDishRepository,
  PatientPlanCohortRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {
  IvfDish,
  IvfDishBarcode,
  IvfDishToIvfTaskGroup,
  PatientPlanCohort,
  PatientPlanCohortIvfDish,
  PatientPlanCohortIvfTaskGroup,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {Dishes} from '@apps/lis/double-witness/dto/double-witness.dto'
import {BadRequestException, BadRequestValidationException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {IdentityMatchReasons} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DiscardDishRequestDto} from '@apps/lis/ivf-tasks/dto/double-witness-history.dto'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {DishScanningLogRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/fireorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPartnerRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {DefaultValue} from '@libs/common/enums'
import {DailyViewService} from '@apps/lis/daily-view/services/daily-view.service'
import {getPatientsByDayDTO} from '@apps/lis/spawn-cohort/dto/spawn-cohort.dto'
import {DishRequest} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {formalizeBarcodeWithPrefix} from '@apps/lis/double-witness/helper/barcode.helper'

@Injectable()
export class IvfDishService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly ivfDishToIvfTaskGroupRepository: IvfDishToIvfTaskGroupRepository,
    private readonly patientPlanCohortIvfDishRepository: PatientPlanCohortIvfDishRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly i18nLocalizationService: I18nLocalizationService,
    private readonly patientPartnerRepository: PatientPartnerRepository,
    private readonly dishScanningLogRepository: DishScanningLogRepository,
    private configService: NestprojectConfigService,
    private readonly dailyViewService: DailyViewService,
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
  ) {}

  dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  async discardDish(
    payload: DiscardDishRequestDto,
    staff: {name: string; authUserId: string},
  ): Promise<void> {
    const {ivfDishId, ivfCohortId} = payload

    const patientPlanCohortIvfDish =
      await this.patientPlanCohortIvfDishRepository.getByDishUUIDAndIvfCohortId(
        ivfDishId,
        ivfCohortId,
      )

    if (!patientPlanCohortIvfDish) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.IVF_DISH_NOT_FOUND),
        ResponseStatusCodes.NotFound,
      )
    }

    await this.patientPlanCohortIvfDishRepository.discardById(patientPlanCohortIvfDish.id)
    const dishScanningLog = {
      id: null,
      authUserFullName: staff.name,
      authUserId: staff.authUserId,
      day: DefaultValue.Dash,
      dishLabel: patientPlanCohortIvfDish.ivfDish?.dishLabel ?? null,
      identityMatch: false,
      identityMatchReason: IdentityMatchReasons.Discarded,
      patientPlanCohortIvfDishId: patientPlanCohortIvfDish.id,
      patientPlanCohortGroupId: null,
      patientPlanCohortId: patientPlanCohortIvfDish.patientPlanCohortId,
      patientFullName: await this.getPatientFullNameForDishScanHistory(
        patientPlanCohortIvfDish.ivfDish?.dishOwner,
        patientPlanCohortIvfDish.patientPlanCohort.patientPlan.patient,
      ),
      scannedBy: staff.name,
      scannedDate: this.dateTimeUtil.getFirestoreTimeStampNowDate(),
      date: this.dateTimeUtil.getFirestoreTimeStampNowDate(),
      createdAt: this.dateTimeUtil.getFirestoreTimeStampNowDate(),
      updatedAt: this.dateTimeUtil.getFirestoreTimeStampNowDate(),
      updatedBy: staff.authUserId,
      errorReason: null,
    }

    await this.dishScanningLogRepository.create(dishScanningLog)
  }

  async getPatientFullNameForDishScanHistory(
    dishOwner: DishOwner,
    patient: Patient,
  ): Promise<string> {
    if (dishOwner === DishOwner.PatientPartner) {
      const patientPartners = await this.patientPartnerRepository.getPatientPartnersForIvf(
        patient.id,
      )
      if (!patientPartners.length) {
        throw new BadRequestValidationException(
          this.i18nLocalizationService.translate(i18Messages.PARTNER_NOT_FOUND),
          ResponseStatusCodes.NotFound,
        )
      }
      const partner = patientPartners[0].partner
      return getFullName(partner.firstName ?? null, partner.lastName ?? null)
    }
    return getFullName(patient?.firstName ?? null, patient?.lastName ?? null)
  }

  async dishInventoryResponse(patientPlanCohortId: number): Promise<DishInventoryResponse> {
    const patientPlanCohortIvfDishes = await this.patientPlanCohortIvfDishRepository.find({
      where: {
        patientPlanCohortId,
        ivfDish: {dishOwner: DishOwner.Patient},
        disabledAt: IsNull(),
      },
      relations: {
        ivfDishBarcode: true,
        ivfDish: true,
      },
    })
    const barcodes = patientPlanCohortIvfDishes.map(
      (patientPlanCohortIvfDish) => patientPlanCohortIvfDish.ivfDishBarcode,
    )

    const dishes = patientPlanCohortIvfDishes.map(({discardedAt, ivfDish}) => ({
      discardedAt: !!discardedAt,
      ...ivfDish,
    }))

    return {
      dishes: dishes.map((dish) => {
        const patientPlanCohortIvfDish = patientPlanCohortIvfDishes.find(
          (patientPlanCohortIvfDish) => patientPlanCohortIvfDish.ivfDishId === dish.id,
        )
        const barcode = barcodes.find(
          (barcode) => barcode?.id === patientPlanCohortIvfDish.ivfDishBarcodeId,
        )
        return {
          dish: {
            id: dish?.uuid,
            label: dish?.dishLabel,
            status: dish.discardedAt
              ? IVFDishResponseStatus.Discarded
              : IVFDishResponseStatus.Active,
          },
          barcode: {id: barcode?.uuid, value: barcode?.value},
        }
      }),
    }
  }

  async partnerDishInventoryResponse(patientPlanCohortId: number): Promise<DishInventoryResponse> {
    const patientPlanCohortIvfDishes = await this.patientPlanCohortIvfDishRepository.find({
      where: {
        patientPlanCohortId,
        ivfDish: {dishOwner: DishOwner.PatientPartner},
        disabledAt: IsNull(),
      },
      relations: {
        ivfDishBarcode: true,
        ivfDish: true,
      },
    })
    const barcodes = patientPlanCohortIvfDishes.map(
      (patientPlanCohortIvfDish) => patientPlanCohortIvfDish.ivfDishBarcode,
    )

    const dishes = patientPlanCohortIvfDishes.map(({discardedAt, ivfDish}) => ({
      discardedAt: !!discardedAt,
      ...ivfDish,
    }))
    return {
      dishes: dishes.map((dish) => {
        const patientPlanCohortIvfDish = patientPlanCohortIvfDishes.find(
          (patientPlanCohortIvfDish) => patientPlanCohortIvfDish.ivfDishId === dish.id,
        )
        const barcode = barcodes.find(
          (barcode) => barcode?.id === patientPlanCohortIvfDish.ivfDishBarcodeId,
        )
        return {
          dish: {
            id: dish?.uuid,
            label: dish?.dishLabel,
            status: dish.discardedAt
              ? IVFDishResponseStatus.Discarded
              : IVFDishResponseStatus.Active,
          },
          barcode: {id: barcode?.uuid, value: barcode?.value},
        }
      }),
    }
  }

  async getPatientPlanCohortIvfDishes(
    patientPlanCohortId: number,
    date: string,
  ): Promise<PatientPlanCohortIvfDish[]> {
    return this.patientPlanCohortIvfDishRepository.find({
      where: {
        patientPlanCohortId: patientPlanCohortId,
        ivfDish: {
          ivfDishToIvfTaskGroups: {
            patientPlanCohortIvfTaskGroup: {
              date,
              patientPlanCohortId: patientPlanCohortId,
            },
          },
        },
        discardedAt: IsNull(),
      },
      relations: {
        patientPlanCohort: {
          patientPlan: {
            detail: true,
          },
        },
        ivfDish: {
          ivfDishToIvfTaskGroups: {patientPlanCohortIvfTaskGroup: true},
          ivfDishToPlanAddons: true,
          ivfDishToPlanTypes: true,
        },
        ivfDishBarcode: true,
      },
    })
  }

  async getDishes(
    patientPlanCohortIvfDishes: PatientPlanCohortIvfDish[],
    dashboardFilterDate: string | null,
    patientPlanCohortId: number,
  ): Promise<Dishes> {
    const date = this.dateTimeUtil.formatDateYMD(this.dateTimeUtil.todayWithZeroTimeTZ())

    const patientPlanCohort =
      await this.patientPlanCohortRepository.findCohortDailyViewByOriginalCohortId(
        patientPlanCohortId,
      )
    let dashboardDayUpdate = null
    if (dashboardFilterDate) {
      const {ivfTaskGroups, currentDayActive} = this.dailyViewService.getTaskGroupsWithType(
        patientPlanCohort,
        dashboardFilterDate,
      )

      dashboardDayUpdate = getPatientsByDayDTO({patientPlanCohort, ivfTaskGroups, currentDayActive})
    }
    return {
      dishes: patientPlanCohortIvfDishes.map((patientPlanCohortIvfDish) => {
        const todayIvfDishToIvfTaskGroup =
          patientPlanCohortIvfDish.ivfDish.ivfDishToIvfTaskGroups.find(
            (taskGroup) => taskGroup.patientPlanCohortIvfTaskGroup.date === date,
          )
        return {
          id: patientPlanCohortIvfDish.ivfDish.uuid,
          label: patientPlanCohortIvfDish.ivfDish.dishLabel,
          value: patientPlanCohortIvfDish.ivfDishBarcode?.value,
          state: Boolean(patientPlanCohortIvfDish.ivfDish.ivfDishToIvfTaskGroups[0]?.scannedDate),
          required: todayIvfDishToIvfTaskGroup?.required,
        }
      }),
      patientIdentityCardScanned: Boolean(
        patientPlanCohortIvfDishes[0].ivfDish.ivfDishToIvfTaskGroups[0]
          .patientPlanCohortIvfTaskGroup.patientIdentityCardScannedDate,
      ),
      dashboardDayUpdate,
    }
  }

  async scanDishResponse(
    patientPlanCohortId: number,
    date: string,
    dashboardFilterDate: string | null,
  ): Promise<Dishes> {
    const patientPlanCohortIvfDishes = await this.getPatientPlanCohortIvfDishes(
      patientPlanCohortId,
      date,
    )
    if (!patientPlanCohortIvfDishes.length) {
      throw new BadRequestValidationException(
        this.i18nService.translate(i18Messages.NO_DISHES_FOUND_FOR_CURRENT_DAY),
      )
    }
    return this.getDishes(patientPlanCohortIvfDishes, dashboardFilterDate, patientPlanCohortId)
  }

  async validateScanDishPayload(data: {
    patientPlanCohort: PatientPlanCohort
    date: string
    patientPlanCohortIvfTaskGroup: PatientPlanCohortIvfTaskGroup
    ivfDishBarcode: IvfDishBarcode
  }): Promise<{errorMessage: string; identityMatchReason: IdentityMatchReasons}> {
    const {patientPlanCohort, patientPlanCohortIvfTaskGroup, date, ivfDishBarcode} = data

    if (!ivfDishBarcode) {
      return this.dishScanValidationResponse(
        i18Messages.INCORRECT_DISH,
        IdentityMatchReasons.MismatchedWrongDish,
      )
    }
    const patientPlanCohortIvfDish = ivfDishBarcode.patientPlanCohortIvfDish
    if (!patientPlanCohortIvfDish) {
      return this.dishScanValidationResponse(
        i18Messages.BARCODE_NOT_ASSIGNED,
        IdentityMatchReasons.MismatchedUnassignedBarcode,
      )
    }

    if (patientPlanCohortIvfDish.discardedAt) {
      return this.dishScanValidationResponse(
        i18Messages.PATIENT_PLAN_COHORT_IVF_DISH_DISCARDED,
        IdentityMatchReasons.DiscardedDish,
      )
    }

    if (
      patientPlanCohort.patientPlan.patientId !==
      ivfDishBarcode.patientPlanCohortIvfDish.patientPlanCohort.patientPlan.patientId
    ) {
      if (patientPlanCohortIvfDish.ivfDish.dishOwner === DishOwner.Patient) {
        return this.dishScanValidationResponse(
          i18Messages.BARCODE_DOES_NOT_MATCH_THE_PID,
          IdentityMatchReasons.MismatchedWrongPatient,
        )
      }
      return this.dishScanValidationResponse(
        i18Messages.BARCODE_DOES_NOT_MATCH_THE_PATIENT_PARTNER,
        IdentityMatchReasons.MismatchedWrongPartner,
      )
    }

    const ivfDishToIvfTaskGroup = await this.getIvfDishToIvfTaskGroup(
      patientPlanCohortIvfDish,
      date,
    )
    if (!ivfDishToIvfTaskGroup) {
      throw new BadRequestValidationException(
        this.i18nLocalizationService.translate(
          i18Messages.SCANNED_DISH_IS_NOT_REQUIRED_FOR_THIS_DAY,
        ),
      )
    }

    if (ivfDishToIvfTaskGroup.scannedDate) {
      throw new BadRequestValidationException(
        this.i18nLocalizationService.translate(i18Messages.BARCODE_ALREADY_SCANNED),
        ResponseStatusCodes.BadRequest,
      )
    }

    if (
      patientPlanCohortIvfTaskGroup.ivfDishToIvfTaskGroups
        .map((ivfDishToIvfTaskGroups) => ivfDishToIvfTaskGroups.ivfDishId)
        .includes(patientPlanCohortIvfDish.ivfDishId)
    ) {
      return {errorMessage: null, identityMatchReason: null}
    }
    throw new BadRequestValidationException(
      this.i18nLocalizationService.translate(i18Messages.BARCODE_DOES_NOT_MATCH_TO_DISH),
    )
  }
  async getIvfDishToIvfTaskGroup(
    patientPlanCohortIvfDish: PatientPlanCohortIvfDish,
    date: string,
  ): Promise<IvfDishToIvfTaskGroup> {
    return this.ivfDishToIvfTaskGroupRepository.findOne({
      where: {
        ivfDishId: Equal(patientPlanCohortIvfDish?.ivfDishId),
        patientPlanCohortIvfTaskGroup: {
          id: Not(IsNull()),
          date,
          patientPlanCohortId: Equal(patientPlanCohortIvfDish?.patientPlanCohortId),
        },
      },
    })
  }
  async addBarcodeToDish(data: {
    dishes: DishRequest[]
    barcodes: IvfDishBarcode[]
    ivfDishes: IvfDish[]
    patientPlanCohortId: number
  }): Promise<void> {
    const {dishes, barcodes, ivfDishes, patientPlanCohortId} = data
    await Promise.all(
      dishes.map(async (dish) => {
        const barcode = barcodes.find(
          (barcode) => barcode?.value === formalizeBarcodeWithPrefix(dish.barcode?.value),
        )
        const ivfDish = ivfDishes.find((ivfDish) => ivfDish.uuid === dish.dish.id)
        if (!barcode) {
          return
        }
        await this.patientPlanCohortIvfDishRepository.update(
          {patientPlanCohortId, ivfDishId: ivfDish.id},
          {ivfDishBarcodeId: barcode?.id},
        )
      }),
    )
  }
  dishScanValidationResponse(
    errorMessage: string,
    identityMatchReason: IdentityMatchReasons,
  ): {errorMessage: string; identityMatchReason: IdentityMatchReasons} {
    return {errorMessage, identityMatchReason}
  }
}
