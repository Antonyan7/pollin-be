import {Nestproject_PATIENT_ENCOUNTER_SUMMARY_LOGO_BASE64} from '@libs/services-common/assets/assets.const'
import {readFileSync} from 'fs'
import {join} from 'path'

export const mockedFileText = 'file'
export const mockedSignedUrlPrefix = 'url/'

export const mockedUltrasoundReportFile = 'mocked-ultrasound-final-report'
export const mockedUltrasoundReportFileWithMissingFields =
  'mocked-ultrasound-final-report-with-missing-fields'
export const mockedUltrasoundReportFileWithoutOhip = 'mocked-ultrasound-final-report-without-ohip'
export const mockedUltrasoundReportFileCorrupted = 'mockedUltrasoundReportFilenameCorrupted'

export const mockedBuffer = Buffer.from('mockedBuffer')

export class FirebaseStorageAdapter {
  async generatePublicUrl(): Promise<string> {
    return 'PublicUrl'
  }

  downloadFileByName(filename: string): string {
    switch (filename) {
      case mockedUltrasoundReportFile:
      case mockedUltrasoundReportFileWithMissingFields:
      case mockedUltrasoundReportFileWithoutOhip:
        return readFileSync(join(__dirname, 'files', filename), {encoding: 'utf-8'})
      case mockedUltrasoundReportFileCorrupted:
        return 'wrong content'
      case 'processed/' + mockedUltrasoundReportFileCorrupted:
        return 'without pdf'
      case 'processed/' + mockedUltrasoundReportFile:
        return '|^TEXT^PDF^Base64^YQ==|'
      default:
        return null
    }
  }

  moveFileToFolder(): void {
    return
  }

  async createReadStream(): Promise<string> {
    return mockedFileText
  }

  async deleteFile(): Promise<void> {
    return
  }

  async uploadFile(): Promise<string> {
    return mockedFileText
  }

  async uploadPublicFile(): Promise<string> {
    return mockedFileText
  }

  async downloadBuffer(): Promise<Buffer> {
    return mockedBuffer
  }

  async uploadPrivateFile(): Promise<void> {
    return
  }

  async moveFileBetweenBuckets(): Promise<string> {
    return 'url'
  }

  async getSignedUrlToFile(filename: string): Promise<string> {
    return mockedSignedUrlPrefix + filename
  }

  getPatientPhotoPath(filename: string): string {
    return 'path/' + filename
  }

  uploadBase64PrivateFile(): void {
    return
  }

  async getImageBase64ByUrl(imageURL: string): Promise<string> {
    if (!imageURL) {
      return null
    }

    return Nestproject_PATIENT_ENCOUNTER_SUMMARY_LOGO_BASE64
  }
}
