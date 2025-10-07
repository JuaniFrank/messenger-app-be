import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HabitCheckinService } from './habit-checkin.service';
import { CreateHabitCheckinDto } from './dto/create-habit-checkin.dto';
import { UpdateHabitCheckinDto } from './dto/update-habit-checkin.dto';

@Controller('habit-checkin')
export class HabitCheckinController {
  constructor(private readonly habitCheckinService: HabitCheckinService) {}

  @Get('get-by-habit-id-and-date')
  getHabitCheckinsByHabitIdAndDate(
    @Query('habitId') habitId: string,
    @Query('date') date: string,
  ) {
    return this.habitCheckinService.getHabitCheckinsByHabitIdAndDate(
      habitId,
      date,
    );
  }

  @Get()
  findAll() {
    return this.habitCheckinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitCheckinService.findOne(id);
  }

  // TODO: Implement
  // @Get('user/:userId')
  // findAllByUser(@Param('userId') userId: string) {
  //   return this.habitCheckinService.findAllByUser(userId);
  // }

  @Get('habit/:habitId')
  findAllByHabit(@Param('habitId') habitId: string) {
    return this.habitCheckinService.findAllByHabit(habitId);
  }

  @Post()
  create(@Body() createHabitCheckinDto: CreateHabitCheckinDto) {
    return this.habitCheckinService.create(createHabitCheckinDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitCheckinDto: UpdateHabitCheckinDto,
  ) {
    return this.habitCheckinService.update(+id, updateHabitCheckinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitCheckinService.remove(+id);
  }
}
