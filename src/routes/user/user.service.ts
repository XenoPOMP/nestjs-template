import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash } from 'argon2';

import { UserServiceContract } from '@/contracts/user-service.contract';
import { PrismaService } from '@/features/prisma/prisma.service';
import { AuthDto } from '@/routes/auth/dto/auth.dto';
import { UserDto } from '@/routes/user/dto/user.dto';

type ServiceContract = UserServiceContract<
  User, // Original user type
  User & {}, // User type returned by getter functions
  Pick<User, 'name' | 'login'>, // User type returned by updater function
  InstanceType<typeof AuthDto>, // Auth dto used by creater function
  InstanceType<typeof UserDto> // Dto that is used in updater function
>;

@Injectable()
export class UserService implements ServiceContract {
  constructor(private readonly prisma: PrismaService) {}

  private async getByFields<U extends Prisma.UserWhereUniqueInput>(shape: U) {
    return this.prisma.user.findUnique({
      where: {
        ...shape,
      },
    });
  }

  async getById(id: User['id']) {
    return this.getByFields({
      id,
    });
  }

  async getByLogin(login: User['login']) {
    return this.getByFields({
      login,
    });
  }

  async create(dto: AuthDto) {
    const user: Pick<User, 'login' | 'name' | 'password'> = {
      login: dto.login,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        login: true,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
