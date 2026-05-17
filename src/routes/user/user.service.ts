import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Nullable, StrictOmit } from 'xenopomp-essentials';

import type { User } from '~prisma/client';
import { Prisma } from '~prisma/client';

import { UserServiceContract } from '@/contracts/user-service.contract';
import { PrismaService } from '@/features/prisma/prisma.service';
import { AuthDto } from '@/routes/auth/dto/auth.dto';
import { UserDto } from '@/routes/user/dto/user.dto';
import { UserSensitiveKeys } from '@/types/sanitized-user';
import { SelectiveRequired } from '@/types/selective-required';

type ServiceContract = UserServiceContract<
  User, // Original user type
  User & {}, // User type returned by getter functions
  User & {}, // User type returned by updater function
  InstanceType<typeof AuthDto>, // Auth dto used by creater function
  InstanceType<typeof UserDto> // Dto that is used in updater function
>;

@Injectable()
export class UserService implements ServiceContract {
  constructor(private readonly prisma: PrismaService) {}

  private getByFields<U extends Prisma.UserWhereUniqueInput>(
    shape: U,
  ): Promise<Nullable<User>> {
    return this.prisma.user.findUnique({
      where: {
        ...shape,
      },
    });
  }

  async getById(id: User['id']): Promise<Nullable<User>> {
    return this.getByFields({
      id,
    });
  }

  async getByLogin(login: User['login']): Promise<Nullable<User>> {
    return this.getByFields({
      login,
    });
  }

  async create(dto: AuthDto): Promise<User> {
    const user: Pick<User, 'login' | 'name' | 'password'> = {
      login: dto.login,
      name: '',
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto): Promise<Nullable<User>> {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Remove sensitive data from user object,
   * @param data
   */
  sanitize<Shape extends SelectiveRequired<Partial<User>, UserSensitiveKeys>>(
    data: Shape,
  ): StrictOmit<Shape, UserSensitiveKeys> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, login, password, ...user } = data;
    return user as StrictOmit<Shape, UserSensitiveKeys>;
  }
}
