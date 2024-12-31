import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsOptional()
        @IsEmail()
        email: string;
    
        @IsOptional()
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
        username?: string;
    
        @IsOptional()
        @IsString()
        phoneNumber?: string;
}
