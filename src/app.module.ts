import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from './schedule/schedule.module';
import { HabitModule } from './habit/habit.module';
import { HabitCheckinModule } from './habit-checkin/habit-checkin.module';

@Module({
  imports: [TaskModule, ScheduleModule, HabitModule, HabitCheckinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
