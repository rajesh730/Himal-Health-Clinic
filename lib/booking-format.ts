/** Display helpers for booking dates. Safe on both server and client. */

const BS_MONTHS = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Asoj",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

/** "2026-11-28" → "Sat, 28 Nov 2026". The date is a Nepal calendar day. */
export function formatAd(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** "2083-08-12" → "12 Mangsir 2083". */
export function formatBs(dateBs: string | undefined): string {
  if (!dateBs) return "";
  const [y, m, d] = dateBs.split("-").map(Number);
  const month = BS_MONTHS[m - 1];
  if (!y || !month || !d) return dateBs;
  return `${d} ${month} ${y}`;
}
