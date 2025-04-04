import {Module} from '@nestjs/common'
import {CacheModule} from '@nestjs/cache-manager'
import {ConfigModule} from '@nestjs/config'
import {FirebaseAuthAdapter} from '@libs/common/adapters/firebase/firebase-auth.adapter'
import {StripeAdapter} from '@libs/common/adapters/stripe.adapter'
import {FirebaseManager} from '@libs/common/services/firebase/firebase.service'
import {FireORMService} from '@libs/common/services/fireorm.service'
import {FirebaseSessionService} from '@libs/common/services/firebase/session.service'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'
import {CacheInMemoryAdapter, DrugBankAdapter} from '@libs/common/adapters'
import {OpenTelemetryService} from '@libs/common/services/open-telemetry.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    CacheModule.register(),
  ],
  providers: [
    FirebaseManager,
    FirebaseSessionService,
    FireORMService,
    FirebaseAuthAdapter,
    NestprojectConfigService,
    StripeAdapter,
    CacheInMemoryAdapter,
    DrugBankAdapter,
    OpenTelemetryService,
  ],
  exports: [
    FirebaseSessionService,
    FireORMService,
    NestprojectConfigService,
    FirebaseAuthAdapter,
    StripeAdapter,
    CacheInMemoryAdapter,
    DrugBankAdapter,
    OpenTelemetryService,
  ],
})
export class CommonModule {}
