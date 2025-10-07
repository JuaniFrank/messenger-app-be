import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitCheckinDto } from './create-habit-checkin.dto';

export class UpdateHabitCheckinDto extends PartialType(CreateHabitCheckinDto) {}
