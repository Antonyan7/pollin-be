import {handlerPullResultsFromLifeLabs} from '@firebase-platform/functions/test-orders-and-results/src/lifelabs/handler'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {LifeLabsAdapter} from '@libs/common/adapters/lifelabs.adapter'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {LabInfoSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {labInfoLifeLabsFixture} from '../fixtures/lab-integration/lab-info.fixture'

jest.mock('../../../libs/common/src/adapters/lifelabs.adapter')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.mock('../../../libs/common/src/adapters/firebase/firebase-storage-adapter.ts')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.setTimeout(15000)

describe('LifeLabs Integration: Pull Results', () => {
  let dataSource: DataSource
  let labInfoSeed: LabInfoSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    labInfoSeed = new LabInfoSeed(dataSource)

    await labInfoSeed.create(labInfoLifeLabsFixture)
  })

  test('should pull results from LifeLabs and acknowledge', async () => {
    const spyLifeLabsAdapterSendAcknowledgement = jest.spyOn(
      LifeLabsAdapter.prototype,
      'sendAcknowledgement',
    )
    spyLifeLabsAdapterSendAcknowledgement.mockResolvedValue(null)

    const spyFirebaseStorageAdapter = jest.spyOn(
      FirebaseStorageAdapter.prototype,
      'uploadBase64PrivateFile',
    )
    spyFirebaseStorageAdapter.mockResolvedValue(null)

    const result = await handlerPullResultsFromLifeLabs()

    expect(result).toBeTruthy()

    spyLifeLabsAdapterSendAcknowledgement.mockRestore()
    spyFirebaseStorageAdapter.mockRestore()
  })

  test('should return null if there was problem during pulling results from LifeLabs', async () => {
    const spyLifeLabsAdapter = jest.spyOn(LifeLabsAdapter.prototype, 'pullResults')
    spyLifeLabsAdapter.mockResolvedValue(null)

    const result = await handlerPullResultsFromLifeLabs()

    expect(result).toBe(null)
    spyLifeLabsAdapter.mockRestore()
  })

  test('should return null if result from LifeLabs is empty', async () => {
    const spyLifeLabsAdapter = jest.spyOn(LifeLabsAdapter.prototype, 'pullResults')
    spyLifeLabsAdapter.mockResolvedValue(`<?xml version='1.0' encoding='UTF-8'?> <HL7Messages />`)

    const result = await handlerPullResultsFromLifeLabs()

    expect(result).toBe(null)
    spyLifeLabsAdapter.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await labInfoSeed.removeByIds([labInfoLifeLabsFixture.id])
  })
})
