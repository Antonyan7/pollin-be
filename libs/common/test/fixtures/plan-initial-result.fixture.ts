import {PlanInitialResult} from '@libs/data-layer/apps/plan/entities/typeorm'
import {patientPlanFixture, patientPlanForDiseaseScreenFixture} from './patient-plan.fixture'
import {
  patientEmailVerifiedFixture,
  patientForPlanPartnerFixture,
  patientForPlansCreationFixture,
} from './patient.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {ProfileTestResultType} from '@libs/data-layer/apps/clinic-test/enums'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get('DEFAULT_TIME_ZONE'),
)

export const planInitialResultGTPAETALSFixture: Partial<PlanInitialResult> = {
  id: 1,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d79',
  patientPlanId: patientPlanFixture.id,
  isGTPAETALS: true,
  result: 'GTPAETALSRESULT',
  title: 'GTPAETALS',
  patientId: patientEmailVerifiedFixture.id,
  type: ProfileTestResultType.PlanPreliminaryTestResult,
}

export const planInitialResultInfectiousForPartnerFixture: Partial<PlanInitialResult> = {
  id: 2,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d78',
  patientPlanId: patientPlanForDiseaseScreenFixture.id,
  isGTPAETALS: true,
  result: 'resultPartner',
  title: 'titlePartner',
  patientId: patientForPlanPartnerFixture.id,
  type: ProfileTestResultType.InfectiousDisease,
  date: dateTimeUtil.toDate('2030-05-05'),
}

export const planInitialResultInfectiousForPatientFixture: Partial<PlanInitialResult> = {
  id: 3,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d77',
  patientPlanId: patientPlanForDiseaseScreenFixture.id,
  isGTPAETALS: true,
  result: 'resultPatient',
  title: 'titlePatient',
  patientId: patientForPlansCreationFixture.id,
  type: ProfileTestResultType.InfectiousDisease,
}

export const planInitialResultPreliminaryBloodsFixture: Partial<PlanInitialResult> = {
  id: 4,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d88',
  patientPlanId: patientPlanFixture.id,
  result: 'resPreBloods',
  title: 'typePreBloods',
  patientId: patientEmailVerifiedFixture.id,
  type: ProfileTestResultType.PlanPreliminaryTestResult,
  date: dateTimeUtil.toDate('2030-05-05'),
  isGTPAETALS: false,
}

export const planInitialResultPreliminaryBloodsEmptyFixture: Partial<PlanInitialResult> = {
  id: 5,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d89',
  patientPlanId: patientPlanFixture.id,
  result: '-',
  title: 'typePreBloodsEmpty',
  patientId: patientEmailVerifiedFixture.id,
  type: ProfileTestResultType.PlanPreliminaryTestResult,
}
