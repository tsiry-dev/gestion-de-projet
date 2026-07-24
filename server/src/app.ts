import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "@/config/app.config";
import projectRoutes from "@/routes/project.route";
import { errorHandler } from "@/middlewares/errorHandler.middleware";
import taskRoutes from "@/routes/task.route";

const app = express();
const BASE_API = config.BASE_API || "/api/v1";

app.use(helmet());
if(config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors({
  origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://192.168.1.181:5173",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"] // 🔥 IMPORTANT
}));

app.use(express.json());
app.use(cookieParser()); 



app.get("/", async function(_req: Request, res: Response) {
    res.json({
        message: "Server is runing"
    });
});


app.use(`${BASE_API}/projects`, projectRoutes);
app.use(`${BASE_API}/tasks`, taskRoutes);

app.use(errorHandler);

export default app;