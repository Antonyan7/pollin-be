import {
  PatientSeed,
  ServiceProviderSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  ServiceCategoryInputSeed,
  EmailTemplateSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Appointment, ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {
  MockAcuityPatientLastNameForAlreadyExistPatient,
  MockAppointmentAcuityResponse,
} from '@libs/common/adapters/__mocks__/acuity.adapter'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {handlerAppointmentUpdated} from '@firebase-platform/functions/acuity/src/appointment-updated/handler'
import {CloudEvent, PubSubEvent, testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentStatus} from '@libs/common/enums'
import {getAcuityAppointmentDateOfBirth} from '@libs/common/helpers/date.helper'
import {
  AppointmentUpdatedPubSubPayload,
  AppointmentUpdatedSchema,
} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {AcuityAdapter} from '@libs/common/adapters'
import {handlerUpdateAppointmentServiceProviderNotFoundInAcuity} from '@firebase-platform/functions/email-notification/src/appointment-updated-service-provider-not-found-in-acuity/handler'
import {sendEmailWhenExternalIdNotFoundInAcuityOnUpdatingFixture} from '../fixtures/email-template.fixture'
import {MilestoneStep} from '@libs/services-common/enums'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const oneYearAhead = dateTimeUtil.getYear() + 1

jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.mock('../../../libs/common/src/adapters/acuity.adapter')
jest.mock('../../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../../libs/common/src/adapters/sendinblue.adapter.ts')
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

const serviceProviderId = 548801106
const serviceCategoryId = 548801110
const serviceTypeId = 548801111
const newServiceTypeId = 549901433
const appointmentId = 548801114
const appointmentIdWithoutExternalAcuityAppId = 548801118
const patientId = 548801116
const oldServiceProviderId = 548801444
const newServiceProviderIdWithoutExternalProvider = 548801445
const newServiceCategoryId = 542901117
const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  externalProviderIDForAcuity: MockAppointmentAcuityResponse.calendarID,
}

const prevServiceProviderData: Partial<ServiceProvider> = {
  id: oldServiceProviderId,
  externalProviderIDForAcuity: MockAppointmentAcuityResponse.calendarID,
  title: 'Dr. 1',
}

const newServiceProviderDataWithoutExternalProviderID: Partial<ServiceProvider> = {
  id: newServiceProviderIdWithoutExternalProvider,
  title: 'Dr. 2',
}

const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}
const newServiceCategoryData: ServiceCategoryInputSeed = {
  id: newServiceCategoryId,
  milestoneStep: MilestoneStep.InitialConsultation,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  uuid: '41e4527e-ad4f-44bc-8c54-1e89daeab5b4',
  serviceCategoryId: newServiceCategoryId,
  externalServiceTypeIDForAcuity: MockAppointmentAcuityResponse.appointmentTypeID,
  durationInMinutes: 30,
}
const newServiceTypeData: Partial<ServiceType> = {
  id: newServiceTypeId,
  uuid: 'd9487f4c-135f-4473-8a0b-da17bc3d8d3c',
  serviceCategoryId: newServiceCategoryId,
  externalServiceTypeIDForAcuity: null,
  durationInMinutes: 30,
  abbreviation: 'ABB',
}

const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: AuthUserFixture.rescheduleAcuityAppointment.uid,
  patientIdentifier: 'PID123148',
  firstName: MockAppointmentAcuityResponse.firstName,
  lastName: MockAcuityPatientLastNameForAlreadyExistPatient,
  dateOfBirth: getAcuityAppointmentDateOfBirth(MockAppointmentAcuityResponse),
}

const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.toDate(`${oneYearAhead}-08-23T10:30:00Z`),
  end: dateTimeUtil.toDate(`${oneYearAhead}-08-23T11:00:00Z`),
  identifier: 'A123123158',
  externalAppointmentIDForAcuity: 548660110, //random
}

const appointmentDataWithoutExternalAcuityAppIdData: Partial<Appointment> = {
  ...appointmentData,
  id: appointmentIdWithoutExternalAcuityAppId,
  start: dateTimeUtil.toDate(`${oneYearAhead}-08-24T10:30:00Z`),
  end: dateTimeUtil.toDate(`${oneYearAhead}-08-24T11:00:00Z`),
  identifier: 'A123153178',
  externalAppointmentIDForAcuity: null,
}

const reschedulePayload: Partial<AppointmentUpdatedPubSubPayload> = {
  appointmentId: appointmentId,
  oldAppointment: {date: `${oneYearAhead}-08-23T11:00:00Z`},
  newAppointment: {date: `${oneYearAhead}-08-23T13:00:00Z`},
}

const serviceProviderPayload: Partial<AppointmentUpdatedPubSubPayload> = {
  appointmentId,
  oldAppointment: {
    serviceProviderId: oldServiceProviderId,
    date: `${oneYearAhead}-08-23T11:00:00Z`,
  },
  newAppointment: {serviceProviderId, date: `${oneYearAhead}-08-23T11:00:00Z`},
}

const statusPayload: Partial<AppointmentUpdatedPubSubPayload> = {
  appointmentId: appointmentId,
  oldAppointment: {status: AppointmentStatus.Booked},
  newAppointment: {status: AppointmentStatus.Cancelled},
}

describe('Firebase Function: update acuity appointment on rescheduled app on our side', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let serviceProviderSeed: ServiceProviderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let emailTemplateSeed: EmailTemplateSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)
    await Promise.all([
      serviceCategorySeed.createArray([serviceCategoryData, newServiceCategoryData]),
    ])

    await superTypeSeed.create(superTypeOtherFixture)
    await Promise.all([
      serviceTypeSeed.createArray([serviceTypeData, newServiceTypeData]),
      serviceProviderSeed.create(serviceProviderData),
      serviceProviderSeed.create(prevServiceProviderData),
      serviceProviderSeed.create(newServiceProviderDataWithoutExternalProviderID),
      patientSeed.create(patientData),
    ])
    await emailTemplateSeed.createArray([sendEmailWhenExternalIdNotFoundInAcuityOnUpdatingFixture])

    await appointmentSeed.createArray([
      appointmentData,
      appointmentDataWithoutExternalAcuityAppIdData,
    ])
  })

  it(`Should reschedule appointment on acuity`, async () => {
    const result = await handlerAppointmentUpdated(getMessageWithData(reschedulePayload))
    expect(result).toBe(true)
  })

  it(`Should skip reschedule appointment - appointment doesnt have externalAppointmentIDForAcuity`, async () => {
    const payloadForAppWithoutExternalAcuityId: Partial<AppointmentUpdatedPubSubPayload> = {
      ...reschedulePayload,
      appointmentId: appointmentIdWithoutExternalAcuityAppId,
    }

    const result = await handlerAppointmentUpdated(
      getMessageWithData(payloadForAppWithoutExternalAcuityId),
    )
    expect(result).toBe(false)
  })

  it(`Should fails cancel appointment - appointment new date no changed`, async () => {
    const payloadForAppWithoutExternalAcuityId: Partial<AppointmentUpdatedPubSubPayload> = {
      ...reschedulePayload,
      newAppointment: {
        ...reschedulePayload.newAppointment,
        date: reschedulePayload.oldAppointment.date,
      },
    }

    const response = await handlerAppointmentUpdated(
      getMessageWithData(payloadForAppWithoutExternalAcuityId),
    )
    expect(response).toBe(false)
  })

  it(`Should fail cancel appointment - appointment not found`, async () => {
    const payloadForAppWithoutExternalAcuityId: Partial<AppointmentUpdatedPubSubPayload> = {
      ...reschedulePayload,
      appointmentId: -987459376,
    }

    const response = await handlerAppointmentUpdated(
      getMessageWithData(payloadForAppWithoutExternalAcuityId),
    )
    expect(response).toBe(false)
  })

  it(`Should Update calendar acuity on appointment: service type`, async () => {
    const result = await handlerAppointmentUpdated(getMessageWithData(serviceProviderPayload))
    expect(result).toBe(true)
  })

  it(`Should was not change serviceProvider and time`, async () => {
    const result = await handlerAppointmentUpdated(
      getMessageWithData({
        ...serviceProviderPayload,
        newAppointment: {
          serviceProviderId: oldServiceProviderId,
          date: `${oneYearAhead}-08-23T11:00:00Z`,
        },
      }),
    )
    expect(result).toBe(false)
  })

  it(`Should skip reschedule appointment - serviceProvider doesnt have externalProviderIDForAcuity`, async () => {
    const payloadForSpWithoutExternalAcuityId: Partial<AppointmentUpdatedPubSubPayload> = {
      ...serviceProviderPayload,
      newAppointment: {
        ...serviceProviderPayload.newAppointment,
        serviceProviderId: newServiceProviderIdWithoutExternalProvider,
      },
    }

    const result = await handlerAppointmentUpdated(
      getMessageWithData(payloadForSpWithoutExternalAcuityId),
    )
    expect(result).toBe(false)
  })

  it(`Should cancel appointment on acuity`, async () => {
    const spyUpdateAppointmentOnAcuityService = jest.spyOn(
      AcuityAdapter.prototype,
      'rescheduleAcuityAppoinment',
    )

    const result = await handlerAppointmentUpdated(getMessageWithData(statusPayload))
    expect(result).toBe(true)

    expect(spyUpdateAppointmentOnAcuityService).toHaveBeenCalledTimes(0)
    spyUpdateAppointmentOnAcuityService.mockRestore()
  })

  it(`Should skip cancel appointment - appointment doesnt have externalAppointmentIDForAcuity`, async () => {
    const payloadForAppWithoutExternalAcuityId: Partial<AppointmentUpdatedPubSubPayload> = {
      ...statusPayload,
      appointmentId: appointmentIdWithoutExternalAcuityAppId,
    }

    const result = await handlerAppointmentUpdated(
      getMessageWithData(payloadForAppWithoutExternalAcuityId),
    )
    expect(result).toBe(false)
  })

  it(`Should skip cancel appointment - appointment status either Canceled either NoShow`, async () => {
    const payloadForAppWithoutExternalAcuityId: Partial<AppointmentUpdatedPubSubPayload> = {
      ...statusPayload,
      newAppointment: {
        ...statusPayload.newAppointment,
        status: AppointmentStatus.CheckedIn,
      },
    }

    const spyUpdateAppointmentOnAcuityService = jest.spyOn(
      AcuityAdapter.prototype,
      'rescheduleAcuityAppoinment',
    )

    const result = await handlerAppointmentUpdated(
      getMessageWithData(payloadForAppWithoutExternalAcuityId),
    )
    expect(result).toBe(false)

    expect(spyUpdateAppointmentOnAcuityService).toHaveBeenCalledTimes(0)
    spyUpdateAppointmentOnAcuityService.mockRestore()
  })

  it(`Should fail cancel appointment - appointment not found`, async () => {
    const payloadForAppWithoutExternalAcuityId: Partial<AppointmentUpdatedPubSubPayload> = {
      ...statusPayload,
      appointmentId: 987459375, //not exist
    }

    const response = await handlerAppointmentUpdated(
      getMessageWithData(payloadForAppWithoutExternalAcuityId),
    )
    expect(response).toBe(false)
  })

  it(`Should send email when service provider from the new appointment doesn't have externalProviderIDForAcuity`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const payloadWithNullExternalId: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId,
      oldAppointment: {
        date: `${oneYearAhead}-08-23T10:30:00Z`,
        serviceProviderId: oldServiceProviderId,
        serviceTypeId: serviceTypeData.uuid,
      },
      newAppointment: {
        date: `${oneYearAhead}-08-23T11:00:00Z`,
        serviceProviderId: newServiceProviderIdWithoutExternalProvider,
        serviceTypeId: newServiceTypeData.uuid,
      },
    }
    await handlerUpdateAppointmentServiceProviderNotFoundInAcuity(
      getMessageWithData(payloadWithNullExternalId),
    )

    const emailPayload = spyOnEmailSending.mock.calls[0][0]
    expect(emailPayload.subject).toContain('Resource not found in acuity -')
    spyOnEmailSending.mockRestore()
  })

  it(`Should send email without update serviceType`, async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const payloadWithNullExternalId: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId,
      oldAppointment: {
        date: `${oneYearAhead}-08-23T10:30:00Z`,
        serviceProviderId: oldServiceProviderId,
      },
      newAppointment: {
        date: `${oneYearAhead}-08-23T11:00:00Z`,
        serviceProviderId: newServiceProviderIdWithoutExternalProvider,
      },
    }
    await handlerUpdateAppointmentServiceProviderNotFoundInAcuity(
      getMessageWithData(payloadWithNullExternalId),
    )

    const emailPayload = spyOnEmailSending.mock.calls[0][0]
    expect(emailPayload.subject).toContain('Resource not found in acuity -')
    spyOnEmailSending.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await appointmentSeed.removeByIds([appointmentId, appointmentIdWithoutExternalAcuityAppId])

    await Promise.all([
      serviceTypeSeed.removeByIds([serviceTypeId, newServiceTypeId]),
      serviceProviderSeed.removeByIds([
        serviceProviderId,
        oldServiceProviderId,
        newServiceProviderIdWithoutExternalProvider,
      ]),
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])

    await Promise.all([
      serviceCategorySeed.removeByIds([serviceCategoryId, newServiceCategoryId]),
      patientSeed.removeByIds([patientId]),
    ])
    await emailTemplateSeed.removeById(sendEmailWhenExternalIdNotFoundInAcuityOnUpdatingFixture.id)

    await dataSource.destroy()
  })
})

function getMessageWithData(
  payload: Partial<AppointmentUpdatedPubSubPayload>,
): CloudEvent<PubSubEvent> {
  return testPubSubEvent(encodePubSubMessage(payload, AppointmentUpdatedSchema))
}
