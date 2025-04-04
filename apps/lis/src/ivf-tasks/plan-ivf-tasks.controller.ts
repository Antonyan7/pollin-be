import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {Controller, Get, HttpCode, HttpStatus, Query} from '@nestjs/common'
import {ApiAuthType} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {ivfLabPlanUpdatesPermissions} from '@libs/services-common/permissions/clinic-ivf-lab.permission'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {
  GetPlanIVFLabTaskGroupsRequestDTO,
  GetPlanIVFLabTaskGroupsResponseDTO,
} from '@apps/lis/ivf-tasks/dto/plan-ivf-tasks.dto'
import {PlanIvfTasksService} from '@apps/lis/ivf-tasks/services/plan-ivf-task-group.service'

@ApiTags('IVF Tasks')
@Controller('/v1/plan-ivf-tasks')
export class PlanIvfTasksController {
  constructor(private planIvfTasksService: PlanIvfTasksService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: GetPlanIVFLabTaskGroupsResponseDTO})
  @PermissionRoles(...ivfLabPlanUpdatesPermissions)
  async getIVFLabTaskGroup(
    @Query() payload: GetPlanIVFLabTaskGroupsRequestDTO,
  ): Promise<ResponseWrapper<GetPlanIVFLabTaskGroupsResponseDTO>> {
    const response = await this.planIvfTasksService.getIVFLabTaskGroups(payload.patientPlanId)
    return ResponseWrapper.actionSucceed(response)
  }
}
