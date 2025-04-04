import {Storage, Bucket} from '@google-cloud/storage'
import {Stream, Readable} from 'stream'
import {NestprojectConfigService, encodeArrayBufferToBase64, StructuredLogger} from '@libs/common'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import * as firebaseActivityLogs from '@libs/common/enums/firebase-storage-activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import axios from 'axios'

class FirebaseStorageAdapter {
  private configService = NestprojectConfigService.getInstance()

  private client: Storage = new Storage({
    credentials: JSON.parse(this.configService.get('Nestproject_FIREBASE_ADMINSDK_SA')),
  })

  private bucketName: string
  private bucket: Bucket

  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(bucketName: string) {
    this.bucketName = bucketName
    this.initializeBucket() //this is not very good, it is async method. if you create adapter and use it in next line - it will fail
  }

  async generatePublicUrl(fileName: string): Promise<string> {
    return this.client.bucket(this.bucketName).file(fileName).publicUrl()
  }

  async moveFileBetweenBuckets(
    bucketName: string,
    documentUrl: string,
    destinationFilePath: string,
  ): Promise<string | null> {
    try {
      const sourceBucket = this.client.bucket(this.bucketName)
      const destinationBucket = this.client.bucket(bucketName)
      const sourceFile = sourceBucket.file(documentUrl)

      const destinationFile = destinationBucket.file(destinationFilePath)

      // Move the file to the destination bucket
      await sourceFile.move(destinationFile)

      StructuredLogger.info(
        firebaseActivityLogs.FirebaseStorageFunction.MoveFileBetweenBuckets,
        firebaseActivityLogs.FirebaseStorageActions.MoveFileBetweenBucketsSuccess,
        {},
      )

      return `${this.client.apiEndpoint}/${this.bucketName}/${destinationFilePath}`
    } catch (error) {
      handleError(error, {
        functionName: firebaseActivityLogs.FirebaseStorageFunction.MoveFileBetweenBuckets,
        eventName: firebaseActivityLogs.FirebaseStorageActions.MoveFileBetweenBucketsFailed,
      })
    }
  }

  async checkIfFileExists(fileName: string): Promise<boolean | null> {
    if (!fileName) {
      return null
    }

    const [exists] = await this.client.bucket(this.bucketName).file(fileName).exists()

    return exists
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      StructuredLogger.info(
        firebaseActivityLogs.FirebaseStorageFunction.DeleteFile,
        firebaseActivityLogs.FirebaseStorageActions.DeletingFile,
        {filePath},
      )

      await this.client.bucket(this.bucketName).file(filePath).delete()
    } catch (error) {
      handleError(error, {
        functionName: firebaseActivityLogs.FirebaseStorageFunction.DeleteFile,
        eventName: firebaseActivityLogs.FirebaseStorageActions.DeleteFileFailed,
      })
    }
  }

  createReadStream(filename: string): Readable | null {
    try {
      const file = this.client.bucket(this.bucketName).file(filename)
      const stream = file.createReadStream()

      return stream
    } catch (error) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.CreateReadStream,
        firebaseActivityLogs.FirebaseStorageActions.CreateReadStreamFailed,
        {message: error?.message},
      )

      return null
    }
  }

  downloadBuffer(filename: string): Promise<Buffer> {
    const stream = this.createReadStream(filename)
    return new Promise((resolve, reject) => {
      const chunks = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('end', () => resolve(Buffer.concat(chunks)))
      stream.on('error', reject)
    })
  }

  async downloadFileByName(filename: string): Promise<string> {
    const file = this.client.bucket(this.bucketName).file(filename)
    const contents = await file.download()

    return contents?.toString()
  }

  async moveFileToFolder(filename: string, folderName: string): Promise<void> {
    await this.client.bucket(this.bucketName).file(filename).move(`${folderName}/${filename}`)
  }

  /** filePathWithName - full path: upload/portal/testResult/.../example.txt */
  async uploadBase64PrivateFile(
    filePathWithName: string,
    base64File: string,
  ): Promise<string | null> {
    try {
      const fileStream = Readable.from(Buffer.from(base64File, 'base64')) //create Readable from base^4 encoded file

      await this.uploadPrivateFile(filePathWithName, fileStream)

      return filePathWithName
    } catch (error) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.UploadBase64PrivateFile,
        firebaseActivityLogs.FirebaseStorageActions.UploadBase64PrivateFileFailed,
        {message: error?.message},
      )
      return null
    }
  }

  private getBucket(): Bucket {
    const bucket = this.client.bucket(this.bucketName)
    if (!bucket) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.GetBucket,
        firebaseActivityLogs.FirebaseStorageActions.BucketNotFound,
        {bucketName: this.bucketName},
      )
      return null
    }
    return bucket
  }

  private initializeBucket(): void {
    const bucket = this.getBucket()
    this.bucket = bucket
  }

  /**
   * Basic file upload without modifying access control config
   */
  async uploadFile(fileName: string, stream: Stream): Promise<string> {
    try {
      const file = this.bucket.file(fileName)
      const writeStream = file.createWriteStream()
      return new Promise((resolve, reject) => {
        stream
          .pipe(writeStream)
          .on('close', resolve)
          .on('finish', resolve)
          .on('end', resolve)
          .on('error', reject)
      }).then(() => `${this.client.apiEndpoint}/${this.bucket.name}/${file.name}`)
    } catch (error) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.UploadFile,
        firebaseActivityLogs.FirebaseStorageActions.UploadFileFailed,
        {message: error?.message},
      )
      return null
    }
  }

  async uploadPublicFile(fileName: string, stream: Stream): Promise<string> {
    try {
      const file = this.bucket.file(fileName)
      const writeStream = file.createWriteStream()
      return new Promise((resolve, reject) => {
        stream
          .pipe(writeStream)
          .on('close', resolve)
          .on('finish', resolve)
          .on('end', resolve)
          .on('error', reject)
      }).then(() => {
        return file
          .makePublic()
          .then(() => `${this.client.apiEndpoint}/${this.bucket.name}/${file.name}`)
      })
    } catch (error) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.UploadPublicFile,
        firebaseActivityLogs.FirebaseStorageActions.UploadPublicFileFailed,
        {message: error?.message},
      )
      return null
    }
  }

  async uploadPrivateFile(filePathWithName: string, stream: Stream): Promise<void> {
    try {
      const file = this.bucket.file(filePathWithName)
      const writeStream = file.createWriteStream()

      return new Promise((resolve, reject) => {
        stream
          .pipe(writeStream)
          .on('close', resolve)
          .on('finish', resolve)
          .on('end', resolve)
          .on('error', reject)
      }).then(() =>
        file.makePrivate().then(() => {
          return
        }),
      )
    } catch (error) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.UploadPrivateFile,
        firebaseActivityLogs.FirebaseStorageActions.UploadPrivateFileFailed,
        {message: error?.message},
      )
      return null
    }
  }

  async getSignedUrlToFile(filename: string): Promise<string | null> {
    try {
      if (!filename) {
        return null
      }

      const date = this.dateTimeUtil.addMinutes(this.dateTimeUtil.now(), 60)
      const [url] = await this.bucket.file(filename).getSignedUrl({action: 'read', expires: date})

      return url
    } catch (error) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.GetSignedUrlToFile,
        firebaseActivityLogs.FirebaseStorageActions.GetSignedUrlToFileFailed,
        {message: error?.message},
      )
      return null
    }
  }

  getPatientPhotoPath(filename: string): string {
    return 'uploads/mobile/patient-photo/' + filename
  }

  async getImageBase64ByUrl(imageURL: string): Promise<string> {
    try {
      if (!imageURL) {
        return null
      }

      const response = await axios.get(imageURL, {responseType: 'arraybuffer'})

      if (!response?.data) {
        StructuredLogger.error(
          firebaseActivityLogs.FirebaseStorageFunction.GetImageBase64ByUrl,
          firebaseActivityLogs.FirebaseStorageActions.GetImageBase64ByUrlFailed,
          {message: i18Messages.IMAGE_ARRAY_BUFFER_IS_EMPTY},
        )
        return null
      }
      const contentType = response.headers['Content-Type']

      return `data:${contentType};base64,${encodeArrayBufferToBase64(response.data)}`
    } catch (error) {
      StructuredLogger.error(
        firebaseActivityLogs.FirebaseStorageFunction.GetImageBase64ByUrl,
        firebaseActivityLogs.FirebaseStorageActions.GetImageBase64ByUrlFailed,
        {message: error?.message},
      )
      return null
    }
  }
}

export {FirebaseStorageAdapter}
