import {
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateScheduleDto {
  @IsISO8601()
  time: string; // ISO 8601 time

  @IsString()
  label: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsISO8601()
  endTime?: string; // ISO 8601 time

  @IsOptional()
  @IsNumber()
  duration?: number; // in minutes

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
