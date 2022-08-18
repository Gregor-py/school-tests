import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  @IsEmail({}, { message: 'Некоректний емейл' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  @Length(8, 32, { message: 'Має бути не менше 8 символів і не більше 32' })
  readonly password: string;
}
