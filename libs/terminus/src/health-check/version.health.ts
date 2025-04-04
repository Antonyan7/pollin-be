import {Injectable} from '@nestjs/common'
import {HealthIndicatorResult, HealthIndicator, HealthCheckError} from '@nestjs/terminus'

export interface VersionHealth {
  version: string
  name: string
  dependencies: Dependencies
}

interface Dependencies {
  [key: string]: string
}

@Injectable()
export class VersionHealthIndicator extends HealthIndicator {
  async getVersion(options: VersionHealth): Promise<HealthIndicatorResult> {
    const {name, version, dependencies} = options
    const isHealthy = !!(name && version && dependencies)
    const result = this.getStatus('version', isHealthy, {
      name,
      version,
    })
    if (isHealthy) {
      return result
    }
    throw new HealthCheckError('Version health check failed', result)
  }
}
