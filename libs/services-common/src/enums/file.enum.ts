import {FileInterceptorOptions} from '../interceptors/fastify-single-file.interceptor'

export enum FileType {
  PatientPhoto,
}

export const FileOptions = new Map<FileType, FileInterceptorOptions>([
  [
    FileType.PatientPhoto,
    {
      allowedExtensions: ['png', 'jpeg', 'jpg'],
      maxFileSizeKB: 15 * 1024,
    },
  ],
])
