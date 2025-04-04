import JSZip from 'jszip'
import {StreamableFile} from '@nestjs/common'
import {streamToBuffer} from '../utils/stream-to-buffer-converter'

export class ZipService {
  private zipper: JSZip

  constructor() {
    this.zipper = new JSZip()
  }

  /**
   * Should be executed before `generateArchive`
   * @param fileName e.g. Result.pdf
   */
  async addFileToArchive(fileName: string, streamableFile: StreamableFile): Promise<JSZip> {
    this.zipper.file(fileName, await streamToBuffer(streamableFile.getStream()), {
      binary: true,
    })

    return this.zipper
  }

  async generateArchive(): Promise<Buffer> {
    return this.zipper.generateAsync({type: 'nodebuffer', compression: 'DEFLATE'})
  }
}
