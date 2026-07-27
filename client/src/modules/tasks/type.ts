export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
  CANCELLED: "CANCELLED",
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];


export type TaskType = {
    _id: string;
    projectId: string;
    title: string,
    status: TaskStatusType,
}


export type UpdateTaskStatusDTO = {
  taskId: string;
  status: TaskStatusType
}

export type UpdateTaskDTO = {
   id: string;
   title: string;
}