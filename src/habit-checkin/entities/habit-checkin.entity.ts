export interface HabitCheckin {
  id: string;
  habitId: string;
  date: string; // ISO 8601 date (YYYY-MM-DD)
  completed: boolean;
  quantity: number;
  notes?: string;
  createdAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601
}
