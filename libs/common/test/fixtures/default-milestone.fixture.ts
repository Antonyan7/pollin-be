import {
  DefaultMilestoneUserType,
  PatientMilestoneType,
} from '@libs/services-common/enums/milestone.enum'
import {
  serviceTypeFixture,
  serviceTypeWithDuration30Fixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {serviceGroupFixture} from '@libs/common/test/fixtures/service-group.fixture'
import {
  serviceCategoryDisabledFixture,
  serviceCategoryFixture,
} from '@libs/common/test/fixtures/service-category.fixture'
import {PatientDefaultMilestone} from '@libs/data-layer/apps/users/entities/typeorm'

export const defaultMilestoneWithServiceTypeDisabledFixture: Partial<PatientDefaultMilestone> = {
  id: 1,
  serviceTypeId: serviceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
}

export const defaultMilestoneWithServiceCategoryFixture: Partial<PatientDefaultMilestone> = {
  id: 2,
  serviceCategoryId: serviceCategoryFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  isDisabled: false,
}

export const defaultMilestoneWithServiceGroupDisabledFixture: Partial<PatientDefaultMilestone> = {
  id: 3,
  serviceGroupId: serviceGroupFixture.id,
  type: PatientMilestoneType.ServiceGroup,
}

export const defaultMilestoneForPartnerFixture: Partial<PatientDefaultMilestone> = {
  id: 4,
  serviceGroupId: serviceTypeWithDuration30Fixture.id,
  type: PatientMilestoneType.ServiceType,
  isDisabled: false,
  userType: DefaultMilestoneUserType.Partner,
}

export const defaultMilestoneWithServiceCategoryDisabledFixture: Partial<PatientDefaultMilestone> =
  {
    id: 5,
    serviceCategoryId: serviceCategoryDisabledFixture.id,
    type: PatientMilestoneType.ServiceCategory,
    isDisabled: true,
    userType: DefaultMilestoneUserType.Partner,
  }
