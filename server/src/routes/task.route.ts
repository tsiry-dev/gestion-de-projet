import { TaskController } from "@/controllers/task.controller";
import { Router } from "express";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.get("/", taskController.getAll);
taskRoutes.get("/:id", taskController.findById);


taskRoutes.post("/create", taskController.create);

taskRoutes.patch("/update/:id", taskController.update);
taskRoutes.put("/update/status", taskController.updateStatus);

taskRoutes.delete("/remove/all", taskController.removeAll);
taskRoutes.delete("/remove/:id", taskController.remove);

export default taskRoutes;