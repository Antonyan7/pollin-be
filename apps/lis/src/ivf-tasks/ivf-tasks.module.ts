import {CommonModule, NestprojectConfigService} from '@libs/common'
import {DataLayerModule} from '@libs/data-layer'
import {AuditTrailModule} from '@libs/audit-trail'
import {IvfTasksController} from '@apps/lis/ivf-tasks/ivf-tasks.controller'
import {IvfTasksService} from '@apps/lis/ivf-tasks/services/ivf-tasks.service'
import {IvfEmbryoGradeRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {IvfEmbryoService} from '@apps/lis/ivf-tasks/services/ivf-embryo.service'
import {PlanIvfTasksController} from '@apps/lis/ivf-tasks/plan-ivf-tasks.controller'
import {PlanIvfTasksService} from '@apps/lis/ivf-tasks/services/plan-ivf-task-group.service'
import {IvfNoteService} from './services/ivf-note.service'
import {IvfTasksV2Controller} from '@apps/lis/ivf-tasks/ivf-tasks-v2.controller'


@Module({
  imports: [CommonModule, DataLayerModule, AuditTrailModule],
  controllers: [IvfTasksController, IvfTasksV2Controller, PlanIvfTasksController],
  providers: [
    NestprojectConfigService,
    IvfEmbryoService,
    IvfTasksService,
    PlanIvfTasksService,
    IvfNoteService,
    IvfEmbryoGradeRepository,
  ],
})
export class IvfTasksModule {}
