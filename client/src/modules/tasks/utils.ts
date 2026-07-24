import type { TaskStatusType, TaskType } from "./type";

export const taskCount = (
  tasks: TaskType[] = [],
  status: TaskStatusType
): number => {
  return tasks.filter((task) => task.status === status).length;
};