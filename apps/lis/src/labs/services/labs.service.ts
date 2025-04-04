import {Injectable} from '@nestjs/common'
import {StructuredLogger} from '@libs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs-labs'
import {LabInfoRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {LabsListDTO} from '@apps/lis/labs/dto/labs.dto'
import {prepareLabs} from '@apps/lis/labs/helper/labs.helper'

@Injectable()
export class LabsService {
  constructor(private readonly labInfoRepository: LabInfoRepository) {}

  async getListOfLabs(): Promise<LabsListDTO> {
    try {
      const rawLabsInfo = await this.labInfoRepository.findExternalLabs()

      StructuredLogger.info(
        activityLogs.LabsFunctions.GetListOfLabs,
        activityLogs.LabsActions.GetListOfLabsSucceed,
        {rawExternalLabsIds: rawLabsInfo.map(({id}) => id)},
      )

      const labs = prepareLabs(rawLabsInfo)
      return {labs}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabsFunctions.GetListOfLabs,
        eventName: activityLogs.LabsActions.GetListOfLabsFailed,
      })
    }
  }
}
