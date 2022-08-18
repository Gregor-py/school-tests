import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export interface AnswerModel extends Base {}

@ApiTags('Answer')
export class AnswerModel extends TimeStamps {
  @prop()
  @ApiProperty()
  text: string;
}
