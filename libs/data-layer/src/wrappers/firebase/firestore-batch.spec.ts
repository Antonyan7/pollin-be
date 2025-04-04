import {CartSeed} from '@seeds/firestore/cart-seed'
import {Firestore} from 'firebase-admin/lib/firestore'
import {CartRepository} from '@libs/data-layer/apps/checkout/repositories/fireorm/cart.repository'
import {CoreApp} from '@apps/core'
import {generateTestApp} from '@libs/common/test/app-factory'
import {NestFastifyApplication} from '@nestjs/platform-fastify'
import {FirebaseAdminProvider} from '@libs/common'
import {FirestoreBatch} from '@libs/data-layer/wrappers'

jest.setTimeout(20000)

describe('Big Batch Util', () => {
  let seed: CartSeed

  let fireOrmRepository: CartRepository
  let firestore: Firestore

  let app: NestFastifyApplication

  beforeAll(async () => {
    const testModule = await generateTestApp(CoreApp, 9057)
    app = testModule.app

    firestore = FirebaseAdminProvider.init().firestore()
    fireOrmRepository = await app.get(CartRepository)

    seed = new CartSeed(firestore)

    await Promise.all([
      ...Array.from(Array(10).keys()).map((item) =>
        seed.create({id: String(item) + 'firestore'}, 'batchTestFirestore'),
      ),
      ...Array.from(Array(10).keys()).map((item) =>
        seed.create({id: String(item) + 'fireorm'}, 'batchTestFireorm'),
      ),
    ])
  })

  it('should delete docs using Fireorm repository', async () => {
    const docs = await seed.getAllByFieldValue('testDataCreator', 'batchTestFireorm')
    expect(docs.length).toBeGreaterThanOrEqual(10)

    const batch = new FirestoreBatch(fireOrmRepository, 3)
    expect(docs.forEach((doc) => batch.delete(doc.data())))
    await batch.commit()

    expect(batch.length).toBe(docs.length)

    expect((await seed.getAllByFieldValue('testDataCreator', 'batchTestFireorm')).length).toBe(0)
  })

  it('should delete docs using Firestore.Database', async () => {
    const docs = await seed.getAllByFieldValue('testDataCreator', 'batchTestFirestore')
    expect(docs.length).toBeGreaterThanOrEqual(10)

    const batch = new FirestoreBatch(firestore, 3)
    expect(docs.forEach((doc) => batch.delete(doc.ref)))
    await batch.commit()

    expect(batch.length).toBe(docs.length)

    expect((await seed.getAllByFieldValue('testDataCreator', 'batchTestFirestore')).length).toBe(0)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await seed.deleteAllByFieldValue('testDataCreator', 'batchTestFirestore')
    await seed.deleteAllByFieldValue('testDataCreator', 'batchTestFireorm')

    await app.close()
  })
})
