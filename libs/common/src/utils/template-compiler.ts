import * as ejs from 'ejs'
import {EmailTemplate} from '@libs/data-layer/apps/email/entities/typeorm'
import {EmailTemplateType} from '@libs/data-layer/apps/email/enums/email-type.enum'
import {v4} from 'uuid'
import {StructuredLogger} from '@libs/common/utils/structured-logger'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {BadRequestException} from '@libs/services-common/exceptions'

const logFunc = activityLogs.AcuityWebhookServiceFunctions
const logAct = activityLogs.AcuityWebhookServiceActions

export const addTemplateHeaderAndFooter = (
  templates: EmailTemplate[],
  mainTemplateType: EmailTemplateType,
): {content: string; subject: string; disabled: boolean} => {
  const mainTemplate = templates.find((t) => t.type === mainTemplateType)
  if (!mainTemplate) {
    const errorMessage = `Template with type '${mainTemplateType}' not found.`

    StructuredLogger.error(
      logFunc.AddTemplateHeaderAndFooter,
      logAct.EmailTemplateNotFoundDataIssue,
      {
        message: errorMessage,
      },
    )
    throw new BadRequestException(errorMessage)
  }

  if (mainTemplate.disabled) {
    return {
      content: '',
      subject: '',
      disabled: true,
    }
  }

  const header = templates.find((t) => t.type === EmailTemplateType.Header)
  const footer = templates.find((t) => t.type === EmailTemplateType.Footer)

  return {
    content: (mainTemplate?.body || '')
      .replace('$ReplacedHeader', header?.body || '')
      .replace('$ReplacedFooter', footer?.body || ''),
    subject: mainTemplate?.subject || '',
    disabled: false,
  }
}

export const compileTemplate = async (
  templates: EmailTemplate[],
  mainTemplateType: EmailTemplateType,
  data?: ejs.Data,
): Promise<{html: string; subject: string; disabled: boolean}> => {
  const randomFooterUuid = v4()
  const {content, subject, disabled} = addTemplateHeaderAndFooter(templates, mainTemplateType)
  const [htmlTemplate, subjectTemplate] = await Promise.all([
    getCompiled(content),
    getCompiled(subject),
  ])

  return {
    html: htmlTemplate({...data, randomFooterUuid}),
    subject: subjectTemplate(data),
    disabled,
  }
}

export const getCompiled = async (content: string): Promise<ejs.TemplateFunction> => {
  return new Promise((resolve) => {
    const compiled = ejs.compile(content)
    resolve(compiled)
  })
}

export const checkIsDisabledTemplate = (
  templates: EmailTemplate[],
  mainTemplateType: EmailTemplateType,
): boolean => {
  const mainTemplate = templates.find((t) => t.type === mainTemplateType)
  if (mainTemplate?.disabled) {
    const message = `Template with type '${mainTemplateType}' disabled`
    StructuredLogger.info(
      activityLogs.EmailNotificationFunctions.SendMail,
      activityLogs.EmailNotificationActions.TemplateDisabled,
      {message},
    )

    return true
  }
  return false
}

/**works only for <%- %> */
export const extractTemplateVariables = (template: string): string[] => {
  if (!template) {
    return []
  }

  const regex = /<%-?\s*([a-zA-Z0-9_.]+)\s*%>/g
  const matches = [...template.matchAll(regex)]

  return Array.from(new Set(matches.map((match) => match[1])))
}
