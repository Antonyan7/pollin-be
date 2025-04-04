import {differenceInMinutes, addDays, addMinutes} from 'date-fns'
import {SchedulingSlot, SlotStatus} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {SlotGenerationDataInput} from '@seeds/typeorm/scheduling-slot.seed'

/** Info: StartTime will be created in UTC, not in EST */
export function generateSlots(dataOverwrite: SlotGenerationDataInput): Partial<SchedulingSlot>[] {
  const daysBetween = dataOverwrite?.daysBetween ?? 1
  const generatedSlots: Partial<SchedulingSlot>[] = []
  const dailyEndTime =
    differenceInMinutes(dataOverwrite.dailyEndTime, dataOverwrite.startDateAndTime) / 10
  for (let i = 0; i < dataOverwrite.days; i++) {
    for (let j = 0; j < dailyEndTime; j++) {
      if (dataOverwrite.skip === j) {
        continue
      }
      generatedSlots.push({
        uuid: `${dataOverwrite.prefix}-uuid-${i}-${j}`,
        serviceProviderId: dataOverwrite.serviceProviderId,
        serviceTypeId: dataOverwrite.serviceTypeId,
        startTime: addDays(addMinutes(dataOverwrite.startDateAndTime, j * 10), i * daysBetween),
        endTime: addDays(addMinutes(dataOverwrite.startDateAndTime, j * 10 + 10), i * daysBetween),
        status: dataOverwrite.status ?? SlotStatus.Free,
        maxAppointmentCount: dataOverwrite.maxAppointmentCount ?? 1,
      })
    }
  }
  return generatedSlots
}
