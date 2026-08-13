export function formatRelativeDate(date: string | Date): string {
    const now = new Date().getTime();
    const target = new Date(date).getTime();

    const diff = target - now;
    const seconds = Math.round(diff / 1000);

    const rtf = new Intl.RelativeTimeFormat("fr", {
        numeric: "auto",
    });

    const absSeconds = Math.abs(seconds);

    if (absSeconds < 60) {
        return rtf.format(seconds, "second");
    }

    const minutes = Math.round(seconds / 60);

    if (Math.abs(minutes) < 60) {
        return rtf.format(minutes, "minute");
    }

    const hours = Math.round(minutes / 60);

    if (Math.abs(hours) < 24) {
        return rtf.format(hours, "hour");
    }

    const days = Math.round(hours / 24);

    if (Math.abs(days) < 7) {
        return rtf.format(days, "day");
    }

    const weeks = Math.round(days / 7);

    if (Math.abs(weeks) < 4) {
        return rtf.format(weeks, "week");
    }

    const months = Math.round(days / 30);

    if (Math.abs(months) < 12) {
        return rtf.format(months, "month");
    }

    const years = Math.round(days / 365);

    return rtf.format(years, "year");
}