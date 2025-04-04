import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentPaymentStatus} from '@libs/common/enums'
import {isServiceTypeOHIPCovered} from './patient-ohip.helper'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'

export const getDefaultAppointmentPaymentStatus = (
  serviceType: ServiceType,
  patientOhipCardNumber: string,
  price: number,
): AppointmentPaymentStatus => {
  if (serviceType.type === ServiceTypeMethod.External) {
    return AppointmentPaymentStatus.FreeService
  }

  if (Number(price) == 0) {
    return AppointmentPaymentStatus.FreeService
  }

  if (patientOhipCardNumber && isServiceTypeOHIPCovered(serviceType)) {
    return AppointmentPaymentStatus.CoveredByOHIP
  }

  return AppointmentPaymentStatus.PendingPayment
}

export const getAppointmentLockedPrice = (price: number | string): string | null => {
  return price !== null && price !== undefined && !isNaN(Number(price)) ? String(price) : null
}
