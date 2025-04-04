import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {getRepositories} from '@libs/common/helpers/test-result-document/repository-provider.helper'
import {Equal} from 'typeorm/find-options/operator/Equal'
import {selectTestResultDetails} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/util/test-result.select'

export async function findOneWithDetails(uuid: string): Promise<TestResult> {
  const {testResultRepository} = await getRepositories()

  return testResultRepository.findOne({
    select: selectTestResultDetails,
    where: {uuid: Equal(uuid)},
    relations: {
      testPanel: {superType: true, testPanelToTestTypes: true},
      testType: {superType: true},
      labInfo: true,
      testResultMeasurements: {
        testType: {
          testTypeResultOptions: true,
        },
      },
      testResultAttachments: true,
      patient: {
        serviceProvider: true,
        patientAddresses: true,
      },
      specimen: {
        testOrder: true,
        staffUser: true,
        semenVerificationForm: {serviceProvider: true},
        serviceType: {superType: true},
        incompletionReason: true,
      },
      staffUser: true,
      orderingPhysician: true,
      appointment: {serviceType: {superType: true}},
      task: true,
      labSyncObservationRequests: {
        labSyncObservationResults: true,
      },
    },
  })
}

export async function findOneByUuidAndDataForUltrasound(
  testResultUUID: string,
): Promise<TestResult> {
  const {testResultRepository} = await getRepositories()

  return testResultRepository.findOne({
    where: {uuid: Equal(testResultUUID)},
    relations: {
      orderingPhysician: true,
      patient: {
        serviceProvider: true,
        patientAddresses: true,
      },
      testType: true,
      labInfo: true,
      testResultOvaryMeasurements: {
        testResultOvaryCystMeasurements: true,
      },
      testResultObUltrasound: true,
      testResultOHSSFluidMeasurement: true,
      testResultOHSSOvaryMeasurements: true,
      appointment: {
        testOrder: {
          staffUser: true,
        },
      },
      staffUser: true,
      testResultUterusMeasurement: true,
      testResultAttachments: true,
    },
    //order to have the same order in create and detail, and also in test to check 2 arrays payload = DB
    order: {
      testResultUterusMeasurement: {id: 'ASC'},
      testResultOvaryMeasurements: {id: 'ASC', testResultOvaryCystMeasurements: {id: 'ASC'}},
      testResultAttachments: {id: 'ASC'},
    },
  })
}
