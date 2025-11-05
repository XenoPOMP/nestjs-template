import {
  Body,
  Controller,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { Endpoint } from '@/decorators/endpoint';
import { AuthDto } from '@/routes/auth/dto/auth.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Endpoint('POST', 'login', {
    validate: true,
  })
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Endpoint('POST', 'register', {
    validate: true,
  })
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.register(dto);
    return this.login(dto, res);
  }

  @Endpoint('POST', 'login/access-token', {
    authRequired: true,
  })
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME];

    /** Check if refreshToken is not provided through cookies. */
    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    /** Issue new tokens. */
    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    );

    /** Assign refreshToken to response. */
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Endpoint('POST', 'logout')
  // eslint-disable-next-line @typescript-eslint/require-await
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);

    return {
      logout: true,
    };
  }
}
