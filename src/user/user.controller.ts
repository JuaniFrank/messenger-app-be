import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateIdDto } from './dto/validate-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async find(@Param(new ValidationPipe({ whitelist: true })) { id }: ValidateIdDto) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param(new ValidationPipe({ whitelist: true })) { id }: ValidateIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param(new ValidationPipe({ whitelist: true })) { id }: ValidateIdDto) {
    return this.userService.delete(id);
  }
}
