import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Nullable } from 'xenopomp-essentials';

import type { User } from '~prisma/client';

import { EnvironmentService } from '@/features/environment/environment.service';
import { UserService } from '@/routes/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly env: EnvironmentService,
    private readonly userService: UserService,
  ) {
    const { JWT_SECRET } = env.schema;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate({ id }: Pick<User, 'id'>): Promise<Nullable<User>> {
    return this.userService.getById(id);
  }
}
