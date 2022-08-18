import { IsEmail, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  @IsEmail({}, { message: 'Некоректний емейл' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  @Length(8, 32, { message: 'Має бути не менше 8 символів і не більше 32' })
  readonly password: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Має бути числом' })
  @Min(1, { message: 'Мінімальне значення - 1' })
  @Max(11, { message: 'Максимальне значення - 11' })
  readonly class: number;

  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  @Length(1, 64, { message: 'Має бути не менше 8 символів і не більше 32' })
  readonly name: string;
}
