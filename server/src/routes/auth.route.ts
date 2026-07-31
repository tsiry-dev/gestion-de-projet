import { AuthController } from "@/controllers/auth.controller";
import { authenticate } from "@/middlewares/authenticate.middleware";
import { Router } from "express";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/refresh", authController.refreshToken);
authRoutes.get("/me", authenticate ,authController.me);

export default authRoutes;