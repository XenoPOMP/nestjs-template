import { JwtModuleOptions } from '@nestjs/jwt';

import { EnvironmentService } from '@/features/environment/environment.service';

export const getJwtConfig = async (
  env: EnvironmentService,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<JwtModuleOptions> => {
  const { JWT_SECRET } = env.schema;

  return {
    secret: JWT_SECRET,
  };
};
