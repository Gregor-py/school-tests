import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { TestService } from './test.service';
import { UserModel } from '../user/model/user.model';
import { User } from '../user/decorators/user.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { Types } from 'mongoose';
import { CustomizeTestDto } from './dto/customize-test.dto';
import { ChangeSubjectDto } from './dto/change-subject.dto';

@Controller('tests')
export class TestController {
  constructor(private testService: TestService) {}

  @Auth()
  @Get('/:id')
  getById(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return this.testService.getById(id);
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
  @Put('/add-task/:id')
  addTask(
    @User() user: UserModel,
    @Param('id', IdValidationPipe) id: Types.ObjectId,
    @Body('taskType') taskType: string,
  ) {
    return this.testService.addTask(user._id, id, taskType);
  }

  @Auth()
  @Put('/:id')
  customize(
    @User() user: UserModel,
    @Param('id', IdValidationPipe) testId,
    @Body() customizeTestDto: CustomizeTestDto,
  ) {
    return this.testService.customize(user._id, testId, customizeTestDto);
  }

  @Auth()
  @Put('/change-subject/:id')
  changeSubject(
    @User() user: UserModel,
    @Param('id', IdValidationPipe) testId,
    @Body() changeSubjectDto: ChangeSubjectDto,
  ) {
    return this.testService.changeSubject(user._id, testId, changeSubjectDto);
  }
}
