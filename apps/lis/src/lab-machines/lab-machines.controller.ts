import {ApiAuthType} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common'
import {LabMachineService} from '@apps/lis/lab-machines/services/lab-machines.service'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {LabMachinesListDTO} from '@apps/lis/lab-machines/dto/lab-machines.dto'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {getListOfLabMachinesPermissions} from '@libs/services-common/permissions/clinic-test-results.permission'

@ApiTags('Lab Machines')
@Controller('/v1/lab-machines')
export class LabMachineController {
  constructor(private readonly labMachineService: LabMachineService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: LabMachinesListDTO})
  @PermissionRoles(...getListOfLabMachinesPermissions)
  async getListOfLabMachines(): Promise<ResponseWrapper<LabMachinesListDTO>> {
    const machines = await this.labMachineService.getListOfLabMachines()
    return ResponseWrapper.actionSucceed(machines)
  }
}
