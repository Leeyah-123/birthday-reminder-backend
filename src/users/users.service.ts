import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Birthday, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(): Promise<(User & { birthdays: Birthday[] })[]> {
    try {
      const users: (User & { birthdays: Birthday[] })[] =
        await this.prismaService.user.findMany({
          include: {
            birthdays: true,
          },
        });

      return users;
    } catch (err) {
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async getUserById(id: string): Promise<User & { birthdays: Birthday[] }> {
    try {
      const user: (User & { birthdays: Birthday[] }) | null =
        await this.prismaService.user.findUnique({
          where: {
            id,
          },
          include: {
            birthdays: true,
          },
        });

      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      if (err.code === 'P2023') {
        throw new BadRequestException('Invalid ID');
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async getUserByUsernameOrEmail(
    param: string,
  ): Promise<User & { birthdays: Birthday[] }> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          OR: [{ username: param }, { email: param }],
        },
        include: {
          birthdays: true,
        },
      });

      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          fullName: `${createUserDto.firstName} ${createUserDto.lastName}`,
        },
      });

      return user;
    } catch (err) {
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User & { birthdays: Birthday[] }> {
    try {
      const user = await this.getUserById(id);

      return await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...updateUserDto,
          fullName: `${updateUserDto.firstName} ${updateUserDto.lastName}`,
        },
        include: {
          birthdays: true,
        },
      });
    } catch (err) {
      if (err instanceof NotFoundException)
        throw new NotFoundException('User not found');
      if (err instanceof BadRequestException) {
        throw new BadRequestException('Invalid ID');
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }
}
