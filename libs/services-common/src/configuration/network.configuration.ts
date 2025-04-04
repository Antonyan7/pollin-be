import {Service} from '@libs/services-common/enums/server'
import {NestprojectConfigService} from '@libs/common'
const configService = NestprojectConfigService.getInstance()

export const isJestTest = configService.get<string>('NODE_ENV') === 'test'

/**
 * If running in jest test start on
 */
export const getDefaultPort = (service: Service): number => {
  let defaultPort: number

  switch (service) {
    case Service.Core:
      defaultPort = 5001
      break
    case Service.Swagger:
      defaultPort = 5006
      break
    case Service.Download:
      defaultPort = 5019
      break
    case Service.LIS:
      defaultPort = 5020
      break
    case Service.EMR:
      defaultPort = 5021
      break
    case Service.Booking:
      defaultPort = 5022
      break
    case Service.LisBackground:
      defaultPort = 5023
      break
    case Service.EmrBackground:
      defaultPort = 5024
      break
    case Service.BookingBackground:
      defaultPort = 5025
      break
    case Service.CoreBackground:
      defaultPort = 5026
      break
    default:
      defaultPort = 8080
  }

  if (isJestTest) {
    // Each worker process is assigned a unique id (index-based that starts with 1)
    const jestWorkerId = parseInt(configService.get<string>('JEST_WORKER_ID'))
    defaultPort = defaultPort + jestWorkerId
  }

  return parseInt(configService.get<string>('PORT')) || defaultPort
}
