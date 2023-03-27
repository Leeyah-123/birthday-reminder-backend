import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    minLength: 3,
    maxLength: 20,
    example: 'John',
  })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'First name must be 3-20 characters long',
  })
  @MaxLength(20, {
    message: 'First name must be 3-20 characters long',
  })
  firstName?: string;

  @ApiProperty({ required: false, minLength: 3, maxLength: 20, example: 'Doe' })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Last name must be 3-20 characters long',
  })
  @MaxLength(20, {
    message: 'Last name must be 3-20 characters long',
  })
  lastName?: string;

  @ApiProperty({ required: false, example: 'johndoe@gmail.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
    minLength: 3,
    maxLength: 20,
    example: 'JohnDoe',
  })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Username must be 3-20 characters long',
  })
  @MaxLength(20, {
    message: 'Username must be 3-20 characters long',
  })
  username?: string;

  @ApiProperty({
    required: false,
    minLength: 8,
    example: 'Test@password',
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter and one symbol',
    },
  )
  password?: string;
}
