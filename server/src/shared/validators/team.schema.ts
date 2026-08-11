import z from "zod";

export const addTeamSchema = z.object({
  projectId: z.string(),
  userId: z.string(),
});

export type AddTeamDTO = z.infer<typeof addTeamSchema>;

export const reassignTeamSchema = z.object({
  taskId: z.string(),
  teamId: z.string(),
});

export type ReassignTeamDTO = z.infer<typeof reassignTeamSchema>;