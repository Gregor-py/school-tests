import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { SubjectModel } from '../../subject/model/subject.model';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { TagModel } from '../../tag/model/tag.model';
import { TaskModel } from '../../task/model/task.model';
import { UserModel } from '../../user/model/user.model';

export interface TestModel extends Base {}

@ApiTags('Test')
export class TestModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  @ApiProperty()
  owner: Ref<UserModel>;

  @prop()
  @ApiProperty()
  title: string;

  @prop()
  @ApiProperty()
  description: string;

  @prop({ ref: () => SubjectModel })
  @ApiProperty()
  subject?: Ref<SubjectModel>;

  @prop({ ref: () => TagModel })
  @ApiProperty()
  tags?: Ref<TagModel>[];

  @prop({ ref: () => TaskModel })
  @ApiProperty()
  tasks?: Ref<TaskModel>[];
}
