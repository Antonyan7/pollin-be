import * as path from 'path'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {
  DownloadFileExtensionTypeEnum,
  DownloadFileTypeEnum,
  getDownloadFileMimeTypes,
} from '@libs/common/enums/download-file-type.enum'
import {StructuredLogger} from '../utils'
import {findIndex} from 'lodash'

export const getFileMimeType = (fileUrl: string): string | null => {
  const extension = path.extname(fileUrl)

  switch (extension) {
    case DownloadFileExtensionTypeEnum.PDF:
      return getDownloadFileMimeTypes.get(DownloadFileTypeEnum.PDF)
    case DownloadFileExtensionTypeEnum.DOC:
      return getDownloadFileMimeTypes.get(DownloadFileTypeEnum.DOC)
    case DownloadFileExtensionTypeEnum.DOCX:
      return getDownloadFileMimeTypes.get(DownloadFileTypeEnum.DOCX)
    default:
      StructuredLogger.warn(
        activityLogs.FileHelperFunctions.GetFileMimeType,
        activityLogs.FileHelperFunctions.GetFileMimeType,
        {reason: 'Extension not supported by Nestproject Platform', fileUrl},
      )
      return null
  }
}

export const extractPdfDataFromHl7 = (content: string): string | null => {
  const startMarker = 'PDF^Base64^'

  const startIndex = content.indexOf(startMarker)

  const startOfPdf = startIndex + startMarker.length
  const endIndex = findIndex(
    content,
    (char) => char === '|' || char === '^' || char === '\n',
    startOfPdf,
  )

  if (startIndex === -1 || endIndex === -1) {
    return null
  }

  return content.slice(startOfPdf, endIndex)
}

export const getFileExtension = (filename: string): string => {
  const ext = path.extname(filename).slice(1)
  return ext === '' ? null : ext
}

export const getUniqueFilename = (filename: string, occupiedNames: Set<string>): string => {
  let nextIndex = 2
  let newFilename = filename

  while (occupiedNames.has(newFilename)) {
    newFilename = `${filename}_${nextIndex}`
    nextIndex++
  }

  return newFilename
}
