import {CryoSampleDonor} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {DonorEligibility} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/donor-eligibility.enum'

export const cryoSampleDonorFixture: Partial<CryoSampleDonor> = {
  id: 1,
  uuid: '8dk4404i-8f12-603o-4596-856323b76c12',
  isDonorPresent: false,
  note: 'donorNote',
  donorNumber: '123',
  bank: 'Citibank',
  eligibility: DonorEligibility.Eligible,
}

export const cryoSampleDonorWithDonorPresentForUpdateCryoCardDetailsFixture: Partial<CryoSampleDonor> =
  {
    id: 2,
    uuid: '1sq4404i-8f12-603o-4596-856323b76c83',
    isDonorPresent: true,
    bank: 'bank name',
    donorNumber: 'donor-number-0001',
    eligibility: DonorEligibility.Eligible,
  }
