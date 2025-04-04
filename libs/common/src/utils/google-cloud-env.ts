/* eslint-disable no-process-env */
// disable lint for process.env based on: cyclical import NestprojectConfigService import envConfig, encConfig import google-cloud-env.ts

export const NodeEnV = (): string => process.env.NODE_ENV
export const GithubActionEnvoriment = (): string => process.env.PROJECT_ID ?? 'local' //Only available on Github Actions
export const GAEorGCFService = (): string =>
  process.env.GAE_SERVICE ?? process.env.K_SERVICE ?? 'local' //Only avaiable on Google App ENgine
export const isGithubAction = (): boolean => GithubActionEnvoriment() !== 'local'
export const isGAEorGCF = (): boolean => GAEorGCFService() !== 'local'
export const isMigration = (): string => process.env.IS_MIGRATION
export const CloudRunProjectID = (): string =>
  process.env.Nestproject_GCP_CLOUD_RUN_PROJECT_ID ?? 'local'
export const isCloudRunService = (): boolean => CloudRunProjectID() !== 'local'

export const ComputeProjectID = (): string =>
  process.env.Nestproject_GCP_COMPUTE_SERVER_PROJECT_ID ?? 'local'
export const isComputeServer = (): boolean => ComputeProjectID() !== 'local'

// Deprecated #TODO Remove once migrated to cloud run
export const GAEProjectID = (): string => process.env.GOOGLE_CLOUD_PROJECT ?? 'local' //Only avaiable on GAE
export const GAEService = (): string => process.env.GAE_SERVICE ?? 'local' //Only avaiable on GAE
export const isGAEService = (): boolean => GAEService() !== 'local'

export const isRunningOnGCP = (): boolean => {
  if (typeof process.env.JEST_WORKER_ID === 'string') {
    return false
  }

  return isGAEorGCF()
}
