import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { CookieOptions, Response } from 'express';

import type { User } from '~prisma/client';

import { AuthDto } from '@/routes/auth/dto/auth.dto';
import { UserService } from '@/routes/user/user.service';

import type { RefreshTokensResponse } from './types/refresh-tokens';
import type { Tokens } from './types/tokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  EXPIRE_DAY_REFRESH_TOKEN: number = 1;
  REFRESH_TOKEN_NAME: string = 'refreshToken';

  async login(dto: AuthDto): Promise<RefreshTokensResponse> {
    // Get user and sanitize him
    const user = await this.validateUser(dto);
    // Access and refresh tokens
    const tokens = this.issueToken(user.id);

    return {
      user: this.userService.sanitize(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto): Promise<void> {
    const oldUser = await this.userService.getByLogin(dto.login);

    /** Check if user with certain email exists. */
    if (oldUser) throw new BadRequestException('User already exists');

    await this.userService.create(dto);
  }

  /**
   * Generates new tokens if given refreshToken
   * is valid.
   * @param refreshToken
   */
  async getNewTokens(refreshToken: string): Promise<RefreshTokensResponse> {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.getById(result.id);
    if (!user) throw new NotFoundException('User not found');

    const tokens = this.issueToken(user.id);

    return {
      user: this.userService.sanitize(user),
      ...tokens,
    };
  }

  /** Returns config for cookie response. */
  private getResponseConfig(): CookieOptions {
    const envMode =
      this.configService.get<'dev' | 'prod' | undefined>('ENV_MODE') || 'dev';

    return {
      httpOnly: true,
      domain: this.configService.get('APP_HOST'),
      // true if production
      secure: envMode === 'prod',
      // lax if production
      sameSite: envMode === 'prod' ? 'strict' : 'none',
    };
  }

  /** Add refreshToken to server cookies. */
  addRefreshTokenToResponse(res: Response, refreshToken: string): void {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      ...this.getResponseConfig(),
      expires: expiresIn,
    });
  }

  /** Clear cookie header of response. */
  removeRefreshTokenFromResponse(res: Response): void {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      ...this.getResponseConfig(),
      expires: new Date(0),
    });
  }

  /** Generates both of access and refresh tokens. */
  private issueToken(userId: User['id']): Tokens {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Checks if user with certain email exists
   * and return him.
   */
  private async validateUser(dto: AuthDto): Promise<User> {
    const user = await this.userService.getByLogin(dto.login);

    if (!user) throw new NotFoundException('User not found');

    /** True if password from dto is valid. */
    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
