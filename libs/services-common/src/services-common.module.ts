import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {CacheModule} from '@nestjs/cache-manager'
import {NestprojectConfigService} from '@libs/common'
import {FirebaseManager} from '@libs/services-common/services/firebase/firebase.service'
import {FireORMService} from '@libs/services-common/services/fireorm.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    CacheModule.register(),
  ],
  providers: [NestprojectConfigService, FirebaseManager, FireORMService],
  exports: [FireORMService],
})
export class CommonForServicesModule {}
