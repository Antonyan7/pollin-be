import {
  SchedulingSlot,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export function getSlotTimeAndTimeUnits(durationInMinutes: number): {
  slotTime: number
  timeUnits: number
} {
  const slotTime = configService.get<number>('SLOT_DURATION_IN_MINUTES')
  const timeUnits = durationInMinutes / slotTime
  return {slotTime, timeUnits}
}

/** 
  Calculates slots for service types based on service type duration and
  returns availableSlots array based on type duration
**/
export function filterAvailableTimeSlotsReduced(
  groupedSlots: SchedulingSlot[],
  durationInMinutes: number,
): Map<number, SchedulingSlot> {
  const {timeUnits} = getSlotTimeAndTimeUnits(durationInMinutes)

  return groupedSlots.reduce(
    // eslint-disable-next-line max-params
    (availableSlotsMap, slot, slotIndex, allSlots) => {
      const slotStartTime = slot.startTime.valueOf()
      const lastSlotOfPair = allSlots[slotIndex + timeUnits - 1]?.endTime?.valueOf()
      if (lastSlotOfPair - slotStartTime === durationInMinutes * 60000) {
        availableSlotsMap.set(slotStartTime, slot)
      }

      return availableSlotsMap
    },
    new Map<number, SchedulingSlot>(),
  )
}

export function getFirstAvailableDay(
  serviceTypeOrServiceProvider: ServiceType | ServiceProvider,
  datesLimitation?: string[],
): Date | null {
  if (datesLimitation?.length) {
    return dateTimeUtil.toDate(datesLimitation[0])
  }

  const firstAvailableDateString =
    serviceTypeOrServiceProvider?.serviceProviderToServiceTypes?.at(0)?.firstAvailableDate

  return firstAvailableDateString ? dateTimeUtil.toDate(firstAvailableDateString) : null
}
