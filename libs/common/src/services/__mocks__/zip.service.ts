import {StreamableFile} from '@nestjs/common'

export class ZipService {
  /**
   * @param fileName e.g. Result.pdf
   */
  async addFileToArchive(_: string, __: StreamableFile): Promise<void> {
    return
  }

  async generateArchive(): Promise<Buffer> {
    return Buffer.from(JSON.stringify('TEST BUFFER'))
  }
}
