import { v4 as uuidv4 } from "uuid";

export const generateTeamCode = (): string => {
    return uuidv4()
        .replace(/-/g, "")
        .substring(0, 12)
        .toUpperCase();
};