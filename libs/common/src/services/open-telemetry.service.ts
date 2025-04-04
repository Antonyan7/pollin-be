import {Injectable} from '@nestjs/common'
import opentelemetry, {Tracer, Span, Attributes} from '@opentelemetry/api'
import {NodeTracerProvider} from '@opentelemetry/sdk-trace-node'
import {registerInstrumentations} from '@opentelemetry/instrumentation'
import {HttpInstrumentation} from '@opentelemetry/instrumentation-http'
import {NestInstrumentation} from '@opentelemetry/instrumentation-nestjs-core'
import {FastifyInstrumentation} from '@opentelemetry/instrumentation-fastify'

@Injectable()
export class OpenTelemetryService {
  private provider: NodeTracerProvider
  private tracer: Tracer

  constructor() {
    // Enable OpenTelemetry exporters to export traces to Google Cloud Trace.
    // Exporters use Application Default Credentials (ADCs) to authenticate.
    // See https://developers.google.com/identity/protocols/application-default-credentials
    // for more details.
    this.provider = new NodeTracerProvider()
    this.provider.register()

    // Register auto instrumentation packages
    // https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node
    registerInstrumentations({
      tracerProvider: this.provider,
      instrumentations: [
        // Fastify instrumentation expects HTTP layer to be instrumented
        new HttpInstrumentation(),
        new FastifyInstrumentation(),
        new NestInstrumentation(),
      ],
    })

    // Initialize the OpenTelemetry APIs to use the
    // NodeTracerProvider bindings
    opentelemetry.trace.setGlobalTracerProvider(this.provider)
    this.tracer = opentelemetry.trace.getTracer('basic')
  }

  /**
   * Creates Span in GCP Trace. Be sure to end the span after starting it - `span.end()`
   */
  startSpan(name: string, attributes: Attributes = {}): Span {
    // Create a span.
    const span = this.tracer.startSpan(name)

    // Set attributes to the span.
    span.setAttributes(attributes)

    // Be sure to end the span
    return span
  }
}
