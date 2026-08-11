export const RoleTeam = {
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  MEMBER: "MEMBER"
} as const;


export type RoleTeamType = (typeof RoleTeam)[keyof typeof RoleTeam];


export type Member = {
  role: RoleTeamType;
  userId: {
    email: string;
    name: string;
    _id: string;
  }
  _id: string;
}
