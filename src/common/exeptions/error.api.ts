export default class ApiError<E = null> extends Error {
  readonly status: number;
  readonly errors: E | null = null;
  readonly name = 'Api Error';

  constructor(status: number, message: string, errors: E | null = null) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest<E>(status = 400, message = 'Bad request', errors: E | null = null) {
    return new ApiError<E>(status, message, errors);
  }

  static Unauthorized() {
    return new ApiError(401, 'Unauthorized');
  }

  static Forbidden() {
    return new ApiError(403, 'Forbidden');
  }

  static Internal() {
    return new ApiError(500, 'Internal');
  }

  static NotFound() {
    return new ApiError(404, 'Not found');
  }
}
