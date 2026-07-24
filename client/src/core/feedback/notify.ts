import { toast } from "react-hot-toast";

/**
 * 🔔 NOTIFY SYSTEM (ENTERPRISE)
 * ----------------------------------
 * Wrapper centralisé pour toutes les notifications UI
 *
 * ✔ standardisation
 * ✔ maintenabilité
 * ✔ scalable
 * ✔ découplé de react-hot-toast
 */

export const notify = {
  /**
   * ✅ SUCCESS
   */
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
      position: "top-center",
    });
  },

  /**
   * ❌ ERROR
   */
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: "top-center",
    });
  },

  /**
   * ⚠️ WARNING
   */
  warning: (message: string) => {
    toast(message, {
      icon: "⚠️",
      duration: 4000,
      position: "top-right",
    });
  },

  /**
   * ℹ️ INFO
   */
  info: (message: string) => {
    toast(message, {
      icon: "ℹ️",
      duration: 3000,
      position: "top-right",
    });
  },

  /**
   * ⏳ LOADING (important pour mutation async)
   */
  loading: (message: string) => {
    return toast.loading(message, {
      position: "top-right",
    });
  },

  /**
   * 🔁 UPDATE (remplacer un toast existant)
   */
  update: (
    toastId: string,
    type: "success" | "error",
    message: string
  ) => {
    toast.dismiss(toastId);

    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  },

  /**
   * ❌ DISMISS (fermer tous les toasts)
   */
  dismiss: () => {
    toast.dismiss();
  },
};