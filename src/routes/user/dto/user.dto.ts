import { IsOptionalString } from '@/decorators/validation';

export class UserDto {
  @IsOptionalString()
  name: string | undefined;
}
