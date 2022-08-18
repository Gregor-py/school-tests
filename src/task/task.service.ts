import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TaskModel } from './model/task.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskTypesEnum } from './model/task.enum';
import { TaskManyFromMany, TaskNumberAnswer, TaskOneFromMany, TaskWrittenAnswer } from './task.interface';

@Injectable()
export class TaskService {
  constructor(@InjectModel(TaskModel) private taskModel: ModelType<TaskModel>) {}

  async create(variantType: string) {
    const defaultTask = {
      type: variantType,
      taskData: null,
    };

    if (variantType === TaskTypesEnum.TaskOneFromMany) {
      const defaultTaskData: TaskOneFromMany = {
        answerVariants: [],
        correctAnswer: null,
      };

      defaultTask.taskData = defaultTaskData;
    } else if (variantType === TaskTypesEnum.TaskManyFromMany) {
      const defaultTaskData: TaskManyFromMany = {
        answerVariants: [],
        correctAnswer: null,
      };

      defaultTask.taskData = defaultTaskData;
    } else if (variantType === TaskTypesEnum.TaskNumberAnswer) {
      const defaultTaskData: TaskNumberAnswer = {
        correctAnswer: 0,
      };

      defaultTask.taskData = defaultTaskData;
    } else if (variantType === TaskTypesEnum.TaskWrittenAnswer) {
      const defaultTaskData: TaskWrittenAnswer = {
        correctAnswer: '',
      };

      defaultTask.taskData = defaultTaskData;
    }

    return this.taskModel.create(defaultTask);
  }
}
