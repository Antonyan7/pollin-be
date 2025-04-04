import {
  serviceGroupFixture,
  serviceGroupWith25ServiceTypeDurationFixture,
  serviceGroupServiceCategoryItemsfixture,
  serviceGroupWithHalfOhipBillingCodeFixture,
  serviceGroupWithOhipBillingCodeFixture,
  serviceGroupWithoutServiceTypeFixture,
  serviceGroupCheckoutApptFixture,
  serviceGroupForFreeServiceTypesFixture,
} from '@libs/common/test/fixtures/service-group.fixture'
import {serviceProviderFixture} from '@libs/common/test/fixtures/service-provider.fixture'
import {
  serviceCategoryFixture,
  serviceCategoryPatientDontHaveSexAtBirthFixture,
  serviceCategoryWithOhipBilledItemsFixture,
  serviceFemaleSexAtBirthUpdatePatientFixture,
  serviceMaleSexAtBirthUpdatePatientFixture,
} from '@libs/common/test/fixtures/service-category.fixture'
import {SlotIdModel} from '@libs/services-common/dto/cart.dto'
import {
  serviceTypeFixture,
  serviceTypeOhipBillingCodeFixture,
  serviceTypeUrineCollectionFixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithDuration40Fixture,
  serviceTypeWithOhipBillingCodeFixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {ServiceCategoryItemType} from '@libs/data-layer/apps/scheduling/enums/service-category-item-type'
import {v4} from 'uuid'
import {
  patientMilestoneDisabledId,
  patientMilestoneForOhipTestsFixtureId,
  patientMilestoneForServiceTypeWithZeroPromisePriceFixtureId,
  patientMilestoneForTestsFixtureId,
  patientMilestoneForTestsNotTaxableFixtureId,
} from '@libs/common/test/fixtures/patient-milestone-variables.fixture'
export const invalidSlotFixture: Partial<SlotIdModel> = {
  serviceCategoryItemId: v4(), //invalid id
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotInvalidGroupFixture: SlotIdModel = {
  serviceCategoryItemId: v4(), //invalid id
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotInvalidGroupFixture',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotInvalidProviderFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: v4(), //invalid id
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotInvalidProviderFixture',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotInvalidCategoryFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: 123123, //invalid id
  schedulingSlotId: 'slotInvalidCategoryFixture',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotInvalidSlotIdFixture: Partial<SlotIdModel> = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotValidFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotValidFixtureUUID', //this slot will be used by other fixtures
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotValidFixtureCartConfirm: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotCartConfirmUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotValidFixtureCartConfirmFail: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotIdPaymentFail',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotInvalidDurationFixtureCartConfirm: SlotIdModel = {
  serviceCategoryItemId: serviceTypeWithDuration40Fixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotInValidCartConfirmUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotValidMaleSexAtBirthFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
  schedulingSlotId: slotValidFixture.schedulingSlotId,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotValidFemaleSexAtBirthFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceFemaleSexAtBirthUpdatePatientFixture.id,
  schedulingSlotId: slotValidFixture.schedulingSlotId,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

/** Slot has serviceCategory which will be used for get questionnaireIntentPatientDontHaveSexAtBirthFixture */
export const slotPatientDontHaveSexAtBirthFixture: SlotIdModel = {
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryPatientDontHaveSexAtBirthFixture.id,
  schedulingSlotId: slotValidFixture.schedulingSlotId,
}

export const slotTimeNotAvailable: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceFemaleSexAtBirthUpdatePatientFixture.id,
  schedulingSlotId: 'slotTimeNotAvailable',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotServiceTypeFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotServiceTypeFixtureUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  milestoneId: patientMilestoneDisabledId,
}

export const slotServiceTypeWithoutCategoryFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  schedulingSlotId: 'slotServiceTypeFixtureUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotDifferentCategoryItemAndCategoryItemId: SlotIdModel = {
  serviceCategoryItemId: serviceGroupWithoutServiceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'differentTypeAndIdUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotValidFixtureForOhipBilled: SlotIdModel = {
  serviceCategoryItemId: serviceTypeWithOhipBillingCodeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotValidFixtureWithOhipBillingUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotValidFixtureForOhipBilledGroupFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupWithOhipBillingCodeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryWithOhipBilledItemsFixture.id,
  schedulingSlotId: 'slotWithOhipBilledGroupFixtureUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotWith25DurationFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupWith25ServiceTypeDurationFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryWithOhipBilledItemsFixture.id,
  schedulingSlotId: '25min-uuid-0-0',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotWhenUTCTimeOnAnotherTimeThanClinicFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryWithOhipBilledItemsFixture.id,
  schedulingSlotId: 'whenUTCTimeOnAnotherTimeThanClinic',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotValidFixtureForHalfOhipBilledGroupFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupWithHalfOhipBillingCodeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceGroupServiceCategoryItemsfixture.id,
  schedulingSlotId: slotValidFixture.schedulingSlotId,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}
export const slotWithoutServiceCategoryIdFixture: Partial<SlotIdModel> = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  schedulingSlotId: 'slotWithoutServiceCategoryIdFixture',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}
export const slotForIsEditableFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryWithOhipBilledItemsFixture.id,
  schedulingSlotId: 'whenUTCTimeOnAnotherTimeThanClinic2',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotCheckouApptForServiceGroupFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupCheckoutApptFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotCartCreateAppUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}
export const prefixcartSlotServiceTypeDuration30Fixture: string = 'aFewApptPerSlot'
export const cartSlotServiceTypeDuration30Fixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeWithDuration30Fixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: prefixcartSlotServiceTypeDuration30Fixture + '-uuid-0-0',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const cartSlotForMultipleTypesFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeUrineCollectionFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: null,
  schedulingSlotId: 'SchedulingSlotForMultipleItems',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  milestoneId: patientMilestoneForTestsFixtureId,
}

export const cartOhipCoveredSlotFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeOhipBillingCodeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'SchedulingSlotForOhipCovered',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  milestoneId: patientMilestoneForOhipTestsFixtureId,
}

export const validSlotPatientPriceCheckFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'validSlotPatientSexAtBirthUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotValidCheckPaymentFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotValidCheckPaymentUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotValidRevisionFixtureCartConfirm: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotRevisionCartConfirmUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotCorrectTimeFixtureCartConfirm: SlotIdModel = {
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotCorrectTimeConfirmUUID',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const slotForFreeServicesFixture: SlotIdModel = {
  serviceCategoryItemId: serviceGroupForFreeServiceTypesFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotForFreeServicesFixture',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const cartSlotForMultipleNotTaxableTypesFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeUrineCollectionFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: null,
  schedulingSlotId: 'cartSlotForMultipleNotTaxableTypes',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  milestoneId: patientMilestoneForTestsNotTaxableFixtureId,
}

export const cartOhipNotCoveredSlotFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeOhipBillingCodeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'SchedulingSlotForNotOhipCovered',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const slotForServiceTypeWithZeroPromisePriceFixture: SlotIdModel = {
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceProviderId: serviceProviderFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  schedulingSlotId: 'slotServiceTypeWithZeroPromisePrice',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  milestoneId: patientMilestoneForServiceTypeWithZeroPromisePriceFixtureId,
}
