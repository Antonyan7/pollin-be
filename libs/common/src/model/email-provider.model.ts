import {Collection} from 'fireorm'
import {EmailAdapter, EmailMessage} from '@libs/common/interfaces'
import {BaseModel} from '@libs/common/model/fireorm.model'

@Collection('email-providers')
export class EmailProvider extends BaseModel {
  name: string
  adapter?: EmailAdapter<EmailMessage>
  active: boolean
  failTimestamp?: string
  disabled: boolean // manually disable provider
}
