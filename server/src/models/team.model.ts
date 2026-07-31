import { HydratedDocument, model, Schema, Types } from "mongoose";

export interface Team {
  name: string;
  projectId: Types.ObjectId; // relation 1-1 : un seul projet par team
}

export type TeamDocument = HydratedDocument<Team>;

const teamSchema = new Schema<Team>({
  name: { type: String, required: true, trim: true },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
    unique: true, // <- garantit le 1-1
  },
}, { timestamps: true });

const TeamModel = model<Team>(
    "Team", 
    teamSchema,
    "teams"
);
export default TeamModel;