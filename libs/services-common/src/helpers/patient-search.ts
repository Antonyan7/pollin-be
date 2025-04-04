import {handleOptionalStringValues} from '@libs/common'
import {PatientSearchType} from '@libs/common/helpers/patient.helper'
import {formatPhoneNumber} from '@libs/common/helpers/phone-number.helper'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm/patient.entity'
import {divideFullName} from '@libs/services-common/helpers/search.helper'
import {Brackets, FindOptionsWhere, Like, SelectQueryBuilder} from 'typeorm'

export const getSearchType = (searchString: string): PatientSearchType => {
  if (!searchString?.length) {
    return PatientSearchType.Fullname
  }

  if (searchString.includes('@')) {
    return PatientSearchType.Email
  }

  /**remove everything except digits & letters */
  const cleanedString = searchString.replace(/[^a-zA-Z0-9]/g, '')

  /**if string contains digits only*/
  if (cleanedString?.length && /^\d+$/.test(cleanedString)) {
    return PatientSearchType.PhoneNumber
  }

  return PatientSearchType.Fullname
}

export const getSearchStringResult = (type: PatientSearchType, patient: Patient): string => {
  switch (type) {
    case PatientSearchType.PhoneNumber:
      return patient.phoneNumber ? formatPhoneNumber(patient.phoneNumber) : null
    case PatientSearchType.Email:
      return handleOptionalStringValues(patient.email)
    default:
      return null
  }
}

export function addPatientSearchStringQuery<TEntity>(
  query: SelectQueryBuilder<TEntity>,
  searchString: string,
  searchType?: PatientSearchType,
): SelectQueryBuilder<TEntity> {
  if (!searchString?.length) {
    return query
  }

  switch (searchType) {
    case PatientSearchType.PhoneNumber:
      return query.andWhere('patients.phoneNumber LIKE :phoneNumber', {
        phoneNumber: `%${searchString.replace(/\D/g, '')}%`,
      })

    case PatientSearchType.Email:
      return query.andWhere('patients.email LIKE :email', {
        email: `%${searchString}%`,
      })

    default:
      const {firstName, lastName} = divideFullName(searchString)
      if (searchString.length < 3 && !lastName) {
        query.andWhere(
          new Brackets((qb) => {
            qb.where('patients.firstName =:firstName', {firstName})
              .orWhere('patients.lastName =:lastName', {lastName: firstName})
              .orWhere('patients.patientIdentifier = :patientIdentifier', {
                patientIdentifier: searchString,
              })
          }),
        )
      } else if (!lastName) {
        query.andWhere(
          new Brackets((qb) => {
            qb.where('patients.firstName like :firstName', {firstName: `%${firstName}%`})
              .orWhere('patients.lastName like :lastName', {lastName: `%${firstName}%`})
              .orWhere('patients.patientIdentifier = :patientIdentifier', {
                patientIdentifier: searchString,
              })
          }),
        )
      } else {
        query.andWhere(
          new Brackets((qb) => {
            qb.where('patients.firstName like :firstName', {firstName: `%${firstName}%`})
              .andWhere('patients.lastName like :lastName', {lastName: `%${lastName}%`})
              .orWhere('patients.patientIdentifier = :patientIdentifier', {
                patientIdentifier: searchString,
              })
          }),
        )
      }

      return query
  }
}

export const getPatientNameFindOptions = (
  searchString: string,
  where: FindOptionsWhere<Patient>[] | FindOptionsWhere<Patient>,
): FindOptionsWhere<Patient>[] => {
  const {firstName, lastName} = divideFullName(searchString)
  return lastName
    ? [
        {
          ...where,
          firstName: Like(`%${firstName}%`),
          lastName: Like(`%${lastName}%`),
        },
      ]
    : [
        {...where, firstName: Like(`%${firstName}%`)},
        {...where, lastName: Like(`%${firstName}%`)},
      ]
}
