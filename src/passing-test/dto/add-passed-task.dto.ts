import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddPassedTaskDto {
  @IsString({ message: 'Має бути рядковий тип' })
  @ApiProperty()
  readonly passingTestId: Types.ObjectId;

  @IsString({ message: 'Має бути рядковий тип' })
  @ApiProperty()
  readonly taskId: Types.ObjectId;

  @IsString({ message: 'Має бути рядковий тип' })
  @ApiProperty()
  readonly chosenAnswer: Types.ObjectId;
}
