import {AxiosError} from 'axios'
import {StructuredLogger} from '@libs/common'
import {parseError} from '@libs/services-common/helpers/error-handling'

export const writeExtendedLogForAxiosException = ({
  logAct,
  logFunc,
  error,
  payloadAsString,
}: {
  logAct: string
  logFunc: string
  error: AxiosError
  payloadAsString: string
}): void => {
  StructuredLogger.error(logFunc, logAct, {
    axiosError: JSON.stringify(error?.response?.data),
    ...parseError(error),

    errMsg: `responseData: ${JSON.stringify(error?.response?.data)},
             Payload was: ${payloadAsString},
             ResponseStatus and statusText: ${error?.response?.status}, ${error?.response?.statusText}, 
             errorMsg and name: ${error?.message}, ${error?.name}} `,
  })

  //info if axios fails -> "error?.response" will return "circular structure" error. So don't use it here (or add 1 more extra try catch)
}
