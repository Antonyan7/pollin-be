import {
  SchedulingSlot,
  ServiceGroup,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {filterAvailableTimeSlotsReduced} from './schedule-utility'

/**
  Creates map [serviceTypeId, serviceTypeAvailability], 
  calucalates available slots for each service type based on duration and returns first 10 min slots inside serviceTypeAvailability
**/
export function createServiceTypeIdToServiceTypeAvailabilityMap(
  serviceTypesWithSlots: ServiceType[],
): Map<number, Map<number, SchedulingSlot>> {
  return serviceTypesWithSlots.reduce((map, serviceType) => {
    map.set(
      serviceType.id,
      serviceType.schedulingSlots.length
        ? filterAvailableTimeSlotsReduced(
            serviceType.schedulingSlots,
            serviceType.durationInMinutes,
          )
        : new Map<number, SchedulingSlot>(),
    )
    return map
  }, new Map<number, Map<number, SchedulingSlot>>())
}

/**
  Creates map [serviceGroupId, available slots] based on related service types duration in sequence
  If we have 3 sequenced types with duration 20,10,30 inside group 
  it will find slots with duration 60 when first 20 minutes will be free for 1 type, second 10 minutes - for 2 type etc and return first 10 min slots
**/
export function createServiceGroupIdToServiceGroupAvailabilityMap(
  serviceGroups: ServiceGroup[],
  allFreeSlots: Map<number, Set<number>>,
  serviceTypeAvailabilityMap: Map<number, Map<number, SchedulingSlot>>,
): Map<number, SchedulingSlot[]> {
  return serviceGroups.reduce((map, serviceGroup) => {
    const groupedSlots = serviceTypeAvailabilityMap.get(
      serviceGroup.serviceGroupToServiceType[0].serviceTypeId,
    )

    const firstSlotsForServiceGroup = new Array<SchedulingSlot>()

    for (const firstServiceTypeSlot of groupedSlots.values()) {
      let lastEndTime =
        firstServiceTypeSlot.startTime.valueOf() +
        serviceGroup.serviceGroupToServiceType[0].serviceType.durationInMinutes * 60000

      const isSlotAvailable = serviceGroup.serviceGroupToServiceType.every(
        ({serviceType}, index) => {
          if (index === 0) {
            return true
          }

          const hasNextSlot = serviceType.providerAutomaticSelection
            ? allFreeSlots.get(serviceType.id)?.has(lastEndTime)
            : serviceTypeAvailabilityMap.get(serviceType.id)?.has(lastEndTime)

          if (hasNextSlot) {
            lastEndTime = lastEndTime + serviceType.durationInMinutes * 60000
            return true
          }

          return false
        },
      )

      if (isSlotAvailable) {
        firstSlotsForServiceGroup.push(firstServiceTypeSlot)
      }
    }

    map.set(serviceGroup.id, firstSlotsForServiceGroup)
    return map
  }, new Map<number, SchedulingSlot[]>())
}
