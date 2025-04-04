import {patientPlanStatusV2Fixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {patientPlanForPatientStatusFixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {updatePatientStatusToNotActiveHandler} from '@firebase-platform/functions/patients/src/handlers/update-patient-status-to-not-active'
import {DataSource} from 'typeorm'
import {
  PatientSeed,
  PatientPlanSeed,
  PatientPlanStatusSeed,
  PlanCategorySeed,
  PatientPrescriptionSeed,
  PharmacySeed,
  PlanTypeSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  AppointmentSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {patientPlanMobileFixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {
  patientClinicEmrJohnSFixture,
  patientDeactivatedFixture,
  patientEmailNotVerifiedFixture,
  patientForPlans,
  planTypeFixture,
} from '@libs/common/test/fixtures'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {
  planCategoryFixture,
  planCategoryV2Fixture,
} from '@libs/common/test/fixtures/plan-category.fixture'
import {PatientStatusEnum} from '@libs/services-common/enums/patient.enum'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {patientPrescriptionForPlansFixture, pharmacyFixture} from '@libs/common/test/fixtures'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {ValidConfig} from '@config/valid-config.util'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

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

const id = 1234312
const dateNow = dateTimeUtil.now()

const serviceTypeFixture: Partial<ServiceType> = {id, name: 'update-status'}
const serviceProviderFixture: Partial<ServiceProvider> = {id}
const appointmentFixture: Partial<Appointment> = {
  id,
  patientId: patientEmailNotVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.subDays(dateNow, 200)),
}
const appointmentOnInactiveIntervalFixture: Partial<Appointment> = {
  id: id + 1,
  patientId: patientClinicEmrJohnSFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.subDays(dateNow, 2)),
}
const appointmentOutsideInactiveIntervalForActivePatientFixture: Partial<Appointment> = {
  id: id + 2,
  patientId: patientClinicEmrJohnSFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.subDays(dateNow, 300)),
}
const appointmentForLogTestFixture: Partial<Appointment> = {
  id: id + 3,
  patientId: patientForPlans.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.subDays(dateNow, 500)),
}

const patientPlanForInActivePatientFixture: Partial<PatientPlan> = {
  id,
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
  status: PlanStatusEnum.Active,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 200),
}

const prescriptionNotPaidFixture: Partial<PatientPrescription> = {
  id,
  patientId: patientClinicEmrJohnSFixture.id,
  pharmacyId: pharmacyFixture.id,
  paidOn: null,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

let patientSeed: PatientSeed
let patientPlanSeed: PatientPlanSeed
let planTypeSeed: PlanTypeSeed
let patientPlanStatusSeed: PatientPlanStatusSeed
let planCategorySeed: PlanCategorySeed
let patientPrescriptionSeed: PatientPrescriptionSeed
let pharmacySeed: PharmacySeed
let serviceProviderSeed: ServiceProviderSeed
let superTypeSeed: SuperTypeSeed
let serviceTypeSeed: ServiceTypeSeed
let appointmentSeed: AppointmentSeed

describe('Firebase Function: Update Patient Status', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)
    patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
    planCategorySeed = new PlanCategorySeed(dataSource)
    planTypeSeed = new PlanTypeSeed(dataSource)
    patientPrescriptionSeed = new PatientPrescriptionSeed(dataSource)
    pharmacySeed = new PharmacySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)

    await patientSeed.createArray([
      patientForPlans,
      {...patientClinicEmrJohnSFixture, serviceProviderId: null},
      {
        ...patientEmailNotVerifiedFixture,
        detailId: null,
        serviceProviderId: null,
        status: PatientStatusEnum.Discharged,
      },
      patientDeactivatedFixture,
    ])
    await superTypeSeed.create(superTypeOtherFixture)
    await Promise.all([
      serviceTypeSeed.create(serviceTypeFixture),
      serviceProviderSeed.create(serviceProviderFixture),
    ])
    await appointmentSeed.createArray([
      appointmentFixture,
      appointmentOnInactiveIntervalFixture,
      appointmentOutsideInactiveIntervalForActivePatientFixture,
      appointmentForLogTestFixture,
    ])
    await planCategorySeed.createArray([planCategoryFixture, planCategoryV2Fixture])
    await patientPlanStatusSeed.create(patientPlanStatusV2Fixture)
    await planTypeSeed.create({...planTypeFixture, sheets: []})
    await patientPlanSeed.createArray([
      {
        ...patientPlanForPatientStatusFixture,
        status: PlanStatusEnum.Active,
        lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 200),
      },
      patientPlanForInActivePatientFixture,
    ])
    await pharmacySeed.create(pharmacyFixture)
    await patientPrescriptionSeed.createArray([
      patientPrescriptionForPlansFixture,
      prescriptionNotPaidFixture,
    ])
  })

  test('Should update patient statuses to NotActive', async () => {
    const spyOnConfig = jest.spyOn(ValidConfig.prototype, 'get').mockImplementation(() => 180)

    const spyOnGetMax = jest.spyOn(DateTimeUtil.prototype, 'getMax')

    await updatePatientStatusToNotActiveHandler()

    const [savedPrescription, savedPlan, savedAppointment] = await Promise.all([
      patientPrescriptionSeed.getPrescriptionById(patientPrescriptionForPlansFixture.id),
      patientPlanSeed.findOneById(patientPlanForInActivePatientFixture.id),
      appointmentSeed.findById(appointmentForLogTestFixture.id),
    ])

    expect(spyOnGetMax).toHaveBeenCalledWith([
      savedAppointment.createdAt,
      savedPrescription.paidOn,
      savedPlan.lastStatusUpdateDate,
    ])

    spyOnConfig.mockRestore()
    spyOnGetMax.mockClear()

    const [
      patientWithActiveAppointment,
      patientWithInActiveAppointment,
      patientDischargedStatus,
      patientDeactivated,
    ] = await Promise.all([
      patientSeed.findOneById(patientClinicEmrJohnSFixture.id),
      patientSeed.findOneById(patientForPlans.id),
      patientSeed.findOneById(patientEmailNotVerifiedFixture.id),
      patientSeed.findOneById(patientDeactivatedFixture.id),
    ])

    expect(patientWithInActiveAppointment.status).toBe(PatientStatusEnum.NotActive)
    expect(patientWithActiveAppointment.status).toBe(PatientStatusEnum.PlanType)
    expect(patientDischargedStatus.status).toBe(PatientStatusEnum.NotActive)
    expect(patientDeactivated.status).toBe(PatientStatusEnum.Deactivated)
  })

  test('Should update patient status to NotActive for patient with not paid prescription', async () => {
    await appointmentSeed.updateCreatedAt(
      appointmentOnInactiveIntervalFixture.id,
      dateTimeUtil.subDays(dateTimeUtil.now(), 300),
    )

    const spyOnConfig = jest.spyOn(ValidConfig.prototype, 'get').mockImplementation(() => 180)

    await updatePatientStatusToNotActiveHandler()

    spyOnConfig.mockRestore()

    const patient = await patientSeed.findOneById(patientClinicEmrJohnSFixture.id)
    expect(patient.status).toBe(PatientStatusEnum.NotActive)
  })

  afterAll(async () => {
    await patientSeed.removeByIds([
      patientForPlans.id,
      patientClinicEmrJohnSFixture.id,
      patientEmailNotVerifiedFixture.id,
      patientDeactivatedFixture.id,
    ])
    await patientPlanSeed.removeByIds([
      patientPlanMobileFixture.id,
      patientPlanForPatientStatusFixture.id,
    ])
    await planTypeSeed.removeById(planTypeFixture.id)
    await patientPlanStatusSeed.removeByIds([
      patientPlanStatusFixture.id,
      patientPlanStatusV2Fixture.id,
    ])
    await planCategorySeed.removeByIds([planCategoryFixture.id, planCategoryV2Fixture.id])
    await patientPrescriptionSeed.removeByIds([patientPrescriptionForPlansFixture.id])
    await pharmacySeed.removePharmacyByIds([pharmacyFixture.id])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])

    jest.clearAllMocks()
    await dataSource.destroy()
  })
})
