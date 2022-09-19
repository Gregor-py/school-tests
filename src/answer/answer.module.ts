import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { AnswerModel } from './model/answer.model';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AnswerModel,
        schemaOptions: {
          collection: 'Answer',
        },
      },
    ]),
  ],
})
export class AnswerModule {}
