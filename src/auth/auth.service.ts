import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'; 
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  async login(loginCredentialsDto: LoginCredentialsDto): Promise< { token: string } > {

    const user = await this.userService.findOneByEmail(loginCredentialsDto.email);

    if (!user) throw new NotFoundException('User not found')

      const passwordMatches = await bcrypt.compare(loginCredentialsDto.password, user.password);
      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid credentials');
      }

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {token}
  }

  async register(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

}
