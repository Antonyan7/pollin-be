import {BadRequestException} from '@libs/services-common/exceptions'
import {
  CallHandler,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import {extname} from 'path'
import {Observable} from 'rxjs'
import {handleError} from '../helpers/error-handling'
import {Readable} from 'stream'
import * as activityLogs from '@libs/common/enums/activity-logs'

export type FileStream = {
  filename: string
  encoding: string
  mimetype: string
  extension: string
  stream: Readable
}

export type FileInterceptorOptions = {
  allowedExtensions?: string[]
  maxFileSizeKB?: number
}

@Injectable()
export class FastifySingleFileInterceptor implements NestInterceptor {
  constructor(private readonly options?: FileInterceptorOptions) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<object>> {
    const request = context.switchToHttp().getRequest()

    if (!request.isMultipart()) {
      handleError(new BadRequestException('Request is not multipart'), {
        functionName: activityLogs.FastifySingleFileInterceptorFunctions.Intercept,
        eventName: activityLogs.FastifySingleFileInterceptorActions.RequestIsNotMultipart,
      })
    }

    const maxFileSize = (this.options.maxFileSizeKB || 5 * 1024) * 1024

    const data = await request.file({limits: {fileSize: maxFileSize}})
    if (data) {
      const file: FileStream = {
        filename: data.filename,
        encoding: data.encoding,
        mimetype: data.mimetype,
        extension: extname(data.filename).substring(1),
        stream: data.file,
      }

      if (!this.validateByOptions(file)) {
        handleError(new BadRequestException('Unsupported format'), {
          functionName: activityLogs.FastifySingleFileInterceptorFunctions.Intercept,
          eventName: activityLogs.FastifySingleFileInterceptorActions.UnsupportedFormat,
        })
      }

      request.uploadedFileStream = file
    }

    return next.handle()
  }

  private validateByOptions(file: FileStream): boolean {
    const options = this.options
    if (!options) {
      return true
    }

    return options.allowedExtensions ? options.allowedExtensions.includes(file.extension) : true
  }
}

export const UploadedFileStreamDecorator = createParamDecorator(
  (_, ctx: ExecutionContext): FileStream => {
    const request = ctx.switchToHttp().getRequest()
    return request.uploadedFileStream
  },
)
