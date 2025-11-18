import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHabitCheckinDto {
  @IsString()
  habitId: string;

  @IsString()
  date: string; // ISO 8601 date (YYYY-MM-DD)

  @IsBoolean()
  completed: boolean;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  createdAt?: string; // ISO 8601

  @IsOptional()
  @IsString()
  updatedAt?: string; // ISO 8601
}
