import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {RedisService} from '@libs/redis'
import {Permission} from '@libs/data-layer/apps/clinic-tasks/entities'
import {isE2eTestingBuild, StructuredLogger, NestprojectConfigService} from '@libs/common'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'
import {InternalServerErrorException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'

@Injectable()
export class RolesGuard implements CanActivate {
  // eslint-disable-next-line max-params
  constructor(
    private reflector: Reflector,
    private staffRepository: StaffRepository,
    private readonly redisService: RedisService,
    private configService: NestprojectConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<PermissionEnum[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      throw new InternalServerErrorException(i18Messages.ENDPOINT_DOESNT_HAVE_SET_ANY_ROLE)
    }
    if (requiredRoles.includes(PermissionEnum.ClinicPortalNoPermissions)) {
      return true
    }
    if (isE2eTestingBuild()) {
      StructuredLogger.warn('RolesGuardActivate', 'RolesGuardSkipped', {})
      return true
    }
    const request = context.switchToHttp().getRequest()
    const session = request.raw.locals?.session
    const {authUserId} = session

    const cacheData = await this.redisService
      .get(`staff_permissions_${authUserId}`)
      .catch((error) => {
        StructuredLogger.error('RedisService getting cache error', error.stack, error)
        parseError(error)
        return null
      })
    let permissions: Permission[]
    if (cacheData && typeof cacheData === 'string') {
      permissions = JSON.parse(cacheData)
    } else {
      const staff = await this.staffRepository.findOneByAuthUserIdWithRole(authUserId)
      permissions = staff?.role?.permissions
      const caseTimePermission = this.configService.get<number>('CACHE_TIME_TO_LEAVE')

      this.redisService
        .set(`staff_permissions_${authUserId}`, JSON.stringify(permissions), caseTimePermission)
        .catch((error) => {
          StructuredLogger.error('RedisService setting cache error', error.stack, error)
          parseError(error)
          return null
        })
    }

    if (!permissions?.length) {
      return false
    }
    return permissions.some((item) => requiredRoles.includes(item.permission))
  }
}
