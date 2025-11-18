// habits.service.ts

import { Timestamp } from 'firebase/firestore';

export function parseQueryDate(dateStr: string): Date | null {
  // acepta "7-10-2025" o "07-10-2025"
  if (!dateStr) return null;
  const parts = dateStr.split('-').map((p) => p.trim());
  if (parts.length !== 3) return null;
  const [dayStr, monthStr, yearStr] = parts;
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);
  if (
    !Number.isFinite(day) ||
    !Number.isFinite(month) ||
    !Number.isFinite(year)
  )
    return null;
  // JS Date: monthIndex 0..11
  const d = new Date(year, month - 1, day);
  // verificación mínima
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  )
    return null;
  return d;

  // output: 2025-10-07T00:00:00.000Z
}

export function toJSDate(value: any): Date | null {
  if (!value) return null;
  // Firestore-like object with seconds
  if (typeof value === 'object' && value.seconds != null) {
    return new Date(
      value.seconds * 1000 +
        (value.nanoseconds ? Math.floor(value.nanoseconds / 1e6) : 0),
    );
  }
  // SDK Timestamp con toDate()
  if (typeof value === 'object' && typeof value.toDate === 'function') {
    return value.toDate();
  }
  // ISO string or numeric
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d;
}

export function getDayRange(dateStr: string) {
  // dateStr viene como "04-11-2025"
  const [day, month, year] = dateStr.split('-').map(Number);
  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(year, month - 1, day, 23, 59, 59, 999);

  return {
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end),
  };
}
