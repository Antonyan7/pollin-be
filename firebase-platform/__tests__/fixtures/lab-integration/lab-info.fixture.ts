import {LabInfo} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {LabIntegrationCode} from '@libs/data-layer/apps/clinic-test/enums'

export const labInfoDynacareFixture: Partial<LabInfo> = {
  id: 1,
  uuid: '0aedfe5e-bf66-4daf-9a70-c9e6ddfa77a4',
  name: 'Dynacare',
  location: 'Address',
  phone: '+111545454548',
  integrationCode: LabIntegrationCode.Dynacare,
}

export const labInfoLifeLabsFixture: Partial<LabInfo> = {
  id: 2,
  uuid: '7ee6c53c-2e87-49a4-a413-b5a0b24165fd',
  name: 'LifeLab',
  location: 'Address',
  phone: '+111545454548',
  integrationCode: LabIntegrationCode.LifelabsOntario,
}
