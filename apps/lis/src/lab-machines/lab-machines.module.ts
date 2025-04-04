import {Module} from '@nestjs/common'
import {CommonModule} from '@libs/common'
import {DataLayerModule} from '@libs/data-layer'
import {LabMachineRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {LabMachineController} from '@apps/lis/lab-machines/lab-machines.controller'
import {LabMachineService} from '@apps/lis/lab-machines/services/lab-machines.service'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {AuditTrailModule} from '@libs/audit-trail'

@Module({
  imports: [CommonModule, DataLayerModule, AuditTrailModule],
  controllers: [LabMachineController],
  providers: [
    LabMachineService,
    LabMachineRepository,
    StaffRepository, //should be for clinicPortal modules
    I18nLocalizationService,
  ],
})
export class LabMachineModule {}
