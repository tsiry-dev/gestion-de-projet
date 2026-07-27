import { HydratedDocument, model, Schema, Types } from "mongoose";


export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
  CANCELLED: "CANCELLED",
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export interface Task {
    projectId: Types.ObjectId,
    title: string,
    status: TaskStatusType,
}

export type TaskDocument = HydratedDocument<Task>;

const taskSchema = new Schema<Task>({
    projectId: {
        type: Types.ObjectId,
        ref: "Project",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.TODO
    }
}, { 
    timestamps: true
});

const TaskModel = model<Task>(
    "Task",
    taskSchema,
    "tasks"
);

export default TaskModel;
