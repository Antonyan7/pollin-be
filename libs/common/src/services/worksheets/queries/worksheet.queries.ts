import {
  convertTimeColumnToTimezone,
  sqlSeparator,
  sqlSeparatorForStimSheet,
} from '@libs/common/helpers/repository-helper'
import {getResultUnitTitle} from '@libs/common/helpers/test-result.helper'
import {TestResultMeasurement, TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  completedTestResultStatuses,
  HormoneType,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientPlan, PlanMedication, Signature} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {SignatureSource} from '@libs/data-layer/apps/plan/enums/signature.enum'
import {Brackets, Equal, IsNull, Not, Repository} from 'typeorm'
import PlanSheetHelpers, {
  sheetTypeToDayNoteType,
  sheetTypeToDayOrderNoteType,
} from '../helpers/worksheet-common.helper'
import {CatheterType} from '@libs/data-layer/apps/scheduling/entities/typeorm'

export const findSignaturesForSheetDays = async (
  signatureRepository: Repository<Signature>,
  patientPlanSheetId: number,
): Promise<Signature[]> => {
  if (!patientPlanSheetId) {
    return []
  }

  return signatureRepository.find({
    select: {
      id: true,
      date: true,
      notifyingMethod: true,
      type: true,
      createdAt: true,
      principal: {
        id: true,
        firstName: true,
        lastName: true,
      },
      signatory: {
        id: true,
        firstName: true,
        lastName: true,
      },
    },
    where: {
      patientPlanSheetId: Equal(patientPlanSheetId),
      date: Not(IsNull()),
      source: SignatureSource.PatientPlanSheet,
    },
    relations: {principal: true, signatory: true},
  })
}

/**@key HormoneType | test type id */
export type WorksheetTestTypeResultsDto = {
  [key in HormoneType | number]?: {result: string; status: TestResultStatus; resultUUID: string}
}

type WorksheetMeasurementSearchOptions = {
  hormoneTypes: HormoneType[]
  testTypes?: TestType[]
  dates?: string[]
  startDate?: Date
  endDate?: Date
  showUnit?: boolean
  allowTestPanels?: boolean
}

const parseMeasurementsDbResults = (
  dbResults: {date: string; results: string}[],
  options: WorksheetMeasurementSearchOptions,
  testTypeIds: number[],
): Map<string, WorksheetTestTypeResultsDto> => {
  const dateToResultsMap = new Map<string, WorksheetTestTypeResultsDto>(
    dbResults.map((dbResult) => [dbResult.date, {}]),
  )

  dbResults.forEach((dbResult) => {
    const testResults = dbResult.results.split(sqlSeparator)
    testResults.forEach((testResult) => {
      const [result, resultUUID, resultStatusString, testTypeStringId, unit, hormoneType] =
        testResult.split(sqlSeparatorForStimSheet)

      const testTypeId = Number(testTypeStringId)
      const status = resultStatusString as TestResultStatus

      if (hormoneType) {
        dateToResultsMap.get(dbResult.date)[hormoneType] = {
          result: options?.showUnit ? getResultUnitTitle(result, unit) : result,
          resultUUID,
          status,
        }
      }

      if (testTypeIds?.includes(testTypeId)) {
        dateToResultsMap.get(dbResult.date)[testTypeId] = {
          result: getResultUnitTitle(result, unit),
          resultUUID,
          status,
        }
      }
    })
  })

  return dateToResultsMap
}

export const findMeasurementsForSheetByPatientId = async (
  testResultMeasurementRepository: Repository<TestResultMeasurement>,
  patientId: number,
  options: WorksheetMeasurementSearchOptions,
): Promise<Map<string, WorksheetTestTypeResultsDto>> => {
  const {hormoneTypes, testTypes} = options
  const testTypeIds = testTypes?.map(({id}) => id) ?? []

  const toTz = convertTimeColumnToTimezone

  const whereQuery = (n: number, checkByTestTypeIds?: boolean): string => {
    const searchByDates =
      'DATE_FORMAT(' + toTz(`appointment${n}.start`) + ', "%Y-%m-%d") IN (:dates)'

    const searchBetweenDates = `appointment${n}.start BETWEEN :startDate and :endDate`

    const testResultKindQuery = options?.allowTestPanels
      ? ''
      : ` AND testResult${n}.testResultKind = '${TestResultKind.TestType}'`

    const testTypeQuery = checkByTestTypeIds
      ? `testType${n}.id IN (:testTypeIds)`
      : `testType${n}.hormoneType IN (:hormoneTypes)`

    return (
      `(testResult${n}.appointmentId IS NOT NULL AND testResult${n}.status IN (:completedTestResultStatuses) ` +
      `AND testResultMeasurement${n}.result IS NOT NULL AND testResult${n}.patientId = ${patientId} ` +
      `AND ${testTypeQuery} AND ${options?.dates ? searchByDates : searchBetweenDates}${testResultKindQuery})`
    )
  }

  const params = {hormoneTypes, testTypeIds, ...options, completedTestResultStatuses}

  // Concatenates testResultMeasements.result and related testTypes.hormoneType and groups them by specimen collection date
  // Uses sub query below to select only latest results for each day
  const queryBuilder = testResultMeasurementRepository
    .createQueryBuilder('testResultMeasurement1')
    .select(`DATE_FORMAT(${toTz('appointment1.start')}, "%Y-%m-%d")`, 'date')
    .addSelect(
      `GROUP_CONCAT(
          CONCAT_WS("${sqlSeparatorForStimSheet}", 
            COALESCE(testResultMeasurement1.result, '-'), 
            COALESCE(testResult1.uuid, '-'), 
            COALESCE(testResult1.status, '-'), 
            COALESCE(testType1.id, '-'), 
            COALESCE(testType1.unit, ''),
            testType1.hormoneType 
          ) 
          ORDER BY testType1.hormoneType ASC SEPARATOR '${sqlSeparator}'
        )`,
      'results',
    )
    .innerJoin('testResultMeasurement1.testType', 'testType1')
    .innerJoin('testResultMeasurement1.testResult', 'testResult1')
    .innerJoin('testResult1.appointment', 'appointment1')
    .where(`(testResult1.patientId = ${patientId} AND testResultMeasurement1.result IS NOT NULL)`)

  // Selects latest combination of testType.hormoneType and appointment.start for each day between startDate and endDate
  const subqueryHormoneType = testResultMeasurementRepository
    .createQueryBuilder('testResultMeasurement2')
    .select('MAX(appointment2.start)')
    .addSelect('testType2.hormoneType')
    .innerJoin('testResultMeasurement2.testType', 'testType2')
    .innerJoin('testResultMeasurement2.testResult', 'testResult2')
    .innerJoin('testResult2.appointment', 'appointment2')
    .where(whereQuery(2), params)
    .groupBy(`testType2.hormoneType, DATE_FORMAT(${toTz('appointment2.start')}, "%Y-%m-%d")`)

  queryBuilder
    .andWhere(
      new Brackets((qb) => {
        qb.where(
          `(testType1.hormoneType, appointment1.start) IN (${subqueryHormoneType.getQuery()})`,
          params,
        )
        if (testTypeIds.length) {
          // Selects latest combination of testType.id and appointment.start for each day between startDate and endDate
          const subqueryTestTypeId = testResultMeasurementRepository
            .createQueryBuilder('testResultMeasurement3')
            .select('MAX(appointment3.start)')
            .addSelect('testType3.id')
            .innerJoin('testResultMeasurement3.testType', 'testType3')
            .innerJoin('testResultMeasurement3.testResult', 'testResult3')
            .innerJoin('testResult3.appointment', 'appointment3')
            .where(whereQuery(3, true), params)
            .groupBy(`testType3.id, DATE_FORMAT(${toTz('appointment3.start')}, "%Y-%m-%d")`)

          qb.orWhere(
            `(testType1.id, appointment1.start) IN (${subqueryTestTypeId.getQuery()})`,
            params,
          )
        }
      }),
    )
    .groupBy('date')

  const dbResults: {date: string; results: string}[] = await queryBuilder.getRawMany()

  return parseMeasurementsDbResults(dbResults, options, testTypeIds)
}

export const findPatientPlanWithSheetByUUID = (
  patientPlanRepository: Repository<PatientPlan>,
  uuid: string,
  sheetType: PlanSheetType,
): Promise<PatientPlan> => {
  return patientPlanRepository
    .createQueryBuilder('patientPlan')
    .leftJoinAndSelect('patientPlan.sheets', 'sheets', 'sheets.type = :sheetType', {sheetType})
    .leftJoinAndSelect('sheets.dayOneUpdatedByStaff', 'dayOneUpdatedByStaff')
    .leftJoinAndSelect('sheets.additionalDays', 'additionalDays')
    .leftJoinAndSelect('patientPlan.patientNotes', 'patientNotes', 'patientNotes.type = :type', {
      type: PlanSheetHelpers.getPlanSheetNoteType(null, sheetType),
    })
    .leftJoinAndSelect('patientNotes.updatedByStaff', 'updatedByStaff')
    .leftJoinAndSelect('patientNotes.patientDocument', 'patientDocument')
    .leftJoin('patientPlan.planType', 'planType')
    .leftJoin('planType.sheets', 'planTypeSheets', 'planTypeSheets.type = :sheetType', {
      sheetType,
    })
    .leftJoin('planTypeSheets.testTypesRelations', 'testTypesRelations')
    .leftJoin('testTypesRelations.testType', 'testType')
    .addSelect([
      'planType.id',
      'planTypeSheets.type',
      'planTypeSheets.planChecklistId',
      'planTypeSheets.planSheetActionListId',
      'testTypesRelations.sequence',
      'testType.id',
      'testType.uuid',
      'testType.abbreviation',
    ])
    .where('patientPlan.uuid = :uuid', {uuid})
    .orderBy('patientNotes.createdAt', 'ASC')
    .getOne()
}

export const findPatientPlanWithDetailsForSheetById = (
  patientPlanRepository: Repository<PatientPlan>,
  data: {id: number; dates: string[]; sheetType: PlanSheetType},
): Promise<PatientPlan> => {
  const {id, dates, sheetType} = data

  const patientNoteTypes = [sheetTypeToDayNoteType.get(sheetType)]

  if (sheetTypeToDayOrderNoteType.get(sheetType)) {
    patientNoteTypes.push(sheetTypeToDayOrderNoteType.get(sheetType))
  }

  return patientPlanRepository
    .createQueryBuilder('patientPlan')
    .where('patientPlan.id = :id', {id})
    .leftJoinAndSelect(
      'patientPlan.patientNotes',
      'patientNotes',
      `patientNotes.type IN (:types) AND patientNotes.date IN (:dates)`,
      {types: patientNoteTypes, dates},
    )
    .leftJoinAndSelect('patientPlan.sheets', 'sheets', 'sheets.type = :sheetType', {sheetType})
    .leftJoinAndSelect('sheets.dayOneUpdatedByStaff', 'dayOneUpdatedByStaff')
    .leftJoinAndSelect('sheets.signatures', 'signatures', `signatures.date IN (:dates)`, {dates})
    .leftJoinAndSelect('signatures.principal', 'principal')
    .leftJoinAndSelect('signatures.signatory', 'signatory')
    .leftJoinAndSelect('patientNotes.updatedByStaff', 'updatedByStaff')
    .leftJoinAndSelect('patientNotes.patientDocument', 'patientDocument')
    .orderBy('patientNotes.createdAt', 'ASC')
    .getOne()
}

export const findCathetersByPatientPlanUUID = (
  catheterTypeRepository: Repository<CatheterType>,
  patientPlanUUID: string,
): Promise<CatheterType[]> =>
  catheterTypeRepository.find({
    select: {uuid: true, title: true},
    where: {appointments: {patient: {patientPlans: {uuid: Equal(patientPlanUUID)}}}},
  })

export const findMedicationsForWorksheetPDF = (
  planMedicationRepository: Repository<PlanMedication>,
  patientPlanUUID: string,
): Promise<PlanMedication[]> =>
  planMedicationRepository.find({
    where: {patientPlan: {uuid: Equal(patientPlanUUID)}},
    select: {
      id: true,
      dosage: true,
      medicationCategoryId: true,
      name: true,
      medicationCategory: {id: true, title: true},
    },
    relations: {
      medicationCategory: true,
    },
  })
