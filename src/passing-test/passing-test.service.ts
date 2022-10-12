import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PassingTestModel } from './model/passing-test.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { AddPassedTaskDto } from './dto/add-passed-task.dto';
import { PassedTaskService } from '../passed-task/passed-task.service';
import { TestService } from '../test/test.service';
import { PassedTaskModel } from '../passed-task/model/passed-task.model';

@Injectable()
export class PassingTestService {
  constructor(
    @InjectModel(PassingTestModel) private passingTestModel: ModelType<PassingTestModel>,
    private userService: UserService,
    private passedTaskService: PassedTaskService,
    private testService: TestService,
  ) {}

  async getNotPassedTasks(passingTestId: Types.ObjectId) {
    const passingTest = await this.passingTestModel.findById(passingTestId).populate('passedTasks').exec();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const passedTasksId = passingTest.passedTasks.map((passedTask) => String(passedTask.taskParent));
    const allTasks = await this.testService.getTasks(passingTest.testParent._id);

    return allTasks.filter((task) => !passedTasksId.includes(String(task)));
  }

  // todo create dto
  async startTest(testId: Types.ObjectId, userId: Types.ObjectId) {
    const passingTest = await this.create(testId, userId);
    return this.userService.addToStartedTests(passingTest._id, userId);
  }

  async addPassedTask(addPassedTaskDto: AddPassedTaskDto) {
    const passedTask = await this.passedTaskService.create(addPassedTaskDto.taskId, addPassedTaskDto.chosenAnswer);
    const passingTest = await this.passingTestModel.findById(addPassedTaskDto.passingTestId);

    passingTest.passedTasks.push(passedTask);
    return passingTest.save();
  }

  private async create(testParent: Types.ObjectId, userId: Types.ObjectId) {
    const defaultPassingTest = {
      owner: userId,
      testParent: testParent,
      passedTasks: [],
      isPassed: false,
    };

    return this.passingTestModel.create(defaultPassingTest);
  }
}
