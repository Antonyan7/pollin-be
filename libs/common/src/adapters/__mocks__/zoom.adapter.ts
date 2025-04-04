export const mockedMeetingURL = 'meeting url mock'
export const mockedMeetingId = 'meeting id'

export const mockedMeetingIdToFail = 'meeting id to fail'

export class ZoomAdapter {
  async createMeeting(): Promise<{meetingId: string; meetingURL: string}> {
    return {
      meetingURL: mockedMeetingURL,
      meetingId: mockedMeetingId,
    }
  }

  async updateMeeting(): Promise<boolean> {
    return true
  }

  async deleteMeeting(meetingId: string): Promise<boolean> {
    return meetingId !== mockedMeetingIdToFail
  }
}
