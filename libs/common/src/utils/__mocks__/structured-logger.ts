export const StructuredLogger = {
  info: (): void => void 0,
  warn: (): void => void 0,
  debug: (): void => void 0,
  error: (): void => void 0,
  activity: (): void => void 0,
  setRequestContext: (): void => void 0,
}

export const ActivityLogFields = new Set(['patientId', 'staffUserId'])
