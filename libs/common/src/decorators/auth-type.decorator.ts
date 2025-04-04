import {CustomDecorator, SetMetadata} from '@nestjs/common'
import {AuthTypes} from '@libs/common/enums/auth.enum'
import {Request} from 'express'

export type AuthTypeGetter = (req: Request) => AuthTypes

/**
 * Auth type decorator for controller method.
 * Endpoint auth will be handled in GlobalAuthGuard based on AuthType
 * @param typeOrTypeGetter
 */
export const ApiAuthType = (typeOrTypeGetter: AuthTypes | AuthTypeGetter): CustomDecorator =>
  SetMetadata(
    'AuthType',
    typeof typeOrTypeGetter === 'function' ? typeOrTypeGetter : {type: typeOrTypeGetter},
  )
