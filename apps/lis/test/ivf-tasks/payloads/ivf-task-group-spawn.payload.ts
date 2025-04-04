import {TaskIVF} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {
  ivfPatientFemaleFixture,
  ivfPatientMalePartnerFixture,
  ivfTaskSummaryForPostStrippingFixture,
  patientForIVFTasks1Fixture,
  planTypeFixture,
} from '@libs/common/test/fixtures'
import {IVFLabStatus, IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {IvfDayStatusEnum} from '@apps/lis/daily-view/dto/daily-view.dto'
import {getIvfLabDayLabels} from '@libs/services-common/enums'
import {patientPlanV2ForGetGroupTaskFixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {
  patientProfileAlertDailyViewSpawnFixture,
  patientProfileAlertTaskDetailsFixture,
} from '@libs/common/test/fixtures/patient-profile-alert.fixture'
import {profileAlertAbnormalSpermFixture} from '@libs/common/test/fixtures/profile-alert.fixture'
import {ProfileAlertTypeTitle} from '@libs/data-layer/apps/users/enum'

export const UpdatedPostStrippingDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForPostStrippingFixture.uuid,
  uiid: IVFTaskType.PostStripping,
  lastUpdateDetails: expect.any(String),
  details: {
    day0Date: expect.any(String),
    matureOocytes: 10,
    immatureOocytes: 11,
    degenOocytes: 2,
    abnormalOocytes: 10,
    isCohortSpawned: true,
  },
})

export const SpawnedPatientsDayToCheck: TaskIVF = expect.objectContaining({
  id: 0,
  title: getIvfLabDayLabels.get(0),
  patients: expect.arrayContaining([
    {
      id: expect.any(String),
      patientId: expect.any(String),
      identifier: expect.any(String),
      fullName: `${ivfPatientFemaleFixture.firstName} ${ivfPatientFemaleFixture.lastName}`,
      planTypeTitle: planTypeFixture.title,
      patientPlanId: patientPlanV2ForGetGroupTaskFixture.uuid,
      isSpawnedCohort: true,
      patientIvfStatus: IVFLabStatus.Active,
      alerts: [
        {
          id: patientProfileAlertDailyViewSpawnFixture.uuid,
          typeId: profileAlertAbnormalSpermFixture.type,
          typeTitle: ProfileAlertTypeTitle[profileAlertAbnormalSpermFixture.type],
          message: `${profileAlertAbnormalSpermFixture.text} for ${patientForIVFTasks1Fixture.firstName} ${patientForIVFTasks1Fixture.lastName} (partner)`,
        },
        {
          id: patientProfileAlertTaskDetailsFixture.uuid,
          typeId: profileAlertAbnormalSpermFixture.type,
          typeTitle: ProfileAlertTypeTitle[profileAlertAbnormalSpermFixture.type],
          message: `${profileAlertAbnormalSpermFixture.text} for ${ivfPatientMalePartnerFixture.firstName} ${ivfPatientMalePartnerFixture.lastName} (partner)`,
        },
      ],
      ivfTaskGroups: [
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.NoTask,
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.NoTask,
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.Future,
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: 'Future',
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.NoTask,
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.NoTask,
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.NoTask,
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.NoTask,
          scanState: 'NotApplicable',
        },
        {
          signOffInitials: null,
          isDayDisabled: false,
          id: expect.any(String),
          type: IvfDayStatusEnum.Future,
          scanState: 'NotApplicable',
        },
      ],
    },
  ]),
})
