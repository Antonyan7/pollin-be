import {PatientFullTermDeliveryHistory} from '@libs/data-layer/apps/users/entities/typeorm'
import {BirthOutcome, MonthsTryingToGetPregnant} from '@libs/services-common/enums/patient.enum'
import {patientForProfileOverviewFemaleFixture} from './patient.fixture'
import {TypeOfBirthForDeliveryEnum} from '@libs/services-common/enums'

export const patientFullTermDeliveryHistoryForGetProfileOverviewFixture: Partial<PatientFullTermDeliveryHistory> =
  {
    id: 1,
    patientId: patientForProfileOverviewFemaleFixture.id,
    year: 2010,
    type: TypeOfBirthForDeliveryEnum.Vaginal,
    monthsToConceive: MonthsTryingToGetPregnant.OneToSixMonths,
    birthOutcome: BirthOutcome.StillBirth,
  }
