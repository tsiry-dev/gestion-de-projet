import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "@/config/app.config";

export interface AccessTokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  userId: string;
}

export interface UserPayload {
    userId: string;
    iat?: number;
    exp?: number;
    aud?: string;
}


export class JwtUtils {
    public static signAccessToken(payload: AccessTokenPayload): string {
        const options: SignOptions = {
          audience: "user",
        };
        
        if (config.JWT.EXPIRES_IN) {
          options.expiresIn = config.JWT.EXPIRES_IN;
        }

        return jwt.sign(payload, config.JWT.SECRET, options);
    }

    public static signRefreshToken(payload: RefreshTokenPayload): string {
        const options: SignOptions = {
          audience: "user",
        };
        
        if (config.JWT.REFRESH_EXPIRES_IN) {
          options.expiresIn = config.JWT.REFRESH_EXPIRES_IN;
        }

        return jwt.sign(payload, config.JWT.REFRESH_SECRET, options);
    }

    public static verifyAccessToken(token: string): AccessTokenPayload {
        return jwt.verify(token, config.JWT.SECRET) as AccessTokenPayload;
    }

    public static verifyRefreshToken(token: string): RefreshTokenPayload {
        return jwt.verify(token, config.JWT.REFRESH_SECRET) as RefreshTokenPayload;
  }
}