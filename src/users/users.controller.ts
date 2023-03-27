import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('posts')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'An array containing all saved users',
    type: [UserEntity],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Get a user by their ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be the id of a user that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User with provided ID',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get('id/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get a user by their username or email' })
  @ApiParam({
    name: 'identity',
    required: true,
    description:
      'Should be the username or email of a user that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User with provided username/email',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get('identity/:identity')
  getUserByIdentity(@Param('identity') identity: string) {
    return this.usersService.getUserByUsernameOrEmail(identity);
  }

  @ApiOperation({ summary: "Update a user's details" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be the id of a user that exists in the database',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }
}
