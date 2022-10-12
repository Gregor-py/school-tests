import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { RegionEnum } from './region.enum';
import { SubjectModel } from '../../subject/model/subject.model';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PassingTestModel } from '../../passing-test/model/passing-test.model';

export interface UserModel extends Base {}

@ApiTags('User')
export class UserModel extends TimeStamps {
  @prop({ unique: true })
  @ApiProperty()
  email: string;

  @prop()
  @ApiProperty()
  password: string;

  @prop({ default: false })
  @ApiProperty()
  isAdmin: boolean;

  @prop({ enum: RegionEnum, default: RegionEnum.KyivOblast })
  @ApiProperty()
  region: string;

  @prop({ required: false })
  @ApiProperty()
  avatar: string;

  @prop({ min: 1, max: 11 })
  @ApiProperty()
  class: number;

  @prop()
  @ApiProperty()
  name: string;

  @prop({ default: '' })
  @ApiProperty()
  secondName: string;

  @prop({ default: [], ref: () => SubjectModel })
  @ApiProperty()
  favoriteSubjects?: Ref<SubjectModel>[];

  @prop({ default: [], ref: () => PassingTestModel })
  @ApiProperty()
  startedTests: Ref<PassingTestModel>[];
}
