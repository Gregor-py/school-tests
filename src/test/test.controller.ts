import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { TestService } from './test.service';
import { UserModel } from '../user/model/user.model';
import { User } from '../user/decorators/user.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { Types } from 'mongoose';
import { CustomizeTestDto } from './dto/customize-test.dto';
import { ChangeSubjectDto } from './dto/change-subject.dto';
import { Creator } from './decorators/creator.decorator';

@Controller('tests')
export class TestController {
  constructor(private testService: TestService) {}

  @Auth()
  @Get('/:testId')
  getById(@Param('testId', IdValidationPipe) testId: Types.ObjectId) {
    return this.testService.getById(testId);
  }

  @Get()
  getAll(@Query('searchTerm') searchTerm, @Query('class') schoolClass, @Query('subject') subject) {
    return this.testService.getAll(searchTerm, subject, schoolClass);
  }

  @Auth()
  @Post()
  create(@User() user: UserModel) {
    return this.testService.create(user._id);
  }

  @Auth()
  @Creator()
  @Put('/add-task/:testId')
  addTask(
    @User() user: UserModel,
    @Param('testId', IdValidationPipe) testId: Types.ObjectId,
    @Body('taskType') taskType: string,
  ) {
    return this.testService.addTask(user._id, testId, taskType);
  }

  @Auth('admin')
  @Creator()
  @Put('/:testId')
  customize(
    @User() user: UserModel,
    @Param('testId', IdValidationPipe) testId,
    @Body() customizeTestDto: CustomizeTestDto,
  ) {
    return this.testService.customize(user._id, testId, customizeTestDto);
  }

  @Auth()
  @Creator()
  @Put('/change-subject/:testId')
  changeSubject(
    @User() user: UserModel,
    @Param('testId', IdValidationPipe) testId,
    @Body() changeSubjectDto: ChangeSubjectDto,
  ) {
    return this.testService.changeSubject(user._id, testId, changeSubjectDto);
  }
}
