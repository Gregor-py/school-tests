import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { PassedTaskService } from '../passed-task/passed-task.service';
import { TaskService } from '../task/task.service';
import { TestService } from '../test/test.service';
import { UserService } from '../user/user.service';
import { AddPassedTaskDto } from './dto/add-passed-task.dto';
import { PassingTestModel } from './model/passing-test.model';

@Injectable()
export class PassingTestService {
  constructor(
    @InjectModel(PassingTestModel) private passingTestModel: ModelType<PassingTestModel>,
    private taskService: TaskService,
    private userService: UserService,
    private passedTaskService: PassedTaskService,
    private testService: TestService,
  ) {}

  async getNotPassedTasks(passingTestId: Types.ObjectId) {
    const passingTest = await this.passingTestModel.findById(passingTestId).populate('passedTasks').exec();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const passedTasksId = passingTest.passedTasks.map((passedTask) => String(passedTask.taskParent._id));
    const allTasks = await this.testService.getTasksPopulated(passingTest.testParent._id);

    return allTasks.filter((task) => {
      return !Boolean(passedTasksId.find((passedTaskId) => passedTaskId === String(task._id)));
    });
  }

  // todo create dto
  async startTest(testId: Types.ObjectId, userId: Types.ObjectId) {
    const passingTest = await this.create(testId, userId);
    await this.userService.addToStartedTests(passingTest._id, userId);
    return passingTest._id;
  }

  async addPassedTask(addPassedTaskDto: AddPassedTaskDto) {
    const passedTask = await this.passedTaskService.create(addPassedTaskDto.taskId, addPassedTaskDto.chosenAnswer);
    const passingTest = await this.passingTestModel.findById(addPassedTaskDto.passingTestId);

    passingTest.passedTasks.push(passedTask);
    return passingTest.save();
  }

  async getById(passingTestId: Types.ObjectId) {
    return this.passingTestModel.findById(passingTestId).populate('owner').populate('testParent');
  }

  async finishTest(passingTestId: Types.ObjectId) {
    const passingTest = await this.passingTestModel.findById(passingTestId).exec();
    const passedTasks = passingTest.passedTasks;
    let counterCorrectTasks = 0;

    await Promise.all(
      passedTasks.map(async (passedTaskId) => {
        const passedTask = await this.passedTaskService.getById(passedTaskId._id);
        const taskParent = await this.taskService.getById(passedTask.taskParent._id);

        if (String(passedTask.chosenAnswer._id) === String(taskParent.correctAnswer._id)) {
          counterCorrectTasks += 1;
        }
        return passedTask;
      }),
    );

    const correctPercent = Math.round((counterCorrectTasks / passingTest.passedTasks.length) * 100);

    return this.passingTestModel.findByIdAndUpdate(passingTestId, { isPassed: true, correctPercent: correctPercent });
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
