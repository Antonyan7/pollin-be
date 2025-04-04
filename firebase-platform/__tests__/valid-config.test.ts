import {Config} from '@config/config.util'

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

import {ValidConfig, ExposeNumber, isNumber, ExposeString} from '@config/valid-config.util'
// use @Expose() for every parameter
class ConfigModel {
  @ExposeNumber()
  SLOT_DURATION_IN_MINUTES

  @ExposeString()
  DEFAULT_TIME_ZONE
}
const validConfig = new ValidConfig()
;(async (): Promise<void> => {
  await validConfig.validateModel(ConfigModel)
})()

describe('Valid Config', () => {
  test('Checking appropriate return type from validConfig', async () => {
    const slotDurationFromConfigAsNumber = validConfig.get<number>('SLOT_DURATION_IN_MINUTES')
    const SlotDurationFromConfigAsString = Config.get<string>('SLOT_DURATION_IN_MINUTES').toString()
    const stringTimeZoneString = validConfig.get<string>('DEFAULT_TIME_ZONE')

    // expect in diff ways - including to to avoid error in class-validator
    expect(isNumber(SlotDurationFromConfigAsString)).toBe(false)

    const numberSloturationFromString = Number(SlotDurationFromConfigAsString)
    expect(isNumber(slotDurationFromConfigAsNumber)).toBe(true)
    expect(slotDurationFromConfigAsNumber).toBe(numberSloturationFromString)
    expect(Number(slotDurationFromConfigAsNumber)).toBe(numberSloturationFromString)
    expect(slotDurationFromConfigAsNumber === numberSloturationFromString).toBe(true)

    expect(stringTimeZoneString).toBe('America/Toronto')
  })
})
