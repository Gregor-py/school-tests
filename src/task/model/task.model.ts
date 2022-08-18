import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { TaskTypesEnum } from './task.enum';
import { TaskType } from '../task.interface';

export interface TaskModel extends Base {}

@ApiTags('Task')
export class TaskModel extends TimeStamps {
  @prop()
  @ApiProperty()
  question: string;

  @prop({ enum: TaskTypesEnum })
  @ApiProperty()
  type: string;

  @prop()
  @ApiProperty()
  taskData: TaskType;
}
