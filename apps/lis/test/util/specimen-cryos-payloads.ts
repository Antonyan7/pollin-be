import {
  GetTestSpecimenCryosListRequestDTO,
  VerifyVialLocationsRequestDTO,
} from '@apps/lis/sperm-cryo/dto/sperm-cryo.dto'
import {
  cryoCaneFixture,
  cryoCaneThirdFixture,
  cryoCanSecondFixture,
  cryoCanThirdFixture,
  cryoTankSecondFixture,
  cryoTankThirdFixture,
  cryoVialForSpermCryoDetailsFixture,
  cryoVialForSpermCryoFixture,
  patientForGetSpecimenDetailsFixture,
  patientForGetSpermCryoListFixture,
} from '@libs/common/test/fixtures'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {
  SpermCryoListFilterTypesEnum,
  SpermCryoListSortFieldsEnum,
} from '@libs/services-common/enums'

export const getTestSpecimenCryosListRequestDTO: GetTestSpecimenCryosListRequestDTO = {
  page: 1,
  pageSize: 5,
  sortByField: SpermCryoListSortFieldsEnum.DateOrdered,
  sortOrder: SortOrder.Desc,
  filters: [],
}

export const getTestSpecimenCryosListWithNotExistedPatientRequestDTO: GetTestSpecimenCryosListRequestDTO =
  {
    ...getTestSpecimenCryosListRequestDTO,
    searchString: 'INVALID',
  }

export const getTestSpecimenCryosListFindPatientRequestDTO: GetTestSpecimenCryosListRequestDTO = {
  ...getTestSpecimenCryosListRequestDTO,
  searchString: patientForGetSpermCryoListFixture.firstName,
}

export const getTestSpecimenCryosListFilterByTankRequestDTO: GetTestSpecimenCryosListRequestDTO = {
  ...getTestSpecimenCryosListRequestDTO,
  filters: [
    {
      id: cryoTankSecondFixture.uuid,
      type: SpermCryoListFilterTypesEnum.Tank,
    },
  ],
}

export const verifyVialLocationsAlreadyFrozenRequestDTO: VerifyVialLocationsRequestDTO = {
  patientId: patientForGetSpecimenDetailsFixture.uuid,
  storages: [
    {
      vialId: cryoVialForSpermCryoFixture.identifier,
      location: {
        tankId: cryoTankSecondFixture.uuid,
        canId: cryoCanSecondFixture.uuid,
        caneId: cryoCaneFixture.uuid,
      },
    },
    {
      vialId: 'NEWLY_CREATED',
      location: {
        tankId: cryoTankSecondFixture.uuid,
        canId: cryoCanSecondFixture.uuid,
        caneId: cryoCaneFixture.uuid,
      },
    },
  ],
}

export const verifyVialLocationsThawedRequestDTO: VerifyVialLocationsRequestDTO = {
  patientId: patientForGetSpecimenDetailsFixture.uuid,
  storages: [
    {
      vialId: cryoVialForSpermCryoDetailsFixture.identifier,
      location: {
        tankId: cryoTankThirdFixture.uuid,
        canId: cryoCanThirdFixture.uuid,
        caneId: cryoCaneThirdFixture.uuid,
      },
    },
  ],
}
