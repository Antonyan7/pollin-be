import {Module} from '@nestjs/common'
import {CommonModule} from '@libs/common'
import {SwaggerServiceModule} from '@apps/swagger/swagger-service/swagger-service.module'

@Module({
  imports: [CommonModule, SwaggerServiceModule],
  controllers: [],
  providers: [],
})
export class SwaggerAppModule {}
