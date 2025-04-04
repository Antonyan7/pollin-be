import {PatientPreTermDeliveryHistory} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientForProfileOverviewFemaleFixture} from '@libs/common/test/fixtures/patient.fixture'
import {BirthOutcome, MonthsTryingToGetPregnant} from '@libs/services-common/enums/patient.enum'
import {TypeOfBirthForDeliveryEnum} from '@libs/services-common/enums'

export const patientPreTermDeliveryHistoryForGetProfileOverviewFixture: Partial<PatientPreTermDeliveryHistory> =
  {
    id: 1,
    patientId: patientForProfileOverviewFemaleFixture.id,
    year: 2010,
    type: TypeOfBirthForDeliveryEnum.CesareanSection,
    monthsToConceive: MonthsTryingToGetPregnant.OneToSixMonths,
    birthOutcome: BirthOutcome.LiveBirth,
  }
