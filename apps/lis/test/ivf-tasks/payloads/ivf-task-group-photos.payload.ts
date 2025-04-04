import {TaskIVF} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {ivfTaskSummaryForEmbryoPhotoFixture} from '@libs/common/test/fixtures'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {mockedSignedUrlPrefix} from '@libs/common/adapters/firebase/__mocks__/firebase-storage-adapter'

export const EmbryoGroupPhotoDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForEmbryoPhotoFixture.uuid,
  uiid: IVFTaskType.EmbryoGroupPhoto,
  lastUpdateDetails: expect.any(String),
  details: {
    embryoGroupPhotos: expect.arrayContaining([
      {
        id: expect.any(String),
        title: 'photo1.jpg',
        url: mockedSignedUrlPrefix + 'url/photo1.jpg',
      },
      {
        id: expect.any(String),
        title: 'photo2.jpg',
        url: mockedSignedUrlPrefix + 'url/photo2.jpg',
      },
    ]),
  },
})
