import {FirebaseStorageAdapter} from '@libs/common/adapters'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {NestprojectConfigService} from '@libs/common/services'
import {LogType, StructuredLogger} from '@libs/common/utils'
import {Nestproject_SUB_HEADER_TEST_RESULT_LOGO} from '@libs/services-common/assets/assets.const'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {StreamableFile} from '@nestjs/common/file-stream'
import {Content, ContentImage} from 'pdfmake/interfaces'

const configService = NestprojectConfigService.getInstance()

const fireBaseStorageAdapter = new FirebaseStorageAdapter(
  configService.get<string>('BULK_DOWNLOAD_FILES_BUCKET_NAME'),
)

const getTestResultSubHeaderLogo = (): ContentImage => ({
  width: 218,
  image: Nestproject_SUB_HEADER_TEST_RESULT_LOGO,
  marginLeft: MarginsPdfEnum.Margin80,
  marginBottom: MarginsPdfEnum.Margin40,
})

export const getTestResultSubHeader = async (): Promise<Content> => {
  const subHeaderLogo = getTestResultSubHeaderLogo()

  return [subHeaderLogo]
}

export const uploadDocumentToStorage = async (
  path: string,
  streamableFile: StreamableFile,
  bulkDownloadRequestUUID: string,
): Promise<string> => {
  try {
    StructuredLogger.info(
      activityLogs.BulkDownloadFunctions.UploadDocumentToStorage,
      activityLogs.BulkDownloadActions.UploadDocumentToStorage,
      {bulkDownloadRequestUUID},
    )

    await fireBaseStorageAdapter.uploadFile(path, streamableFile.getStream())

    return path
  } catch (error) {
    StructuredLogger.error(
      activityLogs.BulkDownloadFunctions.UploadDocumentToStorage,
      activityLogs.BulkDownloadActions.UploadDocumentToStorageFailed,
      {
        message: `Upload of document failed. BulkDownloadRequestUUID: ${bulkDownloadRequestUUID}`,
        ...parseError(error),
      },
      LogType.BulkDownloadGenerateDocument,
    )

    return null
  }
}
