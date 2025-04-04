import {IdentifierPrefix} from '@libs/services-common/enums'

export function identifier(prefix: IdentifierPrefix, id: string): string {
  return `${prefix}-${id.replace(/\s/g, '')}`
}

export const generateProfileHighlightStimSheetLabel = (i: number): string => `Stim Sheet ${i}`
