import {CryoInventoryCardExternalSample} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'

export const cryoInventoryCardExternalSpermSampleFixture: Partial<CryoInventoryCardExternalSample> =
  {
    id: 1,
    uuid: '243afec0-18b2-4d45-bd57-a1c7da428780',
    dateReceived: '2024-02-15',
    sourceClinicName: 'QWERTY',
  }

export const cryoInventoryCardExternalSampleFixture: Partial<CryoInventoryCardExternalSample> = {
  id: 2,
  uuid: '243afec0-18b2-4d45-bd57-a1c7da468781',
  dateReceived: '2024-02-15',
  sourceClinicName: 'Other Clinic',
}
