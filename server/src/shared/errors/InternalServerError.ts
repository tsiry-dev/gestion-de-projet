import { AppError } from "@/shared/errors/AppError";

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error", errors: any = {}) {
    super(message, 500, "INTERNAL_SERVER_ERROR", errors);
  }
}