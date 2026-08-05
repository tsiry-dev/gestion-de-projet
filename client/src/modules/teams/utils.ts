import type { RoleTeamType } from "./type";


export function printTeamRole(role: RoleTeamType) {
    switch(role) {
        case "OWNER":
           return "Propriétaire";
        case "MANAGER":
           return "Manger";
        case "MEMBER":
           return "Membre";
        default:
           return "Unknown";
    }
}