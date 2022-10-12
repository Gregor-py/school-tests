import { Module } from '@nestjs/common';
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
