import {testPubSubEvent} from '@functions-types'
import {
  mockedUltrasoundReportFile,
  mockedUltrasoundReportFileCorrupted,
  mockedUltrasoundReportFileWithMissingFields,
  mockedUltrasoundReportFileWithoutOhip,
} from '@libs/common/adapters/firebase/__mocks__/firebase-storage-adapter'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {encodeStoragePubSubMessage} from '@libs/common/utils/google-storage.utils'
import {DataSource} from 'typeorm'
import {
  HandlerForFinalReportErrorCodes,
  formatHL7DateToISO,
  formatUltrasoundFinalReportServiceName,
} from '@firebase-platform/functions/test-orders-and-results/src/handle-ultrasound-final-report/final-report.helper'
import {handlerForUltrasoundFinalReports} from '@firebase-platform/functions/test-orders-and-results/src/handle-ultrasound-final-report/handler'
import {
  LabInfoSeed,
  PatientSeed,
  ServiceProviderSeed,
  TestResultAttachmentSeed,
  TestResultSeed,
  TestResultUltrasoundFinalReportSeed,
} from '@seeds/typeorm'
import {SystemAuthUserId} from '@libs/common/enums'
import {
  FinalReportStatus,
  FinalResultType,
  ResultStatusForPatient,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {UserType} from '@libs/services-common/enums'
import {
  LabInfo,
  TestResult,
  TestResultAttachment,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {FirebaseStorageAdapter} from '@libs/common/adapters'

jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/pubsub.adapter')
jest.mock('../../libs/common/src/adapters/firebase/firebase-storage-adapter')
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
jest.setTimeout(15000)

const ultrasoundFinalReportResult = {
  status: FinalReportStatus.Pending,
  patientFirstName: 'Firstname',
  patientLastName: 'Lastname',
  patientAddress: 'Address',
  patientPhone: '(647) 836-6647',
  patientDateOfBirth: '1986-08-28',
  name: 'Sonohysterogram with Echovist',
  appointmentDate: '2023-07-27',
  updatedBy: SystemAuthUserId.UltrasoundFinalReportHandler,
  revisionId: expect.any(String),
}

export const serviceProviderFixture: Partial<ServiceProvider> = {
  id: 1016,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110002',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  description: 'Provider Description Fixture',
  designation: 'MD',
}
export const patientFixture: Partial<Patient> = {
  id: 29448,
  uuid: 25948 + 'c7-2a3f-47d0-8790-c776fa1e1009',
  authUserId: 'FInalResultAuthUserId',
  firstName: 'FInalResultAuthUserId',
  lastName: 'FInalResultAuthUserId',
  middleName: 'FInalResultAuthUserId',
  userType: UserType.Patient,
  ohipCardNumber: '1276040183',
  ohipCardVersionCode: 'TV',
}

export const labInfoFixture: Partial<LabInfo> = {
  id: 10606,
  uuid: '6d5bb10b-1117-4cdc-8705-63f1eecd1006',
  name: 'MTO Laboratory Name',
  location: 'Address MTO',
  phone: '+454545451006',
}

const externalPatientId = '1655406'
const externalAppointmentId = 'MS059763'
export const testResultFixture: Partial<TestResult> = {
  id: 29449,
  patientId: patientFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,

  //needed for this test
  externalPatientId,
  externalAppointmentId,
}

describe('Firebase Function: handle ultrasound final report', () => {
  let dataSource: DataSource

  let testResultUltrasoundFinalReportSeed: TestResultUltrasoundFinalReportSeed
  let testResultSeed: TestResultSeed
  let patientSeed: PatientSeed
  let serviceProviderSeed: ServiceProviderSeed
  let labInfoSeed: LabInfoSeed
  let testResultAttachmentSeed: TestResultAttachmentSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    testResultUltrasoundFinalReportSeed = new TestResultUltrasoundFinalReportSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    labInfoSeed = new LabInfoSeed(dataSource)
    testResultAttachmentSeed = new TestResultAttachmentSeed(dataSource)

    await patientSeed.create(patientFixture)
    await serviceProviderSeed.create(serviceProviderFixture)
    await labInfoSeed.create(labInfoFixture)
    await testResultSeed.create(testResultFixture)
  })

  it('should validate service name function', () => {
    const result = 'Sonohysterogram with Echovist'

    const testInputStrings = [
      'J476_[Catheter Sono]Sonohysterogram with Echovist',
      'Sonohysterogram with Echovist',
      '[Catheter Sono]Sonohysterogram with Echovist',
      'J476_Sonohysterogram with Echovist',
    ]

    testInputStrings.forEach((inputString) =>
      expect(formatUltrasoundFinalReportServiceName(inputString)).toBe(result),
    )

    expect(formatUltrasoundFinalReportServiceName('SOMECODE_[AdditionalText]Test')).toMatch('Test')
  })

  it('should validate date formatting', () => {
    expect(formatHL7DateToISO('20230203')).toBe('2023-02-03')
    expect(formatHL7DateToISO('')).toBe(null)
  })

  it(`1. should parse and save ultrasound final report correctly
      2. Should find testResult by externalIds and set references and attache pdf into testResult from hl7 `, async () => {
    const spyStorageAdapter = jest.spyOn(
      FirebaseStorageAdapter.prototype,
      'uploadBase64PrivateFile',
    )
    spyStorageAdapter.mockResolvedValue('FilePath')

    const data = {
      name: mockedUltrasoundReportFile,
    }

    const pubSubEvent = testPubSubEvent(encodeStoragePubSubMessage(data))
    await handlerForUltrasoundFinalReports(pubSubEvent)

    const finalReport = await testResultUltrasoundFinalReportSeed.findOneByFilename(
      mockedUltrasoundReportFile,
    )
    expect(finalReport).toMatchObject({
      ...ultrasoundFinalReportResult,
      patientAddress: '47 Morton Way Brampton, CANON L6Y 2R6',
      name: 'Transvaginal Ultrasound - Complete, Pelvic ultrasound - Complete',
      ohip: '1276-040-183 TV',
      hl7FileName: mockedUltrasoundReportFile,
      externalAppointmentId: externalAppointmentId,
      externalPatientId: externalPatientId,
      status: FinalReportStatus.Completed,
      testResultId: testResultFixture.id,
    })

    /**
     *  Should match testResult by ExternalIds and attach pdf to it
     */
    const testResultDb = await testResultSeed.findOneByIdWithFinalReport(testResultFixture.id)
    expect(testResultDb).toMatchObject({
      status: TestResultStatus.WaitingCompletion,
    } as TestResult)
    expect(testResultDb.ultrasoundFinalReport.id).toBe(finalReport.id)

    const attachment = await testResultAttachmentSeed.findOneByTestResultId(testResultFixture.id)
    expect(attachment).toMatchObject({
      testResultId: testResultFixture.id,
      title: expect.any(String),
      url: expect.any(String),
    } as TestResultAttachment)

    spyStorageAdapter.mockClear()

    /**
     * Should not upload duplicate attachment
     */
    await handlerForUltrasoundFinalReports(pubSubEvent)
    const uploadedAttachments = await testResultAttachmentSeed.testResultAttachmentRepository.find({
      where: {testResultId: testResultFixture.id},
    })
    expect(uploadedAttachments.length).toBe(1)
  })

  it('should parse and save ultrasound final report correctly - without ohip', async () => {
    const data = {
      name: mockedUltrasoundReportFileWithoutOhip,
    }
    const pubSubEvent = testPubSubEvent(encodeStoragePubSubMessage(data))

    await handlerForUltrasoundFinalReports(pubSubEvent)

    const finalReport = await testResultUltrasoundFinalReportSeed.findOneByFilename(
      mockedUltrasoundReportFileWithoutOhip,
    )
    expect(finalReport).toMatchObject({
      ...ultrasoundFinalReportResult,
      ohip: null,
      hl7FileName: mockedUltrasoundReportFileWithoutOhip,
    })
  })

  it('should not save ultrasound final report - some fields are missing', async () => {
    const data = {
      name: mockedUltrasoundReportFileWithMissingFields,
    }
    const pubSubEvent = testPubSubEvent(encodeStoragePubSubMessage(data))

    const result = await handlerForUltrasoundFinalReports(pubSubEvent)

    const finalReport = await testResultUltrasoundFinalReportSeed.findOneByFilename(
      mockedUltrasoundReportFileWithMissingFields,
    )

    expect(result).toBe(HandlerForFinalReportErrorCodes.RequiredFieldsMissing)
    expect(finalReport).toBeFalsy()
  })

  it('should not save ultrasound final report - file is corrupter', async () => {
    const data = {
      name: mockedUltrasoundReportFileCorrupted,
    }
    const pubSubEvent = testPubSubEvent(encodeStoragePubSubMessage(data))

    const result = await handlerForUltrasoundFinalReports(pubSubEvent)
    const finalReport = await testResultUltrasoundFinalReportSeed.findOneByFilename(
      mockedUltrasoundReportFileCorrupted,
    )

    expect(result).toBe(HandlerForFinalReportErrorCodes.FileCorrupted)
    expect(finalReport).toBeFalsy()
  })

  it('should not save ultrasound final report - not root file uploaded', async () => {
    const data = {
      name: 'processed/example',
    }
    const pubSubEvent = testPubSubEvent(encodeStoragePubSubMessage(data))

    const result = await handlerForUltrasoundFinalReports(pubSubEvent)

    const finalReport = await testResultUltrasoundFinalReportSeed.findOneByFilename(
      mockedUltrasoundReportFileWithMissingFields,
    )

    expect(result).toBe(HandlerForFinalReportErrorCodes.NotRootFileUploaded)
    expect(finalReport).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await testResultUltrasoundFinalReportSeed.removeByFilenames([
      mockedUltrasoundReportFile,
      mockedUltrasoundReportFileWithoutOhip,
    ])

    await testResultAttachmentSeed.removeByTestResultId(testResultFixture.id)
    await testResultSeed.removeByIds([testResultFixture.id])
    await labInfoSeed.removeByIds([labInfoFixture.id])
    await serviceProviderSeed.removeById(serviceProviderFixture.id)
    await patientSeed.removeByIds([patientFixture.id])

    await dataSource.destroy()
  })
})
