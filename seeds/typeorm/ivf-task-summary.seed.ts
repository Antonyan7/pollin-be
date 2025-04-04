import {DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {PatientPlanCohortIvfTaskSummary} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfTaskSummary2Fixture,
  ivfTaskSummary3Fixture,
  ivfTaskSummary4Fixture,
  ivfTaskSummaryFixture,
  ivfTaskSummaryForInseminationIVFFixture,
  ivfTaskSummaryForOptionalMatureOocytePhotoFixture,
  ivfTaskSummaryForPICSIFixture,
  ivfTaskSummaryForIcsiInjectionFixture,
  ivfTaskSummaryForVerifyHepBcHivFixture,
  ivfTaskSummaryForMiiDay1CryoFixture,
  ivfTaskSummaryForHeaders1ForDay0Fixture,
  ivfTaskSummaryForHeaders2ForDay0Fixture,
  ivfTaskSummaryForHeaders2ForDay1Fixture,
  ivfTaskSummaryForHeaders3ForDay1Fixture,
  ivfTaskSummaryForOocytesCollectionFixture,
  ivfTaskSummaryForPostStrippingFixture,
  ivfTaskSummaryForCheckMaxCountFixture,
  ivfTaskSummaryForSpermWashFixture,
  ivfTaskSummaryForMatureOocytesPhotoFixture,
  ivfTaskSummaryForDay5Fixture,
  ivfTaskSummaryForDay3Fixture,
  ivfTaskSummaryForDay3FreshTransferFixture,
  ivfTaskSummaryForDay6Fixture,
  ivfTaskSummaryForFertilisationCheckFixture,
  ivfTaskSummaryForEmbryoPhotoFixture,
  ivfTaskSummaryForFreezingOocytesFixture,
  ivfTaskSummaryForPostStrippingIVFReportFixture,
  ivfTaskSummaryForMatureOocytesPhoto2Fixture,
  ivfTaskSummaryForIVFTaskHistoryFixture,
  ivfTaskSummaryTaskHistoryWithoutChangesFixture,
  ivfTaskSummaryTaskHistoryOocyteCollectionFixture,
  ivfTaskSummaryTaskHistorySpermWashFixture,
  ivfTaskSummaryTaskHistoryPostStrippingFixture,
  ivfTaskSummaryTaskHistoryOocyteGroupPhotoFixture,
  ivfTaskSummaryTaskHistoryIcsiInjectionFixture,
  ivfTaskSummaryTaskHistoryOocytesInseminationnFixture,
  ivfTaskSummaryTaskHistoryPicsiFixture,
  ivfTaskSummaryTaskHistoryMiiDay1Fixture,
  ivfTaskSummaryTaskHistoryEmbryoGroupPhotoFixture,
  ivfTaskSummaryInjectionAssessmentFixture,
  ivfTaskSummaryHistoryDay3CheckFixture,
  ivfTaskSummaryForPrintLabelFixture,
  ivfTaskSummaryForPrintLabelForSpawnedFixture,
  ivfTaskSummaryForPrintLabelForCancelledFixture,
  ivfTaskSummaryHistoryDay7CheckFixture,
  ivfTaskSummaryForFreezeEmbryoFixture,
  ivfTaskSummaryForCompletionStatusFixture,
  ivfTaskSummaryForMiiDay1CryoSpawnedFixture,
  ivfTaskSummaryHistoryFertilizationCheckFixture,
  ivfTaskSummaryForCallPatientFixture,
  ivfTaskSummaryTaskDisabledAtCheckHistoryIcsiInjectionFixture,
  ivfTaskSummaryForDisabledAtCheckFertilizationICSIFixture,
  ivfTaskSummaryForDisabledAtCheckIVFTaskHistoryFixture,
  ivfTaskSummaryTaskDisabledAtCheckHistoryWithoutChangesFixture,
  ivfTaskSummaryTaskDisabledAtCheckHistoryOocyteCollectionFixture,
  ivfTaskSummarySetupWorksheetFixture,
  ivfTaskSummaryVerifyHepBcHivFixture,
  ivfTaskSummaryForChackFreezingEmbryosFixture,
  ivfTaskSummaryForJourneyWitnessFixture,
  ivfTaskSummaryForDisabledTaskGroupDay1Fixture,
  ivfTaskSummaryForDisabledTaskGroupDay2Fixture,
  ivfTaskSummaryForResetSignOffFixture,
  ivfTaskSummaryForFutureCohortForDay0Fixture,
  ivfTaskSummaryForDishInventoryFixture,
  ivfTaskSummaryForPartnerDishInventoryFixture,
  ivfTaskSummaryForDishInventorySubmitFixture,
  ivfTaskSummaryForOocyteCollection2Fixture,
  ivfTaskSummaryForOocyteCollection3Fixture,
  ivfTaskSummaryForSignOffInseminationIVFFixture,
  ivfTaskSummaryForSignOffChangeOverFixture,
  ivfTaskSummaryForOocyteCollectionWithZeroFixture,
  ivfTaskSummaryForDay3CheckDashboardUpdatesFixture,
  ivfTaskSummaryForSpermWashWithoutUnitsFixture,
  ivfTaskSummaryForSpermWashWithoutUnitsAndWithZeroOocyteCollectedFixture,
  ivfTaskSummaryForEggThawFixture,
  ivfTaskSummaryForDiscardDishFixture,
  ivfTaskSummaryForMiiDay1CryoForDeleteStrawFutureFixture,
  ivfTaskSummaryForDay5CheckExpandedEmbryoDeletionFutureFixture,
  ivfTaskSummaryForPIDLabelFixture,
  ivfTaskSummaryForMiiDay1CryoMatureOocyteValidationFixture,
  ivfTaskSummaryForMiiDay1CryoMaxDiscardedValidaationFixture,
  ivfTaskSummaryForEggThawStrawSelectionVisibilityFixture,
  ivfTaskSummaryForEggThawStrawSelectionVisibility2Fixture,
  ivfTaskSummaryForMiiDay1CryoStrawNumberFixture,
  ivfTaskSummaryForStrawSelectionOocyteCollectedFixture,
} from '@libs/common/test/fixtures/ivf-task-summary.fixture'

class IvfTaskSummarySeed implements FixtureCreator {
  repository: Repository<PatientPlanCohortIvfTaskSummary>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PatientPlanCohortIvfTaskSummary)
  }

  private fixturesToCreateAndDelete = [
    ivfTaskSummaryForIcsiInjectionFixture,
    ivfTaskSummaryForHeaders1ForDay0Fixture,
    ivfTaskSummaryForHeaders2ForDay0Fixture,
    ivfTaskSummaryForHeaders2ForDay1Fixture,
    ivfTaskSummaryForHeaders3ForDay1Fixture,
    ivfTaskSummaryForOptionalMatureOocytePhotoFixture,
    ivfTaskSummaryFixture,
    ivfTaskSummary2Fixture,
    ivfTaskSummary3Fixture,
    ivfTaskSummary4Fixture,
    ivfTaskSummaryForPICSIFixture,
    ivfTaskSummaryForMiiDay1CryoFixture,
    ivfTaskSummaryForMiiDay1CryoSpawnedFixture,
    ivfTaskSummaryForInseminationIVFFixture,
    ivfTaskSummaryForVerifyHepBcHivFixture,
    ivfTaskSummaryForOocytesCollectionFixture,
    ivfTaskSummaryForPostStrippingFixture,
    ivfTaskSummaryForCheckMaxCountFixture,
    ivfTaskSummaryForSpermWashFixture,
    ivfTaskSummaryForDay5Fixture,
    ivfTaskSummaryForDay3Fixture,
    ivfTaskSummaryForDay3FreshTransferFixture,
    ivfTaskSummaryForDay6Fixture,
    ivfTaskSummaryForFertilisationCheckFixture,
    ivfTaskSummaryForMatureOocytesPhotoFixture,
    ivfTaskSummaryForMatureOocytesPhoto2Fixture,
    ivfTaskSummaryForEmbryoPhotoFixture,
    ivfTaskSummaryForFreezingOocytesFixture,
    ivfTaskSummaryForPostStrippingIVFReportFixture,
    ivfTaskSummaryForIVFTaskHistoryFixture,
    ivfTaskSummaryTaskHistoryWithoutChangesFixture,
    ivfTaskSummaryTaskHistoryOocyteCollectionFixture,
    ivfTaskSummaryTaskHistorySpermWashFixture,
    ivfTaskSummaryTaskHistoryPostStrippingFixture,
    ivfTaskSummaryTaskHistoryOocyteGroupPhotoFixture,
    ivfTaskSummaryTaskHistoryIcsiInjectionFixture,
    ivfTaskSummaryTaskHistoryOocytesInseminationnFixture,
    ivfTaskSummaryTaskHistoryPicsiFixture,
    ivfTaskSummaryTaskHistoryMiiDay1Fixture,
    ivfTaskSummaryTaskHistoryEmbryoGroupPhotoFixture,
    ivfTaskSummaryInjectionAssessmentFixture,
    ivfTaskSummaryHistoryDay3CheckFixture,
    ivfTaskSummaryForPrintLabelFixture,
    ivfTaskSummaryForPrintLabelForSpawnedFixture,
    ivfTaskSummaryForPrintLabelForCancelledFixture,
    ivfTaskSummaryHistoryDay7CheckFixture,
    ivfTaskSummaryForFreezeEmbryoFixture,
    ivfTaskSummaryForCompletionStatusFixture,
    ivfTaskSummaryHistoryFertilizationCheckFixture,
    ivfTaskSummaryForCallPatientFixture,
    ivfTaskSummaryTaskDisabledAtCheckHistoryIcsiInjectionFixture,
    ivfTaskSummaryForDisabledAtCheckFertilizationICSIFixture,
    ivfTaskSummaryForDisabledAtCheckIVFTaskHistoryFixture,
    ivfTaskSummaryTaskDisabledAtCheckHistoryWithoutChangesFixture,
    ivfTaskSummaryTaskDisabledAtCheckHistoryOocyteCollectionFixture,
    ivfTaskSummarySetupWorksheetFixture,
    ivfTaskSummaryVerifyHepBcHivFixture,
    ivfTaskSummaryForChackFreezingEmbryosFixture,
    ivfTaskSummaryForJourneyWitnessFixture,
    ivfTaskSummaryForDisabledTaskGroupDay1Fixture,
    ivfTaskSummaryForDisabledTaskGroupDay2Fixture,
    ivfTaskSummaryForResetSignOffFixture,
    ivfTaskSummaryForFutureCohortForDay0Fixture,
    ivfTaskSummaryForDishInventoryFixture,
    ivfTaskSummaryForPartnerDishInventoryFixture,
    ivfTaskSummaryForDishInventorySubmitFixture,
    ivfTaskSummaryForOocyteCollection2Fixture,
    ivfTaskSummaryForOocyteCollection3Fixture,
    ivfTaskSummaryForSignOffInseminationIVFFixture,
    ivfTaskSummaryForSignOffChangeOverFixture,
    ivfTaskSummaryForOocyteCollectionWithZeroFixture,
    ivfTaskSummaryForSpermWashWithoutUnitsFixture,
    ivfTaskSummaryForSpermWashWithoutUnitsAndWithZeroOocyteCollectedFixture,
    ivfTaskSummaryForDay3CheckDashboardUpdatesFixture,
    ivfTaskSummaryForEggThawFixture,
    ivfTaskSummaryForDiscardDishFixture,
    ivfTaskSummaryForMiiDay1CryoForDeleteStrawFutureFixture,
    ivfTaskSummaryForDay5CheckExpandedEmbryoDeletionFutureFixture,
    ivfTaskSummaryForMiiDay1CryoMatureOocyteValidationFixture,
    ivfTaskSummaryForPIDLabelFixture,
    ivfTaskSummaryForMiiDay1CryoMaxDiscardedValidaationFixture,
    ivfTaskSummaryForEggThawStrawSelectionVisibilityFixture,
    ivfTaskSummaryForEggThawStrawSelectionVisibility2Fixture,
    ivfTaskSummaryForMiiDay1CryoStrawNumberFixture,
    ivfTaskSummaryForStrawSelectionOocyteCollectedFixture,
  ]

  private setDefaultValues(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskSummary>,
  ): Partial<PatientPlanCohortIvfTaskSummary> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid || v4(),
      IVFTaskToDayId: dataOverwrite.IVFTaskToDayId,
      patientPlanCohortId: dataOverwrite.patientPlanCohortId,
      patientPlanCohortIvfTaskGroupId: dataOverwrite.patientPlanCohortIvfTaskGroupId,
      patientNoteId: dataOverwrite.patientNoteId,
      signedOffDate: dataOverwrite.signedOffDate,
      signedOffById: dataOverwrite.signedOffById,
      disabledAt: dataOverwrite.disabledAt,
    }
  }

  async create(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskSummary>,
  ): Promise<PatientPlanCohortIvfTaskSummary> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(dataOverwrites: Partial<PatientPlanCohortIvfTaskSummary>[]): Promise<void> {
    const arrayData = dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite))

    await this.repository.save(arrayData)
  }

  async createFixtures(): Promise<void> {
    await this.createArray(this.fixturesToCreateAndDelete)
  }

  async destroyFixtures(): Promise<void> {
    await this.removeByIds(this.fixturesToCreateAndDelete.map((fixture) => fixture.id))
  }

  async removeById(id: number): Promise<void> {
    await this.repository.delete({id})
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.repository.delete(ids)
  }

  findOneByUUID(uuid: string): Promise<PatientPlanCohortIvfTaskSummary> {
    return this.repository.findOneBy({uuid})
  }
  findOneById(id: number): Promise<PatientPlanCohortIvfTaskSummary> {
    return this.repository.findOneBy({id})
  }
}

export {IvfTaskSummarySeed}
