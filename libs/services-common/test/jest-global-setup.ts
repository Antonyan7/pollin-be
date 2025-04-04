import {TestPortProvider} from '@libs/common/test/app-factory'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

/**
 * Script will be executed before test suites
 */
export default async (): Promise<void> => {
  StructuredLogger.info(
    activityLogs.JestGlobal.JestGlobalSetupFile,
    activityLogs.JestGlobal.JestGlobalSetupMessage,
    null,
  )

  // Init test port provider
  TestPortProvider.getInstance()
}
