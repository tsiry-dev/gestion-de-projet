import { HTTPSTATUS } from "@/config/http.config";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware";
import TaskModel from "@/models/task.model";
import { TaskService } from "@/services/task.service";
import { 
    createTaskSchema, 
    removeTaskIdsSchema, 
    taskIdSchema, 
    updateTaskSchema, 
    updateTaskStatusSchema 
} from "@/shared/validators/task.schema";

import { Request, Response } from "express";

export class TaskController {
    private taskService;

    constructor() {
        this.taskService = new TaskService();
        console.log(this.taskService);
    }

    public create = asyncHandler(
        async(req: Request, res: Response) => {
            console.log(req.body);
           const body = createTaskSchema.parse(req.body);
           const task = await this.taskService.create(body);

           return res.status(HTTPSTATUS.OK).json({
              message: "Ajout task avec success!",
              task: task
           });
        }
    );

    public getAll = asyncHandler(
      async(_req: Request, res: Response) => {
           const tasks = await this.taskService.getAll();
           return res.status(200).json({
              message: "Trouvé tous les taches a faires!",
              tasks: tasks
           })
      }
    );

    public findById = asyncHandler(
        async (req: Request, res: Response) => {
            const { id } = taskIdSchema.parse(req.params);

            const task = await this.taskService.find(id);

            return res.status(HTTPSTATUS.OK).json({
                message: "Find task by ID",
                task: task
            });
        }
    );

    public update = asyncHandler(
        async(req: Request, res: Response) => {
           const { id } = req.params;
           const data = updateTaskSchema.parse({id, ...req.body});
           const task = await this.taskService.update(data);

           return res.status(HTTPSTATUS.OK).json({
               message: "Task updated successfully",
               task: task
           });
        }
    );

    public remove = asyncHandler(
        async(req: Request, res: Response) => {
           const { id } = taskIdSchema.parse(req.params);
           await this.taskService.remove(id);

           return res.status(HTTPSTATUS.OK).json({
               message: "Task deleted successfully",
               id: id
           });
        }
    );

    public removeAll = asyncHandler(
        async(req: Request, res: Response) => {
           const { ids } =  removeTaskIdsSchema.parse(req.body);
           await this.taskService.removeAll(ids);

           return res.status(HTTPSTATUS.OK).json({
               message: "All task are deleted successfully",
               taskIds: ids
           });
        }
    );

    public updateStatus = asyncHandler(
    async (req: Request, res: Response) => {
        console.log(req.body);
        const body = updateTaskStatusSchema.parse(req.body);

        const task = await TaskModel.findByIdAndUpdate(
            body.taskId,
            {
                status: body.status
            },
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        return res.status(200).json({
            message: "Statut modifié avec succès",
            data: task
        });
    }
    );

}