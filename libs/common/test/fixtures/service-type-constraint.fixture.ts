import {ServiceTypeConstraint} from '@libs/data-layer/apps/scheduling/entities/typeorm/service-type-constraint.entity'

export const serviceTypeLockedId: number = 9
export const serviceTypeId: number = 1
export const serviceTypeServiceGroupLockedId: number = 10
export const serviceTypeIdRevisionFixture: number = 23
export const serviceTypeConstrainedByMultipleServiceTypesId: number = 32

export const serviceTypeConstraintFixture: Partial<ServiceTypeConstraint> = {
  constraintServiceTypeId: serviceTypeId,
  serviceTypeId: serviceTypeLockedId,
}

export const serviceTypeConstraintByServiceGroupFixture: Partial<ServiceTypeConstraint> = {
  constraintServiceTypeId: serviceTypeId,
  serviceTypeId: serviceTypeServiceGroupLockedId,
}

export const serviceTypeConstraintRevisionFixture: Partial<ServiceTypeConstraint> = {
  constraintServiceTypeId: serviceTypeId,
  serviceTypeId: serviceTypeIdRevisionFixture,
}

export const serviceTypeConstrainedByMultipleServiceTypes1Fixture: Partial<ServiceTypeConstraint> =
  {
    constraintServiceTypeId: serviceTypeId,
    serviceTypeId: serviceTypeConstrainedByMultipleServiceTypesId,
  }

export const serviceTypeConstrainedByMultipleServiceTypes2Fixture: Partial<ServiceTypeConstraint> =
  {
    constraintServiceTypeId: serviceTypeServiceGroupLockedId,
    serviceTypeId: serviceTypeConstrainedByMultipleServiceTypesId,
  }
