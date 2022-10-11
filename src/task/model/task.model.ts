import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../../user/model/user.model';
import { AnswerModel } from '../../answer/model/answer.model';

export interface TaskModel extends Base {}

@ApiTags('Task')
export class TaskModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  @ApiProperty()
  owner: Ref<UserModel>;

  @prop()
  @ApiProperty()
  question: string;

  @prop({ ref: () => AnswerModel })
  answerVariants: Ref<AnswerModel>[];

  @prop({ ref: () => AnswerModel })
  correctAnswer: Ref<AnswerModel>;
}
