export class PDFMergerService {
  async addFile(_: string | Buffer | ArrayBuffer): Promise<void> {
    return
  }

  async saveFileAsBuffer(): Promise<Buffer> {
    return Buffer.from(JSON.stringify('BUFFER FROM PDFMergerService'))
  }
}
