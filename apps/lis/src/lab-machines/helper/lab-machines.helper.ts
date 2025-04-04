import {LabMachine} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {LabMachineDTO} from '@apps/lis/lab-machines/dto/lab-machines.dto'

export const prepareLabMachines = (rawMachines: LabMachine[]): LabMachineDTO[] => {
  return rawMachines.map((machine) => ({
    title: machine.name,
    id: machine.uuid,
  }))
}
