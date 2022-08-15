import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Має бути рядковий тип' })
  @IsEmail({}, { message: 'Некоректний емейл' })
  readonly email: string;

  @IsString({ message: 'Має бути рядковий тип' })
  @Length(8, 32, { message: 'Має бути не менше 8 символів і не більше 32' })
  readonly password: string;
}
