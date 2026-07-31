import { config } from "@/config/app.config";
import { CookieOptions, Response } from "express"
import { calculateExpirationDate } from "./date-time";

export const REFRESH_PATH = `${config.BASE_API}/auth/refresh`;

export type CookiePayloadType = {
    res: Response;
    refreshToken: string;
}

export const defaults: CookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === "production" ? true : false,
    sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
}

export const getRefreshTokenCookieOptions = (): CookieOptions => {
    const expiresIn = config.JWT.REFRESH_EXPIRES_IN as string;
    const expires = calculateExpirationDate(expiresIn);

    return  {
        ...defaults,
        expires,
        path: REFRESH_PATH
    }
}

export const getAccessTokenCookieOptions = (): CookieOptions => {
    const expiresIn = config.JWT.EXPIRES_IN as string;
    const expires = calculateExpirationDate(expiresIn);

    return  {
        ...defaults,
        expires,
        path: "/",
    }
}

export const setAuthenticationCookie = ({
  res,
  refreshToken,
}: CookiePayloadType): Response => {
    return res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false, // dev
        sameSite: "lax",
        path: "/", // 🔥 IMPORTANT (PAS /refresh)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 semaine
    });
};