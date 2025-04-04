import PDFMerger from 'pdf-merger-js'

export class PDFMergerService {
  private merger: PDFMerger

  constructor() {
    this.merger = new PDFMerger()
  }

  async addFile(streamableFile: string | Buffer | ArrayBuffer): Promise<void> {
    await this.merger.add(streamableFile)
  }

  async saveFileAsBuffer(): Promise<Buffer> {
    return this.merger.saveAsBuffer()
  }
}
