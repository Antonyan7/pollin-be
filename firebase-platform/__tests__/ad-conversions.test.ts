import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import * as functions from 'firebase-functions/v2'
import {GoogleAdConversionSeed} from '@seeds/typeorm'
import {adConversionsHandler} from '../functions/adconversions/src/handlers/ad-conversions.handler'
import {AdConversionsData} from '../functions/adconversions/src/types/acuity-types'
import {NestprojectConfigService} from '@libs/common'

jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/pubsub.adapter')
jest.mock('../../libs/common/src/adapters/acuity.adapter')
jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
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
jest.setTimeout(10000)
const configService = NestprojectConfigService.getInstance()
const googleAdsApiKeyConfig = configService.get<string>('GOOGLE_ADS_API_KEY')

const acuityId = 444555666

const reqPayload: Partial<functions.https.Request> = {
  body: {
    acuityId,
    googleClickId: 'googleClickId',
  } as AdConversionsData,
  headers: {'x-api-key': googleAdsApiKeyConfig},
}

const reqPayloadInvalidHeader: Partial<functions.https.Request> = {
  body: {
    acuityId: 444555667,
    googleClickId: 'googleClickId',
  } as AdConversionsData,
  headers: {'x-api-key': 'x-api'},
}

const reqPayloadEmptyHeader: Partial<functions.https.Request> = {
  body: {
    acuityId: 444555667,
    googleClickId: 'googleClickId',
  } as AdConversionsData,
}

describe('Firebase Function: create-google-ad-conversions', () => {
  let dataSource: DataSource
  let googleAdConversionSeed: GoogleAdConversionSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    googleAdConversionSeed = new GoogleAdConversionSeed(dataSource)
  })

  it(`Create Google Ad Conversions`, async () => {
    await adConversionsHandler(reqPayload as functions.https.Request)
    const googleAdConversion = await googleAdConversionSeed.findOneByAcuityId(
      reqPayload.body.acuityId,
    )
    expect(googleAdConversion.acuityId).toEqual(acuityId)
    expect(googleAdConversion.googleClickId).toEqual(reqPayload.body.googleClickId)
  })

  it(`Create Google Ad Conversions Failed invalid header`, async () => {
    await adConversionsHandler(reqPayloadInvalidHeader as functions.https.Request)
    const googleAdConversion = await googleAdConversionSeed.findOneByAcuityId(
      reqPayloadInvalidHeader.body.acuityId,
    )
    expect(googleAdConversion).toBeFalsy()
  })

  it(`Create Google Ad Conversions Failed header is empty`, async () => {
    await adConversionsHandler(reqPayloadEmptyHeader as functions.https.Request)
    const googleAdConversion = await googleAdConversionSeed.findOneByAcuityId(
      reqPayloadEmptyHeader.body.acuityId,
    )
    expect(googleAdConversion).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await googleAdConversionSeed.deleteByAcuityId(acuityId)
    await dataSource.destroy()
  })
})
