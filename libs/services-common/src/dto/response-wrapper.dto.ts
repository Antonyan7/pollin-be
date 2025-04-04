import {ResponseStatus, ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {BadRequestException} from '@libs/services-common/exceptions'
/**
 * Generic response wrapper.
 * Allows every response to be wrapped into a standard object that contains:
 * - a status
 * - the data (nullable)
 * - some pagination details if any.
 */
export class ResponseWrapper<T = unknown> {
  status: ResponseStatus

  data: T

  currentPage?: number

  totalPages?: number

  totalItems?: number

  paginationCursor?: string

  // eslint-disable-next-line max-params
  static of<T>(
    data: T,
    code: ResponseStatusCodes,
    message: string = null,
    title?: string,
    pageSize?: number,
    currentPage?: number,
    totalItems?: number,
  ): ResponseWrapper<T> {
    return {
      data,
      status: {code, message, title},
      pageSize,
      currentPage,
      totalItems,
    } as ResponseWrapper<T>
  }

  // eslint-disable-next-line max-params
  static actionSucceed<T>(
    data: T = null,
    message?: string,
    code = ResponseStatusCodes.Succeed,
    title?: string,
  ): ResponseWrapper<T> {
    return ResponseWrapper.of(data, code, message, title)
  }
  static actionFailed<T>({
    data,
    message,
    code,
    title,
  }: {
    data?: T
    message?: string
    title?: string
    code: ResponseStatusCodes
  }): ResponseWrapper<T> {
    throw new BadRequestException(message, code, title, data)
  }

  // eslint-disable-next-line max-params
  static actionSucceedPaginated<T>(
    data: T = null,
    totalItems: number,
    pageSize: number,
    currentPage: number,
    code = ResponseStatusCodes.Succeed,
    message?: string,
  ): ResponseWrapper<T> {
    return ResponseWrapper.of(data, code, message, null, pageSize, currentPage || 1, totalItems)
  }

  static actionSucceedCursorPaginated<T>(
    data: T = null,
    paginationCursor: string,
    code = ResponseStatusCodes.Succeed,
  ): ResponseWrapper<T> {
    return {
      data,
      paginationCursor,
      status: {code, message: null},
    }
  }

  /**@deprecated */
  static actionSucceedCursorPaginatedDeprecated<T>(
    data: T = null,
    paginationCursor: string,
    code = ResponseStatusCodes.Succeed,
  ): ResponseWrapper<T> {
    return {
      data: {...data, paginationCursor},
      status: {code},
    } as ResponseWrapper<T>
  }
}
