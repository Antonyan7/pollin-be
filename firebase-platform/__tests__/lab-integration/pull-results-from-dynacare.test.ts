import {DynacareAdapter} from '@libs/common/adapters/dynacare.adapter'
import {handlerPullResultsFromDynacare} from '@firebase-platform/functions/test-orders-and-results/src/dynacare/handler'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {LabInfoSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {labInfoDynacareFixture} from '../fixtures/lab-integration/lab-info.fixture'
import {HttpStatus} from '@nestjs/common'

jest.mock('../../../libs/common/src/adapters/dynacare.adapter')
jest.mock('../../../libs/common/src/adapters/firebase/firebase-storage-adapter.ts')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
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

describe('Dynacare Integration: Pull Results', () => {
  let dataSource: DataSource
  let labInfoSeed: LabInfoSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    labInfoSeed = new LabInfoSeed(dataSource)

    await labInfoSeed.create(labInfoDynacareFixture)
  })

  test('should pull results from Dynacare and acknowledge', async () => {
    const result = await handlerPullResultsFromDynacare()
    // mock returns 2 file
    expect(result.length).toBe(2)
  })

  test('should return null if there is no pending notification from Dynacare', async () => {
    const spyDynacareAdapter = jest.spyOn(DynacareAdapter.prototype, 'getNotifications')
    spyDynacareAdapter.mockResolvedValue([])

    const result = await handlerPullResultsFromDynacare()
    expect(result).toBe(null)

    spyDynacareAdapter.mockRestore()
  })

  test('should return null as get result from Dynacare return 401 status', async () => {
    const spyDynacareAdapter = jest.spyOn(DynacareAdapter.prototype, 'getResult')
    spyDynacareAdapter.mockResolvedValue({data: null, status: 401})

    const result = await handlerPullResultsFromDynacare()
    expect(result).toBe(null)

    spyDynacareAdapter.mockRestore()
  })

  test('should return null as files if attachments are not ready', async () => {
    const spyDynacareAdapter = jest.spyOn(DynacareAdapter.prototype, 'getOrderAttachments')
    spyDynacareAdapter.mockResolvedValue(null)

    const result = await handlerPullResultsFromDynacare()
    expect(result).toBe(null)

    spyDynacareAdapter.mockRestore()
  })

  test('should return null if hl7 file was not received', async () => {
    const spyDynacareAdapter = jest.spyOn(DynacareAdapter.prototype, 'getResult')
    spyDynacareAdapter.mockResolvedValue({data: null, status: HttpStatus.OK})

    const result = await handlerPullResultsFromDynacare()
    expect(result).toBe(null)

    spyDynacareAdapter.mockRestore()
  })

  // TODO uncomment with https://fhhealth.atlassian.net/browse/TEAMB-11450
  // test('should return null if acknowledgement failed', async () => {
  //   const spyDynacareAdapter = jest.spyOn(DynacareAdapter.prototype, 'acknowledgeNotification')
  //   spyDynacareAdapter.mockResolvedValue(null)

  //   const result = await handlerPullResultsFromDynacare()
  //   expect(result).toBe(null)

  //   spyDynacareAdapter.mockRestore()
  // })

  afterAll(async () => {
    jest.clearAllMocks()

    await labInfoSeed.removeByIds([labInfoDynacareFixture.id])
  })
})
