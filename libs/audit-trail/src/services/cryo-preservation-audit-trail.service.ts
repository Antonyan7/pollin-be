import {Injectable} from '@nestjs/common'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {AuditTrailPubSubService} from './audit-trail-pubsub.service'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  CryoInventoryCard,
  CryoSampleContainer,
  CryoSampleDonor,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {
  CryoInventoryCardRepository,
  CryoSampleContainerRepository,
  CryoSampleDonorRepository,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {In, Equal} from 'typeorm'

@Injectable()
export class CryoPreservationAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private auditPubSub: AuditTrailPubSubService,
    private configService: NestprojectConfigService,
    private staffRepository: StaffRepository,
    private cryoInventoryCardRepository: CryoInventoryCardRepository,
    private cryoSampleContainerRepository: CryoSampleContainerRepository,
    private cryoSampleDonorRepository: CryoSampleDonorRepository,
  ) {}

  async addCryoCardAudit(
    cryoInventoryCardId: number,
    userAction: AuditUserAction,
    staffAuthUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, CryoInventoryCard] = await Promise.all([
      this.staffRepository.findOneByAuthUserId(staffAuthUserId),
      this.cryoInventoryCardRepository.findOneBy({id: cryoInventoryCardId}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.cryoInventoryCardRepository.update(
        {id: cryoInventoryCardId},
        {revisionId, updatedBy: staffAuthUserId},
      ),
      this.auditPubSub.publish({
        authUserId: staffAuthUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.CryoCardRevisions,
      }),
    ])
  }

  async addCryoStrawsAudit(
    cryoSampleContainerIds: number[],
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, CryoSampleContainer[]] = await Promise.all([
      this.staffRepository.findOneByAuthUserId(authUserId),
      this.cryoSampleContainerRepository.find({
        where: {id: In(cryoSampleContainerIds)},
        withDeleted: true,
      }),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    const dataIds = data.map((item) => item.id)

    await Promise.all([
      this.cryoSampleContainerRepository.update(
        {id: In(dataIds)},
        {revisionId, updatedBy: authUserId},
      ),
      this.auditPubSub.publish({
        authUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.CryoSampleContainerRevisions,
      }),
    ])
  }

  async updateCryoContainerAudit(
    cryoSampleContainerId: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, CryoSampleContainer] = await Promise.all([
      this.staffRepository.findOneByAuthUserId(authUserId),
      this.cryoSampleContainerRepository.findOneBy({id: Equal(cryoSampleContainerId)}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.cryoSampleContainerRepository.update({id: data.id}, {revisionId, updatedBy: authUserId}),
      this.auditPubSub.publish({
        authUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.CryoSampleContainerRevisions,
      }),
    ])
  }

  async updateCryoDetailsDeleteStrawsAudit(
    cryoSampleContainerUUIDs: string[],
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, CryoSampleContainer[]] = await Promise.all([
      this.staffRepository.findOneByAuthUserId(authUserId),
      this.cryoSampleContainerRepository.findBy({uuid: In(cryoSampleContainerUUIDs)}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    const dataIds = data.map((item) => item.id)

    await Promise.all([
      this.cryoSampleContainerRepository.update(
        {id: In(dataIds)},
        {revisionId, updatedBy: authUserId},
      ),
      this.auditPubSub.publish({
        authUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.CryoSampleContainerRevisions,
      }),
    ])
  }

  async updateCryoDetailsDeleteStrawAudit(
    cryoSampleContainerIds: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, CryoSampleContainer[]] = await Promise.all([
      this.staffRepository.findOneByAuthUserId(authUserId),
      this.cryoSampleContainerRepository.findBy({id: cryoSampleContainerIds}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    const dataIds = data.map((item) => item.id)

    await Promise.all([
      this.cryoSampleContainerRepository.update(
        {id: In(dataIds)},
        {revisionId, updatedBy: authUserId},
      ),
      this.auditPubSub.publish({
        authUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.CryoSampleContainerRevisions,
      }),
    ])
  }

  async saveCryoSampleDonorAudit(
    cryoSampleDonorId: number,
    userAction: AuditUserAction,
    authUserId: string,
  ): Promise<void> {
    const [staff, data]: [Staff, CryoSampleDonor] = await Promise.all([
      this.staffRepository.findOneByAuthUserId(authUserId),
      this.cryoSampleDonorRepository.findOneBy({id: Equal(cryoSampleDonorId)}),
    ])

    const latestData = JSON.stringify(data)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.cryoSampleDonorRepository.update(
        {id: cryoSampleDonorId},
        {revisionId, updatedBy: authUserId},
      ),
      this.auditPubSub.publish({
        authUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.CryoSampleDonorRevisions,
      }),
    ])
  }
}
