import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

/**
 * Script will be executed after Jest exit
 */
export default async (): Promise<void> => {
  StructuredLogger.info(
    activityLogs.JestGlobal.JestGlobalTeardownFile,
    activityLogs.JestGlobal.JestGlobalTeardownMessage,
    null,
  )
}
