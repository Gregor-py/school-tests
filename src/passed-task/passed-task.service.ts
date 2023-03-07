import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { PassedTaskModel } from './model/passed-task.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class PassedTaskService {
  constructor(@InjectModel(PassedTaskModel) private passedTaskModel: ModelType<PassedTaskModel>) {}

  async create(taskParent: Types.ObjectId, chosenAnswer: Types.ObjectId) {
    return this.passedTaskModel.create({ taskParent, chosenAnswer });
  }

  async getById(passedTaskId: Types.ObjectId) {
    return this.passedTaskModel.findById(passedTaskId);
  }
}
