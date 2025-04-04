import * as activityLogs from '@libs/common/enums/activity-logs'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {LogType, StructuredLogger} from '@libs/common/utils'
import {StreamableFile} from '@nestjs/common'
import {NestprojectConfigService} from '@libs/common/services'
import {parseError} from '@libs/services-common/helpers/error-handling'

const configService = NestprojectConfigService.getInstance()

const fireBaseStorageAdapter = new FirebaseStorageAdapter(
  configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
)

export const uploadEggFreezingDocumentToStorage = async (
  path: string,
  steamableFile: StreamableFile,
  createdEggFreezingReportUUID: string,
): Promise<string> => {
  try {
    StructuredLogger.info(
      activityLogs.PatientEggFreezingReportFunctions.UploadEggFreezingDocumentToStorage,
      activityLogs.CommonAction.StartMethod,
      {message: `createdEggFreezingReportUUID: ${createdEggFreezingReportUUID}`},
    )

    const options = {
      disposition: `attachment; filename="egg-freezing-report.pdf"`,
      type: 'application/pdf',
    }

    const fileStream = new StreamableFile(steamableFile.getStream(), options)

    await fireBaseStorageAdapter.uploadPrivateFile(path, fileStream.getStream())

    return path
  } catch (error) {
    StructuredLogger.error(
      activityLogs.PatientEggFreezingReportFunctions.UploadEggFreezingDocumentToStorage,
      activityLogs.CommonAction.InternalError,
      {
        message: `Upload of egg freezing pdf failed`,
        ...parseError(error),
      },
      LogType.EggFreezingPDFReport,
    )

    return null
  }
}

export const deleteEggFreezingDocumentFromStorage = async (path: string): Promise<boolean> => {
  try {
    StructuredLogger.info(
      activityLogs.PatientEggFreezingReportFunctions.DeleteEggFreezingDocumentFromStorage,
      activityLogs.CommonAction.StartMethod,
      {message: `path: ${path}`},
    )

    await fireBaseStorageAdapter.deleteFile(path)

    return true
  } catch (error) {
    StructuredLogger.error(
      activityLogs.PatientEggFreezingReportFunctions.DeleteEggFreezingDocumentFromStorage,
      activityLogs.CommonAction.InternalError,
      {
        message: `Delete of egg freezing pdf failed`,
        ...parseError(error),
      },
      LogType.EggFreezingPDFReport,
    )

    return null
  }
}
