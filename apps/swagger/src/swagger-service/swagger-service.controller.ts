import {Controller, Get, Render} from '@nestjs/common'
import {
  generateSwaggerLinks,
  swaggerLink,
} from '@apps/swagger/swagger-service/helpers/common.helper'

@Controller('v1/swagger-service')
export class SwaggerServiceController {
  @Get('')
  @Render('index.ejs')
  getSwaggerLinks(): {swaggerLinks: Array<swaggerLink>} {
    const swaggerLinks = generateSwaggerLinks()
    return {
      swaggerLinks,
    }
  }
}
