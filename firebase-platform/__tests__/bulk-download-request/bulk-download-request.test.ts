import {testPubSubEvent} from '@functions-types'
import {BulkDownloadRequestSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  BulkDownloadRequest,
  BulkDownloadRequestItem,
  BulkDownloadRequestItemType,
  Patient,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {ExternalDoctor, Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {BulkDownloadRequestStatus} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {
  BulkDownloadPubSubPayload,
  BulkDownloadSchema,
} from '@libs/common/model/proto-schemas/bulk-download.schema'
import {ZipService} from '@libs/common/services/zip.service'
import {PDFMergerService} from '@libs/common/services/pdf-merger.service'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {handlerBulkDownloadGenerate} from '@firebase-platform/functions/patients/src/handlers/handle-bulk-download-generate/handler'
import {generateMergedPDFDocument} from '@firebase-platform/functions/patients/src/handlers/handle-bulk-download-generate/helpers/document-merged.helper'
import {mockedAuditMetadata} from '../fixtures/audit.fixture'
import {
  bulkDownloadRequestForMergedTypeFixture,
  bulkDownloadRequestForZipTypeFixture,
  bulkDownloadRequestForZipTypeToFailFixture,
  createBulkDownloadRequestSeeds,
  encounterTypeFixture,
  patientEncounterFixture,
  patientEncounterToShowFirstFixture,
  patientPlanSheetEPLFixture,
  patientPlanSheetHCGFixture,
  patientPlanSheetOBFixture,
  patientPlanSheetPrimingFixture,
  patientPlanSheetStim2Fixture,
  patientPlanSheetStimFixture,
  patientPrescriptionArchivedFixture,
  patientPrescriptionFixture,
  patientStaffNoteFixture,
  planTypeFixture,
  removeBulkDownloadRequestSeeds,
  staffForResults,
  staffNoteTypeFixture,
  testResultFixture,
  testTypeTSHFixture,
} from './seeds/bulk-download-request.seeds'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {FileZipper} from '@firebase-platform/functions/patients/src/handlers/handle-bulk-download-generate/helpers/document-zipped.helper'
import {Config} from '@config'
import {DateTimeUtil} from '@libs/common'
import {EncounterFileDefintionHelpers} from '@libs/common/helpers/encounter-document/encounter-file-definition.helper'
import {StaffNoteFileDefintionHelpers} from '@libs/common/helpers/staff-note-document/staff-note-file-definition.helper'

jest.setTimeout(10000)

jest.mock('@libs/common/adapters/firebase/firebase-auth.adapter')
jest.mock('@libs/common/adapters/firebase/firebase-storage-adapter')
jest.mock('@libs/common/adapters/pubsub.adapter.ts')
jest.mock('@libs/common/services/zip.service.ts')
jest.mock('@libs/common/services/pdf-merger.service.ts')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('@libs/common/adapters/pubsub.adapter')
jest.mock('@libs/services-common/services/pdf-creator.service.ts')

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const patientMock = {id: 123, firstName: 'firstNameZip', lastName: 'lastNameZip'} as Patient
const staffMock = {id: 124, firstName: 'firstNameStaffZip', lastName: 'lastNameStaffZip'} as Staff

const bulkDownloadRequestItems = [
  {
    testResultId: testResultFixture.id,
    type: BulkDownloadRequestItemType.TestResult,
    testResult: {id: testResultFixture.id, uuid: testResultFixture.uuid},
  },
  {
    patientEncounterId: patientEncounterFixture.id,
    type: BulkDownloadRequestItemType.PatientEncounter,
    patientEncounter: {id: patientEncounterFixture.id, uuid: patientEncounterFixture.uuid},
    includeAddendums: true,
  },
  {
    patientPrescriptionId: patientPrescriptionFixture.id,
    type: BulkDownloadRequestItemType.PatientPrescription,
    patientPrescription: {
      id: patientPrescriptionFixture.id,
      uuid: patientPrescriptionFixture.uuid,
    },
  },
  {
    patientEncounterId: patientStaffNoteFixture.id,
    type: BulkDownloadRequestItemType.PatientStaffNote,
    patientStaffNote: {id: patientStaffNoteFixture.id, uuid: patientStaffNoteFixture.uuid},
    includeAddendums: true,
  },
] as BulkDownloadRequestItem[]

const bulkDownloadRequestWorksheetsItems = [
  {
    patientPlanSheetId: patientPlanSheetEPLFixture.id,
    type: BulkDownloadRequestItemType.PatientPlanSheet,
    patientPlanSheet: {
      id: patientPlanSheetEPLFixture.id,
      uuid: patientPlanSheetEPLFixture.uuid,
      type: PlanSheetType.EPL,
      createdAt: dateTimeUtil.toDate('2020-01-16T13:00:00'),
    },
  },
  {
    patientPlanSheetId: patientPlanSheetHCGFixture.id,
    type: BulkDownloadRequestItemType.PatientPlanSheet,
    patientPlanSheet: {
      id: patientPlanSheetHCGFixture.id,
      uuid: patientPlanSheetHCGFixture.uuid,
      type: PlanSheetType.HCG,
      createdAt: dateTimeUtil.toDate('2020-01-16T13:00:00'),
    },
  },
  {
    patientPlanSheetId: patientPlanSheetOBFixture.id,
    type: BulkDownloadRequestItemType.PatientPlanSheet,
    patientPlanSheet: {
      id: patientPlanSheetOBFixture.id,
      uuid: patientPlanSheetOBFixture.uuid,
      type: PlanSheetType.OB,
      createdAt: dateTimeUtil.toDate('2020-01-16T13:00:00'),
    },
  },
  {
    patientPlanSheetId: patientPlanSheetPrimingFixture.id,
    type: BulkDownloadRequestItemType.PatientPlanSheet,
    patientPlanSheet: {
      id: patientPlanSheetPrimingFixture.id,
      uuid: patientPlanSheetPrimingFixture.uuid,
      type: PlanSheetType.Priming,
      createdAt: dateTimeUtil.toDate('2020-01-16T13:00:00'),
    },
  },
  {
    patientPlanSheetId: patientPlanSheetStimFixture.id,
    type: BulkDownloadRequestItemType.PatientPlanSheet,
    patientPlanSheet: {
      id: patientPlanSheetStimFixture.id,
      uuid: patientPlanSheetStimFixture.uuid,
      type: PlanSheetType.Stimulation,
      createdAt: dateTimeUtil.toDate('2020-01-16T13:00:00'),
    },
  },
  {
    patientPlanSheetId: patientPlanSheetStim2Fixture.id,
    type: BulkDownloadRequestItemType.PatientPlanSheet,
    patientPlanSheet: {
      id: patientPlanSheetStim2Fixture.id,
      uuid: patientPlanSheetStim2Fixture.uuid,
      type: PlanSheetType.Stimulation,
      createdAt: dateTimeUtil.toDate('2020-01-16T13:00:00'),
    },
  },
] as BulkDownloadRequestItem[]

const coverLetterInfo: Partial<BulkDownloadRequest> = {
  coverLetterExternalDoctor: {
    name: 'doctor',
    clinicName: 'clinic name',
    street: 'address',
  } as ExternalDoctor,
  coverLetterStaff: {firstName: 'firstname', lastName: 'lastname'} as Staff,
  coverLetterContent: 'content',
  coverLetterFilename: 'coverLetterFilename',
}

describe('Firebase Function: handleBulkDownloadGenerate', () => {
  let dataSource: DataSource
  let bulkDownloadRequestSeed: BulkDownloadRequestSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    bulkDownloadRequestSeed = new BulkDownloadRequestSeed(dataSource)

    await createBulkDownloadRequestSeeds(dataSource)
  })

  test('Should generate Merged PDF and upload to storage bucket', async () => {
    const data: BulkDownloadPubSubPayload = {
      bulkDownloadRequestId: bulkDownloadRequestForMergedTypeFixture.id,
      updatedStatus: BulkDownloadRequestStatus.Pending,
      ...mockedAuditMetadata,
      authUserId: staffForResults.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, BulkDownloadSchema))

    await handlerBulkDownloadGenerate(message)

    const bulkDownloadRequestAfter = await bulkDownloadRequestSeed.findById(
      bulkDownloadRequestForMergedTypeFixture.id,
    )
    expect(bulkDownloadRequestAfter).toMatchObject({
      dateCompleted: expect.any(String),
      fileURL: expect.stringMatching(
        new RegExp(
          `generated-documents/merged/.*-${bulkDownloadRequestForMergedTypeFixture.uuid}.pdf`,
        ),
      ),
      status: BulkDownloadRequestStatus.ReadyForDownload,
      failedOn: null,
    })
  })

  test('Should generate Zip file with PDFs and upload to storage bucket', async () => {
    const spyOnZipper = jest.spyOn(FileZipper, 'generatePDFsZipFile')

    const data: BulkDownloadPubSubPayload = {
      bulkDownloadRequestId: bulkDownloadRequestForZipTypeFixture.id,
      updatedStatus: BulkDownloadRequestStatus.Pending,
      ...mockedAuditMetadata,
      authUserId: staffForResults.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, BulkDownloadSchema))
    await handlerBulkDownloadGenerate(message)

    const bulkDownloadRequestAfter = await bulkDownloadRequestSeed.findById(
      bulkDownloadRequestForZipTypeFixture.id,
    )
    expect(bulkDownloadRequestAfter).toMatchObject({
      dateCompleted: expect.any(String),
      fileURL: expect.stringMatching(
        new RegExp(
          `generated-documents/zipped/.*-${bulkDownloadRequestForZipTypeFixture.uuid}.zip`,
        ),
      ),
      status: BulkDownloadRequestStatus.ReadyForDownload,
      failedOn: null,
    })

    const items = spyOnZipper.mock.calls[0][1].bulkDownloadRequestItems
    expect(items[0].testResult).toMatchObject({
      id: testResultFixture.id,
      uuid: testResultFixture.uuid,
    })
    expect(items[1].patientEncounter).toMatchObject({
      id: patientEncounterToShowFirstFixture.id,
      uuid: patientEncounterToShowFirstFixture.uuid,
    })
    expect(items[2].patientEncounter).toMatchObject({
      id: patientEncounterFixture.id,
      uuid: patientEncounterFixture.uuid,
    })
    expect(items[3].patientPrescription).toMatchObject({
      id: patientPrescriptionFixture.id,
      uuid: patientPrescriptionFixture.uuid,
    })
    expect(items[4].patientPlanSheet).toMatchObject({
      id: patientPlanSheetEPLFixture.id,
      uuid: patientPlanSheetEPLFixture.uuid,
      type: PlanSheetType.EPL,
    })
    spyOnZipper.mockRestore()
  })

  test('Should fail to upload file', async () => {
    const spyOnUploadFile = jest.spyOn(FirebaseStorageAdapter.prototype, 'uploadFile')
    spyOnUploadFile.mockRejectedValueOnce(null)

    const data: BulkDownloadPubSubPayload = {
      bulkDownloadRequestId: bulkDownloadRequestForZipTypeToFailFixture.id,
      updatedStatus: BulkDownloadRequestStatus.Pending,
      ...mockedAuditMetadata,
      authUserId: staffForResults.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, BulkDownloadSchema))

    await handlerBulkDownloadGenerate(message)

    const bulkDownloadRequestAfter = await bulkDownloadRequestSeed.findById(
      bulkDownloadRequestForZipTypeToFailFixture.id,
    )
    expect(bulkDownloadRequestAfter).toMatchObject({
      fileURL: null,
      status: BulkDownloadRequestStatus.Failed,
      failedOn: expect.any(Date),
    })
  })

  test('should generate Zip file (Mocked)', async () => {
    const spyOnZipperAddFile = jest.spyOn(ZipService.prototype, 'addFileToArchive')
    const spyOnZipperGenerateArchive = jest.spyOn(ZipService.prototype, 'generateArchive')

    const result = await FileZipper.generatePDFsZipFile(
      patientMock,
      {
        ...coverLetterInfo,
        bulkDownloadRequestItems: [
          ...bulkDownloadRequestItems,
          {
            patientPrescriptionId: patientPrescriptionArchivedFixture.id,
            type: BulkDownloadRequestItemType.PatientPrescription,
            patientPrescription: {
              id: patientPrescriptionArchivedFixture.id,
              uuid: patientPrescriptionFixture.uuid,
            },
          },
        ],
      } as BulkDownloadRequest,
      staffMock,
    )

    expect(result).toBeTruthy()

    expect(spyOnZipperAddFile).toHaveBeenNthCalledWith(
      1,
      `${coverLetterInfo.coverLetterFilename}.pdf`,
      expect.anything(),
    )
    expect(spyOnZipperAddFile).toHaveBeenNthCalledWith(
      2,
      expect.stringMatching(
        new RegExp(
          `${patientMock.lastName}_${patientMock.firstName}_.*_${testTypeTSHFixture.title}.pdf`,
        ),
      ),
      expect.anything(),
    )
    expect(spyOnZipperAddFile).toHaveBeenNthCalledWith(
      3,
      expect.stringMatching(
        new RegExp(
          `${patientMock.lastName}_${patientMock.firstName}_.*_EncounterNote - ${encounterTypeFixture.title}.pdf`,
        ),
      ),
      expect.anything(),
    )
    expect(spyOnZipperAddFile).toHaveBeenNthCalledWith(
      4,
      expect.stringMatching(
        new RegExp(`${patientMock.lastName}_${patientMock.firstName}_.*_Prescription.pdf`),
      ),
      expect.anything(),
    )
    expect(spyOnZipperAddFile).toHaveBeenNthCalledWith(
      5,
      expect.stringMatching(
        new RegExp(
          `${patientMock.lastName}_${patientMock.firstName}_.*Note - ${staffNoteTypeFixture.title}.pdf`,
        ),
      ),
      expect.anything(),
    )
    /**Should not be executed for archive prescription */
    expect(spyOnZipperAddFile).toBeCalledTimes(5)

    expect(spyOnZipperGenerateArchive).toBeCalledTimes(1)
    spyOnZipperAddFile.mockClear()
    spyOnZipperGenerateArchive.mockClear()
  })

  test('should generate Merged PDF file (Mocked)', async () => {
    const spyOnMergerAddFile = jest.spyOn(PDFMergerService.prototype, 'addFile')
    const spyOnMergerSaveFile = jest.spyOn(PDFMergerService.prototype, 'saveFileAsBuffer')
    const spyOnEncounterGetDefintion = jest.spyOn(
      EncounterFileDefintionHelpers,
      'getEncounterFileContent',
    )
    const spyOnStaffNoteGetDefintion = jest.spyOn(
      StaffNoteFileDefintionHelpers,
      'getStaffNoteFileContent',
    )

    const result = await generateMergedPDFDocument(
      patientMock,
      {
        ...coverLetterInfo,
        bulkDownloadRequestItems,
      } as BulkDownloadRequest,
      staffMock,
    )
    expect(result).toBeTruthy()
    /**cover letter + 3 diff items */
    expect(spyOnMergerAddFile).toBeCalledTimes(5)
    expect(spyOnMergerSaveFile).toBeCalledTimes(1)

    expect(spyOnEncounterGetDefintion).toHaveBeenCalledWith(
      expect.objectContaining({id: patientEncounterFixture.id}),
      true,
    )
    expect(spyOnStaffNoteGetDefintion).toHaveBeenCalledWith(
      expect.objectContaining({id: patientStaffNoteFixture.id}),
      true,
    )

    spyOnStaffNoteGetDefintion.mockClear()
    spyOnEncounterGetDefintion.mockClear()
    spyOnMergerAddFile.mockClear()
    spyOnMergerSaveFile.mockClear()
  })

  test('should generate Zipped PDF file for all worksheets', async () => {
    const spyOnZipperAddFile = jest.spyOn(ZipService.prototype, 'addFileToArchive')
    const spyOnZipperGenerateArchive = jest.spyOn(ZipService.prototype, 'generateArchive')

    const result = await FileZipper.generatePDFsZipFile(
      patientMock,
      {
        bulkDownloadRequestItems: bulkDownloadRequestWorksheetsItems,
      } as BulkDownloadRequest,
      staffMock,
    )
    expect(result).toBeTruthy()

    bulkDownloadRequestWorksheetsItems.slice(0, 5).forEach(({patientPlanSheet}, index) => {
      expect(spyOnZipperAddFile).toHaveBeenNthCalledWith(
        index + 1,
        expect.stringMatching(
          new RegExp(
            `${patientMock.lastName}_${patientMock.firstName}_.*_${planTypeFixture.title}_${patientPlanSheet.type}.pdf`,
          ),
        ),
        expect.anything(),
      )
    })

    expect(spyOnZipperAddFile).toHaveBeenNthCalledWith(
      6,
      expect.stringMatching(
        new RegExp(
          `${patientMock.lastName}_${patientMock.firstName}_.*_${planTypeFixture.title}_${patientPlanSheetStim2Fixture.type}_2.pdf`,
        ),
      ),
      expect.anything(),
    )
    expect(spyOnZipperAddFile).toBeCalledTimes(6)

    expect(spyOnZipperGenerateArchive).toBeCalledTimes(1)
    spyOnZipperAddFile.mockClear()
    spyOnZipperGenerateArchive.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await removeBulkDownloadRequestSeeds(dataSource)
  })
})
