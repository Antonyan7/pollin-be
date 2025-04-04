import {TypeOrmModule} from '@nestjs/typeorm'
import {DynamicModule} from '@nestjs/common'
import {isRunningOnGCP} from '@libs/common/utils'
import {CommonModule, NestprojectConfigService} from '@libs/common'
import {TransportFolderSubscriber} from '@libs/data-layer/apps/clinic-test/subscribers/transport-folder.subscriber'
import {AppointmentSubscriber} from '@libs/data-layer/apps/scheduling/entities/typeorm/subscribers/appointment.subscriber'

export const DefaultDatabaseConfiguration = (): DynamicModule => {
  return TypeOrmModule.forRootAsync({
    imports: [CommonModule],
    inject: [NestprojectConfigService],
    useFactory: (configService: NestprojectConfigService) => {
      let connection = {}
      if (isRunningOnGCP()) {
        // Connect via socket when deployed to GCP
        connection = {
          host: configService.get<string>('DB_SQL_HOST'),
          extra: {
            socketPath: configService.get<string>('DB_SQL_HOST'),
          },
        }
      } else {
        // Connect via TCP when on local with local DB or Cloud SQL with proxy
        connection = {
          host: configService.get<string>('DB_SQL_LOCAL_HOST'),
          port: configService.get<number>('DB_SQL_LOCAL_PORT'),
        }
      }

      return {
        ...connection,
        type: 'mysql',
        database: configService.get<string>('DB_SQL_NAME'),
        username: configService.get<string>('DB_SQL_USERNAME'),
        password: configService.get<string>('DB_SQL_PASSWORD'),
        synchronize: false,
        migrationsRun: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        subscribers: [TransportFolderSubscriber, AppointmentSubscriber],
        logging: ['warn', 'error'],
        autoLoadEntities: true,
        retryAttempts: 10,
        retryDelay: 15000,
        verboseRetryLog: true,
        connectorPackage: 'mysql2',
        poolSize: 1,
      }
    },
  })
}
