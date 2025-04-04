import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {JourneyType} from '@libs/services-common/enums/journey-enum'

export const isIntakeCompleted = (patient: Patient): boolean => {
  return patient.currentJourneyType === JourneyType.ShowAppointments
}
