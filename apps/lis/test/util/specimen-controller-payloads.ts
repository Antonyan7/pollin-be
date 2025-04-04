import {
  GetSpecimensListRequestDTO,
  UpdateSpecimensMachineRequestDTO,
  SubmitSpecimensCollectionRequestDTO,
  ApplyActionOnSpecimenWithReasonDTO,
  ApplyActionOnSpecimenDTO,
  RejectSemenSpecimensCollectionsDTO,
  SubmitSemenSpecimensCollectionsDTO,
} from '@apps/lis/specimen/dto/specimen.dto'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {
  testPanelSemenAnalysisFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  appointmentForSpecimenCollectionStatusNotToBeUpdatedFixture,
  appointmentForSpecimenCollectionStatusToBeUpdatedFixture,
  appointmentRejectedSemenCollectionFixture,
  appointmentSemenCollectionFixture,
  appointmentSemenCollectionOptionalFieldsFixture,
  specimenSemenCollectionOptionalFieldsSuccessFixture,
  specimenToBeUpdatedWithoutStorageFixture,
  appointmentForCollectSpecimenWithoutStorageFixture,
} from '@libs/common/test/fixtures'
import {
  labMachineDynacareFixture,
  labMachineNestprojectFixture,
  labMachineToBeAssignedFixture,
} from '@libs/common/test/fixtures/lab-machine.fixture'
import {
  specimenStorageLocationFixture,
  specimenStorageLocationForSpecimenUpdateFixture,
} from '@libs/common/test/fixtures/specimen-storage-location.fixture'
import {
  specimenMachineToBeUpdatedOneFixture,
  specimenWithoutMachineFixture,
  specimenMachineToBeUpdatedTwoFixture,
  specimenToBeUpdatedForSubmitSpecimenCollectionFixture,
  specimen18DaysFixture,
  specimenPendingFixture,
  specimenSemenCollectionRejectedFixture,
  specimenSemenCollectionSuccessFixture,
} from '@libs/common/test/fixtures/specimen.fixture'
import {
  specimenRecollectIncompletionReasonFixture,
  specimenRejectedIncompletionReasonFixture,
  specimenRetestIncompletionReasonFixture,
} from '@libs/common/test/fixtures/specimen-incompletion-reason.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {
  SemenSpecimenCollectionContainer,
  SemenSpecimenCollectionMethod,
  SemenSpecimenCollectionPurpose,
  SpecimenStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {SpecimenSortByField, SpecimenFilterEnum} from '@libs/services-common/enums'

const dateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))

export const specimensSortByFieldLabDestinationDescRequest: Partial<GetSpecimensListRequestDTO> = {
  page: 1,
  sortByField: SpecimenSortByField.LabDestination,
  sortOrder: SortOrder.Desc,
}

export const specimensSortByFieldLabDestinationAscRequest: Partial<GetSpecimensListRequestDTO> = {
  page: 1,
  sortByField: SpecimenSortByField.LabDestination,
  sortOrder: SortOrder.Asc,
}

export const specimensSortedAgeDescRequest: Partial<GetSpecimensListRequestDTO> = {
  page: 1,
  sortByField: SpecimenSortByField.CollectionAge,
  sortOrder: SortOrder.Desc,
  pageSize: 10,
}

export const specimensFilteredByInProgressStatusRequest: Partial<GetSpecimensListRequestDTO> = {
  filters: [{id: SpecimenStatus.InProgress, type: SpecimenFilterEnum.Status}],
  page: 1,
  sortByField: SpecimenSortByField.CollectionAge,
  sortOrder: SortOrder.Desc,
}

export const specimensFilteredByTestTypeTestPanelRequest: Partial<GetSpecimensListRequestDTO> = {
  filters: [
    {id: testPanelSemenAnalysisFixture.uuid, type: SpecimenFilterEnum.TestPanel},
    {id: testTypeAMHWithMdBIllingCodeFixture.uuid, type: SpecimenFilterEnum.TestType},
  ],
  page: 1,
  sortByField: SpecimenSortByField.CollectionAge,
  sortOrder: SortOrder.Desc,
}

export const specimensSearchByIdentifiersAndFilteredByMachineRequest: Partial<GetSpecimensListRequestDTO> =
  {
    specimens: [
      {
        identifier: specimen18DaysFixture.specimenIdentifier,
      },
    ],
    filters: [{id: labMachineDynacareFixture.uuid, type: SpecimenFilterEnum.Machine}],
    page: 1,
    sortByField: SpecimenSortByField.CollectionAge,
    sortOrder: SortOrder.Desc,
  }

export const specimenFilteredByLabMachineRequest: Partial<GetSpecimensListRequestDTO> = {
  filters: [{id: labMachineNestprojectFixture.uuid, type: SpecimenFilterEnum.Machine}],
  page: 1,
  sortByField: SpecimenSortByField.CollectionAge,
  sortOrder: SortOrder.Desc,
}

export const specimensSearchWithNotFoundIdentifiers: Partial<GetSpecimensListRequestDTO> = {
  specimens: [
    {
      identifier: specimenMachineToBeUpdatedOneFixture.specimenIdentifier,
    },
    {
      identifier: 'S1NotFoundID',
    },
  ],
  page: 1,
  sortByField: SpecimenSortByField.CollectionAge,
  sortOrder: SortOrder.Desc,
}

export const specimensSearchWithIdentifier: Partial<GetSpecimensListRequestDTO> = {
  specimens: [
    {
      identifier: specimenWithoutMachineFixture.specimenIdentifier,
    },
  ],
  page: 1,
  sortByField: SpecimenSortByField.CollectionAge,
  sortOrder: SortOrder.Desc,
}

export const updateMachineRequestBody: Partial<UpdateSpecimensMachineRequestDTO> = {
  specimens: [
    {id: specimenMachineToBeUpdatedOneFixture.uuid},
    {id: specimenMachineToBeUpdatedTwoFixture.uuid},
  ],
  machineId: labMachineToBeAssignedFixture.uuid,
}

export const submitSpecimensCollectionsRequestBody: Partial<SubmitSpecimensCollectionRequestDTO> = {
  collections: [
    {
      specimenId: specimenToBeUpdatedForSubmitSpecimenCollectionFixture.uuid,
      storageLocationId: specimenStorageLocationForSpecimenUpdateFixture.uuid,
    },
  ],
  appointmentId: appointmentForSpecimenCollectionStatusToBeUpdatedFixture.uuid,
}

export const submitSpecimensCollectionsWithoutLocationRequestBody: Partial<SubmitSpecimensCollectionRequestDTO> =
  {
    collections: [
      {
        specimenId: specimenToBeUpdatedWithoutStorageFixture.uuid,
      },
    ],
    appointmentId: appointmentForCollectSpecimenWithoutStorageFixture.uuid,
  }

export const submitSpecimensCollectionsInvalidSpecimenRequestBody: Partial<SubmitSpecimensCollectionRequestDTO> =
  {
    collections: [
      {
        specimenId: '2e93f4e1-fa02-494e-9443-04137f470319',
        storageLocationId: specimenStorageLocationForSpecimenUpdateFixture.uuid,
      },
    ],
    appointmentId: appointmentForSpecimenCollectionStatusToBeUpdatedFixture.uuid,
  }

export const submitSpecimensCollectionsInvalidStorageRequestBody: Partial<SubmitSpecimensCollectionRequestDTO> =
  {
    collections: [
      {
        specimenId: specimenToBeUpdatedForSubmitSpecimenCollectionFixture.uuid,
        storageLocationId: '2e93f4e1-fa02-494e-9443-04137f470308',
      },
    ],
    appointmentId: appointmentForSpecimenCollectionStatusToBeUpdatedFixture.uuid,
  }

export const submitSpecimensCollectionsInvalidAppointmentRequestBody: Partial<SubmitSpecimensCollectionRequestDTO> =
  {
    collections: [
      {
        specimenId: specimenToBeUpdatedForSubmitSpecimenCollectionFixture.uuid,
        storageLocationId: specimenStorageLocationForSpecimenUpdateFixture.uuid,
      },
    ],
    appointmentId: appointmentForSpecimenCollectionStatusNotToBeUpdatedFixture.uuid,
  }

export const applyRetestActionOnSpecimenRequestBody: Partial<ApplyActionOnSpecimenWithReasonDTO> = {
  specimens: [
    {
      id: specimenWithoutMachineFixture.uuid,
    },
  ],
  reasonId: specimenRetestIncompletionReasonFixture.uuid,
}

export const applyRecollectActionOnSpecimenRequestBody: Partial<ApplyActionOnSpecimenWithReasonDTO> =
  {
    specimens: [
      {
        id: specimenWithoutMachineFixture.uuid,
      },
    ],
    reasonId: specimenRecollectIncompletionReasonFixture.uuid,
  }

export const applyToNotExistedSpecimensRequestBody: Partial<ApplyActionOnSpecimenWithReasonDTO> = {
  specimens: [
    {
      id: 'not-existed-specimen',
    },
  ],
  reasonId: specimenRecollectIncompletionReasonFixture.uuid,
}

export const applyMoveToInHouseTestsRequestBody: Partial<ApplyActionOnSpecimenDTO> = {
  specimens: [
    {
      id: specimenPendingFixture.uuid,
    },
  ],
}

export const applyMoveToAllTestsRequestBody: Partial<ApplyActionOnSpecimenDTO> = {
  ...applyMoveToInHouseTestsRequestBody,
}

export const rejectSemenSpecimensCollectionsDTO: RejectSemenSpecimensCollectionsDTO = {
  appointmentId: appointmentRejectedSemenCollectionFixture.uuid,
  reasonId: specimenRejectedIncompletionReasonFixture.uuid,
  otherReason: 'other reason',
  specimenId: specimenSemenCollectionRejectedFixture.uuid,
}

export const submitSemenSpecimensCollectionsDTO: SubmitSemenSpecimensCollectionsDTO = {
  appointmentId: appointmentSemenCollectionFixture.uuid,
  collection: {
    specimenId: specimenSemenCollectionSuccessFixture.uuid,
    storageLocationId: specimenStorageLocationFixture.uuid,
    form: {
      partner: {
        firstName: 'Partner First Name',
        lastName: 'Partner Last Name',
      },
      patient: {
        daysSinceLastEjaculation: '1 day',
        hadLast60DaysFever: false,
        takingMedications: false,
        smokes: {
          value: true,
          note: 'rarely smoke',
        },
        dateCollected: dateTimeUtil.formatInISO(dateTimeUtil.now()),
        collectionPurpose: SemenSpecimenCollectionPurpose.FreshIUICycle,
        method: SemenSpecimenCollectionMethod.Masturbation,
        container: SemenSpecimenCollectionContainer.SterileCollectionCondom,
        sampleCollected: true,
        otherComments: 'comment',
      },
    },
    imageURL: 'imageUrl',
  },
}

export const submitSemenSpecimensCollectionsWithoutOptionalFieldsDTO: SubmitSemenSpecimensCollectionsDTO =
  {
    appointmentId: appointmentSemenCollectionOptionalFieldsFixture.uuid,
    collection: {
      specimenId: specimenSemenCollectionOptionalFieldsSuccessFixture.uuid,
      storageLocationId: specimenStorageLocationFixture.uuid,
      form: {
        patient: {
          otherComments: 'comment',
        },
      },
      imageURL: 'imageUrl',
    },
  }
