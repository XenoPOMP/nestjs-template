import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { hash as argonHash, verify as argonVerify } from 'argon2';

import { EnvironmentService } from '@/features/environment/environment.service';

/**
 * This service provides support for hashing with argon2. It also
 * applies ARGON_SECRET to it automatically.
 */
@Injectable()
export class ArgonService {
  protected readonly logger = new Logger(ArgonService.name);
  private readonly secret: Buffer;

  constructor(private readonly env: EnvironmentService) {
    this.secret = Buffer.from(env.schema.ARGON_SECRET);
  }

  private async proceedHashing<Return>(
    callback: () => Promise<Return>,
  ): Promise<Return> {
    try {
      const result = await callback();
      return result;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      this.logger.warn(`Hashing failed with error: ${e}`);
      throw new ForbiddenException();
    }
  }

  /**
   * Hash any string.
   * @param payload {string}    This string will be hashed
   * @example
   * const user: Pick<User, 'login' | 'name' | 'password'> = {
   *   login: dto.login,
   *   name: '',
   *   password: await this.argonService.hash(dto.password),
   * };
   */
  async hash(payload: string): Promise<string> {
    return this.proceedHashing(async () =>
      argonHash(payload, {
        secret: this.secret,
      }),
    );
  }

  /**
   * Checks if plain string matches hashed one.
   * @param storedHash
   * @param plain
   *
   * @example
   * const user = await this.userService.getByLogin(dto.login);
   * if (!user) throw new NotFoundException('User not found');
   *
   * // True if password from dto is valid.
   * const isValid: boolean = await this.argonService.verify(
   *   user.password,   // This password is hashed and stored in database.
   *   dto.password,    // Provided by parsing body. Not hashed.
   * );
   *
   * if (!isValid) throw new UnauthorizedException('Invalid password');
   *
   * return user;
   */
  async verify(storedHash: string, plain: string): Promise<boolean> {
    return this.proceedHashing(async () =>
      argonVerify(storedHash, plain, {
        secret: this.secret,
      }),
    );
  }
}
