import { Module } from '@nestjs/common';
import { PassingTestService } from './passing-test.service';
import { PassingTestController } from './passing-test.controller';

@Module({
  providers: [PassingTestService],
  controllers: [PassingTestController]
})
export class PassingTestModule {}
