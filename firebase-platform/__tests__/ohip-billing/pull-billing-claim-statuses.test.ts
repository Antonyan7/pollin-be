import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {pullClaimStatusesHandler} from '@firebase-platform/functions/ohip-billing/src/handlers/pull-claim-statuses'
import {
  AppointmentSeed,
  OhipClaimSeed,
  PatientSeed,
  ServiceCategorySeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  StaffSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {
  appointmentForPullOhipClaimsFixture,
  appointmentForPullOhipClaimsTwoFixture,
  ohipClaimForPullClaimStatusesCFFixture,
  ohipClaimWithUnknownStatusForPullClaimStatusesCFFixture,
  patientForAppointmentForPullOhipClaimFixture,
  serviceCategoryForForPullOhipClaimFixture,
  serviceProviderForForPullOhipClaimFixture,
  serviceTypeForForPullOhipClaimFixture,
  staffWithBillingNumberFixture,
} from '../fixtures/ohip-billing/pull-mdbilling.fixture'
import {ClaimStatus} from '@libs/data-layer/apps/clinic-billing/enum/ohip-claim.enum'
import GetBillingDbValueHelper from '@firebase-platform/functions/ohip-billing/src/common/get-db-value.helper'
import {MDBillingAdapter} from '@libs/common/adapters'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

jest.setTimeout(10000)
jest.mock('../../../libs/common/src/adapters/md-billing.adapter.ts')
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

describe('Firebase CF: Pull MDBilling Claim Statuses', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let serviceProviderSeed: ServiceProviderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let staffSeed: StaffSeed
  let appointmentSeed: AppointmentSeed
  let ohipClaimSeed: OhipClaimSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    staffSeed = new StaffSeed(dataSource)
    ohipClaimSeed = new OhipClaimSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderForForPullOhipClaimFixture)
    await serviceCategorySeed.create(serviceCategoryForForPullOhipClaimFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeForForPullOhipClaimFixture)
    await patientSeed.create(patientForAppointmentForPullOhipClaimFixture)
    await staffSeed.create(staffWithBillingNumberFixture)
    await appointmentSeed.create(appointmentForPullOhipClaimsFixture)
    await appointmentSeed.create(appointmentForPullOhipClaimsTwoFixture)

    await ohipClaimSeed.create(ohipClaimForPullClaimStatusesCFFixture)
    await ohipClaimSeed.create(ohipClaimWithUnknownStatusForPullClaimStatusesCFFixture)
  })

  test('Should pull MDBilling Claim Statuses', async () => {
    const ohipClaimBefore = await ohipClaimSeed.getById(ohipClaimForPullClaimStatusesCFFixture.id)

    expect(ohipClaimBefore.claimStatus).toBe(ohipClaimForPullClaimStatusesCFFixture.claimStatus)

    await pullClaimStatusesHandler()

    const ohipClaimAfter = await ohipClaimSeed.getById(ohipClaimForPullClaimStatusesCFFixture.id)

    // value is mapped form MDBilling adapter mock from getClaimDetails()
    // for ClaimId: 3333333 and status value MDBillingClaimStatus.Paid
    expect(ohipClaimAfter.claimStatus).toBe(ClaimStatus.Paid)
  })

  test('Should not pull MDBilling Claim Statuses when MOH response is null', async () => {
    const spyOnAdapterGetClaimDetails = jest.spyOn(MDBillingAdapter.prototype, 'getClaimDetails')
    spyOnAdapterGetClaimDetails.mockReturnValue(Promise.resolve(null))

    await pullClaimStatusesHandler()

    spyOnAdapterGetClaimDetails.mockRestore()
  })

  test('Should not pull MDBilling Claim Statuses  when staff billingNumber is null', async () => {
    const spyOnGetStaffUserBillingNumber = jest.spyOn(
      GetBillingDbValueHelper,
      'getStaffUserBillingNumber',
    )

    spyOnGetStaffUserBillingNumber.mockReturnValue(null)

    await pullClaimStatusesHandler()

    spyOnGetStaffUserBillingNumber.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await ohipClaimSeed.removeByIds([
      ohipClaimForPullClaimStatusesCFFixture.id,
      ohipClaimWithUnknownStatusForPullClaimStatusesCFFixture.id,
    ])
    await appointmentSeed.removeByIds([
      appointmentForPullOhipClaimsFixture.id,
      appointmentForPullOhipClaimsTwoFixture.id,
    ])
    await staffSeed.removeByIds([staffWithBillingNumberFixture.id])
    await patientSeed.removeByIds([patientForAppointmentForPullOhipClaimFixture.id])
    await serviceTypeSeed.removeByIds([serviceTypeForForPullOhipClaimFixture.id])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceCategorySeed.removeByIds([serviceCategoryForForPullOhipClaimFixture.id])
    await serviceProviderSeed.removeByIds([serviceProviderForForPullOhipClaimFixture.id])
  })
})
