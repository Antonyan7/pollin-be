import {Span} from '@opentelemetry/api'

export class OpenTelemetryService {
  startSpan(_: string, __ = {}): Span {
    return {
      end: jest.fn(),
    } as unknown as Span
  }
}
