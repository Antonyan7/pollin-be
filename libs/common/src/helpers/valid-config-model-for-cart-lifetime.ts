import {ExposeNumber, ValidConfig} from '@config/valid-config.util'

class ConfigModel {
  @ExposeNumber()
  CART_LIFETIME_DAYS
}
export const validConfig = new ValidConfig()
;(async (): Promise<void> => {
  await validConfig.validateModel(ConfigModel)
})()
