import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {DataSource} from 'typeorm'
import {
  CryoCaneSeed,
  CryoCanSeed,
  CryoInventoryCardSeed,
  CryoSampleContainerSeed,
  CryoSampleDonorSeed,
  CryoTankSeed,
  CryoVialSeed,
  PatientCryoSubscriptionSeed,
  PatientSeed,
  SpecimenSeed,
  TestOrderSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {testPubSubEvent} from '@functions-types'
import {
  CryoSubscriptionStatus,
  Patient,
  PatientCryoSubscription,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {handlerPatientSampleUpdated} from '@firebase-platform/functions/checkout/src/patient-sample/patient-sample-updated.handler'
import {
  PatientSampleUpdatedPayload,
  PatientSampleUpdatedSchema,
} from '@libs/common/model/proto-schemas/patient-sample-updated.schema'
import {
  CryoCan,
  CryoCane,
  CryoInventoryCard,
  CryoSampleContainer,
  CryoSampleDonor,
  CryoTank,
  CryoVial,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {
  CryoSampleType,
  CryoStatus,
  CryoVialStatus,
  DonorEligibility,
  SpermSampleType,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {Specimen, TestOrder} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {SpecimenStatus, TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'

jest.setTimeout(10000)

// Stripe mocked by jest.json ->moduleNameMapper -> "^stripe$"
jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const testId = 2343452

const patientFixture: Partial<Patient> = {
  id: testId,
  authUserId: String(testId),
}

const patientCryoSubscriptionFixtureCF: Partial<PatientCryoSubscription> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  patientId: patientFixture.id,
  status: CryoSubscriptionStatus.Active,

  stripeSubscriptionId: 'stripeSubscriptionId_patientCryoSubscriptionFixtureCF',

  renewalDate: dateTimeUtil.addDays(dateTimeUtil.now(), 1),
  startDate: dateTimeUtil.subtractDays(dateTimeUtil.now(), 1),
  billingCycleStartDate: dateTimeUtil.subtractDays(dateTimeUtil.now(), 1),
}

//  for cryoSampleContainer
export const cryoSampleDonorFixture: Partial<CryoSampleDonor> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  isDonorPresent: false,
  note: 'donordfdNote',
  donorNumber: '12dfsdf3',
  bank: 'Citibadfdsfnk',
  eligibility: DonorEligibility.Eligible,
}

export const cryoInventoryCardFixtureCf: Partial<CryoInventoryCard> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  mediaLotNote: 'medialodfdtNote',
  reagentNote: 'reagentdfsdfNote',
  patientId: patientFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2025-01-06',
  cryoDonorId: cryoSampleDonorFixture.id,
}

export const cryoSampleContainerFixtureCf: Partial<CryoSampleContainer> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  status: CryoStatus.Frozen,
  identifier: 'strawadfIddfentifier',
  thawWitness: 'thawWdsitness',
  freezeWitness: 'frefdsezeWitness',
  thawComment: 'thawsdfComment',
  freezeComment: 'fredsezeComment',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoInventoryCardId: cryoInventoryCardFixtureCf.id,
  strawNumber: 1,
}

// for cryoVial
export const testOrderFixtureCf: Partial<TestOrder> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const specimenFixtureCf: Partial<Specimen> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  specimenIdentifier: 'S00d00ff0031',
  patientId: patientFixture.id,
  status: SpecimenStatus.NotCollected,
  testOrderId: testOrderFixtureCf.id,
  serviceTypeId: null,
}

export const cryoTankFixtureCf: Partial<CryoTank> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  name: 'Cryo Tankdf',
}

export const cryoCanFixtureCf: Partial<CryoCan> = {
  id: testId,
  uuid: testId + '5-132d-11ed-814e-0242ac110003',
  name: 'Cryo Canfd',
}

export const cryoCaneFixtureCf: Partial<CryoCane> = {
  id: 1,
  uuid: 'b9eacc3e-b81e-4020-ac66-c5af1511a983',
  name: 'Cryo Cane 1df',
}

export const cryoVialFixture: Partial<CryoVial> = {
  id: testId,
  identifier: 'S23-0gg06653A',
  specimenId: specimenFixtureCf.id,
  freezeDate: dateTimeUtil.now(),
  spermSampleType: SpermSampleType.Ejaculate,
  cryoTankId: cryoTankFixtureCf.id,
  cryoCanId: cryoCanFixtureCf.id,
  cryoCaneId: cryoCaneFixtureCf.id,
  freezeWitness: 'Witnedfss',
  status: CryoVialStatus.Frozen,
}

describe('Cancel stripe subscription when patient dont have any frozen samples', () => {
  let dataSource: DataSource

  let patientSeed: PatientSeed
  let patientCryoSubscriptionSeed: PatientCryoSubscriptionSeed
  let cryoSampleContainerSeed: CryoSampleContainerSeed
  let cryoVialSeed: CryoVialSeed
  let cryoSampleDonorSeed: CryoSampleDonorSeed
  let cryoInventoryCardSeed: CryoInventoryCardSeed
  let testOrderSeed: TestOrderSeed
  let specimenSeed: SpecimenSeed
  let cryoTankSeed: CryoTankSeed
  let cryoCanSeed: CryoCanSeed
  let cryoCaneSeed: CryoCaneSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    patientCryoSubscriptionSeed = new PatientCryoSubscriptionSeed(dataSource)
    cryoSampleContainerSeed = new CryoSampleContainerSeed(dataSource)
    cryoVialSeed = new CryoVialSeed(dataSource)
    cryoSampleDonorSeed = new CryoSampleDonorSeed(dataSource)
    cryoInventoryCardSeed = new CryoInventoryCardSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    specimenSeed = new SpecimenSeed(dataSource)
    cryoTankSeed = new CryoTankSeed(dataSource)
    cryoCanSeed = new CryoCanSeed(dataSource)
    cryoCaneSeed = new CryoCaneSeed(dataSource)

    await patientSeed.create(patientFixture)
    await patientCryoSubscriptionSeed.create(patientCryoSubscriptionFixtureCF)
  })

  it('Should cancel cryo subscription on stripe ', async () => {
    const payload: Partial<PatientSampleUpdatedPayload> = {
      patientId: patientFixture.id,
    }
    const res = await handlerPatientSampleUpdated(
      testPubSubEvent(encodePubSubMessage(payload, PatientSampleUpdatedSchema)),
    )
    expect(res).toBe(true)

    const patientCryoSubscription = await patientCryoSubscriptionSeed.findOneById(
      patientCryoSubscriptionFixtureCF.id,
    )
    expect(patientCryoSubscription.status).toBe(CryoSubscriptionStatus.Canceled)
    expect(patientCryoSubscription.canceledAt).toBeTruthy()
  })

  it('Should Not cancel cryo subscription on stripe - there is no active subscription', async () => {
    await patientCryoSubscriptionSeed.update(patientCryoSubscriptionFixtureCF.id, {
      status: CryoSubscriptionStatus.Canceled,
    })

    const payload: Partial<PatientSampleUpdatedPayload> = {
      patientId: patientFixture.id,
    }
    const res = await handlerPatientSampleUpdated(
      testPubSubEvent(encodePubSubMessage(payload, PatientSampleUpdatedSchema)),
    )
    expect(res).toBe(false)

    //restore prev status
    await patientCryoSubscriptionSeed.update(patientCryoSubscriptionFixtureCF.id, {
      status: CryoSubscriptionStatus.Active,
    })
  })

  it('Should NOt cancel cryo subscription on stripe  - renewal date in past (subscription not paid yet for prev period)', async () => {
    await patientCryoSubscriptionSeed.update(patientCryoSubscriptionFixtureCF.id, {
      renewalDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
    })
    const payload: Partial<PatientSampleUpdatedPayload> = {
      patientId: patientFixture.id,
    }
    const res = await handlerPatientSampleUpdated(
      testPubSubEvent(encodePubSubMessage(payload, PatientSampleUpdatedSchema)),
    )
    expect(res).toBe(false)
  })

  it('Should NOt cancel cryo subscription on stripe  - patient has frozen samples', async () => {
    // create frozen samples
    await cryoSampleDonorSeed.create(cryoSampleDonorFixture)
    await cryoInventoryCardSeed.create(cryoInventoryCardFixtureCf)
    await cryoSampleContainerSeed.create(cryoSampleContainerFixtureCf)
    await testOrderSeed.create(testOrderFixtureCf)
    await specimenSeed.create(specimenFixtureCf)
    await cryoTankSeed.create(cryoTankFixtureCf)
    await cryoCanSeed.create(cryoCanFixtureCf)
    await cryoCaneSeed.create(cryoCaneFixtureCf)
    await cryoVialSeed.create(cryoVialFixture)

    const payload: Partial<PatientSampleUpdatedPayload> = {
      patientId: patientFixture.id,
    }
    const res = await handlerPatientSampleUpdated(
      testPubSubEvent(encodePubSubMessage(payload, PatientSampleUpdatedSchema)),
    )
    expect(res).toBe(false)
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await cryoSampleContainerSeed.removeByIds([cryoSampleContainerFixtureCf.id])
    await cryoInventoryCardSeed.removeByIds([cryoInventoryCardFixtureCf.id])
    await cryoSampleDonorSeed.removeByIds([cryoSampleDonorFixture.id])

    await testOrderSeed.removeByIds([testOrderFixtureCf.id])

    await cryoVialSeed.removeByIds([cryoVialFixture.id])
    await specimenSeed.removeByIds([specimenFixtureCf.id])
    await cryoTankSeed.removeByIds([cryoTankFixtureCf.id])
    await cryoCanSeed.removeByIds([cryoCanFixtureCf.id])
    await cryoCaneSeed.removeByIds([cryoCaneFixtureCf.id])

    await patientCryoSubscriptionSeed.removeByIds([patientCryoSubscriptionFixtureCF.id])
    await patientSeed.removeByIds([patientFixture.id])

    await dataSource.destroy()
  })
})
