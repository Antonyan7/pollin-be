import {HealthConfigForModules, TerminusAppModule} from '@libs/terminus'
import {DynamicModule} from '@nestjs/common'

export const TerminusHealthCheckModule = (
  healthConfigForModules: HealthConfigForModules,
): DynamicModule => {
  return TerminusAppModule.forRoot({
    databaseHealth: healthConfigForModules.databaseHealth,
    redisHealth: healthConfigForModules.redisHealth,
  })
}
