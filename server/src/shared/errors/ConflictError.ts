import { ErrorCode } from "@/shared/constants/error-code";
import { AppError } from "@/shared/errors/AppError";

export class ConflictError extends AppError {
    constructor(message = "Conflict", errors: any = {}) {
        super(message, 409, ErrorCode.CONFLICT, errors);
    }
}