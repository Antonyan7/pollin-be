import {LisAppModule} from '@apps/lis'
import {generateTestApp} from '@libs/common/test/app-factory'

import * as diagnosticImagingTests from './diagnostic-imaging'
import * as finalReportTests from './final-report'
import * as orderControllerTests from './order-controller'
import * as testResultTests from './test-result'
import * as transportTests from './transport'
import * as unitTests from './unit'
import * as labSyncTestResults from './lab-sync-test-results'
import * as fertilityIQ from './fertility-iq'
import * as geneticTests from './genetic-tests'
import * as cryoInventory from './cryo-inventory'
import * as cryoCards from './cryo-cards'
import * as ivfPatientTests from './ivf-patient'
import * as ivfTasksTests from './ivf-tasks'
import * as dailyViewTests from './daily-view'
import * as spawnCohortTests from './spawn-cohort'
import * as planUpdatesTests from './plan-updates'
import * as doubleWitnessTests from './double-witness'
import * as strawFilterTests from './straw-filter'
import {TestModuleType} from '@libs/common/test/utils/test.utils'

beforeAll(async () => {
  if (!globalThis.testModule) {
    const app = await generateTestApp(LisAppModule, 9134, TestModuleType.ClinicPortalService)
    globalThis.testModule = app
  }
})

describe('lis tests', () => {
  diagnosticImagingTests
  finalReportTests
  orderControllerTests
  testResultTests
  transportTests
  unitTests
  labSyncTestResults
  fertilityIQ
  geneticTests
  cryoInventory
  cryoCards
  ivfPatientTests
  ivfTasksTests
  dailyViewTests
  spawnCohortTests
  planUpdatesTests
  doubleWitnessTests
  strawFilterTests
})
