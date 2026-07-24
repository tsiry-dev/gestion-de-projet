import { ProjectController } from "@/controllers/project.controller";
import { Router } from "express";

const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.get("/", projectController.findAll);
projectRoutes.get("/count", projectController.getCount);
projectRoutes.get("/:id/tasks", projectController.findByIdWithAllTask);
projectRoutes.get("/:id", projectController.findById);

projectRoutes.post("/create", projectController.create);

projectRoutes.patch("/update", projectController.update);


projectRoutes.delete("/remove/all", projectController.removeAll);
projectRoutes.delete("/remove/:id", projectController.remove);



export default projectRoutes;