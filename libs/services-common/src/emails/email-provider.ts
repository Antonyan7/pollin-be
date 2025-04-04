import {NestprojectConfigService, StructuredLogger} from '@libs/common'
import {RoundRobin, EmailProvider, DateTimeUtil} from '@libs/common'
import {EmailMessage, MailgunResponse, Providers, SendinblueResponse} from '@libs/common'
import {emailAdapters} from './email-adapter'
import {EmailProviderRepository} from '@libs/common/repositories/email-provider.repository'
import {parseError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'

const configService = NestprojectConfigService.getInstance()

const reactivationHours = configService.get<number>('EMAIL_PROVIDER_REACTIVATION_HOURS')

export type EmailResult = {id: string; type: Providers}

class EmailAdapterProvider {
  private emailProviders: RoundRobin<EmailProvider>
  private dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(private emailProviderRepository: EmailProviderRepository) {}

  async sendEmail(emailMessage: EmailMessage): Promise<EmailResult> {
    this.emailProviders = await this.getEmailProviders()

    const {name, adapter} = this.emailProviders.next()
    StructuredLogger.info(
      activityLogs.EmailNotificationFunctions.ProviderSendEmail,
      activityLogs.EmailNotificationActions.UsingEmailProvider,
      {message: `Use email provider '${name}' to send`},
    )

    try {
      const emailResponse = await adapter.send(emailMessage)
      switch (name) {
        case Providers.Mailgun:
          const mailgunResponse = emailResponse as MailgunResponse
          return {type: name, id: mailgunResponse.id}
        case Providers.Sendinblue:
          const sendinblueResponse = emailResponse as SendinblueResponse
          StructuredLogger.info(
            activityLogs.EmailNotificationFunctions.ProviderSendEmail,
            activityLogs.EmailNotificationActions.ResponseCodeFromSendinBlue,
            {message: `Response Code From SendinBlue ${sendinblueResponse.status}`},
          )
          return {type: name, id: sendinblueResponse.data.messageId}
      }
    } catch (error) {
      StructuredLogger.error(
        activityLogs.EmailNotificationFunctions.ProviderSendEmail,
        activityLogs.EmailNotificationActions.SendEmailFailed,
        {...parseError(error), message: `EmailAdapterProvider: sendEmail`},
      )
      await this.handleProviderFailure({
        error,
        failedProviderName: name,
        emailMessage,
        maxTries: this.getMaxRetry(),
      })
    }
  }

  /**
   * Initializes and returns Round Robin of email providers
   */
  async getEmailProviders(): Promise<RoundRobin<EmailProvider>> {
    const activeProviders = await this.fetchActiveProviders()

    if (!activeProviders.length) {
      const message = 'Every email provider is deactivated or manually disabled'
      StructuredLogger.error(
        activityLogs.EmailNotificationFunctions.GetEmailProviders,
        activityLogs.EmailNotificationActions.DisabledOrDeactivatedProvider,
        {message},
      )
      throw new Error(message)
    }

    if (!this.emailProviders) {
      const allProviders = activeProviders.map((provider: EmailProvider) => ({
        ...provider,
        adapter: emailAdapters[provider.name],
      }))

      this.emailProviders = new RoundRobin<EmailProvider>(allProviders)
    }

    return this.emailProviders
  }

  /**
   * Deactivates failed adapter & retries sending with next adapter
   * Trial numbers are based on how many providers we have
   */
  async handleProviderFailure({
    error,
    failedProviderName,
    emailMessage,
    maxTries = 2,
  }: {
    error: {message?: string}
    failedProviderName: string
    emailMessage: EmailMessage
    maxTries?: number
  }): Promise<void> {
    // disable failed adapter for a while
    const failedAdapter = await this.getByName(failedProviderName)

    const activeProviders = await this.fetchActiveProviders()
    const canDeactivateProvider = activeProviders.length > 1

    // make sure least 1 provider is active
    if (canDeactivateProvider) {
      StructuredLogger.warn(
        activityLogs.EmailNotificationFunctions.HandleProviderFailure,
        activityLogs.EmailNotificationActions.DeactivatingProvider,
        {message: `Deactivating provider: ${failedProviderName}`},
      )

      await this.emailProviderRepository.update({
        ...failedAdapter,
        active: false,
        failTimestamp: this.dateTimeUtil.nowInISOString(),
      })
    }

    // try next adapter
    const {name, adapter} = this.emailProviders.next()
    StructuredLogger.error(
      activityLogs.EmailNotificationFunctions.HandleProviderFailure,
      activityLogs.EmailNotificationActions.TryingNextProvider,
      {
        message: `Adapter for provider: ${failedProviderName} failed, trying next one: ${name}`,
        errMsg: error.message,
      },
    )

    try {
      await adapter.send(emailMessage)
    } catch (error) {
      if (maxTries > 0) {
        return this.handleProviderFailure({
          error,
          failedProviderName: name,
          emailMessage,
          maxTries: maxTries - 1,
        })
      }

      StructuredLogger.error(
        activityLogs.EmailNotificationFunctions.HandleProviderFailure,
        activityLogs.EmailNotificationActions.HandleProviderFailureFailed,
        {...parseError(error), message: `handleProviderFailure: send`},
      )
      throw new Error(
        `handleProviderFailure: Every email provider is failing. Only ${failedProviderName} remains active`,
      )
    }
  }

  /**
   * Check disabled providers and activate after some time is passed
   */
  async checkDisabledProviders(): Promise<void> {
    const inactiveProviders = await this.fetchInactiveProviders()

    if (!inactiveProviders.length) {
      StructuredLogger.info(
        activityLogs.EmailNotificationFunctions.CheckDisabledProviders,
        activityLogs.EmailNotificationActions.EveryEmailProviderIsActive,
        {message: `checkDisabledProviders: Every email provider is active`},
      )
      return
    }

    const adapterCheck = inactiveProviders.map(async (provider) => {
      const disableTime = this.dateTimeUtil.toDate(provider.failTimestamp)
      const enableTime = this.dateTimeUtil.addHours(disableTime, Number(reactivationHours) ?? 1)
      const isEnabled = !provider.disabled

      // activate provider if some time is passed since deactivation
      if (isEnabled && this.dateTimeUtil.isAfter(this.dateTimeUtil.now(), enableTime)) {
        this.emailProviderRepository.update({
          ...provider,
          active: true,
          updatedAt: this.dateTimeUtil.getFirestoreTimeStampNowDate(),
        })

        StructuredLogger.info(
          activityLogs.EmailNotificationFunctions.CheckDisabledProviders,
          activityLogs.EmailNotificationActions.ActivatingEmailProvider,
          {message: `checkDisabledProviders: Activating email provider: ${provider.name}`},
        )
      }
    })

    await Promise.all(adapterCheck)
  }

  getMaxRetry(): number {
    return this.emailProviders.getAll().filter((provider) => provider.active).length - 1
  }

  async getByName(name: string): Promise<EmailProvider> {
    const provider = await this.emailProviderRepository.whereEqualTo('name', name).findOne()

    return provider
  }

  /**
   * Fetch active providers which are not manually disabled
   */
  async fetchActiveProviders(): Promise<EmailProvider[]> {
    return this.emailProviderRepository
      .whereEqualTo('active', true)
      .whereEqualTo('disabled', false)
      .find()
  }

  async fetchInactiveProviders(): Promise<EmailProvider[]> {
    return this.emailProviderRepository.whereEqualTo('active', false).find()
  }
}

export {EmailAdapterProvider}
