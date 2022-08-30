import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TaskModel } from './model/task.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskTypesEnum } from './model/task.enum';
import { TaskManyFromMany, TaskNumberAnswer, TaskOneFromMany, TaskWrittenAnswer } from './task.interface';
import { Types } from 'mongoose';
import { ChangeCorrectAnswerDto } from './dto/change-correct-answer.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(TaskModel) private taskModel: ModelType<TaskModel>) {}

  async getById(taskId: Types.ObjectId) {
    return this.taskModel.findById(taskId);
  }

  async changeCorrectAnswer(taskId: Types.ObjectId, changeCorrectAnswerDto: ChangeCorrectAnswerDto) {
    const task = await this.taskModel.findById(taskId);
    const taskType = task.type;
    if (!task) {
      throw new BadRequestException('Такого завдання не існує');
    }

    if (taskType === TaskTypesEnum.TaskManyFromMany || taskType === TaskTypesEnum.TaskOneFromMany) {
      task.taskData.correctAnswer = changeCorrectAnswerDto.newCorrectAnswerId;
    } else if (taskType === TaskTypesEnum.TaskWrittenAnswer) {
      task.taskData.correctAnswer = changeCorrectAnswerDto.newCorrectAnswerString;
    } else if (taskType === TaskTypesEnum.TaskNumberAnswer) {
      task.taskData.correctAnswer = changeCorrectAnswerDto.newCorrectAnswerNumber;
    }

    return task.save();
  }

  async changeTaskType(newTaskType: string, taskId: Types.ObjectId) {
    const defaultTaskData = this.createDefaultTaskDataByType(newTaskType);

    if (!defaultTaskData) {
      throw new BadRequestException('Такого типу завдання не існує');
    }

    return this.taskModel.findByIdAndUpdate(
      taskId,
      {
        type: newTaskType,
        taskData: defaultTaskData,
      },
      { new: true },
    );
  }

  async changeQuestion(newQuestion: string, taskId: Types.ObjectId) {
    return this.taskModel.findByIdAndUpdate(taskId, { question: newQuestion });
  }

  async create(variantType: string, userId: Types.ObjectId) {
    const defaultTask = {
      owner: userId,
      type: variantType,
      taskData: null,
      question: 'Питання',
    };

    defaultTask.taskData = this.createDefaultTaskDataByType(variantType);

    return this.taskModel.create(defaultTask);
  }

  private createDefaultTaskDataByType(variantType: string) {
    if (variantType === TaskTypesEnum.TaskOneFromMany) {
      return {
        answerVariants: [],
        correctAnswer: null,
      };
    } else if (variantType === TaskTypesEnum.TaskManyFromMany) {
      return {
        answerVariants: [],
        correctAnswer: null,
      };
    } else if (variantType === TaskTypesEnum.TaskNumberAnswer) {
      return {
        correctAnswer: 0,
      };
    } else if (variantType === TaskTypesEnum.TaskWrittenAnswer) {
      return {
        correctAnswer: '',
      };
    }
  }
}
