/* eslint-disable max-lines */
import {PatientPlanCohort} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {
  patientPlanV2ForGetGroupTaskForCheckingMaxCountFixture,
  patientPlanForIVFTaskHistoryFixture,
  patientPlanForMobileDetailsV2WithAddonsFixture,
  patientPlanV2CancelledIVFStateFixture,
  patientPlanV2CompletedFixture,
  patientPlanV2CompletedIVFStateFixture,
  patientPlanV2ForAwaitingForBiopsyFixture,
  patientPlanV2ForCancelCohortFixture,
  patientPlanV2ForCancelFromPlanFixture,
  patientPlanV2ForCompleteCohortFixture,
  patientPlanV2ForCompletionForStatsIVFStateFixture,
  patientPlanV2ForCompletionIVFStateFixture,
  patientPlanV2ForCompletionWithoutEmbryoTaskIVFStateFixture,
  patientPlanV2ForGetGroupTaskFixture,
  patientPlanV2ForOrderFirstFixture,
  patientPlanV2ToUpdateFixture,
  patientPlanV3CompletedFixture,
  patientPlanV3CompletedWithCohortFixture,
  patientPlanV2ForEggFreezingFixture,
  patientPlanToNotReportPeriodFixture,
  patientPlanV3ToUpdateFixture,
  patientPlanForPlanTypesV2OlderFixture,
  patientPlanToActivateWithoutPushingFixture,
  patientPlanForDay3Fixture,
  patientPlanEPLFixture,
  patientPlanForPartnerBarcodeFixture,
  patientPlanForOocyteCollectionFixture,
  patientPlanToChangeEggAnalysisFixture,
  patientPlanForEggThawFixture,
  patientPlanForStrawDeletionFixture,
  patientPlanV2ForMiiDay1CryoFixture,
  patientPlanV2ForMiiDay1CryoMaxDiscardedValidationFixture,
  patientPlanBiopsyInTransitFixture,
  patientPlanForEggThawStrawSelectionVisibilityFixture,
  patientPlanV2ForStrawNumberFixture,
  patientPlanForStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
import {
  patientPlanForDiscardDishIVFFixture,
  patientPlanForDishScanFixture,
  patientPlanForIVF2Fixture,
  patientPlanForIVF3Fixture,
  patientPlanForIVF4Fixture,
  patientPlanForIVF5Fixture,
  patientPlanForIVF6Fixture,
  patientPlanForIVF7Fixture,
  patientPlanForIVF8Fixture,
  patientPlanForIVFFixture,
} from '@libs/common/test/fixtures/patient-plan-ivf.fixture'
import {
  appointmentBookedStatusFixture,
  appointmentInitialConsultationForCheckingMaxCount,
  appointmentInitialConsultation,
  appointmentStrawNumberFixture,
} from './appointment.fixture'
import {FirstCancellationReasonFixture} from '@libs/common/test/fixtures/ivf-cancellation-reason.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)

const getActivePeriod: (cohortDate: string | Date, daysCount: number) => string = (
  cohortDate: string | Date,
  daysCount: number,
): string => {
  return dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(cohortDate), daysCount),
  )
}

const patientPlanCohortCohortDate1: string = dateTimeUtil.formatDateYMD(
  dateTimeUtil.getDateFromYMD({
    year: 2020,
    month: 10,
    day: 15,
  }),
)

const patientPlanCohortCohortDate2: string = dateTimeUtil.formatDateYMD(
  dateTimeUtil.getDateFromYMD({
    year: 2020,
    month: 10,
    day: 14,
  }),
)

const patientPlanCohortCohortDate3: string = dateTimeUtil.formatDateYMD(
  dateTimeUtil.getDateFromYMD({
    year: 2020,
    month: 10,
    day: 13,
  }),
)

const patientPlanCohortCohortDate4: string = dateTimeUtil.formatDateYMD(
  dateTimeUtil.getDateFromYMD({
    year: 2020,
    month: 10,
    day: 16,
  }),
)

const patientPlanCohortCohortDate5: string = dateTimeUtil.formatDateYMD(
  dateTimeUtil.getDateFromYMD({
    year: 2050,
    month: 10,
    day: 16,
  }),
)
export const patientPlanCohortFixture: Partial<PatientPlanCohort> = {
  id: 1,
  uuid: '68cc7cfa-ed7d-4896-954b-767e037e4e2c',
  patientPlanId: patientPlanV2ForGetGroupTaskFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortDay3FreshTransferFixture: Partial<PatientPlanCohort> = {
  id: 36,
  uuid: '3f524f99-c699-497d-86d3-ba9bb6d49548',
  patientPlanId: patientPlanForDay3Fixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForCheckingMaxCountFixture: Partial<PatientPlanCohort> = {
  id: 26,
  uuid: '4c7ffa6d-61d4-46a8-856e-f0c410e0df1f',
  patientPlanId: patientPlanV2ForGetGroupTaskForCheckingMaxCountFixture.id,
  appointmentId: appointmentInitialConsultationForCheckingMaxCount.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

const oldCohortDate: string = '2022-02-2'

export const patientPlanCohort1Fixture: Partial<PatientPlanCohort> = {
  id: 2,
  uuid: '76d271cc-c266-48f8-9984-124fc3a9c835',
  patientPlanId: patientPlanForIVFFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohort2Fixture: Partial<PatientPlanCohort> = {
  id: 3,
  uuid: 'f9d6de68-c7d8-427f-b2b5-8bf97afb578c',
  patientPlanId: patientPlanForIVF2Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const spawnedPatientPlanCohortFixture: Partial<PatientPlanCohort> = {
  id: 18,
  uuid: '8ee4c82e-719a-4b36-a8a7-7fcaee2114ac',
  patientPlanId: patientPlanForIVF2Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  spawnedFromPatientPlanCohortId: patientPlanCohort2Fixture.id,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohort3Fixture: Partial<PatientPlanCohort> = {
  id: 4,
  uuid: '8d1b5597-166b-459c-8b6d-2c5010f3a42c',
  patientPlanId: patientPlanForIVF3Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohort4Fixture: Partial<PatientPlanCohort> = {
  id: 5,
  uuid: '68c36e9f-66d1-49ac-956b-bcd137e92f52',
  patientPlanId: patientPlanForIVF4Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohort5Fixture: Partial<PatientPlanCohort> = {
  id: 6,
  uuid: '11e5a90b-a44d-483d-918c-b97426c78ad1',
  patientPlanId: patientPlanForIVF5Fixture.id,
  cohortDate: patientPlanCohortCohortDate2,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate2, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate2, 7),
}

export const patientPlanCohort6Fixture: Partial<PatientPlanCohort> = {
  id: 7,
  uuid: '2aa30dd1-2ff2-45ea-b8d6-3aef5eac55bf',
  patientPlanId: patientPlanForIVF6Fixture.id,
  cohortDate: patientPlanCohortCohortDate3,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate3, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate3, 7),
}

export const patientPlanCohort7Fixture: Partial<PatientPlanCohort> = {
  id: 8,
  uuid: 'a72dd3e8-e043-408f-9fe0-389e91feffcc',
  patientPlanId: patientPlanForIVF7Fixture.id,
  cohortDate: patientPlanCohortCohortDate4,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate4, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate4, 7),
}

export const patientPlanCohort8Fixture: Partial<PatientPlanCohort> = {
  id: 9,
  uuid: '88abe6c8-4be4-4e28-b1b5-6c8e17c7cc2a',
  patientPlanId: patientPlanForIVF8Fixture.id,
  cohortDate: patientPlanCohortCohortDate5,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate5, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate5, 7),
}

export const patientPlanCohortFixtureToDelete: Partial<PatientPlanCohort> = {
  id: 9,
  patientPlanId: patientPlanV2ToUpdateFixture.id,
}

export const patientPlanCohortForOrderFirstFixture: Partial<PatientPlanCohort> = {
  id: 11,
  uuid: '69b2c65c-70fe-4455-92da-604651e0c100',
  patientPlanId: patientPlanV2ForOrderFirstFixture.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 1)),
  appointmentId: appointmentBookedStatusFixture.id,
}

export const patientPlanCohortForTaskGroupForFixture: Partial<PatientPlanCohort> = {
  id: 12,
  uuid: '01902a3a-6350-4e55-8531-21722d7fee6d',
  patientPlanId: patientPlanForMobileDetailsV2WithAddonsFixture.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
}

export const patientPlanCohortForFrozenEmbryoPlanComponentFixture: Partial<PatientPlanCohort> = {
  id: 13,
  uuid: '22902a3a-6350-4e55-8531-21722d7fee6d',
  patientPlanId: patientPlanV2CompletedFixture.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
}

export const patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture: Partial<PatientPlanCohort> = {
  id: 14,
  uuid: '22902a3a-6350-4e66-8531-21722d7fee6d',
  patientPlanId: patientPlanV3CompletedFixture.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForTaskHistoryFixture: Partial<PatientPlanCohort> = {
  id: 15,
  uuid: '23901a3a-6350-4e66-8531-21722d7fee6d',
  patientPlanId: patientPlanForIVFTaskHistoryFixture.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
}

export const patientPlanCohortForCancelFixture: Partial<PatientPlanCohort> = {
  id: 16,
  uuid: 'a7ab4c46-bfe0-46d9-bce7-fc8106ae30e1',
  patientPlanId: patientPlanV2ForCancelCohortFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForAwaitingForBiopsyFixture: Partial<PatientPlanCohort> = {
  id: 17,
  uuid: 'ab1c2d3e-4f56-7890-1234-56789abcdef0',
  patientPlanId: patientPlanV2ForAwaitingForBiopsyFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 300),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -299),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 307),
}

const cancelledCohortDate: string = dateTimeUtil.formatDateYMD(
  dateTimeUtil.getDateFromYMD({
    year: 2020,
    month: 10,
    day: 16,
  }),
)

export const patientPlanCohortForCancelledStateFixture: Partial<PatientPlanCohort> = {
  id: 19,
  uuid: 'c8597911-a502-41e2-83fe-b5c8095da7cf',
  patientPlanId: patientPlanV2CancelledIVFStateFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: getActivePeriod(cancelledCohortDate, 300),
  activePeriodStart: getActivePeriod(cancelledCohortDate, -299),
  activePeriodEnd: getActivePeriod(cancelledCohortDate, 307),
  cancellationReasonId: FirstCancellationReasonFixture.id,
  cancellationComment: 'Lorem ipsum',
}

export const patientPlanCohortForCompletionFixture: Partial<PatientPlanCohort> = {
  id: 20,
  uuid: '1da1a7e4-31b1-4f36-af53-78a1c44ed693',
  patientPlanId: patientPlanV2ForCompletionIVFStateFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 300),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -299),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 307),
}

export const patientPlanCohortForCompletionWithoutEmbryoTaskFixture: Partial<PatientPlanCohort> = {
  id: 21,
  uuid: 'c14e96c8-e3e0-4c7a-bbec-9a826ee15123',
  patientPlanId: patientPlanV2ForCompletionWithoutEmbryoTaskIVFStateFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 300),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -299),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 307),
}

export const patientPlanCohortForCompletionForStatsFixture: Partial<PatientPlanCohort> = {
  id: 22,
  uuid: '334dbf78-2390-428a-a62e-a7c64213fcce',
  patientPlanId: patientPlanV2ForCompletionForStatsIVFStateFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 300),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -299),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 307),
}

export const patientPlanCohortForCompleteFixture: Partial<PatientPlanCohort> = {
  id: 23,
  uuid: 'c6559fcd-d0ee-48d6-8337-3cebcbc1405a',
  patientPlanId: patientPlanV2ForCompleteCohortFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForCancelFromPlanFixture: Partial<PatientPlanCohort> = {
  id: 24,
  uuid: '2691430b-61e4-4b21-8259-1d23520e1e4d',
  patientPlanId: patientPlanV2ForCancelFromPlanFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForCompletedIVFStateFixture: Partial<PatientPlanCohort> = {
  id: 25,
  uuid: '019738e8-ce7e-4d47-ac4c-5cb6d350a2c8',
  patientPlanId: patientPlanV2CompletedIVFStateFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
  completionComment: 'Completed by fixture',
}

export const patientPlanCohortCompletedPlanFixture: Partial<PatientPlanCohort> = {
  id: 28,
  uuid: 'df970fc7-455f-4c06-8d1c-c8e316fa5435',
  patientPlanId: patientPlanV3CompletedWithCohortFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
  completionComment: 'Completed by fixture',
}
export const patientPlanCohortForCompletedIVFStateEggFreezingFixture: Partial<PatientPlanCohort> = {
  id: 29,
  uuid: 'ab0e52c1-6934-4317-8f88-ad6bbe6c7259',
  patientPlanId: patientPlanV2ForEggFreezingFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
  completionComment: 'Completed by fixture',
}

export const patientPlanCohortForCheckingEndDateFixture: Partial<PatientPlanCohort> = {
  id: 30,
  uuid: '4c7ffa6d-61d4-46a8-856e-f0c410e0df20',
  patientPlanId: patientPlanV3CompletedWithCohortFixture.id,
  appointmentId: appointmentInitialConsultationForCheckingMaxCount.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), -8)),
  activePeriodStart: getActivePeriod(
    dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), -8)),
    -1,
  ),
  activePeriodEnd: getActivePeriod(
    dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), -8)),
    7,
  ),
}

export const patientPlanCohortForCheckingStartDateFixture: Partial<PatientPlanCohort> = {
  id: 31,
  uuid: '4c7ffa6d-61d4-46a8-856e-f0c410e0df21',
  patientPlanId: patientPlanV3CompletedWithCohortFixture.id,
  appointmentId: appointmentInitialConsultationForCheckingMaxCount.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), 8)),
  activePeriodStart: getActivePeriod(
    dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), 8)),
    -1,
  ),
  activePeriodEnd: getActivePeriod(
    dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), 8)),
    7,
  ),
}

export const patientPlanCohortForTestResultsComponentFixture: Partial<PatientPlanCohort> = {
  id: 32,
  uuid: '4c7ffa2d-61d4-46a8-856e-f0c410e0df21',
  patientPlanId: patientPlanToNotReportPeriodFixture.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), 8)),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanChortForPlanV3ToUpdateFixture: Partial<PatientPlanCohort> = {
  id: 33,
  uuid: '2c7ffa2d-61d4-46a2-816e-f0c410e0df21',
  patientPlanId: patientPlanV3ToUpdateFixture.id,
  cohortDate: oldCohortDate,
  activePeriodStart: oldCohortDate,
  activePeriodEnd: oldCohortDate,
}

export const patientPlanCohortNotActiveFixture: Partial<PatientPlanCohort> = {
  id: 34,
  uuid: '2c7ffb2c-61d4-46a2-816e-f0c410e0df21',
  patientPlanId: patientPlanForPlanTypesV2OlderFixture.id,
  cohortDate: oldCohortDate,
  activePeriodStart: oldCohortDate,
  activePeriodEnd: oldCohortDate,
}

export const patientPlanCohortForListChangeOfOrdersFixture: Partial<PatientPlanCohort> = {
  id: 35,
  uuid: '3c7ffb2c-61d4-46a2-816e-a0c210a0df21',
  patientPlanId: patientPlanToActivateWithoutPushingFixture.id,
  cohortDate: oldCohortDate,
  activePeriodStart: oldCohortDate,
  activePeriodEnd: oldCohortDate,
}
export const patientPlanCohortForV2Fixture: Partial<PatientPlanCohort> = {
  id: 37,
  uuid: '9b9e588c-c848-440a-adfe-1af6b609269a',
  patientPlanId: patientPlanToNotReportPeriodFixture.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), 8)),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortDishScanFixture: Partial<PatientPlanCohort> = {
  id: 38,
  uuid: 'f9d6de68-c7d8-427f-b2b5-8bf97afb578d',
  patientPlanId: patientPlanForIVF2Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortDishScanNoGroupFixture: Partial<PatientPlanCohort> = {
  id: 39,
  uuid: 'f9d6de68-c7d8-427f-b2b5-8bf97afb578e',
  patientPlanId: patientPlanForIVF2Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortDishScanNotAssignedFixture: Partial<PatientPlanCohort> = {
  id: 40,
  uuid: 'f9d6de68-c7d8-427f-b2b5-8bf97afb578f',
  patientPlanId: patientPlanForDishScanFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortForScanBarcodeFixture: Partial<PatientPlanCohort> = {
  id: 41,
  uuid: '7082c010-c138-4f4b-b6d1-2b02603100b4',
  patientPlanId: patientPlanForIVF2Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortForWitnessingChecklistFixture: Partial<PatientPlanCohort> = {
  id: 42,
  uuid: '7082c010-c138-4f4b-b6d1-2b02603100b5',
  patientPlanId: patientPlanEPLFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohort2ForWitnessingChecklistFixture: Partial<PatientPlanCohort> = {
  id: 43,
  uuid: '7082c010-c138-4f4b-b6d1-2b02603100b6',
  patientPlanId: patientPlanEPLFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortForPartnerBarcodeFixture: Partial<PatientPlanCohort> = {
  id: 44,
  uuid: 'f5ae5b1d-1b66-4b9f-a23f-261a22e7ce5a',
  patientPlanId: patientPlanForPartnerBarcodeFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortForOocyteCollectionFixture: Partial<PatientPlanCohort> = {
  id: 45,
  uuid: '06b68ece-82ab-4683-838d-4e64d74d42f4',
  patientPlanId: patientPlanForOocyteCollectionFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortEggAnalysisChangeFixture: Partial<PatientPlanCohort> = {
  id: 46,
  uuid: '16b68eca-82ab-4683-838d-4e64d74d42f4',
  patientPlanId: patientPlanToChangeEggAnalysisFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortDayOocytesCollectedZeroFixture: Partial<PatientPlanCohort> = {
  id: 47,
  uuid: '877fb78b-c309-49f7-8868-ad5c0e864442',
  patientPlanId: patientPlanForOocyteCollectionFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortDay3CheckDashboardDayUpdateFixture: Partial<PatientPlanCohort> = {
  id: 48,
  uuid: 'a82ce5f5-c0fc-4b27-a453-f945fcaa9a28',
  patientPlanId: patientPlanForDay3Fixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForSpermWashAndOocyteCollectedFixture: Partial<PatientPlanCohort> = {
  id: 49,
  uuid: 'ad2f99fc-bbe4-477c-83e0-7e6e75cb56a9',
  patientPlanId: patientPlanForOocyteCollectionFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortForEggThawFixture: Partial<PatientPlanCohort> = {
  id: 50,
  uuid: '225905c7-f236-48ba-b6a0-7350c174bd9b',
  patientPlanId: patientPlanForEggThawFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortForDeleteStrawFutureFixture: Partial<PatientPlanCohort> = {
  id: 51,
  uuid: '27872e42-2976-496a-9352-0fbd7be19764',
  patientPlanId: patientPlanForStrawDeletionFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForDiscardFixture: Partial<PatientPlanCohort> = {
  id: 52,
  uuid: '54a12ffc-14c3-457a-a923-37a05bee6444',
  patientPlanId: patientPlanForDiscardDishIVFFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
  activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
}

export const patientPlanCohortForMiiDay1CryoFixture: Partial<PatientPlanCohort> = {
  id: 53,
  uuid: '8f411d31-661b-40c7-bc0f-08df18a01e24',
  patientPlanId: patientPlanV2ForMiiDay1CryoFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForBiopsyInTransitFixture: Partial<PatientPlanCohort> = {
  id: 54,
  uuid: '9f411d31-661b-40c7-bc0f-08df18a01e25',
  patientPlanId: patientPlanBiopsyInTransitFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture: Partial<PatientPlanCohort> =
  {
    id: 55,
    uuid: 'a741e291-f45d-4093-9521-720c1e01fd0f',
    patientPlanId: patientPlanV2ForMiiDay1CryoMaxDiscardedValidationFixture.id,
    cohortDate: patientPlanCohortCohortDate1,
    activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
    activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
  }

export const patientPlanCohortForEggThawStrawSelectionVisibilityFixture: Partial<PatientPlanCohort> =
  {
    id: 56,
    uuid: '69807270-5044-470e-8be5-06671d1db1bc',
    patientPlanId: patientPlanForEggThawStrawSelectionVisibilityFixture.id,
    cohortDate: patientPlanCohortCohortDate1,
    activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
    activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
  }

export const patientPlanCohortForEggThawStrawSelectionVisibility2Fixture: Partial<PatientPlanCohort> =
  {
    id: 57,
    uuid: 'f23d3a46-7599-4473-96f5-1b523ec4c2a2',
    patientPlanId: patientPlanForEggThawStrawSelectionVisibilityFixture.id,
    cohortDate: patientPlanCohortCohortDate1,
    activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
    activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
  }

export const patientPlanCohortStrawNumberFixture: Partial<PatientPlanCohort> = {
  id: 58,
  uuid: 'd591dca2-5977-422c-9132-d3a2a68c3ddf',
  patientPlanId: patientPlanV2ForStrawNumberFixture.id,
  appointmentId: appointmentStrawNumberFixture.id,
  cohortDate: patientPlanCohortCohortDate1,
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

export const patientPlanCohortForStrawSelectionOocyteCollectionFixture: Partial<PatientPlanCohort> =
  {
    id: 59,
    uuid: 'dc819a4d-204a-44be-a5d9-2105a4359527',
    patientPlanId: patientPlanForStrawSelectionOocyteCollectionFixture.id,
    cohortDate: patientPlanCohortCohortDate1,
    activePeriodStart: getActivePeriod(patientPlanCohortCohortDate1, -1),
    activePeriodEnd: getActivePeriod(patientPlanCohortCohortDate1, 7),
  }
