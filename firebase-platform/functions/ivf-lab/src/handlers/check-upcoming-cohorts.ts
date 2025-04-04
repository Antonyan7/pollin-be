import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {In, LessThan} from 'typeorm'
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common/utils'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export async function checkUpcomingCohortsHandler(): Promise<void> {
  try {
    StructuredLogger.info(
      activityLogs.IvfCohortFunctions.CheckUpcomingCohorts,
      activityLogs.IvfCohortActions.StartingToCheckUpcomingCohorts,
      {message: `Checking upcoming cohorts`},
    )

    const dataSource = await getCreateDatabaseConnection()
    const patientPlanRepository = dataSource.getRepository(PatientPlan)

    const upcomingIVFplans = await patientPlanRepository.find({
      select: ['id'],
      where: {
        ivfLabStatus: IVFLabStatus.Upcoming,
        cohorts: {cohortDate: LessThan(dateTimeUtil.formatDateYMD(dateTimeUtil.now()))},
      },
    })

    const upcomingIVFplanIds = upcomingIVFplans.map(({id}) => id)

    StructuredLogger.info(
      activityLogs.IvfCohortFunctions.CheckUpcomingCohorts,
      activityLogs.IvfCohortActions.UpdateUpcomingPlans,
      {
        message: `Updating plans with ids: ${upcomingIVFplanIds.join()}`,
      },
    )

    const chunkSize = 15
    for (let chunkStart = 0; chunkStart < upcomingIVFplanIds.length; chunkStart += chunkSize) {
      const paginatedPlanIds = upcomingIVFplanIds.slice(chunkStart, chunkStart + chunkSize)

      await patientPlanRepository.update(
        {id: In(paginatedPlanIds)},
        {
          ivfLabStatus: IVFLabStatus.Active,
        },
      )
    }
  } catch (error) {
    StructuredLogger.error(
      activityLogs.IvfCohortFunctions.CheckUpcomingCohorts,
      activityLogs.IvfCohortActions.UpdateUpcomingCohortsFailed,
      parseError(error),
    )
  }
}
