import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.findOne(id);
  }

  @Get('user/:userId')
  getSchedulesByUser(@Param('userId') userId: string): Promise<Schedule[]> {
    return this.scheduleService.getSchedulesByUser(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ id: string; deleted: boolean }> {
    return this.scheduleService.remove(id);
  }
}
