/* eslint-disable no-process-env */
export const cleanUndefinedKeys = <T>(obj: T): T => {
  const clone = JSON.parse(JSON.stringify(obj))
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key])
  return clone
}

export const readBase64 = <T>(data: string): T => JSON.parse(Buffer.from(data, 'base64').toString())

export const isNullish = (values: unknown[]): boolean =>
  values.some((value) => value === null || value === undefined)

export const isE2eTestingBuild = (): boolean => process.env.NODE_ENV === 'e2eTestingBuild'

export const isE2EMode = (): boolean => process.env.IS_E2E_TESTING_MODE == 'true'

export const isE2E = (): boolean => isE2eTestingBuild() || isE2EMode()

export const checkRequiredBooleanField = (data: boolean | null): boolean => !!data

export const checkOptionalBooleanField = (data: boolean | undefined): boolean | null => data ?? null

export const checkIfFieldTypeIsBoolean = (data: boolean | undefined): boolean =>
  typeof data === 'boolean'

export const handleOptionalStringValues = (data: string | undefined): string | null => data || null

export const isUndefined = (data: unknown): boolean => typeof data === 'undefined'

export const isNull = (data: unknown): boolean => data === null

export const handleOptionalEnumValues = <T>(data: T): T | null => data || null

export const handleOptionalNumberValues = (data: number | undefined): number | null => data || null

export const handleNullableNumberValues = (data: number | undefined): number | null => data ?? null

export const checkMoreOrEqualZeroNotNullValue = (data: number | undefined): boolean =>
  data >= 0 && data != null

export const handleOptionalDateValues = (data: Date | null | undefined): string | null =>
  data ? `${data}` : null

export const isFunctionRunningInEmulator = (): boolean => process.env?.FUNCTIONS_EMULATOR === 'true'

export const isToolsEnv = (): boolean => process.env.IS_TOOLS_ENV == 'true'

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Only for debug purposes */
export const readMemoryUsage = (): Record<string, string> => {
  const formatMemoryUsage = (data): string => `${Math.round((data / 1024 / 1024) * 100) / 100} MB`
  const memoryData = process.memoryUsage()

  const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} `,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)}`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)}`,
    external: `${formatMemoryUsage(memoryData.external)}`,
  }

  return memoryUsage
}
