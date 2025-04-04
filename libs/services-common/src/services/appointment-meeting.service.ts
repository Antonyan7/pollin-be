import * as i18Messages from '@libs/common/i18n/en/message.json'
import {NestprojectConfigService, StructuredLogger} from '@libs/common'
import {ZoomAdapter} from '@libs/common/adapters/zoom.adapter'
import {AppointmentStatus} from '@libs/common/enums'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {RedisService} from '@libs/redis'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {Injectable} from '@nestjs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

@Injectable()
export class AppointmentMeetingService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: NestprojectConfigService,
    private readonly i18nService: I18nLocalizationService,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  /**returns array of warning messages */
  async handleMeeting(payload: {
    appointment: Appointment
    serviceType: ServiceType
    serviceProvider: ServiceProvider
    patient: Patient
    oldServiceProvider?: ServiceProvider
  }): Promise<string[]> {
    const {appointment, serviceType, oldServiceProvider, serviceProvider} = payload

    if (appointment.virtualMeetingUrl?.trim()?.length && !appointment.virtualMeetingId) {
      StructuredLogger.info(
        activityLogs.AppointmentFunction.HandleMeeting,
        activityLogs.AppointmentAction.ManualMeetingLinkProvided,
        {appointmentId: appointment.id},
      )

      return []
    }

    if (appointment.parentAppointmentId) {
      StructuredLogger.info(
        activityLogs.AppointmentFunction.HandleMeeting,
        activityLogs.AppointmentAction.AppointmentHasParentId,
        {appointmentId: appointment.id},
      )
      return []
    }

    if (
      serviceType.type !== ServiceTypeMethod.Virtual ||
      [AppointmentStatus.Cancelled, AppointmentStatus.NoShow].includes(appointment.status)
    ) {
      return this.removeMeetingIfExists(appointment)
    }

    if (
      oldServiceProvider &&
      oldServiceProvider.externalZoomUserId !== serviceProvider.externalZoomUserId
    ) {
      const deleteWarnings = await this.removeMeetingIfExists(appointment)
      const createWarnings = await this.createMeeting(payload)

      return [...deleteWarnings, ...createWarnings].filter(Boolean)
    }

    return appointment.virtualMeetingId ? this.updateMeeting(payload) : this.createMeeting(payload)
  }

  private async createMeeting(payload: {
    appointment: Appointment
    serviceType: ServiceType
    serviceProvider: ServiceProvider
    patient: Patient
  }): Promise<string[]> {
    const {appointment, serviceType, serviceProvider, patient} = payload

    StructuredLogger.info(
      activityLogs.AppointmentFunction.CreateMeeting,
      activityLogs.AppointmentAction.RequiresMeetingCreation,
      {appointmentId: appointment.id, meetingId: appointment.virtualMeetingId},
    )

    const zoomAdapter = new ZoomAdapter(this.redisService, this.configService)

    const {meetingId, meetingURL} = await zoomAdapter.createMeeting(
      serviceProvider.externalZoomUserId,
      {
        date: appointment.start,
        duration: serviceType.durationInMinutes,
        title: this.getMeetingTitle(serviceType, serviceProvider, patient),
        inviteesEmails: [patient.email],
      },
    )

    if (meetingURL) {
      await this.appointmentRepository.update(appointment.id, {
        virtualMeetingId: meetingId,
        virtualMeetingUrl: meetingURL,
      })
    }

    return meetingURL ? [] : [this.i18nService.translate(i18Messages.ZOOM_GENERATION_FAILED)]
  }

  private async removeMeetingIfExists(appointment: Appointment): Promise<string[]> {
    if (!appointment.virtualMeetingId) {
      StructuredLogger.info(
        activityLogs.AppointmentFunction.RemoveMeetingIfExists,
        activityLogs.AppointmentAction.NoMeetingIdToDelete,
        {appointmentId: appointment.id},
      )

      return []
    }

    const zoomAdapter = new ZoomAdapter(this.redisService, this.configService)

    const result = await zoomAdapter.deleteMeeting(appointment.virtualMeetingId)

    await this.appointmentRepository.update(appointment.id, {
      virtualMeetingId: null,
      virtualMeetingUrl: null,
    })

    return result ? [] : [this.i18nService.translate(i18Messages.ZOOM_DELETE_FAILED)]
  }

  private async updateMeeting(payload: {
    appointment: Appointment
    serviceType: ServiceType
    serviceProvider: ServiceProvider
    patient: Patient
  }): Promise<string[]> {
    const {appointment, serviceType, serviceProvider, patient} = payload

    StructuredLogger.info(
      activityLogs.AppointmentFunction.UpdateAppointment,
      activityLogs.AppointmentAction.RequiresMeetingUpdate,
      {appointmentId: appointment.id, meetingId: appointment.virtualMeetingId},
    )

    const zoomAdapter = new ZoomAdapter(this.redisService, this.configService)

    const result = await zoomAdapter.updateMeeting(appointment.virtualMeetingId, {
      date: appointment.start,
      duration: serviceType.durationInMinutes,
      title: this.getMeetingTitle(serviceType, serviceProvider, patient),
    })

    return result ? [] : [this.i18nService.translate(i18Messages.ZOOM_UPDATE_FAILED)]
  }

  private getMeetingTitle(
    serviceType: ServiceType,
    serviceProvider: ServiceProvider,
    patient: Patient,
  ): string {
    return `${serviceType.name} - ${serviceProvider.title} X ${getFullName(patient.firstName, patient.lastName)}`
  }
}
