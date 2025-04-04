import {testPubSubEvent} from '@functions-types'
import {
  PatientSeed,
  LabInfoSeed,
  TestResultSeed,
  ServiceProviderSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  ServiceCategoryInputSeed,
  TestTypeSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {
  DateTimeUtil,
  NestprojectConfigService,
  encodeInBase64,
  StructuredLogger,
  LogType,
} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {LabInfo, TestResult, TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus, SystemAuthUserId} from '@libs/common/enums'
import {
  LabInfoType,
  TestResultStatus,
  TestResultKind,
  OvaryLocation,
} from '@libs/data-layer/apps/clinic-test/enums'
import {v4} from 'uuid'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {handlerForDicomReport} from '../functions/test-orders-and-results/src/handle-dicom-report/handler'
import {HandlerForDicomReportErrorCodes} from '../functions/test-orders-and-results/src/handle-dicom-report/dicom-report.helper'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {UltrasoundReport} from '../functions/test-orders-and-results/src/handle-dicom-report/dicom-payloads.dto'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {TestResultHistorySeed} from '@seeds/firestore/test-result-history.seed'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

jest.setTimeout(10000)

jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/pubsub.adapter')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const appointmentPrefix = configService.get<string>('APPOINTMENT_ID_PREFIX')
const patientPrefix = configService.get<string>('PATIENT_ID_PREFIX')

const patientId = 828800101
const labId = 828800104
const serviceProviderId = 828800105
const testResultId = 828800106
const appointmentId = 828800108
const serviceCategoryId = 828800109
const serviceTypeId = 828800110
const testTypeId = 828800101

const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: 'dicom-handler',
  patientIdentifier: `${patientPrefix}000000123`,
}

const testTypeFolliclesData: Partial<TestType> = {
  id: testTypeId,
  processType: ProcessType.UltrasoundFolliclesMonitoring,
}

const testTypeDay3Data: Partial<TestType> = {
  id: testTypeId + 1,
  processType: ProcessType.UltrasoundDay3,
}

const testTypeOHSSData: Partial<TestType> = {
  id: testTypeId + 2,
  processType: ProcessType.UltrasoundOHSS,
}

const labInfoData: Partial<LabInfo> = {
  id: labId,
  uuid: v4(),
  name: 'Laboratory Name',
  location: 'Address',
  phone: '+454545454545',
  type: LabInfoType.Internal,
}

const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
}

const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId,
}

const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  status: AppointmentStatus.CheckedIn,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  identifier: `${appointmentPrefix}231231323`,
}

const appointmentCompletedData = {
  ...appointmentData,
  id: appointmentId + 1,
  identifier: `${appointmentPrefix}121321331`,
}

const appointmentDay3Data: Partial<Appointment> = {
  id: appointmentId + 2,
  status: AppointmentStatus.CheckedIn,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  identifier: `${appointmentPrefix}100000022`,
}

const appointmentOHSSData: Partial<Appointment> = {
  id: appointmentId + 3,
  status: AppointmentStatus.CheckedIn,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  identifier: `${appointmentPrefix}000000133`,
}

const testResultData: Partial<TestResult> = {
  id: testResultId,
  patientId,
  labId,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderId,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeFolliclesData.id,
  appointmentId,
}

const testResultCompletedData: Partial<TestResult> = {
  id: testResultId + 1,
  patientId,
  labId,
  status: TestResultStatus.Completed,
  testTypeId: testTypeFolliclesData.id,
  orderingPhysicianId: serviceProviderId,
  testResultKind: TestResultKind.TestType,
  appointmentId: appointmentCompletedData.id,
}

const testResultDay3Data: Partial<TestResult> = {
  id: testResultId + 2,
  patientId,
  labId,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderId,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeDay3Data.id,
  appointmentId: appointmentDay3Data.id,
}

const testResultUltrasoundOHSSData: Partial<TestResult> = {
  id: testResultId + 3,
  patientId,
  labId,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderId,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeOHSSData.id,
  appointmentId: appointmentOHSSData.id,
}

describe('Firebase Function: create-results-for-specimen', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let labInfoSeed: LabInfoSeed
  let serviceProviderSeed: ServiceProviderSeed
  let testResultSeed: TestResultSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let testTypeSeed: TestTypeSeed
  let testResultHistorySeed: TestResultHistorySeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    labInfoSeed = new LabInfoSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    testResultHistorySeed = new TestResultHistorySeed()

    await Promise.all([
      serviceCategorySeed.create(serviceCategoryData),
      patientSeed.create(patientData),
      labInfoSeed.create(labInfoData),
      testTypeSeed.createArray([testTypeFolliclesData, testTypeDay3Data, testTypeOHSSData]),
    ])
    await superTypeSeed.create(superTypeOtherFixture)
    await Promise.all([
      serviceTypeSeed.create(serviceTypeData),
      serviceProviderSeed.create(serviceProviderData),
    ])
    await appointmentSeed.createArray([
      appointmentData,
      appointmentCompletedData,
      appointmentDay3Data,
      appointmentOHSSData,
    ])
    await testResultSeed.createArray([
      testResultData,
      testResultCompletedData,
      testResultDay3Data,
      testResultUltrasoundOHSSData,
    ])
  })

  test('Should not update test result - wrong payload', async () => {
    const payload: Partial<UltrasoundReport> = {
      appointmentID: appointmentDay3Data.identifier,
      endometriumThickness: 122,
    }
    const message = testPubSubEvent(encodeInBase64(payload))

    const result = await handlerForDicomReport(message)
    expect(result).toBe(HandlerForDicomReportErrorCodes.ValidationError)

    const testResult = await testResultSeed.findOneByIdWithUltrasounds(testResultDay3Data.id)
    expect(testResult).toMatchObject<Partial<TestResult>>({
      status: TestResultStatus.Pending,
      machineComment: null,
    })
  })

  test('Should update test result with parsed ultrasound results - Follicle Report', async () => {
    const leftFollicles = [
      {avgDiam: 8, volume: 1},
      {avgDiam: 12.2, volume: 1},
      {avgDiam: 14.3, volume: 2},
    ]

    const rightFollicles = [
      {avgDiam: 8, volume: 1},
      {avgDiam: 20, volume: 1},
    ]

    const payload: UltrasoundReport = {
      patientID: `${patientPrefix}123`, // patientData.patientIdentifier DB value is DEV_PID000000123
      appointmentID: appointmentData.identifier,
      endometriumThickness: 122,
      leftFollicles,
      rightFollicles,
      comment: 'machine comment',
      fileName: 'random.dcm',
      requestId: 'requestId',
    }
    const message = testPubSubEvent(encodeInBase64(payload))

    await handlerForDicomReport(message)

    const testResult = await testResultSeed.findOneByIdWithUltrasounds(testResultId)

    const changes = await testResultHistorySeed.findByTestResultId(testResultId)
    expect(changes.length).toBeGreaterThanOrEqual(1)

    expect(testResult.testResultOvaryMeasurements.length).toBe(2)
    expect(testResult).toMatchObject<Partial<TestResult>>({
      updatedBy: SystemAuthUserId.UltrasoundReportHandler,
      revisionId: expect.any(String),
      status: TestResultStatus.WaitingCompletion,
      machineComment: payload.comment,
      testResultOvaryMeasurements: expect.arrayContaining([
        expect.objectContaining({
          testResultId,
          location: OvaryLocation.LeftOvary,
          totalFollicles: null,
          follMoreThanOneCm: 2,
          follMoreThanOneCmSizes: ['1.22', '1.43'],
          follMoreThanOneCmVolumes: ['1', '2'],
          follMoreThanOneCmAverageVolume: 1.5,
          follMoreThanOneCmTotalVolume: 3,
          revisionId: expect.any(String),
        }),
        expect.objectContaining({
          testResultId,
          location: OvaryLocation.RightOvary,
          totalFollicles: null,
          follMoreThanOneCm: 1,
          follMoreThanOneCmSizes: ['2'],
          follMoreThanOneCmVolumes: ['1'],
          follMoreThanOneCmAverageVolume: leftFollicles[1].volume,
          follMoreThanOneCmTotalVolume: leftFollicles[1].volume,
          revisionId: expect.any(String),
        }),
      ]),
      testResultUterusMeasurement: expect.objectContaining({
        testResultId,
        endometriumThickness: 12.2,
        revisionId: expect.any(String),
      }),
    })
  })

  test('Should update test result with parsed ultrasound results - Day 3 Report', async () => {
    const payload: UltrasoundReport = {
      patientID: patientData.patientIdentifier,
      appointmentID: `${appointmentPrefix}100000022`, // appointmentDay3Data.identifier DB value is 'DEV_A1100000022'
      endometriumThickness: 122,
      leftFollicles: [
        {avgDiam: 8, volume: 1},
        {avgDiam: 20, volume: 1},
      ],
      leftOvary: {
        length: 1,
        width: 2,
        height: 3,
        volume: 6,
      },
      rightFollicles: [
        {avgDiam: 8, volume: 1},
        {avgDiam: 20, volume: 1},
      ],
      rightOvary: {
        length: 3,
        width: 2,
        height: 1,
        volume: 6,
      },
      uterus: {
        length: 1,
        width: 2,
        height: 3,
        volume: 5,
        utTrace: 1.2,
      },
      fileName: 'random.dcm',
      requestId: 'requestId',
    }

    const message = testPubSubEvent(encodeInBase64(payload))

    await handlerForDicomReport(message)

    const testResult = await testResultSeed.findOneByIdWithUltrasounds(testResultDay3Data.id)

    expect(testResult.testResultOvaryMeasurements.length).toBe(2)
    expect(testResult).toMatchObject<Partial<TestResult>>({
      status: TestResultStatus.WaitingCompletion,
      machineComment: null,
      revisionId: expect.any(String),
      testResultOvaryMeasurements: expect.arrayContaining([
        expect.objectContaining({
          testResultId: testResultDay3Data.id,
          location: OvaryLocation.RightOvary,
          totalFollicles: null,
          follMoreThanOneCm: 1,
          follMoreThanOneCmSizes: ['2'],
          follMoreThanOneCmVolumes: ['1'],
          revisionId: expect.any(String),
          ...payload.rightOvary,
        }),
        expect.objectContaining({
          testResultId: testResultDay3Data.id,
          location: OvaryLocation.LeftOvary,
          totalFollicles: null,
          follMoreThanOneCm: 1,
          follMoreThanOneCmSizes: ['2'],
          follMoreThanOneCmVolumes: ['1'],
          revisionId: expect.any(String),
          ...payload.leftOvary,
        }),
      ]),
      testResultUterusMeasurement: expect.objectContaining({
        testResultId: testResultDay3Data.id,
        endometriumThickness: 12.2,
        revisionId: expect.any(String),
        ...payload.uterus,
      }),
    })
  })

  test('Should update test result with parsed ultrasound results - OHSS Report, update appointment to Done', async () => {
    const payload: UltrasoundReport = {
      patientID: patientData.patientIdentifier,
      appointmentID: `${appointmentPrefix}000000133`, // appointmentOHSSData.identifier DB value is 'DEV_A000000133'
      endometriumThickness: 122,
      leftOvary: {
        length: 1,
        width: 2,
        height: 3,
        volume: 6,
        numberOfCysts: 2,
        threeLargestAvgSize: ['1', '4', '2'],
      },
      rightOvary: {
        length: 3,
        width: 2,
        height: 1,
        volume: 6,
        numberOfCysts: 1,
        threeLargestAvgSize: ['2', '3', '4'],
      },
      uterus: {
        length: 1,
        width: 2,
        height: 3,
        volume: 5,
        utTrace: 1.2,
      },
      fileName: 'random.dcm',
      requestId: 'requestId',
    }

    const message = testPubSubEvent(encodeInBase64(payload))

    await handlerForDicomReport(message)

    const testResult = await testResultSeed.findOneByIdWithUltrasounds(
      testResultUltrasoundOHSSData.id,
    )

    const changes = await testResultHistorySeed.findByTestResultId(testResultId)
    expect(changes.length).toBeGreaterThanOrEqual(1)

    expect(testResult.testResultOHSSOvaryMeasurements.length).toBe(2)
    expect(testResult.testResultOHSSOvaryMeasurements[0].length).toBe(payload.rightOvary.length)
    expect(testResult.testResultOHSSOvaryMeasurements[0].width).toBe(payload.rightOvary.width)
    expect(testResult.testResultOHSSOvaryMeasurements[0].revisionId).toBeTruthy()
    expect(testResult.testResultOHSSOvaryMeasurements[0].approxNumberOfCysts).toBe(
      payload.rightOvary.numberOfCysts,
    )
    expect(testResult.testResultOHSSOvaryMeasurements[0].threeLargestAvgInSize.length).toBe(
      payload.rightOvary.threeLargestAvgSize.length,
    )
    expect(testResult.status).toBe(TestResultStatus.WaitingCompletion)

    const appt = await appointmentSeed.findById(appointmentOHSSData.id)

    expect(appt.status).toBe(AppointmentStatus.Done)
  })

  test('Should not update test result - result is already not Pending', async () => {
    const payload: UltrasoundReport = {
      patientID: patientData.patientIdentifier,
      appointmentID: appointmentData.identifier,
      endometriumThickness: 1.2,
      comment: 'new machine comment',
      fileName: 'random.dcm',
      requestId: 'requestId',
    }

    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')
    const message = testPubSubEvent(encodeInBase64(payload))

    const result = await handlerForDicomReport(message)
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.HandlerForDicomReportFunctions.HandlerForDicomReport,
      activityLogs.HandlerForDicomReportActions.ResultHasAlreadyBeenEntered,
      {
        requestId: payload.requestId,
        message: `The result has already been entered. FileName: ${payload.fileName} Patient ID(${patientData.id}) and/or Appointment ID(${appointmentData.id}). Result Status: WaitingCompletion`,
      },
      LogType.UltrasoundMachineIntegration,
    )
    spyOnLogger.mockRestore()
    expect(result).toBe(HandlerForDicomReportErrorCodes.TestResultIsNotPending)

    const testResult = await testResultSeed.findOneByIdWithUltrasounds(testResultCompletedData.id)
    expect(testResult).toMatchObject<Partial<TestResult>>({
      status: TestResultStatus.Completed,
      machineComment: null,
    })
  })

  test('Should not update test result - appointment was not found', async () => {
    const payload: UltrasoundReport = {
      patientID: patientData.patientIdentifier,
      appointmentID: 'fail',
      endometriumThickness: 12,
      comment: 'new machine comment',
      fileName: 'random.dcm',
      requestId: 'requestId',
    }
    const message = testPubSubEvent(encodeInBase64(payload))

    const result = await handlerForDicomReport(message)
    expect(result).toBe(HandlerForDicomReportErrorCodes.AppointmentNotFound)
  })

  test('Should not update test result - patient was not found', async () => {
    const payload: UltrasoundReport = {
      patientID: 'fail',
      appointmentID: appointmentCompletedData.identifier,
      endometriumThickness: 12,
      comment: 'new machine comment',
      fileName: 'random.dcm',
      requestId: 'requestId',
    }
    const message = testPubSubEvent(encodeInBase64(payload))

    const result = await handlerForDicomReport(message)
    expect(result).toBe(HandlerForDicomReportErrorCodes.PatientNotFound)
  })

  test('Should not update test result - test result was not found', async () => {
    await testResultSeed.removeByIds([testResultId])

    const payload: UltrasoundReport = {
      patientID: patientData.patientIdentifier,
      appointmentID: appointmentData.identifier,
      endometriumThickness: 12,
      comment: 'new machine comment',
      fileName: 'random.dcm',
      requestId: 'requestId',
    }
    const message = testPubSubEvent(encodeInBase64(payload))

    const result = await handlerForDicomReport(message)
    expect(result).toBe(HandlerForDicomReportErrorCodes.TestResultNotFound)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await testResultSeed.removeByIds([
      testResultId,
      testResultCompletedData.id,
      testResultDay3Data.id,
      testResultUltrasoundOHSSData.id,
    ])
    await appointmentSeed.removeByIds([
      appointmentId,
      appointmentCompletedData.id,
      appointmentDay3Data.id,
      appointmentOHSSData.id,
    ])

    await Promise.all([
      serviceTypeSeed.removeById(serviceTypeId),
      serviceProviderSeed.removeById(serviceProviderId),
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])

    await Promise.all([
      serviceCategorySeed.removeById(serviceCategoryId),
      patientSeed.removeByIds([patientId]),
      labInfoSeed.removeByIds([labId]),
      testTypeSeed.removeByIds([
        testTypeDay3Data.id,
        testTypeFolliclesData.id,
        testTypeOHSSData.id,
      ]),
    ])

    await dataSource.destroy()
  })
})
