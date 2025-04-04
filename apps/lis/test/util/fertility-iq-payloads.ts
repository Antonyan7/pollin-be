import {
  AddFertilityIQSonoDetailsRequestDTO,
  ReleaseFertilityIQRequestDTO,
} from '@apps/lis/fertility-iq/dto/fertility-iq.dto'
import {TubeOptionEnum, UterineCavity} from '@libs/data-layer/apps/clinic-test/enums'

export const releaseFertilityIQForMalePayload: ReleaseFertilityIQRequestDTO = {
  sonohysterogram: null,
  releaseNote: 'Release note for male Fertility IQ',
}

export const releaseFertilityIQForFemalePayload: ReleaseFertilityIQRequestDTO = {
  sonohysterogram: null,
  releaseNote: 'Release note for female Fertility IQ',
}

export const addSonoDetailsPayload: AddFertilityIQSonoDetailsRequestDTO = {
  sonohysterogram: {
    uterineCavity: UterineCavity.Normal,
    rightTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
    leftTube: [TubeOptionEnum.NotSeen, TubeOptionEnum.Hydrosalpinx],
    note: 'Sono detail note',
  },
}
