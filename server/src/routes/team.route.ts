import { TeamController } from "@/controllers/team.controller";
import { Router } from "express";

const teamRoutes = Router();

const teamController = new TeamController();

teamRoutes.get('/search', teamController.searchMember);
teamRoutes.post('/add', teamController.addTeam);
teamRoutes.delete('/remove/:id', teamController.remove);
teamRoutes.post('/reassign', teamController.reassign);

export default teamRoutes;

