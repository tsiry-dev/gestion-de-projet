import { HTTPSTATUS } from "@/config/http.config";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware";
import { ProjectService } from "@/services/project.service";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { createProjectSchema, projectIdSchema, removeIdsSchema, updateProjectSchema } from "@/shared/validators/project.schema";
import { Request, Response, RequestHandler } from "express";

export class ProjectController {
    private projectService;

    constructor() {
        this.projectService = new ProjectService();
    }

    public create: RequestHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const body = req.body;
            const data = {
                ownerId: req.user?.userId,
                ...body
            }
            const projectData = createProjectSchema.parse(data);
            const project = await this.projectService.create(projectData);

            return res.status(HTTPSTATUS.CREATED).json({
                project
            })
        }
    );

    public findAll: RequestHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const ownerId = req.user?.userId;

            if(!ownerId){
                throw new UnauthorizedError(
                    "Utilisateur non authentifié"
                );
            }
            const projects = await this.projectService.findAll(ownerId);

            return res.status(HTTPSTATUS.OK).json({
                projects
            })
        }
    );

    public findById: RequestHandler = asyncHandler(
        async (req: Request,res: Response) => {
            const { id } = projectIdSchema.parse(req.params);
            const project = await this.projectService.findById(id);

            return res.status(HTTPSTATUS.OK).json({
                project
            })
        }
    );

    public findByIdWithAllTask: RequestHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const { id } =  projectIdSchema.parse(req.params);
            const { project, tasks, team } = await this.projectService.findWithTask(id);

            return res.status(HTTPSTATUS.OK).json({
                project, tasks, team
            })
        }
    );

    public remove: RequestHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const { id } = projectIdSchema.parse(req.params);
            
            await this.projectService.remove(id);

            return res.status(HTTPSTATUS.OK).json({
                message: `Le projet id: ${id} a été supprimé!`,
            })
        }
    );

    public removeAll: RequestHandler = asyncHandler(
        async (req: Request, res: Response) => {
            const { ids } = removeIdsSchema.parse(req.body);            
            
            await this.projectService.removeAll(ids);

            return res.status(HTTPSTATUS.OK).json({
                message: "Les projets on etet supprimé avec success!!",
                projectIds: ids
            })
        }
    );

    public getCount: RequestHandler = asyncHandler(
        async(_req: Request, res: Response) => {
            const count = await this.projectService.getCount();

            return res.status(HTTPSTATUS.OK).json({
                message: "Nombre des projets!!",
                count
            });
        }
    );

    public update: RequestHandler = asyncHandler(
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