export enum GCPInfraToJiraServiceFunction {
  HandleInfraError = 'HandleInfraError',
  CreateTicket = 'CreateTicket',
  SearchTicketByName = 'SearchTicketByName',
  AddCommentToTicket = 'AddCommentToTicket',
  ReopenTicket = 'ReopenTicket',
}

export enum GCPInfraToJiraServiceActions {
  ReceivedWebhookData = 'ReceivedWebhookData',
  TicketExistsAddingComment = 'TicketExistsAddingComment',
  FewTicketsFoundCreatingNewTicket = 'FewTicketsFoundCreatingNewTicket',
  TicketNotExistCreatingNewTicket = 'TicketNotExistCreatingNewTicket',
  TicketCreated = 'TicketCreated',
  ErrorCreatingTicket = 'ErrorCreatingTicket',
  ErrorSearchingTicket = 'ErrorSearchingTicket',
  CommentAdded = 'CommentAdded',
  ErrorAddingComment = 'ErrorAddingComment',
  TicketReopened = 'TicketReopened',
  ErrorReopeningTicket = 'ErrorReopeningTicket',
}
