import {LabMachine} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

export const labMachineFixture: Partial<LabMachine> = {
  id: 1,
  uuid: 'labMachi-132d-11ed-814e-0242ac112002',
  name: 'First lab machine name',
}

export const labMachineToBeUnassignedFixture: Partial<LabMachine> = {
  id: 3,
  uuid: 'labMachi-132d-11ed-814e-0242ac113003',
  name: 'Lab machine To Be Unassigned',
}

export const labMachineToBeAssignedFixture: Partial<LabMachine> = {
  id: 4,
  uuid: '3ff8e174-13dc-4c5c-bae3-2ee1dcd9abc5',
  name: 'Lab machine To Be Assigned',
}

export const labMachineDynacareFixture: Partial<LabMachine> = {
  id: 5,
  uuid: 'labMachine-2-132d-11ed-814e-02422',
  name: 'Dynacare Machine',
}

export const labMachineNestprojectFixture: Partial<LabMachine> = {
  id: 6,
  uuid: 'labMachine-3-134d-11ed-814e-028302',
  name: 'Nestproject Machine',
}
