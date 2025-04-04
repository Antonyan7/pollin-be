import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums/patient.enum'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm/patient.entity'
import {UserType} from '@libs/services-common/enums/patient.enum'

export const patientSubscriptionFixture: Partial<Patient> = {
  id: 600011,
  uuid: '4ea0ed7d-82b5-11ed-b47d-45010aa2011a',
  authUserId: 'patientWithSubscription',
  firstName: 'Cryo',
  lastName: 'SubBasic',
  stripeCustomerId: 'cryo_subscription_basic',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
}

export const patientSubscriptionSpermCryoFixture: Partial<Patient> = {
  id: 600012,
  uuid: '3aa7de5f-ea4f-49b7-a6c0-023c5aa64772',
  authUserId: 'SpermCryoFixture',
  email: 'fhealthdev+spermcryo@gmail.com',
  firstName: 'Cryo',
  lastName: 'SpermCryo',
  stripeCustomerId: 'cryo_subscription_sperm_cryo',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
}

export const patientSubscriptionEggEmbryoFixture: Partial<Patient> = {
  id: 600013,
  uuid: 'e7abe8d3-4903-4f08-a795-f2c699045a15',
  authUserId: 'EggEmbryoFixture',
  email: 'fhealthdev+eggmebryo@gmail.com',
  firstName: 'Cryo',
  lastName: 'EggEmbryo',
  stripeCustomerId: 'cryo_subscription_egg_embryo',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}
