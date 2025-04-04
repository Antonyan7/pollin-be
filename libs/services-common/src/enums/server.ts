export enum Service {
  Core = 'default',
  Swagger = 'swagger',
  Download = 'download',
  LIS = 'lis',
  EMR = 'emr',
  Booking = 'booking',
  LisBackground = 'lis-background',
  EmrBackground = 'emr-background',
  BookingBackground = 'booking-background',
  CoreBackground = 'core-background',
}

export const ServicePrefix = new Map<Service, string>([
  [Service.Core, 'core'],
  [Service.Download, 'download'],
  [Service.LIS, 'lis'],
  [Service.EMR, 'emr'],
  [Service.Booking, 'booking'],
  [Service.LisBackground, 'lis-background'],
  [Service.EmrBackground, 'emr-background'],
  [Service.BookingBackground, 'booking-background'],
  [Service.CoreBackground, 'core-background'],
])
