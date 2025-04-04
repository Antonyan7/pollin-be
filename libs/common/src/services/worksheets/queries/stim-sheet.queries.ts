import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {SignatureSource} from '@libs/data-layer/apps/plan/enums/signature.enum'
import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientNoteTypeEnum} from '@libs/services-common/enums'
import {Brackets, Equal, In, LessThanOrEqual, Repository} from 'typeorm'
import {
  sheetTypeToDayNoteType,
  sheetTypeToDayOrderNoteType,
} from '../helpers/worksheet-common.helper'
import {
  convertTimeColumnToTimezone,
  sqlSeparatorForStimSheet,
} from '@libs/common/helpers/repository-helper'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {TestResult, TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {completedTestResultStatuses} from '@libs/data-layer/apps/clinic-test/enums'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {ultrasoundWorkflows} from '@libs/data-layer/apps/scheduling/enums'
import {AppointmentStatus} from '@libs/common/enums'

export const getPatientPlanStimSheet = (
  patientPlanRepository: Repository<PatientPlan>,
  data: {
    patientPlanUUID: string
    noteType: PatientNoteTypeEnum
    sheetType: PlanSheetType
  },
): Promise<PatientPlan> => {
  const {patientPlanUUID, noteType, sheetType} = data

  if (!patientPlanUUID) {
    return null
  }

  return patientPlanRepository
    .createQueryBuilder('patientPlan')
    .where('patientPlan.uuid = :uuid', {uuid: patientPlanUUID})
    .leftJoinAndSelect('patientPlan.sheets', 'sheets', 'sheets.type = :sheetType', {sheetType})
    .leftJoin('sheets.additionalDays', 'additionalDays')
    .leftJoinAndSelect('sheets.dayOneUpdatedByStaff', 'dayOneUpdatedByStaff')
    .leftJoinAndSelect(
      'patientPlan.patientNotes',
      'patientNotes',
      `patientNotes.type = :noteType`,
      {
        noteType,
      },
    )
    .leftJoinAndSelect('patientNotes.updatedByStaff', 'updatedByStaff')
    .leftJoinAndSelect('patientNotes.patientDocument', 'patientDocument')
    .leftJoinAndSelect(
      'sheets.signatures',
      'signatures',
      'signatures.date IS NULL AND signatures.source = :source',
      {source: SignatureSource.PatientPlanSheet},
    )
    .leftJoin('patientPlan.planType', 'planType')
    .leftJoin('planType.sheets', 'planTypeSheets', 'planTypeSheets.type = :sheetType', {
      sheetType,
    })
    .leftJoin('planTypeSheets.testTypesRelations', 'testTypesRelations')
    .leftJoin('testTypesRelations.testType', 'testType')
    .leftJoinAndSelect('signatures.principal', 'principal')
    .leftJoinAndSelect('signatures.signatory', 'signatory')
    .addSelect([
      'additionalDays.date',
      'planType.id',
      'planTypeSheets.type',
      'planTypeSheets.planChecklistId',
      'planTypeSheets.planSheetActionListId',
      'testTypesRelations.testTypeId',
      'testTypesRelations.sequence',
      'testType.id',
      'testType.uuid',
      'testType.abbreviation',
    ])
    .orderBy('patientNotes.createdAt', 'ASC')
    .addOrderBy('testTypesRelations.sequence', 'ASC')
    .getOne()
}

export const getNotesForStimSheet = (
  patientNoteRepository: Repository<PatientNote>,
  data: {
    patientPlanId: number
    endDate: string
    sheetType: PlanSheetType
  },
): Promise<PatientNote[]> => {
  const {patientPlanId, endDate, sheetType} = data

  const patientNoteTypes = [sheetTypeToDayNoteType.get(sheetType)]

  if (sheetTypeToDayOrderNoteType.get(sheetType)) {
    patientNoteTypes.push(sheetTypeToDayOrderNoteType.get(sheetType))
  }

  return patientNoteRepository.find({
    select: {
      id: true,
      uuid: true,
      patientPlanId: true,
      content: true,
      type: true,
      date: true,
      createdAt: true,
      patientDocument: {
        id: true,
        originalFileName: true,
        name: true,
        type: true,
        uuid: true,
        url: true,
      },
      updatedByStaffAt: true,
      updatedByStaff: {
        firstName: true,
        lastName: true,
      },
    },
    where: {
      patientPlanId: Equal(patientPlanId),
      type: In(patientNoteTypes),
      date: LessThanOrEqual(endDate),
    },
    relations: {updatedByStaff: true, patientDocument: true},
    order: {
      createdAt: 'ASC',
    },
  })
}

export const findApptsStimSheetToShowDaysByPatientId = async (
  appointmentRepository: Repository<Appointment>,
  patientId: number,
  data: {startDateUTC: Date; endDateUTC: Date; dates: string[]; testTypes: TestType[]},
): Promise<{appointmentIds: number[]; appointmentDatesToTestTypeIds: Map<string, number[]>}> => {
  const testTypeIds = data.testTypes.map(({id}) => id)

  const appointmentStartToTzDate = `DATE_FORMAT(${convertTimeColumnToTimezone(
    'appointment.start',
  )}, '%Y-%m-%d')`

  const queryBuilder = appointmentRepository
    .createQueryBuilder('appointment')
    .select([
      `GROUP_CONCAT(CONCAT_WS("${sqlSeparatorForStimSheet}", ${appointmentStartToTzDate}, milestoneToTestTypesOrPanels.testTypeId)) as sheetDates`,
      `GROUP_CONCAT(appointment.id) as appointmentIds`,
    ])
    .leftJoin(
      'appointment.serviceType',
      'serviceType',
      'serviceType.showResultsOnStimSheet is true',
    )
    .leftJoin('appointment.patientMilestones', 'patientMilestones')

  if (testTypeIds.length) {
    queryBuilder.leftJoin(
      'patientMilestones.milestoneToTestTypesOrPanels',
      'milestoneToTestTypesOrPanels',
      'milestoneToTestTypesOrPanels.testTypeId IN (:...testTypeIds)',
      {testTypeIds},
    )
  } else {
    queryBuilder.leftJoin(
      'patientMilestones.milestoneToTestTypesOrPanels',
      'milestoneToTestTypesOrPanels',
      '1 = 0',
    )
  }

  queryBuilder
    .where('appointment.patientId = :patientId', {patientId})
    .andWhere(
      new Brackets((qb) => {
        qb.where(`serviceType.showResultsOnStimSheet is true`)

        if (testTypeIds.length) {
          qb.orWhere(
            `(milestoneToTestTypesOrPanels.id IS NOT NULL AND appointment.status NOT IN (:statuses))`,
            {
              statuses: [AppointmentStatus.Cancelled, AppointmentStatus.NoShow],
            },
          )
        }
      }),
    )
    .andWhere(
      `((appointment.start BETWEEN :startDateUTC and :endDateUTC)`.concat(
        data.dates?.length
          ? ` OR (appointment.start <= :startDateUTC and ${appointmentStartToTzDate} IN (:dates)))`
          : `)`,
      ),
      data,
    )

  const {sheetDates, appointmentIds} = await queryBuilder.getRawOne()
  const appointmentDatesToTestTypeIds = new Map<string, number[]>()
  if (sheetDates) {
    sheetDates.split(',').forEach((entry) => {
      const [date, testTypeId] = entry.split(sqlSeparatorForStimSheet)
      if (!appointmentDatesToTestTypeIds.has(date)) {
        appointmentDatesToTestTypeIds.set(date, [])
      }

      if (testTypeId) {
        appointmentDatesToTestTypeIds.get(date)?.push(Number(testTypeId))
      }
    })
  }

  return {
    appointmentIds: appointmentIds?.split(',') ?? [],
    appointmentDatesToTestTypeIds,
  }
}

export const findUltrasoundResultsForStimSheet = async (
  testResultRepository: Repository<TestResult>,
  patientId: number,
  dates: string[],
): Promise<TestResult[]> => {
  const toTz = convertTimeColumnToTimezone

  const appointmentDate = 'DATE_FORMAT(' + toTz(`appointment.start`) + ', "%Y-%m-%d")'

  return testResultRepository
    .createQueryBuilder('testResult')
    .select([
      'testResult.id',
      'testResult.uuid',
      'testResult.status',
      'appointment.start',
      'testResultUterusMeasurement',
      'testResultOvaryMeasurements',
      'testResultOvaryCystMeasurements',
      'testType',
    ])
    .leftJoin('testResult.testResultUterusMeasurement', 'testResultUterusMeasurement')
    .leftJoin('testResult.testResultOvaryMeasurements', 'testResultOvaryMeasurements')
    .innerJoin('testResult.appointment', 'appointment', `${appointmentDate} IN (:dates)`, {dates})
    .leftJoin('testResult.testType', 'testType')
    .leftJoin(
      'testResultOvaryMeasurements.testResultOvaryCystMeasurements',
      'testResultOvaryCystMeasurements',
    )
    .where('testResult.patientId = :patientId', {patientId})
    .andWhere('testResult.status in (:statuses)', {
      statuses: completedTestResultStatuses,
    })
    .andWhere('testType.processType in (:processTypes)', {
      processTypes: [ProcessType.UltrasoundFolliclesMonitoring, ProcessType.UltrasoundDay3],
    })
    .orderBy('appointment.start', 'ASC')
    .addOrderBy('testResultOvaryCystMeasurements.createdAt', 'ASC')
    .getMany()
}

export const findAppointmentsForStimSheetByIds = async (
  appointmentRepository: Repository<Appointment>,
  appointmentIds: number[],
): Promise<Appointment[]> => {
  if (!appointmentIds.length) {
    return []
  }

  return appointmentRepository
    .createQueryBuilder('appointment')
    .innerJoin('appointment.serviceType', 'serviceType')
    .leftJoin('serviceType.superType', 'superType')
    .leftJoin('appointment.catheterType', 'catheterType')
    .leftJoin(
      'appointment.testResults',
      'testResults',
      'superType.specialWorkflow in (:specialWorkflows)',
      {specialWorkflows: ultrasoundWorkflows},
    )
    .leftJoin('testResults.testType', 'testType')
    .leftJoin('testResults.testPanel', 'testPanel')
    .select([
      'appointment.uuid',
      'appointment.id',
      'appointment.start',
      'appointment.identifier',
      'appointment.uncomplicatedProcedure',
      'superType.id',
      'superType.specialWorkflow',
      'serviceType.abbreviation',
      'serviceType.name',
      'serviceType.hasCatheterSelection',
      'serviceType.hasUncomplicatedProcedure',
      'serviceType.hasLinkToEncounters',
      'catheterType.uuid',
      'testResults.id',
      'testResults.machineComment',
      'testType.title',
      'testPanel.title',
    ])
    .where(`appointment.id IN (:appointmentIds)`, {
      appointmentIds,
    })
    .andWhere('appointment.status NOT IN (:statuses)', {
      statuses: [AppointmentStatus.NoShow, AppointmentStatus.Cancelled],
    })
    .orderBy('appointment.start')
    .addOrderBy('testResults.createdAt', 'DESC')
    .getMany()
}
