import { notify } from "../feedback/notify";

export function handleApiError(
  error: any,
  setApiErrors?: (errors: Record<string, string>) => void
) {
  const data = error?.response?.data;

  console.log("API ERROR:", error);
  console.log("API ERROR DATA:", data);

  /**
   * ❌ Cas serveur down / network error
   */
  if (!data) {
    notify.error("Le serveur a rencontré une erreur 🛠");
    return;
  }

  /**
   * ❌ Cas validation (errors field)
   */
  if (data?.errors && typeof data.errors === "object") {
    setApiErrors?.(data.errors);

    if (data?.message) {
      notify.error(data.message);
    } else {
      notify.error("Erreur de validation");
    }

    return;
  }

  /**
   * ❌ Cas erreur simple backend
   */
  if (data?.message) {
    notify.error(data.message);
    return;
  }

  /**
   * ❌ fallback
   */
  notify.error("Une erreur inconnue est survenue");
}