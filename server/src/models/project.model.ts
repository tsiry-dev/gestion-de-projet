import { HydratedDocument, model, Schema } from "mongoose";

export const ProjectStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;


export type ProjectStatusType =
  typeof ProjectStatus[keyof typeof ProjectStatus];


export interface Project {
  title: string;
  description?: string;
  status: ProjectStatusType;
}


export type ProjectDocument = HydratedDocument<Project>;


const projectSchema = new Schema<Project>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  description: {
    type: String,
    default: null,
  },

  status: {
    type: String,
    enum: Object.values(ProjectStatus),
    default: ProjectStatus.NOT_STARTED,
  },

}, {
  timestamps: true,
});


const ProjectModel = model<Project>(
  "Project",
  projectSchema
);


export default ProjectModel;