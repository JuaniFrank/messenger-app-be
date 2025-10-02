export interface Schedule {
  id: string;
  userId: string;
  time: string; // ISO 8601 time
  label: string;
  isActive: boolean;
  endTime?: string; // ISO 8601 time
  duration?: number; // in minutes
  category?: string;
  color?: string;
}
