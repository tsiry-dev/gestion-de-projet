/**
 * 🌐 API ENDPOINTS
 * Centralisation des routes backend
 */

export const API_BASE = "/api";

export const ENDPOINTS = {
  // AUTH: {
  //   LOGIN: "/auth/login",
  //   REGISTER: "/auth/register",
  //   REFRESH: "/auth/refresh",
  //   RESEND_EMAIL: "/auth/resend/email",
  //   REMOVE_SESSION: "/auth/remove/session",
  //   LOGOUT: "/auth/logout/:userId",
  //   LOGOUT_ALL: "/auth/logout/all",
  //   SEND_EMAIL_PASSWORD_RESET: "/auth/send/email/reset-password",
  //   RESET_PASSWORD: "/auth/reset/password",
  //   ME: "/auth/me",
  // },

  PROJECT: {
    COUNT: "/projects/count",
    FINDALL: "/projects",
    FINDWITHTASKS: (id: string) => `/projects/${id}/tasks`,
    CREATE: "/projects/create",
    UPDATE: `/projects/update`,
    DELETE: (id: string) => `/projects/remove/${id}`,
    DELETEALL: `/projects/remove/all`,
  },
  TASKS: {
    COUNT: "/tasks/count",
    FINDALL: "/tasks",
    CREATE: "/tasks/create",
    DELETE: (id: string) => `/tasks/remove/${id}`,
    DELETEALL: "/tasks/remove/all",
    UPDATESTATUS: "/tasks/update/status",
    UPDATE : "/tasks/update"
  }

} as const;

/**
 * 🧠 Type helper (optionnel mais pro)
 */
export type Endpoint = string;