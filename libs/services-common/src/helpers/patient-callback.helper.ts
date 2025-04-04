import {Staff, Task} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PatientCallbackResponseDTO} from '../dto/patient-callback.dto'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {DateTimeUtil} from '@libs/common'

export const getPatientCallbackDTO = (
  data: {dueDate: Date; content: string; assignee: Staff},
  dateTimeUtil: DateTimeUtil,
): PatientCallbackResponseDTO => {
  const {dueDate, content, assignee} = data

  const tzDate = dateTimeUtil.UTCToTz(dueDate)

  return {
    date: {
      month: tzDate.getMonth(),
      year: tzDate.getFullYear(),
    },
    assignee: {
      id: assignee.uuid,
      name: getFullName(assignee.firstName, assignee.lastName),
    },
    content,
  }
}

export const getPatientCallbackDetails = (
  callbackTask: Task,
  dateTimeUtil: DateTimeUtil,
): PatientCallbackResponseDTO => {
  if (!callbackTask) {
    return null
  }

  return getPatientCallbackDTO(
    {
      dueDate: callbackTask.dueDate,
      content: callbackTask.description,
      assignee: callbackTask.assignee,
    },
    dateTimeUtil,
  )
}
