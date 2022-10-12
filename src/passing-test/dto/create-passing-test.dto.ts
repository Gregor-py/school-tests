import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePassingTestDto {
  @ApiProperty()
  @IsString({ message: 'Має бути рядковий тип' })
  readonly testParent: Types.ObjectId;
}
