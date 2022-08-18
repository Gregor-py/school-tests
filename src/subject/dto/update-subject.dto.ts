import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly slug?: string;
}
