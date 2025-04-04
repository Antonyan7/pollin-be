import {Timestamp} from 'firebase-admin/firestore'

export class BaseModel {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
  updatedBy: string
}
