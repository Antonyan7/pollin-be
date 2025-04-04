import * as activityLogs from '@libs/common/enums/activity-logs'

import {Injectable} from '@nestjs/common'
import {DateTimeUtil, StructuredLogger} from '@libs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {ProfileAlertType} from '@libs/data-layer/apps/users/enum'
import {PatientProfileAlert, ProfileAlert} from '@libs/data-layer/apps/users/entities/typeorm'
import {FinalResultType, TestResultMeasurementType} from '@libs/data-layer/apps/clinic-test/enums'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {ProfileAlertRepository} from '@libs/data-layer/apps/users/repositories/typeorm/profile-alert.repository'
import {PatientCommonRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-common.repository'
import {PatientProfileAlertRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-profile-alert.repository'
import {defineRegularAndProcessTestTypeIds} from '../helpers/profile-alert.helper'
import {TestResultRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-result.repository'
import {TestResultMeasurementRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-result-measurement.repository'

@Injectable()
export class ProfileAlertService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly profileAlertRepository: ProfileAlertRepository,
    private readonly testResultMeasurementRepository: TestResultMeasurementRepository,
    private readonly testResultRepository: TestResultRepository,
    private readonly patientRepository: PatientCommonRepository,
    private readonly patientProfileAlertRepository: PatientProfileAlertRepository,
  ) {}

  private readonly dateTimeUtil = new DateTimeUtil()

  async updatePatientsAlerts(patientId: number): Promise<PatientProfileAlert[]> {
    try {
      const profileAlerts = await this.profileAlertRepository.findWithTestTypes()
      if (!profileAlerts.length) {
        StructuredLogger.warn(
          activityLogs.ProfileAlertFunctions.GetPatientsAlerts,
          activityLogs.ProfileAlertActions.NoAlertsMetadataWasFound,
          {patientId},
        )
        return
      }

      const patientProfileAlerts = await Promise.all(
        profileAlerts.map((profileAlert) => {
          switch (profileAlert.type) {
            case ProfileAlertType.AbnormalPartnerResult:
              return this.getAbnormalPartnerResultAlerts(patientId, profileAlert)
          }
        }),
      )

      await this.patientProfileAlertRepository.softDelete({
        patientId,
      })

      const savedPatientProfileAlerts = await this.patientProfileAlertRepository.save(
        patientProfileAlerts.flat().filter((item) => item),
      )

      StructuredLogger.info(
        activityLogs.ProfileAlertFunctions.GetPatientsAlerts,
        activityLogs.ProfileAlertActions.Success,
        {patientId, patientProfileAlertsIds: savedPatientProfileAlerts.map(({id}) => id)},
      )

      return savedPatientProfileAlerts
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ProfileAlertFunctions.GetPatientsAlerts,
        eventName: activityLogs.ProfileAlertActions.GetPatientsAlertsFailed,
      })
    }
  }

  private async getAbnormalPartnerResultAlerts(
    patientId: number,
    {id, testType, testTypeGroupForAnyResult, type}: ProfileAlert,
  ): Promise<Partial<PatientProfileAlert>[]> {
    const testTypes = testTypeGroupForAnyResult
      ? testTypeGroupForAnyResult.testTypesRelations.map(({testType}) => testType)
      : [testType]

    const {regularTestTypesIds, processTestTypesIds} = defineRegularAndProcessTestTypeIds(testTypes)

    const partners = await this.patientRepository.findPartners(patientId)

    return Promise.all(
      partners.map(async (partner) => {
        const [testResultMeasurements, processTestResults] = await Promise.all([
          this.testResultMeasurementRepository.findForProfileResults(
            partner.id,
            regularTestTypesIds,
          ),
          this.testResultRepository.findForPriming(partner.id, processTestTypesIds),
        ])

        StructuredLogger.info(
          activityLogs.ProfileAlertFunctions.GetAbnormalPartnerResultAlerts,
          activityLogs.ProfileAlertActions.GetPartnerAbnormalResults,
          {
            patientId: partner.id,
            testTypesIds: testTypes.map(({id}) => id),
            testResultIds: processTestResults.map(({id}) => id),
            measurementIds: testResultMeasurements.map(({id}) => id),
            type,
          },
        )

        let latestResultDate: Date = null
        let latestResultStatus: FinalResultType | TestResultMeasurementType

        testResultMeasurements.forEach((measurement) => {
          const testResult = measurement.testResult
          const collectionDate = testResult?.specimen?.collectedOn
          if (collectionDate && collectionDate > latestResultDate) {
            latestResultDate = collectionDate
            latestResultStatus = measurement.resultType
          }
        })

        processTestResults.forEach((testResult) => {
          const appointmentStart = testResult?.appointment?.start
          if (appointmentStart && appointmentStart > latestResultDate) {
            latestResultDate = appointmentStart
            latestResultStatus = testResult.finalResult
          }
        })

        if (latestResultStatus === FinalResultType.Abnormal) {
          return {
            profileAlertId: id,
            patientId,
            partnerId: partner.id,

            revisionId: generateRevisionId(this.dateTimeUtil.now()),
          }
        }
      }),
    )
  }
}
