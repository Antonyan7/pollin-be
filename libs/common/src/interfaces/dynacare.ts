export type DynacareNotificationData = {
  NotificationData: unknown
}

export type DynacareNotification = {
  id: number
  orderId: number
  /**
   * If not acknowledged could include invalid date like `0001-01-01T00:00:00`
   */
  acknowledgementDateTime: string
  isAcknowledged: boolean
  notificationType: string
  notificationData: DynacareNotificationData
}

export type DynacareAttachment = {
  Id: number
  /**
   * URL is used to fetch actual result from Dynacare
   * @example `https://api.dynacare.ca/dev/ext_orders/attachment/56ecd59b-9cae-4ff3-9553-e04af4c70af8`
   */
  StorageReference: string
  /**
   * @example 'ELITE1.2'
   */
  DataVersion: string
  /**
   * @example 'x-application/hl7'
   */
  MimeType: string
  /**
   * @example 'eorders@dynacare.ca'
   */
  From: string
  /**
   * @example '2023-05-03T14:42:13.5000545'
   */
  InsertedDate: string
  /**
   * @example '2023-05-03T14:42:13.5000545'
   */
  LastUpdatedDate: string
  /**
   * @example `12469340`
   */
  SourceSystemId: number
}

/**
 * Parsed payload can be Array or Object
 */
export type DynacareAttachmentPayload = DynacareAttachment[] | DynacareAttachment

/**
 * This is JSON representation of XML response from Dynacare for Attachment.
 * System should always read last element in array for latest result.
 */
export type DynacareAttachmentXMLResponse = {
  ArrayOfAttachment: {
    Attachment: DynacareAttachmentPayload
  }
}

export type DynacareResult = {
  /**
   * @example GenericFilename.txt
   */
  OriginalFileName: string
  /**
   * @example x-application/hl7
   */
  ContentType: string
  /**
   * HL7 file encoded in base64
   */
  FileData: string
  /**
   * @example "6ceff54c-53c1-41b8-b24a-825d5e898375"
   */
  FileGuid: string
  Url: string
  SharedWith: string[]
  From: string
}
