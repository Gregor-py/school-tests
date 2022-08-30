import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { TaskTypesEnum } from './task.enum';
import { TaskType } from '../task.interface';
import { UserModel } from '../../user/model/user.model';

export interface TaskModel extends Base {}

@ApiTags('Task')
export class TaskModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  @ApiProperty()
  owner: Ref<UserModel>;

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
