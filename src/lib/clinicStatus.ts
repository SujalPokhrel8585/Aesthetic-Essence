// Live open/closed status for the clinic, computed in Nepal Time (NPT, UTC+5:45)
// so the badge is correct for visitors in any timezone.

export const CLINIC_OPEN_HOUR = 10; // 10:00 AM
export const CLINIC_CLOSE_HOUR = 18; // 6:00 PM

/** "10:00 AM" / "6:00 PM", single source for displayed hours everywhere. */
export function formatHour12(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:00 ${period}`;
}

export interface ClinicStatus {
  open: boolean;
  /** Minutes until the clinic opens (only when closed). */
  opensInMinutes: number | null;
  /** Minutes until the clinic closes (only when open). */
  closesInMinutes: number | null;
}

export function getClinicStatus(now: Date = new Date()): ClinicStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const minutes = hour * 60 + minute;

  const openMinutes = CLINIC_OPEN_HOUR * 60;
  const closeMinutes = CLINIC_CLOSE_HOUR * 60;

  if (minutes >= openMinutes && minutes < closeMinutes) {
    return {
      open: true,
      opensInMinutes: null,
      closesInMinutes: closeMinutes - minutes,
    };
  }

  // Closed: before opening, or after closing (roll over to tomorrow's opening)
  const opensInMinutes =
    minutes < openMinutes ? openMinutes - minutes : 24 * 60 - minutes + openMinutes;
  return { open: false, opensInMinutes, closesInMinutes: null };
}

/** "7h 05m" / "45m" */
export function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}
