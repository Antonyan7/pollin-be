import {PatientFertilityIQFemale} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TubeOptionEnum, UterineCavity} from '@libs/data-layer/apps/clinic-test/enums'
import {
  femalePatientFertilityIQForDetailsFixture,
  patientFertilityIQForFemaleReleasedFixture,
} from './patient-fertility-iq.fixture'

export const patientFertilityIQFemaleReleasedFixture: Partial<PatientFertilityIQFemale> = {
  id: 1,
  uuid: '49038593-206e-4b3e-b5ea-65c5129c4c95',
  fertilityIQId: patientFertilityIQForFemaleReleasedFixture.id,
  antralFollicleCountRight: 30,
  antralFollicleCountLeft: 40,
  uterineCavity: UterineCavity.Normal,
  rightTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
  leftTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
  sonohysterogramNote: 'Sono note',
}

export const patientFertilityIQFemaleAFCFixture: Partial<PatientFertilityIQFemale> = {
  id: 2,
  uuid: '40230bb9-09c7-40e9-8327-eb2d2282fb3d',
  fertilityIQId: femalePatientFertilityIQForDetailsFixture.id,
  antralFollicleCountRight: 30,
  antralFollicleCountLeft: 40,
  uterineCavity: UterineCavity.Normal,
  rightTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
  leftTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
  sonohysterogramNote: 'AFC',
}
