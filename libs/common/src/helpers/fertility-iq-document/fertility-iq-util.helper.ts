import {
  PatientFertilityIQFemale,
  TestResultSonoDetail,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

export const checkSonoDetailExist = (
  data: PatientFertilityIQFemale | TestResultSonoDetail,
): boolean => {
  if (!data) {
    return false
  }

  return !!data?.uterineCavity && !!data?.leftTube?.length && !!data?.rightTube?.length
}
