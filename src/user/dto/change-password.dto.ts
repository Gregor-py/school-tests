import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail({}, { message: 'Некоректний емейл' })
  readonly email: string;

  @IsString({ message: 'Має бути рядковий тип' })
  readonly currentPassword: string;

  @IsString({ message: 'Має бути рядковий тип' })
  readonly newPassword: string;
}
