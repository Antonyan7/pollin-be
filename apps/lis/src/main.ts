import {getDefaultPort} from '@libs/services-common/configuration'
import {Service} from '@libs/services-common/enums/server'
import {bootstrap} from '@libs/services-common/helpers/bootstrap'
import {LisAppModule} from './lis.app.module'

bootstrap({
  appModule: LisAppModule,
  port: getDefaultPort(Service.LIS),
  prefix: 'lis',
  isClinicPortalService: true,
})
