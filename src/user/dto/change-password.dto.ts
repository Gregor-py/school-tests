import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Некоректний емейл' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly currentPassword: string;

  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly newPassword: string;
}
