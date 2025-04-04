import {differenceInMinutes, addDays, addMinutes} from 'date-fns'
import {ServiceGroupAvailability} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceGroupAvailGenerationDataInput} from '@seeds/typeorm/service-group-availability.seed'

export function generateServiceGroupAvail(
  dataOverwrite: ServiceGroupAvailGenerationDataInput,
): Partial<ServiceGroupAvailability>[] {
  if (!dataOverwrite.days) {
    dataOverwrite.days = 1
  }

  const generatedSlots = []
  const dailyEndTime =
    differenceInMinutes(dataOverwrite.endTimeGeneration, dataOverwrite.startTime) / 10

  const providerIds = dataOverwrite.serviceProviderIds
    ? dataOverwrite.serviceProviderIds
    : [dataOverwrite.serviceProviderId]

  providerIds.forEach((providerId) => {
    for (let i = 0; i < dataOverwrite.days; i++) {
      for (let j = 0; j < dailyEndTime; j++) {
        if (dataOverwrite.skip === j) {
          continue
        }
        generatedSlots.push({
          id: `${dataOverwrite.idPrefix}${providerId}${i}${j}`,
          serviceProviderId: providerId,
          serviceGroupId: dataOverwrite.serviceGroupId,
          schedulingSlotId: dataOverwrite.schedulingSlotId,

          startTime: addDays(addMinutes(dataOverwrite.startTime, j * 10), i),
        })
      }
    }
  })

  return generatedSlots
}
