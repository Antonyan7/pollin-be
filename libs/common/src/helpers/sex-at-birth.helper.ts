import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {JourneyType} from '@libs/services-common/enums'

export const sexAtBirthToJourneyTypeMap = new Map<SexAtBirth, JourneyType>([
  [SexAtBirth.Female, JourneyType.PatientIntakeFemale],
  [SexAtBirth.Male, JourneyType.PatientIntakeMale],
])
