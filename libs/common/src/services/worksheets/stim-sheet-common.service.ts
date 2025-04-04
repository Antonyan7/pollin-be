import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import PlanHelpers from '@libs/common/helpers/plan.helper'
import {HormoneType} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientNoteTypeEnum} from '@libs/services-common/enums'
import {PatientPlan, PatientPlanSheet, Signature} from '@libs/data-layer/apps/plan/entities/typeorm'
import {GetStimSheetResponseDto} from '@libs/common/dto/worksheets/stim-sheet-worksheet.dto'
import PlanSheetHelpers from './helpers/worksheet-common.helper'
import StimSheetCommonHelpers from './helpers/stim-sheet-common.helper'
import {Repository} from 'typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {TestResult, TestResultMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  findAppointmentsForStimSheetByIds,
  findApptsStimSheetToShowDaysByPatientId,
  findUltrasoundResultsForStimSheet,
  getNotesForStimSheet,
  getPatientPlanStimSheet,
} from './queries/stim-sheet.queries'
import {
  findMeasurementsForSheetByPatientId,
  findSignaturesForSheetDays,
} from './queries/worksheet.queries'
import {ErrorWrapper} from '@libs/services-common/dto/error-wrapper.dto'

export class StimSheetCommonService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly patientPlanRepository: Repository<PatientPlan>,
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly testResultMeasurementRepository: Repository<TestResultMeasurement>,
    private readonly testResultRepository: Repository<TestResult>,
    private readonly signatureRepository: Repository<Signature>,
    private readonly patientNoteRepository: Repository<PatientNote>,

    private readonly sheetType: PlanSheetType,
  ) {}

  private readonly sheetHormoneTypes = [
    HormoneType.Estradiol,
    HormoneType.Progesterone,
    HormoneType.LuteinizingHormone,
    HormoneType.FollicleStimulatingHormone,
  ]

  private readonly noteType =
    this.sheetType === PlanSheetType.Stimulation
      ? PatientNoteTypeEnum.PlanStimSheet
      : PatientNoteTypeEnum.PlanPrimingWorksheet

  private readonly configService = NestprojectConfigService.getInstance()
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  private readonly stimSheetSize = this.configService.get<number>('STIM_SHEET_SIZE_DAYS')

  async getWorkSheet(patientPlanUUID: string): Promise<ErrorWrapper<GetStimSheetResponseDto>> {
    try {
      const patientPlan = await this.getPatientPlan(patientPlanUUID)
      if (!patientPlan) {
        return {
          data: null,
          error: {
            code: 400,
            message: i18Messages.PATIENT_PLAN_NOT_FOUND,
          },
        }
      }

      const sheet = PlanHelpers.findSheetByType(patientPlan, this.sheetType)

      const getEmptyStimSheet = (): Promise<GetStimSheetResponseDto> =>
        this.getEmptyStimSheet(patientPlan, sheet)

      if (!sheet?.dayOne) {
        return {data: await getEmptyStimSheet()}
      }

      const {startDateUTC, endDateUTC} = this.calculateSheetIntervalUTC(patientPlan, sheet)

      const dayNotes = await getNotesForStimSheet(this.patientNoteRepository, {
        patientPlanId: patientPlan.id,
        sheetType: sheet.type,
        endDate: this.dateTimeUtil.formatTzDate(endDateUTC),
      })

      const {datesToNotesMap, datesToOrderNotesMap, noteDates} =
        await PlanSheetHelpers.getDatesAndNotesMap(dayNotes, sheet.type)

      const testTypes = StimSheetCommonHelpers.getPlanTypeSheetTestTypes(patientPlan, sheet.type)

      const {appointmentIds, appointmentDatesToTestTypeIds} =
        await findApptsStimSheetToShowDaysByPatientId(
          this.appointmentRepository,
          patientPlan.patientId,
          {
            startDateUTC,
            endDateUTC,
            dates: noteDates,
            testTypes,
          },
        )

      if (
        !appointmentDatesToTestTypeIds.size &&
        !sheet.additionalDays?.length &&
        !noteDates.length
      ) {
        return {data: await getEmptyStimSheet()}
      }

      const additionalDates = PlanSheetHelpers.getAdditionalDatesInRange(
        sheet.additionalDays.map(({date}) => date),
        sheet,
      )

      const {totalDates, nonPrimaryDates, manuallyAddedDates} = PlanSheetHelpers.getSheetSortedDays(
        [...appointmentDatesToTestTypeIds.keys(), ...noteDates],
        additionalDates,
      )
      if (!totalDates?.length) {
        return {data: await getEmptyStimSheet()}
      }

      const [signatures, datesToTestResults, ultrasoundResults, appointments] = await Promise.all([
        findSignaturesForSheetDays(this.signatureRepository, sheet.id),
        findMeasurementsForSheetByPatientId(
          this.testResultMeasurementRepository,
          patientPlan.patientId,
          {hormoneTypes: this.sheetHormoneTypes, dates: totalDates, testTypes},
        ),
        findUltrasoundResultsForStimSheet(
          this.testResultRepository,
          patientPlan.patientId,
          totalDates,
        ),
        findAppointmentsForStimSheetByIds(this.appointmentRepository, appointmentIds),
      ])

      const data = await StimSheetCommonHelpers.buildGetStimSheetResponseDto({
        size: this.stimSheetSize,
        patientPlan,
        dates: totalDates,
        nonPrimaryDates,
        manuallyAddedDates,
        sheet,
        appointments,
        datesToTestResults,
        datesToNotesMap,
        datesToOrderNotesMap,
        ultrasoundResults,
        signatures,
        generalNotes: patientPlan.patientNotes,
        sheetType: this.sheetType,
        testTypes,
        appointmentDatesToTestTypeIds,
      })
      return {data}
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

  private getEmptyStimSheet(
    patientPlan: PatientPlan,
    sheet: PatientPlanSheet,
  ): Promise<GetStimSheetResponseDto> {
    return StimSheetCommonHelpers.buildGetStimSheetEmptyResponseDto({
      size: this.stimSheetSize,
      patientPlan,
      sheet,
      generalNotes: patientPlan.patientNotes,
      globalSignatures: sheet?.signatures ?? [],
      sheetType: this.sheetType,
    })
  }

  private async getPatientPlan(patientPlanUUID: string): Promise<PatientPlan> {
    const patientPlan = await getPatientPlanStimSheet(this.patientPlanRepository, {
      patientPlanUUID,
      noteType: this.noteType,
      sheetType: this.sheetType,
    })

    return patientPlan
  }

  private calculateSheetIntervalUTC(
    patientPlan: PatientPlan,
    sheet: PatientPlanSheet,
  ): {startDateUTC: Date; endDateUTC: Date} {
    const stimSheetSize = this.configService.get<number>('STIM_SHEET_SIZE_DAYS')

    const startDateUTC = this.dateTimeUtil.getUTCTimeFromString(sheet.dayOne)
    const calculatedEndDate = StimSheetCommonHelpers.getStimSheetEndDate(
      startDateUTC,
      patientPlan,
      stimSheetSize,
    )

    const dbEndDate = sheet.endDate
      ? this.dateTimeUtil.addDays(this.dateTimeUtil.getUTCTimeFromString(sheet.endDate), 1)
      : null

    return {
      startDateUTC,
      endDateUTC:
        sheet.type === PlanSheetType.Priming &&
        dbEndDate &&
        this.dateTimeUtil.isBefore(dbEndDate, calculatedEndDate)
          ? dbEndDate
          : calculatedEndDate,
    }
  }
}
