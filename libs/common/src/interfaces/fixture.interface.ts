export interface FixtureCreator {
  /**
   * Create data with static objects
   */
  createFixtures(): Promise<void>

  /**
   * Remove data by static object identifiers
   */
  destroyFixtures(): Promise<void>
}
