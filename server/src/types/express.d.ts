import { UserPayload } from "@/shared/utils/jwt";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export {};