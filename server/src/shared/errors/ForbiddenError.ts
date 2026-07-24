import { HTTPSTATUS } from "@/config/http.config";
import { AppError } from "@/shared/errors/AppError";
import { ErrorCode } from "@/shared/constants/error-code";

export class ForbiddenError extends AppError {
    constructor(message = "Accès non autorisé", errors: any = {}) {
        super(
            message, 
            HTTPSTATUS.FORBIDDEN,
            ErrorCode.FORBIDDEN , 
            errors
        );
    }
}