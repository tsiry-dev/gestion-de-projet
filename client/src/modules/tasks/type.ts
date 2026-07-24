export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
  CANCELLED: "CANCELLED",
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];


export type TaskType = {
    projectId: string;
    title: string,
    status: TaskStatusType,
    startDate?: Date,
    endDate?: Date
}


export type UpdateTaskStatusDTO = {
  taskId: string;
  status: TaskStatusType
}