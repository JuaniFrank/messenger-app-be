import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateIdDto } from './dto/validate-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserType } from 'src/types/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserType[]> {
    const users: UserType[] = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async find(@Param(new ValidationPipe({ whitelist: true })) { id }: ValidateIdDto) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param(new ValidationPipe({ whitelist: true })) { id }: ValidateIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param(new ValidationPipe({ whitelist: true })) { id }: ValidateIdDto) {
    return this.userService.delete(id);
  }
}
