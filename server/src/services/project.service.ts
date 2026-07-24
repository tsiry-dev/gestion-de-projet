import ProjectModel, { Project } from '@/models/project.model';
import TaskModel, { Task } from '@/models/task.model';
import { ConflictError } from '@/shared/errors/ConflictError';
import { NotFoundError } from '@/shared/errors/NotFoundError';
import { CreateProjectDTO, UpdateProjectDTO } from '@/shared/validators/project.schema';

export class ProjectService {
    public async create(data: CreateProjectDTO): Promise<Project> {
       const { title, description } = data;

       const existingProject = await ProjectModel.findOne({ title });

       if (existingProject) {
           throw new ConflictError(
               'Le projet existe déjà', 
               {
                   title: 'Le projet existe déjà dans la base de données',
               }
           );
       }

       return ProjectModel.create({ title, description });
    }

    public async findAll() {
        return ProjectModel.aggregate([
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

    public async findWithTask(id: string): Promise<{ project: Project, tasks: Task[] }> {
        const project = await ProjectModel.findById(id);

        if (!project) {
            throw new NotFoundError("Projet introuvable.");
        }

        const tasks = await TaskModel.find({
            projectId: project._id,
        }).sort({
            createdAt: -1
        });

        return {
            project,
            tasks
        };
    }

    public async remove(id: string):Promise<void> {

        const existingProject = await ProjectModel.findById(id);

        if(!existingProject) {
            throw new NotFoundError(
            "Ce projet n'existe pas"
            );
        }

        await ProjectModel.findByIdAndDelete(id);

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