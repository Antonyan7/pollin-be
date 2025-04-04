import {BaseEntity, FindOneOptions, FindOperator, FindOptionsWhere, Repository} from 'typeorm'
import {FindManyOptions} from 'typeorm/find-options/FindManyOptions'
import {FindOptionsOrder} from 'typeorm/find-options/FindOptionsOrder'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {StructuredLogger} from '../utils'

export class BaseRepository<T> extends Repository<T> {
  async findAll(
    pageNumber: number,
    pageSize: number,
    findManyOptions?: FindManyOptions<T> & FindOptionsOrder<T>,
  ): Promise<{data: T[]; totalItems: number}> {
    const page = pageNumber ? pageNumber : 1
    let totalItems, data
    try {
      const query = {
        ...findManyOptions,
        relations: {...findManyOptions?.relations},
        where:
          findManyOptions?.where instanceof Array && findManyOptions?.where?.length
            ? [...findManyOptions?.where]
            : {...findManyOptions?.where},
        order: {...findManyOptions?.order},
        take: pageSize,
        skip: (page - 1) * pageSize,
      }

      ;[data, totalItems] = await this.findAndCount(query)
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.BaseRepositoryFunctions.FindAll,
        eventName: activityLogs.BaseRepositoryActions.FindAllFailed,
      })
    }
    return {data, totalItems}
  }

  /**
   * wrapper for methods to avoid issue when input property is undefined - and typeOrm returns not expected first raw from DB or not include that property at all into where
   * eq.: repository.FindOneBy(id) where id = undefined - it will return first raw from db
   */
  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    validateWhereOptionsForUndefined(options?.where)
    return super.findOne(options)
  }

  async findOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null> {
    validateWhereOptionsForUndefined(where)
    return super.findOneBy(where)
  }

  async findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]> {
    validateWhereOptionsForUndefined(where)
    return super.findBy(where)
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    validateWhereOptionsForUndefined(options?.where)
    return super.find(options)
  }

  async findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]> {
    validateWhereOptionsForUndefined(options?.where)
    return super.findAndCount(options)
  }

  async findAndCountBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<[T[], number]> {
    validateWhereOptionsForUndefined(where)
    return super.findAndCountBy(where)
  }
}

/**
 * If key = undefined -  Throwing exception to avoid issue with Typeorm which return not expected data (eq.: First raw from DB)
 */
function validateWhereOptionsForUndefined(
  where?: FindOptionsWhere<BaseEntity>[] | FindOptionsWhere<BaseEntity>,
): boolean {
  if (!where) {
    return
  }

  if (!Array.isArray(where)) {
    where = [where]
  }

  const errors: string[] = []
  where.forEach((findOptionsWhere) => {
    for (const key in findOptionsWhere) {
      const param = findOptionsWhere[key]

      // for instances which getting from diff project, need to use param?.constructor?.name
      if (param instanceof FindOperator || param?.constructor?.name == 'FindOperator') {
        // for Equal, In - we don't need this check - as DB will return expected empty array
        continue
      }

      //for relations
      else if (typeof param === 'object') {
        validateWhereOptionsForUndefined(param) //recursive for relations
      }

      //simple case
      else if (param === null || param === undefined) {
        errors.push(`Invalid value of WHERE parameter: ${key}`)
      }
    }
  })

  if (errors.length) {
    const errorMessage = ` Repository query incudes undefined key, to avoid issue with not expected data from DB, throwing exception. Errors: ${errors.join(
      '. ',
    )}`

    StructuredLogger.error(
      activityLogs.BaseRepositoryFunctions.ValidateWhereOptionsForUndefined,
      activityLogs.BaseRepositoryActions.WhereIncludesUndefinedKey,
      {
        errMsg: errorMessage,
      },
    )
    throw new Error(errorMessage)
  }
}
