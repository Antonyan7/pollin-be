import {NodeEnV} from '@libs/common/utils/google-cloud-env'
import * as traceClient from '@google-cloud/trace-agent'

export const createTraceAgent = (): void => {
  if (NodeEnV() === 'production') {
    traceClient.start({
      samplingRate: 5, // sample 5 traces per second, or at most 1 every 200 milliseconds.
      ignoreUrls: [/^\/ignore-me/],
      ignoreMethods: ['options'], // ignore requests with OPTIONS method (case-insensitive).
    })
  }
}
