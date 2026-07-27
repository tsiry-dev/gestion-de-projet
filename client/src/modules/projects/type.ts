export const ProjectStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;


export type StatusType =
  typeof ProjectStatus[keyof typeof ProjectStatus];

  export type Project = {
    _id: string;
    title: string;
    description: string;
    status: StatusType;
    taskCount: number;
  };
  