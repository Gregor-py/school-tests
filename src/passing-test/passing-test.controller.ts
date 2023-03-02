import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';
import { UserModel } from '../user/model/user.model';
import { PassingTestService } from './passing-test.service';
import { Types } from 'mongoose';
import { AddPassedTaskDto } from './dto/add-passed-task.dto';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passing-test')
@Controller('passing-test')
export class PassingTestController {
  constructor(private passingTestService: PassingTestService) {}

  @Auth()
  @Get('/:passingTestId')
  getById(@Param('passingTestId', IdValidationPipe) passingTestId: Types.ObjectId) {
    return this.passingTestService.getById(passingTestId);
  }

  @Auth()
  @Post('/start/:testId')
  startTest(@Param('testId', IdValidationPipe) testId: Types.ObjectId, @User() user: UserModel) {
    return this.passingTestService.startTest(testId, user._id);
  }

  @Auth()
  @Put('/passed-task')
  addPassedTask(@Body() addPassedTaskDto: AddPassedTaskDto) {
    return this.passingTestService.addPassedTask(addPassedTaskDto);
  }

  @Auth()
  @Get('/not-passed-tasks/:passingTestId')
  getNotPassedTasks(@Param('passingTestId', IdValidationPipe) passingTestId: Types.ObjectId) {
    return this.passingTestService.getNotPassedTasks(passingTestId);
  }
}
