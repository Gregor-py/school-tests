import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export interface SubjectModel extends Base {}

@ApiTags('Subject')
export class SubjectModel extends TimeStamps {
  @prop()
  @ApiProperty()
  name: string;

  @prop()
  @ApiProperty()
  slug: string;
}
