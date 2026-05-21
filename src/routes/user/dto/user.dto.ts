import { IsOptionalString } from '@/decorators/validation';
import { AuthDto } from '@/routes/auth/dto/auth.dto';

export class UserDto implements Partial<AuthDto> {
  @IsOptionalString({
    min: [5, 'login must be at least 5 characters long'],
    max: [15, 'login must be not longer then 15 characters long'],
  })
  login: string | undefined;

  @IsOptionalString()
  name: string | undefined;

  @IsOptionalString({
    min: [6, 'password must be at least 6 characters long'],
  })
  password: string | undefined;
}
