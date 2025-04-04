import 'reflect-metadata'
import {
  generateFolderFullTitle,
  generateFolderTitle,
  getTransportFolderOrderType,
} from '@apps/lis/transport/helper/transport.helper'
import {TransportFolder} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {SpecimenTransportFoldersSortField} from '@libs/services-common/enums'

describe('Transport Helper Functions', () => {
  it('should return folder title', () => {
    const mockedFolder = {name: 'Folder', identifier: 'TRA311-Feb15'} as TransportFolder
    const folderTitle = generateFolderTitle(mockedFolder)

    expect(folderTitle).toBe('Folder (TRA311-Feb15)')
  })

  it('should generate full folder title', () => {
    const mockedFolder = {
      name: 'Folder',
      identifier: 'TRA311-Feb15',
      labInfo: {name: 'Dynacare'},
    } as TransportFolder
    const fullTitle = generateFolderFullTitle(mockedFolder)

    expect(fullTitle).toBe('Folder (TRA311-Feb15) - Dynacare')
  })

  it('should return relevant query object based on order soft field', () => {
    const sortByLabDestination = getTransportFolderOrderType(
      SpecimenTransportFoldersSortField.LabDestination,
      SortOrder.Asc,
    )
    expect(sortByLabDestination).toStrictEqual({labInfo: {name: 'asc'}})

    const sortByStatus = getTransportFolderOrderType(
      SpecimenTransportFoldersSortField.Status,
      SortOrder.Asc,
    )
    expect(sortByStatus).toStrictEqual({status: 'asc'})

    const sortByDate = getTransportFolderOrderType(
      SpecimenTransportFoldersSortField.Date,
      SortOrder.Asc,
    )
    expect(sortByDate).toStrictEqual({createdAt: 'asc'})
  })
})
