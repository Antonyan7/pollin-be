import {Body, Controller, Get, HttpCode, Patch, Post, Query} from '@nestjs/common'
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {ApiAuthType, SessionContext, SessionContextDecorator} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {
  ivfLabAndPlanPermissions,
  ivfLabPermissions,
} from '@libs/services-common/permissions/clinic-ivf-lab.permission'
import {IvfPatientsService} from './services/ivf-patients.service'
import {
  CancelPlanRequestDTO,
  CompletePlanRequestDTO,
  EmbryoFreezingMetaDataResponseDto,
  EggFreezeMetaDataResponseDto,
  GetCompletionMetadata,
  GetIvfPatientsResponseDTO,
  GetPlanCancellationReasonsResponseDTO,
  IVFPlanVariationResponse,
  PlanCancellationReasonDto,
  PlanFiltersResponseDto,
  SetCohortDateRequestDTO,
  GetPlanDispositionReasonsResponseDTO,
  PlanDispositionReasonDto,
} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import {IvfDaysDTO} from '@apps/lis/daily-view/dto/daily-view.dto'
import {IvfIVFLabStatusService} from '@apps/lis/ivf-patients/services/ivf-cohort-status.service'

@ApiTags('IVF Patients')
@Controller('/v1/patients')
export class IvfPatientsController {
  constructor(
    private readonly ivfPatientsService: IvfPatientsService,
    private readonly ivfIVFLabStatusService: IvfIVFLabStatusService,
  ) {}

  @Get('/statuses')
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: IVFPlanVariationResponse})
  @PermissionRoles(...ivfLabAndPlanPermissions)
  async getIVFPlanStatuses(): Promise<ResponseWrapper<IVFPlanVariationResponse>> {
    const variations = this.ivfPatientsService.getStatuses()
    return ResponseWrapper.actionSucceed({variations})
  }

  @Post('cohort-date')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: null})
  @PermissionRoles(...ivfLabPermissions)
  async setCohortDate(
    @Body() {date, patientPlanId}: SetCohortDateRequestDTO,
    @SessionContextDecorator() {staffUUID}: SessionContext,
  ): Promise<ResponseWrapper<GetIvfPatientsResponseDTO>> {
    await this.ivfPatientsService.setCohortDate(patientPlanId, date, staffUUID)

    return ResponseWrapper.actionSucceed()
  }

  @Get('plan-cancellation-reasons')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: [GetPlanCancellationReasonsResponseDTO]})
  @PermissionRoles(...ivfLabPermissions)
  async getPlanCancellationReasons(): Promise<
    ResponseWrapper<{reasons: PlanCancellationReasonDto[]}>
  > {
    const reasons = await this.ivfPatientsService.getPlanCancellationReasons()
    return ResponseWrapper.actionSucceed({reasons})
  }

  @Get('filters')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: [GetPlanCancellationReasonsResponseDTO]})
  @PermissionRoles(...ivfLabPermissions)
  async getFilters(): Promise<ResponseWrapper<PlanFiltersResponseDto>> {
    const filters = await this.ivfPatientsService.getPlanFilters()
    return ResponseWrapper.actionSucceed({filters})
  }

  @Patch('cancel-plan')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: [GetPlanCancellationReasonsResponseDTO]})
  @PermissionRoles(...ivfLabPermissions)
  async cancelIVFPlan(
    @Body() payload: CancelPlanRequestDTO,
    @SessionContextDecorator() {staffUUID}: SessionContext,
  ): Promise<ResponseWrapper<{dashboardDayUpdates: IvfDaysDTO[]}>> {
    const dashboardDayUpdates = await this.ivfIVFLabStatusService.cancelIvfCohort(
      payload,
      staffUUID,
    )
    return ResponseWrapper.actionSucceed({dashboardDayUpdates})
  }

  @Patch('complete-plan')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: [GetPlanCancellationReasonsResponseDTO]})
  @PermissionRoles(...ivfLabPermissions)
  async completeIVFPlan(
    @Body() payload: CompletePlanRequestDTO,
    @SessionContextDecorator() {staffUUID}: SessionContext,
  ): Promise<ResponseWrapper<{dashboardDayUpdates: IvfDaysDTO[]}>> {
    const dashboardDayUpdates = await this.ivfIVFLabStatusService.completeIvfCohort(
      payload,
      staffUUID,
    )
    return ResponseWrapper.actionSucceed({dashboardDayUpdates})
  }

  @Get('plan-completion-metadata')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: [GetPlanCancellationReasonsResponseDTO]})
  @PermissionRoles(...ivfLabPermissions)
  async getPlanCompletionMetadata(
    @Query() {patientPlanId}: GetCompletionMetadata,
  ): Promise<ResponseWrapper<EmbryoFreezingMetaDataResponseDto | EggFreezeMetaDataResponseDto>> {
    const completionMetadata =
      await this.ivfIVFLabStatusService.getCompletionMetadata(patientPlanId)
    return ResponseWrapper.actionSucceed(completionMetadata)
  }
  @Get('plan-disposition-reasons')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: GetPlanDispositionReasonsResponseDTO})
  @PermissionRoles(...ivfLabPermissions)
  async getPlanDispositionReasons(): Promise<
    ResponseWrapper<{reasons: PlanDispositionReasonDto[]}>
  > {
    const reasons = await this.ivfPatientsService.getPlanDispositionReasons()
    return ResponseWrapper.actionSucceed({reasons})
  }
}
