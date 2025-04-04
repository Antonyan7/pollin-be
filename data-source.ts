/* eslint-disable no-process-env */
import {DataSource} from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config({debug: false, override: true})

export const AppDataSource = new DataSource({
  port: Number(process.env.DB_SQL_LOCAL_PORT),
  host: process.env.DB_SQL_LOCAL_HOST,
  type: 'mysql',
  database: process.env.DB_SQL_NAME,
  username: process.env.DB_SQL_USERNAME,
  password: process.env.DB_SQL_PASSWORD,
  synchronize: true,
  migrationsRun: false,
  entities: [__dirname + '/libs/**/*.entity.ts'],
  subscribers: [__dirname + '/libs/**/*.entity.ts'],
  logging: ['warn', 'error', 'query'],
  migrations: [__dirname + '/migrations/*.ts'],
  connectorPackage: 'mysql2',
  poolSize: 1,
})
