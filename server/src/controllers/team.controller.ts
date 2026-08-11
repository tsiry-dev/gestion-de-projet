import { HTTPSTATUS } from "@/config/http.config";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware";
import { TeamService } from "@/services/team.service";
import { addTeamSchema, reassignTeamSchema } from "@/shared/validators/team.schema";
import { Request, RequestHandler, Response } from "express";

export class TeamController {

  private teamService = new TeamService();

  public searchMember: RequestHandler = asyncHandler(
     async (req: Request, res: Response) =>{
        const query = req.query.query as string;

        const users = await this.teamService.search(query);

        return res.status(HTTPSTATUS.OK).json({
            teams: users
        });
     }
  );

  public addTeam: RequestHandler = asyncHandler(
      async(req: Request, res: Response) => {
          const data = addTeamSchema.parse(req.body);
          const team = await this.teamService.addTeam(data);
          console.log(team);

          return res.json({
            message: "Team added successfully",
            team
          });
      }
  );

  public remove: RequestHandler = asyncHandler(
      async(req: Request, res: Response) => {
         const id = req.params.id as string;
         await this.teamService.remove(id);

         return res.status(HTTPSTATUS.OK).json({
            message: "Suppression avec success!",
            id
         });
      }
  );

  public reassign: RequestHandler = asyncHandler(
    async(req: Request, res: Response) => {
       const data = reassignTeamSchema.parse(req.body);
       const team = await this.teamService.reassign(data);

       return res.status(HTTPSTATUS.OK).json({
         message: 'Reassignation de team avc success!',
         team
       });
    }
  );

}