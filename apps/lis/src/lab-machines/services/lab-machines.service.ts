import {Injectable} from '@nestjs/common'
import {StructuredLogger} from '@libs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs-lab-machines'
import {LabMachineRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {LabMachinesListDTO} from '@apps/lis/lab-machines/dto/lab-machines.dto'
import {prepareLabMachines} from '@apps/lis/lab-machines/helper/lab-machines.helper'

@Injectable()
export class LabMachineService {
  constructor(private readonly labMachineRepository: LabMachineRepository) {}

  async getListOfLabMachines(): Promise<LabMachinesListDTO> {
    try {
      const rawMachines = await this.labMachineRepository.find()

      StructuredLogger.info(
        activityLogs.LabMachinesFunctions.GetListOfLabMachines,
        activityLogs.LabMachinesActions.GetListOfLabMachinesSucceed,
        {rawMachinesIds: rawMachines.map(({id}) => id)},
      )

      const machines = prepareLabMachines(rawMachines)
      return {machines}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabMachinesFunctions.GetListOfLabMachines,
        eventName: activityLogs.LabMachinesActions.GetListOfLabMachinesFailed,
      })
    }
  }
}
