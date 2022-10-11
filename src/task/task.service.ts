import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TaskModel } from './model/task.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { ChangeCorrectAnswerDto } from './dto/change-correct-answer.dto';
import { AnswerService } from '../answer/answer.service';

@Injectable()
export class TaskService {
  constructor(@InjectModel(TaskModel) private taskModel: ModelType<TaskModel>, private answerService: AnswerService) {}

  async addAnswer(taskId: Types.ObjectId, userId: Types.ObjectId) {
    const createdAnswer = await this.answerService.create(userId);
    const changingTask = await this.taskModel.findById(taskId);

    changingTask.answerVariants.push(createdAnswer._id);

    return changingTask.save();
  }

  async deleteAnswer(answerId: Types.ObjectId, taskId: Types.ObjectId) {
    const changingTask = await this.taskModel.findById(taskId);

    changingTask.answerVariants.filter((answerVariant) => String(answerVariant) !== String(answerId));

    await this.answerService.deleteAnswer(answerId);
    return changingTask.save();
  }

  async getById(taskId: Types.ObjectId) {
    return this.taskModel.findById(taskId);
  }

  async changeCorrectAnswer(taskId: Types.ObjectId, changeCorrectAnswerDto: ChangeCorrectAnswerDto) {
    return this.taskModel.findByIdAndUpdate(taskId, { correctAnswer: changeCorrectAnswerDto.newCorrectAnswerId });
  }

  async changeQuestion(newQuestion: string, taskId: Types.ObjectId) {
    return this.taskModel.findByIdAndUpdate(taskId, { question: newQuestion });
  }

  async create(userId: Types.ObjectId) {
    const defaultTask = {
      owner: userId,
      answerVariants: [],
      correctAnswer: null,
      question: 'Питання',
    };

    return this.taskModel.create(defaultTask);
  }
}
