import type {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyListenOptions,
  FastifyPluginCallback,
  FastifyPluginOptions,
  FastifyRegisterOptions,
  FastifyError,
  FastifyRequest,
  FastifyReply,
  FastifySchemaCompiler,
  FastifyContentTypeParser,
} from 'fastify';

export default class App<S extends FastifyInstance> {
  public readonly log: FastifyBaseLogger;
  private readonly app: S;
  private readonly signals = ['SIGINT', 'SIGTERM'];

  constructor(app: S) {
    this.app = app;
    this.log = app.log;
    this.listeners();
  }

  public listen(options: FastifyListenOptions) {
    return this.app.listen(options);
  }

  public close() {
    return this.app.close();
  }

  public register<O extends FastifyPluginOptions>(
    plugin: FastifyPluginCallback<O>,
    options?: FastifyRegisterOptions<O>
  ) {
    this.app.register(plugin, options);
    return this;
  }

  public setErrorHandler(
    handler: (
      this: FastifyInstance,
      e: FastifyError,
      request: FastifyRequest,
      reply: FastifyReply
    ) => void
  ) {
    this.app.setErrorHandler(handler);
    return this;
  }

  private listeners() {
    this.signals.forEach((signal) => process.on(signal, this.shutdown.bind(this)));
  }

  private shutdown(signal: string) {
    this.app.log.info({ signal }, 'App closing...');
    this.close().then(() => process.exit(0));
  }

  public setValidatorCompiler<T>(compiler: FastifySchemaCompiler<T>) {
    this.app.setValidatorCompiler(compiler);
    return this;
  }

  public addContentTypeParser(type: string | RegExp | string[], parser: FastifyContentTypeParser) {
    this.app.addContentTypeParser(type, parser);
    return this;
  }
}
