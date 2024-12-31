import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.login(loginCredentialsDto);
  }

}
