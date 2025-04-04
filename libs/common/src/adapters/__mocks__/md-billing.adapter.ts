import {
  ServiceCodeItem,
  DiagnosticCodeItem,
  OHIPValidationPayload,
  OHIPValidationResponse,
  CreateClaimRequest,
  CreateClaimResponse,
  GetClaimDetailsPayload,
  GetClaimDetailsResponse,
  MDBillingClaimStatus,
} from '@libs/common/interfaces/md-billing'
import {MDBillingAdapterData} from '@libs/common/adapters/md-billing.adapter'
import {doesLuhnValidationPassing} from '@libs/services-common/helpers/mod-10-validator.helper'
import {getCleanOhipNumber, getCleanOhipVersionCode} from '@libs/common/helpers/patient-ohip.helper'

export const MdBillingMockError =
  'Your MCEDT account is not yet setup in our system.  Once it has been configured, the Health Card Validation Service can be used.'

export const OhipNumberWhichReturnErrorWithoutStructureFromMdBilling = '0011001104' //for example if BE sends with dashes
export const OhipNumberWhichReturn500Error = '0011001105'

export class MDBillingAdapter {
  async getServiceCodes(_: string): Promise<MDBillingAdapterData<ServiceCodeItem[]>> {
    return {
      status: 200,
      data: [
        {
          ServiceCodeId: 1,
          ServiceCode: '#####',
          ServiceCodeSearchDescription: 'Description',
        },
      ],
    }
  }

  async getDiagnosticCodes(_: string): Promise<MDBillingAdapterData<DiagnosticCodeItem[]>> {
    return {
      status: 200,
      data: [
        {
          DiagnosticCodeId: 1,
          DiagnosticCode: '#####',
          DiagnosticCodeDescription: 'Description',
          DiagnosticCodeSearchDescription: 'Search Description',
        },
      ],
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  async validateOHIP(
    payload: OHIPValidationPayload,
  ): Promise<MDBillingAdapterData<OHIPValidationResponse> | any> {
    if (payload.HealthCardNumber == OhipNumberWhichReturnErrorWithoutStructureFromMdBilling) {
      //real response from prod, if we send for example ohip number with dashes - mdBilling return in diff wrong structure
      const response: any = {
        'request.HealthCardNumber': [
          'The field HealthCardNumber must be a string with a minimum length of 10 and a maximum length of 10.',
          'Health ard must be numeric',
        ],
      }
      return {status: response.status, data: response.data} //took from adapter
    }

    if (payload.HealthCardNumber == OhipNumberWhichReturn500Error) {
      // mdBilling return in 500 Error
      return null
    }

    payload.HealthCardNumber = getCleanOhipNumber(payload.HealthCardNumber) //with dashed MdBilling return error with wrong way
    payload.VersionCode = getCleanOhipVersionCode(payload.VersionCode)

    const isValid = doesLuhnValidationPassing(payload.HealthCardNumber)

    return {
      status: 200,
      data: {
        FirstName: 'TESTF',
        LastName: 'LAST AM',
        DOB: '2001-01-01T00:00:00',
        Gender: 'F',
        IsHealthCardValid: isValid,
        ResponseMessage: null,
        IsSuccess: true,
        ErrorMessages: isValid ? [] : [MdBillingMockError],
        StatusCode: 200,
      },
    }
  }

  async createClaim(_: CreateClaimRequest): Promise<MDBillingAdapterData<CreateClaimResponse>> {
    return {
      status: 200,
      data: {
        ClaimId: 3947961,
        ClaimTotal: 62.2,
        IsSuccess: true,
        ErrorMessages: null,
        StatusCode: 200,
      },
    }
  }

  async getClaimDetails(
    _: GetClaimDetailsPayload,
  ): Promise<MDBillingAdapterData<GetClaimDetailsResponse>> {
    return {
      status: 200,
      data: {
        ClaimDetailItems: [
          {
            ClaimId: 3945943,
            ClaimStatus: MDBillingClaimStatus.Unsubmitted,
          },
          {
            ClaimId: 3333333,
            ClaimStatus: MDBillingClaimStatus.Paid,
          },
          {
            ClaimId: 4444444,
            ClaimStatus: 'Unknown' as MDBillingClaimStatus,
          },
        ],
        IsSuccess: true,
        ErrorMessages: null,
        StatusCode: 200,
      },
    }
  }
}
