import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {CryoSubEnrollmentHelper} from '@codebase/email-notification/cryo-subscription-created/helpers/cryo-subscription-enrollment.helper'
import {CryoSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/cryo.enum'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm/patient.entity'

const text = (sample: string): string =>
  `Hi Patient, this is a reminder regarding your ${sample} being cryopreserved at our clinic!`

describe('Utility class CryoSubEnrollmentHelper', () => {
  it('should return correct sample texts based on sexAtBirth', () => {
    const maleResult = CryoSubEnrollmentHelper.reminderSampleText(
      {sexAtBirth: SexAtBirth.Male} as unknown as Patient,
      [CryoSampleType.Sperm],
    )
    expect(text(maleResult)).toBe(
      'Hi Patient, this is a reminder regarding your sperm that is being cryopreserved at our clinic!',
    )

    const eggResult = CryoSubEnrollmentHelper.reminderSampleText(
      {sexAtBirth: SexAtBirth.Female} as unknown as Patient,
      [CryoSampleType.Egg],
    )
    expect(text(eggResult)).toBe(
      'Hi Patient, this is a reminder regarding your egg(s) that are being cryopreserved at our clinic!',
    )

    const eggEmbryoResult = CryoSubEnrollmentHelper.reminderSampleText(
      {sexAtBirth: SexAtBirth.Female} as unknown as Patient,
      [CryoSampleType.Egg, CryoSampleType.Embryo],
    )
    expect(text(eggEmbryoResult)).toBe(
      'Hi Patient, this is a reminder regarding your egg(s) & embryo(s) that are being cryopreserved at our clinic!',
    )
  })
})
