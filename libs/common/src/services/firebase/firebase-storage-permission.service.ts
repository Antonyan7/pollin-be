import {FirebaseAuthAdapter} from '@libs/common/adapters/firebase/firebase-auth.adapter'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities/staff.entity'
import {StructuredLogger} from '@libs/common/utils/structured-logger'
import * as activityLogs from '@libs/common/enums/activity-logs'

import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

// After adding new folder: also need to update rules in: firebase-platform/storage.rules
export enum BucketFolder {
  Referral = `referral`,
  SemenCollection = `semenCollection`,
  TestResult = `testResult`,
  Document = `document`, // PatientDocumentsTab
  Encounter = `encounterNote`,
  StaffNote = `staffNote`,
  Plans = `plans`,
  IVFLab = `ivfLab`,
  Consents = 'consents',

  // patientPhoto has separated logic
}

// patientPhoto has separated logic:
// FE sends file to BE, later BE return signedUrl. no one (except BE) has access to patientPhoto folder

// Identify what bucket permission need for every staff permission
export const PermissionToBucketMap = new Map<PermissionEnum, BucketFolder[]>([
  [PermissionEnum.PatientListDetailsHighlights, [BucketFolder.Referral]],
  [PermissionEnum.ResultsTab, [BucketFolder.TestResult, BucketFolder.SemenCollection]],
  [PermissionEnum.InHouseTests, [BucketFolder.TestResult]],
  [PermissionEnum.ExternalResults, [BucketFolder.TestResult]],
  [PermissionEnum.SpecimenCollection, [BucketFolder.SemenCollection]],
  [PermissionEnum.PatientDocumentsTab, [BucketFolder.Document, BucketFolder.Plans]],
  [PermissionEnum.EncountersTab, [BucketFolder.Encounter]],
  [PermissionEnum.StaffNotesTab, [BucketFolder.StaffNote]],
  [PermissionEnum.PlansTab, [BucketFolder.Plans]],
  [PermissionEnum.IVFLab, [BucketFolder.IVFLab]],
  [PermissionEnum.ConsentsTab, [BucketFolder.Consents]],
])

export class BucketPermissionService {
  private firebaseAuthAdapter: FirebaseAuthAdapter = new FirebaseAuthAdapter()
  private revokeToken = false

  async updateClaimsForBucketByStaff(staffWithPermissions: Staff): Promise<void> {
    StructuredLogger.info(
      activityLogs.FirebaseStorageFunctions.BucketPermissionService,
      activityLogs.FirebaseStorageActions.StartClaimsUpdate,
      {
        message: `Initiate staff Claim Update for Staff ID: ${staffWithPermissions.id}, Auth User ID: ${staffWithPermissions.authUserId}`,
      },
    )

    if (!staffWithPermissions.role?.permissions?.length) {
      return await this.deleteCustomClaims(staffWithPermissions)
    }

    const uniqueBucketPermissions = this.getUniqueBucketPermissions(staffWithPermissions)

    if (!uniqueBucketPermissions?.length) {
      return await this.deleteCustomClaims(staffWithPermissions)
    }

    await this.firebaseAuthAdapter.setNewCustomClaimsForBucket(
      staffWithPermissions,
      uniqueBucketPermissions,
      this.revokeToken,
    )
  }

  enableTokenRevocation(): void {
    this.revokeToken = true
  }

  private getUniqueBucketPermissions(staffWithPermissions: Staff): string[] {
    const bucketPermissionsWithDublicatesAndUndef: string[][] =
      staffWithPermissions.role.permissions.map((permission) => {
        return PermissionToBucketMap.get(permission.permission)
      })

    const uniqueBucketPermissionsWithUndefined: string[] = Array.from(
      new Set(bucketPermissionsWithDublicatesAndUndef.flat()),
    )

    return uniqueBucketPermissionsWithUndefined.filter((permission) => permission) //remove undefined
  }

  private async deleteCustomClaims(staffWithPermissions: Staff): Promise<void> {
    await this.firebaseAuthAdapter.deleteCustomClaimsForBucket(staffWithPermissions.authUserId)
    StructuredLogger.info(
      activityLogs.FirebaseStorageFunctions.DeleteCustomClaims,
      activityLogs.FirebaseStorageActions.DeleteAllCustomClaims,
      {message: `Delete all custom claim for authUserId: ${staffWithPermissions.authUserId}`},
    )
    return
  }
}
