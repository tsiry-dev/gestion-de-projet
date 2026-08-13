import ProjectModel, { Project } from '@/models/project.model';
import TaskModel, { Task } from '@/models/task.model';
import TeamModel, { Team } from '@/models/team.model';
import { ConflictError } from '@/shared/errors/ConflictError';
import { NotFoundError } from '@/shared/errors/NotFoundError';
import { generateTeamCode } from '@/shared/utils/uuid';
import { CreateProjectDTO, UpdateProjectDTO } from '@/shared/validators/project.schema';
import mongoose from 'mongoose';

export class ProjectService {

    public async create(data: CreateProjectDTO): Promise<Project> {

        const session = await mongoose.startSession();

        try {

            session.startTransaction();

            const { title, description, ownerId } = data;


            const existingProject = await ProjectModel.findOne({ title })
                .session(session);


            if(existingProject){
                throw new ConflictError(
                    'Le projet existe déjà',
                    {
                        title: 'Le projet existe déjà dans la base de données',
                    }
                );
            }


            // 1 - Création du projet
            const [project] = await ProjectModel.create(
                [
                    {
                        title,
                        description,
                        ownerId
                    }
                ],
                {
                    session
                }
            );

            if(!project) {
                throw new NotFoundError(
                    "Le projet n'a pas pu être créé"
                );
            }


            await TeamModel.create(
                [
                    {
                        name: `team-${generateTeamCode()}`,
                        projectId: project._id,
                        members: [
                            {
                                userId: ownerId,
                                role: "OWNER"
                            }
                        ]
                    }
                ],
                {
                    session
                }
            );


            // Valide la transaction
            await session.commitTransaction();


            return project;


        } catch(error) {

            // Annule toutes les opérations
            await session.abortTransaction();

            throw error;

        } finally {

            // Libère la session
            session.endSession();

        }
    }

    public async findAll(userId: string) {

        return ProjectModel.aggregate([
            {
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "team",
                },
            },
            {
                $match: {
                    $or: [
                        {
                            ownerId: new mongoose.Types.ObjectId(userId)
                        },
                        {
                            "team.members.userId": new mongoose.Types.ObjectId(userId)
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "tasks",
                },
            },
            {
                $addFields: {
                    taskCount: {
                        $size: "$tasks",
                    },
                },
            },
            {
                $project: {
                    tasks: 0,
                },
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);
    }

    public async findById(id: string): Promise<Project | null> {
         
        const project = await ProjectModel.findById(id);

        return project;
    }

    public async findWithTask(id: string): Promise<{ 
        project: Project, 
        tasks: Task[],
        team: Team | null
    }> {

        const project = await ProjectModel.findById(id);

        if (!project) {
            throw new NotFoundError("Projet introuvable.");
        }


        const tasks = await TaskModel.find({
            projectId: project._id,
        })
        .populate({
            path: "teamId",
            select: "name email avatar",
        })
        .sort({
            createdAt: -1
        });


        const team = await TeamModel
            .findOne({
                projectId: project._id,
            })
            .populate({
                path: "members.userId",
                select: "name email"
            });


        return {
            project,
            tasks,
            team
        };
    }

    public async remove(id: string): Promise<void> {
        const session = await mongoose.startSession();

        try {
            await session.withTransaction(async () => {
                const existingProject = await ProjectModel
                    .findById(id)
                    .session(session);

                if (!existingProject) {
                    throw new NotFoundError(
                        "Ce projet n'existe pas"
                    );
                }

                await TaskModel.deleteMany(
                    {
                        projectId: existingProject._id,
                    },
                    {
                        session,
                    }
                );

                await TeamModel.deleteOne(
                    {
                        projectId: existingProject._id,
                    },
                    {
                        session,
                    }
                );

                await ProjectModel.findByIdAndDelete(
                    existingProject._id,
                    {
                        session,
                    }
                );
            });
        } finally {
            await session.endSession();
        }
    }

    public async removeAll(ids: string[]): Promise<void> {  
         for(const id of ids) {
             await ProjectModel.findByIdAndDelete(id);
         }
    }

    public async update(data: UpdateProjectDTO): Promise<Project> {
        const { id, ...updateData } = data;

        const existingProject = await ProjectModel.findOne({
            title: updateData.title,
            _id: { $ne: id }, // ignore le projet en cours
        });

        if (existingProject) {
            throw new ConflictError(
                "Le projet existe déjà",
                {
                    title: "Le projet existe déjà dans la base de données",
                }
            );
        }

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedProject) {
            throw new NotFoundError(
                "Ce projet n'existe pas !"
            );
        }

        return updatedProject;
    }

    public async getCount(): Promise<number> {
        return await ProjectModel.countDocuments();
    }

}