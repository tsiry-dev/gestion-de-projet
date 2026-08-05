export const RoleTeam = {
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  MEMBER: "MEMBER"
} as const;


export type RoleTeamType = (typeof RoleTeam)[keyof typeof RoleTeam];
