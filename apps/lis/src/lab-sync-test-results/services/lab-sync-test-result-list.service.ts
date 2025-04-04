import {Injectable} from '@nestjs/common'
import {FindManyOptions, ILike, In} from 'typeorm'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'
import {
  LabSyncObservationRequestRepository,
  TestPanelRepository,
  TestTypeRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {
  LabSyncTestResultsListPaginatedDTO,
  LabSyncTestResultsListRequestDTO,
  LabSyncTestResultListFilters,
  UnlinkedTestResultFilterEnum,
} from '../dto/get-lab-sync-test-results.dto'
import {LabSyncObservationRequest} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  getLabSyncResultListOrder,
  labSyncResultsListDTO,
} from '../helper/lab-sync-test-result-list.helper'

@Injectable()
export class LabSyncTestResultListService {
  // eslint-disable-next-line max-params
  constructor(
    private configService: NestprojectConfigService,
    private testTypeRepository: TestTypeRepository,
    private testPanelRespoitory: TestPanelRepository,
    private labSyncObservationRequestRepository: LabSyncObservationRequestRepository,
  ) {}

  async getList(
    requestBody: LabSyncTestResultsListRequestDTO,
  ): Promise<LabSyncTestResultsListPaginatedDTO> {
    try {
      const {page, filters} = requestBody
      const searchString = requestBody?.searchString
      const order = getLabSyncResultListOrder(requestBody.sortByField, requestBody.sortOrder)
      const pageSize =
        requestBody?.pageSize ??
        Number(this.configService.get<string>('LAB_SYNC_RESULTS_LIST_PAGE_SIZE'))
      const {data, totalItems} = await this.labSyncObservationRequestRepository.findAll(
        page,
        pageSize,
        {
          where: this.getListCondition(searchString, filters).where,
          order,
          relations: {
            labSyncRawData: {
              labInfo: true,
            },
            labSyncTestResultFieldMatch: true,
          },
        },
      )

      if (!data) {
        return {testResults: [], pageSize, totalItems}
      }

      const ohipCoveredCodes = await this.ohipCoveredCodes(data)
      const testResults = data.map((result) => labSyncResultsListDTO(result, ohipCoveredCodes))

      return {testResults, pageSize, totalItems}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabSyncTestResultsFunctions.GetLabSyncResultsList,
        eventName: activityLogs.LabSyncTestResultsActions.GetLabSyncResultsListFailed,
      })
    }
  }

  private getListCondition(
    searchString: string,
    filters?: LabSyncTestResultListFilters[],
  ): FindManyOptions<LabSyncObservationRequest> {
    const defaultCondition = {
      status: In([LabSyncTestResultStatus.Unlinked, LabSyncTestResultStatus.Void]),
    }

    if (filters?.length) {
      const statusFilters = filters
        .filter((filter) => filter.type === UnlinkedTestResultFilterEnum.Status)
        .map((filter) => filter.id)

      if (statusFilters.length) {
        defaultCondition.status = In(statusFilters)
      }
    }

    if (searchString) {
      return {
        where: [
          {...defaultCondition, patientFirstName: ILike(`%${searchString}%`)},
          {...defaultCondition, patientLastName: ILike(`%${searchString}%`)},
        ],
      }
    }

    return {
      where: defaultCondition,
    }
  }

  private async ohipCoveredCodes(results: LabSyncObservationRequest[]): Promise<string[]> {
    const universalCodes = results.map((result) => result.universalCode)

    if (!universalCodes.length) {
      return []
    }

    const [testTypes, testPanels] = await Promise.all([
      this.testTypeRepository.findOhipCoveredByUniversalCodes(universalCodes),
      this.testPanelRespoitory.findOhipCoveredByUniversalCodes(universalCodes),
    ])

    const tests = [...testTypes, ...testPanels]
    const ohipCoveredUniversalCodes = universalCodes.filter((code) =>
      tests.some((test) => test.dynacareCode === code || test.lifeLabsCode === code),
    )

    return ohipCoveredUniversalCodes
  }
}
