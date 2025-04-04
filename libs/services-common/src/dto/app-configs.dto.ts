export class MobileUpgradeDto {
  force: string

  optional: string

  url: string

  privacyPolicy: string

  termsOfUser: string
}

export class Links {
  privacyPolicy: string
  termsOfUser: string
  termsForBooking: string
  photoGuidelines: string
  faq: string
  privacyAndTerms: string
}

export class MobileUpgradesDto {
  ios: MobileUpgradeDto

  android: MobileUpgradeDto
}

export class PaymentConfigDTO {
  wireTransferMinimumAmount: number
  splitPaymentAmountThreshold: number
  splitPaymentMaxMethods: number
}

export class CanadaProvinceDto {
  title: string
  abbreviation: string
}

export class ContactUsContentDto {
  title: string
  description: string
}

export class MiscDto {
  canadaProvinces: CanadaProvinceDto[]
  contactUsContent?: ContactUsContentDto
}

export class AppConfigDto {
  updates: MobileUpgradesDto
  payment_config: PaymentConfigDTO
  appointment_config: AppointmentConfigDTO
}

export class AppConfigResponseDto {
  updates: MobileUpgradesDto
  links: Links
  misc: MiscDto
}

export class AppointmentConfigDTO {
  confirmationBeforeHours: number
}

export class ChatConfigDTO {
  chat_inbox_id: string
  sms_inbox_id: string
}
