import {
  ProgressBarEnum,
  ProgressBarPercent,
  QuestionnairePosition,
} from '@libs/common/enums/progress-bar'
import {ProgressBarType} from '@apps/booking/service-providers/dto/service-provider.dto'
import {BookingIntent} from '@libs/data-layer/apps/scheduling/entities/fireorm/booking-intent'

export const getQuestionnairePercentCompleted = (
  type: ProgressBarEnum,
  sequence?: number,
  questionsTotal?: number,
): ProgressBarType => {
  let position: QuestionnairePosition
  let percentCompleted
  if (
    type === ProgressBarEnum.Questionnaire ||
    type === ProgressBarEnum.QuestionnaireWithBookingFlow
  ) {
    percentCompleted = Math.round((sequence / questionsTotal) * ProgressBarPercent.get(type)) || 0
    if (!sequence) {
      position = QuestionnairePosition.First
    } else if (sequence === questionsTotal) {
      position = QuestionnairePosition.Last
    } else {
      position = QuestionnairePosition.Middle
    }
  } else {
    return {
      percentCompleted: ProgressBarPercent.get(type),
    }
  }
  return {
    position,
    percentCompleted,
  }
}

export const getBookingPercentCompleted = (
  bookingIntent: BookingIntent,
  type: ProgressBarEnum,
): number => {
  if (bookingIntent?.questionnaireId) {
    const questionnaireProgress = ProgressBarPercent.get(
      ProgressBarEnum.QuestionnaireWithBookingFlow,
    )
    return Math.round(
      questionnaireProgress + ((100 - questionnaireProgress) * ProgressBarPercent.get(type)) / 100,
    )
  }

  return ProgressBarPercent.get(type)
}
