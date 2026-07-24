import { AppError } from "@/shared/errors/AppError";


export class ValidationError extends AppError {
  constructor(message = "Validation Error", errors: any = {}) {
    super(message, 400, "VALIDATION_ERROR", errors);
  }
}