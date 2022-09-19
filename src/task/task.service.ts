import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TaskModel } from './model/task.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskTypesEnum } from './model/task.enum';
import { Types } from 'mongoose';
import { ChangeCorrectAnswerDto } from './dto/change-correct-answer.dto';
import { AnswerService } from '../answer/answer.service';

@Injectable()
export class TaskService {
  constructor(@InjectModel(TaskModel) private taskModel: ModelType<TaskModel>, private answerService: AnswerService) {}

  async addAnswer(taskId: Types.ObjectId, userId: Types.ObjectId) {
    const createdAnswer = await this.answerService.create(userId);
    const changingTask = await this.taskModel.findById(taskId);

    this.validateTaskWithProbablyAnswers(changingTask);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newAnswerVariants = [...changingTask.taskData.answerVariants, createdAnswer._id];

    const newTaskData = {
      ...changingTask.taskData,
      answerVariants: newAnswerVariants,
    };

    return this.taskModel.findByIdAndUpdate(taskId, { taskData: newTaskData });
  }

  async deleteAnswer(answerId: Types.ObjectId, taskId: Types.ObjectId) {
    const changingTask = await this.taskModel.findById(taskId);
    this.validateTaskWithProbablyAnswers(changingTask);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(changingTask.taskData.answerVariants);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newAnswerVariants = changingTask.taskData.answerVariants.filter(
      (answerVariant) => String(answerVariant) !== String(answerId),
    );
    const newTaskData = {
      ...changingTask.taskData,
      answerVariants: newAnswerVariants,
    };

    await this.answerService.deleteAnswer(answerId);
    return this.taskModel.findByIdAndUpdate(taskId, { taskData: newTaskData });
  }

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

  private validateTaskWithProbablyAnswers(task: TaskModel) {
    if (task.type !== TaskTypesEnum.TaskManyFromMany && task.type !== TaskTypesEnum.TaskOneFromMany) {
      throw new BadRequestException('Для такого типу завдання не можна додати варіант відповіді');
    }
  }
}
