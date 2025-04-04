import {Service, ServicePrefix} from '@libs/services-common/enums/server'
import {NestprojectConfigService} from '@libs/common'
import {getDefaultPort} from '@libs/services-common/configuration'
export type swaggerLink = {
  serviceName: string
  link: string
}
const configService = NestprojectConfigService.getInstance()
export function generateSwaggerLinks(): Array<swaggerLink> {
  const links = []
  for (const item in Service) {
    if (Service[item] != Service.Swagger) {
      links.push({
        serviceName: item,
        link:
          configService.get<string>('SESSION_DOMAIN') === 'localhost'
            ? `${configService.get<string>('HOST_URL')}:${getDefaultPort(
                Service[item],
              )}/${ServicePrefix.get(Service[item])}/api/doc/`
            : `${configService.get<string>('HOST_URL')}/${ServicePrefix.get(
                Service[item],
              )}/api/doc/`,
      })
    }
  }
  return links
}
