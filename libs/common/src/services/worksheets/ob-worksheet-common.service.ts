import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {DateTimeUtil, StructuredLogger, NestprojectConfigService} from '@libs/common'
import PlanHelpers from '@libs/common/helpers/plan.helper'
import {HormoneType} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {GetOBWorksheetResponseDTO} from '@libs/common/dto/worksheets/ob-worksheet.dto'
import PlanSheetHelpers from '@libs/common/services/worksheets/helpers/worksheet-common.helper'
import {
  findMeasurementsForSheetByPatientId,
  findPatientPlanWithDetailsForSheetById,
  findPatientPlanWithSheetByUUID,
} from '@libs/common/services/worksheets/queries/worksheet.queries'
import {Repository} from 'typeorm'
import {TestResult, TestResultMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ErrorWrapper} from '@libs/services-common/dto/error-wrapper.dto'
import {findUltrasoundResultsForOBWorksheet} from './queries/ob-worksheet.queries'
import ObWorksheetHelpers from './helpers/ob-worksheet-common.helper'

export class OBWorksheetCommonService {
  constructor(
    private readonly patientPlanRepository: Repository<PatientPlan>,
    private readonly testResultMeasurementRepository: Repository<TestResultMeasurement>,
    private readonly testResultRepository: Repository<TestResult>,
  ) {}

  private sheetType = PlanSheetType.OB

  public readonly hormoneTypes = [
    HormoneType.Estradiol,
    HormoneType.Progesterone,
    HormoneType.ThyroidStimulatingHormone,
  ]

  private readonly configService = NestprojectConfigService.getInstance()
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  async getWorkSheet(patientPlanUUID: string): Promise<ErrorWrapper<GetOBWorksheetResponseDTO>> {
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

      const sheetSize = this.configService.get<number>('OB_WORKSHEET_SIZE_DAYS')

      const sheet = PlanHelpers.findSheetByType(patientPlan, PlanSheetType.OB)
      if (!sheet?.dayOne) {
        return {
          data: await ObWorksheetHelpers.buildEmptyWorksheetResponse(patientPlan, sheet, sheetSize),
        }
      }

      const startDate = this.dateTimeUtil.UTCToTz(this.dateTimeUtil.toDate(sheet.dayOne))
      const endDate = this.dateTimeUtil.addDays(startDate, sheetSize + 1)

      const [datesToTestResults, ultrasoundResults] = await Promise.all([
        findMeasurementsForSheetByPatientId(
          this.testResultMeasurementRepository,
          patientPlan.patientId,
          {
            hormoneTypes: this.hormoneTypes,
            startDate,
            endDate,
            allowTestPanels: false,
          },
        ),
        findUltrasoundResultsForOBWorksheet(this.testResultRepository, {
          patientId: patientPlan.patientId,
          startDate,
          endDate,
        }),
      ])

      const hormoneDates = Array.from(datesToTestResults.keys())
      const datesToUltrasoundResults = ObWorksheetHelpers.getDatesToUltrasoundResults(
        ultrasoundResults,
        hormoneDates,
      )

      const additionalDates = PlanSheetHelpers.getAdditionalDatesInRange(
        sheet.additionalDays.map(({date}) => date),
        sheet,
      )
      const {
        totalDates: dates,
        nonPrimaryDates,
        manuallyAddedDates,
      } = PlanSheetHelpers.getSheetSortedDays([...datesToUltrasoundResults.keys()], additionalDates)
      if (!dates?.length) {
        return {
          data: await ObWorksheetHelpers.buildEmptyWorksheetResponse(patientPlan, sheet, sheetSize),
        }
      }

      const patientPlanWithDetails = await findPatientPlanWithDetailsForSheetById(
        this.patientPlanRepository,
        {id: patientPlan.id, dates, sheetType: this.sheetType},
      )

      StructuredLogger.info(
        activityLogs.OBWorksheetFunctions.GetWorksheet,
        activityLogs.OBWorksheetActions.GetWorksheetData,
        {
          testResultDates: Array.from(datesToTestResults.keys()),
          ultrasoundResultsIds: ultrasoundResults.map(({id}) => id),
          patientNotesIds: patientPlanWithDetails.patientNotes.map(({id}) => id),
        },
      )

      const response = await ObWorksheetHelpers.buildOBWorksheetResponseDto({
        size: sheetSize,
        nonPrimaryDates,
        manuallyAddedDates,
        patientPlan: patientPlanWithDetails,
        dates,
        sheet: PlanHelpers.findSheetByType(patientPlanWithDetails, PlanSheetType.OB),
        generalNotes: patientPlan.patientNotes,
        datesToTestResults,
        datesToUltrasoundResults,
        sheetType: PlanSheetType.OB,
        planType: patientPlan.planType,
      })
      return {data: response}
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
}
