import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export interface TaskModel extends Base {}

@ApiTags('Task')
export class TaskModel extends TimeStamps {
  @prop()
  @ApiProperty()
  question: string;
}
