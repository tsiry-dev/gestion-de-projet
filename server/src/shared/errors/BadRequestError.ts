import { AppError } from "@/shared/errors/AppError";
import { ErrorCode } from "@/shared/constants/error-code";

export class BadRequestError extends AppError {
  constructor(message = "Bad Request", errors: any = {}) {
    super(message, 400, ErrorCode.BAD_REQUEST, errors);
  }
}