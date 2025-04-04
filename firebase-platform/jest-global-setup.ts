import * as dotenv from 'dotenv'
dotenv.config({debug: false, override: true})
/**
 * Function runs before any test suite
 */
const setup = async (): Promise<void> => {
  console.log('\n--- Running Jest Global Setup Script ---')
}

module.exports = setup
