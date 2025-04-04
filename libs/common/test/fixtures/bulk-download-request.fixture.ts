import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {BulkDownloadRequest} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientEmailVerifiedFixture} from './patient.fixture'
import {staffWithMockedAssignorIdFixture} from './staff.fixture'
import {
  BulkDownloadGenerationType,
  BulkDownloadRequestStatus,
} from '@libs/data-layer/apps/users/enum/patient-document.enum'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))

export const bulkDownloadGeneratedDocumentFixture: Partial<BulkDownloadRequest> = {
  id: 1,
  uuid: 'e6539479-c5c0-447a-ac58-7870644a9769',
  patientId: patientEmailVerifiedFixture.id,
  staffId: staffWithMockedAssignorIdFixture.id,
  generationType: BulkDownloadGenerationType.Merge,
  status: BulkDownloadRequestStatus.ReadyForDownload,
  dateCompleted: dateTimeUtil.formatDateYMD(dateTimeUtil.subDays(dateTimeUtil.now(), 4)),
  expireDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 2)),
  fileName: 'document_email-verified',
  fileURL: 'file_URL',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 200),
}

export const bulkDownloadGeneratedDocumentAlmostExpiredFixture: Partial<BulkDownloadRequest> = {
  id: 2,
  uuid: 'c9a4a715-89ea-4a3c-9c6f-80394a152484',
  patientId: patientEmailVerifiedFixture.id,
  staffId: staffWithMockedAssignorIdFixture.id,
  generationType: BulkDownloadGenerationType.Zip,
  status: BulkDownloadRequestStatus.ReadyForDownload,
  dateCompleted: dateTimeUtil.formatDateYMD(dateTimeUtil.subDays(dateTimeUtil.now(), 2)),
  expireDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 3)),
  fileName: 'document_email-verified-expired',
  fileURL: 'file_URL',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
}

export const bulkDownloadRequestFailedFixture: Partial<BulkDownloadRequest> = {
  id: 3,
  uuid: 'f9a4a715-89ea-4a3c-9c6f-80394a152493',
  patientId: patientEmailVerifiedFixture.id,
  staffId: staffWithMockedAssignorIdFixture.id,
  generationType: BulkDownloadGenerationType.Zip,
  status: BulkDownloadRequestStatus.Failed,
  failedOn: dateTimeUtil.toDate(dateTimeUtil.now()),
  dateCompleted: dateTimeUtil.formatDateYMD(dateTimeUtil.subDays(dateTimeUtil.now(), 3)),
  expireDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 2)),
  fileName: 'document_email-verified-expired',
  fileURL: 'file_URL',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const bulkDownloadGeneratedDocumentExpiredFixture: Partial<BulkDownloadRequest> = {
  id: 4,
  uuid: 'kxa4a715-09ea-4a3c-3c6f-80394a152411',
  patientId: patientEmailVerifiedFixture.id,
  staffId: staffWithMockedAssignorIdFixture.id,
  generationType: BulkDownloadGenerationType.Zip,
  status: BulkDownloadRequestStatus.ReadyForDownload,
  dateCompleted: dateTimeUtil.formatDateYMD(dateTimeUtil.subDays(dateTimeUtil.now(), 5)),
  expireDate: dateTimeUtil.formatDateYMD(dateTimeUtil.subDays(dateTimeUtil.now(), 2)),
  fileName: 'document_email-verified-expired',
  fileURL: 'file_URL',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}

export const bulkDownloadGeneratedDocumentFaxedFixture: Partial<BulkDownloadRequest> = {
  id: 5,
  uuid: 'c9a5a713-29ea-4a3c-9c6f-80394a152484',
  patientId: patientEmailVerifiedFixture.id,
  staffId: staffWithMockedAssignorIdFixture.id,
  generationType: BulkDownloadGenerationType.Zip,
  status: BulkDownloadRequestStatus.ReadyForDownload,
  dateCompleted: dateTimeUtil.formatDateYMD(dateTimeUtil.subDays(dateTimeUtil.now(), 2)),
  expireDate: null,
  fileName: 'bulkDownloadGeneratedDocumentFaxedFixture',
  fileURL: 'url_bulkDownloadGeneratedDocumentFaxedFixture',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
}
