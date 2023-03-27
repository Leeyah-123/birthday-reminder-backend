import { ApiProperty } from '@nestjs/swagger';
import { Birthday } from '@prisma/client';

const BirthdayEntity = {};

export class UserEntity {
  @ApiProperty({
    example: 'dff39r4njnf49i4nrjne',
    description: 'The mongodb ObjectId of the user',
  })
  id: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email address of user',
  })
  email: string;

  @ApiProperty({
    example: 'JohnDoe',
    description: 'Username of user',
  })
  username: string;

  @ApiProperty({
    example: 'John Doe',
    description: "User's fullname",
  })
  fullName: string;

  @ApiProperty({
    description: "User's saved birthdays",
    type: [BirthdayEntity],
  })
  birthdays: Birthday[];
}
