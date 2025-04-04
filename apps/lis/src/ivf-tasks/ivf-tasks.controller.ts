import {ApiAuthType, SessionContext, SessionContextDecorator} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {Body, Controller, HttpCode, Patch, Put, Query, Get, Post} from '@nestjs/common'
import {HttpStatus} from '@nestjs/common'
import {ApiOkResponse, ApiResponse, ApiTags} from '@nestjs/swagger'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {
  ivfLabAndPlanPermissions,
  ivfLabPermissions,
} from '@libs/services-common/permissions/clinic-ivf-lab.permission'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {IvfTasksService} from '@apps/lis/ivf-tasks/services/ivf-tasks.service'
import {
  GetIVFLabTaskGroupRequestDTO,
  SignOffIVFLabTaskRequestDTO,
  SubmitTaskDetailsRequestDTO,
  TaskIVF,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {IvfSubmitResultService} from '@apps/lis/ivf-tasks/services/ivf-submit-result.service'
import {
  GetIVFLabTaskGroupResponseDTO,
  SignOffIVFLabTaskResponseDTO,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {GetIVFTaskHistoryRequestDTO} from './dto/ivf-tasks-history.dto'
import {IvfTasksHistoryService} from './services/ivf-tasks-history.service'
import {GetHistoryResponseDTO} from '@libs/services-common/dto/history.dto'
import {DiscardDishRequestDto} from '@apps/lis/ivf-tasks/dto/double-witness-history.dto'
import {IvfDishService} from '@apps/lis/ivf-tasks/services/ivf-dish.service'

@ApiTags('IVF Tasks')
@Controller('/v1/ivf-tasks')
export class IvfTasksController {
  // eslint-disable-next-line max-params
  constructor(
    private ivfTasksService: IvfTasksService,
    private ivfDishService: IvfDishService,
    private ivfSubmitResultService: IvfSubmitResultService,
    private ivfTasksHistoryService: IvfTasksHistoryService,
  ) {}

  /** @deprecated */
  @Patch('/sign-off')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: SignOffIVFLabTaskResponseDTO})
  @PermissionRoles(...ivfLabPermissions)
  async signOffIVFLabTask(
    @Body() payload: SignOffIVFLabTaskRequestDTO,
    @SessionContextDecorator() {authUserId}: SessionContext,
  ): Promise<ResponseWrapper<SignOffIVFLabTaskResponseDTO>> {
    await this.ivfTasksService.checkEligibilityToEdit(payload.id)

    const result = await this.ivfTasksService.signOffIVFLabTask(payload, authUserId)
    return ResponseWrapper.actionSucceed(result)
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: GetIVFLabTaskGroupResponseDTO})
  @PermissionRoles(...ivfLabAndPlanPermissions)
  async getIVFLabTaskGroup(
    @Query() payload: GetIVFLabTaskGroupRequestDTO,
  ): Promise<ResponseWrapper<GetIVFLabTaskGroupResponseDTO>> {
    const result = await this.ivfTasksService.getIVFLabTaskGroup(payload.ivfTaskGroupId)
    return ResponseWrapper.actionSucceed(result)
  }

  @Put('')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: TaskIVF})
  @PermissionRoles(...ivfLabPermissions)
  async submitTaskDetails(
    @Body() body: SubmitTaskDetailsRequestDTO,
    @SessionContextDecorator() {authUserId}: SessionContext,
  ): Promise<ResponseWrapper<TaskIVF>> {
    const result = await this.ivfSubmitResultService.submitTaskDetails(body, authUserId)
    return ResponseWrapper.actionSucceed(result)
  }

  @Post('history')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: GetHistoryResponseDTO})
  @PermissionRoles(...ivfLabPermissions)
  async getTaskHistory(
    @Body() body: GetIVFTaskHistoryRequestDTO,
  ): Promise<ResponseWrapper<GetHistoryResponseDTO>> {
    const {data, cursor} = await this.ivfTasksHistoryService.getHistory(body)
    return ResponseWrapper.actionSucceedCursorPaginated(data, cursor)
  }

  @Patch('/discard')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiOkResponse()
  @ApiResponse({type: null})
  @PermissionRoles(...ivfLabAndPlanPermissions)
  async discardDish(
    @Body() payload: DiscardDishRequestDto,
    @SessionContextDecorator() {name, authUserId}: SessionContext,
  ): Promise<ResponseWrapper<null>> {
    await this.ivfDishService.discardDish(payload, {name, authUserId})
    return ResponseWrapper.actionSucceed()
  }
}
