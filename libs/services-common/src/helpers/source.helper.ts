import {OperationSystemsEnum} from '../enums/operation-systems.enum'

export function isMobileSource(source: string): boolean {
  return source === OperationSystemsEnum.ANDROID || source === OperationSystemsEnum.IOS
}
