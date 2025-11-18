import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { HabitCheckinModule } from '../habit-checkin/habit-checkin.module';

@Module({
  imports: [HabitCheckinModule],
  controllers: [HabitController],
  providers: [HabitService],
})
export class HabitModule {}
