import {StreamableFile} from '@nestjs/common'
import {TDocumentDefinitions, TFontDictionary} from 'pdfmake/interfaces'
import {Readable} from 'stream'

export class PdfCreatorService {
  async generatePdfStream(
    _: TDocumentDefinitions,
  ): Promise<{streamable: StreamableFile; pageCount: number}> {
    return {streamable: new StreamableFile(Readable.from(Buffer.from('TEST'))), pageCount: 1}
  }

  setFontFamilyForPrinter(): TFontDictionary {
    return {
      Geomanist: {
        normal: '@libs/services-common/src/assets/pdf-fonts/Geomanist-Regular.ttf',
        bold: '@libs/services-common/src/assets/pdf-fonts/Geomanist-Bold.ttf',
        italics: '@libs/services-common/src/assets/pdf-fonts/Geomanist-Regular-Italic.ttf',
        bolditalics: '@libs/services-common/src/assets/pdf-fonts/Geomanist-BoldItalic.ttf',
      },
      GeomanistBlack: {
        normal: '@libs/services-common/src/assets/pdf-fonts/Geomanist-Black.ttf',
      },
      AlexBrush: {
        normal: '@libs/services-common/src/assets/pdf-fonts/AlexBrush-Regular.ttf',
      },
    }
  }

  countPdfPages(): number {
    return 1
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
  AlexBrush: {
    normal: 'libs/services-common/src/assets/pdf-fonts/AlexBrush-Regular.ttf',
  },
}
