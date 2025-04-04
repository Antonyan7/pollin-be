import {
  CallHandler,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import {Observable} from 'rxjs'
import {Readable} from 'stream'

export type FileStream = {
  filename: string
  encoding: string
  mimetype: string
  extension: string
  stream: Readable
}

type InterceptorOptions = {
  allowedExtensions?: string[]
  maxFileSizeKB?: number
}

@Injectable()
export class FastifySingleFileInterceptor implements NestInterceptor {
  constructor(private readonly options?: InterceptorOptions) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<object>> {
    const request = context.switchToHttp().getRequest()

    request.uploadedFileStream = {
      filename: 'test',
      encoding: 'enc',
      mimetype: 'mem',
      extension: this.options?.allowedExtensions?.at(0) ?? 'png',
      stream: new Readable(),
    }
    return next.handle()
  }
}

export const UploadedFileStreamDecorator = createParamDecorator(
  (_, ctx: ExecutionContext): FileStream => {
    const request = ctx.switchToHttp().getRequest()
    return request.uploadedFileStream
  },
)
