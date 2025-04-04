export const MockedCloudTaskId = 'MockTaskId'

export class CloudTaskAdapter {
  createTask(): string {
    return MockedCloudTaskId
  }

  deleteTask(): void {
    return
  }
}
