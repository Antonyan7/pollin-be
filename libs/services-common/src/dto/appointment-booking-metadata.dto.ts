import {IsEnum, IsNotEmpty, IsOptional, IsString} from 'class-validator'

export enum AppointmentBookingMetadataTypeEnum {
  Order = 'Order',
  Clone = 'Clone',
}

export class AppointmentMetadataDetails {
  @IsOptional()
  @IsString()
  orderId?: string

  @IsOptional()
  @IsString()
  orderActionId?: string

  @IsOptional()
  @IsString()
  sourceAppointmentId?: string
}

export class AppointmentBookingMetadata {
  @IsNotEmpty()
  @IsEnum(AppointmentBookingMetadataTypeEnum)
  type: AppointmentBookingMetadataTypeEnum

  //TODO TEAMA-10127 - improve DTO
  @IsNotEmpty()
  details: AppointmentMetadataDetails
}
