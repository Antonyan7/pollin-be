import {Injectable} from '@nestjs/common'
import {Appointment, AppointmentMetadata} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentCheckedInVia, AppointmentStatus} from '@libs/common/enums'
import {AppointmentMetadataRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'

@Injectable()
export class AppointmentMetadataUpdateService {
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )
  constructor(
    private readonly appointmentMetadataRepository: AppointmentMetadataRepository,
    private readonly configService: NestprojectConfigService,
  ) {}

  async updateCheckInAppointmentMetadata(data: {
    appointment: Appointment
    prevStatus: AppointmentStatus
    newStatus: AppointmentStatus
    appointmentCheckInVia?: AppointmentCheckedInVia
  }): Promise<void> {
    try {
      const {appointment, prevStatus, newStatus, appointmentCheckInVia} = data

      if (prevStatus == newStatus) {
        return
      }

      //to clear prev data around checkInd or inProgress
      const emptyAppMetadataData: Partial<AppointmentMetadata> = {
        appointmentId: appointment.id,

        lastDateChangedToInProgress: null,
        checkedInDate: null,
        checkedInVia: null,
      }

      if (![AppointmentStatus.CheckedIn, AppointmentStatus.InProgress].includes(newStatus)) {
        if ([AppointmentStatus.CheckedIn, AppointmentStatus.InProgress].includes(prevStatus)) {
          await this.appointmentMetadataRepository.update(
            {appointmentId: appointment.id},
            {...emptyAppMetadataData},
          )
        }

        return
      }

      const metadata = await this.appointmentMetadataRepository.findOneByAppointmentId(
        appointment.id,
      )
      emptyAppMetadataData.id = metadata?.id ?? null

      if (newStatus == AppointmentStatus.InProgress) {
        await this.appointmentMetadataRepository.save({
          ...emptyAppMetadataData,

          lastDateChangedToInProgress: this.dateTimeUtil.now(),
        })
        return
      }

      if (newStatus == AppointmentStatus.CheckedIn) {
        await this.appointmentMetadataRepository.save({
          ...emptyAppMetadataData,

          checkedInDate: this.dateTimeUtil.now(),
          checkedInVia: appointmentCheckInVia ? appointmentCheckInVia : AppointmentCheckedInVia.Web,
        })
        return
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.PatientServiceFunctions.SaveAppointmentMetadata,
        eventName: activityLogs.PatientServiceActions.ConfirmCheckInAppointmentsFailed,
      })
    }
  }
}
