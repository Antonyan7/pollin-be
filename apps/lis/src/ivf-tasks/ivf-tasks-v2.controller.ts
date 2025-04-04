import {ApiAuthType, SessionContext, SessionContextDecorator} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {Body, Controller, HttpCode, Patch} from '@nestjs/common'
import {HttpStatus} from '@nestjs/common'
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {ivfLabPermissions} from '@libs/services-common/permissions/clinic-ivf-lab.permission'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {SignOffIVFLabTaskRequestV2DTO} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request-v2.dto'
import {SignOffIVFLabTaskResponseV2DTO} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {IvfTasksV2Service} from '@apps/lis/ivf-tasks/services/ivf-tasks-v2.service'

@ApiTags('IVF Tasks')
@Controller('/v2/ivf-tasks')
export class IvfTasksV2Controller {
  constructor(private ivfTasksV2Service: IvfTasksV2Service) {}

  @Patch('/sign-off')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: SignOffIVFLabTaskResponseV2DTO})
  @PermissionRoles(...ivfLabPermissions)
  async signOffIVFDay(
    @Body() payload: SignOffIVFLabTaskRequestV2DTO,
    @SessionContextDecorator() {authUserId}: SessionContext,
  ): Promise<ResponseWrapper<SignOffIVFLabTaskResponseV2DTO>> {
    await this.ivfTasksV2Service.validateSignOffEligibilityV2(payload.taskGroupId)
    const signOffDetails = await this.ivfTasksV2Service.signOffDay(payload, authUserId)

    return ResponseWrapper.actionSucceed(signOffDetails)
  }
}
