export type ZoomMeetingCreationPayload = {
  date: Date
  inviteesEmails: string[]
  title: string

  /**minutes */
  duration: number
}

export type ZoomMeetingUpdatePayload = {
  date: Date
  /**minutes */
  duration: number
  title: string
}
