import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}