import {NestprojectConfigService} from '@libs/common/services'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {Injectable} from '@nestjs/common'
import {padStart} from 'lodash'

@Injectable()
export class IdentifierGenerator {
  private configService = NestprojectConfigService.getInstance()
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  generateTransportFolderIdentifier(id: number, transportDate: string): string {
    const prefix = this.configService.get<string>('TRANSPORT_FOLDER_ID_PREFIX')
    return `${prefix}${id}-${this.dateTimeUtil.getCurrentMonthAndDayString(
      transportDate.toString(),
    )}`
  }

  //Used on CF
  generateSpecimenIdentifier(id: number): string {
    const prefix = this.configService.get<string>('SPECIMEN_ID_PREFIX')
    return this.getIdentifier(prefix, id)
  }

  generateAppointmentIdentifier(id: number): string {
    const prefix = this.configService.get<string>('APPOINTMENT_ID_PREFIX')
    return this.getIdentifier(prefix, id)
  }

  generatePatientIdentifier(id: number): string {
    const prefix = this.configService.get<string>('PATIENT_ID_PREFIX')
    return this.getIdentifier(prefix, id)
  }
  generateBarcode(id: number): string {
    const prefix = this.configService.get<string>('DISH_BARCODE_PREFIX')
    return this.getBarcode(prefix, id)
  }

  generateCryoContainerIdentifier(id: number, index: number, isExternal?: boolean): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const prefix = this.configService.get<string>('SPECIMEN_ID_PREFIX')
    const year = this.dateTimeUtil.getYearLastTwoDigits()
    const letter = alphabet[index].toUpperCase()

    if (!!isExternal) {
      return `${prefix}${year}-X${id.toString().padStart(9, '0')}${letter}`
    }

    return `${prefix}${year}-${id.toString().padStart(9, '0')}${letter}`
  }

  getIdentifier(prefix: string, id: number): string {
    return `${prefix}${id.toString().padStart(9, '0')}`
  }
  getBarcode(prefix: string, id: number): string {
    return `${prefix}${id.toString().padStart(9, '0')}`
  }

  generateContainerIdentifier(prefix: string, patientId: number, containerNumber: number): string {
    const yearLastTwo = this.dateTimeUtil.getYearLastTwoDigits()
    const containerNum = parseInt(padStart(containerNumber.toString(), 2, '0'), 10)

    return `${prefix}${yearLastTwo}-${patientId}-${containerNum}`
  }
}
