import { HydratedDocument, model, Schema, Types } from "mongoose";

export const ProjectMemberRole = {
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  MEMBER: "MEMBER",
} as const;

export type ProjectMemberRoleType = typeof ProjectMemberRole[keyof typeof ProjectMemberRole];

export interface ProjectMember {
  projectId: Types.ObjectId;
  teamId: Types.ObjectId;
  userId: Types.ObjectId;
  role: ProjectMemberRoleType;
}

export type ProjectMemberDocument = HydratedDocument<ProjectMember>;

const projectMemberSchema = new Schema<ProjectMember>({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
  teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  role: {
    type: String,
    enum: Object.values(ProjectMemberRole),
    default: ProjectMemberRole.MEMBER,
  },
}, { timestamps: true });

// un user = un seul rôle par projet
projectMemberSchema.index({ projectId: 1, userId: 1 }, { unique: true });

const ProjectMemberModel = model<ProjectMember>(
    "ProjectMember", 
    projectMemberSchema,
     "project_members"
);
export default ProjectMemberModel;