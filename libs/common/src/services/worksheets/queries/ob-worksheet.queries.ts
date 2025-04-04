import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {completedTestResultStatuses} from '@libs/data-layer/apps/clinic-test/enums'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {Repository} from 'typeorm'

export const findUltrasoundResultsForOBWorksheet = async (
  testResultRepository: Repository<TestResult>,
  data: {
    patientId: number
    startDate: Date
    endDate: Date
  },
): Promise<TestResult[]> => {
  const {patientId, startDate, endDate} = data

  return testResultRepository
    .createQueryBuilder('testResult')
    .select([
      'testResult.id',
      'appointment.start',
      'testResultObUltrasound',
      'testType',
      'testResult.status',
      'testResult.uuid',
    ])
    .innerJoin('testResult.testResultObUltrasound', 'testResultObUltrasound')
    .innerJoinAndSelect(
      'testResult.appointment',
      'appointment',
      'appointment.start BETWEEN :startDate AND :endDate',
      {startDate, endDate},
    )
    .leftJoin('testResult.testType', 'testType')
    .where('testResult.patientId = :patientId', {patientId})
    .andWhere('testResult.status in (:statuses)', {
      statuses: completedTestResultStatuses,
    })
    .andWhere('testType.processType = :processType', {
      processType: ProcessType.UltrasoundObstetric,
    })
    .orderBy('testResult.completedOn', 'ASC')
    .getMany()
}
