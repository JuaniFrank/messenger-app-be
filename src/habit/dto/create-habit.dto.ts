import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { HabitFrequency } from '../entities/habit.entity';

export class CreateHabitDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  frequency: HabitFrequency;

  @IsNumber()
  quantity: number;

  @IsString()
  measure: string;

  @IsNumber()
  streak: number;

  @IsNumber()
  longestStreak: number;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  customDays?: number[];

  @IsOptional()
  @IsString()
  reminderTime?: string;

  @IsOptional()
  @IsArray()
  completed?: boolean[];

  @IsOptional()
  @IsNumber()
  currentStreak?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
