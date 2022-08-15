import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface SubjectModel extends Base {}

export class SubjectModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  slug: string;
}
