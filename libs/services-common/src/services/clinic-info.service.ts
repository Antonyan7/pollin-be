import {NestprojectConfigService} from '@libs/common'
import {Injectable} from '@nestjs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'

export interface ClinicInfo {
  country: string
  address: string
  streetAddress: string
  openTime: string
  closeTime: string
  chatOpenTime: string
  chatCloseTime: string
  timezone: string
  name: string
  brandName: string
  postalCode: string
  city: string
  unit: string
  province: string

  financeProvinceCode: string
  financeStreetAddress: string
  financePostalCode: string
  policyAddress: string
  phoneNumber: string
}

export interface ClinicHours {
  /** eq.: 07:00:00 */
  openTime: string

  /** eq.: 18:00:00 */
  closeTime: string
}

export interface ClinicTimezone {
  timezone: string
}

@Injectable()
export class ClinicInfoService {
  constructor(private configService: NestprojectConfigService) {}

  getClinicInfo(): ClinicInfo {
    try {
      const address = this.getClinicLocation()
      const streetAddress = this.configService.get<string>('CLINIC_STREET_ADDRESS')
      const clinicHours = this.getClinicHours()
      const clinicChatHours = this.getChatSupportHours()
      const clinicTimezone = this.getClinicTimezone()
      const clinicCountry = this.configService.get<string>('CLINIC_COUNTRY')
      const clinicName = this.configService.get<string>('CLINIC_NAME')
      const clinicBrandName = this.configService.get<string>('CLINIC_BRAND_NAME')
      const policyAddress = this.configService.get<string>('CLINIC_POLICY_ADDRESS')
      const financeStreetAddress = this.configService.get<string>('CLINIC_FINANCE_STREET_ADDRESS')
      const postalCode = this.configService.get<string>('CLINIC_POSTAL_CODE')
      const financePostalCode = this.configService.get<string>('CLINIC_FINANCE_POSTAL_CODE')
      const city = this.configService.get<string>('CLINIC_CITY')
      const unit = this.configService.get<string>('CLINIC_UNIT')
      const province = this.configService.get<string>('CLINIC_PROVINCE')
      const financeProvinceCode = this.configService.get<string>('CLINIC_FINANCE_PROVINCE_CODE')
      const phoneNumber = this.configService.get<string>('CLINIC_PHONE_NUMBER')

      return {
        country: clinicCountry,
        address,
        streetAddress,
        openTime: clinicHours.openTime,
        closeTime: clinicHours.closeTime,
        chatOpenTime: clinicChatHours.openTime,
        chatCloseTime: clinicChatHours.closeTime,
        timezone: clinicTimezone.timezone,
        name: clinicName,
        brandName: clinicBrandName,
        policyAddress,
        financeStreetAddress,
        city,
        unit,
        province,
        financeProvinceCode,
        postalCode,
        financePostalCode,
        phoneNumber,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicInfo,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }

  getClinicLocation(): string {
    try {
      const address = this.configService.get<string>('CLINIC_ADDRESS')
      return address
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicLocation,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }

  getClinicTimezone(): ClinicTimezone {
    try {
      const timezone = this.configService.get<string>('CLINIC_TIMEZONE')
      return {timezone}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicTimezone,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }

  getClinicHours(): ClinicHours {
    try {
      const openTime = this.configService.get<string>('CLINIC_OPEN_TIME')
      const closeTime = this.configService.get<string>('CLINIC_CLOSE_TIME')
      return {openTime, closeTime}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicHours,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }

  getChatSupportHours(): ClinicHours {
    try {
      const openTime = this.configService.get<string>('CLINIC_CHAT_SUPPORT_OPEN_TIME')
      const closeTime = this.configService.get<string>('CLINIC_CHAT_SUPPORT_CLOSE_TIME')
      return {openTime, closeTime}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetChatHours,
        eventName: activityLogs.ClinicInfoServiceActions.GetChatInfoFailed,
      })
    }
  }

  getPatientIdPrefix(): string {
    try {
      const clinicPatientIDPrefix = this.configService.get<string>('PATIENT_ID_PREFIX')
      return clinicPatientIDPrefix
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicPatientIdPrefix,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }

  getSpecimenIdPrefix(): string {
    try {
      return this.configService.get<string>('SPECIMEN_ID_PREFIX')
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicSpecimenIdPrefix,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }

  getTransportFolderIdPrefix(): string {
    try {
      return this.configService.get<string>('TRANSPORT_FOLDER_ID_PREFIX')
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicSpecimenIdPrefix,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }

  getClinicInternalAddress(): string {
    try {
      const brandName = this.configService.get<string>('CLINIC_BRAND_NAME')
      const unit = this.configService.get<string>('CLINIC_UNIT')
      const street = this.configService.get<string>('CLINIC_STREET_ADDRESS')
      const city = this.configService.get<string>('CLINIC_CITY')
      const province = this.configService.get<string>('CLINIC_PROVINCE')
      const postalCode = this.configService.get<string>('CLINIC_POSTAL_CODE')
      const phoneNumber = this.configService.get<string>('CLINIC_PHONE_NUMBER')

      return `${brandName}\n${street}, ${unit}\n${city}, ${province} ${postalCode}\n${phoneNumber}`
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ClinicInfoServiceFunctions.GetClinicInternalAddress,
        eventName: activityLogs.ClinicInfoServiceActions.GetClinicInfoFailed,
      })
    }
  }
}
