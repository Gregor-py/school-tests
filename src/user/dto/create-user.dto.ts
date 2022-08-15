import { IsEmail, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Має бути рядковий тип' })
  @IsEmail({}, { message: 'Некоректний емейл' })
  readonly email: string;

  @IsString({ message: 'Має бути рядковий тип' })
  @Length(8, 32, { message: 'Має бути не менше 8 символів і не більше 32' })
  readonly password: string;

  @IsNumber({}, { message: 'Має бути числом' })
  @Min(1, { message: 'Мінімальне значення - 1' })
  @Max(11, { message: 'Максимальне значення - 11' })
  readonly class: number;

  @IsString({ message: 'Має бути рядковий тип' })
  @Length(1, 64, { message: 'Має бути не менше 8 символів і не більше 32' })
  readonly name: string;
}
