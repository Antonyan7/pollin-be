import {MilestoneServiceTypeLimitation} from '@libs/data-layer/apps/users/entities/typeorm'
import {serviceProviderFixture} from './service-provider.fixture'
import {
  patientMilestoneForSpecificDatesFixture,
  patientMilestoneForSpecificDatesIntentFixture,
  patientMilestoneForSpecificDatesWithoutProviderFixture,
} from './patient-milestone.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))
export const fourYearsAhead: number = dateTimeUtil.getYear() + 4

export const milestoneLimitationForAvailabilityFixture: Partial<MilestoneServiceTypeLimitation> = {
  id: 1,
  milestoneId: patientMilestoneForSpecificDatesFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  dates: [
    `${fourYearsAhead}-03-27`,
    `${fourYearsAhead}-03-30`,
    `${fourYearsAhead}-04-01`,
    `${fourYearsAhead}-04-02`,
    `${fourYearsAhead}-04-04`,
  ],
}

export const milestoneLimitationToCreateIntentFixture: Partial<MilestoneServiceTypeLimitation> = {
  id: 2,
  milestoneId: patientMilestoneForSpecificDatesIntentFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  dates: [],
}

export const milestoneLimitationToCreateIntentWithoutProviderFixture: Partial<MilestoneServiceTypeLimitation> =
  {
    id: 3,
    milestoneId: patientMilestoneForSpecificDatesWithoutProviderFixture.id,
    dates: [],
  }
