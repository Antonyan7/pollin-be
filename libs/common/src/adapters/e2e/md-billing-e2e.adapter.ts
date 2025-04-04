import {
  CreateClaimRequest,
  CreateClaimResponse,
  DiagnosticCodeItem,
  GetClaimDetailsPayload,
  GetClaimDetailsResponse,
  MDBillingClaimStatus,
  OHIPValidationPayload,
  OHIPValidationResponse,
  ServiceCodeItem,
} from '@libs/common/interfaces/md-billing'
import {MDBillingAdapterData} from '../md-billing.adapter'

/**
 * Mocked adapter for MDBilling
 */
export class MDBillingAdapterE2E {
  static async getServiceCodes(_: string): Promise<MDBillingAdapterData<ServiceCodeItem[]>> {
    return {
      status: 200,
      data: [
        {
          ServiceCodeId: 1,
          ServiceCode: 'ServiceCode1',
          ServiceCodeSearchDescription: 'ServiceCodeSearchDescription',
        },
        {
          ServiceCodeId: 2,
          ServiceCode: 'ServiceCode2',
          ServiceCodeSearchDescription: 'ServiceCodeSearchDescription',
        },
        {
          ServiceCodeId: 3,
          ServiceCode: 'ServiceCode3',
          ServiceCodeSearchDescription: 'ServiceCodeSearchDescription',
        },
      ],
    }
  }

  static async getDiagnosticCodes(_: string): Promise<MDBillingAdapterData<DiagnosticCodeItem[]>> {
    return {
      status: 200,
      data: [
        {
          DiagnosticCodeId: 1,
          DiagnosticCode: 'DiagnosticCode1',
          DiagnosticCodeDescription: 'DiagnosticCodeDescription',
          DiagnosticCodeSearchDescription: 'DiagnosticCodeSearchDescription',
        },
        {
          DiagnosticCodeId: 2,
          DiagnosticCode: 'DiagnosticCode2',
          DiagnosticCodeDescription: 'DiagnosticCodeDescription',
          DiagnosticCodeSearchDescription: 'DiagnosticCodeSearchDescription',
        },
        {
          DiagnosticCodeId: 3,
          DiagnosticCode: 'DiagnosticCode3',
          DiagnosticCodeDescription: 'DiagnosticCodeDescription',
          DiagnosticCodeSearchDescription: 'DiagnosticCodeSearchDescription',
        },
      ],
    }
  }

  static async validateOHIP(
    _: OHIPValidationPayload,
  ): Promise<MDBillingAdapterData<OHIPValidationResponse>> {
    return {
      status: 200,
      data: {
        FirstName: 'FirstName',
        LastName: 'LastName',
        DOB: '2001-01-01T00:00:00',
        Gender: 'F',
        IsHealthCardValid: true,
        ResponseMessage: 'success',
        IsSuccess: true,
        ErrorMessages: [],
        StatusCode: 200,
      },
    }
  }

  static async createClaim(
    _: CreateClaimRequest,
  ): Promise<MDBillingAdapterData<CreateClaimResponse>> {
    return {
      status: 200,
      data: {
        ClaimId: Math.floor(Math.random() * 999999),
        ClaimTotal: 10.99,
        IsSuccess: true,
        ErrorMessages: [],
        StatusCode: 200,
      },
    }
  }

  static async getClaimDetails(
    payload: GetClaimDetailsPayload,
  ): Promise<MDBillingAdapterData<GetClaimDetailsResponse>> {
    return {
      status: 200,
      data: {
        ClaimDetailItems: payload.ClaimIds.map((id) => ({
          ClaimId: id,
          ClaimStatus: MDBillingClaimStatus.Unsubmitted,
        })),
        IsSuccess: true,
        ErrorMessages: null,
        StatusCode: 200,
      },
    }
  }
}
