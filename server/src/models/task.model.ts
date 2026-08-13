import { HydratedDocument, model, Schema, Types } from "mongoose";

export const TaskStatus = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    IN_REVIEW: "IN_REVIEW",
    DONE: "DONE",
    CANCELLED: "CANCELLED",
} as const;

export type TaskStatusType =
    typeof TaskStatus[keyof typeof TaskStatus];


// ─────────────────────────────────────────────
// Comment
// ─────────────────────────────────────────────

export interface Comment {
    userId: Types.ObjectId;
    content: string;
    isView: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ─────────────────────────────────────────────
// Task
// ─────────────────────────────────────────────

export interface Task {
    projectId: Types.ObjectId;
    teamId: Types.ObjectId | null;
    title: string;
    status: TaskStatusType;
    comments: Comment[];
}


export type TaskDocument = HydratedDocument<Task>;


// ─────────────────────────────────────────────
// Comment Schema
// ─────────────────────────────────────────────

const commentSchema = new Schema<Comment>(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
        isView:  {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        _id: true,
    }
);


// ─────────────────────────────────────────────
// Task Schema
// ─────────────────────────────────────────────

const taskSchema = new Schema<Task>(
    {
        projectId: {
            type: Types.ObjectId,
            ref: "Project",
            required: true,
            index: true,
        },

        teamId: {
            type: Types.ObjectId,
            ref: "User",
            default: null,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: Object.values(TaskStatus),
            default: TaskStatus.TODO,
        },

        comments: {
            type: [commentSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);


const TaskModel = model<Task>(
    "Task",
    taskSchema,
    "tasks"
);

export default TaskModel;
