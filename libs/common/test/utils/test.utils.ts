import {generateTestApp} from '../app-factory'
import {NestFastifyApplication} from '@nestjs/platform-fastify'
import {TestingModule} from '@nestjs/testing'
import {App} from 'supertest/types'

export enum TestModuleType {
  NotSpecified = 'NotSpecified',
  ClinicPortalService = 'ClinicPortalService',
  BackgroundService = 'BackgroundService', // used to mock background.guard
}

export const getTestModule = async (
  applicationModule: unknown,
  port?: number,
  testModuleType = TestModuleType.NotSpecified,
): Promise<{
  app: NestFastifyApplication
  appModule: TestingModule
  server: App
}> => {
  if (!globalThis.testModule) {
    globalThis.testModule = await generateTestApp(applicationModule, port, testModuleType)
  }

  return globalThis.testModule
}
