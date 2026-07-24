export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorCode: string,
    public errors: any = {}
  ) {
    super(message);

    // ✔ important pour stack trace propre
    Error.captureStackTrace(this, this.constructor);
  }
}