import { IsRequiredString } from '@/decorators/validation/string';

export class AuthDto {
  @IsRequiredString({
    min: [5, 'login must be at least 5 characters long'],
    max: [15, 'login must be no longer then 5 characters long'],
  })
  // @ts-expect-error class-validator handles this class
  login: string;

  @IsRequiredString({
    min: [6, 'password must be at least 6 characters long'],
  })
  // @ts-expect-error class-validator handles this class
  password: string;
}
