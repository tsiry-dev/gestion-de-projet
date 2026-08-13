export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
  CANCELLED: "CANCELLED",
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export type Comment = {
  _id: string;
  userId: string;
  content: string;
  isView: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserAssigned = {
  email: string;
  name: string;
  _id: string;
}

export type TaskType = {
    _id: string;
    projectId: string;
    title: string,
    status: TaskStatusType,
    teamId: UserAssigned | null,
    comments: Comment[],
}

export type UpdateTaskStatusDTO = {
  taskId: string;
  status: TaskStatusType
}

export type UpdateTaskDTO = {
   id: string;
   title: string;
}