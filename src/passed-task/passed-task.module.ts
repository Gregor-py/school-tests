import { Module } from '@nestjs/common';
import { PassedTaskService } from './passed-task.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassedTaskModel } from './model/passed-task.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PassedTaskModel,
        schemaOptions: {
          collection: 'PassedTask',
        },
      },
    ]),
  ],
  providers: [PassedTaskService],
  exports: [PassedTaskService],
})
export class PassedTaskModule {}
