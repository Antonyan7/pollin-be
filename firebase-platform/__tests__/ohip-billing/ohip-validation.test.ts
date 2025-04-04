import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {DataSource} from 'typeorm'
import {AppointmentSeed, PatientSeed, ServiceProviderSeed, SuperTypeSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {ServiceCategoryInputSeed, ServiceCategorySeed, ServiceTypeSeed} from '@seeds/typeorm'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {StaffSeed} from '@seeds/typeorm'
import {PatientOhipAvailability} from '@libs/services-common/enums'
import {OhipValidationForTodayAppointmentsHandler} from '@firebase-platform/functions/ohip-billing/src/handlers/ohip-validation-appointment'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import * as i18Messages from '@libs/common/i18n/en/message.json'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const serviceTypeId = 548809999
const appointmentId = 548809999
const patientId = 548809999
const serviceProviderId = 548809999
const serviceCategoryId = 548809999

const today = dateTimeUtil.now()

const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId,
  durationInMinutes: 30,
}

const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: 'ohipValidation',
  patientIdentifier: 'PID123148',
  firstName: 'firstName',
  lastName: 'lastName',
  ohipCardNumber: '1111333346', //invalid
  ohipCardVersionCode: 'MV',
  isOhipValid: true,
  ohipAvailability: PatientOhipAvailability.Yes,
}

export const staffData: Partial<Staff> = {
  id: 548809999,
  email: 'staff-email@fhhealth+com',
  billingNumberForMdBilling: '00001',
}

const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
}

const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  status: AppointmentStatus.Booked,
  patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: today,
  end: dateTimeUtil.addDays(today, 1),
  identifier: 'A123123158',
  externalAppointmentIDForAcuity: 548660110, //random
}

jest.setTimeout(20000)
jest.mock('../../../libs/common/src/adapters/md-billing.adapter.ts')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')

describe('Firebase Function: Ohip Validation', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let serviceProviderSeed: ServiceProviderSeed
  let appointmentSeed: AppointmentSeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let serviceCategorySeed: ServiceCategorySeed
  let staffSeed: StaffSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    staffSeed = new StaffSeed(dataSource)

    await Promise.all([serviceCategorySeed.create(serviceCategoryData)])

    superTypeSeed = new SuperTypeSeed(dataSource)

    await superTypeSeed.create(superTypeOtherFixture)

    await Promise.all([
      serviceTypeSeed.create(serviceTypeData),
      serviceProviderSeed.create(serviceProviderData),
      patientSeed.create(patientData),
      staffSeed.create(staffData),
    ])

    await appointmentSeed.createArray([appointmentData])
  })

  it('Should check ohip is not valid mdbilling is down (patient not updated)', async () => {
    await OhipValidationForTodayAppointmentsHandler()
    const patient = await patientSeed.getPatientByAuthUserId(patientData.authUserId)
    expect(patient.isOhipValid).toBeFalsy()
  })

  it('Should check ohip is valid', async () => {
    //Update ohip number to valid value
    await patientSeed.updatePatient(patientId, {
      ohipCardNumber: '2394314096',
    })

    await OhipValidationForTodayAppointmentsHandler()
    const patient = await patientSeed.getPatientByAuthUserId(patientData.authUserId)
    expect(patient.isOhipValid).toBeTruthy()
    expect(patient.ohipCardNumber).toEqual('2394314096')
  })

  it('Should check ohip is valid and if it is it will keep valid successfully', async () => {
    await OhipValidationForTodayAppointmentsHandler()
    const patient = await patientSeed.getPatientByAuthUserId(patientData.authUserId)
    expect(patient.isOhipValid).toBeTruthy()
  })

  it('Should check error error message', async () => {
    await patientSeed.updatePatient(patientId, {
      ohipCardNumber: '2394314099',
    })
    await OhipValidationForTodayAppointmentsHandler()
    const patient = await patientSeed.getPatientByAuthUserId(patientData.authUserId)
    expect(patient.isOhipValid).toBeFalsy()
    expect(patient.invalidOhipErrorMessage).not.toContain('mdBillingErrors')
    expect(patient.invalidOhipErrorMessage).toContain(
      i18Messages.OHIP_VALIDATE_FAILED_BY_MD_BILLING_WITH_REASON.replace('{mdBillingErrors}', ''),
    )
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await appointmentSeed.removeByIds([appointmentId])

    await Promise.all([
      serviceProviderSeed.removeByIds([serviceProviderId]),
      serviceTypeSeed.removeById(serviceTypeId),
    ])

    await Promise.all([
      patientSeed.removeByIds([patientId]),
      serviceCategorySeed.removeById(serviceCategoryId),
      staffSeed.removeByIds([staffData.id]),
    ])

    await superTypeSeed.removeByIds([superTypeOtherFixture.id])

    await dataSource.destroy()
  })
})
