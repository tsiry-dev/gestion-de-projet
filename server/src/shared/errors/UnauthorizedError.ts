import { AppError } from "@/shared/errors/AppError";
import { ErrorCode } from "@/shared/constants/error-code";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", errors: any = {}) {
    super(message, 401, ErrorCode.ACCESS_UNAUTHORIZED, errors);
  }
}