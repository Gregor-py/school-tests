import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ChangeCorrectAnswerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly newCorrectAnswerId: Types.ObjectId;
}
