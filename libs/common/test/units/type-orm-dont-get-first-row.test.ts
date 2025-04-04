import {DataSource, Equal, In} from 'typeorm'
import {AppointmentRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {AppointmentStatus} from '@libs/common/enums'

describe('BaseRepository - fix typeOrm issue in all repositories ', () => {
  let dataSource: DataSource
  let appointmentRepository: AppointmentRepository

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    appointmentRepository = new AppointmentRepository(dataSource)
  })

  it(`1. Should not fail if WHERE not contains undefined value 
      2. Should not fail and return empty result when we using 'Equal, In', ... with undefined param inside `, async () => {
    const id = 45
    const patientId = 120

    const actionFindOneByWithOneParam = await appointmentRepository.findBy({id})
    expect(actionFindOneByWithOneParam.length).toBe(1)
    expect(actionFindOneByWithOneParam[0].id).toBe(id)

    const actionFindOneByWithTwoParam = await appointmentRepository.findBy({id, patientId})
    expect(actionFindOneByWithTwoParam.length).toBe(1)
    expect(actionFindOneByWithTwoParam[0].id).toBe(id)
    expect(actionFindOneByWithTwoParam[0].patientId).toBe(patientId)

    //should not fail for where with relations
    const actionFindWithRelations = await appointmentRepository.find({
      where: {status: AppointmentStatus.Done, patient: {id: patientId}},
    })
    expect(actionFindWithRelations.length > 0).toBeTruthy()

    /**
     *  with operators: Equal, In ....
     * should not fail, but return empty res
     */
    const patientIdUndefined = undefined

    const resEqualWithUndefined = await appointmentRepository.find({
      where: {patientId: Equal(patientIdUndefined)},
    })
    expect(resEqualWithUndefined.length).toBe(0)

    const resInWithUndefined = await appointmentRepository.find({
      where: {patientId: In([patientIdUndefined])},
    })
    expect(resInWithUndefined.length).toBe(0)

    const resEqualInRelation = await appointmentRepository.find({
      where: {patient: {id: Equal(patientIdUndefined)}},
    })
    expect(resEqualInRelation.length).toBe(0)
  })

  it('Should fail in all cases if where contains undefined property', async () => {
    const id = undefined
    const patientId = 120

    const actionFindOneByWithOneParam = async (): Promise<void> => {
      await appointmentRepository.findOneBy({id})
    }
    await expect(actionFindOneByWithOneParam()).rejects.toThrow()

    const actionFindOneByWithTwoParam = async (): Promise<void> => {
      await appointmentRepository.findOneBy({id, patientId})
    }
    await expect(actionFindOneByWithTwoParam()).rejects.toThrow()

    const actionFindOneWithOneParam = async (): Promise<void> => {
      await appointmentRepository.findOne({where: {id}})
    }
    await expect(actionFindOneWithOneParam()).rejects.toThrow()

    const actionFindOneWithTwoParam = async (): Promise<void> => {
      await appointmentRepository.findOne({where: {id, patientId}})
    }
    await expect(actionFindOneWithTwoParam()).rejects.toThrow()

    const actionFindByWithOneParam = async (): Promise<void> => {
      await appointmentRepository.findBy({id})
    }
    await expect(actionFindByWithOneParam()).rejects.toThrow()

    const actionFindByWithTwoParam = async (): Promise<void> => {
      await appointmentRepository.findBy({id, patientId})
    }
    await expect(actionFindByWithTwoParam()).rejects.toThrow()

    const actionFindWithOneParam = async (): Promise<void> => {
      await appointmentRepository.find({where: {id}})
    }
    await expect(actionFindWithOneParam()).rejects.toThrow()

    const actionFindWithTwoParam = async (): Promise<void> => {
      await appointmentRepository.find({where: {id, patientId}})
    }
    await expect(actionFindWithTwoParam()).rejects.toThrow()

    const patientDetailId = undefined
    const actionForWhereInAFewLevel = async (): Promise<void> => {
      await appointmentRepository.find({
        where: {id, patientId, patient: {detailId: patientDetailId}},
      })
    }
    await expect(actionForWhereInAFewLevel()).rejects.toThrow()
  })
})
