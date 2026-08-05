// team.model.ts

import mongoose, { Schema, model } from "mongoose";

export interface Team {
    name: string;

    projectId: mongoose.Types.ObjectId;

    members: {
        userId?: mongoose.Types.ObjectId | null;

        role: "OWNER" | "MANAGER" | "MEMBER";
    }[];
}
const teamSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },

    members: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },

            role: {
                type: String,
                enum: ["OWNER", "MANAGER","MEMBER"],
                default: "MEMBER"
            }
        }
    ]

}, {
    timestamps: true
});

const TeamModel = model("Team", teamSchema, "teams");
export default TeamModel;