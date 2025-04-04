import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'

export const generateServiceTypeTitle = (serviceType: Partial<ServiceType>): string => {
  return `${serviceType.abbreviation} - ${serviceType.name} ${generateDuration(
    serviceType.durationInMinutes,
  )}`
}

export const generateDuration = (durationInMinutes: number): string => {
  const minutes = durationInMinutes % 60
  const hours = Math.floor(durationInMinutes / 60)

  if (hours > 1) {
    return `[${hours + ' hours'}${minutes ? ' ' + minutes + ' minutes' : ''}]`
  } else if (hours === 1) {
    return `[${hours + ' hour'}${minutes ? ' ' + minutes + ' minutes' : ''}]`
  } else {
    return `[${minutes ? minutes + ' minutes' : ''}]`
  }
}
