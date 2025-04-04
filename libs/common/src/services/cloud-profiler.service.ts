/* eslint-disable no-console */
/* eslint-disable no-restricted-imports */
import {Config} from '@config/config.util'

/**
 * Function should have minimal dependencies to be imported at the top of executable function
 */
export async function InitiateCloudProfiler(): Promise<void> {
  // DO NOT ENABLE THIS FEATURE until TEAMA-11263 is fixed
  if (Config.getBool('FEATURE_CLOUD_PROFILER')) {
    try {
      const GCPProfiler = await import('@google-cloud/profiler')
      await GCPProfiler.start()
      console.log(`Cloud Profiler initiated`)
    } catch (error) {
      console.warn(`Profiler launch failed`, error)
    }
  }
}
