import { add } from "date-fns";


/**
 * Maintenant + 7 jours
 * @returns 
 */
// export const SessionExpirationDate = (): Date => 
//     new Date(Date.now() + 1 * 60 * 1000);

export const SessionExpirationDate = (): Date => 
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);


/**
 * Maintenant + 2 jours
 * @returns 
 */
export const EmailVerificationExpirationDate = (): Date =>
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

/**
 * Maintenant + 30 jours
 * @returns 
 */
export const thirtyDaysFromNow = (): Date => 
    new Date(Date.now()+ 30 * 24 * 60 * 60 * 1000);

/**
 * Maintenant + 45 minutes
 * @returns 
 */
export const fortyFiveMinutesFromNow = (): Date => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 45);
    return now;
}



type TimeUnit = "s" | "m" | "h" | "d";

export const calculateExpirationDate = (
    expiresIn: string = "15m"
): Date => {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match?.[1] ||!match?.[2]) throw new Error(`Invalid expiresIn: ${expiresIn}`);

    const value = parseInt(match[1], 10);
    const unit = match[2] as TimeUnit;

    const now = new Date();
    switch (unit) {
        case "s": return add(now, { seconds: value });
        case "m": return add(now, { minutes: value });
        case "h": return add(now, { hours: value });
        case "d": return add(now, { days: value });
    }
};

//Date d'expiration de la vérification de mail est de 5min
export const ResetPasswordExpirationDate = (): Date => 
    new Date(Date.now() + 5 * 60 * 1000);

//Date d'expiration après la réinitialisation du mot de passe est de 7heures
export const AfterResetPasswordExpirationDate = (): Date =>
    new Date(Date.now() + 7 * 60 * 60 * 1000);

export const getRemainingTime = (expiresAt: Date) => {
  const diff = new Date(expiresAt).getTime() - Date.now();

  if (diff <= 0) {
    return "0 minute";
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );

  const seconds = Math.floor(
    (diff % (1000 * 60)) / 1000
  );


  return `${hours}h ${minutes}min ${seconds}s`;
};