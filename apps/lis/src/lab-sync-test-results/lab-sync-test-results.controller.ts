import {Body, Controller, Get, HttpCode, HttpStatus, Patch, Post} from '@nestjs/common'
import {ApiTags, ApiResponse} from '@nestjs/swagger'
import {ApiAuthType, SessionContext, SessionContextDecorator} from '@libs/common/decorators'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {AuthTypes} from '@libs/common/enums'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {
  getTestResultFiltersPermissions,
  getTestResultsListPermissions,
} from '@libs/services-common/permissions/clinic-test-results.permission'
import {LabSyncTestResultListService} from './services/lab-sync-test-result-list.service'
import {LabSyncTestResultLinkService} from './services/lab-sync-test-result-link.service'
import {
  LabSyncTestResultsListResponseDTO,
  LabSyncTestResultsListRequestDTO,
  VoidResultRequestDTO,
  UnlinkedTestResultFiltersResponseDTO,
} from './dto/get-lab-sync-test-results.dto'
import {LabSyncStatusesResponseDTO} from './dto/lab-sync-test-result-status.dto'
import {LabSyncLinkRequestDTO} from './dto/lab-sync-test-result-link.dto'
import {LabSyncTestResultActionService} from './services/lab-sync-test-result-action.service'
import {GetLabSyncTestResultAlertsResponseDTO} from './dto/lab-sync-test-result-status.dto'
import {LabSyncStatusService} from './services/lab-sync-status.service'

@ApiTags('Lab Sync Test Results')
@Controller('/v1/lab-sync-test-results')
export class LabSyncTestResultController {
  // eslint-disable-next-line max-params
  constructor(
    private labSyncTestResultListService: LabSyncTestResultListService,
    private labSyncTestResultLinkService: LabSyncTestResultLinkService,
    private labSyncTestResultActionService: LabSyncTestResultActionService,
    private labSyncStatusService: LabSyncStatusService,
  ) {}

  @Post('/list')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: LabSyncTestResultsListResponseDTO})
  @PermissionRoles(...getTestResultsListPermissions)
  async getList(
    @Body() labSyncTestResultListReqBody: LabSyncTestResultsListRequestDTO,
  ): Promise<ResponseWrapper<LabSyncTestResultsListResponseDTO>> {
    const {testResults, totalItems, pageSize} = await this.labSyncTestResultListService.getList(
      labSyncTestResultListReqBody,
    )

    return ResponseWrapper.actionSucceedPaginated(
      {testResults},
      totalItems,
      pageSize,
      labSyncTestResultListReqBody.page,
    )
  }

  @Get('/statuses')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: LabSyncStatusesResponseDTO})
  @PermissionRoles(...getTestResultsListPermissions)
  async getListStatuses(): Promise<ResponseWrapper<LabSyncStatusesResponseDTO>> {
    const statuses = this.labSyncStatusService.getStatuses()
    return ResponseWrapper.actionSucceed(statuses)
  }

  @Patch('/link-result')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @PermissionRoles(...getTestResultsListPermissions)
  async linkSyncTestResult(
    @Body() labSyncLinkRequestDTO: LabSyncLinkRequestDTO,
    @SessionContextDecorator() {authUserId}: SessionContext,
  ): Promise<ResponseWrapper> {
    await this.labSyncTestResultLinkService.linkToTestResult(labSyncLinkRequestDTO, authUserId)
    return ResponseWrapper.actionSucceed()
  }

  @Patch('/void-result')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @PermissionRoles(...getTestResultsListPermissions)
  async voidResult(
    @Body() voidResultReqBody: VoidResultRequestDTO,
    @SessionContextDecorator() {authUserId}: SessionContext,
  ): Promise<ResponseWrapper<null>> {
    await this.labSyncTestResultActionService.voidTestResult(voidResultReqBody, authUserId)
    return ResponseWrapper.actionSucceed(null)
  }

  @Get('/sync-status')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: GetLabSyncTestResultAlertsResponseDTO})
  @PermissionRoles(...getTestResultsListPermissions)
  async getLabSyncTestResultAlerts(): Promise<
    ResponseWrapper<GetLabSyncTestResultAlertsResponseDTO>
  > {
    const labSyncResultAlerts = await this.labSyncStatusService.getLabSyncResultAlerts()
    return ResponseWrapper.actionSucceed(labSyncResultAlerts)
  }

  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: UnlinkedTestResultFiltersResponseDTO})
  @PermissionRoles(...getTestResultFiltersPermissions)
  async getLabSyncTestResultsListFilters(): Promise<
    ResponseWrapper<UnlinkedTestResultFiltersResponseDTO>
  > {
    const filters = await this.labSyncStatusService.getLabSyncTestResultsListFilters()
    return ResponseWrapper.actionSucceed(filters)
  }
}
