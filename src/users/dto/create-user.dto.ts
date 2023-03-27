import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'First name must be 3-20 characters long',
  })
  @MaxLength(20, {
    message: 'First name must be 3-20 characters long',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Last name must be 3-20 characters long',
  })
  @MaxLength(20, {
    message: 'Last name must be 3-20 characters long',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Username must be 3-20 characters long',
  })
  @MaxLength(20, {
    message: 'Username must be 3-20 characters long',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter and one number',
    },
  )
  password: string;
}
