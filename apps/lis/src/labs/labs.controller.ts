import {ApiAuthType} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common'
import {LabsService} from '@apps/lis/labs/services/labs.service'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {LabsListDTO} from '@apps/lis/labs/dto/labs.dto'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {getListOfLabsPermissions} from '@libs/services-common/permissions/clinic-test-results.permission'

@ApiTags('Labs')
@Controller('/v1/labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: LabsListDTO})
  @PermissionRoles(...getListOfLabsPermissions)
  async getListOfLabs(): Promise<ResponseWrapper<LabsListDTO>> {
    const labs = await this.labsService.getListOfLabs()
    return ResponseWrapper.actionSucceed(labs)
  }
}
