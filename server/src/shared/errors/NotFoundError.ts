import { AppError } from "@/shared/errors/AppError";
import { ErrorCode } from "@/shared/constants/error-code";

export class NotFoundError extends AppError {
  constructor(message = "Introuvable", errors: any = {}) {
    super(message, 404, ErrorCode.NOT_FOUND, errors);
  }
}