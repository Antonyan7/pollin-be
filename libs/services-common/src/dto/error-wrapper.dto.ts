export class ErrorWrapper<T> {
  data: T
  error?: {
    code: number
    message: string
  }
}
