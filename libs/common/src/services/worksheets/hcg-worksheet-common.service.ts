import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {DateTimeUtil, StructuredLogger, NestprojectConfigService} from '@libs/common'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import * as activityLogs from '@libs/common/enums/activity-logs'
import PlanHelpers from '@libs/common/helpers/plan.helper'
import {HormoneType} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {GetHCGWorksheetResponseDTO} from '@libs/common/dto/worksheets/hcg-worksheet.dto'
import PlanSheetHelpers from '@libs/common/services/worksheets/helpers/worksheet-common.helper'
import {
  findMeasurementsForSheetByPatientId,
  findPatientPlanWithDetailsForSheetById,
  findPatientPlanWithSheetByUUID,
} from '@libs/common/services/worksheets/queries/worksheet.queries'
import {ErrorWrapper} from '@libs/services-common/dto/error-wrapper.dto'
import {Repository} from 'typeorm'
import {TestResultMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import HCGWorksheetHelpers from './helpers/hcg-worksheet.helper'

export class HCGWorksheetCommonService {
  constructor(
    private readonly patientPlanRepository: Repository<PatientPlan>,
    private readonly testResultMeasurementRepository: Repository<TestResultMeasurement>,
  ) {}

  private readonly configService = NestprojectConfigService.getInstance()
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  private sheetType = PlanSheetType.HCG

  private readonly hormoneTypes = [
    HormoneType.HumanChorionicGonadotropin,
    HormoneType.Estradiol,
    HormoneType.Progesterone,
    HormoneType.ThyroidStimulatingHormone,
  ]

  async getWorkSheet(patientPlanUUID: string): Promise<ErrorWrapper<GetHCGWorksheetResponseDTO>> {
    try {
      const patientPlan = await findPatientPlanWithSheetByUUID(
        this.patientPlanRepository,
        patientPlanUUID,
        this.sheetType,
      )
      if (!patientPlan) {
        return {
          data: null,
          error: {
            code: 400,
            message: i18Messages.PATIENT_PLAN_NOT_FOUND,
          },
        }
      }

      const sheetSize = this.configService.get<number>('HCG_WORKSHEET_SIZE_DAYS')

      const sheet = PlanHelpers.findSheetByType(patientPlan, PlanSheetType.HCG)
      if (!sheet?.dayOne) {
        return {
          data: await HCGWorksheetHelpers.buildEmptyWorksheetResponse(
            patientPlan,
            sheet,
            sheetSize,
          ),
        }
      }

      const startDate = this.dateTimeUtil.UTCToTz(this.dateTimeUtil.toDate(sheet.dayOne))
      const endDate = this.dateTimeUtil.addDays(startDate, sheetSize + 1)

      const datesToResultsHCG = await findMeasurementsForSheetByPatientId(
        this.testResultMeasurementRepository,
        patientPlan.patientId,
        {
          hormoneTypes: [HormoneType.HumanChorionicGonadotropin],
          startDate,
          endDate,
          showUnit: true,
        },
      )

      const additionalDates = PlanSheetHelpers.getAdditionalDatesInRange(
        sheet.additionalDays.map(({date}) => date),
        sheet,
      )
      const {
        totalDates: dates,
        nonPrimaryDates,
        manuallyAddedDates,
      } = PlanSheetHelpers.getSheetSortedDays([...datesToResultsHCG.keys()], additionalDates)
      if (!dates?.length) {
        return {
          data: await HCGWorksheetHelpers.buildEmptyWorksheetResponse(
            patientPlan,
            sheet,
            sheetSize,
          ),
        }
      }

      const [patientPlanWithDetails, datesToTestResults] = await Promise.all([
        findPatientPlanWithDetailsForSheetById(this.patientPlanRepository, {
          id: patientPlan.id,
          dates,
          sheetType: PlanSheetType.HCG,
        }),
        findMeasurementsForSheetByPatientId(
          this.testResultMeasurementRepository,
          patientPlan.patientId,
          {
            hormoneTypes: this.hormoneTypes,
            dates,
            showUnit: true,
          },
        ),
      ])

      this.logSheetData(patientPlanWithDetails, datesToTestResults)

      return {
        data: await HCGWorksheetHelpers.buildHCGSheetResponseDto({
          size: sheetSize,
          nonPrimaryDates,
          manuallyAddedDates,
          patientPlan: patientPlanWithDetails,
          dates,
          generalNotes: patientPlan.patientNotes,
          sheet: PlanHelpers.findSheetByType(patientPlanWithDetails, PlanSheetType.HCG),
          datesToTestResults,
          sheetType: PlanSheetType.HCG,
          planType: patientPlan.planType,
        }),
      }
    } catch (error) {
      return {
        data: null,
        error: {
          code: 500,
          message: error,
        },
      }
    }
  }

  private logSheetData(patientPlan: PatientPlan, datesToTestResults: Map<string, unknown>): void {
    StructuredLogger.info(
      activityLogs.HCGWorksheetFunctions.GetWorksheet,
      activityLogs.HCGWorksheetActions.GetWorksheetData,
      {
        testResultDates: Array.from(datesToTestResults.keys()),
        patientNotesIds: patientPlan.patientNotes.map(({id}) => id),
      },
    )
  }
}
