/* eslint-disable @typescript-eslint/no-require-imports */
import {Injectable, StreamableFile} from '@nestjs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {isE2E, isToolsEnv, StructuredLogger} from '@libs/common'
import {handleError, parseError} from '@libs/services-common/helpers/error-handling'
import {Stream} from 'stream'
import {TDocumentDefinitions, TFontDictionary} from 'pdfmake/interfaces'
import * as path from 'path'
import {StreamableFileOptions} from '@nestjs/common/file-stream/interfaces'

// pdfmake does not support * import
const PdfPrinter = require('pdfmake')
const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('pdfmake/build/vfs_fonts')

@Injectable()
export class PdfCreatorService {
  private printer

  constructor() {
    // needed for e2e tests passing
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const fonts: TFontDictionary = this.setFontFamilyForPrinter()
    this.printer = new PdfPrinter(fonts)
  }

  async generatePdfStream(
    fileDefinition: TDocumentDefinitions,
    options?: StreamableFileOptions,
  ): Promise<{streamable: StreamableFile; pageCount: number}> {
    try {
      pdfMake.vfs = pdfFonts.pdfMake.vfs
      const stream = new Stream.PassThrough()

      const pdfDoc = !isE2E()
        ? this.printer.createPdfKitDocument(fileDefinition)
        : pdfMake.createPdf(fileDefinition).getStream() // with default build-in fonts

      pdfDoc.on('data', (chunk) => stream.push(chunk))
      pdfDoc.on('end', () => stream.end())
      pdfDoc.on('error', (error) => {
        StructuredLogger.error(
          activityLogs.ClinicDownloadsFunctions.GeneratePdfStream,
          activityLogs.ClinicDownloadsActions.GeneratePdfStreamFailed,
          parseError(error),
        )
        stream.end()
      })
      pdfDoc.end()

      return {
        streamable: new StreamableFile(
          stream,
          options ?? {
            disposition: `attachment; filename="document.pdf"`,
            type: 'application/pdf',
          },
        ),
        pageCount: pdfDoc._pageBufferStart ?? 1,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicDownloadsFunctions.GeneratePdfStream,
        eventName: activityLogs.ClinicDownloadsActions.GeneratePdfStreamFailed,
      })
    }
  }

  async countPdfPages(fileDefinition: TDocumentDefinitions): Promise<number> {
    try {
      pdfMake.vfs = pdfFonts.pdfMake.vfs

      const pdfDoc = !isE2E()
        ? this.printer.createPdfKitDocument(fileDefinition)
        : pdfMake.createPdf(fileDefinition).getStream() // with default build-in fonts

      pdfDoc.end()

      return pdfDoc._pageBufferStart ?? 1
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicDownloadsFunctions.GeneratePdfStream,
        eventName: activityLogs.ClinicDownloadsActions.GeneratePdfStreamFailed,
      })
    }
  }

  setFontFamilyForPrinter(): TFontDictionary {
    if (isE2E()) {
      return {
        Geomanist: {
          normal: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Regular.ttf',
          bold: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Bold.ttf',
          italics: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Regular-Italic.ttf',
          bolditalics: 'libs/services-common/src/assets/pdf-fonts/Geomanist-BoldItalic.ttf',
        },
        GeomanistBlack: {
          normal: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Black.ttf',
        },
        AlexBrush: {
          normal: 'libs/services-common/src/assets/pdf-fonts/AlexBrush-Regular.ttf',
        },
      }
    }

    // Tools  module does not have dist folder, path should be different. The same for CF on local
    if (isToolsEnv() || isCFTestFromLocalOrCi()) {
      return {
        Geomanist: {
          normal: path.resolve(__dirname, '../assets/pdf-fonts/Geomanist-Regular.ttf'),
          bold: path.resolve(__dirname, '../assets/pdf-fonts/Geomanist-Bold.ttf'),
          italics: path.resolve(__dirname, '../assets/pdf-fonts/Geomanist-Regular-Italic.ttf'),
          bolditalics: path.resolve(__dirname, '../assets/pdf-fonts/Geomanist-BoldItalic.ttf'),
        },
        GeomanistBlack: {
          normal: path.resolve(__dirname, '../assets/pdf-fonts/Geomanist-Black.ttf'),
        },
        AlexBrush: {
          normal: path.resolve(__dirname, '../assets/pdf-fonts/AlexBrush-Regular.ttf'),
        },
      }
    }

    const normalFontPath = path.join(__dirname, '/assets/pdf-fonts/Geomanist-Regular.ttf')
    const boldFontPath = path.join(__dirname, '/assets/pdf-fonts/Geomanist-Bold.ttf')
    const italicsFontPath = path.join(__dirname, '/assets/pdf-fonts/Geomanist-Regular-Italic.ttf')
    const boldItalicFontPath = path.join(__dirname, '/assets/pdf-fonts/Geomanist-BoldItalic.ttf')

    const blackFonthPath = path.join(__dirname, '/assets/pdf-fonts/Geomanist-Black.ttf')
    const alexBrushFontPath = path.join(__dirname, '/assets/pdf-fonts/AlexBrush-Regular.ttf')

    return {
      Geomanist: {
        normal: normalFontPath,
        bold: boldFontPath,
        italics: italicsFontPath,
        bolditalics: boldItalicFontPath,
      },
      GeomanistBlack: {
        normal: blackFonthPath,
      },
      AlexBrush: {
        normal: alexBrushFontPath,
      },
    }
  }
}

export const setFontFamilyForPrinterMockData: TFontDictionary = {
  Geomanist: {
    normal: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Regular.ttf',
    bold: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Bold.ttf',
    italics: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Regular-Italic.ttf',
    bolditalics: 'libs/services-common/src/assets/pdf-fonts/Geomanist-BoldItalic.ttf',
  },
  GeomanistBlack: {
    normal: 'libs/services-common/src/assets/pdf-fonts/Geomanist-Black.ttf',
  },
}

function isCFTestFromLocalOrCi(): boolean {
  //on local and CI __dirname has extra '/services' in the end, and that is why need to go 1 folder upper '../' on path too
  return __dirname.includes('libs/services-common/src/services')
}
