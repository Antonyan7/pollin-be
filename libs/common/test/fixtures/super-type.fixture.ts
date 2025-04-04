import {SuperType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'

export const superTypeFixture: Partial<SuperType> = {
  id: 1,
  uuid: '0802715b-0da0-466a-8149-86a266e24b0e',
  name: 'superTypeFixture',
  specialWorkflow: ServiceTypeWorkflow.Procedure,
  groupOrderActionsByWorkflow: true,
}

export const superTypeTestPanelFixture: Partial<SuperType> = {
  id: 2,
  uuid: '84592cc9-a820-4795-8331-c2a1635f2525',
  name: 'superTypeTestPAnelFixture',
  specialWorkflow: ServiceTypeWorkflow.Blood,
  groupOrderActionsByWorkflow: false,
}

export const superTypeGroupFixture: Partial<SuperType> = {
  id: 3,
  uuid: '5469ae39-6521-405b-a2a8-6b148b8ace62',
  name: 'superTypeGroupFixture',
  specialWorkflow: ServiceTypeWorkflow.Blood,
  groupOrderActionsByWorkflow: true,
}

export const superTypeOtherFixture: Partial<SuperType> = {
  id: 4,
  uuid: '53a7873d-2091-4b25-a93f-111ccfe85bcb',
  name: 'superTypeOtherFixture',
  specialWorkflow: null,
  groupOrderActionsByWorkflow: false,
}

export const superTypeDiagnosticImagingFixture: Partial<SuperType> = {
  id: 5,
  uuid: '22a7873d-2091-4b25-a93f-221ccfe85bja',
  name: 'superTypeDiagnosticImagingFixture',
  specialWorkflow: ServiceTypeWorkflow.DiagnosticImaging,
  groupOrderActionsByWorkflow: false,
}

export const superTypeBloodFixture: Partial<SuperType> = {
  id: 6,
  uuid: '3302715b-0da0-466a-8149-86a266e24b22',
  name: 'Blood Super Type Fixture',
  specialWorkflow: ServiceTypeWorkflow.Blood,
  groupOrderActionsByWorkflow: true,
}

export const superTypeSemenFixture: Partial<SuperType> = {
  id: 7,
  uuid: '4402715b-0da0-466a-8149-86a266e24b44',
  name: 'Semen Super Type Fixture',
  specialWorkflow: ServiceTypeWorkflow.Semen,
  groupOrderActionsByWorkflow: true,
}

export const superTypeUrineFixture: Partial<SuperType> = {
  id: 8,
  uuid: '5502715b-0da0-466a-8149-86a266e24b55',
  name: 'Urine Super Type Fixture',
  specialWorkflow: ServiceTypeWorkflow.Urine,
  groupOrderActionsByWorkflow: true,
}
