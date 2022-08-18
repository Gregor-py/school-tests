import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { TestModel } from './model/test.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CustomizeTestDto } from './dto/customize-test.dto';
import { ChangeSubjectDto } from './dto/change-subject.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class TestService {
  constructor(@InjectModel(TestModel) private testModel: ModelType<TestModel>, private taskService: TaskService) {}

  async getById(id: Types.ObjectId) {
    return this.testModel.findById(id).populate('subject');
  }

  async getAll(searchTerm = '', subject?: Types.ObjectId, schoolClass?: number) {
    const options: any = {
      $or: [{ title: new RegExp(searchTerm, 'i') }, { description: new RegExp(searchTerm, 'i') }],
    };

    if (schoolClass || subject) {
      options.$and = [];
    }

    if (schoolClass) {
      options.$and.push({ class: schoolClass });
    }

    if (subject) {
      options.$and.push({ subject: subject });
    }

    return this.testModel.find(options).select('-updatedAt -__v').sort({ createdAt: 'desc' }).exec();
  }

  async create(userId: Types.ObjectId) {
    const defaultTestData = {
      owner: userId,
      title: '',
      description: '',
    };

    return this.testModel.create(defaultTestData);
  }

  async customize(userId: Types.ObjectId, testId: Types.ObjectId, customizeTestDto: CustomizeTestDto) {
    await this.validateOwnerUser(userId, testId);

    return this.testModel.findByIdAndUpdate(testId, customizeTestDto, { new: true });
  }

  async changeSubject(userId, testId: Types.ObjectId, changeSubjectDto: ChangeSubjectDto) {
    await this.validateOwnerUser(userId, testId);

    return this.testModel.findByIdAndUpdate(testId, { subject: changeSubjectDto.newSubject }, { new: true });
  }

  async addTask(userId: Types.ObjectId, testId: Types.ObjectId, variantType: string) {
    const test = await this.validateOwnerUser(userId, testId);
    const createdTask = await this.taskService.create(variantType);

    test.tasks.push(createdTask._id);
    return test.save();
  }

  private async validateOwnerUser(userId: Types.ObjectId, testId: Types.ObjectId) {
    const test = this.testModel.findById(testId);

    if (!test) {
      throw new BadRequestException('Теста з таким ідентифікатором не існує');
    }

    if (test.owner !== userId) {
      throw new ForbiddenException('Редагувати тест може лише творець');
    }

    return test;
  }
}
