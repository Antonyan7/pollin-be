import * as activityLogs from '@libs/common/enums/activity-logs'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {LogType, StructuredLogger} from '@libs/common/utils'
import {StreamableFile} from '@nestjs/common'
import {NestprojectConfigService} from '@libs/common/services'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {FERTILITY_IQ_IMAGE_PLACEHOLDER_BASE64} from '@libs/services-common/assets/assets.const'

const configService = NestprojectConfigService.getInstance()

const fireBaseStorageAdapter = new FirebaseStorageAdapter(
  configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
)

export const getImageForFertilityIqPdf = async (
  filePath: string,
  sectionTitle: string,
): Promise<string> => {
  try {
    return filePath
      ? await fireBaseStorageAdapter.getImageBase64ByUrl(filePath)
      : FERTILITY_IQ_IMAGE_PLACEHOLDER_BASE64
  } catch (error) {
    StructuredLogger.error(
      activityLogs.FertilityIQFunctions.GetImageFromStorageForFertilityIqPDFSection,
      activityLogs.FertilityIQActions.GetImageFromStorageForFertilityIqPDFSectionFailed,
      {
        message: `Can not get image for ${sectionTitle}. ImageUrl: ${filePath}`,
        errMsg: error?.message,
      },
    )

    return FERTILITY_IQ_IMAGE_PLACEHOLDER_BASE64
  }
}

export const uploadFertilityIqDocumentToStorage = async (
  path: string,
  steamableFile: StreamableFile,
  patientFertilityIqUUID: string,
): Promise<string> => {
  try {
    StructuredLogger.info(
      activityLogs.FertilityIQFunctions.UploadFertilityIqPDF,
      activityLogs.FertilityIQActions.UploadFertilityIqPDFStarted,
      {patientFertilityIqUUID},
    )

    const options = {
      disposition: `attachment; filename="fertility-iq-report.pdf"`,
      type: 'application/pdf',
    }

    const fileStream = new StreamableFile(steamableFile.getStream(), options)

    await fireBaseStorageAdapter.uploadPrivateFile(path, fileStream.getStream())

    return path
  } catch (error) {
    StructuredLogger.error(
      activityLogs.FertilityIQFunctions.UploadFertilityIqPDF,
      activityLogs.FertilityIQActions.UploadFertilityIqPDFFailed,
      {
        message: `Upload of fertility iq pdf failed`,
        ...parseError(error),
      },
      LogType.FertilityIqPDFReport,
    )

    return null
  }
}

export const deleteFertilityIqPdfFromStorage = async (
  filePath: string,
  patientFertilityIqUUID: string,
): Promise<void> => {
  try {
    StructuredLogger.info(
      activityLogs.FertilityIQFunctions.DeleteFertilityIqPdfFromStorage,
      activityLogs.FertilityIQActions.DeleteFertilityIqPdfFromStorage,
      {patientFertilityIqUUID},
    )

    await fireBaseStorageAdapter.deleteFile(filePath)
  } catch (error) {
    StructuredLogger.error(
      activityLogs.FertilityIQFunctions.DeleteFertilityIqPdfFromStorage,
      activityLogs.FertilityIQActions.DeleteFertilityIqPdfFromStorageFailed,
      {
        message: `Delete of fertility iq pdf failed`,
        ...parseError(error),
      },
      LogType.FertilityIqPDFReport,
    )
  }
}
