export const ProjectStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
  CANCELLED: "CANCELLED",
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
  