import {v4} from 'uuid'

export const generateRevisionId = (currentDate: Date): string => `${currentDate.getTime()}${v4()}`
