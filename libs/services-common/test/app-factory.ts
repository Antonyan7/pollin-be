import {DynamicModule} from '@nestjs/common'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {TestingModule, Test} from '@nestjs/testing'
import {App} from 'supertest/types'

export class TestPortProvider {
  private static instance: TestPortProvider
  private nextPort = 8000

  public static getInstance(): TestPortProvider {
    if (!TestPortProvider.instance) {
      TestPortProvider.instance = new TestPortProvider()
    }

    return TestPortProvider.instance
  }

  public getNextPort(): number {
    return ++this.nextPort
  }
}

export async function generateTestApp(applicationModule: unknown): Promise<{
  app: NestFastifyApplication
  server: App
}> {
  const appModule: TestingModule = await Test.createTestingModule({
    imports: [applicationModule as DynamicModule],
  }).compile()

  const app = appModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
  const server = app.getHttpServer()

  const nextPort = TestPortProvider.getInstance().getNextPort()
  await new Promise((resolve) => app.listen(nextPort, resolve))

  return {app, server}
}
