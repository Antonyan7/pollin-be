/* eslint-disable no-console */
import {AppDataSource} from '@dataSource'
import {NestprojectConfigService} from '@libs/common'
import {DataSource, DataSourceOptions} from 'typeorm'
import {getFirestoreInstance} from '@seeds/firestore/firebase-admin-instance'

const configService = NestprojectConfigService.getInstance()

let dataSource = AppDataSource

export const testSqlConnection = async (): Promise<void> => {
  try {
    console.log('JEST testSqlConnection initiated')
    const config = {
      host: configService.get<string>('DB_SQL_LOCAL_HOST'),
      port: configService.get<number>('DB_SQL_LOCAL_PORT'),
      type: 'mysql',
      database: configService.get<string>('DB_SQL_NAME'),
      username: configService.get<string>('DB_SQL_USERNAME'),
      password: configService.get<string>('DB_SQL_PASSWORD'),
      logging: ['warn', 'error'],
    } as DataSourceOptions

    dataSource = await new DataSource(config).initialize()
  } catch (error) {
    console.error('JEST testSqlConnection: Failed to connect to SQL')
    throw error
  }

  await dataSource.destroy()
}

export const testFirestoreConnection = async (): Promise<void> => {
  try {
    console.log('JEST testFirestoreConnection initiated')
    const firestoreInstance = getFirestoreInstance()

    await firestoreInstance.listCollections()
  } catch (error) {
    console.error('JEST testFirestoreConnection: Failed to connect to Firestore')
    throw error
  }
}
