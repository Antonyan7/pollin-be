import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {parseError} from '@libs/services-common/helpers/error-handling'
import * as fs from 'fs/promises'
import * as PDFParser from 'pdf-parse'
import {StreamableFile} from '@nestjs/common'

class PDFParserResponseDto {
  text?: string
}
export async function createPdfFolder(folderPath: string): Promise<void> {
  try {
    await fs.mkdir(folderPath)
    StructuredLogger.info(
      activityLogs.PDFParserFunctions.CreateFolder,
      activityLogs.PDFParserActions.CreateFolder,
      {
        message: `${folderPath} Folder created successfully.`,
      },
    )
  } catch (err) {
    if (err.code === 'EEXIST') {
      StructuredLogger.info(
        activityLogs.PDFParserFunctions.CreateFolder,
        activityLogs.PDFParserActions.CreateFolder,
        {
          message: `${folderPath} Folder already exists.`,
        },
      )
    } else {
      StructuredLogger.info(
        activityLogs.PDFParserFunctions.CreateFolder,
        activityLogs.PDFParserActions.CreateFolderFailed,
        {
          message: `${folderPath} Folder creating Error.`,
        },
      )
    }
  }
}

export async function WriteAndReadFile(payload: {
  fileName: string
  folderPath: string
  fullPath: string
  result: StreamableFile
}): Promise<PDFParserResponseDto> {
  try {
    const {fileName, folderPath, fullPath, result} = payload
    const options = {
      disposition: `attachment; filename="${fileName}"`,
      type: 'application/pdf',
    }
    await createPdfFolder(folderPath)
    await fs.writeFile(fullPath, new StreamableFile(result.getStream(), options).getStream())
    // Read the PDF file
    const pdf = await fs.readFile(fullPath)
    const data = await PDFParser(pdf)

    return data
  } catch (error) {
    StructuredLogger.error(
      activityLogs.PDFParserFunctions.WriteAndReadFile,
      activityLogs.PDFParserActions.WriteAndReadFileFailed,
      {message: 'PDF parse failed', ...parseError(error)},
    )
    return null
  }
}
