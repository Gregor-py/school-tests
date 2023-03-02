import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { AnswerModel } from './model/answer.model';

@Injectable()
export class AnswerService {
  constructor(@InjectModel(AnswerModel) private answerModel: ModelType<AnswerModel>) {}

  async create(userId: Types.ObjectId) {
    const defaultAnswer = {
      text: 'Варіант відповіді',
      owner: userId,
    };

    return this.answerModel.create(defaultAnswer);
  }

  async changeAnswerText(answerId: Types.ObjectId, newAnswerText: string) {
    return this.answerModel.findByIdAndUpdate(answerId, { text: newAnswerText });
  }

  async deleteAnswer(answerId: Types.ObjectId) {
    return this.answerModel.findByIdAndDelete(answerId);
  }

  async getAnswerById(answerId: Types.ObjectId) {
    return this.answerModel.findById(answerId);
  }
}
