export const collectSettledErrors = <T>(results: PromiseSettledResult<T>[]): Error[] => {
  return results
    .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    .map((result) => result.reason)
}
