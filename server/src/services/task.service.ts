import TaskModel, { Task } from "@/models/task.model";
import { NotFoundError } from "@/shared/errors/NotFoundError";
import { createTaskDTO, UpdateTaskDTO } from "@/shared/validators/task.schema";

export class TaskService {
    public async create(data: createTaskDTO): Promise<Task> {
       const task = await TaskModel.create(data);
       return task;
    }

    public async getAll(): Promise<Task[]> {
       return await TaskModel.find().populate('teamId');
    }

    public async find(id: string): Promise<Task | null> {
        const task = await TaskModel.findById(id);

        if(!task) {
            throw new NotFoundError(
                "Tache non trouvé"
            );
        }
        return task;
    }

    public async update(data: UpdateTaskDTO): Promise<Task> {
        const {id, ...updatedData } = data
        const task = await TaskModel.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true,
                runValidators: true
            }
        );

        if(!task) {
            throw new NotFoundError('Le tache n\'existe pas')
        }

        return task;
    }

    public async remove(id: string): Promise<void> {
        await TaskModel.findByIdAndDelete(id);
    }

    public async removeAll(ids: string[]): Promise<void> {
        for(const id of ids) {
            await TaskModel.findByIdAndDelete(id);
        }
    }
}