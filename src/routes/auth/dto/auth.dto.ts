import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(5, {
    message: 'login must be at least 5 characters long',
  })
  @MaxLength(15, {
    message: 'login must be not longer then 5 characters long',
  })
  // @ts-expect-error class-validator handles this class
  login: string;

  @IsString()
  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  // @ts-expect-error class-validator handles this class
  password: string;
}
