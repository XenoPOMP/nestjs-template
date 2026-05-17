import { Body, Controller, NotFoundException, Param } from '@nestjs/common';

import type { User } from '~prisma/client';

import { Endpoint } from '@/decorators/endpoint';
import { CurrentUser } from '@/routes/auth/decorators/user.decorator';
import { UserDto } from '@/routes/user/dto/user.dto';
import { SanitizedUser } from '@/types/sanitized-user';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Endpoint('GET', '/', {
    authRequired: true,
  })
  getUserProfile(@CurrentUser() user: User): SanitizedUser {
    return this.userService.sanitize(user);
  }

  @Endpoint('GET', '/:id')
  async getUserById(@Param('id') id: string): Promise<SanitizedUser> {
    const user = await this.userService.getById(id);
    if (user === null) throw new NotFoundException();
    return this.userService.sanitize(user);
  }

  @Endpoint('PUT', '/', {
    authRequired: true,
    validate: true,
  })
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UserDto,
  ): Promise<SanitizedUser> {
    const updatedUser = await this.userService.update(userId, dto);
    if (updatedUser === null) throw new NotFoundException();
    return this.userService.sanitize(updatedUser);
  }
}
