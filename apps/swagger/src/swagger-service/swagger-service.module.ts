import {Module} from '@nestjs/common'
import {CommonModule} from '@libs/common'
import {SwaggerServiceController} from '@apps/swagger/swagger-service/swagger-service.controller'

@Module({
  imports: [CommonModule],
  controllers: [SwaggerServiceController],
  providers: [],
})
export class SwaggerServiceModule {}
