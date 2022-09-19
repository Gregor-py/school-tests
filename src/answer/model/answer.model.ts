import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { UserModel } from '../../user/model/user.model';

export interface AnswerModel extends Base {}

@ApiTags('Answer')
export class AnswerModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  @ApiProperty()
  owner: Ref<UserModel>;

  @prop()
  @ApiProperty()
  text: string;
}
