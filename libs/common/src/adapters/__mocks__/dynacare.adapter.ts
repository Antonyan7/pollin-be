import {
  DynacareAttachmentXMLResponse,
  DynacareNotification,
  DynacareResult,
} from '@libs/common/interfaces/dynacare'
import {HttpStatus} from '@nestjs/common'

export class DynacareAdapter {
  async getNotifications(): Promise<DynacareNotification[]> {
    return [
      {
        id: 445530,
        orderId: 100614,
        acknowledgementDateTime: '0001-01-01T00:00:00',
        isAcknowledged: false,
        notificationType: 'Post.Order',
        notificationData: {
          NotificationData: null,
        },
      },
      {
        id: 447257,
        orderId: 100616,
        acknowledgementDateTime: '0001-01-01T00:00:00',
        isAcknowledged: false,
        notificationType: 'Post.Order',
        notificationData: {
          NotificationData: null,
        },
      },
    ]
  }

  async getOrderAttachments(_: number): Promise<DynacareAttachmentXMLResponse> {
    return {
      ArrayOfAttachment: {
        Attachment: [
          {
            Id: 36098,
            StorageReference:
              'https://api.dynacare.ca/dev/ext_orders/attachment/56ecd59b-9cae-4ff3-9553-e04af4c70af8',
            DataVersion: 'ELITE1.2',
            MimeType: 'x-application/hl7',
            From: 'fhealthdev+test+@gmail.com',
            InsertedDate: '2023-05-03T14:42:13.5000545',
            LastUpdatedDate: '2023-05-03T14:42:13.5001313',
            SourceSystemId: 11085065,
          },
        ],
      },
    }
  }

  async getResult(_: string): Promise<{data: DynacareResult; status: number}> {
    return {
      data: {
        OriginalFileName: 'GenericFilename.txt',
        ContentType: 'x-application/hl7',
        FileData:
          'TVNIfF5+XCZ8TEFCfER5bmFjYXJlfHx8MjAyMzA4MTUxMTQ4MDgtMDQwMHx8T1JVXlIwMXwyMDI0NTQ4OHxEfDIuM3x8fHx8fHxlbkNBClBJRHwxfHw0UEhXVE5FQVU3Xl5eXl5+Xl5eXlhYT0VJXnx8U0lNUFNPTl5MSVNBXnx8MTk2NzAxMTl8TXx8fDEgTk9XSEVSRSBTVF5eXk9OVEFSSU9eTTFIMkgxXnx8Xnx8fHx8Ck9SQ3x8XkR5bmFjYXJlfDUwMDAwMzk3ODN8fENNfHx8fDIwMjMwNTAzMTI0ODUwLTA0MDB8fHx8fHx8fF5EWU5BQ0FSRSBXRUxMTkVTU15EWU5BCk9CUnwxfF5EeW5hY2FyZXw1MDAwMDM5NzgzfDQ0NV5JTlJeRFlOQXx8fDIwMjMwNTAzMTI0NDQyLTA0MDB8fHx8fHx8MjAyMzA1MDMxMjQ4NTAtMDQwMHxeXl5efDk5OTk3MV5URVNUSU5HMV5ZMkteXl5eXl5EWU5BfHx8NFBIV1RORUFVN3xIRU1BfDMwMDA1N3wyMDIzMDUwMzEzMDQ1Ny0wNDAwfHx8RnxeXnx8Ck9CWHwxfE5NfDQ0NV5JTlJeRFlOQXwzMDAwNTd8NS40fHwwLjkgLSAxLjN8SHx8fEZ8fHwyMDIzMDUwMzEzMDQ1Ny0wNDAwCk5URXwxfFJGfDAuOSAtIDEuM3xSRl5eXgpOVEV8MnxSRnxHVUlERUxJTkVTOiAgICAgICAgICAgICAgICAgICAgICAgICAgIFNVR0dFU1RFRCBJTlIgUkFOR0U6fFJGXl5eCk5URXwzfFJGfDEuIE1vc3QgY2xpbmljYWwgY29uZGl0aW9ucyBpbmRpY2F0aW5nICAgIDIuMCAtIDMuMHxSRl5eXgpOVEV8NHxSRnxhbnRpY29hZ3VsYW50IHRoZXJhcHl8UkZeXl4KTlRFfDV8UkZ8Mi4gUGF0aWVudHMgd2l0aCBtZWNoYW5pY2FsIHByb3N0aGV0aWMgICAgMi41IC0gMy41fFJGXl5eCk5URXw2fFJGfGhlYXJ0IHZhbHZlc3xSRl5eXgo=',
        FileGuid: '6ceff54c-53c1-41b8-b24a-825d5e898375',
        Url: 'https://dynacare.com/api/Com_DynacareApi_FileStorage/?FileGuid=6ceff54c-53c1-41b8-b24a-825d5e898375&code=OQJdT5Xnbpgx9kcY6tm01kzPj6nnEUnxqawPFQO10Qv9up5HcGAKfA==?FileGuid=6ceff54c-53c1-41b8-b24a-825d5e898375',
        SharedWith: ['fhealthdev+test+@gmail.com'],
        From: 'fhealthdev+test+@gmail.com',
      },
      status: HttpStatus.OK,
    }
  }

  async acknowledgeNotification(notificationId: number, _ = true): Promise<DynacareNotification> {
    return {
      id: notificationId,
      orderId: 100614,
      acknowledgementDateTime: '2023-12-21T13:23:04.6222562+00:00',
      isAcknowledged: true,
      notificationType: 'Post.Order',
      notificationData: {
        NotificationData: '',
      },
    }
  }
}
