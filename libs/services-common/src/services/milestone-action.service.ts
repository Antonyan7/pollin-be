import {Injectable} from '@nestjs/common'
import {ApplicationConfigService} from '@apps/core/application-config/application-config.service'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {AppointmentStatus} from '@libs/common/enums'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {PatientAlert} from '@libs/data-layer/apps/users/entities/typeorm'
import {MilestoneAlertDto} from '@apps/emr/milestones/dto/get-milestone-alerts.dto'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {
  MilestoneAlertActionLabel,
  MilestoneAlertCanDismiss,
  MilestoneAlertDescription,
  MilestoneAlertTitle,
  MilestoneAlertToolTip,
  patientAlertTypeToMobileResponse,
} from '@libs/services-common/enums'
import {getPatientMilestoneByType} from '@apps/emr/milestones/helpers/get-user-milestones.helper'

@Injectable()
export class MilestoneActionService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly configService: NestprojectConfigService,
  ) {}

  async getRequiredActionMilestoneAlertResponse(
    patientAlert: PatientAlert,
    isPaymentRequired: boolean,
  ): Promise<MilestoneAlertDto> {
    const {appointment} = patientAlert
    if (appointment?.serviceType?.isTentative) {
      StructuredLogger.info(
        activityLogs.PatientMilestoneFunctions.RequiredActionMilestoneHidedForTentativeApp,
        activityLogs.AppointmentAction.GetAppointmentInfo,
        {
          patientAlertUUID: patientAlert.uuid,
        },
      )
      return
    }

    let showAlert = true
    if (patientAlert.appointmentId) {
      const showCompleteRequiredActionBeforeHours = await this.getConfirmationBeforeHours(
        appointment.serviceType,
      )

      showAlert =
        patientAlert.appointment.status === AppointmentStatus.Booked &&
        this.dateTimeUtil.isDateWillComeInLessThanNHours(
          patientAlert.appointment.start,
          showCompleteRequiredActionBeforeHours,
        )
    }
    if (!showAlert && !isPaymentRequired) {
      return null
    }
    const countRequiredAction = showAlert && isPaymentRequired ? 2 : 1
    const description = MilestoneAlertDescription.get(patientAlert.type)(
      getPatientMilestoneByType(patientAlert.patientMilestone).milestoneTitle,
      countRequiredAction,
    )
    return {
      id: patientAlert.uuid,
      type: patientAlertTypeToMobileResponse.get(patientAlert.type),
      milestoneId: patientAlert.patientMilestone?.uuid,
      title: MilestoneAlertTitle.get(patientAlert.type),
      description,
      canDismiss: MilestoneAlertCanDismiss.get(patientAlert.type),
      actionLabel: MilestoneAlertActionLabel.get(patientAlert.type),
      toolTip: MilestoneAlertToolTip.get(patientAlert.type),
    }
  }

  async isRequiredActionMilestoneApptFor72Hours(
    patientMilestone: PatientMilestone,
  ): Promise<boolean> {
    const appt = patientMilestone.dominantAppointment
    if (!appt) {
      return false
    }

    if (patientMilestone.dominantAppointment?.status != AppointmentStatus.Booked) {
      return false
    }
    const showCompleteRequiredActionBeforeHours = await this.getConfirmationBeforeHours(
      patientMilestone.serviceType,
    )
    const apptStartsBeforeNHours = this.dateTimeUtil.isDateWillComeInNHours(
      appt.start,
      showCompleteRequiredActionBeforeHours,
    )
    const apptStart = this.dateTimeUtil.isSameDay(
      this.dateTimeUtil.UTCToTz(appt.start),
      this.dateTimeUtil.UTCToTz(this.dateTimeUtil.now()),
    )

    const notFinishedAppt = appt.status === AppointmentStatus.Booked

    return notFinishedAppt && (apptStart || apptStartsBeforeNHours)
  }

  async getConfirmationBeforeHours(serviceType: ServiceType): Promise<number> {
    if (serviceType?.confirmationBeforeHours) {
      return serviceType.confirmationBeforeHours
    }
    const appConfig = await this.applicationConfigService.getAppConfigs()
    if (appConfig?.appointment_config?.confirmationBeforeHours) {
      return appConfig.appointment_config.confirmationBeforeHours
    }

    return this.configService.get<number>('SHOW_COMPLETE_REQUIRED_ACTION_BEFORE_HOURS')
  }
}
