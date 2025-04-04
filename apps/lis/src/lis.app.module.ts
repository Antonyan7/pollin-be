import {Module} from '@nestjs/common'
import {ScheduleModule} from '@nestjs/schedule'
import {CommonModule} from '@libs/common'
import {DefaultDatabaseConfiguration} from '@libs/services-common/configuration/database.configuration'
import {RedisCacheModule} from '@libs/services-common/configuration/redis.configuration'
import {TerminusHealthCheckModule} from '@libs/services-common/configuration/terminus.configuration'
import {LocalizationModule} from '@libs/common/modules/localization.module'
import {MySQLPingService} from '@libs/services-common/services/mysql-ping.service'
import {IvfPatientsModule} from '@apps/lis/ivf-patients/ivf-patients.module'
import {IvfTasksModule} from '@apps/lis/ivf-tasks/ivf-tasks.module'
import {DailyViewModule} from '@apps/lis/daily-view/daily-view.module'
import {DoubleWitnessModule} from '@apps/lis/double-witness/double-witness.module'
import {SpawnCohortModule} from '@apps/lis/spawn-cohort/spawn-cohort.module'
import {PlanUpdatesModule} from '@apps/lis/plan-updates/plan-updates.module'
import {StrawFilterModule} from '@apps/lis/straw-filter/straw-filter.module'
import {AuditTrailModule} from '@libs/audit-trail'

@Module({
  imports: [
    CommonModule,

    IvfPatientsModule,
    IvfTasksModule,
    DailyViewModule,
    DoubleWitnessModule,
    SpawnCohortModule,
    PlanUpdatesModule,
    StrawFilterModule,
    AuditTrailModule,
    DefaultDatabaseConfiguration(),
    RedisCacheModule,
    LocalizationModule,
    TerminusHealthCheckModule({
      databaseHealth: true,
      redisHealth: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [MySQLPingService],
})
export class LisAppModule {}
