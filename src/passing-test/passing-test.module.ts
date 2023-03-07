import { Module } from '@nestjs/common';
import { PassedTaskModel } from '../passed-task/model/passed-task.model';
import { TaskModel } from '../task/model/task.model';
import { TaskModule } from '../task/task.module';
import { PassingTestService } from './passing-test.service';
import { PassingTestController } from './passing-test.controller';
import { UserModule } from '../user/user.module';
import { PassedTaskModule } from '../passed-task/passed-task.module';
import { TestModule } from '../test/test.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassingTestModel } from './model/passing-test.model';

@Module({
  imports: [
    UserModule,
    PassedTaskModule,
    TestModule,
    TaskModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: PassingTestModel,
        schemaOptions: {
          collection: 'PassingTest',
        },
      },
    ]),
  ],
  providers: [PassingTestService],
  controllers: [PassingTestController],
})
export class PassingTestModule {}
