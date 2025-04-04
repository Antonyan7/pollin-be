const ignoreFiles = ['zoom-adapter.spec.ts', 'chatwoot-sms-adapter.spec.ts']

const testPath = expect.getState().testPath

const skipSetupForFile = ignoreFiles.some((file) => testPath.includes(file))
if (!skipSetupForFile) {
  jest.mock('@libs/common/adapters/firebase/firebase-auth.adapter')
  jest.mock('@libs/common/adapters/firebase/firebase-storage-adapter')
  jest.mock('@libs/common/adapters/pubsub.adapter')
  jest.mock('firebase-admin')
  jest.mock('@libs/common/services/open-telemetry.service')
  jest.mock('@libs/redis/redis.module')
  jest.mock('@libs/common/adapters/drug-bank.adapter')
  jest.mock('@libs/common/adapters/md-billing.adapter')
  jest.mock('@libs/services-common/interceptors/fastify-single-file.interceptor')
  jest.mock('@libs/data-layer/apps/core/repositories/fireorm/app-config.repository')
  jest.mock('@libs/common/adapters/cloud-task.adapter')
  jest.mock('@libs/common/adapters/zoom.adapter')
  jest.mock('@libs/common/utils/structured-logger')
  jest.mock('@libs/common/adapters/acuity.adapter')
  jest.mock('@libs/common/adapters/push-notification.adapter')
  jest.mock('@libs/common/guards/background.task.guard')
  jest.mock('@libs/common/adapters/mailgun.adapter.ts')
  jest.mock('@libs/common/adapters/sendinblue.adapter.ts')
  jest.mock('stripe')
}

// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
import * as iconv from 'iconv-lite'
iconv.encodingExists('foo')

afterAll(async () => {
  jest.clearAllMocks()

  if (globalThis?.testModule?.app) {
    await globalThis.testModule.app.close()
  }
})
