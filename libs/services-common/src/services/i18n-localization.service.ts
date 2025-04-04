import {Injectable} from '@nestjs/common'
import {getRequestContext} from '@libs/services-common/helpers/async-hook'
import {ClientHeaders} from '@libs/common/enums'
import {I18nService} from 'nestjs-i18n'
import {reversedKeyValueMessages} from '@libs/common/i18n/reversed-key-value.messages'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

@Injectable()
export class I18nLocalizationService {
  private static instance: I18nLocalizationService

  constructor(private i18: I18nService) {
    if (!I18nLocalizationService.instance) {
      I18nLocalizationService.instance = this
    }
  }

  supportedLanguages = [
    //default language
    'en',
  ]

  static getInstance(): I18nLocalizationService {
    return I18nLocalizationService.instance
  }

  translate(message: string, args?: unknown): string {
    const clientLanguage = getRequestContext()?.[ClientHeaders.Lang]

    const lang = this.supportedLanguages.includes(clientLanguage)
      ? clientLanguage
      : this.getDefaultLanguage(clientLanguage)
    return this.i18.translate(`message.${reversedKeyValueMessages[message]}`, {lang, args})
  }

  getDefaultLanguage(clientLanguage: string): string {
    StructuredLogger.warn(
      activityLogs.LocalizationFunctions.GetDefaultLanguange,
      activityLogs.LocalizationActions.UnsupportedLanguagePassed,
      {clientLanguage},
    )

    return this.supportedLanguages[0]
  }
}
