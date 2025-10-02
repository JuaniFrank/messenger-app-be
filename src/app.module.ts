import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [TaskModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
