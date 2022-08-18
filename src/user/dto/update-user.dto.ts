import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  @IsEmail({}, { message: 'Некоректний емейл' })
  readonly email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Має бути числом' })
  readonly class?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly secondName?: string;
}
