import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'

export const parseJSONDataToArray = (data: string): Array<string> => {
  try {
    return data ? JSON.parse(JSON.stringify(data)) : []
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.DataParseFunctions.ParseJSONDataToArray,
      eventName: activityLogs.DataParseActions.ParseJSONDataToArrayFailed,
    })
  }
}
