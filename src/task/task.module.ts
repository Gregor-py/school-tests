import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskModel } from './model/task.model';
import { AnswerModule } from '../answer/answer.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TaskModel,
        schemaOptions: {
          collection: 'Task',
        },
      },
    ]),
    AnswerModule,
  ],
  exports: [TaskService],
})
export class TaskModule {}
