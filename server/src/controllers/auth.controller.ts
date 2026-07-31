import { Request, RequestHandler, Response } from "express";
import { HTTPSTATUS } from "@/config/http.config";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware";
import { loginSchema, registerSchema } from "@/shared/validators/auth.schema";
import { AuthService } from "@/services/auth.service";
import { setAuthenticationCookie } from "@/shared/utils/cookie";

export class AuthController {

   private authServive;

   constructor() {
      this.authServive = new AuthService();
   }

   public register: RequestHandler = asyncHandler(
      async(req: Request, res: Response) => {
         const data = registerSchema.parse(req.body);
         const user = await this.authServive.register(data);
        
         return res.status(HTTPSTATUS.OK).json({
            message: "Inscription réussit!",
            user
         });
      }
   );

   public login: RequestHandler = asyncHandler(
      async(req: Request, res: Response) => {
         const data = loginSchema.parse(req.body);
         const { user, accessToken , refreshToken } = await this.authServive.login(data);

         return setAuthenticationCookie({
            res,
            refreshToken
         }).status(HTTPSTATUS.OK).json({
            message: "Connexion réussit!",
            user,
            accessToken,
         });
      }
   );

   public refreshToken: RequestHandler = asyncHandler(
      async(req: Request, res: Response) => {
         const refreshToken = req.cookies.refresh_token as string | undefined;
         const { newAccessToken, newRefreshToken } = await this.authServive.refreshToken(refreshToken);
         // console.log(payload);

 
         return setAuthenticationCookie({
               res,
               refreshToken: newRefreshToken
         })
         .status(HTTPSTATUS.OK)
         .json({
               message: "Token renouvelé avec succès!",
               accessToken: newAccessToken,
         });
      }
   );

   public me: RequestHandler = asyncHandler(
      async(req: Request, res: Response) => {

         const userId = req.user?.userId;
         const user = await this.authServive.me(userId);

         return res.json({
               user,
         });
      }
   );

}