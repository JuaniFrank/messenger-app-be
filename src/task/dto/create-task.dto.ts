import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';

// Using a conservative set of allowed values; adjust if you have different enums
export const PRIORITY_VALUES = ['low', 'medium', 'high'] as const;
export type Priority = (typeof PRIORITY_VALUES)[number];

export const STATUS_VALUES = [
  'todo',
  'in_progress',
  'done',
  'blocked',
] as const;
export type TaskStatus = (typeof STATUS_VALUES)[number];

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsISO8601()
  dueDate?: string;

  @IsOptional()
  @IsISO8601()
  dueTimestamp?: string;

  @IsString()
  @IsIn([...PRIORITY_VALUES])
  priority: Priority;

  @IsString()
  @IsIn([...STATUS_VALUES])
  status: TaskStatus;

  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsISO8601()
  completedAt?: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsNumber()
  estimatedDuration?: number;

  @IsOptional()
  @IsNumber()
  actualDuration?: number;

  @IsOptional()
  @IsString()
  parentTaskId?: string;
}
