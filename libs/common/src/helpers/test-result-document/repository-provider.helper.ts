import {Repository} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  TestResult,
  TestResultObUltrasound,
  TestResultOHSSFluidMeasurement,
  TestResultOHSSOvaryMeasurement,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

type Repositories = {
  testResultRepository: Repository<TestResult>
  testResultObUltrasoundRepository: Repository<TestResultObUltrasound>
  testResultOHSSOvaryMeasurementRepository: Repository<TestResultOHSSOvaryMeasurement>
  testResultOHSSFluidMeasurementRepository: Repository<TestResultOHSSFluidMeasurement>
}

export const getRepositories = async (): Promise<Repositories> => {
  const dataSource = await getCreateDatabaseConnection()
  const testResultRepository = dataSource.getRepository(TestResult)
  const testResultObUltrasoundRepository = dataSource.getRepository(TestResultObUltrasound)
  const testResultOHSSOvaryMeasurementRepository = dataSource.getRepository(
    TestResultOHSSOvaryMeasurement,
  )
  const testResultOHSSFluidMeasurementRepository = dataSource.getRepository(
    TestResultOHSSFluidMeasurement,
  )

  return {
    testResultRepository,
    testResultObUltrasoundRepository,
    testResultOHSSOvaryMeasurementRepository,
    testResultOHSSFluidMeasurementRepository,
  }
}
