import {Controller, Get} from '@nestjs/common'
import {HealthCheckService, HealthCheck, HealthCheckResult} from '@nestjs/terminus'
import {ApiTags} from '@nestjs/swagger'
import {TerminusService} from './terminus.service'
import {ApiAuthType} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

@ApiTags('Health')
@Controller('v1/health')
export class TerminusController {
  constructor(
    private health: HealthCheckService,
    private terminusService: TerminusService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiAuthType(AuthTypes.AppCheck)
  @PermissionRoles(PermissionEnum.ClinicPortalNoPermissions)
  async check(): Promise<ResponseWrapper<HealthCheckResult>> {
    const result = await this.health.check(await this.terminusService.getHealthIndicators())
    return ResponseWrapper.actionSucceed(result)
  }
}
