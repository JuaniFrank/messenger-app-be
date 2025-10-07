import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from './schedule/schedule.module';
import { HabitModule } from './habit/habit.module';

@Module({
  imports: [TaskModule, ScheduleModule, HabitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
