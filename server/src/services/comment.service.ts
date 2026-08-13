import TaskModel from "@/models/task.model";
import { BadRequestError } from "@/shared/errors/BadRequestError";
import { ForbiddenError } from "@/shared/errors/ForbiddenError";
import { NotFoundError } from "@/shared/errors/NotFoundError";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { CreateCommentDTO } from "@/shared/validators/comment.schema";
import { Types } from "mongoose";

export class CommentService {
    public async create (data: CreateCommentDTO, userId: string | undefined) {
        if(!userId) {
            throw new UnauthorizedError(
                'Utilisateur non authentifier!'
            );
        }

        if (!Types.ObjectId.isValid(data.taskId)) {
            throw new BadRequestError(
                "Identifiant de tâche invalide"
            );
        }

        const task = await TaskModel.findOne(
            { _id: data.taskId }
        );

        if(!task) {
            throw new NotFoundError(
                'Tache non trouvé!'
            );
        }

        if (
            data.ownerProject !== userId &&
            (!task.teamId || task.teamId.toString() !== userId)
        ) {
            throw new ForbiddenError(
                "Vous n'êtes pas autorisé à commenter cette tâche !"
            );
        }

        task.comments.push({
            userId: new Types.ObjectId(userId),
            content: data.content,
            isView: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await task.save();
        return task;
      
    } 

    public async update () {
       
    } 

    public async remove () {
     
    } 
}