export const generateFinalReportFilename = (
  firstName: string,
  lastName: string,
  serviceName: string,
): string => {
  const regex = /[^a-zA-Z0-9]/g

  return `${firstName}_${lastName}_${serviceName.replace(regex, '_')}.pdf`
}
