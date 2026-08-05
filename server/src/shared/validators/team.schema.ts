import z from "zod";

export const addTeamSchema = z.object({
  projectId: z.string(),
  userId: z.string(),
});

export type AddTeamDTO = z.infer<typeof addTeamSchema>;