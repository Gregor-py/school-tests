import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export interface TagModel extends Base {}

@ApiTags('Tag')
export class TagModel extends TimeStamps {
  @prop({ unique: true })
  @ApiProperty()
  name: string;
}
