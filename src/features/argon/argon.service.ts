import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { hash as argonHash, verify as argonVerify } from 'argon2';

import { EnvironmentService } from '@/features/environment/environment.service';

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

  async hash(payload: string): Promise<string> {
    return this.proceedHashing(async () =>
      argonHash(payload, {
        secret: this.secret,
      }),
    );
  }

  async verify(storedHash: string, plain: string): Promise<boolean> {
    return this.proceedHashing(async () =>
      argonVerify(storedHash, plain, {
        secret: this.secret,
      }),
    );
  }
}
