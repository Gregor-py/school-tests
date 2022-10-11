import { Module } from '@nestjs/common';
import { PassedTaskService } from './passed-task.service';

@Module({
  providers: [PassedTaskService]
})
export class PassedTaskModule {}
