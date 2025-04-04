import {SpecimenIncompletionReason} from '@libs/data-layer/apps/clinic-test/entities/typeorm/specimen-incompletion-reason.entity'

import {IncompletionReasonEnum} from '@libs/data-layer/apps/clinic-test/enums'

export const specimenRetestIncompletionReasonFixture: Partial<SpecimenIncompletionReason> = {
  id: 1,
  uuid: 'e83afd99-cdee-4012-b14d-493ee583207c',
  title: 'Retest reason',
  type: IncompletionReasonEnum.Retest,
}

export const specimenRecollectIncompletionReasonFixture: Partial<SpecimenIncompletionReason> = {
  id: 2,
  uuid: 'dbbfcfff-5472-4a39-8615-d310c2c850e9',
  title: 'Recollect reason',
  type: IncompletionReasonEnum.Recollect,
}

export const specimenRejectedIncompletionReasonFixture: Partial<SpecimenIncompletionReason> = {
  id: 3,
  uuid: '33dd38e0-7278-4570-a10e-d80767c50544',
  title: 'Speciment was rejected due to...',
  type: IncompletionReasonEnum.Reject,
}

export const specimenOtherRejectionReason: Partial<SpecimenIncompletionReason> = {
  id: 3,
  uuid: '154a2ee4-7caa-4ea6-8069-55f30c35d243',
  title: 'Other: Please Provide Details',
  type: IncompletionReasonEnum.Reject,
}
