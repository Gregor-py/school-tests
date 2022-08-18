import { ApiProperty } from '@nestjs/swagger';
import { RegionEnum } from '../model/region.enum';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CustomizeUserDto {
  @ApiProperty({ required: false })
  @IsString({ message: 'Має бути рядковий тип' })
  @IsOptional()
  readonly region?: RegionEnum;

  @ApiProperty({ required: false })
  @IsString({ message: 'Має бути рядковий тип' })
  @IsOptional()
  readonly avatar?: string;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'Має бути числом' })
  @IsOptional()
  readonly class?: number;

  @ApiProperty({ required: false })
  @IsString({ message: 'Має бути рядковий тип' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Має бути рядковий тип' })
  @IsOptional()
  readonly secondName?: string;
}
