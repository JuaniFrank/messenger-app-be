import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  async login(loginCredentialsDto: LoginCredentialsDto): Promise< { token: string } > {

    const user = await this.userService.findOneByEmail(loginCredentialsDto.email);

    if (!user) return null

    if (user.password !== loginCredentialsDto.password) throw new UnauthorizedException('Invalid credentials')

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {token}
  }

}
