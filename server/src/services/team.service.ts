import ProjectModel from "@/models/project.model";
import TeamModel from "@/models/team.model";
import UserModel from "@/models/user.model";
import { ConflictError } from "@/shared/errors/ConflictError";
import { NotFoundError } from "@/shared/errors/NotFoundError";
import { AddTeamDTO } from "@/shared/validators/team.schema";
import mongoose from "mongoose";

export class TeamService {
  public async search(query?: string) {
     if (!query) {
            return UserModel.find()
                .select("_id name email")
                .limit(20);
        }


        return UserModel.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: query,
                        $options: "i"
                    }
                }
            ]
        })
        .select("_id name email")
        .limit(20);
  }

  public async addTeam(data: AddTeamDTO) {
    const { projectId, userId } = data;


    // 1 - Vérifier que le projet existe
    const project = await ProjectModel.findById(projectId);

    if (!project) {
        throw new NotFoundError(
            "Projet introuvable."
        );
    }


    // 2 - Récupérer la team du projet
    const team = await TeamModel.findOne({
        projectId: project._id
    });


    if (!team) {
        throw new NotFoundError(
            "Equipe introuvable pour ce projet."
        );
    }


    // 3 - Vérifier si l'utilisateur existe déjà
    const alreadyMember = team.members.some(
        (member) =>
            member.userId?.toString() === userId
    );


    if (alreadyMember) {
        throw new ConflictError(
            "Cet utilisateur est déjà membre de l'équipe."
        );
    }

    const role = "MEMBER";
    // 4 - Ajouter le membre
    team.members.push({
        userId: new mongoose.Types.ObjectId(userId),
        role
    });


    // 5 - Sauvegarder
    await team.save();

    const updatedTeam = await TeamModel
        .findById(team._id)
        .populate({
            path: "members.userId",
            select: "_id name email"
        });


    return updatedTeam;
  }
}