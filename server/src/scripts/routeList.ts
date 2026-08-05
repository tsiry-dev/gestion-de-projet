import "tsconfig-paths/register";
import "dotenv/config";
import expressListRoutes from "express-list-routes";
import { config } from "@/config/app.config";
import projectRoutes from "@/routes/project.route";
import taskRoutes from "@/routes/task.route";
import authRoutes from "@/routes/auth.route";
import teamRoutes from "@/routes/team.route";

const BASE_API = config.BASE_API;

console.log("\n\x1b[1m\x1b[36m┌─────────────────────────────┐\x1b[0m");
console.log(  "\x1b[1m\x1b[36m│        📋 List Routes       │\x1b[0m");
console.log(  "\x1b[1m\x1b[36m└─────────────────────────────┘\x1b[0m");

// expressListRoutes(app, { prefix: BASE_API });

console.log("\n\x1b[1m\x1b[36m**********🔐 AUTH **********\x1b[0m");
expressListRoutes(authRoutes, { prefix: `${BASE_API}/auth` });

console.log("\n\x1b[1m\x1b[36m**********🔐 PROJECT**********\x1b[0m");
expressListRoutes(projectRoutes, { prefix: `${BASE_API}/projects` });

console.log("\n\x1b[1m\x1b[36m**********🔐 TASKS **********\x1b[0m");
expressListRoutes(taskRoutes, { prefix: `${BASE_API}/tasks` });

console.log("\n\x1b[1m\x1b[36m**********🔐 TEAMS **********\x1b[0m");
expressListRoutes(teamRoutes, { prefix: `${BASE_API}/teams` });


