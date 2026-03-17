export type Session =
  | "Asian Session"
  | "London Session"
  | "Pre-Market"
  | "New York Open"
  | "London / NY Overlap"
  | "New York Session"
  | "After Hours";

export function getActiveSession(now: Date = new Date()): Session {
  // Convert to EST (UTC-5) / EDT (UTC-4) — using fixed UTC-5 offset for simplicity.
  // For DST-aware behaviour, replace with a proper timezone library.
  const estOffset = -5;
  const utcHour = now.getUTCHours();
  const utcMin = now.getUTCMinutes();

  // Total minutes since midnight EST
  const totalMin =
    ((utcHour + estOffset + 24) % 24) * 60 + utcMin;

  // Time ranges in minutes since midnight EST
  if (totalMin >= 0 && totalMin < 180) return "Asian Session";      // 12:00am – 3:00am
  if (totalMin >= 180 && totalMin < 480) return "London Session";    // 3:00am – 8:00am
  if (totalMin >= 480 && totalMin < 570) return "Pre-Market";        // 8:00am – 9:30am
  if (totalMin >= 570 && totalMin < 630) return "New York Open";     // 9:30am – 10:30am
  if (totalMin >= 630 && totalMin < 720) return "London / NY Overlap"; // 10:30am – 12:00pm
  if (totalMin >= 720 && totalMin < 1020) return "New York Session"; // 12:00pm – 5:00pm
  return "After Hours";                                              // 5:00pm – 12:00am
}
