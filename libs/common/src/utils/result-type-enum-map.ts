import {SpecimenProcessingLocation} from '@libs/data-layer/apps/clinic-test/enums/specimen.enum'
import {NestprojectConfigService} from '../services/config/config-service'

const config = NestprojectConfigService.getInstance()

export const ResultTypeFileFolderPathMap = new Map<SpecimenProcessingLocation, string>([
  [SpecimenProcessingLocation.InHouse, config.get<string>('INHOUSE_RESULT_FOLDER_PATH')],
  [SpecimenProcessingLocation.TransportOutside, config.get<string>('EXTERNAL_RESULT_FOLDER_PATH')],
])
