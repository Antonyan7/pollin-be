import {DateTimeUtil, FirebaseAdminProvider, initFireORM} from '@libs/common'
import {EmailProviderRepository} from '@libs/common/repositories/email-provider.repository'
import {MailgunAdapter, SendInBlueAdapter} from '@libs/common/adapters'
import {EmailProvider} from '@libs/common/model/email-provider.model'
import {Config} from '@config'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

FirebaseAdminProvider.init()
initFireORM()
jest.setTimeout(10000)
jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
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

const auditable = {
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: 'TEST',
}

const emailSendData = {
  from: {email: 'fhealthdev+test@gmail.com'},
  to: [{email: 'fhealthdev+test@gmail.com'}],
  subject: 'test',
}

const emailProviderRepository = new EmailProviderRepository()

describe('EmailAdapterProvider class', () => {
  test('should send with active Mailgun', async () => {
    const provider = new EmailAdapterProvider(emailProviderRepository)
    const spyAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyAdapterProvider.mockResolvedValue([
      {id: 'mailgun', name: 'mailgun', active: true, disabled: false, ...auditable},
    ])

    await expect(provider.sendEmail(emailSendData)).resolves.not.toThrow()
    spyAdapterProvider.mockClear()
  })

  test('should send with active Sendinblue', async () => {
    const provider = new EmailAdapterProvider(emailProviderRepository)
    const spyAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyAdapterProvider.mockImplementation(async function (this: EmailAdapterProvider) {
      this['emailProviders'] = null
      return [{id: 'sendinblue', name: 'sendinblue', active: true, disabled: false, ...auditable}]
    })

    await expect(provider.sendEmail(emailSendData)).resolves.not.toThrow()
    spyAdapterProvider.mockRestore()
  })

  test('should log if every provider is active', async () => {
    const provider = new EmailAdapterProvider(emailProviderRepository)

    const spyInactiveProviders = jest
      .spyOn(EmailAdapterProvider.prototype, 'fetchInactiveProviders')
      .mockResolvedValue([])
    await expect(provider.checkDisabledProviders()).resolves.not.toThrow()
    spyInactiveProviders.mockClear()
  })

  test('should not return providers if all of them is disabled', async () => {
    const provider = new EmailAdapterProvider(emailProviderRepository)

    const spy = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spy.mockResolvedValue([])
    const activeProviders = provider.getEmailProviders()

    await expect(activeProviders).rejects.toBeTruthy()
    spy.mockRestore()
  })

  test('should try next provider if first one fails', async () => {
    const provider = new EmailAdapterProvider(emailProviderRepository)

    const spyEmailProviderRepository = jest
      .spyOn(EmailProviderRepository.prototype, 'update')
      .mockResolvedValue(null)

    const spyAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyAdapterProvider.mockResolvedValue([
      {id: 'mailgun', name: 'mailgun', active: true, disabled: false, ...auditable},
      {id: 'sendinblue', name: 'sendinblue', active: true, disabled: false, ...auditable},
    ])

    const spyMailgun = jest.spyOn(MailgunAdapter.prototype, 'send')
    spyMailgun.mockRejectedValue('SEND FAILED!')

    const spySendInBlue = jest.spyOn(SendInBlueAdapter.prototype, 'send')
    spySendInBlue.mockRejectedValue('SEND FAILED!')

    await expect(provider.sendEmail(emailSendData)).rejects.toBeTruthy()

    spyEmailProviderRepository.mockClear()
    spyAdapterProvider.mockClear()
    spyMailgun.mockClear()
    spySendInBlue.mockClear()
  })

  test('check inactive providers', async () => {
    const provider = new EmailAdapterProvider(emailProviderRepository)

    const spyInactiveProviders = jest
      .spyOn(EmailAdapterProvider.prototype, 'fetchInactiveProviders')
      .mockResolvedValue([
        {
          active: false,
          disabled: false,
          failTimestamp: '2022-08-21T11:41:34.288Z',
        } as EmailProvider,
      ])
    await expect(provider.checkDisabledProviders()).resolves.not.toThrow()
    spyInactiveProviders.mockClear()
  })
})
