import {SlotIdModel} from '@libs/services-common/dto/cart.dto'

export const decodeBase64 = <T>(encoded: string): T => {
  return JSON.parse(Buffer.from(encoded, 'base64').toString())
}

export const encodeInBase64 = (data: unknown): string => {
  return Buffer.from(JSON.stringify(data)).toString('base64')
}

export const encodeArrayBufferToBase64 = (data: ArrayBuffer): string => {
  return Buffer.from(data).toString('base64')
}

export const decodeSlotId = (id: string): SlotIdModel => {
  const slotIdModel: SlotIdModel = decodeBase64(id)

  if (slotIdModel?.bookedAppointmentId) {
    return {
      bookedAppointmentId: slotIdModel.bookedAppointmentId,
    }
  }

  if (
    !slotIdModel.serviceProviderId ||
    !slotIdModel.serviceCategoryItemId ||
    !slotIdModel.schedulingSlotId ||
    !slotIdModel.serviceCategoryItemType
  ) {
    throw new Error('SlotId model missing properties')
  }

  return slotIdModel
}

export const encodeSlotId = (data: SlotIdModel): string => {
  return encodeInBase64(data)
}
