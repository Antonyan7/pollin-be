export function divideFullName(searchString: string): {firstName: string; lastName: string} {
  const name = searchString?.split(' ')
  const firstName = name[0]
  const lastName = name[1]
  return {firstName, lastName}
}
