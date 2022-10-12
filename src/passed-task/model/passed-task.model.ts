import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { TaskModel } from '../../task/model/task.model';
import { Types } from 'mongoose';

export interface PassedTaskModel extends Base {}

@ApiTags('PassedTask')
export class PassedTaskModel extends TimeStamps {
  @prop({ ref: () => TaskModel })
  @ApiProperty()
  taskParent: Ref<TaskModel>;

  @prop()
  @ApiProperty()
  chosenAnswer: Types.ObjectId;
}
