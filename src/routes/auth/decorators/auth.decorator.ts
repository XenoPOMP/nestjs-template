import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../guards/jwt.guard';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Auth = () => UseGuards(JwtAuthGuard);
