import {Injectable} from '@nestjs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {NestprojectConfigService} from '@libs/common'
import {GetIvfCohortsResponseV3DTO} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {PaginationData} from '@libs/services-common/dto/pagination.dto'
import {getIvfCohortsV3DTO} from '../helper/ivf-patients.helper'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {IvfCohortFilters, IVFLabPatientsSortFieldV2} from '@libs/services-common/enums'
import {PatientPlanCohortRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {DateFilter} from '@libs/services-common/dto/ivf-lab.dto'

@Injectable()
export class IvfPatientsV3Service {
  constructor(
    private readonly configService: NestprojectConfigService,
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
    private readonly i18nService: I18nLocalizationService,
  ) {}

  async getPatientsWithIVFPlan(data: {
    page: number
    pageSize: number
    sortByField: IVFLabPatientsSortFieldV2
    sortOrder: SortOrder
    searchString: string
    filters: IvfCohortFilters[]
    dateFilter: DateFilter
  }): Promise<PaginationData<GetIvfCohortsResponseV3DTO>> {
    try {
      const {page, sortOrder, sortByField, searchString, filters, dateFilter} = data
      const pageSize = data?.pageSize ?? this.configService.get<number>('IVF_COHORTS_PAGE_SIZE')

      const errorMessage = this.i18nService.translate(i18Messages.GET_PATIENT_IMAGE_URL_ERROR)

      const {cohorts, totalItems} =
        await this.patientPlanCohortRepository.getIVFCohortsWithStatuses({
          page,
          pageSize,
          sortByField,
          sortOrder,
          searchString,
          filters,
          dateFilter,
        })

      return {
        items: await getIvfCohortsV3DTO(cohorts, errorMessage),
        currentPage: page,
        pageSize,
        totalItems,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfPatientsFunctions.GetPatientsWithIVFPlan,
        eventName: activityLogs.IvfPatientsActions.GetPatientsWithIVFPlanFailed,
      })
    }
  }
}
