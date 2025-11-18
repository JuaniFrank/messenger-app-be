export type HabitFrequency = 'daily' | 'weekly' | 'monthly' | 'custom';

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: HabitFrequency;
  quantity: number;
  measure: string;
  streak: number;
  longestStreak: number;
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  customDays?: number[]; // 0-6 (Sunday-Saturday)
  reminderTime?: string; // ISO 8601 time (e.g., "14:30:00")
  completed?: boolean[]; // Array for daily completion tracking
  currentStreak?: number;
  category?: string;
  color?: string;
  icon?: string;
}
