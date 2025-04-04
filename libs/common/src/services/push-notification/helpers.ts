export function processTemplateString(
  inputString: string,
  templateData?: {[key: string]: string},
): string {
  const pattern = /\{\{([^{}]+)\}\}/g

  return inputString.replace(pattern, (match, key) => {
    return templateData[key] || match
  })
}
