import {
  SchedulingSlot,
  ServiceType,
  SlotStatus,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {StructuredLogger} from '../utils'
import {BadRequestValidationException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'
// declared to have shorted Logging in service

const logFunc = activityLogs.SchedulingSlotFunctions
const logAct = activityLogs.SchedulingSlotActions

export function validateServiceProviderInServiceType(
  serviceType: ServiceType,
  serviceProviderId: number,
  i18nService: I18nLocalizationService,
): void {
  // Service provider does not need schedule for external service type
  if (serviceType.type === ServiceTypeMethod.External) {
    return
  }

  if (
    !serviceType.serviceProviderToServiceTypes.some(
      (item) => item.serviceProviderId === serviceProviderId,
    )
  ) {
    StructuredLogger.warn(
      activityLogs.AppointmentFunction.ValidateServiceProviderInServiceType,
      activityLogs.AppointmentAction.CreateAppointmentFailed,
      {
        serviceProviderId,
        serviceTypesToProviders: serviceType.serviceProviderToServiceTypes.map((item) => item.id),
      },
    )
    throw new BadRequestValidationException(
      i18nService
        ? i18nService.translate(i18Messages.SERVICE_TYPE_HAS_ANOTHER_SERVICE_PROVIDER)
        : i18Messages.SERVICE_TYPE_HAS_ANOTHER_SERVICE_PROVIDER,
    )
  }
}

export const slotIsNotBlocked = (slot: SchedulingSlot): boolean => {
  return ![SlotStatus.Blocked, SlotStatus.TimeOffBlock].includes(slot.status)
}

export const parameterToRevertBackStatusAndCountForSchedulingSLot = (
  slot: SchedulingSlot,
): Partial<SchedulingSlot> => {
  const appointmentCount = slot?.appointmentCount > 0 ? slot.appointmentCount - 1 : 0

  const schedulingParameters: Partial<SchedulingSlot> = {
    appointmentCount,
  }

  if (slot?.maxAppointmentCount > appointmentCount && slotIsNotBlocked(slot)) {
    schedulingParameters.status = SlotStatus.Free
  }

  writeLogErrorIfMaxCountIsNull(slot)

  return schedulingParameters
}

export const parameterToUpdateStatusAndCountForSchedulingSLot = (
  slot: SchedulingSlot,
): Partial<SchedulingSlot> => {
  const appointmentCount = slot.appointmentCount ? slot.appointmentCount + 1 : 1
  const schedulingParameters: Partial<SchedulingSlot> = {
    appointmentCount,
  }

  if (slot?.maxAppointmentCount <= appointmentCount && slotIsNotBlocked(slot)) {
    schedulingParameters.status = SlotStatus.Busy

    StructuredLogger.info(
      logFunc.ParameterToUpdateStatusAndCountForSchedulingSLot,
      logAct.SlotStatusUpdatingToBusy,
      {
        message: `Updating to busy for slotId: ${slot.id}, slotStartTime: ${slot.startTime} `,
      },
    )
  }

  writeLogErrorIfMaxCountIsNull(slot)

  return schedulingParameters
}

export const writeLogErrorIfMaxCountIsNull = (slot: SchedulingSlot): void => {
  if (!slot?.maxAppointmentCount) {
    StructuredLogger.error('writeLogErrorIfMaxCountIsNull', 'writeLogErrorIfMaxCountIsNull', {
      message: 'schedulint_slot.maxAppointmentCount is null. But it should exist.',
      slotId: slot.id,
    })
  }
}
