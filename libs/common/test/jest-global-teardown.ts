/* eslint-disable no-console */
import 'tsconfig-paths/register'
import {removeSeedData} from './remove-seeds-data'

/**
 * Script will be executed after all test suite
 */
const teardown = async (): Promise<void> => {
  try {
    await removeSeedData()
  } catch (error) {
    console.error('\n **** Jest Teardown: Error removing seed data **** \n', error)
  }
}

module.exports = teardown
