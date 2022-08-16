import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { SubjectModel } from './model/subject.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SubjectModel,
        schemaOptions: {
          collection: 'Subject',
        },
      },
    ]),
  ],
  providers: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
