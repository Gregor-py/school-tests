import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { RegionEnum } from './region.enum';
import { SubjectModel } from '../../subject/model/subject.model';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @ApiProperty({ required: true, uniqueItems: true })
  @prop({ unique: true })
  email: string;

  @ApiProperty()
  @prop()
  password: string;

  @ApiProperty()
  @prop({ default: false })
  isAdmin: boolean;

  @ApiProperty()
  @prop({ enum: RegionEnum, default: RegionEnum.KyivOblast })
  region: string;

  @ApiProperty()
  @prop({ required: false })
  avatar: string;

  @ApiProperty()
  @prop({ min: 1, max: 11 })
  class: number;

  @ApiProperty()
  @prop()
  name: string;

  @ApiProperty()
  @prop({ default: '' })
  secondName: string;

  @ApiProperty()
  @prop({ default: [], ref: () => SubjectModel })
  favoriteSubjects?: Ref<SubjectModel>[];
}
