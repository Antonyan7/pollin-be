import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {pullBillingCodesHandler} from '@firebase-platform/functions/ohip-billing/src/handlers/pull-billing-codes'
import {MdBillingDiagnosticCodeSeed, MdBillingServiceCodeSeed, StaffSeed} from '@seeds/typeorm'
import {
  mdBillingDiagnosticCodeFixture,
  mdBillingServiceCodeFixture,
  staffWithBillingNumberFixture,
} from '../fixtures/ohip-billing/pull-mdbilling.fixture'
import {MDBillingAdapter} from '@libs/common/adapters'
import GetBillingDbValueHelper from '@firebase-platform/functions/ohip-billing/src/common/get-db-value.helper'

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

describe('Firebase CF: Pull MDBilling Codes', () => {
  let dataSource: DataSource
  let staffSeed: StaffSeed
  let mdBillingServiceCodeSeed: MdBillingServiceCodeSeed
  let mdBillingDiagnosticCodeSeed: MdBillingDiagnosticCodeSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    staffSeed = new StaffSeed(dataSource)
    mdBillingServiceCodeSeed = new MdBillingServiceCodeSeed(dataSource)
    mdBillingDiagnosticCodeSeed = new MdBillingDiagnosticCodeSeed(dataSource)

    await staffSeed.create(staffWithBillingNumberFixture)
    await mdBillingServiceCodeSeed.create(mdBillingServiceCodeFixture)
    await mdBillingDiagnosticCodeSeed.create(mdBillingDiagnosticCodeFixture)
  })

  test('Should pull MDBilling Service and Diagnostic Codes', async () => {
    const mdBillingServiceCodeBefore = await mdBillingServiceCodeSeed.findOneById(
      mdBillingServiceCodeFixture.id,
    )
    expect(mdBillingServiceCodeBefore.serviceCode).toBe(mdBillingServiceCodeFixture.serviceCode)

    const mdBillingDiagnosticCodeBefore = await mdBillingDiagnosticCodeSeed.findOneById(
      mdBillingDiagnosticCodeFixture.id,
    )
    expect(mdBillingDiagnosticCodeBefore.diagnosticCode).toBe(
      mdBillingDiagnosticCodeFixture.diagnosticCode,
    )

    await pullBillingCodesHandler()

    const mdBillingServiceCodeAfter = await mdBillingServiceCodeSeed.findOneById(
      mdBillingServiceCodeFixture.id,
    )

    const mdBillingDiagnosticCodeAfter = await mdBillingDiagnosticCodeSeed.findOneById(
      mdBillingDiagnosticCodeFixture.id,
    )

    expect(mdBillingServiceCodeAfter.serviceCodeId).toBe(mdBillingServiceCodeFixture.serviceCodeId)
    expect(mdBillingServiceCodeAfter.serviceCode).toBe('#####') // value from md-billing adapter mock getServiceCodes()

    expect(mdBillingDiagnosticCodeAfter.diagnosticCodeId).toBe(
      mdBillingDiagnosticCodeFixture.diagnosticCodeId,
    )
    expect(mdBillingDiagnosticCodeAfter.diagnosticCode).toBe('#####') // value from md-billing adapter mock getDiagnosticCodes()
    expect(mdBillingDiagnosticCodeAfter.diagnosticCodeDescription).toBe('Description') // value from md-billing adapter mock getDiagnosticCodes()
  })

  test('Should not pull MDBilling Service and Diagnostic Codes when MOH response is null', async () => {
    const spyOnAdapterGetServiceCodes = jest.spyOn(MDBillingAdapter.prototype, 'getServiceCodes')
    spyOnAdapterGetServiceCodes.mockReturnValue(Promise.resolve(null))

    const spyOnAdapterGetDiagnosticCodes = jest.spyOn(
      MDBillingAdapter.prototype,
      'getDiagnosticCodes',
    )
    spyOnAdapterGetDiagnosticCodes.mockReturnValue(Promise.resolve(null))

    await pullBillingCodesHandler()

    spyOnAdapterGetServiceCodes.mockRestore()
    spyOnAdapterGetDiagnosticCodes.mockRestore()
  })

  test('Should not pull Billing Codes when staff billingNumber is null', async () => {
    const spyOnGetStaffUserBillingNumber = jest.spyOn(
      GetBillingDbValueHelper,
      'getStaffUserBillingNumber',
    )
    spyOnGetStaffUserBillingNumber.mockReturnValue(null)

    await pullBillingCodesHandler()

    spyOnGetStaffUserBillingNumber.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await mdBillingDiagnosticCodeSeed.removeByIds([mdBillingDiagnosticCodeFixture.id])
    await mdBillingServiceCodeSeed.removeByIds([mdBillingServiceCodeFixture.id])
    await staffSeed.removeByIds([staffWithBillingNumberFixture.id])
  })
})
