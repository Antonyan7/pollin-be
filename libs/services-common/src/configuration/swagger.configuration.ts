import {DocumentBuilder} from '@nestjs/swagger'

export const SwaggerConfiguration = new DocumentBuilder()
  .setTitle('Nestproject Services')
  .setVersion('1.0')
  .addBearerAuth()
  .build()
