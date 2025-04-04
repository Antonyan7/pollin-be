import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {CryoVial} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {CryoVialStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/cryo-vial-status.enum'
import {SpermSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/sperm-sample.enum'
import {cryoCanFixture, cryoCanSecondFixture, cryoCanThirdFixture} from './cryo-can.fixture'
import {cryoCaneFixture, cryoCaneSecondFixture, cryoCaneThirdFixture} from './cryo-cane.fixture'
import {cryoTankFixture, cryoTankSecondFixture, cryoTankThirdFixture} from './cryo-tank.fixture'
import {
  specimenForGetDetailsFixture,
  specimenForSpermCryoFixture,
  specimenForSpermCryoThawedFixture,
  specimenForSpermCryoWithCryoVialsFixture,
} from '../specimen.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get('DEFAULT_TIME_ZONE'),
)

export const cryoVialFixture: Partial<CryoVial> = {
  id: 1,
  identifier: 'S23-00002668A',
  specimenId: specimenForSpermCryoFixture.id,
  freezeDate: dateTimeUtil.now(),
  spermSampleType: SpermSampleType.Ejaculate,
  cryoTankId: cryoTankFixture.id,
  cryoCanId: cryoCanFixture.id,
  cryoCaneId: cryoCaneFixture.id,
  freezeWitness: 'Witness',
  freezeComment: 'Comment',
  status: CryoVialStatus.Frozen,
  thawDate: null,
  thawComment: null,
}

export const cryoVialForSpermCryoFixture: Partial<CryoVial> = {
  id: 2,
  identifier: 'S24-00002669A',
  specimenId: specimenForSpermCryoWithCryoVialsFixture.id,
  freezeDate: dateTimeUtil.now(),
  spermSampleType: SpermSampleType.Ejaculate,
  cryoTankId: cryoTankSecondFixture.id,
  cryoCanId: cryoCanSecondFixture.id,
  cryoCaneId: cryoCaneFixture.id,
  freezeWitness: 'Witness',
  freezeComment: 'Comment',
  status: CryoVialStatus.Frozen,
  thawDate: null,
  thawComment: null,
}

export const cryoVialForSpermCryoDetailsFixture: Partial<CryoVial> = {
  id: 3,
  uuid: 'c57cfd65-1a9b-482e-afa8-ebfae214554e',
  identifier: 'S24-00002670A',
  specimenId: specimenForGetDetailsFixture.id,
  freezeDate: dateTimeUtil.now(),
  spermSampleType: SpermSampleType.Ejaculate,
  cryoTankId: cryoTankThirdFixture.id,
  cryoCanId: cryoCanThirdFixture.id,
  cryoCaneId: cryoCaneSecondFixture.id,
  freezeWitness: 'Witness',
  freezeComment: 'Comment',
  status: CryoVialStatus.Frozen,
  thawDate: null,
  thawComment: null,
}

export const cryoVialThawedFixture: Partial<CryoVial> = {
  id: 4,
  identifier: 'S24-00002671A',
  specimenId: specimenForSpermCryoThawedFixture.id,
  freezeDate: dateTimeUtil.now(),
  spermSampleType: SpermSampleType.Ejaculate,
  cryoTankId: cryoTankThirdFixture.id,
  cryoCanId: cryoCanThirdFixture.id,
  cryoCaneId: cryoCaneThirdFixture.id,
  freezeWitness: 'Witness',
  freezeComment: 'Comment',
  status: CryoVialStatus.Thawed,
  thawDate: null,
  thawComment: null,
}
