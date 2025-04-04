/**
 * Cloud functions for update past appointments statuses
 */
import {setGlobalOptions} from 'firebase-functions/v2'
import {onMessagePublished} from 'firebase-functions/v2/pubsub'

import {ValidConfig, ExposeString} from '@config/valid-config.util'
import {checkUpcomingCohortsHandler} from '@codebase/ivf-lab/handlers'
import {InitiateCloudProfiler} from '@libs/common'

// use @Expose() for every parameter
class ConfigModel {
  @ExposeString()
  DEFAULT_GCP_REGION
  @ExposeString()
  TOPIC_CHECK_UPCOMING_COHORTS
}
const validConfig = new ValidConfig()
;(async (): Promise<void> => {
  await validConfig.validateModel(ConfigModel)
  await InitiateCloudProfiler()
})()

const defaultGCPRegion = validConfig.get<string>('DEFAULT_GCP_REGION')

const topicCheckUpcomingCohorts = validConfig.get<string>('TOPIC_CHECK_UPCOMING_COHORTS')

setGlobalOptions({
  region: defaultGCPRegion,
})
const memory = '512MiB'

const checkUpcomingCohorts = onMessagePublished(
  {topic: topicCheckUpcomingCohorts, memory},
  checkUpcomingCohortsHandler,
)

export {checkUpcomingCohorts}
