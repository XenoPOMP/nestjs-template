import { IsOptionalString } from '@/decorators/validation/string';

export class UserDto {
  @IsOptionalString()
  name: string | undefined;
}
