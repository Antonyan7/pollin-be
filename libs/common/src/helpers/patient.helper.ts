import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {DefaultValue} from '../enums'
import {RelationshipEnum} from '@libs/services-common/enums'

export const inchesToFeetAndInches = (inches: number): {feet: number; inches: number} => {
  const feet = Math.floor(Number(inches) / 12)
  const remainingInches = Number(inches) % 12
  return {feet, inches: remainingInches}
}

/**Firstname L.*/
export const abbreviatedName = (user: Patient | Staff): string => {
  const shortLastname = user?.lastName.length ? ` ${user.lastName[0]}.` : null
  return user?.firstName + shortLastname
}

/**@returns FL for Fullname Lastname */
export const getInitials = (user: Patient | Staff): string => {
  return user?.firstName.charAt(0)?.toUpperCase() + user?.lastName.charAt(0)?.toUpperCase()
}

export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`
}

export const getFullWithMiddleName = (
  firstName: string,
  lastName: string,
  middleName?: string,
): string => {
  if (!lastName || !firstName) {
    return null
  }

  return `${lastName} ${firstName}` + (middleName ? ` ${middleName}` : DefaultValue.Empty)
}

export const getFullNameWithMiddleName = (
  firstName: string,
  lastName: string,
  middleName?: string,
): string | null => {
  if (!lastName || !firstName) {
    return null
  }

  let fullName = firstName
  if (middleName && middleName.trim().length > 0) {
    fullName += ` ${middleName}`
  }
  fullName += ` ${lastName}`
  return fullName
}

export const getShortName = (firstName: string, lastName: string): string => {
  return `${lastName} ${firstName[0]}`
}

export const formatOhip = (number: string, versionCode: string): string => {
  if (!number?.length) {
    return null
  }

  const clearNumber = number.replace(/\D/g, '')

  if (clearNumber.length !== 10) {
    return null
  }

  const ohipNumber = `${clearNumber.slice(0, 4)}-${clearNumber.slice(4, 7)}-${clearNumber.slice(7)}`

  return versionCode?.length ? ohipNumber.concat(` ${versionCode.toUpperCase()}`) : ohipNumber
}

export const getPatientPartners = (
  patient: Patient,
): {patient: Patient; relationShip: RelationshipEnum}[] => {
  const partners: {patient: Patient; relationShip: RelationshipEnum}[] = []

  patient.partnersRelations.forEach((relation) => {
    partners.push({patient: relation.partner, relationShip: relation.relationship})
  })

  patient.inviterRelations.forEach((relation) => {
    partners.push({patient: relation.patient, relationShip: relation.relationship})
  })

  return partners
}

export const getPatientAddressFormattedText = (address: {
  country: string
  street: string
  unit: string
  city: string
  province: string
  postalCode: string
}): string => {
  const {unit, street, city, province, postalCode} = address

  const addressParts = [
    unit && street ? `${unit} ${street}` : street,
    city,
    province,
    postalCode,
  ].filter((part) => part)

  return addressParts.join(', ')
}

export enum PatientSearchType {
  Fullname,
  PhoneNumber,
  Email,
}
