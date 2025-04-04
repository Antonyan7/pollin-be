import * as path from 'path'
import {I18nModule, HeaderResolver} from 'nestjs-i18n'
import {ClientHeaders} from '../enums'
import {isRunningOnGCP} from '../utils'
import {NestprojectConfigService} from '../services'

const isJestEnv = NestprojectConfigService.getInstance().isTestEnv()
const fileLoadPath = isJestEnv ? '../i18n/' : '/i18n/'

export const LocalizationModule = I18nModule.forRoot({
  fallbackLanguage: 'en',
  loaderOptions: {
    path: path.join(__dirname, fileLoadPath),
    watch: !isRunningOnGCP(),
  },
  resolvers: [new HeaderResolver([ClientHeaders.Lang])],
})
