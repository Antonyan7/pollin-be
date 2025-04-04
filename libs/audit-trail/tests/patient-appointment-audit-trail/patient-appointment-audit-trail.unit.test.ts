import {AuditTrailPubSubService, PatientAppointmentAuditTrailService} from '@libs/audit-trail'
import {NestprojectConfigService} from '@libs/common'
import {SystemAuthUserId} from '@libs/common/enums'
import {appointmentFixture} from '@libs/common/test/fixtures'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {AppointmentRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {AuditUserAction} from '@libs/services-common/enums'
import {DataSource, Equal} from 'typeorm'

// eslint-disable-next-line max-lines-per-function
describe('PatientAppointmentAuditTrailService', () => {
  let dataSource: DataSource
  let appointmentRepository: AppointmentRepository
  let configService: NestprojectConfigService
  let staffRepository: StaffRepository
  let auditTrailPubSubService: AuditTrailPubSubService
  let patientAppointmentAuditTrailService: PatientAppointmentAuditTrailService
  const stubStaff = {
    authUserId: SystemAuthUserId.AppointmentCreatedHandler,
  } as Staff

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    configService = NestprojectConfigService.getInstance()

    appointmentRepository = new AppointmentRepository(dataSource)
    staffRepository = new StaffRepository(dataSource, configService)
    auditTrailPubSubService = new AuditTrailPubSubService(configService)

    patientAppointmentAuditTrailService = new PatientAppointmentAuditTrailService(
      auditTrailPubSubService,
      appointmentRepository,
      staffRepository,
      configService,
    )
  })

  it(`should not pass serviceType and serviceProvider to the publish method in addAppointmentAuditFromClinicAudit`, async () => {
    const spyPublish = jest.spyOn(AuditTrailPubSubService.prototype, 'publish')
    const appointment = await appointmentRepository.findOne({
      where: {id: Equal(appointmentFixture.id)},
      relations: {
        serviceType: true,
        serviceProvider: true,
        patient: true,
      },
    })

    await patientAppointmentAuditTrailService.addAppointmentAuditFromClinicAudit(
      appointment,
      AuditUserAction.Create,
      {staff: stubStaff},
    )

    expect(spyPublish).toHaveBeenCalledTimes(1)

    // Verify serviceType and serviceProvider are not included in latestData
    const callArgs = spyPublish.mock.calls[0][0]
    const parsedLatestData = JSON.parse(callArgs.latestData)
    expect(parsedLatestData).toBeDefined()
    expect(parsedLatestData.serviceType).toBeUndefined()
    expect(parsedLatestData.serviceProvider).toBeUndefined()

    // Verify serviceType and serviceProvider is not modified
    expect(appointment).toBeDefined()
    expect(appointment.serviceType).toBeDefined()
    expect(appointment.serviceProvider).toBeDefined()

    spyPublish.mockRestore()
  })

  it(`should not pass serviceType and serviceProvider to the publish method in addAppointmentAuditFromMobileById`, async () => {
    const spyPublish = jest.spyOn(AuditTrailPubSubService.prototype, 'publish')
    const appointment = await appointmentRepository.findOne({
      where: {id: Equal(appointmentFixture.id)},
      relations: {
        patient: true,
      },
    })

    await patientAppointmentAuditTrailService.addAppointmentAuditFromMobileById(
      appointmentFixture.id,
      AuditUserAction.Create,
      appointment.patient,
    )

    expect(spyPublish).toHaveBeenCalledTimes(1)

    // Verify serviceType and serviceProvider are not included in latestData
    const callArgs = spyPublish.mock.calls[0][0]
    const parsedLatestData = JSON.parse(callArgs.latestData)
    expect(parsedLatestData).toBeDefined()
    expect(parsedLatestData.serviceType).toBeUndefined()
    expect(parsedLatestData.serviceProvider).toBeUndefined()

    spyPublish.mockRestore()
  })

  it(`should not pass serviceType and serviceProvider to the publish method in addAppointmentAuditFromClinicById`, async () => {
    const spyPublish = jest.spyOn(AuditTrailPubSubService.prototype, 'publish')
    const appointment = await appointmentRepository.findOne({
      where: {id: Equal(appointmentFixture.id)},
      relations: {
        patient: true,
      },
    })

    await patientAppointmentAuditTrailService.addAppointmentAuditFromClinicById(
      appointmentFixture.id,
      AuditUserAction.Create,
      appointment.patient.authUserId,
    )

    expect(spyPublish).toHaveBeenCalledTimes(1)

    // Verify serviceType and serviceProvider are not included in latestData
    const callArgs = spyPublish.mock.calls[0][0]
    const parsedLatestData = JSON.parse(callArgs.latestData)
    expect(parsedLatestData).toBeDefined()
    expect(parsedLatestData.serviceType).toBeUndefined()
    expect(parsedLatestData.serviceProvider).toBeUndefined()

    spyPublish.mockRestore()
  })

  it(`should not pass serviceType and serviceProvider to the publish method in addAppointmentAuditFromClinicAudit`, async () => {
    const spyPublish = jest.spyOn(AuditTrailPubSubService.prototype, 'publish')
    const appointment = await appointmentRepository.findOne({
      where: {id: Equal(appointmentFixture.id)},
      relations: {
        serviceType: true,
        serviceProvider: true,
        patient: true,
      },
    })
    const data = [appointment]

    await patientAppointmentAuditTrailService.addAppointmentsAuditFromMobile(
      data,
      AuditUserAction.Create,
      appointment.patient,
    )

    expect(spyPublish).toHaveBeenCalledTimes(data.length)

    // Verify serviceType and serviceProvider are not included in latestData
    for (const call of spyPublish.mock.calls) {
      const callArgs = call[0]
      const parsedLatestData = JSON.parse(callArgs.latestData)
      expect(parsedLatestData).toBeDefined()
      expect(parsedLatestData.serviceType).toBeUndefined()
      expect(parsedLatestData.serviceProvider).toBeUndefined()
      // Verify serviceType and serviceProvider is not modified
      expect(appointment).toBeDefined()
      expect(appointment.serviceType).toBeDefined()
      expect(appointment.serviceProvider).toBeDefined()
    }

    spyPublish.mockRestore()
  })
})
