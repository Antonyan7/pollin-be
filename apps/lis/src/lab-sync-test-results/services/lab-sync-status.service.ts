import {Injectable} from '@nestjs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {
  LabIntegrationCode,
  LabSyncStatus,
  LabSyncTestResultStatus,
  LabSyncTestResultStatusLabel,
} from '@libs/data-layer/apps/clinic-test/enums'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'
import {LabSyncRawDataRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'

import {
  GetLabSyncTestResultAlertsResponseDTO,
  LabSyncDetailsDTO,
  labSyncStatusEnumMap,
  LabSyncStatusesResponseDTO,
} from '../dto/lab-sync-test-result-status.dto'
import {DateTimeUtil, StructuredLogger} from '@libs/common'
import {LabSyncRawData} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {DefaultValue} from '@libs/common/enums'
import {getLabSyncStatusFilters} from '../helper/lab-sync-test-results-filter.helper'
import {UnlinkedTestResultFiltersResponseDTO} from '../dto/get-lab-sync-test-results.dto'
import {LabSyncStatusAction, LabSyncStatusActionLabel} from '../enum/lab-sync-list.enum'

@Injectable()
export class LabSyncStatusService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(
    private configService: NestprojectConfigService,
    private labSyncRawDataRepository: LabSyncRawDataRepository,
  ) {}

  async getLabSyncResultAlerts(): Promise<GetLabSyncTestResultAlertsResponseDTO> {
    const labSyncDetails: LabSyncDetailsDTO[] = []

    try {
      const latestFromDynacare = await this.labSyncRawDataRepository.findOneLatestByCode(
        LabIntegrationCode.Dynacare,
      )

      if (!latestFromDynacare) {
        StructuredLogger.warn(
          activityLogs.LabSyncTestResultsFunctions.GetLabSyncResultAlerts,
          activityLogs.LabSyncTestResultsActions.GetLabSyncResultAlertNotFound,
          {message: 'There is no result from Dynacare'},
        )
      } else {
        const dynacareLast = await this.getLabLastSyncAlert(latestFromDynacare)

        labSyncDetails.push(dynacareLast)
      }

      const latestFromLifeLabs = await this.labSyncRawDataRepository.findOneLatestByCode(
        LabIntegrationCode.LifelabsOntario,
      )

      if (!latestFromLifeLabs) {
        StructuredLogger.warn(
          activityLogs.LabSyncTestResultsFunctions.GetLabSyncResultAlerts,
          activityLogs.LabSyncTestResultsActions.GetLabSyncResultAlertNotFound,
          {message: 'There is no result from LifeLabs'},
        )
      } else {
        const lifeLabsLast = await this.getLabLastSyncAlert(latestFromLifeLabs)

        labSyncDetails.push(lifeLabsLast)
      }

      return {labSyncDetails}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabSyncTestResultsFunctions.GetLabSyncResultAlerts,
        eventName: activityLogs.LabSyncTestResultsActions.GetLabSyncResultAlertsFailed,
      })
    }
  }

  async getLabSyncTestResultsListFilters(): Promise<UnlinkedTestResultFiltersResponseDTO> {
    try {
      const statusFilters = getLabSyncStatusFilters()

      StructuredLogger.info(
        activityLogs.LabSyncTestResultsFunctions.GetLabSyncTestResultsListFilters,
        activityLogs.LabSyncTestResultsActions.GetLabSyncTestResultsListFilters,
        {},
      )

      return {filters: [statusFilters]}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabSyncTestResultsFunctions.GetLabSyncTestResultsListFilters,
        eventName: activityLogs.LabSyncTestResultsActions.GetLabSyncTestResultsListFiltersFailed,
      })
    }
  }

  getStatuses(): LabSyncStatusesResponseDTO {
    return {
      variations: [
        {
          status: LabSyncTestResultStatus.Unlinked,
          title: LabSyncTestResultStatusLabel.Unlinked,
          actions: [
            {
              id: LabSyncStatusAction.LinkPatient,
              title: LabSyncStatusActionLabel.LinkPatient,
            },
            {
              id: LabSyncStatusAction.VoidResult,
              title: LabSyncStatusActionLabel.VoidResult,
            },
            {
              id: LabSyncStatusAction.DownloadHL7File,
              title: LabSyncStatusActionLabel.DownloadHL7File,
            },
          ],
        },
        {
          status: LabSyncTestResultStatus.Void,
          title: LabSyncTestResultStatusLabel.Void,
          actions: [],
        },
      ],
    }
  }

  private async getLabLastSyncAlert(latestLabSync: LabSyncRawData): Promise<LabSyncDetailsDTO> {
    try {
      const isLastFailed = latestLabSync.status === LabSyncStatus.Failed

      let lastSuccess: LabSyncRawData

      if (isLastFailed) {
        lastSuccess = await this.labSyncRawDataRepository.findOneLatestSuccessByCode(
          latestLabSync.labInfo.integrationCode,
        )
      }

      const labName =
        latestLabSync.labInfo.integrationCode === LabIntegrationCode.Dynacare
          ? 'Dynacare'
          : 'LifeLabs'

      const failedWithLastSuccessMessage =
        `Failed to sync with ${labName} on ${this.dateTimeUtil.formatToZonedDateTimeWithAbbreviation(
          {
            date: latestLabSync.createdAt,
          },
        )}. `.concat(
          lastSuccess
            ? `Last successful sync on ${this.dateTimeUtil.formatToZonedDateTimeWithAbbreviation({
                date: lastSuccess.createdAt,
              })}`
            : DefaultValue.Empty,
        )

      const message = !isLastFailed
        ? `Last synced with ${labName} on ${this.dateTimeUtil.formatToZonedDateTimeWithAbbreviation(
            {
              date: latestLabSync.createdAt,
            },
          )}`
        : failedWithLastSuccessMessage

      return {
        id: latestLabSync.labInfo.uuid,
        message,
        status: labSyncStatusEnumMap.get(latestLabSync.status),
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabSyncTestResultsFunctions.GetLabLastSyncAlert,
        eventName: activityLogs.LabSyncTestResultsActions.GetLabLastSyncAlertFailed,
      })
    }
  }
}
