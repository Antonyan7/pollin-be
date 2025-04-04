import {Injectable} from '@nestjs/common'
import {BaseFirestoreRepository, CustomRepository} from 'fireorm'
import {EmailProvider} from '@libs/common/model/email-provider.model'

@Injectable()
@CustomRepository(EmailProvider)
class EmailProviderRepository extends BaseFirestoreRepository<EmailProvider> {
  constructor() {
    super(EmailProvider)
  }
}

export {EmailProviderRepository}
