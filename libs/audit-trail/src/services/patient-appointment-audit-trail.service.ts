import {Injectable} from '@nestjs/common'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  PatientEncounterAddendum,
  PatientEncounter,
  Patient,
  PatientStaffNote,
  PatientStaffNoteAddendum,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {AppointmentRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {HistoryUserType, SystemAuthUserId} from '@libs/common/enums'

@Injectable()
export class PatientAppointmentAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private readonly auditTrailPubSubService: AuditTrailPubSubService,
    private readonly appointmentRepository: AppointmentRepository,
    private readonly staffRepository: StaffRepository,
    private readonly configService: NestprojectConfigService,
  ) {}

  async addPatientEncounterAudit(
    encounter: PatientEncounter,
    userAction: AuditUserAction,
    author: Staff,
  ): Promise<void> {
    await this.auditTrailPubSubService.publish({
      authUserId: author.authUserId,
      userAction,
      revisionId: encounter.revisionId,
      latestData: JSON.stringify(encounter),
      authUserName: `${author.firstName} ${author.lastName}`,
      tableUpdated: AuditTrailCollection.PatientEncounterRevisions,
    })
  }

  async addPatientStaffNoteAudit(
    staffNote: PatientStaffNote,
    userAction: AuditUserAction,
    author: Staff,
  ): Promise<void> {
    await this.auditTrailPubSubService.publish({
      authUserId: author.authUserId,
      userAction,
      revisionId: staffNote.revisionId,
      latestData: JSON.stringify(staffNote),
      authUserName: `${author.firstName} ${author.lastName}`,
      tableUpdated: AuditTrailCollection.PatientStaffNoteRevisions,
    })
  }

  async addPatientAddendumAudit(
    addendum: PatientEncounterAddendum,
    userAction: AuditUserAction,
    author: Staff,
  ): Promise<void> {
    await this.auditTrailPubSubService.publish({
      authUserId: author.authUserId,
      userAction,
      revisionId: addendum.revisionId,
      latestData: JSON.stringify(addendum),
      authUserName: `${author.firstName} ${author.lastName}`,
      tableUpdated: AuditTrailCollection.PatientAddendumRevisions,
    })
  }

  async addPatientStaffNoteAddendumAudit(
    staffNoteAddendum: PatientStaffNoteAddendum,
    userAction: AuditUserAction,
    author: Staff,
  ): Promise<void> {
    await this.auditTrailPubSubService.publish({
      authUserId: author.authUserId,
      userAction,
      revisionId: staffNoteAddendum.revisionId,
      latestData: JSON.stringify(staffNoteAddendum),
      authUserName: `${author.firstName} ${author.lastName}`,
      tableUpdated: AuditTrailCollection.PatientAddendumRevisions,
    })
  }

  async addAppointmentsAuditFromMobile(
    appointments: Appointment[],
    userAction: AuditUserAction,
    patient: Patient,
  ): Promise<void> {
    const authUserName = getFullName(patient.firstName, patient.lastName)

    await Promise.all(
      appointments.map((appointment) => {
        const appointmentLatestData = this.prepareAppointmentAuditData(appointment)
        return this.auditTrailPubSubService.publish({
          authUserId: patient.authUserId,
          userAction,
          revisionId: appointment.revisionId,
          latestData: JSON.stringify(appointmentLatestData),
          authUserName,
          tableUpdated: AuditTrailCollection.AppointmentRevisions,
        })
      }),
    )
  }

  async addAppointmentAuditFromClinicAudit(
    appointment: Appointment,
    userAction: AuditUserAction,
    context: {staff?: Staff; authUserId?: SystemAuthUserId; authFullName?: HistoryUserType},
  ): Promise<void> {
    const {staff, authUserId, authFullName} = context
    const authUserName = staff ? getFullName(staff?.firstName, staff?.lastName) : authFullName
    const appointmentLatestData = this.prepareAppointmentAuditData(appointment)

    await this.auditTrailPubSubService.publish({
      authUserId: staff ? staff.authUserId : authUserId,
      userAction,
      revisionId: appointment.revisionId,
      latestData: JSON.stringify(appointmentLatestData),
      authUserName,
      tableUpdated: AuditTrailCollection.AppointmentRevisions,
    })
  }

  async addAppointmentAuditFromMobileById(
    appointmentId: number,
    userAction: AuditUserAction,
    patient: Patient,
  ): Promise<void> {
    const appointment = await this.appointmentRepository.findOneById(appointmentId)
    const authUserName = getFullName(patient.firstName, patient.lastName)

    const revisionId = generateRevisionId(this.dateTimeUtil.now())

    await this.appointmentRepository.update(appointment.id, {
      revisionId,
      updatedBy: patient.authUserId,
    })

    await this.auditTrailPubSubService.publish({
      authUserId: patient.authUserId,
      userAction,
      revisionId,
      latestData: JSON.stringify(appointment),
      authUserName,
      tableUpdated: AuditTrailCollection.AppointmentRevisions,
    })
  }

  async addAppointmentAuditFromClinicById(
    appointmentId: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [appointment, staff] = await Promise.all([
      this.appointmentRepository.findOneById(appointmentId),
      this.staffRepository.findOneByAuthUserId(authUserId),
    ])
    const authUserName = getFullName(staff.firstName, staff.lastName)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())

    await this.appointmentRepository.update(appointment.id, {
      revisionId,
      updatedBy: staff.authUserId,
    })

    await this.auditTrailPubSubService.publish({
      authUserId,
      userAction,
      revisionId,
      latestData: JSON.stringify(appointment),
      authUserName,
      tableUpdated: AuditTrailCollection.AppointmentRevisions,
    })
  }

  private prepareAppointmentAuditData(appointment: Appointment): Appointment {
    const appointmentLatestData = Object.assign({}, appointment)

    delete appointmentLatestData.serviceProvider
    delete appointmentLatestData.serviceType

    return appointmentLatestData
  }
}
