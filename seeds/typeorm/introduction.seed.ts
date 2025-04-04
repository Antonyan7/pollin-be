import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {
  introductionFixture,
  introductionForBookingFlowFixture,
  introductionForQuestionnaireFixture,
  introductionForQuestionnaireWithAnswersFixture,
  introductionForQuestionnaireWithoutAnswersFixture,
  introductionForServiceCategoryFixture,
} from '@libs/common/test/fixtures/introduction.fixture'
import {Introduction} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {DataSource, In, Repository} from 'typeorm'

export type IntroductionSeedInput = Partial<Introduction> & Pick<Introduction, 'id'>

export class IntroductionSeed implements FixtureCreator {
  IntroductionRepository: Repository<Introduction>

  constructor(dataSource: DataSource) {
    this.IntroductionRepository = dataSource.getRepository(Introduction)
  }

  private static fixtures: IntroductionSeedInput[] = [
    introductionFixture,
    introductionForQuestionnaireFixture,
    introductionForQuestionnaireWithAnswersFixture,
    introductionForQuestionnaireWithoutAnswersFixture,
    introductionForServiceCategoryFixture,
    introductionForBookingFlowFixture,
  ]

  async createFixtures(): Promise<void> {
    await Promise.all(IntroductionSeed.fixtures.map((fixture) => this.create(fixture)))
  }

  async destroyFixtures(): Promise<void> {
    await this.removeByUUIDs(IntroductionSeed.fixtures.map((fixture) => fixture.uuid))
  }

  async create(dataOverwrite: IntroductionSeedInput): Promise<void> {
    await this.IntroductionRepository.save(dataOverwrite)
  }

  async removeByUUIDs(uuids: string[]): Promise<void> {
    await this.IntroductionRepository.delete({uuid: In(uuids)})
  }
}
