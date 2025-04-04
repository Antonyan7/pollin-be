import {handlerEnrolCryoSubscriptions} from '@firebase-platform/functions/checkout/src/enrol-cryo-subscriptions/handler-enrol-cryo-subscriptions'
import {CloudEvent} from 'firebase-functions/v2'
import {PubSubEvent} from '@functions-types'
import {DateTimeUtil} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  CryoInventoryCardSeed,
  CryoSampleContainerSeed,
  CryoSampleDonorSeed,
  PatientCryoSubscriptionSeed,
  PatientSeed,
} from '@seeds/typeorm'
import {
  patientSubscriptionEggEmbryoFixture,
  patientSubscriptionSpermCryoFixture,
} from '../fixtures/checkout/patient'
import {
  cryoInventoryCardForEggSampleFixture,
  cryoSubDonorFixture,
  cryoSubSampleContainerEarliestFixture,
  cryoSubSampleContainerLatestFixture,
} from '../fixtures/checkout/cryo-samples'

jest.mock('../../../libs/common/src/adapters/pubsub.adapter')

const dateUtil = new DateTimeUtil()

describe('handlerEnrolCryoSubscriptions', () => {
  let dataSource = null

  let patientSeed: PatientSeed
  let cryoSubscriptionSeed: PatientCryoSubscriptionSeed
  let cryoInventoryCardSeed: CryoInventoryCardSeed
  let cryoSampleContainerSeed: CryoSampleContainerSeed
  let cryoDonorSeed: CryoSampleDonorSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    cryoSubscriptionSeed = new PatientCryoSubscriptionSeed(dataSource)
    cryoDonorSeed = new CryoSampleDonorSeed(dataSource)
    cryoInventoryCardSeed = new CryoInventoryCardSeed(dataSource)
    cryoSampleContainerSeed = new CryoSampleContainerSeed(dataSource)

    await patientSeed.createArray([
      patientSubscriptionSpermCryoFixture,
      patientSubscriptionEggEmbryoFixture,
    ])
    await cryoDonorSeed.create(cryoSubDonorFixture)
    await cryoInventoryCardSeed.create(cryoInventoryCardForEggSampleFixture)
    await cryoSampleContainerSeed.createArray([
      cryoSubSampleContainerLatestFixture,
      cryoSubSampleContainerEarliestFixture,
    ])
  })

  it('should enrol subcriptiion', async () => {
    await handlerEnrolCryoSubscriptions({} as CloudEvent<PubSubEvent>)

    const subscription = await cryoSubscriptionSeed.repository.findOne({
      where: {patientId: patientSubscriptionEggEmbryoFixture.id},
    })

    expect(subscription).toBeTruthy()

    const subscriptionStartDate = dateUtil.formatDateYMD(dateUtil.toDate(subscription.startDate))
    expect(subscriptionStartDate).toBe(cryoSubSampleContainerEarliestFixture.freezeDate)
  })

  afterAll(async () => {
    await cryoSubscriptionSeed.removeByPatientId(patientSubscriptionEggEmbryoFixture.id)
    await cryoSampleContainerSeed.removeByIds([
      cryoSubSampleContainerLatestFixture.id,
      cryoSubSampleContainerEarliestFixture.id,
    ])
    await cryoInventoryCardSeed.removeByIds([cryoInventoryCardForEggSampleFixture.id])
    await cryoDonorSeed.removeByIds([cryoSubDonorFixture.id])
    await patientSeed.removeByIds([
      patientSubscriptionSpermCryoFixture.id,
      patientSubscriptionEggEmbryoFixture.id,
    ])
  })
})
