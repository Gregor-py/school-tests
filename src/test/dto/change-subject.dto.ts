import { ApiProperty } from '@nestjs/swagger';
import { SubjectModel } from '../../subject/model/subject.model';
import { Types } from 'mongoose';

export class ChangeSubjectDto {
  @ApiProperty({ type: SubjectModel })
  newSubject: Types.ObjectId;
}
