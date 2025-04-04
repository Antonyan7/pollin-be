import {Timestamp} from 'firebase-admin/firestore'
import {IEntity} from 'fireorm'

export class BaseModel implements IEntity {
  id: string
  updatedAt: Timestamp
  updatedBy: string
}
