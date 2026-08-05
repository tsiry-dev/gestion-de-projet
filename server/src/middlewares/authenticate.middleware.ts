import { RequestHandler } from "express";
import { asyncHandler } from "./asyncHandler.middleware";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { JwtUtils } from "@/shared/utils/jwt";
import { NotFoundError } from "@/shared/errors/NotFoundError";

export const authenticate: RequestHandler = asyncHandler(
    async(req, _res, next)=>{

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError("Authentification requise.");
        }


        const token = authHeader.split(" ")[1];
        console.log("Backend receive token: ",token);

        if (!token) {
            throw new NotFoundError("Token non trouvé !");
        }


        let payload;

        try {
            payload = JwtUtils.verifyAccessToken(token);

        } catch (error) {
            throw new UnauthorizedError(
                "Token invalide ou expiré !"
            );
        }


        req.user = payload;

        next();
    }
);