import {Body, Controller, HttpCode, Post} from '@nestjs/common'
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {ApiAuthType} from '@libs/common/decorators'
import {AuthTypes} from '@libs/common/enums'
import {PermissionRoles} from '@libs/common/decorators/roles.decorator'
import {ivfLabPermissions} from '@libs/services-common/permissions/clinic-ivf-lab.permission'
import {
  GetIvfCohortsResponseV3DTO,
  GetIvfCohortsRequestV3DTO,
} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import {IvfPatientsV3Service} from '@apps/lis/ivf-patients/services/ivf-patients-v3.service'

@ApiTags('IVF Patients')
@Controller('/v3/patients')
export class IvfPatientsV3Controller {
  constructor(private readonly ivfPatientsService: IvfPatientsV3Service) {}

  @Post('list')
  @HttpCode(200)
  @ApiAuthType(AuthTypes.SAMLAuthProviderGoogle)
  @ApiResponse({type: GetIvfCohortsResponseV3DTO})
  @PermissionRoles(...ivfLabPermissions)
  async getIVFPatients(
    @Body()
    {
      page,
      pageSize,
      sortByField,
      sortOrder,
      searchString,
      filters,
      dateFilter,
    }: GetIvfCohortsRequestV3DTO,
  ): Promise<ResponseWrapper<GetIvfCohortsResponseV3DTO>> {
    const ivfPatients = await this.ivfPatientsService.getPatientsWithIVFPlan({
      page: Number(page) || 1,
      pageSize,
      sortByField,
      sortOrder,
      searchString,
      filters,
      dateFilter,
    })

    return ResponseWrapper.actionSucceedPaginated(
      ivfPatients.items,
      ivfPatients.totalItems,
      ivfPatients.pageSize,
      ivfPatients.currentPage,
    )
  }
}
