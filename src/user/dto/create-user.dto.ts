import { IsEmail, IsOptional, IsString, IsNumber, IsDateString, IsPhoneNumber, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  maidenName?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsObject()
  address?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };

  @IsOptional()
  @IsObject()
  company?: {
    department?: string;
    name?: string;
    title?: string;
  };

  @IsOptional()
  @IsString()
  role?: string;
}
