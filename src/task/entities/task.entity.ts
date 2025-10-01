export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'blocked';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTimestamp?: string;
  priority: Priority;
  status: TaskStatus;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  category?: string;
  tags?: string[];
  estimatedDuration?: number;
  actualDuration?: number;
  parentTaskId?: string;
  subtasks?: Task[];
}
