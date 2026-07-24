import { HTTPSTATUS } from "@/config/http.config";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware";
import { ProjectService } from "@/services/project.service";
import { createProjectSchema, projectIdSchema, removeIdsSchema, updateProjectSchema } from "@/shared/validators/project.schema";
import { Request, Response } from "express";

export class ProjectController {
    private projectService;

    constructor() {
        this.projectService = new ProjectService();
        console.log(this.projectService);
    }

    public create = asyncHandler(
        async (req: Request, res: Response) => {
            const body = req.body;
             console.log("API DATA :", body);
            const projectData = createProjectSchema.parse(body);
            const project = await this.projectService.create(projectData);

            return res.status(HTTPSTATUS.CREATED).json({
                project
            })
        }
    );

    public findAll = asyncHandler(
        async (_req: Request, res: Response) => {
            
            const projects = await this.projectService.findAll();

            return res.status(HTTPSTATUS.OK).json({
                projects
            })
        }
    );

    public findById = asyncHandler(
        async (req: Request,res: Response) => {
            const { id } = projectIdSchema.parse(req.params);
            const project = await this.projectService.findById(id);

            return res.status(HTTPSTATUS.OK).json({
                project
            })
        }
    );

    public findByIdWithAllTask = asyncHandler(
        async (req: Request, res: Response) => {
            const { id } =  projectIdSchema.parse(req.params);
            const { project, tasks } = await this.projectService.findWithTask(id);

            return res.status(HTTPSTATUS.OK).json({
                project, tasks
            })
        }
    );

    public remove = asyncHandler(
        async (req: Request, res: Response) => {
            const { id } = projectIdSchema.parse(req.params);
            
            await this.projectService.remove(id);

            return res.status(HTTPSTATUS.OK).json({
                message: `Le projet id: ${id} a été supprimé!`,
            })
        }
    );

    public removeAll = asyncHandler(
        async (req: Request, res: Response) => {
            const { ids } = removeIdsSchema.parse(req.body);            
            
            await this.projectService.removeAll(ids);

            return res.status(HTTPSTATUS.OK).json({
                message: "Les projets on etet supprimé avec success!!",
                projectIds: ids
            })
        }
    );

    public getCount = asyncHandler(
        async(_req: Request, res: Response) => {
            const count = await this.projectService.getCount();

            return res.status(HTTPSTATUS.OK).json({
                message: "Nombre des projets!!",
                count
            });
        }
    );

    public update = asyncHandler(
        async(req: Request, res: Response) => {

            console.log(req.body)

            const data = updateProjectSchema.parse(req.body);

            const project = await this.projectService.update(data);

            return res.status(HTTPSTATUS.OK).json({
               message: "Mis à jour avec success!",
               project: project
            });
        }
    );


}