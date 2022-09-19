import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Creator } from '../test/decorators/creator.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { ChangeQuestionDto } from './dto/change-question.dto';
import { TaskService } from './task.service';
import { ChangeTaskTypeDto } from './dto/change-task-type.dto';
import { ChangeCorrectAnswerDto } from './dto/change-correct-answer.dto';
import { User } from '../user/decorators/user.decorator';
import { UserModel } from '../user/model/user.model';
import { Types } from 'mongoose';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Auth()
  @Get('/:taskId')
  getById(@Param('taskId', IdValidationPipe) taskId) {
    return this.taskService.getById(taskId);
  }

  @Auth()
  @Creator('task')
  @Put('/question/:taskId')
  changeQuestion(@Param('taskId', IdValidationPipe) taskId, @Body() changeQuestionDto: ChangeQuestionDto) {
    return this.taskService.changeQuestion(changeQuestionDto.newQuestion, taskId);
  }

  @Auth()
  @Creator('task')
  @Put('/type/:taskId')
  changeTaskType(@Param('taskId', IdValidationPipe) taskId, @Body() changeTaskTypeDto: ChangeTaskTypeDto) {
    return this.taskService.changeTaskType(changeTaskTypeDto.newTaskType, taskId);
  }

  @Auth()
  @Creator('task')
  @Put('/correct-answer/:taskId')
  changeCorrectAnswer(
    @Param('taskId', IdValidationPipe) taskId,
    @Body() changeCorrectAnswerDto: ChangeCorrectAnswerDto,
  ) {
    return this.taskService.changeCorrectAnswer(taskId, changeCorrectAnswerDto);
  }

  @Auth()
  @Creator('task')
  @Post('/answer/:taskId')
  addAnswer(@Param('taskId', IdValidationPipe) taskId, @User() user: UserModel) {
    return this.taskService.addAnswer(taskId, user._id);
  }

  @Auth()
  @Creator('task')
  @Delete('/answer/:taskId')
  deleteAnswer(@Param('taskId', IdValidationPipe) taskId, @Body('answerId') answerId: Types.ObjectId) {
    return this.taskService.deleteAnswer(answerId, taskId);
  }
}
