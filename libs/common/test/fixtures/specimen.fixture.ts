/* eslint-disable max-lines */
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {Specimen} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  labMachineDynacareFixture,
  labMachineFixture,
  labMachineNestprojectFixture,
  labMachineToBeUnassignedFixture,
} from './lab-machine.fixture'
import {
  mainPatientForSpermCryoFixture,
  patientClinicEmrKimLeFixture,
  patientEmailVerifiedFixture,
  patientForDocumentGenerationFixture,
  patientForEncounterTypeFixture,
  patientForEPPFixture,
  patientForGetSpecimenDetailsFixture,
  patientForGetSpermCryoListFixture,
  patientForMaleIcFormFixture,
  patientForPlanPartnerFixture,
  patientForPlansCreationFixture,
  patientForPlanTypesFixture,
  patientForProfileTestResultsFixture,
  patientForTestResultAuthFixture,
  patientForUltrasoundInLatestTestResultFixture,
  patientPartnerForProfileWithInvalidHighlightFixture,
  patientToMoveSpecimenAppointmentInProgressFixture,
  patientWithoutDoctorSoftDeletedFixture,
} from './patient.fixture'
import {specimenGroupFixture} from './specimen-group.fixture'
import {
  transportFolderForIVFFixture,
  transportFolderForManifestFixture,
  transportFolderListFixture,
  transportFolderToBeUpdatedFixture,
} from './transport-folder.fixture'
import {
  testOrderFixture,
  testOrderForCancelEndpoint,
  testOrderForGetSpecimensForAppointmentFixture,
  testOrderForViewFixture,
  testOrderSpecimenBarcodeFixture,
  testOrderSpecimenCollectionFixture,
  testOrderToMoveAppointmentInProgressFixture,
  testOrderToUpdate,
} from '@libs/common/test/fixtures/test-order.fixture'
import {
  serviceTypeBloodCycleMonitoringFixture,
  serviceTypeFixture,
  serviceTypeSemenCollectionFixture,
  serviceTypeUrineCollectionFixture,
} from './service-type.fixture'
import {
  semenVerificationFormFixture,
  semenVerificationFormForCreateCryoDetailsFixture,
  semenVerificationFormForCreateCryoDetailsV2Fixture,
  semenVerificationFormForSpecimenDetailsFixture,
} from './semen-verification-form.fixture'
import {specimenOtherRejectionReason} from './specimen-incompletion-reason.fixture'
import {
  activeMediaLotFixture,
  activeMediaLotForCreateDetailsFixture,
  activeMediaLotForDetailsFixture,
} from './media-lot.fixture'
import {reagentDMSOFixture, reagentFixture} from '@libs/common/test/fixtures/reagent.fixture'
import {DonorEligibility} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/donor-eligibility.enum'
import {SpecimenProcessingLocation, SpecimenStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {staffUserFixture} from '@libs/common/test/fixtures/staff.fixture'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const specimenFixture: Partial<Specimen> = {
  id: 1,
  uuid: '627f851c-3a52-4cea-b3d5-1195aa0142d9',
  specimenIdentifier: 'S0000000121',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  transportFolderId: transportFolderListFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const specimen30DaysPlusFixture: Partial<Specimen> = {
  id: 2,
  uuid: 'specimen-132d-11ed-814e-0242ac112003',
  specimenIdentifier: 'S0000000122',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InProgress,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 31),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimen18DaysFixture: Partial<Specimen> = {
  id: 3,
  uuid: 'specimen-132d-11ed-814e-0242ac112004',
  specimenIdentifier: 'S0000000123',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineDynacareFixture.id,
  status: SpecimenStatus.ReceivedInLab,
  collectedOn: dateTimeUtil.now(),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenMachineToBeUpdatedOneFixture: Partial<Specimen> = {
  id: 90,
  uuid: 'b6fbd4cc-92e0-4230-abb2-fa27eb092186',
  specimenIdentifier: 'S0000000190',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineToBeUnassignedFixture.id,
  status: SpecimenStatus.ReceivedInLab,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 18),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenMachineToBeUpdatedTwoFixture: Partial<Specimen> = {
  id: 91,
  uuid: 'b876cd20-8d3d-4a02-ab2a-7bb628edad6d',
  specimenIdentifier: 'S0000000191',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineToBeUnassignedFixture.id,
  status: SpecimenStatus.ReceivedInLab,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 18),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenCompletedFixture: Partial<Specimen> = {
  id: 4,
  uuid: 'specimen-132d-11ed-814e-0242a9804',
  specimenIdentifier: 'S0000000124',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 22),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenInTransitFixture: Partial<Specimen> = {
  id: 5,
  uuid: 'specimen-132d-11ed-814e-0246112',
  specimenIdentifier: 'S0000000125',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineNestprojectFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 27),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenPendingFixture: Partial<Specimen> = {
  id: 6,
  uuid: 'specimen-132d-11ed-814e-0242a004',
  specimenIdentifier: 'S0000000126',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  staffUserId: staffUserFixture.id,
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenWithTransportOutsideFixture: Partial<Specimen> = {
  id: 7,
  uuid: 'specimen-132d-11ed-814e-0242a777',
  specimenIdentifier: 'S0000000127',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenWithoutMachineFixture: Partial<Specimen> = {
  id: 8,
  uuid: 'specimen-132d-11ed-814e-0242ac112333',
  specimenIdentifier: 'S0000000128',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: null,
  status: SpecimenStatus.InProgress,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenToBeUpdatedForTransportFolderFixture: Partial<Specimen> = {
  id: 10,
  uuid: 'specimen-132d-11ed-814e-0242ac112444',
  specimenIdentifier: 'S0000000444',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: null,
  status: SpecimenStatus.InProgress,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.InHouse,
  transportFolderId: transportFolderToBeUpdatedFixture.id,
  testOrderId: testOrderFixture.id,
}

export const specimenToBeUpdatedForSubmitSpecimenCollectionFixture: Partial<Specimen> = {
  id: 20,
  uuid: '2e93f4e1-fa02-494e-9443-04137f470303',
  specimenIdentifier: 'S0000000550',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.InHouse,
  transportFolderId: transportFolderToBeUpdatedFixture.id,
  testOrderId: testOrderFixture.id,
}

export const specimenHasStatusRetestRequiredFixture: Partial<Specimen> = {
  id: 11,
  uuid: 'specimen-132d-11ed-814e-0246555',
  specimenIdentifier: 'S0000000555',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineNestprojectFixture.id,
  status: SpecimenStatus.RetestRequired,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 27),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenForCalendarSpecimenCollectionUpdateFixture: Partial<Specimen> = {
  id: 12,
  uuid: 'specimen-132d-11ed-814e-0246666',
  specimenIdentifier: 'S0000000666',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineNestprojectFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 27),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}
export const specimenCollectedFixture: Partial<Specimen> = {
  id: 13,
  uuid: 'specimen-132d-11ed-814e-0246688',
  specimenIdentifier: 'DS0000000688',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineDynacareFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 18),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
  testResultGenerated: true,
}

export const specimenCompletedForTransportFolderListFixture: Partial<Specimen> = {
  id: 14,
  uuid: 'specimen-132d-11ed-814e-0246690',
  specimenIdentifier: 'S0000000690',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineDynacareFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.now(),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
  transportFolderId: transportFolderListFixture.id,
}

export const specimenBGSGroupFixture: Partial<Specimen> = {
  id: 15,
  uuid: 'specimen-139d-11ad-814e-0272a004',
  specimenIdentifier: 'S0000100126',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenForTestNotCompleteFixture: Partial<Specimen> = {
  id: 16,
  uuid: '5d25f526-022a-4fbc-9ee2-a50c3b90dbb0',
  specimenIdentifier: 'S0000100127',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenInTransitWithTransportOutsideFixture: Partial<Specimen> = {
  id: 17,
  uuid: '6856d39b-55c6-4fc7-8ae1-08badfc64aae',
  specimenIdentifier: 'S0000000017',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
  transportFolderId: transportFolderListFixture.id,
}

export const specimenOfTestOrderCancelFixture: Partial<Specimen> = {
  id: 18,
  uuid: '6856d31b-55c1-2fc7-8ae1-09badfc63aae',
  specimenIdentifier: 'S0000000018',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderForCancelEndpoint.id,
  transportFolderId: transportFolderListFixture.id,
}

export const specimenForPlanCreationFixture: Partial<Specimen> = {
  id: 19,
  uuid: '6856d31b-55c1-2fc7-8ae1-09badfc63abb',
  specimenIdentifier: 'S0000000019',
  patientId: patientForPlansCreationFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
  transportFolderId: transportFolderListFixture.id,
}

export const specimenForPreliminaryBloodFixture: Partial<Specimen> = {
  id: 21,
  uuid: '6156d31c-51c1-2fc7-8ae1-09badfc63abc',
  specimenIdentifier: 'S0000000021',
  patientId: patientForPlansCreationFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  transportFolderId: transportFolderListFixture.id,
}

export const specimenSemenCollectionRejectedFixture: Partial<Specimen> = {
  id: 22,
  uuid: '8d9d1523-d524-4818-836c-9a2c844d6b69',
  specimenIdentifier: 'S0000000022',
  patientId: patientForMaleIcFormFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InProgress,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderToUpdate.id,
}

export const specimenWithRejectedFixture: Partial<Specimen> = {
  id: 23,
  uuid: 'bf560e79-7fa6-4e42-a133-ea7a9992b585',
  specimenIdentifier: 'S0000000023',
  patientId: patientForPlansCreationFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Rejected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  transportFolderId: transportFolderListFixture.id,
  rejectedOn: dateTimeUtil.now(),
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  incompletionReasonId: specimenOtherRejectionReason.id,
  otherIncompletionReason: 'Other reason from user',
}

export const specimenSemenCollectionSuccessFixture: Partial<Specimen> = {
  id: 24,
  uuid: '1994c710-65e6-4ab1-9c6b-6482bfec9564',
  specimenIdentifier: 'S0000000024',
  patientId: patientForMaleIcFormFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InProgress,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderToUpdate.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
}

export const specimenCollectedWithSemenFormFixture: Partial<Specimen> = {
  id: 26,
  uuid: '331e04e2-2e6b-4303-bb49-64a49dd98ab0',
  specimenIdentifier: 'S0000000026',
  patientId: patientForMaleIcFormFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  transportFolderId: transportFolderListFixture.id,
  semenVerificationFormId: semenVerificationFormFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
}

export const specimenForRejectedTestFixture: Partial<Specimen> = {
  id: 27,
  uuid: 'b54768b7-c528-4a1d-b079-13c38f9ad90f',
  specimenIdentifier: 'S0000000027',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Rejected,
  collectedOn: null,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
}

export const specimenForStimSheetFixture: Partial<Specimen> = {
  id: 28,
  uuid: 'specimen-139d-11ad-814e-0272a021',
  specimenIdentifier: 'S0000100128',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.toDate('2020-02-05T13:00:00'),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenForStimSheetLatestFixture: Partial<Specimen> = {
  id: 29,
  uuid: 'specimen-139d-11ad-814e-0272a022',
  specimenIdentifier: 'S0000100129',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.toDate('2020-08-08T13:10:00'),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenForGetSpecimensForAppointmentFixture: Partial<Specimen> = {
  id: 30,
  uuid: 'specimen-888d-11ed-814e-0242ac112002',
  specimenIdentifier: 'S0000000130',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  transportFolderId: transportFolderListFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const specimenForSpermCryoFixture: Partial<Specimen> = {
  id: 31,
  uuid: '4ea0ed7d-82b5-11ed-b47d-46410aa2000d',
  specimenIdentifier: 'S00000000031',
  patientId: patientEmailVerifiedFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotFixture.id,
}

export const specimenForSpermCryoWithCryoVialsFixture: Partial<Specimen> = {
  id: 32,
  uuid: 'afa23f49-d543-4e95-b3a0-12c3bd0f02cd',
  specimenIdentifier: 'S00000000032',
  patientId: patientForGetSpermCryoListFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotFixture.id,
}

export const specimenForGetDetailsFixture: Partial<Specimen> = {
  id: 33,
  uuid: '3c70ca10-0175-4ce8-a010-daeaab251844',
  specimenIdentifier: 'S00000000033',
  patientId: patientForGetSpecimenDetailsFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotForDetailsFixture.id,
  reagentId: reagentFixture.id,
  semenVerificationFormId: semenVerificationFormForSpecimenDetailsFixture.id,
  donorSperm: true,
  donorNumber: 'donorNumber',
  bank: 'bank',
  donorEligibility: DonorEligibility.Eligible,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
}

export const specimenForCreateCryoVialsFixture: Partial<Specimen> = {
  id: 34,
  uuid: 'db4c6b4b-caa3-4dfb-8804-510543bdc3a1',
  specimenIdentifier: 'S00000000034',
  patientId: patientForGetSpecimenDetailsFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotForCreateDetailsFixture.id,
  reagentId: reagentDMSOFixture.id,
  semenVerificationFormId: semenVerificationFormForCreateCryoDetailsFixture.id,
  donorSperm: true,
  donorNumber: 'donorNumber',
  bank: 'bank',
  donorEligibility: DonorEligibility.Eligible,
}

export const specimenForSpermCryoThawedFixture: Partial<Specimen> = {
  id: 35,
  uuid: '7729c4a8-fc71-43ca-a404-ed2b88766264',
  specimenIdentifier: 'S00000000035',
  patientId: patientForGetSpermCryoListFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.ReceivedInLab,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotFixture.id,
}

export const specimenForSpermCryoPartnerFixture: Partial<Specimen> = {
  id: 36,
  uuid: '19d0623a-0c77-4997-884b-4240f937f810',
  specimenIdentifier: 'S00000000036',
  patientId: mainPatientForSpermCryoFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotFixture.id,
  donorNote: 'note for donor',
  mediaLotNote: 'note for mediaLot',
  reagentNote: 'note for reagent',
}

export const specimenForUltrasoundTestResultFixture: Partial<Specimen> = {
  id: 39,
  uuid: 39 + 'specim-132d-11ed-814e-0242a004',
  specimenIdentifier: 'S0000000039',
  patientId: patientForUltrasoundInLatestTestResultFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenForBarcodeFixture: Partial<Specimen> = {
  id: 40,
  uuid: 'c65e497d-4295-4d22-97f3-2dd987080af6',
  specimenIdentifier: 'S000000000340',
  patientId: patientEmailVerifiedFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderSpecimenBarcodeFixture.id,
  serviceTypeId: serviceTypeUrineCollectionFixture.id,
}

export const specimenSemenCollectionOptionalFieldsSuccessFixture: Partial<Specimen> = {
  id: 41,
  uuid: '115f431e-af11-4ce8-8025-c32883dd9248',
  specimenIdentifier: 'S0000000041',
  patientId: patientForMaleIcFormFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InProgress,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderToUpdate.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
}

export const specimenForVerbalTestResultFixture: Partial<Specimen> = {
  id: 42,
  uuid: 'c575c383-a6c0-471d-8535-633a04a4fedd',
  specimenIdentifier: 'S0000000042',
  patientId: patientForMaleIcFormFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InProgress,
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
}

export const specimenForSubmitFixture: Partial<Specimen> = {
  id: 43,
  uuid: '0731a31c-7a25-4e9b-91e8-010a44031436',
  specimenIdentifier: 'S0000000043',
  patientId: patientForEPPFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InProgress,
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
}

export const specimenForHCGWorkSheetFixture: Partial<Specimen> = {
  id: 45,
  uuid: 'specimen-140d-11ad-814e-0272a021',
  specimenIdentifier: 'S0000100145',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.toDate('2020-02-17T13:00:00'),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenToBeUpdatedWithoutStorageFixture: Partial<Specimen> = {
  id: 56,
  uuid: '9a5fbb53-0b52-4b2c-bf7c-d1badfc15c38',
  specimenIdentifier: 'S0000000056',
  patientId: patientEmailVerifiedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.InHouse,
  transportFolderId: transportFolderToBeUpdatedFixture.id,
  testOrderId: testOrderFixture.id,
}

export const specimenWithoutGroupFixture: Partial<Specimen> = {
  id: 57,
  uuid: '708618d1-914e-4996-9199-6e087b079936',
  specimenIdentifier: 'S0000000157',
  patientId: patientEmailVerifiedFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  transportFolderId: transportFolderListFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const specimenForReviewedTestResultFixture: Partial<Specimen> = {
  id: 58,
  uuid: '4338ed78-dc24-4ab2-8288-0752a8306c45',
  specimenIdentifier: 'S0000000158',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  transportFolderId: transportFolderListFixture.id,
}

export const specimenCompletedForEditTestResultFixture: Partial<Specimen> = {
  id: 59,
  uuid: '4466dbf2-d17a-4d62-bc8d-c6db8534ad59',
  specimenIdentifier: 'S0000000159',
  patientId: patientForProfileTestResultsFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  transportFolderId: transportFolderListFixture.id,
}

export const specimenCompletedForCompletedTestResultFixture: Partial<Specimen> = {
  id: 60,
  uuid: '2226dbf2-d17a-4d62-bc8d-c6db8534a111',
  specimenIdentifier: 'S0000000160',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderToUpdate.id,
  transportFolderId: null,
}

export const specimenLifeLabB12Fixture: Partial<Specimen> = {
  id: 61,
  uuid: '3336dbf2-d17a-4d62-bc8d-c6db8534a222',
  specimenIdentifier: 'S0000000161',
  patientId: patientForTestResultAuthFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
  transportFolderId: null,
}

export const specimenForPrimingFixture: Partial<Specimen> = {
  id: 62,
  uuid: 'specimen-139d-11ad-812e-0272a021',
  specimenIdentifier: 'S0000100162',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenForPrimingOlderFixture: Partial<Specimen> = {
  id: 63,
  uuid: 'specimen-239d-11ad-812e-0272a021',
  specimenIdentifier: 'S0000100163',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subMonths(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenForPlanResultsFixture: Partial<Specimen> = {
  id: 64,
  uuid: 'specimen-223d-11ad-812e-0272a021',
  specimenIdentifier: 'S0000100164',
  patientId: patientForPlanTypesFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.addHours(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenForCreateCryoVialsV2Fixture: Partial<Specimen> = {
  id: 65,
  uuid: '2b4c6b4b-caa3-4dfb-8804-510543bdc3a1',
  specimenIdentifier: 'S00000000065',
  patientId: patientForGetSpecimenDetailsFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotForCreateDetailsFixture.id,
  reagentId: reagentDMSOFixture.id,
  semenVerificationFormId: semenVerificationFormForCreateCryoDetailsV2Fixture.id,
  donorSperm: true,
  donorNumber: null,
  bank: null,
  donorEligibility: null,
}

export const specimenViewStateFlagFixture: Partial<Specimen> = {
  id: 66,
  uuid: 'specimen-223d-11ad-812e-0272a066',
  specimenIdentifier: 'S0000100166',
  patientId: patientClinicEmrKimLeFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: null,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.addHours(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testResultGenerated: true,
  testOrderId: testOrderFixture.id,
}

export const specimenForBiopsyFixture: Partial<Specimen> = {
  id: 67,
  uuid: 'specimen-139d-11ad-812e-0272a221',
  specimenIdentifier: 'S0000100167',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  testResultGenerated: true,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  testOrderId: testOrderFixture.id,
}

export const specimenWithEmbryoForTransportFixture: Partial<Specimen> = {
  id: 68,
  uuid: 'specimen-321d-21ad-812e-0272a221',
  specimenIdentifier: 'S0000100168',
  patientId: patientForPlanPartnerFixture.id,
  testResultGenerated: true,
  status: SpecimenStatus.ReadyForTransport,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  testOrderId: testOrderFixture.id,
  transportFolderId: transportFolderForIVFFixture.id,
}

export const specimenForBiopsyInTransitFixture: Partial<Specimen> = {
  id: 69,
  uuid: 'specimen-139d-11ad-812e-0272a116',
  specimenIdentifier: 'S0000100169',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  testResultGenerated: true,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  testOrderId: testOrderFixture.id,
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  transportFolderId: transportFolderForIVFFixture.id,
}

export const specimenForGeneticTestsResultFixture: Partial<Specimen> = {
  id: 70,
  uuid: 'specimen-139d-11ad-812e-0272a356',
  specimenIdentifier: 'S0000100170',
  patientId: patientForPlanPartnerFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  testResultGenerated: true,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InTransit,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  testOrderId: testOrderFixture.id,
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  transportFolderId: transportFolderForIVFFixture.id,
}

export const specimenForIsActiveFixture: Partial<Specimen> = {
  id: 71,
  uuid: '452d850d-26a4-4f8b-a43d-a257812583e4',
  specimenIdentifier: 'S0000000171',
  patientId: patientForTestResultAuthFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderForViewFixture.id,
  transportFolderId: null,
}

export const specimenForEncountersFixture: Partial<Specimen> = {
  id: 72,
  uuid: 'specimen-1291-11ad-812e-0272a021',
  specimenIdentifier: 'S0000100172',
  patientId: patientForEncounterTypeFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenToMoveAppointmentInProgressFixture: Partial<Specimen> = {
  id: 73,
  uuid: 'specimen-1291-11ad-812e-1372b023',
  specimenIdentifier: 'S0000100173',
  patientId: patientToMoveSpecimenAppointmentInProgressFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  testOrderId: testOrderToMoveAppointmentInProgressFixture.id,
}

export const specimenToGenerateDocumentFixture: Partial<Specimen> = {
  id: 74,
  uuid: 'specimen-139d-11ad-814e-0272a064',
  specimenIdentifier: 'S0000100174',
  patientId: patientForDocumentGenerationFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.toDate('2020-02-05T13:00:00'),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenToGenerateDocumentLatestFixture: Partial<Specimen> = {
  id: 75,
  uuid: 'specimen-139d-11ad-814e-0272a065',
  specimenIdentifier: 'S0000100175',
  patientId: patientForDocumentGenerationFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.toDate('2020-08-20T13:10:00'),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: testOrderFixture.id,
}

export const specimenCollectedForSoftDeletedPatientFixture: Partial<Specimen> = {
  id: 76,
  uuid: 'specimen-176d-11ed-814e-0246688',
  specimenIdentifier: 'DS0000000076',
  patientId: patientWithoutDoctorSoftDeletedFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineDynacareFixture.id,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 18),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
  testResultGenerated: true,
  transportFolderId: transportFolderForManifestFixture.id,
}

export const specimenForSpermCryoPanelFixture: Partial<Specimen> = {
  id: 77,
  uuid: '7779c4a8-fc71-43ca-a404-ed2b88766777',
  specimenIdentifier: 'S00000000077',
  patientId: patientForGetSpermCryoListFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.WaitingForCompletion,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  mediaLotId: activeMediaLotFixture.id,
}

export const specimenForCryoSemenCollectionFixture: Partial<Specimen> = {
  id: 78,
  uuid: '7879c4a8-fc71-43ca-a404-ed2b88766778',
  specimenIdentifier: 'S00000000078',
  patientId: patientForTestResultAuthFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  testOrderId: testOrderFixture.id,
}
