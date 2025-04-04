import {
  PatientSeed,
  ServiceProviderSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  ServiceCategoryInputSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger, LogType} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Appointment, ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {
  MockAcuityPatientLastNameForAlreadyExistPatient,
  MockAppointmentAcuityResponse,
} from '@libs/common/adapters/__mocks__/acuity.adapter'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {CloudEvent, PubSubEvent, testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentStatus} from '@libs/common/enums'
import {handlerPatientContactInformationUpdated} from '@firebase-platform/functions/acuity/src/patient-contact-information-updated/handler'
import {
  PatientContactInformationUpdatedPayload,
  PatientContactInformationUpdatedSchema,
} from '@libs/common/model/proto-schemas/patient-contact-information-updated.schema'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {AcuityAdapter} from '@libs/common/adapters'
import {
  AcuityAdapter as MockedAcuityAdapter,
  MockAcuityAppointmentIdForUpdateAcuityAppointmentRetry,
} from '@libs/common/adapters/__mocks__/acuity.adapter'
import axios, {AxiosError} from 'axios'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const oneYearAhead = dateTimeUtil.getYear() + 1

jest.setTimeout(15000)

jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.mock('../../../libs/common/src/adapters/acuity.adapter')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const serviceProviderId = 768800105
const serviceCategoryId = 768800109
const serviceTypeId = 768800110
const appointmentId = 768800113
const patientId = 768800115
const patientIdWithoutAnyAcuityAPp = 768800118

const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  externalProviderIDForAcuity: MockAppointmentAcuityResponse.calendarID,
}

const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId,
  externalServiceTypeIDForAcuity: MockAppointmentAcuityResponse.appointmentTypeID,
  durationInMinutes: 30,
}

const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: AuthUserFixture.updatedPatientContactInformationForAcuity.uid,
  patientIdentifier: 'PID127748',
  firstName: MockAppointmentAcuityResponse.firstName,
  lastName: MockAcuityPatientLastNameForAlreadyExistPatient,
  dateOfBirth: dateTimeUtil.toDate('2001-10-11'),
}

const patientWithoutAnyAcuityAPpData: Partial<Patient> = {
  ...patientData,
  id: patientIdWithoutAnyAcuityAPp,
  authUserId: AuthUserFixture.patientWithoutAcuityAppointments.uid,
  patientIdentifier: 'PID176548',
}

const retryPatientId = 768800116
const retryPatientData: Partial<Patient> = {
  id: retryPatientId,
  authUserId: 'dGI42424idGDXCJ5704',
  patientIdentifier: 'PID127749',
  firstName: MockAppointmentAcuityResponse.firstName,
  lastName: MockAcuityPatientLastNameForAlreadyExistPatient,
  dateOfBirth: dateTimeUtil.toDate('2001-10-11'),
}

const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  uuid: '123e4567-e89b-12d3-a456-426614174332',
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.toDate(`${oneYearAhead}-08-23T10:30:00Z`),
  end: dateTimeUtil.toDate(`${oneYearAhead}-08-23T11:00:00Z`),
  identifier: 'A176653163',
  externalAppointmentIDForAcuity: 548760110, //random
}

const retryAppointmentId = 76811324
const appointmentRetryData: Partial<Appointment> = {
  id: retryAppointmentId,
  uuid: '123e4567-e89b-12d3-a456-426614174312',
  status: AppointmentStatus.Booked,
  patientId: retryPatientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.toDate(`2012-08-23T10:30:00Z`),
  end: dateTimeUtil.toDate(`2012-08-23T11:00:00Z`),
  identifier: 'A176653160',
  externalAppointmentIDForAcuity: MockAcuityAppointmentIdForUpdateAcuityAppointmentRetry,
}

const payload: Partial<PatientContactInformationUpdatedPayload> = {
  patientId,
  prevFirstName: 'SomeNotActualFirstName',
}

describe('Firebase Function: update acuity appointment on rescheduled app on our side', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let serviceProviderSeed: ServiceProviderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)

    await Promise.all([serviceCategorySeed.create(serviceCategoryData)])

    await superTypeSeed.create(superTypeOtherFixture)
    await Promise.all([
      serviceTypeSeed.create(serviceTypeData),
      serviceProviderSeed.create(serviceProviderData),
      patientSeed.createArray([patientData, patientWithoutAnyAcuityAPpData, retryPatientData]),
    ])

    await appointmentSeed.createArray([appointmentData, appointmentRetryData])
  })

  it(`Should update Patient contact information on acuity`, async () => {
    const spyUpdateAppointmentOnAcuityService = jest.spyOn(
      AcuityAdapter.prototype,
      'updateAppointmentOnAcuityService',
    )

    const result = await handlerPatientContactInformationUpdated(getMessageWithData(payload))
    expect(result).toBe(true)

    expect(spyUpdateAppointmentOnAcuityService).toBeCalledWith({
      id: appointmentData.externalAppointmentIDForAcuity,
      appointmentUUID: appointmentData.uuid,
      fieldsData: {
        //took from patientData above
        dateOfBirthDay: '11',
        dateOfBirthMonth: 'October',
        dateOfBirthYear: '2001',
      },
      mainData: expect.anything(),
    })
    expect(spyUpdateAppointmentOnAcuityService).toHaveBeenCalledTimes(1)
    spyUpdateAppointmentOnAcuityService.mockRestore()
  })

  it(`Should fail update Patient contact information on acuity - patient data without any changes`, async () => {
    const payloadWithoutAnyChanges: Partial<PatientContactInformationUpdatedPayload> = {
      ...payload,
      prevFirstName: patientData.firstName,
      prevLastName: patientData.lastName,
      prevDateOfBirth: '2001-10-11',
    }
    const result = await handlerPatientContactInformationUpdated(
      getMessageWithData(payloadWithoutAnyChanges),
    )
    expect(result).toBe(false)
  })

  it(`Should skip update Patient contact information on acuity - patient without any acuity app`, async () => {
    const payloadWithoutAnyChanges: Partial<PatientContactInformationUpdatedPayload> = {
      ...payload,
      patientId: patientIdWithoutAnyAcuityAPp,
    }
    const result = await handlerPatientContactInformationUpdated(
      getMessageWithData(payloadWithoutAnyChanges),
    )
    expect(result).toBe(false)
  })

  it(`Should fail update Patient contact information on acuity - patient not found `, async () => {
    const payloadWithoutAnyChanges: Partial<PatientContactInformationUpdatedPayload> = {
      ...payload,
      patientId: 343434, //random not exist
    }
    const result = await handlerPatientContactInformationUpdated(
      getMessageWithData(payloadWithoutAnyChanges),
    )
    expect(result).toBe(activityLogs.HandlerPatientContactInformationUpdatedActions.PatientNotFound)
  })

  it(`Should fail to update Patient contact information on acuity: retry count exceeded`, async () => {
    const spyUpdateAppointmentOnAcuityService = jest.spyOn(
      AcuityAdapter.prototype,
      'updateAppointmentOnAcuityService',
    )
    const spyAxiosPost = jest.spyOn(axios, 'post')
    spyAxiosPost.mockImplementation(() => {
      throw new AxiosError('testing retry')
    })
    const spyOnLogger = jest.spyOn(StructuredLogger, 'error')

    const result = await handlerPatientContactInformationUpdated(
      getMessageWithData({
        patientId: retryPatientId,
        prevFirstName: 'SomeNotActualFirstName2',
      }),
    )
    expect(result).toBe(true)

    expect(spyUpdateAppointmentOnAcuityService).toBeCalledWith({
      id: appointmentRetryData.externalAppointmentIDForAcuity,
      appointmentUUID: appointmentRetryData.uuid,
      fieldsData: {
        dateOfBirthDay: '11',
        dateOfBirthMonth: 'October',
        dateOfBirthYear: '2001',
      },
      mainData: expect.anything(),
    })
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.AcuityAdapterFunctions.UpdateAppointmentOnAcuityService,
      activityLogs.AcuityAdapterActions.SyncFailedFromClinicPortalToAcuity,
      {errorInfo: expect.anything(), message: expect.any(String)},
      LogType.AcuityAppointmentSyncFailed,
    )
    expect(spyOnLogger).toBeCalledTimes(5)
    const mockedAcuityAdapter = new MockedAcuityAdapter()
    expect(spyUpdateAppointmentOnAcuityService).toHaveBeenCalledTimes(
      mockedAcuityAdapter.retryCountToDelaysMs.size + 1,
    )
    spyUpdateAppointmentOnAcuityService.mockRestore()
    spyOnLogger.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await appointmentSeed.removeByIds([appointmentId, retryAppointmentId])

    await Promise.all([
      serviceTypeSeed.removeById(serviceTypeId),
      serviceProviderSeed.removeById(serviceProviderId),
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])

    await Promise.all([
      serviceCategorySeed.removeById(serviceCategoryId),
      patientSeed.removeByIds([patientId, patientIdWithoutAnyAcuityAPp, retryPatientId]),
    ])

    await dataSource.destroy()
  })
})

function getMessageWithData(
  payload: Partial<PatientContactInformationUpdatedPayload>,
): CloudEvent<PubSubEvent> {
  return testPubSubEvent(encodePubSubMessage(payload, PatientContactInformationUpdatedSchema))
}
