import { Request, RequestHandler, Response } from "express";
import { HTTPSTATUS } from "@/config/http.config";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware";
import { loginSchema, registerSchema } from "@/shared/validators/auth.schema";
import { AuthService } from "@/services/auth.service";

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
         const {} = await this.authServive.login(data);

         return res.status(HTTPSTATUS.OK).json({
            message: "Connexion réussit!",
            user: data
         });
      }
   );

}