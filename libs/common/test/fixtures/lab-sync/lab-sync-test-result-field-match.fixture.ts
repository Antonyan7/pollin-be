import {LabSyncTestResultFieldMatch} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

export const labSyncOBRUnlinkedNewestMatch: Partial<LabSyncTestResultFieldMatch> = {
  id: 1,
  testType: true,
  firstName: true,
  lastName: true,
  ohip: true,
  ohipVersion: true,
  postalCode: false,
}

export const labSyncOBRUnlinkedOldestMatch: Partial<LabSyncTestResultFieldMatch> = {
  id: 2,
  testType: true,
  firstName: true,
  lastName: true,
  ohip: true,
  ohipVersion: true,
  postalCode: false,
}

export const labSyncOBRLifeLabB12Match: Partial<LabSyncTestResultFieldMatch> = {
  id: 3,
  testType: true,
  firstName: true,
  lastName: true,
  ohip: true,
  ohipVersion: true,
  postalCode: false,
}
