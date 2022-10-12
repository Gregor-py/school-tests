import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TestModel } from './model/test.model';
import { TaskModule } from '../task/task.module';

@Module({
  providers: [TestService],
  controllers: [TestController],
  imports: [
    TaskModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: TestModel,
        schemaOptions: {
          collection: 'Test',
        },
      },
    ]),
  ],
  exports: [TestService],
})
export class TestModule {}
