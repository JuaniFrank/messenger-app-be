import { Module } from '@nestjs/common';
import { HabitCheckinService } from './habit-checkin.service';
import { HabitCheckinController } from './habit-checkin.controller';

@Module({
  controllers: [HabitCheckinController],
  providers: [HabitCheckinService],
})
export class HabitCheckinModule {}
